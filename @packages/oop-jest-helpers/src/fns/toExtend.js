import { extendz } from './helpers';

expect.extend({
  toExtend: (received, _super) => ({
    pass: extendz(received, _super),
    message: () => 'input should extend the expected class',
  }),
});
