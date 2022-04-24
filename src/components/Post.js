import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import CommentsHeading from './CommentsHeading';
import Username from './Username';
import CreatedAt from './CreatedAt';
import Likes from './Likes';
import Category from './Category';
import Title from './Title';
import Body from './Body';
import PropTypes from 'prop-types';
import LikeReplyContainer from './LikeReplyContainer';

const Post = ({
    fontFactor,
    margin,
    body,
    category,
    title,
    username,
    likes,
    createdAt,
    postID,
    liked,
    onReply,
    onLike,
    columnMode,
}) => {
    const postRef = useRef(null);

    const styles2 = StyleSheet.create({
        postContainer: {
            borderBottomWidth: wp(0.25),
            paddingHorizontal: margin,
        },
        columnMode: {
            width: columnMode ? '90%' : '100%',
        },
    });
    
    return (
        <View>
            <View
                ref={postRef}
                style={[styles.postContainer, styles2.postContainer]}
            >
                <View style={[styles.columnMode, styles2.columnMode]}>
                    <View>
                        <Username username={username} fontFactor={fontFactor} />
                        <MarginVertical size={0.2} />

                        <CreatedAt
                            createdAt={createdAt}
                            fontFactor={fontFactor}
                        />
                        <MarginVertical size={0.2} />
                        <Likes
                            likesCount={Object.keys(likes).length}
                            fontFactor={fontFactor}
                        />
                    </View>
                    <MarginVertical />
                    <View>
                        <Category category={category} fontFactor={fontFactor} />
                        <MarginVertical size={0.5} />
                        <Title fontFactor={fontFactor} title={title} />
                        <MarginVertical size={0.3} />
                        <Body fontFactor={fontFactor} body={body} />
                    </View>
                    <MarginVertical />
                    <LikeReplyContainer
                        onPressLike={() => onLike(liked)}
                        onPressReply={() => onReply(postID)}
                        fontFactor={fontFactor}
                        liked={liked}
                    />
                    <MarginVertical />
                </View>
            </View>
            <MarginVertical />
            <CommentsHeading />
        </View>
    );
};

Post.propTypes = {
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    body: PropTypes.string,
    category: PropTypes.string,
    title: PropTypes.string,
    username: PropTypes.string,
    likes: PropTypes.object,
    createdAt: PropTypes.string,
    postID: PropTypes.string,
    liked: PropTypes.bool,
    onReply: PropTypes.func,
    onLike: PropTypes.func,
    columnMode: PropTypes.bool,
};

const mapStateToProps = ({ settingsState: { fontFactor, margin } }) => ({
    fontFactor,
    margin,
});

export default connect(mapStateToProps, {})(Post);

const styles = StyleSheet.create({
    postContainer: {
        borderBottomColor: '#cecece',
    },
    columnMode: {
        alignSelf: 'center',
    },
});
