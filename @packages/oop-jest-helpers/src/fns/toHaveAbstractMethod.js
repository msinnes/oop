import { hasAbstractMethod } from './helpers';

expect.extend({
  toHaveAbstractMethod: (received, method) => ({
    pass: hasAbstractMethod(received, method),
    message: () => `input should have the abstract method ${method}`,
  }),
});
