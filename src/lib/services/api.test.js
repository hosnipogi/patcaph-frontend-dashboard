import Api from './api';
import * as URLs from '../config/URLs';

describe('Test HTTP requests', () => {
  it('should return result from GET', async () => {
    expect.assertions(2);
    const api = new Api({
      url: 'placeholder_url',
    });

    const instance = api.instance();
    const result = await api.fetch();

    expect(result.data.id).toBe(1);
    expect(instance.get).toBeCalledTimes(2); // call sanctum, then http method
  });

  it('should throw an Error', () => {
    expect.assertions(1);
    const api = new Api({
      url: 'broken_url',
    });

    return expect(api.fetch()).rejects.toThrow('Invalid');
  });

  it('should catch error', () => {
    expect.assertions(1);
    const api = new Api({
      url: 'broken_url',
    });

    return expect(api.fetch()).rejects.toBeInstanceOf(Error);
  });

  it('should abort request', () => {
    const api = new Api({
      url: 'broken_url',
    });

    expect(api.abort('abort')).toEqual('abort');
    expect(api.cancelTokenSource.cancel).toBeCalledTimes(1);
  });

  it('should fail sanctum request', async () => {
    expect.assertions(2);
    URLs.SANCTUM = 'sanctum';

    const api = new Api({ url: 'placeholder' });

    await expect(api.fetch()).rejects.toMatch(/error/);
    expect(api.api.get).toBeCalledTimes(1);
  });

  afterAll(() => {
    URLs.SANCTUM = 'working';
  });
});
