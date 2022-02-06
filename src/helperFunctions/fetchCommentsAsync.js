import {firebase} from './initializeFirebase'

export default function fetchCommentsAsync(){
    //contine later
    return firebase.firestore().collection('/comments').where('parentPost')
}