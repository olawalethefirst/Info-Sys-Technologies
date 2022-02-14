import { auth } from './initializeFirebase';
import { fetchSignInMethodsForEmail } from 'firebase/auth';

const fetchAccountProvider = async (email) => {
    //After confirming provider, direct to appropriate flow - gmail or traditional flow

    //error - 'account not found' (new user) **if not found, suggest signup instead, show option to choose gmail or enter credentials, pass email to screen from previous screen**

    //error - any other error, suggest to please try again, (An occured, please try again)

    return fetchSignInMethodsForEmail(auth, email);

    // try {
    //     const providers = await auth.fetchSignInMethodsForEmail(
    //         'emxsasxasaail@email.com'
    //     );
    //     if (providers.length > 0) {
    //         console.log(providers[0]);
    //         return { provider: providers[0] };
    //     } else {
    //         throw new Error('account not found');
    //     }
    // } catch (err) {
    //     console.log(err.message);
    //     return { error: err.message };
    // }
};

export default fetchAccountProvider;
