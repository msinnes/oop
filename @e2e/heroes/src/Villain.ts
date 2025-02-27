import { Character } from './Character';

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

export { Villain };
