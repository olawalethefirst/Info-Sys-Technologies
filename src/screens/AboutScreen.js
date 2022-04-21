import React, { useRef, lazy, Suspense } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
const About = lazy(() => import('../components/About'));
import SuspenseFallback from '../components/SuspenseFallback';

function AboutScreen() {
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);

    return (
        <SafeAreaView style={styles.container}>
            <Suspense fallback={<SuspenseFallback color={'black'} />}>
                <About />
            </Suspense>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default AboutScreen;
