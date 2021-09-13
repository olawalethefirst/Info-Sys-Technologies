import { UPDATE_FONT_FACTOR } from './actionTypes';
import getFontFactor from '../../helperFunctions/getFontFactor';

const updateFontFactor = () => ({
    type: UPDATE_FONT_FACTOR,
    payload: getFontFactor(),
});

export default updateFontFactor;
