"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export interface FabricOption {
  name: string;
  color: number;
  swatch: string; // css hex for UI
}

export const fabrics: FabricOption[] = [
  { name: "Terracotta Weave", color: 0xb3703f, swatch: "#b3703f" },
  { name: "Morning Linen", color: 0xe4d5bd, swatch: "#e4d5bd" },
  { name: "Deep Forest", color: 0x5c6b57, swatch: "#5c6b57" },
  { name: "Charcoal Boucle", color: 0x3d3d42, swatch: "#3d3d42" },
  { name: "Ocean Slate", color: 0x42506b, swatch: "#42506b" },
];

/**
 * Interactive 3D sofa: drag to rotate (with inertia), auto-rotate when idle,
 * switch upholstery fabric live. Showcases JAZZEL's custom-made designs.
 */
export default function SofaConfigurator({
  className,
  activeColor,
  onPickColor,
}: {
  className?: string;
  activeColor: number;
  onPickColor: (color: number) => void;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef(activeColor);

  useEffect(() => {
    colorRef.current = activeColor;
  }, [activeColor]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 60);
    camera.position.set(0, 2.4, 11.4);
    camera.lookAt(0, 1.0, 0);

    // lights
    scene.add(new THREE.HemisphereLight(0xfff3e0, 0xd9c8b2, 0.95));
    const key = new THREE.DirectionalLight(0xffe9d0, 2.0);
    key.position.set(6, 8, 4);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -6;
    key.shadow.camera.right = 6;
    key.shadow.camera.top = 6;
    key.shadow.camera.bottom = -6;
    key.shadow.radius = 7;
    key.shadow.bias = -0.0005;
    scene.add(key);
    const rim = new THREE.PointLight(0xffc98a, 8, 12, 2);
    rim.position.set(-5, 3, -3);
    scene.add(rim);

    // ===== build sofa =====
    const sofa = new THREE.Group();
    scene.add(sofa);

    const upholstery = new THREE.MeshStandardMaterial({
      color: fabrics[0].color,
      roughness: 0.92,
      metalness: 0.0,
    });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x6b4a2f, roughness: 0.55, metalness: 0.08 });
    const legMat = new THREE.MeshStandardMaterial({ color: 0x2f2a24, roughness: 0.4, metalness: 0.4 });

    // base
    const base = new THREE.Mesh(new RoundedBoxGeometry(5.4, 1.1, 2.5, 4, 0.28), upholstery);
    base.position.y = 0.85;
    base.castShadow = true;
    base.receiveShadow = true;
    sofa.add(base);

    // backrest (curved feel via 3 slabs)
    for (let i = 0; i < 3; i++) {
      const back = new THREE.Mesh(new RoundedBoxGeometry(5.4, 1.5, 0.75, 4, 0.3), upholstery);
      back.position.set(0, 1.65 + i * 0.28, -1.0 + i * 0.34);
      back.rotation.x = -0.14 - i * 0.06;
      back.castShadow = true;
      sofa.add(back);
    }

    // arms
    for (const side of [-1, 1]) {
      const arm = new THREE.Mesh(new RoundedBoxGeometry(0.62, 1.15, 2.5, 4, 0.26), upholstery);
      arm.position.set(side * 3.0, 1.55, 0);
      arm.castShadow = true;
      sofa.add(arm);
    }

    // seat cushions
    const cushionMat = () => new THREE.MeshStandardMaterial({ color: colorRef.current, roughness: 0.95 });
    const cushions: THREE.Mesh[] = [];
    for (const x of [-1.8, 0, 1.8]) {
      const c = new THREE.Mesh(new RoundedBoxGeometry(1.72, 0.55, 1.9, 4, 0.2), cushionMat());
      c.position.set(x, 1.55, 0.25);
      c.rotation.x = 0.03;
      c.castShadow = true;
      sofa.add(c);
      cushions.push(c);
    }
    // back throw pillows
    for (const x of [-1.55, 1.55]) {
      const p = new THREE.Mesh(new RoundedBoxGeometry(1.05, 1.05, 0.42, 4, 0.18), cushionMat());
      p.position.set(x, 2.35, -0.62);
      p.rotation.set(-0.32, x > 0 ? 0.18 : -0.18, 0);
      p.castShadow = true;
      sofa.add(p);
      cushions.push(p);
    }

    // wooden feet
    for (const [x, z] of [
      [-2.35, 0.95],
      [2.35, 0.95],
      [-2.35, -0.95],
      [2.35, -0.95],
    ]) {
      const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.055, 0.55, 12), legMat);
      foot.position.set(x, 0.28, z);
      foot.castShadow = true;
      sofa.add(foot);
    }

    // wood trim along the base front
    const trim = new THREE.Mesh(new RoundedBoxGeometry(5.42, 0.22, 0.18, 2, 0.06), woodMat);
    trim.position.set(0, 0.42, 1.22);
    sofa.add(trim);

    // soft floor
    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(9, 48),
      new THREE.ShadowMaterial({ opacity: 0.16 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);

    // ===== interaction: drag rotate + inertia =====
    let dragging = false;
    let lastX = 0;
    let velocity = prefersReduced ? 0 : 0.16; // idle auto-rotate speed
    let idleTimer = 0;

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      velocity = 0;
      renderer.domElement.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      sofa.rotation.y += dx * 0.0085;
      velocity = dx * 0.0085;
      idleTimer = 0;
    };
    const onUp = () => {
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    };
    renderer.domElement.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);

    // prevent click-through of swatch clicks (mount only handles drags)
    let raf = 0;
    let disposed = false;
    const clock = new THREE.Clock();

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const animate = () => {
      if (disposed) return;
      raf = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.getElapsedTime();

      // inertia + return to slow auto-rotate after idle
      if (!dragging) {
        velocity *= 0.94;
        idleTimer += dt;
        if (idleTimer > 2.2 && !prefersReduced) velocity += (0.16 - velocity) * 0.02;
        sofa.rotation.y += velocity * (dt * 60) * 0.6;
      }

      // live fabric recolor
      const target = new THREE.Color(colorRef.current);
      for (const m of [upholstery, ...cushions.map((c) => c.material as THREE.MeshStandardMaterial)]) {
        m.color.lerp(target, 0.18);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      renderer.domElement.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else if (mat) mat.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={className}
      role="img"
      aria-label="Interactive 3D sofa — drag to rotate, switch fabric colors"
    />
  );
}
