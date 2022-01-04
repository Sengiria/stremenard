import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage'
import userReducer from "./user/user.reducer";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer
})

export default persistReducer(persistConfig, rootReducer)
