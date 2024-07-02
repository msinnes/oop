import { isClass } from './helpers';

expect.extend({
  toBeAClass: received => ({
    pass: isClass(received),
    message: () => 'expected input to be a class',
  }),
});
