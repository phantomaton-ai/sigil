class Sigil {
  constructor(name, target = Object) {
    this.symbol = typeof name === 'symbol' ? name : Symbol(name);
    this.target = target;
  }

  as(target) {
    return new Sigil(this.symbol, target);
  }

  like(provider) {
    this.target[this.symbol] = provider;
  }

  using(instance) {
    return new Sigil(this.symbol, instance);
  }

  upon(input) {
    return (this.target[this.symbol] || this.target.constructor[this.symbol])(input);
  }
}

const sigil = (name) => new Sigil(name);

export default sigil;
