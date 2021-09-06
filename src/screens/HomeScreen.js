import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Welcome from '../components/Welcome';
import AboutMini from '../components/AboutMini';
import ServicesMini from '../components/ServicesMini';
import ForumMini from '../components/ForumMini';
import ContactMini from '../components/ContactMini';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.list}>
                <Welcome />
                <AboutMini />
                <ServicesMini />
                <ForumMini />
                <ContactMini />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        backgroundColor: 'white',
    },
    child: {
        flex: 1,
    },
});
