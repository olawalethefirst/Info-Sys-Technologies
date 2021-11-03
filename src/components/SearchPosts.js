import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SearchIcon from './SearchIcon';

const SearchPosts = () => {
    console.log(wp(100));
    console.log(wp(10.65));

    return (
        <View
            style={{
                height: wp(10.65),
                backgroundColor: '#e6e6e6',
                borderRadius: wp(2.65),
                flexDirection: 'row',
                padding: wp(2),
            }}
        >
            <View
                style={{
                    height: '100%',
                    aspectRatio: 1,
                    // backgroundColor: 'green',
                }}
            >
                <SearchIcon color="#808080" />
            </View>
            <TextInput
                placeholder="Search Posts"
                style={{ flex: 1, paddingHorizontal: wp(2) }}
            />
        </View>
    );
};

export default SearchPosts;

const styles = StyleSheet.create({});
