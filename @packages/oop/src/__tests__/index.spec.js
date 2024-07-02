import * as api from '..';

import {
  abstract,
  abstractGetter,
  abstractMethod,
  abstractProperty,
  abstractSetter,
} from '../fns/abstract';
import { clazz } from '../fns/clazz';

describe('abstract', () => {
  it('should expose the api', () => {
    expect(api.abstract).toBe(abstract);
    expect(api.abstractGetter).toBe(abstractGetter);
    expect(api.abstractMethod).toBe(abstractMethod);
    expect(api.abstractProperty).toBe(abstractProperty);
    expect(api.abstractSetter).toBe(abstractSetter);
    expect(api.clazz).toBe(clazz);
  });
});
