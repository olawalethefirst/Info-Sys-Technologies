import { SEARCH_ACTIVE, SEARCH_NOT_ACTIVE } from './actionTypes';

export default function updateSearching(payload) {
    return { type: payload ? SEARCH_ACTIVE : SEARCH_NOT_ACTIVE };
}
