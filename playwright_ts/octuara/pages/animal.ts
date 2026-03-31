export function animal(): string {
  return `Animal Page`;
}

export interface Animal {
  name: string;
  sound: string;
}

const animals: Animal[] = [
    { name: 'cow', sound: 'moo' },
    { name: 'dog', sound: 'woof' },
    { name: 'pig', sound: 'oink' },
  ];

export function getAnimalSound(name: string): string | undefined {
  const animal = animals.find(a => a.name === name);
  return animal ? animal.sound : undefined;
}

export function getRandomAnimal(): Animal {
    return animals[Math.floor(Math.random() * animals.length)];
  }

  ------MAP------
let nums = [1, 2, 3, 4];

let doubled = nums.map(n => n * 2);
------FILTER------
let nums = [1, 2, 3, 4, 5];

let even = nums.filter(n => n % 2 === 0);