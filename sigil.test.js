import { expect, stub } from 'lovecraft';
import sigil from './sigil.js';

let greet;

class User {
  greet(name) {
    return greet.using(this).upon(name);
  }
}
class Admin extends User {}
class Guest extends User {}

const user = new User();
const admin = new Admin();
const guest = new Guest();

describe('Sigil', () => {
  beforeEach(() => {
    greet = sigil('greet');
  });

  it('should allow registering and resolving a simple provider', () => {
    greet.as(User).like((name) => `Hello, ${name}!`);
    greet.as(Admin).like((name) => `Greetings, ${name}!`);

    expect(user.greet('Alice')).to.equal('Hello, Alice!');
    expect(admin.greet('Bob')).to.equal('Greetings, Bob!');
    expect(guest.greet('Charlie')).to.equal('Hello, Charlie!');
  });

  it('should allow registering and resolving a provider without a target', () => {
    greet.like((name) => `Hey there, ${name}!`);
    expect(user.greet('Dave')).to.equal('Hey there, Dave!');
  });
});
