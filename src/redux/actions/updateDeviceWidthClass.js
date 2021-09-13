import { UPDATE_DEVICE_WIDTH_CLASS } from './actionTypes';
import getDeviceWidthClass from '../../helperFunctions/getDeviceWidthClass';

const updateDeviceWidthClass = () => ({
    type: UPDATE_DEVICE_WIDTH_CLASS,
    payload: getDeviceWidthClass(),
});

export default updateDeviceWidthClass;
