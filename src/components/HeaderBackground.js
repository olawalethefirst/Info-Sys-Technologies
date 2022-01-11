import React from 'react';
import { StyleSheet, View } from 'react-native';

const HeaderBackground = () => {
    return <View style={[StyleSheet.absoluteFill, styles.container]}></View>;
};

export default HeaderBackground;

const styles = StyleSheet.create({
    container: { backgroundColor: '#1A91D7' },
});
