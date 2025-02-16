abstract class Character {
  isHero = false;
  isVillain = false;

  abstract declare();

  abstract get name();
  abstract set disguised(value);
}

class Hero extends Character {
  isHero = true;
  _inDisguise = true;
  _heroIdentity = '';
  _secretidentity = '';

  constructor(heroIdentity: string, secretIdentity: string) {
    super();
    this._heroIdentity = heroIdentity;
    this._secretidentity = secretIdentity;
  }

  declare() {
    return 'I stand with the heroes!!';
  }

  get name() {
    if (this._inDisguise) return this._secretidentity;
    return this._heroIdentity;
  }

  set disguised(value) {
    this._inDisguise = value;
  }
}

class Villain extends Character {
  isVillain = true;
  _inDisguise = false;

  declare() {
    return 'I stand with the villains!!';
  }

  get name() {
    return 'I am a supervillain';
  }

  set disguised(value) {
    if (value) throw new Error('I am a villain and will never disguise myself');
    this._inDisguise = value;
  }
}

export { Character, Hero, Villain };