import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import forumReducer from './forumReducer';
import settingsTempReducer from './settingsTempReducer';

const mainReducer = combineReducers({
    settingsState: settingsReducer,
    forumState: forumReducer,
    settingsTempState: settingsTempReducer,
});

export default mainReducer;
