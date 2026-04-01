import { useEffect, useRef } from 'react';
import { isMobile } from '@/lib/isMobile';
import { useInView } from '@/hooks/useInView';

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
const MOBILE_PARTICLE_COUNT = 80;
const REVEAL_RADIUS = 250;
const MOUSE_RADIUS = 150;
const FRICTION = 0.95;
const RETURN_FORCE = 0.01;

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);
  const animationRef = useRef<number>(0);
  const loaderFinishedRef = useRef<boolean>(false);
  const frameSkipRef = useRef<number>(0);
  // Stable ref so the RAF callback can read the latest isInView without stale closure
  const isInViewRef = useRef<boolean>(true);
  // Stable ref to the render function so the resume effect can call it
  const renderRef = useRef<(() => void) | null>(null);

  const [inViewRef, isInView] = useInView(0.1);

  useEffect(() => {
    isInViewRef.current = isInView;
  }, [isInView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mobile = isMobile();
    const particleCount = mobile ? MOBILE_PARTICLE_COUNT : PARTICLE_COUNT;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      particlesRef.current = Array.from({ length: particleCount }, () => {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        return {
          x, y,
          vx: 0, vy: 0,
          ax: 0, ay: 0,
          baseX: x, baseY: y,
          radius: randomBetween(1, 3),
          density: randomBetween(0.8, 1.2),
          opacity: 0.6,
        };
      });
    };

    const onMouseMove = (e: MouseEvent) => {
      if (mobile) return; // drift-only on mobile (Req 1.4)
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => { mouseRef.current = null; };

    const onTouchMove = (e: TouchEvent) => {
      if (mobile) return; // drift-only on mobile (Req 1.4)
      const t = e.touches[0];
      mouseRef.current = { x: t.clientX, y: t.clientY };
    };
    const onTouchEnd = () => { mouseRef.current = null; };

    const render = () => {
      // Pause RAF when off-screen (Req 1.3 / 7.1)
      if (!isInViewRef.current) {
        animationRef.current = 0;
        return;
      }

      // Frame-skip on mobile: render every 2nd tick → ~30fps (Req 1.2)
      if (mobile) {
        frameSkipRef.current += 1;
        if (frameSkipRef.current % 2 !== 0) {
          animationRef.current = requestAnimationFrame(render);
          return;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      particlesRef.current.forEach((particle) => {
        particle.ax = 0;
        particle.ay = 0;

        // Skip repulsion physics on mobile — drift-only mode (Req 1.4)
        if (!mobile && mouse) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distance = Math.hypot(dx, dy);

          if (distance > 0.001) {
            if (distance < MOUSE_RADIUS) {
              const angle = Math.atan2(dy, dx);
              const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
              particle.ax += Math.cos(angle) * force * 3;
              particle.ay += Math.sin(angle) * force * 3;
            } else if (distance < REVEAL_RADIUS) {
              const directionX = dx / distance;
              const directionY = dy / distance;
              const attractForce = ((REVEAL_RADIUS - distance) / REVEAL_RADIUS) * 1.5;
              particle.ax -= directionX * attractForce * particle.density * 8;
              particle.ay -= directionY * attractForce * particle.density * 8;
            }
          }

          const revealOpacity = Math.max(0, 1 - (distance / REVEAL_RADIUS));
          particle.opacity = Math.max(particle.opacity, revealOpacity * 0.8);
        }

        if (loaderFinishedRef.current) {
          particle.ax += (particle.baseX - particle.x) * RETURN_FORCE;
          particle.ay += (particle.baseY - particle.y) * RETURN_FORCE;

          // Ambient drift — always active on mobile since repulsion is disabled
          if (!mouse || mobile) {
            const time = Date.now() * 0.001;
            const driftStrength = mobile ? 0.55 : 0.15;
            particle.ax += Math.sin(time + particle.x * 0.01) * driftStrength;
            particle.ay += Math.cos(time + particle.y * 0.01) * driftStrength;
          }
        }

        particle.vx += particle.ax;
        particle.vy += particle.ay;
        particle.vx *= FRICTION;
        particle.vy *= FRICTION;
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx *= -0.8;
          particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy *= -0.8;
          particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        }

        if (particle.opacity > 0) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
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

    // Expose render so the isInView effect can restart it
    renderRef.current = render;

    resizeCanvas();
    render();
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

  // Restart the RAF loop when the canvas comes back into view (Req 1.3 / 7.1)
  useEffect(() => {
    if (isInView && animationRef.current === 0 && renderRef.current) {
      animationRef.current = requestAnimationFrame(renderRef.current);
    }
  }, [isInView]);

  return (
    <canvas
      ref={(node) => {
        (canvasRef as React.MutableRefObject<HTMLCanvasElement | null>).current = node;
        (inViewRef as React.MutableRefObject<Element | null>).current = node;
      }}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};

export default ParticleCanvas;
