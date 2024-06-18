import { createSlice } from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote: (state, action) => {
      return [...state, action.payload];
    },
    voteTo: (state, action) => {
      const id = action.payload;
      const anecdote = state.find(a => a.id === id);
      const changed = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(a => a.id !== id ? a : changed);
    },
    setAnecdotes: (state, action) => {
      return action.payload;
    }
  },
});

export const { createAnecdote, voteTo, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;