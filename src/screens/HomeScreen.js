import React from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Welcome from '../components/Welcome';
import AboutMini from '../components/AboutMini';
import ServicesMini from '../components/ServicesMini';
import ForumMini from '../components/ForumMini';
import ContactMini from '../components/ContactMini';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function HomeScreen({ margin, bodyHeight, fontFactor, deviceWidthClass }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.list}>
                <Welcome
                    margin={margin}
                    bodyHeight={bodyHeight}
                    fontFactor={fontFactor}
                    deviceWidthClass={deviceWidthClass}
                />
                <AboutMini
                    fontFactor={fontFactor}
                    margin={margin}
                    deviceWidthClass={deviceWidthClass}
                />
                <ServicesMini
                    margin={margin}
                    fontFactor={fontFactor}
                    deviceWidthClass={deviceWidthClass}
                />
                <ForumMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={bodyHeight}
                />
                <ContactMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={bodyHeight}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

HomeScreen.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
};

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

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    bodyHeight: state.settingsState.bodyHeight,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
});

export default connect(mapStateToProps, {})(HomeScreen);
