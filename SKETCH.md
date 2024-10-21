Thoughts on `sigil` (from Dr. Woe)

In general, I'd like to do some dependency injection and service compositing.
My specific use cases are things like:

* Swapping out LLM models and APIs
  * Anthropic is great, but I want to be able to run the same code against
    a variety of chat APIs/models. Consequently, I want to plug in/out
    different adapters for these.
* Exposing reusable abilities
  * Somewhat similarly, I got here because I'd been writing several little
    prototype chatbots against the Anthropic API, and wanted to spin up 
    different assistants with different abilities more easily. Most specifically,
    I want to be able to reuse abilities (such as image generation and project
    authorship) across various agents.
* Exposing reusable experiences.
  * Chat interfaces are great, and so I want to be able to reuse them from agent
    to agent. But, I don't want to over-commit to chat, as there are a lot of 
    different conversation-driven experiences (such as infinite image montages)
    which I like exploring.
* Supporting multiple interfaces.
  * Web interfaces are pretty great, but I've found command-line chatbot interfaces
    to be super useful as well. I'd like to be able to support a general-purpose
    experience like "chat" and expose multiple different interfaces to that same
    experience (including REST APIs).

There are several bigger architectural problems to sort out in there, especially
in the "which components and how do they connect" sense. I don't want to solve that
in `sigil`, but I do want to give myself a good lightweight tool to make these
architectural decisions a little more dynamically.

I've had some previous experience in this problem space, and the architectural
paradigm I like consists of three major abstractions:

* **Providers**: Specific implementations that can be swapped in and out. For
  example, the Anthropic adapter mentioned above would be a `Provider` of
  conversation capabilities.
* **Aggregator**: Strategies for dealing with multiple providers. For example,
  we might wish to raise errors if more than one provider is present (for
  singletons) or do a fan-out/fan-in approach to combine results from mulitple
  providers (to run the same search across multiple engines, for example).
* **Decorator**: Wrappers which modify the behavior of other components by
  intercepting calls, potentially modifying inputs and outputs.

I've used various terms ("composite services" comes to mind) to describe these
beasts in the past. They ultimately hinge on having good type identifiers.
Strings work, to a degree, but eventually you run into namespace collisions.
Additionally, dealing with well-qualified identifiers at a code-level can
get unwieldy; but, we like dependency injection to look as fluent and natural
as possible.

`sigil` is intended to utilize the JavaScript `Symbol` as a coordinating type
identifier to solve these problems, 


```
import sigil from 'sigil';
const converse = sigil('converse');
export default converse;
```

Example usage to define a provider:

```
converse.as(User).like(async (messages) => {
  show(messages);           // Print 
  return await input('> '); // Get user input
});
```

Instances of `User` would then get behavior overridden like:

```
class User {
  converse(messages) {
    return converse.using(this).upon(messages);
  }
}
```

Or:

```
import converse from './converse.js';
class User {
  constructor() {
    this.converse = converse.using(this).upon;
  }
}
```

Note that classes like `User` are under no obligation to use
the name `converse`, so naming collision may always be disambiguated;
the actual bindings is based on a `Symbol` behind the `sigil`.

I'd like similar fluent syntaxes for defining decorators upon
sigils as well as providing or overriding the aggregation strategy.

The top-level module should be `sigil.js` and it should look like:

```
const defaults = {};

class Sigil {
  constructor(options) {
    options = options instanceof String ? { name: options } : options;
    options = { ...defaults, ...options };
    // etc.
  }
  // methods
}
const sigil = (options) => new Sigil(options);
```
