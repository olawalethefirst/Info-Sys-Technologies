const promise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // console.log('calling timeout');
            const randomNo = Math.floor(Math.random() * 10) + 1;
            console.log(randomNo);
            if (randomNo % 2 === 0) {
                resolve('passed');
            } else {
                reject('failed');
            }
        }, 5000);
    });
};

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

export { promise, makeQueryablePromise };
