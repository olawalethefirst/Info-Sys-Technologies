import React, { useRef } from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    Platform,
    Animated,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ComputerMaintenance from './ComputerMaintenance';
import Icon from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const PostMini = ({ fontFactor, title, timeStamp, likes }) => {
    const platformSpecificPostIconWidth =
        Platform.OS === 'web'
            ? { width: wp(22) * fontFactor }
            : { aspectRatio: 1 };

    const animatedValue = useRef(new Animated.Value(0)).current;
    const onPressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };
    const onPressOut = () => {
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
        }).start();
    };
    const animatedValueText = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#000000', '#ffffff'],
    });
    const navigation = useNavigation();

    return (
        <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={{ marginBottom: fontFactor * wp(5) }}
            onPress={() =>
                navigation.navigate('ForumStack', {
                    screen: 'Post',
                    params: {},
                })
            }
        >
            <Animated.View
                style={[
                    styles.postContainer,
                    {
                        height: wp(25) * fontFactor,
                        backgroundColor: animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['#f7f7f7', '#1A91D7'],
                        }),
                        borderWidth: wp(0.1) * fontFactor,
                        padding: wp(3) * fontFactor,
                    },
                ]}
            >
                <View
                    style={[
                        styles.iconContainer,
                        {
                            padding: wp(2.5) * fontFactor,
                            ...platformSpecificPostIconWidth,
                        },
                    ]}
                >
                    <ComputerMaintenance />
                </View>
                <View
                    style={[
                        styles.textsContainer,
                        {
                            paddingVertical: wp(2.5) * fontFactor,
                            paddingLeft: wp(5) * fontFactor,
                            paddingRight: wp(2.5) * fontFactor,
                        },
                    ]}
                >
                    <Animated.Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={[
                            styles.postHeader,
                            {
                                fontSize: fontFactor * wp(5),
                                lineHeight: fontFactor * wp(6.36),
                                color: animatedValueText,
                            },
                        ]}
                    >
                        Title Title Title Title Title Title Title
                    </Animated.Text>
                    <Animated.Text
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        style={[
                            styles.postBody,
                            {
                                fontSize: fontFactor * wp(4),
                                lineHeight: fontFactor * wp(5.09),
                                color: animatedValueText,
                            },
                        ]}
                    >
                        20 Likes{' '}
                        <Text style={{ color: '#808080' }}>
                            <Icon name="dot-single" />
                            <Text>
                                {' '}
                                created {moment(1500000000000).fromNow()}
                            </Text>
                        </Text>
                    </Animated.Text>
                </View>
            </Animated.View>
        </Pressable>
    );
};

PostMini.propTypes = {
    fontFactor: PropTypes.number,
    title: PropTypes.string,
    timeStamp: PropTypes.number,
    likes: PropTypes.number,
};

export default PostMini;

const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'row',
        borderColor: '#1CB8F3',
    },
    iconContainer: {
        backgroundColor: 'white',
        height: '100%',
    },
    textsContainer: {
        justifyContent: 'center',
        height: '100%',
        flex: 1,
    },
    postHeader: {
        fontFamily: 'Poppins_600SemiBold',
        width: '60%',
    },
    postBody: {
        fontFamily: 'Karla_500Medium',
    },
});
