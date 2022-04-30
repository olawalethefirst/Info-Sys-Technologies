import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import About from '../components/About';

function AboutScreen() {
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);

    return (
        <SafeAreaView style={styles.container}>
            <About />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AboutScreen;
