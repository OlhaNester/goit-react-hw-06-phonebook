import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const itemsSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    addContact(state, action) {
      state.push(action.payload);
    },

    deleteContact(state, action) {
      return state.filter((contact) => contact.id !== action.payload);
    },
  },
});
export const { addContact, deleteContact } = itemsSlice.actions;

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterContact(state, action) {
      return action.payload;
    },
  },
});
export const { filterContact } = filterSlice.actions;

const persistConfig = {
  key: "contacts",
  storage,
};

const rootReducer = combineReducers({
  items: itemsSlice.reducer,
  filter: filterSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

// export const store = configureStore({
//   reducer: {
//     contacts: combineReducers({
//       items: itemsSlice.reducer,
//       filter: filterSlice.reducer,
//     }),
//   },
// });
