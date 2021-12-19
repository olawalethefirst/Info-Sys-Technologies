import React, { useEffect, useState, useRef } from 'react';
import {
    TextInput,
    Text,
    View,
    Platform,
    StyleSheet,
    Keyboard,
    Dimensions,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

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
    scrollRef,
    contactFormRef,
    headerSize,
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
    const windowHeight = Dimensions.get('window').height;
    const { statusBarHeight } = Constants;
    const mulitLineInputRef = useRef(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (mulitLineInputRef?.current && contactFormRef?.current) {
            mulitLineInputRef.current.measureLayout(
                contactFormRef.current,
                (left, top, height) => {
                    setOffset(
                        top +
                            2 * headerSize -
                            (windowHeight -
                                headerSize -
                                statusBarHeight -
                                height)
                    );
                }
            );
        }
    }, [
        offset,
        headerSize,
        windowHeight,
        statusBarHeight,
        mulitLineInputRef,
        contactFormRef,
    ]);

    return (
        <View ref={mulitLineInputRef}>
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
                onFocus={
                    Platform.OS === 'ios' && megaSize
                        ? () => {
                              Keyboard.addListener('keyboardDidShow', () =>
                                  scrollRef?.current?.scrollToOffset({
                                      offset: offset,
                                      animated: true,
                                  })
                              );
                          }
                        : null
                }
                onBlur={
                    megaSize
                        ? () => {
                              Keyboard.removeAllListeners('keyboardDidShow');
                              onBlur();
                          }
                        : onBlur
                }
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
    megaSize: PropTypes.bool,
    subParagraph: PropTypes.string,
    label: PropTypes.string,
    fontFactor: PropTypes.number,
    scrollRef: PropTypes.object,
    headerSize: PropTypes.number,
    contactFormRef: PropTypes.object,
};

const mapStateToProps = (state) => ({
    fontFactor: state.settingsState.fontFactor,
    headerSize: state.settingsState.headerSize,
});

export default connect(mapStateToProps)(InputField);
