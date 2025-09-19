import * as THREE from "three";
import Experience from "../Experience";
import { normalMap } from "three/examples/jsm/nodes/Nodes.js";

export default class Floor {
  gerometry: THREE.PlaneGeometry;
  experience: Experience;
  textures: any;
  material: THREE.MeshStandardMaterial;
  mesh: THREE.Mesh;
  constructor() {
    this.experience = new Experience();

    this.setGeometries();
    this.setTextures();
    this.setMaterials();
    this.setMeshes();
  }

  setGeometries() {
    this.gerometry = new THREE.PlaneGeometry(500, 500, 1, 1);
  }
  setTextures() {
    this.textures = {};
    this.textures.color = this.experience.resources.items.grassColorTexture;
    this.textures.color.colorSpace = THREE.SRGBColorSpace;
    this.textures.color.repeat.set(1.5, 1.5);
    this.textures.color.wrapS = THREE.RepeatWrapping;
    this.textures.color.wrapT = THREE.RepeatWrapping;

    this.textures.rough = this.experience.resources.items.grassNormalTexture;
    this.textures.rough.repeat.set(1.5, 1.5);
    this.textures.rough.wrapS = THREE.RepeatWrapping;
    this.textures.rough.wrapT = THREE.RepeatWrapping;
    // this.textures.normal = this.experience.resources.items.grassNormalTexture;
    // this.textures.normal.repeat.set(1.5, 1.5);
    // this.textures.normal.wrapS = THREE.RepeatWrapping;
    // this.textures.normal.wrapT = THREE.RepeatWrapping;
  }
  setMaterials() {
    this.material = new THREE.MeshStandardMaterial({
      map: this.textures.color,
      roughnessMap: this.textures.rough, // ← 追加
      // normalMap: this.textures.normal,
    });
  }
  setMeshes() {
    this.mesh = new THREE.Mesh(this.gerometry, this.material);
    this.mesh.rotation.x = -Math.PI * 0.5;
    this.mesh.receiveShadow = true;
    this.experience.scene.add(this.mesh);
  }
}
