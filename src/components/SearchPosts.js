import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, View, Pressable, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchIcon from './SearchIcon';
import CloseTextInputIcon from './CloseTextInputIcon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import updateSearching from '../redux/actions/updateSearching';
import { store } from '../redux/store';
import searchPosts from '../redux/actions/searchPosts';

const SearchPosts = ({ fontFactor, updateSearching, searchPosts }) => {
    const [search, setSearch] = useState('');
    const [searchTimer, setSearchTimer] = useState(null);
    const textInputRef = useRef(null);
    const focusTextInput = () => {
        textInputRef.current.focus();
    };
    const onChangeText = (val) => {
        if (searchTimer) {
            clearTimeout(searchTimer);
        }
        setSearch(val);
        setSearchTimer(
            //only trigger action when new value is not an empty string
            setTimeout(() => {
                searchPosts(val);
                setSearchTimer(null);
            }, 500) //allows 1/2s interval betweeen typing before sending query. If hit within interval, it is aborted.
        );
    };
    const platformSpecificIconWidth =
        Platform.OS === 'web'
            ? { width: wp(6.65) * fontFactor }
            : { aspectRatio: 1 };

    const styles2 = StyleSheet.create({
        height1: {
            height: wp(10.65) * fontFactor,
        },
        padding1: {
            padding: wp(2) * fontFactor,
        },
        padding2: { padding: wp(1) * fontFactor },
        paddingVertical: {
            paddingVertical: wp(0.75) * fontFactor,
        },
        width1: {
            ...platformSpecificIconWidth,
        },
        paddingHorizontal: {
            paddingHorizontal: wp(1) * fontFactor,
        },
        fontSize1: {
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
        },
        borderRadius1: {
            borderRadius: wp(6.65 / 2) * fontFactor,
        },
        elevation1: {
            elevation: wp(6.65 / 2) * fontFactor,
        },
        shadow1: {
            shadowOffset: {
                height: wp(0.5) * fontFactor,
            },
            shadowRadius: wp(1) * fontFactor,
        },
    });

    useEffect(() => {
        if (!search.trim().length) {
            if (store.getState().forumTempState.searching) {
                updateSearching(false);
            }
        } else {
            if (!store.getState().forumTempState.searching) {
                updateSearching(true);
            }
        }
    }, [search, updateSearching]);

    return (
        <Pressable
            onPress={focusTextInput}
            style={[
                styles.flexDirectionRow,
                styles.backgroundColorDDDDDD,
                styles2.height1,
                styles2.padding1,
            ]}
        >
            <View
                style={[
                    styles.height100Perc,
                    styles2.width1,
                    styles2.paddingVertical,
                ]}
            >
                <SearchIcon color="#808080" />
            </View>
            <TextInput
                ref={textInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                placeholder="Search posts"
                placeholderTextColor="#808080"
                underlineColorAndroid="transparent"
                value={search}
                onChangeText={onChangeText}
                style={[
                    styles.height100Perc,
                    styles.alignSelfCenter,
                    styles.flex1,
                    styles2.paddingHorizontal,
                    styles2.fontSize1,
                ]}
            />
            {search ? (
                <Pressable
                    keyboard
                    onPress={() => {
                        setSearch('');
                    }}
                    style={[
                        styles.height100Perc,
                        styles.shadow1,
                        styles.backgroundColorFFFFFF,
                        styles.padding2,
                        styles2.shadow1,
                        styles2.elevation1,
                        styles2.borderRadius1,
                        styles2.width1,
                    ]}
                >
                    <CloseTextInputIcon color="#808080" />
                </Pressable>
            ) : null}
        </Pressable>
    );
};

SearchPosts.propTypes = {
    fontFactor: PropTypes.number,
    updateSearching: PropTypes.func,
    searchPosts: PropTypes.func,
};

const mapStateToProps = ({ settingsState: { fontFactor } }) => ({ fontFactor });

export default connect(mapStateToProps, { updateSearching, searchPosts })(
    SearchPosts
);

const styles = StyleSheet.create({
    backgroundColorDDDDDD: {
        backgroundColor: '#dddddd',
    },
    backgroundColorFFFFFF: {
        backgroundColor: '#ffffff',
    },
    flexDirectionRow: {
        flexDirection: 'row',
    },
    height100Perc: {
        height: '100%',
    },
    flex1: {
        flex: 1,
    },
    alignSelfCenter: {
        alignSelf: 'center',
    },
    shadow1: {
        shadowOffset: {
            width: 0,
        },
        shadowOpacity: 0.3,
    },
});
