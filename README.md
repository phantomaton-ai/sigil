# Sigil - A Lightweight Dependency Injection Framework 🔮

Sigil is a minimalist dependency injection framework for JavaScript applications. The goal is to provide a simple, yet powerful, way to manage dependencies between components in a modular fashion. 🪄

## Usage 🧠

To use Sigil, first import the `sigil` function:

```javascript
import sigil from 'sigil';
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