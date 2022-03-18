import createPostAsync from './createPostAsync';

export default async function createPostWithTimerAsync(data, timer) {
    return new Promise((resolve, reject) => {
        createPostAsync(data)
            .then((res) => resolve(res))
            .catch((err) => reject(err));
        setTimeout(() => {
            reject();
        }, timer);
    });
}
