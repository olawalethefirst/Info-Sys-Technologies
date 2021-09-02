import {UPDATE_DEVICE_WIDTH_CLASS} from './actionTypes'
import getDeviceWidthClass from "../../helperFunctions/getDeviceWidthClass";

export default function updateDeviceWidthClass(width) {
    return dispatch => {
        const widthClass = getDeviceWidthClass(width)
        dispatch({
            type: UPDATE_DEVICE_WIDTH_CLASS,
            payload: widthClass
        })
    }
}