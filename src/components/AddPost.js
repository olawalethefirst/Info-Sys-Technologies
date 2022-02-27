import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import { connect } from 'react-redux';
import toggleOnUsernameModal from '../redux/actions/toggleOnUsernameModal';
//switch to use react native reanimated v2? for native animation

const AddPost = ({
    margin,
    headerSize,
    fontFactor,
    toggleModal,
    uid,
    disabled,
    toggleCallToAuthModal,
    username,
    toggleOnUsernameModal,
}) => {
    const buttonAnimatedScale = useSharedValue(1);
    const onPressIn = () => (buttonAnimatedScale.value = 0.8);
    const onPressOut = () => (buttonAnimatedScale.value = 1);
    const buttonAnimatedStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: withTiming(buttonAnimatedScale.value, { duration: 150 }) },
        ],
    }));
    const styles2 = StyleSheet.create({
        container: {
            right: margin,
            bottom: headerSize,
            width: wp(20) * fontFactor,
            height: wp(20) * fontFactor,
            borderRadius: wp(10) * fontFactor,
            elevation: wp(1) * fontFactor,
            shadowOffset: {
                width: wp(0.5) * fontFactor,
                height: wp(0.5) * fontFactor,
            },
            shadowRadius: wp(0.5) * fontFactor,
        },
    });

    const onPress = () => {
        // if (!uid) {
        //     return toggleCallToAuthModal();
        // }
        // if (!username) {
        //     return toggleOnUsernameModal();
        // }
        // return toggleModal();
        return toggleOnUsernameModal();
    };

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={disabled}
        >
            <Animated.View
                style={[
                    styles.container,
                    styles2.container,
                    buttonAnimatedStyle,
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
        </TouchableWithoutFeedback>
    );
};

AddPost.propTypes = {
    margin: PropTypes.number,
    headerSize: PropTypes.number,
    fontFactor: PropTypes.number,
    toggleModal: PropTypes.func,
    uid: PropTypes.string,
    disabled: PropTypes.bool,
    toggleCallToAuthModal: PropTypes.func,
};

const mapStateToProps = ({
    forumTempState: { uid, username },
    settingsState: { margin, headerSize, fontFactor },
}) => ({
    uid,
    margin,
    headerSize,
    fontFactor,
    username,
});

export default connect(mapStateToProps, {
    toggleCallToAuthModal,
    toggleOnUsernameModal,
})(AddPost);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1A91D7',
        backgroundColor: '#1A91D7',
        shadowColor: 'black',
        shadowOpacity: 0.3,
        position: 'absolute',
    },
});
