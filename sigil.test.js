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
  });
});