import '@testing-library/jest-dom';
import { server } from './mocks/server';
import { store } from './store/store';
import { conduitApi } from './services/conduit';
import { beforeAll, afterEach, afterAll } from 'vitest';

beforeAll(() => server.listen());

afterEach(() => {
  server.resetHandlers();
  store.dispatch(conduitApi.util.resetApiState());
});

afterAll(() => server.close());
