function Imports() {
  let i = [];

  this.add = (...args) => args.forEach(arg => {
    if (i.indexOf(arg) < 0) i.push(arg);
  });

  this.getImports = () => i;

  this.clear = () => i = [];

  Object.defineProperty(this, 'length', { get: () => i.length });
}

Imports.imports = new Imports();
export { Imports };
