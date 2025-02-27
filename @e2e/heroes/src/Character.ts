abstract class Character {
  isHero = false;
  isVillain = false;

  abstract declare();

  abstract get name();
  abstract set disguised(value);
}

export { Character };