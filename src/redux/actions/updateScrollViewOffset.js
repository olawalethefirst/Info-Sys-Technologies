import { UPDATE_SCROLL_POSITION } from './actionTypes';
export default (offset) => {
    return { type: UPDATE_SCROLL_POSITION, payload: offset };
};
