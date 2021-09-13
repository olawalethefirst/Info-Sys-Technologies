import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { UPDATE_MARGIN } from './actionTypes';

const updateMargin = () => ({
    type: UPDATE_MARGIN,
    payload: wp(6),
});

export default updateMargin;
