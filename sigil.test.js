import { expect, stub } from 'lovecraft';
import sigil from './sigil.js';

class User {
  greet(name) {
    return this.converse.upon(name);
  }
}

class AdminUser extends User {
  // Inherits greet method from User
}

class GuestUser extends Object {
  greet(name) {
    return this.converse.upon(name);
  }
}

describe('Sigil', () => {
  describe('Providers', () => {
    it('should allow registering and resolving a simple provider', () => {
      const converse = sigil('converse');

      converse.as(User).like((name) => `Hello, ${name}!`);
      converse.as(AdminUser).like((name) => `Greetings, ${name}!`);
      converse.like((name) => `Hi there, ${name}!`);

      const user = new User();
      const adminUser = new AdminUser();
      const guestUser = new GuestUser();

      expect(user.greet('Alice')).to.equal('Hello, Alice!');
      expect(adminUser.greet('Bob')).to.equal('Greetings, Bob!');
      expect(guestUser.greet('Charlie')).to.equal('Hi there, Charlie!');
    });

    it('should allow registering and resolving a provider without a target', () => {
      const converse = sigil('converse');

      converse.like((name) => `Hey there, ${name}!`);

      const user = new User();
      expect(user.greet('Dave')).to.equal('Hey there, Dave!');
    });
  });
});