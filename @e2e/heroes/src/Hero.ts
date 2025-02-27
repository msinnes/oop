import { Character } from './Character';

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

export { Hero };