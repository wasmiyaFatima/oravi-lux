import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

export type CameraView = "front" | "threeQuarter" | "side";

export type LogoSceneQuality = "intro" | "studio";

export type LogoSceneParams = {
  depth: number;
  bevel: number;
  metalness: number;
  roughness: number;
  lightIntensity: number;
  background: string;
};

export type CreateLogoSceneOptions = {
  canvas: HTMLCanvasElement;
  svgUrl: string;
  quality?: LogoSceneQuality;
  controls?: boolean;
  view?: CameraView;
  onReady?: () => void;
};

export type LogoSceneHandle = {
  params: LogoSceneParams;
  setDepth: (value: number) => void;
  setBevel: (value: number) => void;
  setMetalness: (value: number) => void;
  setRoughness: (value: number) => void;
  setLightIntensity: (value: number) => void;
  setBackground: (hex: string) => void;
  setView: (view: CameraView) => void;
  resetCamera: () => void;
  resize: () => void;
  dispose: () => void;
};

type ParsedLayer = {
  shapes: THREE.Shape[];
  accent: boolean;
};

const CHAMPAGNE = 0xc9b48a;
const ANTIQUE = 0x9a7348;
const DEFAULTS: LogoSceneParams = {
  depth: 9,
  bevel: 0.32,
  metalness: 0.9,
  roughness: 0.3,
  lightIntensity: 1,
  background: "#140e0a",
};

function isSkippedFill(fill: string) {
  const value = fill.trim().toLowerCase();
  return !value || value === "none" || value === "transparent";
}

function isAccentFill(fill: string) {
  const value = fill.replace(/\s/g, "").toLowerCase();
  return (
    value.includes("956937") ||
    value.includes("rgb(149,105,55)") ||
    value.includes("rgb(149,105,55)")
  );
}

function metalMaterial(color: number, params: LogoSceneParams) {
  return new THREE.MeshPhysicalMaterial({
    color,
    metalness: params.metalness,
    roughness: params.roughness,
    envMapIntensity: 1.15,
    clearcoat: 0.08,
    clearcoatRoughness: 0.42,
    reflectivity: 0.92,
    ior: 1.45,
    specularIntensity: 0.85,
  });
}

