class Sigil {
  constructor(name) {
    this.symbol = Symbol(name);
    this.provider = new Map();
  }

  as(target) {
    return this;
  }

  like(provider) {
    this.provider.set(this.symbol, provider);
    return this;
  }

  using(instance) {
    return this;
  }

  upon(input) {
    const provider = this.provider.get(this.symbol);
    return provider(input);
  }
}

const sigil = (name) => new Sigil(name);

export default sigil;