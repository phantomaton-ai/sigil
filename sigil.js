class Sigil {
  constructor(name, target = Object) {
    this.symbol = typeof name === 'symbol' ? name : Symbol(name);
    this.target = target;
  }

  as(target) {
    return new Sigil(this.symbol, target);
  }

  like(provider) {
    this.target.prototype[this.symbol] = provider;
  }

  using(instance) {
    return new Sigil(this.symbol, instance.constructor);
  }

  upon(input) {
    return this.target.prototype[this.symbol](input);
  }
}

const sigil = (name) => new Sigil(name);

export default sigil;
