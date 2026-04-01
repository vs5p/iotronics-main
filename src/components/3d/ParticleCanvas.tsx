import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  baseX: number;
  baseY: number;
  radius: number;
  density: number;
  opacity: number;
};

const PARTICLE_COUNT = 400;
const REVEAL_RADIUS = 250;
const MOUSE_RADIUS = 150;
const FRICTION = 0.95;
const RETURN_FORCE = 0.01;

// Detect touch/non-pointer devices (phones, tablets)
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);


const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const animationRef = useRef<number>(0);
  const loaderFinishedRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const touchDevice = isTouchDevice();

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Always reinitialize particles to fit new dimensions
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;

        return {
          x,
          y,
          vx: 0,
          vy: 0,
          ax: 0,
          ay: 0,
          baseX: x,
          baseY: y,
          radius: randomBetween(1, 3),
          density: randomBetween(0.8, 1.2),
          opacity: 0.6,
        };
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (touchDevice) return; // on touch devices, ignore mouse events — let drift run
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseLeave = () => {
      mouseRef.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchDevice) return;
      const t = e.touches[0];
      mouseRef.current = { x: t.clientX, y: t.clientY };
    };

    const onTouchEnd = () => {
      mouseRef.current = null;
    };

    const render = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      particlesRef.current.forEach((particle) => {
        // Reset acceleration each frame
        particle.ax = 0;
        particle.ay = 0;

        if (mouse) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          // Antigravity physics: repel when close to mouse, attract when in reveal zone
          if (distance > 0.001) {
            if (distance < MOUSE_RADIUS) {
              const angle = Math.atan2(dy, dx);
              const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS; // Inverse square law

              // Apply repel force to acceleration (not position) - stronger reaction
              particle.ax += Math.cos(angle) * force * 3;
              particle.ay += Math.sin(angle) * force * 3;
            } else if (distance < REVEAL_RADIUS) {
              // Attract when in reveal zone but not too close
              const directionX = dx / distance;
              const directionY = dy / distance;
              const attractForce = ((REVEAL_RADIUS - distance) / REVEAL_RADIUS) * 1.5;
              particle.ax -= directionX * attractForce * particle.density * 8;
              particle.ay -= directionY * attractForce * particle.density * 8;
            }
          }

          // Flashlight reveal: opacity based on distance (boost opacity near mouse)
          const revealOpacity = Math.max(0, 1 - (distance / REVEAL_RADIUS));
          particle.opacity = Math.max(particle.opacity, revealOpacity * 0.8);
        }

        // Return pull to home position (elastic feel)
        if (loaderFinishedRef.current) {
          particle.ax += (particle.baseX - particle.x) * RETURN_FORCE;
          particle.ay += (particle.baseY - particle.y) * RETURN_FORCE;
          
          // Ambient drift for mobile/tablet where mouse is inactive
          if (!mouse) {
            const time = Date.now() * 0.001;
            const driftStrength = touchDevice ? 0.55 : 0.15;
            particle.ax += Math.sin(time + particle.x * 0.01) * driftStrength;
            particle.ay += Math.cos(time + particle.y * 0.01) * driftStrength;
          }
        }



        // Apply acceleration to velocity
        particle.vx += particle.ax;
        particle.vy += particle.ay;

        // Apply friction/damping
        particle.vx *= FRICTION;
        particle.vy *= FRICTION;

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Keep particle within bounds - simple bounce
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        // Only draw particles with opacity > 0
        if (particle.opacity > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);

          // Glowing orange/red gradient
          const gradient = ctx.createRadialGradient(
            particle.x, particle.y, 0,
            particle.x, particle.y, particle.radius * 2
          );
          gradient.addColorStop(0, `rgba(220, 80, 20, ${particle.opacity})`);
          gradient.addColorStop(1, `rgba(180, 50, 0, 0)`);

          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationRef.current = requestAnimationFrame(render);
    };

    resizeCanvas();
    render();

    // No preloader on this page — enable physics immediately
    loaderFinishedRef.current = true;

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseout', onMouseLeave);
    window.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseout', onMouseLeave);
      window.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleCanvas;
