/* eslint-disable no-undef */
import cacheFonts from './cacheFonts';
import cacheImages from './cacheImages';

export default function loadAssetsAsync() {
    const cachedFonts = cacheFonts([
        {
            Karla_400Regular: require('@expo-google-fonts/karla/Karla_400Regular.ttf'),
            Karla_500Medium: require('@expo-google-fonts/karla/Karla_500Medium.ttf'),
            Karla_600SemiBold: require('@expo-google-fonts/karla/Karla_600SemiBold.ttf'),
            Poppins_500Medium: require('@expo-google-fonts/poppins/Poppins_500Medium.ttf'),
            Poppins_600SemiBold: require('@expo-google-fonts/poppins/Poppins_600SemiBold.ttf'),
            Poppins_700Bold: require('@expo-google-fonts/poppins/Poppins_700Bold.ttf'),
        },
    ]);
    const cachedImages = cacheImages([
        require('../../assets/images/background.png'),
        require('../../assets/images/background1.png'),
        require('../../assets/images/background2.png'),
        require('../../assets/images/image1.png'),
        require('../../assets/images/image2.png'),
        require('../../assets/images/image3.png'),
        require('../../assets/images/image4.png'),
        require('../../assets/images/image5.png'),
        require('../../assets/images/image6.png'),
        require('../../assets/images/image7.png'),
        require('../../assets/images/image8.png'),
        require('../../assets/images/image9.png'),
        require('../../assets/images/image10.png'),
        require('../../assets/images/image11.png'),
        require('../../assets/images/image12.png'),
        require('../../assets/images/image13.png'),
        require('../../assets/images/image14.png'),
        require('../../assets/images/image15.png'),
        require('../../assets/images/transparent-logo.png'),
    ]);
    return Promise.all([...cachedFonts, ...cachedImages]);
}
