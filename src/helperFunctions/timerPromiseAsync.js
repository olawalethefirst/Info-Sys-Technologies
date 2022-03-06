export default function timerPromiseAsync(timer) {
    return new Promise((res) => {
        setTimeout(() => {
            res();
        }, timer);
    });
}
