"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { Pause, Play } from "lucide-react";

interface Props {
  className?: string;
}

/**
 * The JAZZEL product stage: a living-room diorama built from pure three.js
 * primitives — a red chesterfield-style armchair, oak side table, arc lamp,
 * wall frames and soft dust — in the brand's red & white. Drag to turn the
 * room. No model files, no external assets: everything is procedural.
 */
export default function HeroScene({ className }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- renderer / scene / camera ----
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xfaf8f5, 13, 34);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 1.98, 9.0);
    camera.lookAt(0, 1.3, 0);

    // ---- lights ----
    scene.add(new THREE.HemisphereLight(0xffffff, 0xefe9e2, 1.1));

    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(6, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    key.shadow.camera.left = -10;
    key.shadow.camera.right = 10;
    key.shadow.camera.top = 10;
    key.shadow.camera.bottom = -10;
    key.shadow.radius = 6;
    key.shadow.bias = -0.0004;
    scene.add(key);

    const warm = new THREE.PointLight(0xffd7cf, 8, 16, 2);
    warm.position.set(-3.6, 2.4, 1.2);
    scene.add(warm);

    // ---- palette: JAZZEL red & white ----
    const C = {
      red: 0xc41e14, // brand red upholstery
      redDeep: 0x8f0000,
      paper: 0xf5f2ee, // cream cushion
      oak: 0xc9a06a, // light wood
      walnut: 0x4a3a2e, // dark wood
      sage: 0x7d8471, // plant
      brass: 0xd9a45b,
      ink: 0x241f1c, // frame borders
    };

    const std = (color: number, roughness = 0.75, metalness = 0.05) =>
      new THREE.MeshStandardMaterial({ color, roughness, metalness });

    // ======== THE DIORAMA ========
    const world = new THREE.Group();
    world.position.y = -0.62;
    world.scale.setScalar(1.18);
    scene.add(world);

    // --- chesterfield-style red armchair ---
    const chair = new THREE.Group();
    const seatMat = std(C.red, 0.92);

    const seat = new THREE.Mesh(new RoundedBoxGeometry(2.05, 0.55, 1.05, 4, 0.22), seatMat);
    seat.position.y = 0.62;
    seat.castShadow = true;
    seat.receiveShadow = true;
    chair.add(seat);

    const backrest = new THREE.Mesh(new RoundedBoxGeometry(2.05, 0.95, 0.5, 4, 0.2), seatMat);
    backrest.position.set(0, 1.42, -0.3);
    backrest.rotation.x = -0.12;
    backrest.castShadow = true;
    chair.add(backrest);

    for (const side of [-1, 1]) {
      const arm = new THREE.Mesh(new RoundedBoxGeometry(0.42, 0.72, 1.05, 4, 0.18), seatMat);
      arm.position.set(side * 1.02, 1.05, 0);
      arm.castShadow = true;
      chair.add(arm);

      // rolled arm fronts (chesterfield character)
      const roll = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.02, 20), seatMat);
      roll.rotation.x = Math.PI / 2;
      roll.position.set(side * 1.02, 1.06, 0);
      roll.castShadow = true;
      chair.add(roll);

      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.035, 0.45, 12), std(C.walnut, 0.55, 0.12));
      leg.position.set(side * 0.78, 0.22, 0.3);
      leg.castShadow = true;
      chair.add(leg);
      const legB = leg.clone();
      legB.position.set(side * 0.78, 0.22, -0.3);
      chair.add(legB);
    }

    // button tufting hint: small dimples on the backrest
    const dimple = new THREE.SphereGeometry(0.045, 10, 10);
    const dimpleMat = std(C.redDeep, 0.95);
    for (let i = -1; i <= 1; i++) {
      for (let j = 0; j < 2; j++) {
        const d = new THREE.Mesh(dimple, dimpleMat);
        d.position.set(i * 0.55, 1.22 + j * 0.42, -0.05 - j * 0.02);
        chair.add(d);
      }
    }

    // cushions leaning on the chair — cream + red
    const cushion = new THREE.Mesh(new RoundedBoxGeometry(0.62, 0.62, 0.24, 4, 0.16), std(C.paper, 0.95));
    cushion.position.set(-0.38, 1.05, -0.02);
    cushion.rotation.set(-0.28, 0.2, 0.1);
    cushion.castShadow = true;
    chair.add(cushion);
    const cushion2 = cushion.clone();
    cushion2.position.x = 0.42;
    cushion2.rotation.set(-0.28, -0.15, -0.08);
    cushion2.material = std(0xffffff, 0.95);
    chair.add(cushion2);

    chair.position.set(-0.15, -0.4, 0.1);
    chair.rotation.y = 0.34;
    world.add(chair);

    // --- arc floor lamp ---
    const lamp = new THREE.Group();
    const poleMat = std(C.ink, 0.4, 0.6);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.38, 0.08, 32), poleMat);
    base.position.y = 0.04;
    base.castShadow = true;
    lamp.add(base);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.032, 0.032, 3.3, 12), poleMat);
    pole.position.y = 1.72;
    pole.castShadow = true;
    lamp.add(pole);

    const arcCurve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(0, 3.35, 0),
      new THREE.Vector3(0, 4.1, -0.9),
      new THREE.Vector3(0, 3.9, -1.75)
    );
    const arc = new THREE.Mesh(new THREE.TubeGeometry(arcCurve, 24, 0.03, 10, false), poleMat);
    arc.castShadow = true;
    lamp.add(arc);

    const shade = new THREE.Mesh(
      new THREE.ConeGeometry(0.42, 0.5, 28, 1, true),
      new THREE.MeshStandardMaterial({
        color: C.red,
        roughness: 0.4,
        metalness: 0.35,
        side: THREE.DoubleSide,
      })
    );
    shade.position.set(0, 3.72, -1.78);
    shade.castShadow = true;
    lamp.add(shade);

    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffe7e0 })
    );
    bulb.position.set(0, 3.5, -1.74);
    lamp.add(bulb);
    const bulbLight = new THREE.PointLight(0xffd7cf, 4.5, 5, 2);
    bulbLight.position.copy(bulb.position);
    lamp.add(bulbLight);

    lamp.position.set(2.6, -0.4, -0.4);
    lamp.rotation.y = -0.5;
    world.add(lamp);

    // --- oak side table + coffee cup ---
    const table = new THREE.Group();
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.07, 36), std(C.oak, 0.5, 0.05));
    top.position.y = 1.08;
    top.castShadow = true;
    top.receiveShadow = true;
    table.add(top);
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2;
      const tleg = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.025, 1.1, 10), poleMat);
      tleg.position.set(Math.cos(angle) * 0.34, 0.54, Math.sin(angle) * 0.34);
      tleg.rotation.z = Math.cos(angle) * 0.16;
      tleg.rotation.x = -Math.sin(angle) * 0.16;
      tleg.castShadow = true;
      table.add(tleg);
    }
    const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.075, 0.14, 20, 1, true), std(0xffffff, 0.4));
    mug.position.set(0.16, 1.19, 0.1);
    (mug.material as THREE.MeshStandardMaterial).side = THREE.DoubleSide;
    table.add(mug);
    table.position.set(1.35, -0.4, 0.9);
    world.add(table);

    // --- potted plant ---
    const plant = new THREE.Group();
    const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.22, 0.42, 24), std(0xffffff, 0.7));
    pot.position.y = 0.21;
    pot.castShadow = true;
    pot.receiveShadow = true;
    plant.add(pot);
    const leafMat = std(C.sage, 0.85);
    for (let i = 0; i < 9; i++) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.18 + Math.random() * 0.14, 12, 12), leafMat);
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 0.5;
      leaf.position.set(Math.cos(angle) * radius, 0.5 + Math.random() * 0.85, Math.sin(angle) * radius);
      leaf.scale.y = 1.5 + Math.random();
      leaf.castShadow = true;
      plant.add(leaf);
    }
    plant.position.set(-2.35, -0.4, 0.7);
    world.add(plant);

    // --- floating frames backdrop: white mats, red art ---
    const frameA = new THREE.Group();
    const frameMat = std(C.ink, 0.5, 0.08);
    const art = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.9, 0.05), std(0xffffff, 0.9));
    frameA.add(art);
    const artInner = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.55, 0.052), std(C.red, 0.85));
    artInner.position.z = 0.004;
    frameA.add(artInner);
    const frameBorder = new THREE.Mesh(new THREE.BoxGeometry(1.42, 1.02, 0.06), frameMat);
    frameBorder.position.z = -0.02;
    frameA.add(frameBorder);
    frameA.position.set(-2.0, 2.6, -3.4);
    frameA.rotation.y = 0.3;
    world.add(frameA);

    const frameB = frameA.clone();
    frameB.scale.set(0.72, 0.72, 1);
    frameB.position.set(-0.7, 2.15, -3.6);
    frameB.rotation.y = 0.12;
    (frameB.children[1] as THREE.Mesh).material = std(C.paper, 0.85);
    world.add(frameB);

    // cream rug with a red ring
    const rug = new THREE.Mesh(new THREE.CircleGeometry(2.6, 40), std(0xefe9e2, 0.95));
    rug.rotation.x = -Math.PI / 2;
    rug.position.y = -0.405;
    rug.receiveShadow = true;
    world.add(rug);
    const rugRing = new THREE.Mesh(
      new THREE.RingGeometry(2.1, 2.28, 48),
      std(C.red, 0.9)
    );
    rugRing.rotation.x = -Math.PI / 2;
    rugRing.position.y = -0.4;
    world.add(rugRing);

    // --- ground shadow catcher ---
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(14, 48),
      new THREE.ShadowMaterial({ opacity: 0.12 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.42;
    ground.receiveShadow = true;
    world.add(ground);

    // ======== soft red dust particles ========
    const dustCount = prefersReduced ? 0 : 200;
    interface DustInfo {
      mesh: THREE.Points;
      speeds: Float32Array;
    }
    let dustInfo: DustInfo | null = null;
    if (dustCount > 0) {
      const positions = new Float32Array(dustCount * 3);
      const speeds = new Float32Array(dustCount);
      for (let i = 0; i < dustCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 22;
        positions[i * 3 + 1] = Math.random() * 8.5;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
        speeds[i] = 0.12 + Math.random() * 0.4;
      }
      const dustGeo = new THREE.BufferGeometry();
      dustGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const dust = new THREE.Points(
        dustGeo,
        new THREE.PointsMaterial({
          color: 0xe54949,
          size: 0.04,
          transparent: true,
          opacity: 0.3,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
      );
      scene.add(dust);
      dustInfo = { mesh: dust, speeds };
    }

    // ======== interaction: drag to turn the room ========
    const drag = { active: false, lastX: 0, velocity: 0, angle: 0.06 };

    const onPointerDown = (e: PointerEvent) => {
      drag.active = true;
      drag.lastX = e.clientX;
      renderer.domElement.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (drag.active) {
        const dx = e.clientX - drag.lastX;
        drag.lastX = e.clientX;
        drag.velocity = dx * 0.0045;
        drag.angle += drag.velocity;
      }
    };
    const onPointerUp = () => {
      drag.active = false;
    };
    const onPointerLeave = () => {
      drag.active = false;
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", onPointerUp);
    renderer.domElement.addEventListener("pointerleave", onPointerLeave);

    // ======== animation loop ========
    const t0 = performance.now();
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };

    const onWindowPointerMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!prefersReduced) {
      window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    }

    let raf = 0;
    let disposed = false;
    let onScreen = true;

    const io = new IntersectionObserver(
      (entries) => {
        onScreen = entries[0]?.isIntersecting ?? true;
      },
      { rootMargin: "80px" }
    );
    io.observe(mount);

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
      if (!onScreen) return;
      const t = (performance.now() - t0) / 1000;
      const still = pausedRef.current || prefersReduced;

      if (!still) {
        // eased mouse parallax
        mouse.x += (mouse.tx - mouse.x) * 0.045;
        mouse.y += (mouse.ty - mouse.y) * 0.045;
        camera.position.x = mouse.x * 0.55;
        camera.position.y = 2.05 - mouse.y * 0.3;
        camera.lookAt(0, 1.35, 0);

        // drag rotation with inertia
        if (!drag.active) {
          drag.velocity *= 0.94;
          drag.angle += drag.velocity + Math.sin(t * 0.08) * 0.0006;
        }
        world.rotation.y = drag.angle;

        // gentle breathing
        chair.position.y = -0.4 + Math.sin(t * 0.9) * 0.045;
        lamp.position.y = -0.4 + Math.sin(t * 0.7 + 1.2) * 0.05;
        table.position.y = -0.4 + Math.sin(t * 0.8 + 2.4) * 0.04;
        plant.position.y = -0.4 + Math.sin(t * 0.75 + 0.6) * 0.05;
        frameA.position.y = 2.6 + Math.sin(t * 0.5) * 0.07;
        frameB.position.y = 2.15 + Math.sin(t * 0.55 + 1.7) * 0.07;

        // soft lamp life
        bulbLight.intensity = 4.2 + Math.sin(t * 5.2) * 0.3;
        warm.intensity = 7.5 + Math.sin(t * 2.2) * 0.8;

        // dust drift
        if (dustInfo) {
          const pos = dustInfo.mesh.geometry.attributes.position as THREE.BufferAttribute;
          const arr = pos.array as Float32Array;
          for (let i = 0; i < arr.length / 3; i++) {
            arr[i * 3 + 1] += dustInfo.speeds[i] * 0.008;
            arr[i * 3] += Math.sin(t * 0.6 + i) * 0.0012;
            if (arr[i * 3 + 1] > 8.5) arr[i * 3 + 1] = 0;
          }
          pos.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onWindowPointerMove);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", onPointerUp);
      renderer.domElement.removeEventListener("pointerleave", onPointerLeave);
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
    <div ref={mountRef} className={className}>
      {/* pause control: the stage keeps moving, so it can be frozen */}
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play the 3D stage" : "Pause the 3D stage"}
        className="absolute bottom-3 right-3 z-10 grid h-8 w-8 place-items-center rounded-full border border-border bg-background/85 text-foreground/70 shadow-sm backdrop-blur transition-colors hover:text-primary"
      >
        {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
      </button>
    </div>
  );
}
