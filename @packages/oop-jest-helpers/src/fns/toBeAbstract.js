import { isAbstractClass } from './helpers';

expect.extend({
  toBeAbstract: received => ({
    pass: isAbstractClass(received),
    message: () => 'expected input to be an abstract class',
  }),
});
