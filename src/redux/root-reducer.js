import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/user.reducer";
import gochiReducer from "./gochi/gochi.reducer";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer,
    gochi: gochiReducer
})

export default persistReducer(persistConfig, rootReducer)
