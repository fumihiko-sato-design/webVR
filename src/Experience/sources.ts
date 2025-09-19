export default [
  {
    name: "environmentMapTexture",
    type: "cubeTexture",
    path: [
      "textures/environmentMap/px.jpg",
      "textures/environmentMap/nx.jpg",
      "textures/environmentMap/py.jpg",
      "textures/environmentMap/ny.jpg",
      "textures/environmentMap/pz.jpg",
      "textures/environmentMap/nz.jpg",
    ],
  },
  {
    name: "grassColorTexture",
    type: "texture",
    path: "textures/concrete/concrete_floor_worn_001_diff_2k.jpg",
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: "textures/concrete/concrete_floor_worn_001_rough_2k.jpg",
  },
  {
    name: "foxModel",
    type: "gltfModel",
    path: "models/Fox/glTF/Fox.gltf",
  },
  {
    name: "carModel",
    type: "fbxModel",
    path: "models/Car/Generic_SUV_v1_2023_LowPoly_fbx2015.FBX",
  },
  {
    name: "buildingModel",
    type: "gltfModel",
    path: "models/Bldg/53394577_bldg_6677.glb",
  },
  {
    name: "skyTexture",
    type: "hdrTexture",
    path: "models/hdri/Sunflowers_Pure_Sky_2K.exr",
  },
];
