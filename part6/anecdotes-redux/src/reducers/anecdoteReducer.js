import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote: (state, action) => {
      return [...state, action.payload];
    },
    updateAnecdote: (state, action) => {
      const changed = action.payload;
      return state.map(a => a.id !== changed.id ? a : changed);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    }
  },
});

export const { updateAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecodote = await anecdoteService.createNew(anecdote);
    dispatch(appendAnecdote(newAnecodote));
  };
};

export const voteTo = (anecdote) => {
  return async dispatch => {
    const updated = await anecdoteService.update(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    });
    dispatch(updateAnecdote(updated));
  }
}

export default anecdoteSlice.reducer;