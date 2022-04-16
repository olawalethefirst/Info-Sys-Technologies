import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
import PlusICon from './PlusIcon';
import ActivityIndicatorIcon from './ActivityIndicatorIcon';

const AddPost = ({
    margin,
    headerSize,
    fontFactor,
    toggleModal,
    uid,
    toggleCallToAuthModal,
    username,
    toggleOnUsernameModal,
    posting,
}) => {
    const buttonAnimatedScale = useSharedValue(1);
    const onPressIn = () => {
        'worklet';
        buttonAnimatedScale.value = 0.8;
    };
    const onPressOut = () => {
        'worklet';
        buttonAnimatedScale.value = 1;
    };
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
        if (!uid) {
            return toggleCallToAuthModal();
        } else if (!username) {
            return toggleOnUsernameModal();
        } else return toggleModal();
    };

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={posting}
        >
            <Animated.View
                style={[
                    styles.container,
                    styles2.container,
                    buttonAnimatedStyle,
                ]}
            >
                {!posting && (
                    <PlusICon
                        height={fontFactor * wp(5)}
                        width={fontFactor * wp(5)}
                        posting={posting}
                    />
                )}
                {posting && (
                    <ActivityIndicatorIcon
                        height={fontFactor * wp(5)}
                        width={fontFactor * wp(5)}
                    />
                )}
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
    posting: PropTypes.bool,
    toggleCallToAuthModal: PropTypes.func,
    username: PropTypes.string,
    toggleOnUsernameModal: PropTypes.func,
};

const mapStateToProps = ({
    forumTempState: { uid, username, posting },
    settingsState: { margin, headerSize, fontFactor },
}) => ({
    uid,
    margin,
    headerSize,
    fontFactor,
    username,
    posting,
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
