class As {
  constructor(sigil, target) {
    this.sigil = sigil;
    this.target = target;
  }

  like(provider) {
    this.target[this.sigil.symbol] = provider;
  }
}

class Using {
  constructor(sigil, instance) {
    this.sigil = sigil;
    this.instance = instance;
  }

  upon(input) {
    return this.instance.constructor[this.sigil.symbol](input);
  }
}

class Sigil {
  constructor(name) {
    this.symbol = Symbol(name);
  }

  as(target) {
    return new As(this, target);
  }

  using(instance) {
    return new Using(this, instance);
  }
}

const sigil = (name) => new Sigil(name);

export default sigil;