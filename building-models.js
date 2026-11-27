import { BoxGeometry, Group, InstancedMesh, Matrix4, MeshStandardMaterial, Vector3 } from 'three';

const geometry = new BoxGeometry();
const materials = new Map();
const stone = 0xd9d6c9;
const metal = 0x273943;
const glass = 0x438298;
const warmGlass = 0xdcae69;
const foliage = 0x497143;

function material(color) {
  if (!materials.has(color)) {
    const glazing = color === glass || color === warmGlass;
    materials.set(color, new MeshStandardMaterial({
      color, roughness: glazing ? 0.24 : 0.76, metalness: glazing ? 0.44 : 0.08,
    }));
  }
  return materials.get(color);
}

function construction(box, tier) {
  const floors = [0, 2, 3, 5, 7][tier];
  const top = 1.28 + floors * 0.94;
  box(stone, 6.8, 0.28, 6.1, 0, 0.39, 0);
  box(metal, 5.9, 1.02, 4.5, 0, 0.99, -0.18);
  box(glass, 5.7, 0.80, 0.08, 0, 0.99, 2.1);
  box(stone, 3.8, top - 1.4, 3.7, -0.72, (top + 1.4) / 2, -0.52);
  const wing = Math.min(3.8, top - 0.75);
  box(0x54626b, 1.78, wing - 0.53, 2.95, 2.10, (wing + 0.53) / 2, -0.45);
  for (let floor = 0; floor < floors; floor++) {
    const y = 1.77 + floor * 0.94;
    for (let bay = 0; bay < 5; bay++) {
      const x = -2.29 + bay * 0.78;
      box((floor + bay) % 7 === 0 ? warmGlass : glass, 0.68, 0.69, 0.08, x, y, 1.36);
      box(glass, 0.68, 0.69, 0.08, x, y, -2.4);
    }
    for (let bay = 0; bay < 4; bay++) {
      for (const x of [-2.66, 1.22]) {
        box(glass, 0.08, 0.69, 0.75, x, y, -1.84 + bay * 0.86);
      }
    }
    box(stone, 4.03, 0.1, 3.96, -0.72, y + 0.45, -0.52);
  }
  for (const x of [-2.65, 1.23]) {
    box(stone, 0.16, top - 1.28, 0.23, x, (top + 1.28) / 2, 1.48);
  }
  box(metal, 4.02, 0.24, 3.98, -0.72, top, -0.52);
  box(stone, 1.14, 0.38, 0.94, -1.61, top + 0.31, -1.24);
  box(metal, 1.44, 0.07, 1.02, 0.11, top + 0.16, -0.95);
  for (const x of [-0.36, 0.11, 0.58]) {
    box(0x2a515e, 0.43, 0.035, 0.92, x, top + 0.22, -0.95, -0.12);
  }
  box(metal, 1.98, 0.18, 3.16, 2.1, wing, -0.45);
  if (tier >= 2) {
    box(glass, 1.59, wing - 1.37, 0.08, 2.1, (wing + 1.21) / 2, 1.07);
    for (let i = 0; i < 6; i++) {
      box(0xb39162, 0.075, wing - 1.25, 0.24, 1.39 + 0.28 * i, (wing + 1.17) / 2, 1.19);
    }
    box(foliage, 1.56, 0.12, 2.60, 2.1, wing + 0.13, -0.46);
  }
  box(metal, 2.4, 0.16, 1.16, -0.63, 1.53, 2.49);
  box(0xa5b9bb, 0.92, 0.87, 0.09, -0.63, 0.97, 2.16);
  for (const x of [-1.70, 0.44]) {
    box(stone, 0.11, 0.94, 0.11, x, 1, 2.96);
  }
  for (const x of [-2.64, 2.56]) {
    box(metal, 0.93, 0.22, 0.61, x, 0.63, 2.62);
    box(foliage, 0.79, 0.21, 0.49, x, 0.81, 2.62);
  }
  return top + 0.5;
}

function architecture(box, tier) {
  const height = 1.8 + tier * 0.55;
  box(stone, 5.6, 0.23, 4.9, 0, 0.37, 0);
  box(0xe1e1d8, 4.8, height, 3.6, 0, height / 2 + 0.49, -0.25);
  box(glass, 4.14, height * 0.75, 0.08, 0, height / 2 + 0.51, 1.59);
  for (let i = 0; i < 7; i++) {
    box(0xa4744c, 0.11, height * 0.91, 0.29, -2.03 + i * 0.68, height / 2 + 0.49, 1.73);
  }
  for (let i = 0; i < tier + 2; i++) {
    box(0xd8d8cb, 0.33, 0.22, 4.18, (i - (tier + 1) / 2) * 0.72, height + 0.57, -0.25, -0.16);
  }
  box(0x433c35, 1.28, 1.68, 0.1, -1.69, 1.33, 1.86);
  box(0xd8b28a, 1.66, 0.12, 1.18, -1.69, 2.23, 2.11);
  box(foliage, 1.58, 0.24, 0.55, 1.34, 0.61, 2.02);
  return height + 1;
}

