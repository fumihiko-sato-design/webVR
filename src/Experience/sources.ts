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
    path: "textures/dirt/color.jpg",
  },
  {
    name: "grassNormalTexture",
    type: "texture",
    path: "textures/dirt/normal.jpg",
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
    path: "models/Bldg/64414283_bldg_6680.glb",
  },
  {
    name: "skyTexture",
    type: "hdrTexture",
    path: "models/hdri/Sunflowers_Pure_Sky_2K.exr",
  },
];
