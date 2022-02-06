import React from 'react';
import { StyleSheet, Pressable, View, Platform, Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import PostMiniIcon from './PostMiniIcon';

const PostMini = ({
    fontFactor,
    title,
    createdAt,
    owner,
    category,
    body,
    postID,
    likes,
    item,
}) => {
    const platformSpecificPostIconWidth =
        Platform.OS === 'web'
            ? { width: wp(22) * fontFactor }
            : { aspectRatio: 1 };
    const styles2 = StyleSheet.create({
        postContainer: (pressed) => ({
            height: wp(25) * fontFactor,
            backgroundColor: !pressed ? '#f7f7f7' : '#1A91D7',
            borderWidth: wp(0.1) * fontFactor,
            padding: wp(3) * fontFactor,
        }),
        iconContainer: {
            padding: wp(2.5) * fontFactor,
            ...platformSpecificPostIconWidth,
        },
        textsContainer: {
            paddingVertical: wp(2.5) * fontFactor,
            paddingLeft: wp(5) * fontFactor,
            paddingRight: wp(2.5) * fontFactor,
        },
        fontSizeL1: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.09),
        },
        fontSizeL2: {
            fontSize: fontFactor * wp(5),
            lineHeight: fontFactor * wp(6.36),
        },
    });

    const navigation = useNavigation();
    const onPress = () => {
        navigation.navigate('ForumStack', {
            screen: 'Post',
            params: item,
        });
    };

    return (
        <Pressable
            onStartShouldSetResponder={() => true}
            onPress={onPress}
            style={({ pressed }) => [
                styles.postContainer,
                styles2.postContainer(pressed),
            ]}
        >
            {({ pressed }) => (
                <>
                    <View style={[styles.iconContainer, styles2.iconContainer]}>
                        <PostMiniIcon category={category} />
                    </View>
                    <View
                        style={[styles.textsContainer, styles2.textsContainer]}
                    >
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={[
                                styles.maxWidth60Perc,
                                styles.poppins500Font,
                                pressed
                                    ? styles.fontColorWhite
                                    : styles.fontColorBlack,
                                styles2.fontSizeL2,
                            ]}
                        >
                            {title}
                        </Text>
                        <Text
                            ellipsizeMode="tail"
                            numberOfLines={1}
                            style={[
                                styles.karla500Font,
                                styles2.fontSizeL1,
                                pressed
                                    ? styles.fontColorWhite
                                    : styles.fontColorBlack,
                            ]}
                        >
                            {likes} Like{likes > 1 ? 's' : ''}
                            <Text style={styles.fontColor808080}>
                                <Icon name="dot-single" />
                                <Text>{createdAt}</Text>
                            </Text>
                        </Text>
                    </View>
                </>
            )}
        </Pressable>
    );
};

PostMini.propTypes = {
    fontFactor: PropTypes.number,
    title: PropTypes.string,
    likes: PropTypes.number,
    createdAt: PropTypes.string,
    owner: PropTypes.string,
    category: PropTypes.string,
    body: PropTypes.string,
    postID: PropTypes.string,
};

const mapStateToProps = ({ settingsState: { fontFactor } }) => ({ fontFactor });

export default connect(mapStateToProps)(React.memo(PostMini));

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
    maxWidth60Perc: {
        maxWidth: '60%',
    },
    poppins500Font: {
        fontFamily: 'Poppins_500Medium',
    },
    karla500Font: {
        fontFamily: 'Karla_500Medium',
    },
    fontColorBlack: {
        color: '#000000',
    },
    fontColorWhite: {
        color: '#ffffff',
    },
    fontColor808080: {
        color: '#808080',
    },
});
