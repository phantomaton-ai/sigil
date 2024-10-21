import { expect, stub } from 'lovecraft';
import { createContainer, register, resolve } from 'sigil';

describe('Sigil', () => {
  describe('Container', () => {
    it('should register and resolve a simple provider', () => {
      const container = createContainer();
      register(container, 'logger', () => console.log);

      const logger = resolve(container, 'logger');
      expect(logger).to.be.a('function');

      const logStub = stub(console, 'log');
      logger('Hello, Sigil!');
      expect(logStub).to.have.been.calledWith('Hello, Sigil!');
      logStub.restore();
    });

    it('should resolve dependencies for a provider', () => {
      const container = createContainer();
      register(container, 'logger', () => console.log);
      register(container, 'greeter', ['logger'], (logger) => (name) => logger(`Hello, ${name}!`));

      const greeter = resolve(container, 'greeter');
      expect(greeter).to.be.a('function');

      const logStub = stub(console, 'log');
      greeter('Alice');
      expect(logStub).to.have.been.calledWith('Hello, Alice!');
      logStub.restore();
    });

    it('should support decorator providers', () => {
      const container = createContainer();
      register(container, 'logger', () => console.log);
      register(container, 'consoleLogger', ['logger'], (logger) => (message) => {
        console.log(`[consoleLogger] ${message}`);
        logger(message);
      });

      const consoleLogger = resolve(container, 'consoleLogger');
      const logStub = stub(console, 'log');
      consoleLogger('Hello, Sigil!');
      expect(logStub).to.have.been.calledTwice;
      expect(logStub.firstCall).to.have.been.calledWith('[consoleLogger] Hello, Sigil!');
      expect(logStub.secondCall).to.have.been.calledWith('Hello, Sigil!');
      logStub.restore();
    });

    it('should support aggregator providers', () => {
      const container = createContainer();
      register(container, 'logger', () => console.log);
      register(container, 'consoleLogger', ['logger'], (logger) => (message) => {
        console.log(`[consoleLogger] ${message}`);
        logger(message);
      });
      register(container, 'aggregateLogger', ['logger', 'consoleLogger'], (logger, consoleLogger) => (message) => {
        logger(message);
        consoleLogger(message);
      });

      const aggregateLogger = resolve(container, 'aggregateLogger');
      const logStub = stub(console, 'log');
      aggregateLogger('Hello, Sigil!');
      expect(logStub).to.have.been.calledThrice;
      expect(logStub.firstCall).to.have.been.calledWith('Hello, Sigil!');
      expect(logStub.secondCall).to.have.been.calledWith('[consoleLogger] Hello, Sigil!');
      expect(logStub.thirdCall).to.have.been.calledWith('Hello, Sigil!');
      logStub.restore();
    });
  });
});