import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";
import Floor from "./Floor";
import Fox from "./Fox";
import Car from "./Car";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import Bldg from "./Bldg";

export default class World {
  experience: Experience;
  environment: Environment;
  resources: Resources;
  floor: Floor;
  fox: Fox;
  car: Car;
  bldg: Bldg;
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      // this.floor = new Floor();
      //this.fox = new Fox();
      this.car = new Car();
      this.bldg = new Bldg();
      this.environment = new Environment();

      console.log(this.resources.items.skyTexture);
      const texture = this.resources.items.skyTexture;
      texture.mapping = THREE.EquirectangularReflectionMapping;
      this.experience.scene.environment = texture; // 環境光として利用
      this.experience.scene.background = texture; // 背景としても利用
      document.body.appendChild(
        VRButton.createButton(this.experience.renderer.instance)
      );
    });
  }

  update() {
    if (this.fox) this.fox.update();
  }
}
