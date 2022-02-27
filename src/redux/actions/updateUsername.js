import {UPDATE_USERNAME} from './actionTypes'

export default function updateUsername (payload) {
    return {
        type: UPDATE_USERNAME,
        payload
    }
}