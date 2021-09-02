/* eslint-disable no-undef */
import { ASSETS_LOADED } from './actionTypes';
import loadAssetsAsync from '../../helperFunctions/loadAssetsAsync';

export default function updateAssetsStatus() {
    return async (dispatch) => {
        try {
            await loadAssetsAsync(
                [
                    {
                        Poppins_700Bold: require('@expo-google-fonts/poppins/Poppins_700Bold.ttf'),
                        Karla_500Medium: require('@expo-google-fonts/karla/Karla_500Medium.ttf'),
                        Poppins_600SemiBold: require('@expo-google-fonts/poppins/Poppins_600SemiBold.ttf'),
                        Karla_400Regular: require('@expo-google-fonts/karla/Karla_400Regular.ttf'),
                    },
                ],
                [
                    require('../../../assets/images/background.png'),
                    require('../../../assets/images/background1.png'),
                ]
            ).then(
                dispatch({
                    type: ASSETS_LOADED,
                })
            );
        } catch {
            console.log('an error occured');
        }
    };
}
