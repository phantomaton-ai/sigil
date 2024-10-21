import { expect, stub } from 'lovecraft';
import sigil from './sigil.js';

describe('Sigil', () => {
  describe('Providers', () => {
    it('should allow registering and resolving a simple provider', () => {
      const greet = sigil('greet');

      class User {
        greet(name) {
          return greet.using(this).upon(name);
        }
      }

      class Admin {
        greet(name) {
          return greet.using(this).upon(name);
        }
      }

      greet.as(User).like((name) => `Hello, ${name}!`);
      greet.as(Admin).like((name) => `Greetings, ${name}!`);

      const user = new User();
      const admin = new Admin();

      expect(user.greet('Alice')).to.equal('Hello, Alice!');
      expect(admin.greet('Bob')).to.equal('Greetings, Bob!');
    });

    it('should allow registering and resolving a provider without a target', () => {
      const greet = sigil('greet');

      greet.like((name) => `Hey there, ${name}!`);

      expect(greet.upon('Charlie')).to.equal('Hey there, Charlie!');
    });

    it('should allow resolving a provider without an instance', () => {
      const greet = sigil('greet');

      greet.as(Object).like((name) => `Sup, ${name}?`);

      expect(greet.using({}).upon('David')).to.equal('Sup, David?');
    });
  });
});