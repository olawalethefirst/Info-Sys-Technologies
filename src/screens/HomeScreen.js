import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import Welcome from '../components/Welcome';
import AboutMini from '../components/AboutMini';
import ServicesMini from '../components/ServicesMini';
import ForumMini from '../components/ForumMini';
import ContactMini from '../components/ContactMini';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useScrollToTop } from '@react-navigation/native';
import updateEffectiveBodyHeight from '../redux/actions/updateEffectiveBodyHeight';

function HomeScreen({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    updateEffectiveBodyHeight,
}) {
    const [effectiveBodyHeight, setEffectiveBodyHeight] = useState(0);
    const renderItem = ({ item }) => item.data;
    const tabBarHeight = useBottomTabBarHeight();
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);
    const sectionComponents = [
        {
            key: '0',
            data: (
                <Welcome
                    margin={margin}
                    bodyHeight={effectiveBodyHeight}
                    fontFactor={fontFactor}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            key: '1',
            data: (
                <AboutMini
                    fontFactor={fontFactor}
                    margin={margin}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            key: '2',
            data: (
                <ServicesMini
                    margin={margin}
                    fontFactor={fontFactor}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            key: '3',
            data: (
                <ForumMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={effectiveBodyHeight}
                />
            ),
        },
        {
            key: '4',
            data: (
                <ContactMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={effectiveBodyHeight}
                />
            ),
        },
    ];
    
    useEffect(() => {
        if (bodyHeight && tabBarHeight) {
            setEffectiveBodyHeight(() => {
                const val = bodyHeight - tabBarHeight;
                updateEffectiveBodyHeight(val);
                return val;
            });
        }
    }, [bodyHeight, tabBarHeight, updateEffectiveBodyHeight]);

    if (!effectiveBodyHeight) {
        return null;
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={sectionComponents}
                renderItem={renderItem}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                bounces={false}
                ref={scrollRef}
            />
        </View>
    );
}

HomeScreen.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
    navigation: PropTypes.object,
    updateEffectiveBodyHeight: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161B26',
    },
    list: {
        backgroundColor: '#161B26',
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    bodyHeight: state.settingsState.bodyHeight,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    headerSize: state.settingsState.headerSize,
});

export default connect(mapStateToProps, {
    updateEffectiveBodyHeight,
})(HomeScreen);
