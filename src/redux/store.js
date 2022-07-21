import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth-slice";
// import loadingReducer from "./slices/loading-slice";
// import modalReducer from "./slices/modal-slice";
// import snackbarReducer from "./slices/snackbar-slice";
// import titleReducer from "./slices/title-slice";
// import userFarmReducer from "./slices/farm-slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
//   loading: loadingReducer,
//   modal: modalReducer,
//   snackbar: snackbarReducer,
//   title: titleReducer,
//   selectedFarm: userFarmReducer,
});

// configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 2,
  storage,
  blacklist: ["loading"],
};

// initiate persist reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// export store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   ignoredPaths: ['modal.onConfirm', 'modal.onCancel']
      // },
      serializableCheck: false,
    }),
});

// export persistor
export const persistor = persistStore(store);
