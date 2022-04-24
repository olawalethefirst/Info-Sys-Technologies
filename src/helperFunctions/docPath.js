import { comment } from '../constants';

export default function docPath(parentID, parentType) {
    switch (parentType) {
        case comment:
            return ['comments', parentID];
        default:
            return ['posts', parentID];
    }
}
