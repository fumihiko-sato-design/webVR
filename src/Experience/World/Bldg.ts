import Experience from "../Experience";
import * as THREE from "three";

export default class Bldg {
  experience: Experience;
  resources: any;
  model: any;
  animation: any;
  time: any;
  debug: any;
  debugFolder: any;
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources.items.buildingModel;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Bldg");
    }

    this.setModel();
    //this.setAnimation();
  }

  setModel() {
    this.model = this.resources.scene;
    this.model.scale.set(0.004, 0.004, 0.004);
    this.model.position.set(20, 0, 0);
    this.experience.scene.add(this.model);

    this.model.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        // child.material.wireframe = true;
        // child.material.color = new THREE.Color(0x008833);
        // child.material.emissiveIntensity = 2;
        // child.material.toneMapped = false;
      }
    });
  }

  // setAnimation() {
  //   this.animation = {};
  //   this.animation.mixer = new THREE.AnimationMixer(this.model);

  //   this.animation.action = {};

  //   this.animation.action.idle = this.animation.mixer.clipAction(
  //     this.resources.animations[0]
  //   );
  //   this.animation.action.warlking = this.animation.mixer.clipAction(
  //     this.resources.animations[1]
  //   );
  //   this.animation.action.running = this.animation.mixer.clipAction(
  //     this.resources.animations[2]
  //   );

  //   this.animation.action.current = this.animation.action.idle;
  //   this.animation.action.current.play();

  //   this.animation.play = (name) => {
  //     const newAction = this.animation.action[name];
  //     const oldAction = this.animation.action.current;

  //     newAction.reset();
  //     newAction.play();
  //     newAction.crossFadeFrom(oldAction, 1);

  //     this.animation.action.current = newAction;
  //   };

  //   // Debug
  //   if (this.debug.active) {
  //     const debugObject = {
  //       playIdle: () => {
  //         this.animation.play("idle");
  //       },
  //       playWalking: () => {
  //         this.animation.play("warlking");
  //       },
  //       playRunning: () => {
  //         this.animation.play("running");
  //       },
  //     };

  //     this.debugFolder.add(debugObject, "playIdle");
  //     this.debugFolder.add(debugObject, "playWalking");
  //     this.debugFolder.add(debugObject, "playRunning");
  //   }
  // }

  update() {
    this.animation.mixer.update(this.time.delta * 0.001);
  }
}
