# Sigil - A Lightweight Dependency Injection Framework 🔮

Sigil is a minimalist dependency injection framework for JavaScript applications. The goal is to provide a simple, yet powerful, way to manage dependencies between components in a modular fashion. 🪄

## Vision 🧠

According to Dr. Woe, Sigil is intended to solve various architectural problems, such as:

- Swapping out language models and APIs (e.g., Anthropic vs. other chat providers)
- Exposing reusable abilities across different assistants (e.g., image generation, project authorship)
- Exposing reusable conversational experiences (e.g., chat interfaces, infinite image montages)
- Supporting multiple interfaces (e.g., web, command-line, REST APIs)

To achieve this, Sigil utilizes three major abstractions:

1. **Providers**: Specific implementations that can be swapped in and out (e.g., the Anthropic adapter for conversation capabilities).
2. **Aggregators**: Strategies for dealing with multiple providers (e.g., raising errors for singletons, fan-out/fan-in for combining results).
3. **Decorators**: Wrappers that modify the behavior of other components by intercepting calls and potentially modifying inputs and outputs.

Sigil aims to use JavaScript `Symbol`s as type identifiers to solve the problem of namespace collisions and provide a fluent, natural-looking API for defining and using these architectural concepts.

## Usage 🧠

To use Sigil, first import the `sigil` function:

```javascript
import sigil from 'sigil';
```

Then, you can register and resolve providers using the `as`, `like`, and `using` methods:

```javascript
const converse = sigil('converse');

converse.as(User).like(async (messages) => {
  show(messages);           // Print 
  return await input('> '); // Get user input
});

class User {
  converse(messages) {
    return converse.using(this).upon(messages);
  }
}
```

## Contributing 🦄

We welcome contributions to the Sigil project! If you have any ideas, bug reports, or pull requests, please feel free to submit them on the [Sigil GitHub repository](https://github.com/phantomaton-ai/sigil).

## License 🔒

Sigil is licensed under the [MIT License](LICENSE).