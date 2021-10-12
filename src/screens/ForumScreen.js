import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { firebase } from '../helperFunctions/initializeFirebase';
import { connect } from 'react-redux';
import signUpWihthEmail from '../helperFunctions/signUpWithEmail';
import updateUsername from '../helperFunctions/updateUsername';
import signOutUser from '../helperFunctions/signOutUser';

function ForumScreen({ user }) {
    const [authError, setAuthError] = useState('');

    const onPress = () => {
        // const googleProvider = new firebase.auth.GoogleAuthProvider();
        // googleProvider.addScope('profile');
        // googleProvider.addScope('email');
        // firebase
        //     .auth()
        //     .signInWithPopup(googleProvider)
        //     .then((result) => console.log(result));
    };
    // console.log(firebase.auth.)

    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            <Text>ForumScreen</Text>
            <Button title="Sign Up" onPress={onPress} />
        </View>
    );
}

const mapStateToProps = ({ settingsState: { user } }) => ({
    user,
});

export default connect(mapStateToProps)(ForumScreen);

const styles = StyleSheet.create({});
