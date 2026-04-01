# Implementation Plan: Mobile Performance Optimisation

## Overview

Implement all mobile performance optimisations in a bottom-up order: shared utilities first, then individual components, then CSS, then integration. Each task is self-contained and builds on the previous.

## Tasks

- [x] 1. Create shared mobile detection utility and useInView hook
  - Create `src/lib/isMobile.ts` exporting `isMobile(): boolean` using `matchMedia('(pointer: coarse)')` with SSR guard (returns false when window is undefined)
  - Create `src/hooks/useInView.ts` exporting `useInView(threshold?: number): [RefObject<Element>, boolean]` using IntersectionObserver with fallback (always returns true when IntersectionObserver is unavailable)
  - _Requirements: 1.3, 7.1, 7.2_

- [ ]* 1.1 Write property tests for isMobile and useInView
  - **Property 7: ParticleCanvas RAF is cancelled when off-screen**
  - Mock IntersectionObserver, verify useInView returns false when not intersecting and true when intersecting
  - **Validates: Requirements 1.3, 7.1**

- [x] 2. Optimise ParticleCanvas for mobile
  - Import `isMobile` from `src/lib/isMobile.ts` in `src/components/3d/ParticleCanvas.tsx`
  - On mobile, initialise particles with `MOBILE_PARTICLE_COUNT = 80` instead of 400 in `resizeCanvas`
  - Add `frameSkip` counter ref: on mobile, only call `render()` on every 2nd RAF tick
  - Attach `useInView` ref to the canvas element; cancel RAF when `isInView` is false, restart when true
  - On mobile, skip all mouse/touch repulsion physics in the render loop (drift-only mode)
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ]* 2.1 Write property test for mobile particle count
  - **Property 1: Mobile particle count is bounded**
  - Mock `isMobile` to return true, mount ParticleCanvas, assert `particlesRef.current.length <= 80`
  - **Validates: Requirements 1.1**

- [ ]* 2.2 Write property test for RAF cancellation when off-screen
  - **Property 7: ParticleCanvas RAF is cancelled when off-screen**
  - Mock IntersectionObserver, trigger `isIntersecting = false` callback, assert `cancelAnimationFrame` was called
  - **Validates: Requirements 1.3, 7.1**

- [x] 3. Replace Three.js canvases with mobile placeholders
  - In `src/components/3d/FloatingOrbs.tsx`: add `if (isMobile()) return <MobileOrbPlaceholder />` before Canvas; implement `MobileOrbPlaceholder` as a div with radial-gradient and a single CSS `@keyframes` scale pulse
  - In `src/components/3d/RotatingCube.tsx`: same pattern with a CSS rotating square placeholder (only when `isLoading` is true)
  - In `src/components/3d/IoTDeviceViewer.tsx`: same pattern with a static CSS device icon placeholder for both `IoTDeviceViewer` and `NetworkVisualization` exports
  - _Requirements: 2.1, 2.2, 2.3_

- [ ]* 3.1 Write property test for Three.js canvas absence on mobile
  - **Property 2: Three.js canvases are absent on mobile**
  - For each component, render with `isMobile` mocked to true, assert no `<canvas>` element in output
  - **Validates: Requirements 2.1, 2.2, 2.3**

- [x] 4. Strip framer-motion animations from LiveElements on mobile
  - In `src/components/LiveElements.tsx`:
    - `FloatingParticles`: return `null` when `isMobile()` is true
    - `CircuitBackground`: return a static `<svg>` (no `motion.*` elements) when `isMobile()` is true
    - `ElectricityArc`: return `null` when `isMobile()` is true
  - _Requirements: 3.1, 3.4, 3.5_

- [ ]* 4.1 Write property test for animated overlay components on mobile
  - **Property 3: Animated overlay components return null on mobile**
  - Render FloatingParticles and ElectricityArc with mobile=true, assert output is null
  - Render CircuitBackground with mobile=true, assert no `motion.` elements in output
  - **Validates: Requirements 3.1, 3.4, 3.5**

- [x] 5. Reduce HeroSection animations on mobile
  - In `src/components/HeroSection.tsx`:
    - Set `particles` array length to 0 when `isMobile()` is true (no floating dots rendered)
    - Render central glow as a plain `<div>` with no `animate` prop on mobile
    - Remove `animate={{ rotate: 360 }}` from the orbit ring on mobile (render as static `<div>`)
  - _Requirements: 3.2_

- [x] 6. Reduce AnimatedBackgrounds on mobile
  - In `src/components/AnimatedBackgrounds.tsx`:
    - `FloatingOrbsBackground`: on mobile, render exactly 2 static `<div>` orbs with `opacity: 0.3` and no framer-motion props (replace the animated SVG entirely)
  - _Requirements: 3.3_

- [ ]* 6.1 Write property test for FloatingOrbsBackground orb count on mobile
  - **Property 4: FloatingOrbsBackground orb count is bounded on mobile**
  - Render with mobile=true, count orb elements, assert count <= 2
  - **Validates: Requirements 3.3**

- [x] 7. Optimise useImmersiveScroll for mobile
  - In `src/hooks/useImmersiveScroll.ts`:
    - Call `isMobile()` at the top of the effect
    - If mobile: skip `new Lenis(...)` and skip `gsap.ticker.add(tickerCallback)`
    - If mobile: skip parallax animations on `.imm-panel-ambient` elements and skip background color morphing
    - If mobile: still register panel fade-in ScrollTrigger animations (opacity/y) so content remains accessible
  - _Requirements: 4.1, 4.2, 4.3_

- [ ]* 7.1 Write property test for Lenis and GSAP ticker absence on mobile
  - **Property 5: Lenis and GSAP ticker are not initialised on mobile**
  - Mock `window.Lenis` constructor and `gsap.ticker.add`, invoke hook with mobile=true, assert neither was called
  - **Validates: Requirements 4.1, 4.2**

- [x] 8. Optimise ImmersiveHome intervals on mobile
  - In `src/components/ImmersiveHome.tsx`:
    - `QuoteCarousel`: use `interval = isMobile() ? 8000 : 5000`
    - `useLivePulsingValue`: accept optional `mobileInterval` param; when `isMobile()` is true use 5000ms instead of the default ~2000ms
    - Wrap the IoT dashboard section (Panel 3) with `useInView`; clear all pulsing intervals when `isInView` is false, restart when true
  - _Requirements: 6.1, 6.2, 6.3_

- [ ]* 8.1 Write property test for polling interval values on mobile
  - **Property 6: Polling intervals are increased on mobile**
  - Mock `setInterval`, render `QuoteCarousel` and `IoTCard` components with mobile=true, assert all interval delays >= 5000
  - **Validates: Requirements 6.1, 6.3**

- [x] 9. Add mobile CSS overrides
  - In `src/index.css`, add a `@media (pointer: coarse)` block that:
    - Sets `.imm-event-card` and `.imm-iot-card` `backdrop-filter: none` and `background: rgba(10,10,10,0.85)`
    - Sets `.scanline::after` `display: none`
    - Sets `.imm-panel-ambient` `animation: none`
    - Sets `.imm-cta-glow` `animation: none`
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

- [x] 10. Checkpoint — verify all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- `isMobile()` is called inside `useEffect` or component body (not on every render) to avoid performance overhead
- Desktop experience is completely unchanged — all gates are `if (isMobile()) return ...`
- Property tests use `fast-check` with minimum 100 iterations each
- Each property test references its design document property number in a comment
