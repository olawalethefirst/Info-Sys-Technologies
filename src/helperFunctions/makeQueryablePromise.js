const makeQueryablePromise = (promise) => {
    let isFulfilled = false;
    let isRejeceted = false;

    const result = promise.then(
        (res) => {
            isFulfilled = true;
            return res;
        },
        (e) => {
            isRejeceted = true;
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
