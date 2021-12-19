import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    ImageBackground,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    Pressable,
    Keyboard,
    TouchableWithoutFeedback,
    View,
    ScrollView,
    TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import CommentInput from '../components/CommentInput';
import updateViewPostFooterPosition from '../redux/actions/updateViewPostFooterPosition';
import Icon from 'react-native-vector-icons/AntDesign';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import PostDetail from '../components/PostDetail';
import updatePostScreenOffset from '../redux/actions/updatePostScreenOffset';
import CallToAuth from '../components/CallToAuth';

function PostScreen({
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    deviceWidthClass,
    updateViewPostFooterPosition,
    navigation,
    updatePostScreenOffset,
}) {
    const [callToAuthModalVisible, setCallToAuthModalVisible] = useState(false);
    const AnimatedImageBackground =
        Animated.createAnimatedComponent(ImageBackground);
    const scrollRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0));
    const handleScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollY.current },
                },
            },
        ],
        {
            useNativeDriver: true,
            listener: ({
                nativeEvent: {
                    contentOffset: { y },
                },
            }) => updatePostScreenOffset(y),
        }
    );
    const clampedScrollY = Animated.diffClamp(scrollY.current, 0, headerSize);
    const translateY = clampedScrollY.interpolate({
        inputRange: [0, headerSize],
        outputRange: [0, -headerSize],
    });
    const postData = [
        { post: 'post' },
        { comment: 'comment' },
        { comment: 'comment' },
        { comment: 'comment' },
    ];
    const { statusBarHeight } = Constants;
    const toggleCallToAuth = () => {
        setCallToAuthModalVisible((oldState) => !oldState);
    };

    return (
        <Pressable
            style={{
                flex: 1,
            }}
            // onStartShouldSetResponder=
            onPress={() => Keyboard.dismiss()}
            onStartShouldSetResponder={() => {
                console.log('tracked move');
                return true;
            }}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1,
                    // backgroundColor: 'green',
                }}
                keyboardVerticalOffset={Platform.select({
                    ios: headerSize + statusBarHeight,
                    android: null,
                })}
                behavior={Platform.select({ ios: 'padding', android: null })}
            >
                <SafeAreaView
                    style={{
                        // backgroundColor: 'purple',
                        flex: 1,
                    }}
                >
                    <AnimatedImageBackground
                        //eslint-disable-next-line no-undef
                        source={require('../../assets/images/background2.png')}
                        resizeMode="cover"
                        style={[
                            {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: '#161B26',
                            },
                            {
                                paddingHorizontal: margin,
                                height: headerSize,
                                transform: [
                                    {
                                        translateY,
                                    },
                                ],
                            },
                            {
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                            },
                        ]}
                    >
                        <TouchableOpacity
                            style={{
                                width: headerSize,
                                height: '100%',
                                justifyContent: 'center',
                            }}
                            onPress={navigation.goBack}
                        >
                            <Icon
                                name="arrowleft"
                                size={fontFactor * wp(8.5)}
                                color="#fff"
                            />
                        </TouchableOpacity>

                        <Text
                            style={[
                                {
                                    fontSize: fontFactor * wp(6.8),
                                    lineHeight: fontFactor * wp(8.65),
                                },

                                {
                                    color: '#fff',
                                    fontFamily: 'Poppins_500Medium',
                                },
                                { alignSelf: 'center' },
                            ]}
                        >
                            Post
                        </Text>
                    </AnimatedImageBackground>

                    <Animated.FlatList
                        nestedScrollEnabled
                        style={{ zIndex: -1 }}
                        scrollEventThrottle={16}
                        onScroll={handleScroll}
                        contentContainerStyle={{
                            paddingVertical: headerSize,
                        }}
                        data={postData}
                        bounces={false}
                        renderItem={({ item, index }) => {
                            return (
                                <PostDetail
                                    {...item}
                                    lastComment={index === postData.length - 1}
                                    toggleCallToAuth={toggleCallToAuth}
                                />
                            );
                        }}
                        keyExtractor={(item, index) => 'keyExtractor' + index}
                        ref={scrollRef}
                        keyboardDismissMode={'none'}
                        keyboardShouldPersistTaps="handled"
                    />
                    <CommentInput
                        headerSize={headerSize}
                        scrollY={scrollY}
                        scrollRef={scrollRef}
                        fontFactor={fontFactor}
                        margin={margin}
                    />
                    <CallToAuth
                        visible={callToAuthModalVisible}
                        toggleAuth={toggleCallToAuth}
                        margin={margin}
                        fontFactor={fontFactor}
                    />
                </SafeAreaView>
            </KeyboardAvoidingView>
        </Pressable>
    );
}

const styles = StyleSheet.create({});

const mapStateToProps = ({
    settingsState: {
        margin,
        fontFactor,
        headerSize,
        bodyHeight,
        deviceWidthClass,
    },
}) => ({
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    deviceWidthClass,
});

export default connect(mapStateToProps, {
    updateViewPostFooterPosition,
    updatePostScreenOffset,
})(PostScreen);
