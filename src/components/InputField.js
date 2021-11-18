import React from 'react';
import { TextInput, Text, View, Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import { connect } from 'react-redux';

function InputField({
    onChange,
    onBlur,
    value,
    error,
    required,
    megaSize,
    subParagraph,
    label,
    fontFactor,
    ...props
}) {
    const styles2 = {
        baseFontSize: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
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
        subParagraph: {
            fontFamily: 'Karla_400Regular',
            fontSize: fontFactor * wp(3.64),
            lineHeight: fontFactor * wp(4.62),
        },
    };

    return (
        <View>
            <Text
                style={[
                    styles.whiteText,
                    styles.karla400Font,
                    styles2.baseFontSize,
                ]}
            >
                {label}
                {required && <Text style={styles.redText}> *</Text>}
            </Text>
            <MarginVertical size={0.2} />
            <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                multiline={megaSize ? true : false}
                onBlur={onBlur}
                textAlignVertical={megaSize && 'top'}
                value={value}
                onChangeText={onChange}
                style={[
                    styles.input,
                    styles2.input,
                    styles2.baseFontSize,
                    styles.blackText,
                    !megaSize && styles2.singleLineInput,
                    megaSize && styles2.multilineInput,
                ]}
                {...props}
            />
            <MarginVertical size={0.2} />
            {
                <Text
                    style={[
                        !error && styles.blueText,
                        styles.karla400Font,
                        styles2.subParagraph,
                        error && { color: 'red' },
                    ]}
                >
                    {error &&
                        `${
                            error.type === 'required'
                                ? 'This is important'
                                : 'Incorrect format'
                        }`}
                    {!error && subParagraph}
                </Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    whiteText: {
        color: '#fff',
    },
    karla400Font: {
        fontFamily: 'Karla_400Regular',
    },
    input: {
        backgroundColor: '#fff',
        color: 'black',
    },
    blueText: {
        color: '#1A91D7',
    },
    blackText: {
        color: 'black',
    },
    redText: {
        color: 'red',
    },
});

const mapStateToProps = (state) => ({
    fontFactor: state.settingsState.fontFactor,
});

export default connect(mapStateToProps)(InputField);
