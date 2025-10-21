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
          const movement = this.getMovementVector(source.gamepad);
          this.handleCameraMovement(movement);
          this.handleCarMovement(movement);
        }
      }
    }
  }

  getMovementVector(gamepad) {
    const moveX = gamepad.axes[2] * -1 || 0;
    const moveZ = gamepad.axes[3] || 0;
    let speed = 0.05;
    // カメラの向きに関係なく、ワールド座標系で移動
    if (gamepad.buttons[0].pressed || gamepad.buttons[1].pressed) {
      const activeButton = gamepad.buttons[0].pressed
        ? gamepad.buttons[0]
        : gamepad.buttons[1];

      speed += activeButton.value;
    }

    // 固定方向ベクトル（ワールド座標系）
    const forward = new THREE.Vector3(0, 0, 1); // Z軸負方向が正面
    const right = new THREE.Vector3(-1, 0, 0); // X軸正方向が右

    // 移動量を計算
    const movement = new THREE.Vector3();
    movement.addScaledVector(forward, moveZ * speed); // 前後移動
    movement.addScaledVector(right, moveX * speed); // 左右移動

    return movement;
  }

  handleCameraMovement(movement: THREE.Vector3) {
    // カメラコンテナの位置を更新
    this.camera.moveVR(movement);
  }

  handleCarMovement(movement: THREE.Vector3) {
    if (!this.car) return;
    this.car.moveVR(movement);
    // 閾値を設けて微小な動きを無視
    const threshold = 0.0001;
    const isMoving =
      Math.abs(movement.x) > threshold || Math.abs(movement.z) > threshold;
    if (!this.carSound.isPlaying && isMoving) {
      this.carSound.play();
    } else if (!isMoving && this.carSound.isPlaying) {
      this.carSound.pause(); // stop()の代わりにpause()を使用
    }
  }
}
