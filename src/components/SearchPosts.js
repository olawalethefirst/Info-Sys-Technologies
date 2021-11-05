import React, { useState, useRef } from 'react';
import { StyleSheet, TextInput, View, Pressable, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchIcon from './SearchIcon';
import CloseTextInputIcon from './CloseTextInputIcon';
import PropTypes from 'prop-types';

const SearchPosts = ({ fontFactor }) => {
    const [search, setSearch] = useState('');
    const textInputRef = useRef(null);
    const focusTextInput = () => {
        textInputRef.current.focus();
    };
    const platformSpecificIconWidth =
        Platform.OS === 'web'
            ? { width: wp(6.65) * fontFactor }
            : { aspectRatio: 1 };

    return (
        <Pressable
            onPress={focusTextInput}
            style={[
                styles.container,
                {
                    height: wp(10.65) * fontFactor,
                    padding: wp(2) * fontFactor,
                },
            ]}
        >
            <View
                style={[
                    styles.icon,
                    {
                        paddingVertical: wp(0.75) * fontFactor,
                        ...platformSpecificIconWidth,
                    },
                ]}
            >
                <SearchIcon color="#808080" />
            </View>
            <TextInput
                ref={textInputRef}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="search"
                placeholder="Search posts"
                placeholderTextColor="#808080"
                underlineColorAndroid="transparent"
                value={search}
                onChangeText={(val) => setSearch(val)}
                style={[
                    styles.input,
                    {
                        paddingHorizontal: wp(1) * fontFactor,
                        fontSize: fontFactor * wp(4.5),
                        lineHeight: fontFactor * wp(5.72),
                    },
                ]}
            />
            {search ? (
                <Pressable
                    keyboard
                    onPress={() => {
                        setSearch('');
                    }}
                    style={[
                        styles.closeIcon,
                        {
                            padding: wp(1) * fontFactor,
                            borderRadius: wp(6.65 / 2) * fontFactor,
                            elevation: wp(6.65 / 2) * fontFactor,
                            shadowOffset: {
                                height: wp(0.5) * fontFactor,
                            },
                            shadowRadius: wp(1) * fontFactor,
                            ...platformSpecificIconWidth,
                        },
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
};

export default SearchPosts;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#dddddd',
        flexDirection: 'row',
    },
    icon: {
        height: '100%',
    },
    input: {
        flex: 1,
        alignSelf: 'center',
        height: '100%',
    },
    closeIcon: {
        height: '100%',
        backgroundColor: '#ffffff',
        shadowOffset: {
            width: 0,
        },
        shadowOpacity: 0.3,
    },
});
