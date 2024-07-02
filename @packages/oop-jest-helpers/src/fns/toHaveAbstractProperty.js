import { hasAbstractProperty } from './helpers';

expect.extend({
  toHaveAbstractProperty: (received, property) => ({
    pass: hasAbstractProperty(received, property),
    message: () => `input should have the abstract property ${property}`,
  }),
});
