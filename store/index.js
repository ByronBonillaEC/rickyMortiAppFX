import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from './charactersSlice';

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});
