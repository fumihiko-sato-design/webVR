import * as THREE from "three";
import Experience from "./Experience";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Renderer from "./Renderer";
import VRController from "./VRInputManager";

export default class Camera {
  experience: Experience;
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;
  cameraContainer: THREE.Object3D;
  renderer: Renderer;
  vrController: VRController;
  constructor() {
    this.cameraContainer = new THREE.Object3D();
    this.experience = new Experience();
    this.renderer = this.experience.renderer;
    this.vrController = this.experience.vrController;
    this.setInstance();
    this.setObitControls();

    this.renderer.on("vrstart", () => {
      this.setVRMode(true);
    });

    this.renderer.on("vrend", () => {
      this.setVRMode(false);
    });
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      90,
      this.experience.sizes.aspectRatio,
      0.1,
      1000
    );

    this.instance.position.set(-30, 40, 30);
    this.experience.scene.add(this.instance);
  }

  setObitControls() {
    this.controls = new OrbitControls(this.instance, this.experience.canvas);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.experience.sizes.aspectRatio;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }

  setVRMode(isVR: boolean) {
    if (isVR === true) {
      this.cameraContainer.add(this.instance);
      this.cameraContainer.position.set(-1, 0.75, 0);
      this.experience.scene.add(this.cameraContainer);
    } else {
      this.experience.scene.remove(this.cameraContainer);
      this.instance.position.set(4, 6, 4);
      this.experience.scene.add(this.instance);
    }
  }

  moveVR(moveX: number, moveZ: number) {
    const speed = 0.05;
    const direction = new THREE.Vector3();

    this.instance.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(this.instance.up, direction).normalize();

    this.cameraContainer.position.addScaledVector(direction, -moveZ * speed);
    this.cameraContainer.position.addScaledVector(right, moveX * speed);
  }
}
