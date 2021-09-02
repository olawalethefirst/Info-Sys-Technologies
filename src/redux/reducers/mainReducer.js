import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';

const mainReducer = combineReducers({
    settingsState: settingsReducer,
});

export default mainReducer;