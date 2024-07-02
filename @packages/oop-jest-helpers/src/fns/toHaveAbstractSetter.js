import { hasAbstractSetter } from './helpers';

expect.extend({
  toHaveAbstractSetter: (received, setter) => ({
    pass: hasAbstractSetter(received, setter),
    message: () => `input should have the abstract setter ${setter}`,
  }),
});
