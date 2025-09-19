import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader";

type SourceType = {
  name: string;
  type: string;
  path: string[] | string;
};

export default class Resources extends EventEmitter {
  sources: SourceType[];
  items: any;
  toLoad: number;
  loaded: number;
  loaders: {
    gltfLoader?: GLTFLoader;
    textureLoader?: THREE.TextureLoader;
    cubeTextureLoader?: THREE.CubeTextureLoader;
    fbxLoader?: FBXLoader;
    exrLoader?: EXRLoader;
  };
  constructor(sources: SourceType[]) {
    super();

    this.sources = sources;
    this.items = {};
    this.toLoad = this.sources.length;
    this.loaded = 0;

    this.setLoader();
    this.startLoading();
  }

  setLoader() {
    this.loaders = {};
    this.loaders.gltfLoader = new GLTFLoader();
    this.loaders.textureLoader = new THREE.TextureLoader();
    this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
    this.loaders.fbxLoader = new FBXLoader();
    this.loaders.exrLoader = new EXRLoader();
  }

  startLoading() {
    this.sources.forEach((source) => {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(source.path as string, (file) => {
          this.sorceLoaded(source, file);
        });
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(source.path as string, (file) => {
          this.sorceLoaded(source, file);
        });
      } else if (source.type === "cubeTexture") {
        this.loaders.cubeTextureLoader.load(source.path, (file) => {
          this.sorceLoaded(source, file);
        });
      } else if (source.type === "fbxModel") {
        const fbxLoader = new FBXLoader();
        this.loaders.fbxLoader.load(source.path as string, (file) => {
          this.sorceLoaded(source, file);
        });
      } else if (source.type === "hdrTexture") {
        this.loaders.exrLoader.load(source.path as string, (file) => {
          this.sorceLoaded(source, file);
        });
      }
    });
  }

  sorceLoaded(source: SourceType, file: any) {
    this.items[source.name] = file;
    this.loaded++;
    if (this.loaded === this.toLoad) {
      this.trigger("ready");
    }
  }
}
