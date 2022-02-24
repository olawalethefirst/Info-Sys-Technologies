import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import forumReducer from './forumReducer';
import forumTempReducer from './forumTempReducer';
import settingsTempReducer from './settingsTempReducer';

const mainReducer = combineReducers({
    settingsState: settingsReducer,
    forumState: forumReducer,
    forumTempState: forumTempReducer,
    settingsTempState: settingsTempReducer,
});

export default mainReducer;
