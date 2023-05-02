import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../redux/sagas/rootSaga';
import rootReducers from '../redux/reducers/rootReducer';
// import { persistStore, persistReducer } from 'redux-persist';


// ...
const sagaMiddleware = createSagaMiddleware();
// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage,
//   version: 1,
//   whitelist: ['dashboard'],
//   blacklist:['']
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: rootReducers,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);
// export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
