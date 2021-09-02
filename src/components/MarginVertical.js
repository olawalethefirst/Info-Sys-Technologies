import React from 'react'
import {View, StyleSheet} from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'

export default function MarginVertical({size}) {
    const styles = {
        container: {   
            height: size * hp(2.5)
        }
    }
    
    return (<View style={styles.container}/>)
}


