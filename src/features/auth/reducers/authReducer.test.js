import authReducer from './authReducer';
import { loginSucceedAction, loginErrorAction } from '../actions/authActions';

describe('test login reducer', () => {
  it('test with undefined state and action', () => {
    const state = authReducer(undefined, undefined);
    expect(state).toEqual({});
  });

  it('test an invalid action in a valid state', () => {
    const state = {};

    const newState = authReducer(state, undefined);

    expect(newState).toEqual(state);
  });

  it('test login success state', () => {
    const state = {};

    const auth = {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    };

    const action = loginSucceedAction(auth);
    const newState = authReducer(state, action);
    const expectedState = {
      token: auth.token,
      error: null,
    };

    expect(newState).toEqual(expectedState);
  });

  it('test login error state', () => {
    const state = {};

    const error = {
      statusCode: 400,
      error: 'Bad Request',
      message: 'Email ou senha inválido. Tente novamente por favor.',
    };

    const action = loginErrorAction(error);

    const newState = authReducer(state, action);
    const expectedState = {
      token: null,
      error,
    };

    expect(newState).toEqual(expectedState);
  });
});
