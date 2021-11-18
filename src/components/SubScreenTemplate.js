import React, { useRef } from 'react';
import {
    StyleSheet,
    Animated,
    Text,
    View,
    ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import updateScrollViewOffset from '../redux/actions/updateScrollViewOffset';

function SubScreenTemplate({
    margin,
    fontFactor,
    headerSize,
    heading,
    sectionComponents,
    scrollRef,
    updateScrollViewOffset,
    children,
}) {
    const scrollY = useRef(new Animated.Value(0));
    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
        {
            useNativeDriver: true,
            listener: (e) => {
                !heading &&
                    updateScrollViewOffset(e.nativeEvent.contentOffset.y);
            },
        }
    );
    const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerSize);
    const translateY = scrollYClamped.interpolate(
        {
            inputRange: [0, headerSize],
            outputRange: [0, -headerSize],
        },
        {
            useNativeDriver: true,
        }
    );

    const AnimatedImageBackground =
        Animated.createAnimatedComponent(ImageBackground);

    return (
        <View style={[styles.container]}>
            {heading && (
                <AnimatedImageBackground
                    //eslint-disable-next-line no-undef
                    source={require('../../assets/images/background2.png')}
                    resizeMode="cover"
                    style={[
                        styles.header,
                        {
                            paddingHorizontal: margin,
                            minHeight: headerSize,
                            transform: [
                                {
                                    translateY,
                                },
                            ],
                        },
                    ]}
                >
                    <Text
                        style={[
                            styles.headerText,
                            {
                                fontSize: fontFactor * wp(8.5),
                                lineHeight: fontFactor * wp(10.81),
                            },
                        ]}
                    >
                        {heading}
                    </Text>
                </AnimatedImageBackground>
            )}
            {children}
            <Animated.FlatList
                style={{ zIndex: -1 }}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                contentContainerStyle={
                    heading && {
                        paddingTop: headerSize,
                    }
                }
                data={sectionComponents}
                bounces={false}
                renderItem={({ item }) => item.data}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                ref={scrollRef}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
            />
        </View>
    );
}

SubScreenTemplate.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
    heading: PropTypes.string,
    sectionComponents: PropTypes.array,
    scrollRef: PropTypes.object,
    updateScrollViewOffset: PropTypes.func,
    children: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        // backgroundColor: '#161B26',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#161B26',
        justifyContent: 'center',
    },
    headerText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    bodyHeight: state.settingsState.bodyHeight,
});

export default connect(mapStateToProps, { updateScrollViewOffset })(
    SubScreenTemplate
);
