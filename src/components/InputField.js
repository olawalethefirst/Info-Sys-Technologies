import React, { useRef } from 'react';
import { TextInput, Text, View, StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

function InputField({
    onChange,
    onBlur,
    value,
    error,
    required,
    subParagraph,
    label,
    fontFactor,
    scrollRef,
    contactFormRef,
    effectiveBodyHeight,
    scrollToItemBottom,
    megaSize,
    ...props
}) {
    const styles2 = {
        baseFontSize: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
        },
        input: {
            paddingHorizontal: fontFactor * wp(2),
            paddingVertical: fontFactor * wp(1),
        },
        singleLineInput: {
            height: fontFactor * wp(10),
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
    const mutiLineInputRef = useRef(null);

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
                ref={mutiLineInputRef}
                autoCapitalize={'none'}
                autoCorrect={false}
                multiline={Platform.select({
                    ios: true,
                    android: megaSize ? true : false,
                })}
                onFocus={() =>
                    scrollToItemBottom(
                        mutiLineInputRef,
                        contactFormRef,
                        scrollRef,
                        effectiveBodyHeight
                    )
                }
                onBlur={onBlur}
                textAlignVertical={megaSize ? 'top' : 'center'}
                value={value}
                onChangeText={onChange}
                style={[
                    styles.input,
                    styles2.input,
                    styles2.baseFontSize,
                    styles.blackText,
                    megaSize ? styles2.multilineInput : styles2.singleLineInput,
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
                            error.type === 'pattern'
                                ? 'Incorrect format'
                                : 'This is important'
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

InputField.propTypes = {
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string,
    error: PropTypes.object,
    required: PropTypes.bool,
    subParagraph: PropTypes.string,
    label: PropTypes.string,
    fontFactor: PropTypes.number,
    scrollRef: PropTypes.object,
    contactFormRef: PropTypes.object,
    effectiveBodyHeight: PropTypes.number,
    scrollToItemBottom: PropTypes.func,
    megaSize: PropTypes.bool,
};

const mapStateToProps = (state) => ({
    fontFactor: state.settingsState.fontFactor,
    effectiveBodyHeight: state.settingsState.effectiveBodyHeight,
});

export default connect(mapStateToProps)(InputField);
