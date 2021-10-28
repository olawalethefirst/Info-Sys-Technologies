import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import forumReducer from './forumReducer';

const mainReducer = combineReducers({
    settingsState: settingsReducer,
    forumState: forumReducer,
});

export default mainReducer;
