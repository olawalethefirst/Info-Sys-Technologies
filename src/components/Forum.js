import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PostMini from './PostMini';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import SearchPosts from './SearchPosts';

const Forum = ({ bodyHeight, margin, fontFactor }) => {
    return (
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
            <MarginVertical />
            <PostMini fontFactor={fontFactor} />
        </View>
    );
};

const styles = StyleSheet.create({
    postsHeading: {
        fontFamily: 'Poppins_500Medium',
        // fontFamily: 'popp',
    },
});

export default React.memo(Forum);
