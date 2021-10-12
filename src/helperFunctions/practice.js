const asyncCall = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(100);
        }, 5000);
    });
};

const retrieveAsyncvalue = async () => {
    const val = await asyncCall();
    console.log('When are you coming');
    console.log(val);
};

export default retrieveAsyncvalue;
