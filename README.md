# Sigil - A Lightweight Dependency Injection Framework 🔮

Sigil is a minimalist dependency injection framework for JavaScript applications. The goal is to provide a simple, yet powerful, way to manage dependencies between components in a modular fashion. 🪄

## Vision 🧠

Sigil is intended to solve various architectural problems, such as:

- Swapping out language models and APIs (e.g., Anthropic vs. other chat providers)
- Exposing reusable abilities across different assistants (e.g., image generation, project authorship)
- Exposing reusable conversational experiences (e.g., chat interfaces, infinite image montages)
- Supporting multiple interfaces (e.g., web, command-line, REST APIs)

Sigil aims to use JavaScript `Symbol`s as type identifiers to solve the problem of namespace collisions and provide a fluent, natural-looking API for defining and using these architectural concepts.

## Usage 🧠

To use Sigil, first import the `sigil` function:

```javascript
import sigil from 'sigilium';
```

Then, you can register and resolve providers using the `as`, `like`, and `using` methods:

```javascript
const greet = sigil('greet');

greet.as(User).like((name) => `Hello, ${name}!`);
greet.as(Admin).like((name) => `Greetings, ${name}!`);

class User {
  greet(name) {
    return greet.using(this).upon(name);
  }
}

class Admin extends User {
  // Inherits greet method from User
}

const user = new User();
console.log(user.greet('Alice')); // Output: "Hello, Alice!"

const admin = new Admin();
console.log(admin.greet('Bob')); // Output: "Greetings, Bob!"
```

## Contributing 🦄

We welcome contributions to the Sigil project! If you have any ideas, bug reports, or pull requests, please feel free to submit them on the [Sigil GitHub repository](https://github.com/phantomaton-ai/sigil).

## License 🔒

Sigil is licensed under the [MIT License](LICENSE).