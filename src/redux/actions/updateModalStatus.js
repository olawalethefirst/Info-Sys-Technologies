import { UPDATE_MODAL_STATUS } from './actionTypes';

export default function updateModalStatus(payload) {
    return {
        type: UPDATE_MODAL_STATUS,
        payload,
    };
}
