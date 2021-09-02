import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ServicesScreen() {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.curvedContainer}>
                <Text>ServicesScreen</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#1A91D7',
    },
    curvedContainer: {
        flex: 1,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        borderBottomRightRadius: 80,
    },
});
