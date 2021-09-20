import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { UPDATE_MARGIN } from './actionTypes';

const updateMargin = () => ({
    type: UPDATE_MARGIN,
    payload: wp(4),
});

export default updateMargin;
