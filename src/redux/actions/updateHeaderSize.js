import { UPDATE_HEADER_SIZE } from './actionTypes';
import getHeaderSize from '../../helperFunctions/getHeaderSize';

const updateHeaderSize = () => ({
    type: UPDATE_HEADER_SIZE,
    payload: getHeaderSize(),
});

export default updateHeaderSize;
