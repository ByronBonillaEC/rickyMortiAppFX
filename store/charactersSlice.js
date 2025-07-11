import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk async para obtener personajes
export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      const CHARACTERS = 'https://rickandmortyapi.com/api/character';
      const rawData = await fetch(CHARACTERS);
      
      if (!rawData.ok) {
        throw new Error('Error al obtener personajes');
      }
      
      const json = await rawData.json();
      const { results } = json;
      
      return results.map((item) => {
        const { id, name, status, species, gender, episode, image } = item;
        return {
          id, name, status, species, gender, episode, image
        };
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: {
    data: [],
    loading: false,
    error: null,
    lastFetch: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCharacters: (state) => {
      state.data = [];
      state.lastFetch = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.lastFetch = new Date().toISOString();
        state.error = null;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCharacters } = charactersSlice.actions;
export default charactersSlice.reducer;
