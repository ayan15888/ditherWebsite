import shapesData from './animal_shapes.json';

export interface AnimalShapeLayer {
  path: string;
  density: number;
}

export interface AnimalShapeArt {
  layers: [string, number][];
  eyes: [number, number, number][];
  cheeks: [number, number, number][];
  details: [number, string, number][];
}

export const ANIMAL_SHAPES: Record<string, AnimalShapeArt> = shapesData as unknown as Record<string, AnimalShapeArt>;

export function getAnimalArt(animalId: string): AnimalShapeArt | undefined {
  return ANIMAL_SHAPES[animalId.toLowerCase()] || ANIMAL_SHAPES['owl'];
}

