import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import forumReducer from './forumReducer';
import forumTempReducer from './forumTempReducer';

const mainReducer = combineReducers({
    settingsState: settingsReducer,
    forumState: forumReducer,
    forumTempState: forumTempReducer,
});

export default mainReducer;
