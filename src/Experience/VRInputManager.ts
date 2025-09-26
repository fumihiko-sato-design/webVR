import Experience from "./Experience";
import Car from "./World/Car";
import Camera from "./Camera";

export default class VRInputManager {
  experience: Experience;
  camera: Camera;
  car: Car;

  constructor() {
    this.experience = new Experience();
    this.camera = this.experience.camera;
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

    // 別のボタンや軸でCar操作
    if (gamepad.buttons[0].pressed) {
      this.car.accelerate();
    }
  }
}
