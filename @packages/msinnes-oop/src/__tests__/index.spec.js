import * as api from '..';

import { abstract } from '../fns/abstract';

describe('abstract', () => {
  it('should expose the api', () => {
    expect(api.abstract).toBe(abstract);
  });
});