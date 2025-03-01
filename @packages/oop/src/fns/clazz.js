function Class() {
  if (!(this instanceof Class.prototype.constructor)) throw new Error('Cannot call a class as a function');
}

function extendz(c, Clazz) {
  if (!c || !c.prototype || !Clazz || !Clazz.prototype) return false;

  let curr = c.prototype;
  while(curr) {
    if (curr.constructor === Clazz.prototype.constructor) {
      return true;
    }
    curr = curr.__proto__;
  }
  return false;
}

function doExtend(Clazz, SuperClazz, proto) {
  Clazz.prototype = Object.create(SuperClazz.prototype);
  Clazz.prototype.constructor = Clazz;
  proto && Object.assign(Clazz.prototype, proto);
}

const createIntermediate = _super => {
  let superCalled = false;

  function init() {
    superCalled = false;
  }

  function close() {
    if (!superCalled) throw new Error('ReferenceError: Must call super constructor in derived class before accessing \'this\' or returning from derived constructor');
  }

  function checkThis(self) {
    if (!superCalled) throw new Error('ReferenceError: Must call super constructor in derived class before accessing \'this\' or returning from derived constructor');
    return self;
  }

  function SuperClass(...args) {
    _super.apply(this, args);
    superCalled = true;
  }

  doExtend(SuperClass, _super);
  return [SuperClass, { init, close, checkThis }];
};

const clazz = fn => (_super = Class) => {
  if (_super !== Class && !extendz(_super, Class)) throw new Error('TypeError: Super expression must be a class');
  const NewClass = fn(...createIntermediate(_super));
  NewClass.extends = sup => extendz(NewClass, sup);
  return NewClass;
};

export { Class, extendz, doExtend, clazz };