function office(box, tier) {
  const floors = tier + 1;
  const height = 1.65 + floors * 0.76;
  const brick = 0x9d5a45;
  box(stone, 5.8, 0.23, 4.55, 0, 0.37, 0);
  box(brick, 5.1, height, 3.5, 0, height / 2 + 0.48, -0.2);
  for (const x of [-1.9, -0.65, 0.65, 1.9]) {
    box(glass, 0.98, 1.14, 0.1, x, 1.13, 1.58);
    for (let floor = 0; floor < floors; floor++) {
      box(glass, 0.72, 0.46, 0.09, x, 2.32 + floor * 0.76, 1.58);
      box(stone, 0.85, 0.09, 0.19, x, 2.05 + floor * 0.76, 1.63);
    }
  }
  for (const x of [-2.59, 2.59]) {
    for (let floor = 0; floor < floors; floor++) {
      box(glass, 0.08, 0.46, 2.37, x, 2.32 + floor * 0.76, -0.2);
    }
  }
  box(0x254e45, 5.3, 0.19, 0.91, 0, 1.83, 1.92, 0.18);
  box(stone, 5.36, 0.25, 3.78, 0, height + 0.48, -0.2);
  box(metal, 2.15, 0.36, 1.31, 0, height + 0.74, -0.53);
  return height + 0.94;
}

function residence(box, tier) {
  const height = tier >= 3 ? 3.14 : 2.14;
  const roofLength = 2.28;
  const pitch = Math.PI / 5.8;
  const halfSpan = Math.cos(pitch) * roofLength / 2;
  const ridge = height + 0.51 + Math.sin(pitch) * halfSpan / Math.cos(pitch) * 2;
  box(0xc6b8a5, 5.85, 0.23, 5.08, 0, 0.37, 0);
  box(0xe3cc9b, 4.24, height, 3.65, -0.36, height / 2 + 0.49, -0.45);
  for (const side of [-1, 1]) {
    box(0x783d32, roofLength, 0.18, 4.04, -0.36 + side * halfSpan,
      ridge - Math.sin(pitch) * roofLength / 2, -0.45, 0, -side * pitch);
  }
  // Infill the gable with progressively narrower courses under the roof.
  for (let course = 0; course < 9; course++) {
    const y = height + 0.55 + course * 0.12;
    const width = Math.min(4.24, (ridge - y) * 2 / Math.tan(pitch));
    box(0xe3cc9b, width, 0.13, 3.65, -0.36, y, -0.45);
  }
  box(0x815a47, 0.42, 1.15, 0.48, 0.49, ridge - 0.25, -0.9);
  box(0x433c35, 0.77, 1.36, 0.08, -0.36, 1.17, 1.42);
  for (const x of [-1.71, 0.99]) {
    box(stone, 0.9, 0.88, 0.1, x, 1.45, 1.42);
    box(glass, 0.71, 0.66, 0.1, x, 1.45, 1.48);
    box(0x42654f, 0.93, 0.17, 0.23, x, 0.98, 1.55);
    if (tier >= 3) box(glass, 0.69, 0.61, 0.1, x, 3.17, 1.42);
  }
  if (tier >= 2) {
    box(0x9a6d46, 2.2, 0.16, 1.17, -0.36, 0.54, 1.94);
    box(0x783d32, 2.3, 0.13, 1.13, -0.36, 2.17, 1.94);
    for (const x of [-1.34, 0.62]) box(0x9a6d46, 0.12, 1.56, 0.12, x, 1.37, 2.43);
  }
  box(foliage, 0.56, tier >= 4 ? 1.8 : 0.93, 2.95, 2.51, tier >= 4 ? 1.39 : 0.95, -0.22);
  return ridge + 0.35;
}

const models = { construction, architecture, office, residence };

export function createBuildingModel(id, tier, lotWidth, underConstruction) {
  const group = new Group();
  const batches = new Map();
  const matrix = new Matrix4();
  const scaleVector = new Vector3();
  const rotation = new Matrix4();
  function box(color, width, height, depth, x, y, z, pitch = 0, roll = 0) {
    if (!batches.has(color)) batches.set(color, []);
    matrix.makeRotationX(pitch).multiply(rotation.makeRotationZ(roll));
    matrix.scale(scaleVector.set(width, height, depth));
    batches.get(color).push(matrix.setPosition(x, y, z).clone());
  }

  const scale = lotWidth / 7;
  group.scale.setScalar(scale);
  const height = models[id](box, tier);
  if (underConstruction) {
    const crane = 0xe3b23c;
    box(crane, 0.22, height + 2, 0.22, 3, (height + 2) / 2, -2.8);
    box(crane, 5.9, 0.18, 0.23, 0.14, height + 2, -2.8);
    box(metal, 0.05, 1.3, 0.05, -2.6, height + 1.35, -2.8);
  }
  for (const [color, transforms] of batches) {
    const mesh = new InstancedMesh(geometry, material(color), transforms.length);
    transforms.forEach((transform, index) => mesh.setMatrixAt(index, transform));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
  }
  group.userData.height = height * scale;
  return group;
}

export function disposeBuildingGeometry(group) {
  group.traverse(object => {
    if (object.isInstancedMesh && object.geometry === geometry) object.dispose();
    else object.geometry?.dispose();
  });
}
