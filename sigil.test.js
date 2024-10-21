import { expect, stub } from 'lovecraft';
import sigil from 'sigil';

describe('Sigil', () => {
  describe('Providers', () => {
    it('should allow swapping out providers', () => {
      const converse = sigil('converse');

      // Define a basic provider
      converse.as(User).like(async (messages) => {
        console.log(messages);
        return await input('> ');
      });

      const user = new User();
      const response = await user.converse(['Hello, how are you?']);
      expect(response).to.equal('> ');
    });

    it('should support decorator providers', () => {
      const converse = sigil('converse');

      // Define a basic provider
      converse.as(User).like(async (messages) => {
        console.log(messages);
        return await input('> ');
      });

      // Define a decorator provider
      converse.as(ColoredUser).decorate(User).with((user) => ({
        converse: async (messages) => {
          console.log('[ColoredUser]', messages);
          const response = await user.converse(messages);
          console.log('[ColoredUser]', response);
          return response;
        }
      }));

      const user = new ColoredUser();
      const response = await user.converse(['Hello, how are you?']);
      expect(response).to.equal('> ');
    });

    it('should support aggregator providers', () => {
      const converse = sigil('converse');

      // Define some provider components
      converse.as(TextUser).like(async (messages) => {
        console.log('[TextUser]', messages);
        return await input('> ');
      });

      converse.as(VoiceUser).like(async (messages) => {
        console.log('[VoiceUser]', messages);
        const response = await input('(voice) > ');
        return response;
      });

      // Define an aggregator provider
      converse.as(MultimodalUser).aggregate([TextUser, VoiceUser]).like(async (messages) => {
        const textResponse = await converse.using(TextUser).upon(messages);
        const voiceResponse = await converse.using(VoiceUser).upon(messages);
        return [textResponse, voiceResponse];
      });

      const user = new MultimodalUser();
      const responses = await user.converse(['Hello, how are you?']);
      expect(responses).to.deep.equal(['> ', '(voice) > ']);
    });
  });
});