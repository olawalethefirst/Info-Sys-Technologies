import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { firebase } from '../helperFunctions/initializeFirebase';
import { connect } from 'react-redux';

function ForumScreen() {
    return <View style={{ justifyContent: 'center', flex: 1 }}></View>;
}

const mapStateToProps = ({ settingsState: { user } }) => ({
    user,
});

export default connect(mapStateToProps)(ForumScreen);

const styles = StyleSheet.create({});
