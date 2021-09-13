import { UPDATE_BODY_HEIGHT } from './actionTypes';
import getBodyHeight from '../../helperFunctions/getBodyHeight';

// eslint-disable-next-line no-undef
const updateBodyHeight = () => ({
    type: UPDATE_BODY_HEIGHT,
    payload: getBodyHeight(),
});

export default updateBodyHeight;
