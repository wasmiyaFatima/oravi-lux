import {
  createLogoScene,
  type CameraView,
} from "../../src/lib/logo-3d/createLogoScene";
import "./style.css";

const canvas = document.querySelector<HTMLCanvasElement>("#stage");
if (!canvas) throw new Error("Missing canvas");

const scene = await createLogoScene({
  canvas,
  svgUrl: "/logo.svg",
  quality: "studio",
  controls: true,
});

const depth = document.querySelector<HTMLInputElement>("#depth");
const bevel = document.querySelector<HTMLInputElement>("#bevel");
const metal = document.querySelector<HTMLInputElement>("#metal");
const rough = document.querySelector<HTMLInputElement>("#rough");
const light = document.querySelector<HTMLInputElement>("#light");
const bg = document.querySelector<HTMLInputElement>("#bg");
const reset = document.querySelector<HTMLButtonElement>("#reset");

if (depth) depth.value = String(scene.params.depth);
if (bevel) bevel.value = String(scene.params.bevel);
if (metal) metal.value = String(scene.params.metalness);
if (rough) rough.value = String(scene.params.roughness);
if (light) light.value = String(scene.params.lightIntensity);
if (bg) bg.value = scene.params.background;

depth?.addEventListener("input", () => scene.setDepth(Number(depth.value)));
bevel?.addEventListener("input", () => scene.setBevel(Number(bevel.value)));
metal?.addEventListener("input", () => scene.setMetalness(Number(metal.value)));
rough?.addEventListener("input", () => scene.setRoughness(Number(rough.value)));
light?.addEventListener("input", () =>
  scene.setLightIntensity(Number(light.value)),
);
bg?.addEventListener("input", () => scene.setBackground(bg.value));
reset?.addEventListener("click", () => scene.resetCamera());

document.querySelectorAll<HTMLButtonElement>("[data-view]").forEach((button) => {
  button.addEventListener("click", () => {
    const view = button.dataset.view as CameraView;
    scene.setView(view);
  });
});

window.addEventListener("resize", () => scene.resize());
