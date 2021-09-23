import React from 'react';
import { TextInput, Text, View, Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';

export default function InputField({
    storeData: { dispatch, fieldValue, actionType },
    label,
    megaSize,
    fontFactor,
}) {
    const styles2 = {
        allTexts: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
            fontFamily: 'Karla_400Regular',
        },
        input: {
            padding: fontFactor * wp(2),
            justifyContent: 'center',
        },
        singleLineInput: {
            minHeight: fontFactor * wp(10),
        },
        multilineInput: {
            minHeight: 4 * fontFactor * wp(5.78),
        },
    };

    return (
        <View>
            <Text style={[styles.allTexts]}>{label}</Text>
            <MarginVertical size={0.2} />
            <TextInput
                multiline={megaSize ? true : false}
                scrollEnabled={
                    megaSize ? Platform.select({ ios: false }) : null
                }
                textAlignVertical={megaSize && 'top'}
                value={fieldValue}
                onChangeText={(text) =>
                    dispatch({
                        type: actionType,
                        value: text,
                    })
                }
                style={[
                    styles.input,
                    styles2.input,
                    styles2.allTexts,
                    !megaSize && styles2.singleLineInput,
                    megaSize && styles2.multilineInput,
                ]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    allTexts: {
        color: '#fff',
    },
    input: {
        backgroundColor: '#fff',
        color: 'black',
    },
});
