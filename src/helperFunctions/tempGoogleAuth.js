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
import signOutUser from '../helperFunctions/signOutUserAsync';
import * as Google from 'expo-auth-session/providers/google';
import * as GoogleSignIn from 'expo-google-sign-in';
import { ResponseType } from 'expo-auth-session';

const isStandaloneApp =
    Constants.appOwnership !== 'expo' && Constants.appOwnership !== 'guest';

function ForumScreen() {
    //Universal States
    const [modalVisible, setModalVisible] = useState(false);
    const [activityIndicator, setActivityIndicator] = useState(false);
    const [credential, setCredential] = useState(null);
    const [authorized, setAuthorized] = useState(false);
    const [error, setError] = useState('');
    const firebaseNetworkError =
        'A network error (such as timeout, interrupted connection or unreachable host) has occurred.';

    //Universal Functions
    const createCredential = (idToken) => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        return googleProvider.credential(idToken);
    };
    const activateModal = () => {
        setActivityIndicator(true);
        setModalVisible(true);
    };
    const deactivateModal = () => {
        setActivityIndicator(false);
        setTimeout(() => setModalVisible(false), 400);
    };
    const persistModalWithError = () => {
        setActivityIndicator(false);
    };
    const dismissModal = () => {
        setModalVisible(false);
    };
    const retryFirebaseAuth = () => {
        setError('');
        setActivityIndicator(true);
        authWithGoogleCredential(credential)
            .then(() => {
                setAuthorized(true);
                deactivateModal();
            })
            .catch((e) => {
                if (e.message === firebaseNetworkError) {
                    persistModalWithError();
                    setError(e.message);
                } else {
                    deactivateModal();
                }
            });
    };

    // Expo Approach

    const authWithGoogleCredential = async (credential) => {
        return firebase.auth().signInWithCredential(credential);
    };

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId:
            '173918698726-gb70pgv7tu67ufqrq73if4i3fv3jvjsi.apps.googleusercontent.com',
    });

    !isStandaloneApp &&
        useEffect(() => {
            if (response?.type === 'success') {
                const { id_token } = response.params;
                const credential = createCredential(id_token);
                setCredential(credential);
                authWithGoogleCredential(credential)
                    .then(() => {
                        setAuthorized(true);
                        deactivateModal();
                    })
                    .catch((e) => {
                        if (e.message === firebaseNetworkError) {
                            persistModalWithError();
                            setError(e.message);
                        } else {
                            deactivateModal();
                        }
                    });
            } else if (response) {
                deactivateModal();
            }
        }, [response]);

    // Native Approach
    const [initState, setInitState] = useState(null);
    const [googleUser, setGoogleUser] = useState(null);
    const initAsync = async () => {
        await GoogleSignIn.initAsync();
        setInitState(true);
    };
    // const _syncAuthWithFirebaseAsync = async () => {
    //     try {
    //         ;
    //     } catch {

    //     }
    // };
    const authenticateUserAsync = async () => {
        try {
            if (!initState) {
                await initAsync();
            }
        } catch ({ message }) {
            deactivateModal();
        }
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                setGoogleUser(user);
                const credential = createCredential(googleUser.auth.idToken);
                setCredential(credential);
                authWithGoogleCredential(credential)
                    .then(() => {
                        setAuthorized(true);
                        deactivateModal();
                    })
                    .catch((e) => {
                        if (e.message === firebaseNetworkError) {
                            persistModalWithError();
                            setError(e.message);
                        } else {
                            deactivateModal();
                        }
                    });
            } else {
                throw new Error('Canceled');
            }
        } catch ({ message }) {
            deactivateModal();
        }
    };

    // const signOutAsync = async () => {
    //     await GoogleSignIn.signOutAsync();
    //     setGoogleUser(null);
    // };

    isStandaloneApp &&
        useEffect(() => {
            initAsync();
        }, []);

    return (
        <View style={{ justifyContent: 'center', flex: 1 }}>
            {/* Expo Approach */}
            {!isStandaloneApp && (
                <Modal
                    visible={modalVisible}
                    onRequestClose={null}
                    supportedOrientations={['portrait']}
                    transparent={true}
                    // onDismiss
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(22, 27, 38, 0.95)',
                            // opacity: 0.9,
                        }}
                    >
                        {activityIndicator ? (
                            <ActivityIndicator color="#1A91D7" />
                        ) : (
                            <Text
                                style={[
                                    {
                                        fontSize: 18,
                                        fontWeight: '500',
                                        opacity: error ? 0 : 1,
                                    },
                                    authorized
                                        ? { color: 'white' }
                                        : { color: 'red' },
                                ]}
                            >
                                {authorized ? 'Successful!' : 'Failed!'}
                            </Text>
                        )}

                        <View
                            style={{
                                opacity: error === firebaseNetworkError ? 1 : 0,
                            }}
                        >
                            <Text
                                style={[
                                    {
                                        fontSize: 18,
                                        fontWeight: '500',
                                        color: 'red',
                                        opacity: error ? 1 : 0,
                                    },
                                ]}
                            >
                                An error occured, please try again
                            </Text>
                            <Button
                                title="Retry"
                                onPress={retryFirebaseAuth}
                                disabled={
                                    error === firebaseNetworkError
                                        ? false
                                        : true
                                }
                            />
                            <Button
                                title="Cancel"
                                onPress={dismissModal}
                                disabled={
                                    error === firebaseNetworkError
                                        ? false
                                        : true
                                }
                            />
                        </View>
                    </View>
                </Modal>
            )}

            {/* Native Approach */}
            {isStandaloneApp && (
                <Modal
                    visible={modalVisible}
                    onRequestClose={null}
                    supportedOrientations={['portrait']}
                    transparent={true}
                    // onDismiss
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(22, 27, 38, 0.95)',
                            // opacity: 0.9,
                        }}
                    >
                        {activityIndicator ? (
                            <ActivityIndicator color="#1A91D7" />
                        ) : (
                            <Text
                                style={[
                                    {
                                        fontSize: 18,
                                        fontWeight: '500',
                                        opacity: error ? 0 : 1,
                                    },
                                    authorized
                                        ? { color: 'white' }
                                        : { color: 'red' },
                                ]}
                            >
                                {authorized ? 'Successful!' : 'Failed!'}
                            </Text>
                        )}

                        <View
                            style={{
                                opacity: error === firebaseNetworkError ? 1 : 0,
                            }}
                        >
                            <Text
                                style={[
                                    {
                                        fontSize: 18,
                                        fontWeight: '500',
                                        color: 'red',
                                        opacity: error ? 1 : 0,
                                    },
                                ]}
                            >
                                An error occured, please try again
                            </Text>
                            <Button
                                title="Retry"
                                onPress={retryFirebaseAuth}
                                disabled={
                                    error === firebaseNetworkError
                                        ? false
                                        : true
                                }
                            />
                            <Button
                                title="Cancel"
                                onPress={dismissModal}
                                disabled={
                                    error === firebaseNetworkError
                                        ? false
                                        : true
                                }
                            />
                        </View>
                    </View>
                </Modal>
            )}

            {/* Expo Approach */}
            {!isStandaloneApp && response && (
                <Text>Authorized: {authorized ? 'true' : 'false'}</Text>
            )}
            {/* Native Approach */}
            {isStandaloneApp && googleUser && (
                <Text>Authorized: {authorized ? 'true' : 'false'}</Text>
            )}

            {/* Expo Approach */}
            {!isStandaloneApp && (
                <Button
                    title="Toggle"
                    onPress={() => {
                        setError('');
                        setAuthorized(false);
                        activateModal();
                        promptAsync({ useProxy: true });
                    }}
                    //disabled when !request because cannot promptAsync without request
                    // disabled when !activityIndicator because cannot have multiple requests at a go
                    disabled={!request || activityIndicator}
                />
            )}

            {/* Native Approach */}
            {isStandaloneApp && (
                <Button
                    title="Toggle Auth"
                    onPress={() => {
                        setError('');
                        setAuthorized(false);
                        activateModal();
                        authenticateUserAsync();
                    }}
                />
            )}
        </View>
    );
}

const mapStateToProps = ({ settingsState: { user } }) => ({
    user,
});

export default connect(mapStateToProps)(ForumScreen);

const styles = StyleSheet.create({});
