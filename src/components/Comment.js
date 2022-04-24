import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import Username from './Username';
import CreatedAt from './CreatedAt';
import Likes from './Likes';
import toggleCallToAuthModal from '../redux/actions/toggleCallToAuthModal';
import Body from './Body';
import LikeReplyContainer from './LikeReplyContainer';
import PropTypes from 'prop-types';

const Comment = ({
    fontFactor,
    margin,
    username,
    createdAt,
    likes,
    comment,
    commentID,
    liked,
    onReply,
    onLike,
    columnMode,
}) => {
    const commentRef = useRef(null);
    const styles2 = StyleSheet.create({
        container: {
            borderBottomWidth: wp(0.25),
            marginHorizontal: margin,
        },
        columnMode: {
            width: columnMode ? '90%' : '100%',
        },
    });
    
    return (
        <View ref={commentRef} style={[styles.container, styles2.container]}>
            <View style={[styles.columnMode, styles2.columnMode]}>
                <View>
                    <Username username={username} fontFactor={fontFactor} />
                    <MarginVertical size={0.2} />
                    <CreatedAt createdAt={createdAt} fontFactor={fontFactor} />
                    <MarginVertical size={0.2} />
                    <Likes
                        likesCount={Object.keys(likes).length}
                        fontFactor={fontFactor}
                    />
                </View>
                <MarginVertical />

                <View>
                    <Body body={comment} fontFactor={fontFactor} />
                </View>
                <MarginVertical />
                <LikeReplyContainer
                    onPressLike={() => onLike(liked,commentID)}
                    onPressReply={() => onReply(commentRef)}
                    fontFactor={fontFactor}
                    liked={liked}
                />
                <MarginVertical />
            </View>
        </View>
    );
};

Comment.propTypes = {
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    username: PropTypes.string,
    likes: PropTypes.object,
    createdAt: PropTypes.string,
    comment: PropTypes.string,
    commentID: PropTypes.string,
    liked: PropTypes.bool,
    onReply: PropTypes.func,
    onLike: PropTypes.func,
    columnMode: PropTypes.bool,
};

const mapStateToProps = ({ settingsState: { fontFactor, margin } }) => ({
    fontFactor,
    margin,
});

export default connect(mapStateToProps, { toggleCallToAuthModal })(Comment);

const styles = StyleSheet.create({
    container: { borderBottomColor: '#cecece' },
    columnMode: { alignSelf: 'center' },
});
