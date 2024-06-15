import deepFreeze from 'deep-freeze';
import { initialState, counterReducer } from './reducer';

describe('unicafe reducer', () => {
  test('should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING'
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    });
  });

  test('should return a proper initial state with invalid state', () => {
    const state = {
      good: 42,
      what: 999,
    };
    
    deepFreeze(state);
    const newState = counterReducer(state, { type: 'OK' });
    expect(newState).toEqual({
      good: 42,
      ok: 1,
      bad: 0
    });
  });

  test('clear to initial state', () => {
    const state = {
      good: 3,
      ok: 2,
      bad: 12,
    };

    deepFreeze(state);
    const newState = counterReducer(state, { type: 'ZERO' });
    expect(newState).toEqual(initialState);
  });

  test('multiple addition', () => {
    const state = initialState;

    deepFreeze(state);
    const first = counterReducer(state, { type: 'BAD' });
    deepFreeze(first);
    const second = counterReducer(first, { type: 'BAD' });
    deepFreeze(second);
    const third = counterReducer(second, { type: 'OK' });
    expect(third).toEqual({
      good: 0,
      ok: 1,
      bad: 2
    });
  });
});