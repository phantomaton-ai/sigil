const sigil = (name) => {
  const symbol = Symbol(name);
  return {
    as: (target) => ({
      like: (provider) => {
        target[symbol] = provider;
      }
    }),
    using: (instance) => ({
      upon: (input) => {
        return instance.constructor[symbol](input);
      }
    })
  };
};

export default sigil;
