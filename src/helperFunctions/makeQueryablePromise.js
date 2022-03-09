const makeQueryablePromise = (promise) => {
    let isFulfilled = false;
    let isRejected = false;

    const result = promise.then(
        (res) => {
            isFulfilled = true;
            return res;
        },
        (e) => {
            isRejected = true;
            throw e;
        }
    );

    result.isPending = () => {
        return !(isFulfilled || isRejected);
    };
    result.isFulfilled = () => {
        return isFulfilled;
    };
    result.isRejected = () => {
        return isRejected;
    };

    return result;
};

export default makeQueryablePromise;
