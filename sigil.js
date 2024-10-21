const SIGIL = Symbol('sigil');

class Sigil {
  constructor(options) {
    this.symbol = Object(Symbol(options.name));
    this.symbol[SIGIL] = this;
    this.decorators = [];
    this.providers = [];
    this.compose = options.compose;
  }

  by(provider) {
    this.providers.push(provider);
  }

  using(decorator) {
    this.decorators.push(decorator);
  }
  
  upon(object) {
    object[this.symbol] = (...args) => this.invoke(...args);
  }
}

const sigil = (options = {}) => new Sigil(options);

export default sigil;
