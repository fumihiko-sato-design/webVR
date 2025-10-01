import * as THREE from "three";
import Experience from "./Experience";
import Car from "./World/Car";
import Camera from "./Camera";

export default class VRInputManager {
  experience: Experience;
  camera: Camera;
  car: Car;
  audioListener: THREE.AudioListener;
  carSound: THREE.Audio;

  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
    this.setupAudio();
  }

  setupAudio() {
    this.audioListener = new THREE.AudioListener();
    this.experience.camera.instance.add(this.audioListener);

    this.carSound = new THREE.Audio(this.audioListener);
    const audioLoader = new THREE.AudioLoader();

    audioLoader.load("sounds/car.mp3", (buffer) => {
      this.carSound.setBuffer(buffer);
      this.carSound.setLoop(true);
      this.carSound.setVolume(1);
    });
  }

  update() {
    const session = this.experience.renderer.instance.xr.getSession();
    if (!this.car) {
      this.car = this.experience.world.car;
    }

    if (session) {
      for (const source of session.inputSources) {
        if (source && source.gamepad) {
          this.handleCameraMovement(source.gamepad);
          this.handleCarMovement(source.gamepad);
        }
      }
    }
  }

  handleCameraMovement(gamepad) {
    const moveX = gamepad.axes[2] * -1 || 0;
    const moveZ = gamepad.axes[3] || 0;
    // Camera移動処理
    this.camera.moveVR(moveX, moveZ);
  }

  handleCarMovement(gamepad) {
    const moveX = gamepad.axes[2] * -1 || 0;
    const moveZ = gamepad.axes[3] || 0;

    if (!this.car) return;
    this.car.moveVR(moveX, moveZ);
    // 閾値を設けて微小な動きを無視
    const threshold = 0.1;
    const isMoving = Math.abs(moveX) > threshold || Math.abs(moveZ) > threshold;

    if (!this.carSound.isPlaying && isMoving) {
      this.carSound.play();
    } else if (!isMoving && this.carSound.isPlaying) {
      this.carSound.pause(); // stop()の代わりにpause()を使用
    }
  }
}
