import fetchLastPostTimeAsync from './fetchLastPostTimeAsync';

const authenticatePostRequestAsync = () => {
    fetchLastPostTimeAsync().then((result) => {
        // if exists, check if it is less than 60s ago
        if (
            result.successful &&
            result.exists &&
            Date.now() - result.data.createdAt.toMillis() >= 1000 * 5
        ) {
            // if false, check passed, return success and allow new post creation
            return { successful: true, error: false };
        } else if (result.successful && result.exists) {
            // if true, return fail and inform user to try in nearest second later
            return { successful: false, error: false };
        } else if (result.successful && !result.exists) {
            // If doesn't exist? check passed, create new entry & return success
            return { successful: true, error: false };
        } else {
            //Error handling
            return { successful: false, error: true };
        }
    });
};

export default authenticatePostRequestAsync;
