import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import Resources from "../Utils/Resources";
import Floor from "./Floor";
import Fox from "./Fox";
import {VRButton} from 'three/examples/jsm/webxr/VRButton.js';

export default class World {
  experience: Experience;
  environment: Environment;
  resources: Resources;
  floor: Floor;
  fox: Fox;
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.floor = new Floor();
      this.fox = new Fox();
      this.environment = new Environment();

      document.body.appendChild( VRButton.createButton( this.experience.renderer.instance ) );
    });
  }

  update() {
    if (this.fox) this.fox.update();
  }
}
