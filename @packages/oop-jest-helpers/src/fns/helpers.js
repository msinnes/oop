const abstractClass = 'Abstract classes cannot be instantiated';

function extractError(fn) {
  let err;
  try {
    fn();
  } catch (e) {
    err = e;
  }
  return err;
}

const checkError = (regexp, err, search) => {
  let found;
  if (err) {
    const match =  regexp.exec(err.message);
    if (match) found = match[1];
  }
  return !!search ? found === search : !!found;
};

function extendz(c, Class) {
  if (!c || !c.prototype) {
    return false;
  }
  let curr = c.prototype;
  while(curr) {
    if (curr.constructor === Class.prototype.constructor) {
      return true;
    }
    curr = curr.__proto__;
  }
  return false;
}

function isClass(Class) {
  const isFunction = Class instanceof Function;
  if (!isFunction) return false;
  if (isAbstractClass(Class)) return true;
  const err = extractError(() => Class());
  return !!err && /^Class constructor [a-zA-Z]+ cannot be invoked without 'new'$|^Cannot call a class as a function$/.test(err.message);
}

function isAbstractClass(Class) {
  const isFunction = Class instanceof Function;
  if (!isFunction) return false;
  if (
    hasAbstractGetter(Class) ||
    hasAbstractMethod(Class) ||
    hasAbstractProperty(Class) ||
    hasAbstractSetter(Class)
  ) return true;
  const err = extractError(() => new Class);
  return !!err && err.message === abstractClass;
}

function hasAbstractGetter(Class, getter) {
  const err = extractError(() => new Class());
  return checkError(/(.+) is an abstract getter and must be on the class prototype/g, err, getter);
}

function hasAbstractMethod(Class, method) {
  const err = extractError(() => new Class());
  return checkError(/(.+) is an abstract method and must be on the class prototype/g, err, method);
}

function hasAbstractProperty(Class, property) {
  const err = extractError(() => new Class());
  return checkError(/(.+) is an abstract property and cannot be undefined or null/g, err, property);
}

function hasAbstractSetter(Class, setter) {
  const err = extractError(() => new Class());
  return checkError(/(.+) is an abstract setter and must be on the class prototype/g, err, setter);
}

export {
  extendz,
  hasAbstractGetter,
  hasAbstractMethod,
  hasAbstractProperty,
  hasAbstractSetter,
  isClass,
  isAbstractClass,
};
