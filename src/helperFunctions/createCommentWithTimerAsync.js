import createCommentAsync from './createCommentAsync';

export default async function createCommentWithTimerAsync(data, timer) {
    return new Promise((resolve, reject) => {
        createCommentAsync(data)
            .then((res) => {
                console.log('resolving');
                resolve(res);
            })
            .catch((err) => {
                console.log('rejecting', err);
                reject(err);
            });
        setTimeout(() => {
            console.log('rejected here too');
            reject();
        }, timer);
    });
}
