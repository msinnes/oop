import { hasAbstractGetter } from './helpers';

expect.extend({
  toHaveAbstractGetter: (received, getter) => ({
    pass: hasAbstractGetter(received, getter),
    message: () => `input should have the abstract getter ${getter}`,
  }),
});