export async function createLogoScene(
  options: CreateLogoSceneOptions,
): Promise<LogoSceneHandle> {
  const quality = options.quality ?? "studio";
  const params: LogoSceneParams = { ...DEFAULTS };
  if (quality === "intro") {
    params.background = "#F6EED4";
    params.bevel = 0.3;
    params.depth = 8.4;
    params.metalness = 0.92;
    params.roughness = 0.28;
  }

  const renderer = new THREE.WebGLRenderer({
    canvas: options.canvas,
    antialias: true,
    alpha: quality === "intro",
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, quality === "studio" ? 2 : 1.5),
  );
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = quality === "intro" ? 1.06 : 1.04;
  renderer.shadowMap.enabled = quality === "studio";
  renderer.shadowMap.type = THREE.PCFShadowMap;
  if (quality === "intro") {
    renderer.setClearColor(0x000000, 0);
  }

  const scene = new THREE.Scene();
  if (quality === "intro") {
    scene.background = null;
  } else {
    scene.background = new THREE.Color(params.background);
    scene.fog = new THREE.FogExp2(params.background, 0.028);
  }

  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 120);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const key = new THREE.DirectionalLight(0xfff3e0, 2.05);
  key.position.set(7.5, 11, 9);
  key.castShadow = true;
  key.shadow.mapSize.set(
    quality === "studio" ? 2048 : 1024,
    quality === "studio" ? 2048 : 1024,
  );
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 40;
  key.shadow.camera.left = -10;
  key.shadow.camera.right = 10;
  key.shadow.camera.top = 10;
  key.shadow.camera.bottom = -10;
  key.shadow.radius = 7;
  key.shadow.bias = -0.00025;
  scene.add(key);

  const fill = new THREE.DirectionalLight(0xead7c0, 0.38);
  fill.position.set(-8, 4.2, 5.5);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(0xf2e6d4, 0.92);
  rim.position.set(-3.5, 6.5, -10);
  scene.add(rim);

  const hemi = new THREE.HemisphereLight(0xf6ead6, 0x2a1c14, 0.42);
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(0x3a2c22, 0.18);
  scene.add(ambient);

  if (quality === "intro") {
    key.color.setHex(0xffefc4);
    key.intensity = 2.35;
    key.position.set(-5.8, 12, 7.2);
    fill.color.setHex(0xb8925c);
    fill.intensity = 0.32;
    fill.position.set(8.2, 2.4, 4.5);
    rim.color.setHex(0xfff4dc);
    rim.intensity = 0.78;
    hemi.color.setHex(0xfff0d4);
    hemi.groundColor.setHex(0x6a4e2e);
    hemi.intensity = 0.34;
    ambient.color.setHex(0x4a3424);
    ambient.intensity = 0.16;
  }

  const logoPivot = new THREE.Group();
  const logoBuild = new THREE.Group();
  logoPivot.add(logoBuild);
  scene.add(logoPivot);

  const champagne = metalMaterial(CHAMPAGNE, params);
  const antique = metalMaterial(ANTIQUE, params);
  if (quality === "intro") {
    champagne.envMapIntensity = 0.88;
    antique.envMapIntensity = 0.96;
    champagne.clearcoat = 0.12;
    antique.clearcoat = 0.1;
  }

  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(40, 40),
    new THREE.ShadowMaterial({ opacity: quality === "intro" ? 0.08 : 0.38 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.receiveShadow = true;
  floor.visible = quality !== "intro";
  scene.add(floor);

  const loader = new SVGLoader();
  const svg = await loader.loadAsync(options.svgUrl);
  const layers: ParsedLayer[] = [];

  for (const path of svg.paths) {
    const fill = String(
      (path.userData.style as { fill?: string } | undefined)?.fill ?? "",
    );
    if (isSkippedFill(fill)) continue;
    const shapes = path.toShapes();
    if (!shapes.length) continue;
    layers.push({ shapes, accent: isAccentFill(fill) });
  }

  function extrudeOptions(): THREE.ExtrudeGeometryOptions {
    const bevel = Math.min(params.bevel, params.depth * 0.12);
    return {
      depth: params.depth,
      bevelEnabled: bevel > 0.02,
      bevelThickness: bevel,
      bevelSize: bevel * 0.65,
      bevelOffset: 0,
      bevelSegments: 2,
      curveSegments: quality === "studio" ? 6 : 4,
    };
  }

  function clearMeshes() {
    const doomed: THREE.Object3D[] = [];
    logoBuild.traverse((child) => {
      if (child instanceof THREE.Mesh) doomed.push(child);
    });
    for (const child of doomed) {
      logoBuild.remove(child);
      const mesh = child as THREE.Mesh;
      mesh.geometry.dispose();
    }
  }

  function rebuildLogo() {
    clearMeshes();
    const settings = extrudeOptions();
    for (const layer of layers) {
      const material = layer.accent ? antique : champagne;
      for (const shape of layer.shapes) {
        const geometry = new THREE.ExtrudeGeometry(shape, settings);
        geometry.computeVertexNormals();
        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        logoBuild.add(mesh);
      }
    }

    logoBuild.scale.set(1, -1, 1);
    logoBuild.position.set(0, 0, 0);
    const box = new THREE.Box3().setFromObject(logoBuild);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    logoBuild.position.sub(center);
    const maxDim = Math.max(size.x, size.y, 1);
    const target = 6.2;
    fitScale = target / maxDim;
    logoPivot.scale.setScalar(fitScale);
    logoPivot.updateMatrixWorld(true);

    const world = new THREE.Box3().setFromObject(logoPivot);
    floor.position.y = world.min.y - 0.02;
    key.shadow.camera.updateProjectionMatrix();
  }

  let fitScale = 1;
  rebuildLogo();

  let fittedDistance = 9.4;
  function fitDistance() {
    const box = new THREE.Box3().setFromObject(logoPivot);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    fittedDistance = Math.max(
      maxDim * (quality === "intro" ? 1.88 : 1.55),
      quality === "intro" ? 9.6 : 8.2,
    );
  }
  fitDistance();

  const viewPositions: Record<CameraView, THREE.Vector3> = {
    front:
      quality === "intro"
        ? new THREE.Vector3(0.26, 0.22, 1)
        : new THREE.Vector3(0, 0.15, 1),
    threeQuarter: new THREE.Vector3(0.58, 0.26, 0.96),
    side: new THREE.Vector3(1, 0.12, 0.16),
  };

  function applyView(view: CameraView, instant = false) {
    const dir = viewPositions[view].clone().normalize();
    const next = dir.multiplyScalar(fittedDistance);
    if (instant) {
      camera.position.copy(next);
    } else {
      camera.position.copy(next);
    }
    camera.lookAt(0, 0.08, 0);
  }

  let controls: {
    update: () => void;
    target: THREE.Vector3;
    enableDamping: boolean;
    dampingFactor: number;
    minDistance: number;
    maxDistance: number;
    dispose: () => void;
  } | null = null;

  if (options.controls) {
    const { OrbitControls } = await import(
      "three/examples/jsm/controls/OrbitControls.js"
    );
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableDamping = true;
    orbit.dampingFactor = 0.06;
    orbit.target.set(0, 0.08, 0);
    orbit.minDistance = 4.2;
    orbit.maxDistance = 18;
    orbit.maxPolarAngle = Math.PI * 0.49;
    controls = orbit;
  }

  applyView(options.view ?? (quality === "intro" ? "front" : "threeQuarter"), true);
  controls?.update();

  function sizeCanvas() {
    const parent = options.canvas.parentElement ?? options.canvas;
    const width = Math.max(parent.clientWidth, 1);
    const height = Math.max(parent.clientHeight, 1);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  sizeCanvas();

  const lights = { key, fill, rim, hemi, ambient };
  const base = {
    key: key.intensity,
    fill: fill.intensity,
    rim: rim.intensity,
    hemi: hemi.intensity,
    ambient: ambient.intensity,
  };

  function applyLightIntensity(value: number) {
    params.lightIntensity = value;
    lights.key.intensity = base.key * value;
    lights.fill.intensity = base.fill * value;
    lights.rim.intensity = base.rim * value;
    lights.hemi.intensity = base.hemi * value;
    lights.ambient.intensity = base.ambient * value;
  }

  let frame = 0;
  let alive = true;
  const startedAt = performance.now();

  function tick() {
    if (!alive) return;
    frame = requestAnimationFrame(tick);
    const t = (performance.now() - startedAt) / 1000;
    if (quality === "intro") {
      const appear = Math.min(t / 1.12, 1);
      const ease = 1 - (1 - appear) ** 3;
      logoPivot.scale.setScalar(fitScale * (0.9 + 0.1 * ease));
      logoPivot.rotation.y = (1 - ease) * 0.34 + Math.sin(t * 0.48) * 0.038;
      logoPivot.rotation.x = (1 - ease) * 0.08;
      lights.key.intensity =
        base.key * (0.9 + ease * 0.1 + Math.sin(appear * Math.PI) * 0.22);
    }
    controls?.update();
    renderer.render(scene, camera);
  }
  tick();

  options.onReady?.();

  return {
    params,
    setDepth(value) {
      params.depth = value;
      rebuildLogo();
      fitDistance();
    },
    setBevel(value) {
      params.bevel = value;
      rebuildLogo();
    },
    setMetalness(value) {
      params.metalness = value;
      champagne.metalness = value;
      antique.metalness = value;
    },
    setRoughness(value) {
      params.roughness = value;
      champagne.roughness = value;
      antique.roughness = value;
    },
    setLightIntensity(value) {
      applyLightIntensity(value);
    },
    setBackground(hex) {
      params.background = hex;
      scene.background = new THREE.Color(hex);
      scene.fog = new THREE.FogExp2(hex, 0.028);
    },
    setView(view) {
      applyView(view);
      if (controls) {
        camera.lookAt(controls.target);
      }
    },
    resetCamera() {
      applyView("threeQuarter", true);
      if (controls) {
        controls.target.set(0, 0.08, 0);
        controls.update();
      }
    },
    resize: sizeCanvas,
    dispose() {
      alive = false;
      cancelAnimationFrame(frame);
      controls?.dispose();
      clearMeshes();
      champagne.dispose();
      antique.dispose();
      floor.geometry.dispose();
      (floor.material as THREE.Material).dispose();
      scene.environment?.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}

export const LOGO_SCENE_DEFAULTS = DEFAULTS;
