import { combineReducers } from 'redux';
import settingsReducer from './settingsReducer';
import forumReducer from './forumReducer';
import settingsTempReducer from './settingsTempReducer';
import forumTempReducer from './forumTempReducer';

const mainReducer = combineReducers({
    settingsState: settingsReducer,
    forumState: forumReducer,
    settingsTempState: settingsTempReducer,
    forumTempState: forumTempReducer,
});

export default mainReducer;
