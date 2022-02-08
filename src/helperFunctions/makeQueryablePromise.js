const makeQueryablePromise = (promise) => {
    let isFulfilled = false;
    let isRejeceted = false;

    const result = promise.then(
        (res) => {
            isFulfilled = true;
            console.log('i am fulfilled');
            return res;
        },
        (e) => {
            isRejeceted = true;
            console.log('i failed');
            throw e;
        }
    );

    result.isPending = () => {
        return !(isFulfilled || isRejeceted);
    };
    result.isFulfilled = () => {
        return isFulfilled;
    };
    result.isRejected = () => {
        return isRejeceted;
    };

    return result;
};

export default makeQueryablePromise;
