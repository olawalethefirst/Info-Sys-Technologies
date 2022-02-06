import React, { useRef, useState } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import CallToAuth from './CallToAuth';
import { TouchableOpacity } from 'react-native-gesture-handler';
//switch to use react native reanimated v2? for native animation 

const AddPost = ({
    margin,
    headerSize,
    fontFactor,
    toggleModal,
    user,
    disabled,
}) => {
    const animatedValue = useRef(new Animated.Value(1)).current;
    const [callToAuthVisible, setCallToAuthVisible] = useState(false);
    const onPressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 0.85,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    const toggleCallToAuthModal = () =>
        setCallToAuthVisible((oldState) => !oldState);

    return (
        <Pressable
            // onPressIn={onPressIn}
            // onPressOut={onPressOut}
            onPress={user ? toggleModal : toggleCallToAuthModal}
            disabled={disabled}
            style={{
                position: 'absolute',
                right: margin,
                bottom: headerSize,
            }}
        >
            {({ pressed }) => (
                <>
                    <Animated.View
                        style={[
                            styles.container,
                            {
                                width: wp(20) * fontFactor,
                                height: wp(20) * fontFactor,
                                borderRadius: wp(10),
                                transform: [{ scale: pressed ? 0.9 : 1 }],
                                elevation: wp(1) * fontFactor,
                                shadowOffset: {
                                    width: wp(0.5) * fontFactor,
                                    height: wp(0.5) * fontFactor,
                                },
                                shadowRadius: wp(0.5) * fontFactor,
                            },
                        ]}
                    >
                        <Icon
                            name="plus"
                            style={{
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.7),
                                color: '#fff',
                            }}
                        />
                    </Animated.View>
                    <CallToAuth
                        toggleCallToAuth={toggleCallToAuthModal}
                        visible={callToAuthVisible}
                        margin={margin}
                        fontFactor={fontFactor}
                    />
                </>
            )}
        </Pressable>
    );
};

AddPost.propTypes = {
    margin: PropTypes.number,
    headerSize: PropTypes.number,
    fontFactor: PropTypes.number,
    toggleModal: PropTypes.func,
    user: PropTypes.object,
    disabled: PropTypes.bool,
};

export default AddPost;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1A91D7',
        backgroundColor: '#1A91D7',
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
});
