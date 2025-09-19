import * as THREE from "three";
import Experience from "./Experience";
import WebXRPolyfill from "webxr-polyfill";
import EventEmitter from "./Utils/EventEmitter";

export default class Renderer extends EventEmitter{
  experience: Experience;
  instance: THREE.WebGLRenderer;
  constructor() {
    super();
    this.experience = new Experience();
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.experience.canvas,
      antialias: true,
    });
    this.instance.xr.enabled = true;
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height
    );
    this.instance.setPixelRatio(this.experience.sizes.pixelRatio);

    // ポリフィルを使用
    const polyfill = new WebXRPolyfill();

    this.instance.setAnimationLoop(this.tick.bind(this));

    this.instance.xr.addEventListener("sessionstart", () => {
       this.trigger("vrstart");
    });
    this.instance.xr.addEventListener("sessionend", () => {
      this.trigger("vrend");
    });
  }

  resize() {
    this.instance.setSize(
      this.experience.sizes.width,
      this.experience.sizes.height
    );
    this.instance.setPixelRatio(this.experience.sizes.pixelRatio);
  }

  tick() {
    this.instance.render(
      this.experience.scene,
      this.experience.camera.instance
    );
  }

  update() {
    this.instance.render(
      this.experience.scene,
      this.experience.camera.instance
    );
  }
}
