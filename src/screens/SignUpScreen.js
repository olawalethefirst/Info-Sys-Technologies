import signUpWihthEmail from '../helperFunctions/signUpWithEmail';

const [authError, setAuthError] = useState('');

const onSignUp = async () => {
    const response = await signUpWihthEmail();
    if (!response.successful) {
        console.log('response', response.successful);
        setAuthError(response.message);
    } else {
        firebase.auth().currentUser?.updateProfile({
            displayName: 'QbashyTheHottest',
        });
    }
};
console.log('error', authError);
console.log('user', user);
