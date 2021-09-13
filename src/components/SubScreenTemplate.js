import React, { useRef } from 'react';
import { StyleSheet, Animated, Text, View } from 'react-native';
import { connect } from 'react-redux';
// import diff

function SubScreenTemplate({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    headerSize,
}) {
    const scrollY = useRef(new Animated.Value(0));
    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
        { useNativeDriver: true }
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

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                scrollEnabled={false}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: headerSize,
                    backgroundColor: 'tomato',
                    transform: [
                        {
                            translateY,
                        },
                    ],
                }}
            >
                <Text>A sticky Header</Text>
            </Animated.ScrollView>
            <Animated.FlatList
                // ref={headerRef}
                style={{ zIndex: -1 }}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                contentContainerStyle={{ paddingTop: headerSize }}
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                keyExtractor={(index, item) => index + item + ' '}
                bounces={false}
                renderItem={({ item, index }) => (
                    <View style={{ height: 200 }}>
                        <Text>A sticky Header - {index}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    bodyHeight: state.settingsState.bodyHeight,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
});

export default connect(mapStateToProps)(SubScreenTemplate);
