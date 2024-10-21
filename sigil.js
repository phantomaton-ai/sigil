const providers = new Map();

const sigil = (name) => {
  return {
    as: (target) => ({
      like: (provider) => {
        providers.set(target, provider);
      }
    }),
    using: (instance) => ({
      upon: (input) => {
        const provider = providers.get(instance.constructor);
        return provider(input);
      }
    })
  };
};

export default sigil;