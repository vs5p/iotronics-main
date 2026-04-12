# Requirements Document

## Introduction

The IoTRONICS website currently suffers from severe performance degradation on mobile devices, manifesting as choppy animations, scroll jank, and high battery drain. The root causes are: 400-particle canvas running full physics on every frame, multiple Three.js canvases (FloatingOrbs, RotatingCube) with no mobile fallback, 30+ framer-motion elements with `repeat: Infinity`, GSAP + Lenis smooth scroll running simultaneously, backdrop-filter blur on multiple cards, and no intersection-observer-based pausing of off-screen animations. This spec defines requirements to deeply optimise mobile performance while preserving the desktop visual experience.

## Glossary

- **Mobile_Device**: Any device where `window.matchMedia('(pointer: coarse)').matches` returns true or screen width ≤ 768px
- **ParticleCanvas**: The canvas-based particle system in `src/components/3d/ParticleCanvas.tsx`
- **ImmersiveScroll**: The GSAP + Lenis scroll system in `src/hooks/useImmersiveScroll.ts`
- **ThreeJS_Canvas**: Any `@react-three/fiber` Canvas component (FloatingOrbs, RotatingCube)
- **FramerMotion_Animation**: Any framer-motion `animate` prop with `repeat: Infinity`
- **Intersection_Observer**: Browser API to detect when elements enter/leave the viewport
- **RAF**: RequestAnimationFrame — the browser's animation loop callback


## Requirements

### Requirement 1: Particle Canvas Mobile Optimisation

**User Story:** As a mobile user, I want the particle canvas to run smoothly, so that the page does not drop frames while scrolling or interacting.

#### Acceptance Criteria

1. WHEN the site loads on a Mobile_Device, THE ParticleCanvas SHALL render at most 80 particles instead of 400
2. WHEN the site loads on a Mobile_Device, THE ParticleCanvas SHALL skip every other frame using a frame-skip counter, targeting 30fps instead of 60fps
3. WHEN the ParticleCanvas element is not intersecting the viewport, THE ParticleCanvas SHALL cancel its RAF loop and resume only when it re-enters the viewport
4. WHEN the site loads on a Mobile_Device, THE ParticleCanvas SHALL disable mouse/touch repulsion physics and render particles in a simple drift-only mode

---

### Requirement 2: Three.js Canvas Elimination on Mobile

**User Story:** As a mobile user, I want heavy 3D canvases replaced with lightweight alternatives, so that the GPU is not overloaded.

#### Acceptance Criteria

1. WHEN the site loads on a Mobile_Device, THE FloatingOrbs component SHALL not mount a Three.js Canvas and SHALL render a static CSS gradient placeholder instead
2. WHEN the site loads on a Mobile_Device, THE RotatingCube component SHALL not mount a Three.js Canvas and SHALL render a static CSS animated placeholder instead
3. WHEN the site loads on a Mobile_Device, THE IoTDeviceViewer component SHALL not mount a Three.js Canvas and SHALL render a static image or CSS placeholder instead

---

### Requirement 3: Framer-Motion Animation Reduction on Mobile

**User Story:** As a mobile user, I want excessive animations disabled, so that the CPU is not continuously busy with re-renders.

#### Acceptance Criteria

1. WHEN the site loads on a Mobile_Device, THE FloatingParticles component in LiveElements SHALL not render any animated DOM nodes
2. WHEN the site loads on a Mobile_Device, THE HeroSection SHALL reduce its floating particle count from 20 to 0 and disable the central glow pulse animation
3. WHEN the site loads on a Mobile_Device, THE AnimatedBackgrounds FloatingOrbsBackground SHALL render at most 2 static orbs with no framer-motion animation
4. WHEN the site loads on a Mobile_Device, THE CircuitBackground component SHALL not render animated SVG path or circle elements
5. WHEN the site loads on a Mobile_Device, THE ElectricityArc component SHALL not render any animated elements

---

### Requirement 4: Smooth Scroll Optimisation on Mobile

**User Story:** As a mobile user, I want native scroll behaviour, so that scrolling feels responsive and does not stutter.

#### Acceptance Criteria

1. WHEN the site loads on a Mobile_Device, THE ImmersiveScroll hook SHALL not initialise Lenis smooth scroll and SHALL use native browser scroll instead
2. WHEN the site loads on a Mobile_Device, THE ImmersiveScroll hook SHALL not add a GSAP ticker callback and SHALL use passive scroll listeners for ScrollTrigger updates
3. WHEN the site loads on a Mobile_Device, THE ImmersiveScroll hook SHALL disable parallax depth animations on `.imm-panel-ambient` elements

---

### Requirement 5: CSS Animation Reduction on Mobile

**User Story:** As a mobile user, I want expensive CSS effects disabled, so that the GPU compositor is not overloaded.

#### Acceptance Criteria

1. WHEN the site renders on a Mobile_Device, THE CSS SHALL disable `backdrop-filter: blur()` on `.imm-event-card` and `.imm-iot-card` elements and replace with a solid semi-transparent background
2. WHEN the site renders on a Mobile_Device, THE CSS SHALL disable the `.scanline::after` repeating-linear-gradient overlay
3. WHEN the site renders on a Mobile_Device, THE CSS SHALL disable the `.imm-panel-ambient` float animation
4. WHEN the site renders on a Mobile_Device, THE CSS SHALL disable the `.imm-cta-glow` pulse animation

---

### Requirement 6: Interval and Timer Consolidation

**User Story:** As a mobile user, I want background timers minimised, so that the CPU can idle between interactions.

#### Acceptance Criteria

1. WHEN the site loads on a Mobile_Device, THE useLivePulsingValue hook SHALL increase its update interval to 5000ms instead of 2000ms
2. WHEN the IoT dashboard section is not intersecting the viewport, THE useLivePulsingValue intervals SHALL be paused and resumed only when the section re-enters the viewport
3. WHEN the site loads on a Mobile_Device, THE QuoteCarousel interval SHALL increase to 8000ms instead of 5000ms

---

### Requirement 7: Intersection Observer Gating

**User Story:** As a mobile user, I want animations to pause when off-screen, so that battery is not drained by invisible content.

#### Acceptance Criteria

1. THE ParticleCanvas SHALL use an Intersection_Observer to pause its RAF loop when less than 10% of the canvas is visible
2. THE FloatingParticles component SHALL use an Intersection_Observer to unmount animated nodes when the component is not visible
3. WHEN a section containing FramerMotion_Animation elements is not intersecting the viewport, THE animations SHALL be paused via the `whileInView` prop or equivalent mechanism
