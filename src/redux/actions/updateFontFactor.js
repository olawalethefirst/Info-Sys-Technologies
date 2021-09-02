import { UPDATE_FONT_FACTOR } from './actionTypes';
import getDeviceWidthClass from '../../helperFunctions/getDeviceWidthClass';

export default function updateFontFactor(width) {
    return (dispatch) => {
        const deviceWidthClass = getDeviceWidthClass(width);
        if (deviceWidthClass === -1) {
            dispatch({
                type: UPDATE_FONT_FACTOR,
                payload: 1,
            });
        } else if (deviceWidthClass === 0) {
            dispatch({
                type: UPDATE_FONT_FACTOR,
                payload: 0.8,
            });
        } else if (deviceWidthClass === 1) {
            dispatch({
                type: UPDATE_FONT_FACTOR,
                payload: 0.6,
            });
        }
        return;
    };
}
