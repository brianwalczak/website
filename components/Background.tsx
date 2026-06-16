"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background() {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

		const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(renderer.domElement);

		const geometry = new THREE.PlaneGeometry(2, 2);

		const uniforms = {
			uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
			uMouse: { value: new THREE.Vector2(-1.0, -1.0) },
			uGridSize: { value: 35.0 },
			uLineAlpha: { value: 0.05 },
			uWarpRadius: { value: 0.2 },
			uWarpStrength: { value: 0.25 },
		};

		const material = new THREE.ShaderMaterial({
			transparent: true,
			uniforms,
			vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position.xy, 0.0, 1.0);
        }
      `,
			fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform vec2 uResolution;
        uniform vec2 uMouse;
        uniform float uGridSize;
        uniform float uLineAlpha;
        uniform float uWarpRadius;
        uniform float uWarpStrength;

        float gridLine(float coord, float thickness) {
          float dist = abs(fract(coord) - 0.5);
          return smoothstep(thickness, 0.0, dist);
        }

        void main() {
          vec2 uv = vUv;
          vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);

          vec2 toMouse = (uv - uMouse) * aspect;
          float dist = length(toMouse);
          float falloff = smoothstep(uWarpRadius, 0.0, dist);

          vec2 stretched = toMouse * (1.0 - falloff * uWarpStrength);
          uv = uMouse + (stretched / aspect);

          vec2 scaled = uv * (uResolution / uGridSize);
          float lineX = gridLine(scaled.x, 0.02);
          float lineY = gridLine(scaled.y, 0.02);
          float lines = max(lineX, lineY);

          gl_FragColor = vec4(1.0, 1.0, 1.0, lines * uLineAlpha);
        }
      `,
		});

		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		const handleResize = () => {
			renderer.setSize(window.innerWidth, window.innerHeight);
			uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
		};

		const handlePointerMove = (event: PointerEvent) => {
			uniforms.uMouse.value.set(event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight);
		};

		window.addEventListener("resize", handleResize);
		window.addEventListener("pointermove", handlePointerMove, { passive: true });

		let frameId = 0;
		const animate = () => {
			renderer.render(scene, camera);
			frameId = requestAnimationFrame(animate);
		};
		animate();

		return () => {
			cancelAnimationFrame(frameId);
			window.removeEventListener("resize", handleResize);
			window.removeEventListener("pointermove", handlePointerMove);
			geometry.dispose();
			material.dispose();
			renderer.dispose();
			container.removeChild(renderer.domElement);
		};
	}, []);

	return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />;
}
