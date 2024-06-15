const initialState = {
  good: 0,
  ok: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return {
        good: (state.good || 0) + 1,
        ok: state.ok || 0,
        bad: state.bad || 0
      };
    case 'OK':
      return {
        good: state.good || 0,
        ok: (state.ok || 0) + 1,
        bad: state.bad || 0
      };
    case 'BAD':
      return {
        good: state.good || 0,
        ok: state.ok || 0,
        bad: (state.bad || 0) + 1
      };
    case 'ZERO':
      return initialState;
    default:
      return state ? {
        good: state.good || 0,
        ok: state.ok || 0,
        bad: state.bad || 0
      } : initialState;
  }
};

export {
  initialState,
  counterReducer
};
