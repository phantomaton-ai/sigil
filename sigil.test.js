import { expect, stub } from 'lovecraft';
import { createContainer } from 'sigil';

describe('Sigil', () => {
  describe('Container', () => {
    it('should register and resolve a simple provider', () => {
      const container = createContainer();
      container.register('logger', () => console.log);

      const logger = container.resolve('logger');
      expect(logger).to.be.a('function');

      const logStub = stub(console, 'log');
      logger('Hello, Sigil!');
      expect(logStub).to.have.been.calledWith('Hello, Sigil!');
      logStub.restore();
    });

    it('should resolve dependencies for a provider', () => {
      const container = createContainer();
      container.register('logger', () => console.log);
      container.register('greeter', ['logger'], (logger) => (name) => logger(`Hello, ${name}!`));

      const greeter = container.resolve('greeter');
      expect(greeter).to.be.a('function');

      const logStub = stub(console, 'log');
      greeter('Alice');
      expect(logStub).to.have.been.calledWith('Hello, Alice!');
      logStub.restore();
    });

    it('should support decorator providers', () => {
      const container = createContainer();
      container.register('logger', () => console.log);
      container.register('consoleLogger', ['logger'], (logger) => (message) => {
        console.log(`[consoleLogger] ${message}`);
        logger(message);
      });

      const consoleLogger = container.resolve('consoleLogger');
      const logStub = stub(console, 'log');
      consoleLogger('Hello, Sigil!');
      expect(logStub).to.have.been.calledTwice;
      expect(logStub.firstCall).to.have.been.calledWith('[consoleLogger] Hello, Sigil!');
      expect(logStub.secondCall).to.have.been.calledWith('Hello, Sigil!');
      logStub.restore();
    });

    it('should support aggregator providers', () => {
      const container = createContainer();
      container.register('logger', () => console.log);
      container.register('consoleLogger', ['logger'], (logger) => (message) => {
        console.log(`[consoleLogger] ${message}`);
        logger(message);
      });
      container.register('aggregateLogger', ['logger', 'consoleLogger'], (logger, consoleLogger) => (message) => {
        logger(message);
        consoleLogger(message);
      });

      const aggregateLogger = container.resolve('aggregateLogger');
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