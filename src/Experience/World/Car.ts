import Experience from "../Experience";
import * as THREE from "three";

export default class Car {
  experience: Experience;
  resources: any;
  model: any;
  animation: any;
  time: any;
  debug: any;
  debugFolder: any;
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources.items.carModel;
    this.time = this.experience.time;
    this.debug = this.experience.debug;

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder("Car");
    }

    this.setModel();
    //this.setAnimation();
  }

  setModel() {
    this.model = this.resources;
    this.model.scale.set(0.02, 0.02, 0.02);
    this.model.position.set(0, 0, 0);
    this.model.rotation.y = Math.PI;
    this.experience.scene.add(this.model);

    this.model.traverse((child: any) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
      }
    });
  }

  moveVR(moveX: number, moveZ: number) {
    // console.log("Car moveVR", direction, speed);
    // this.model.position.addScaledVector(direction, speed);
    const speed = 0.05;
    const direction = new THREE.Vector3();
    console.log("Car moveVR", moveX, moveZ);
    this.model.getWorldDirection(direction);
    direction.y = 0;
    direction.normalize();

    const right = new THREE.Vector3();
    right.crossVectors(this.model.up, direction).normalize();

    this.model.position.addScaledVector(direction, -moveZ * speed);
    this.model.position.addScaledVector(right, moveX * speed);
  }

  accelerate() {
    // 加速処理
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
