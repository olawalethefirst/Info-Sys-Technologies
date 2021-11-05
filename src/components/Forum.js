import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import PostMini from './PostMini';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import SearchPosts from './SearchPosts';
import CreatePost from './CreatePost';
import checkColumnMode from '../helperFunctions/checkColumnMode';

const Forum = ({
    bodyHeight,
    margin,
    fontFactor,
    headerSize,
    deviceWidthClass,
    createPostModalVisible,
    toggleModal,
}) => {
    const columnMode = checkColumnMode(deviceWidthClass);

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
                style={[
                    {
                        minHeight: bodyHeight,
                        backgroundColor: '#f7f7f7',
                        paddingHorizontal: margin,
                    },
                ]}
            >
                <MarginVertical size={2} />
                <Text
                    style={[
                        styles.postsHeading,
                        {
                            fontSize: fontFactor * wp(6),
                            lineHeight: fontFactor * wp(7.7),
                        },
                    ]}
                >
                    Posts
                </Text>
                <MarginVertical />
                <SearchPosts fontFactor={fontFactor} />
                <MarginVertical size={1.5} />
                <View
                    style={{
                        width: '100%',
                        maxWidth: columnMode
                            ? wp(100) - (margin + headerSize)
                            : '100%',
                    }}
                >
                    <PostMini fontFactor={fontFactor} />
                    <CreatePost
                        toggleModal={toggleModal}
                        visible={createPostModalVisible}
                        margin={margin}
                        headerSize={headerSize}
                        fontFactor={fontFactor}
                        newPost={true}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    postsHeading: {
        fontFamily: 'Poppins_500Medium',
        // fontFamily: 'popp',
    },
});

export default React.memo(Forum);
