export default function getDeviceWidth(width) {
    if (width < 600) {
        return -1;
    } else if (width >= 600 && width < 641) {
        return 0;
    } else if (width >= 641) {
        return 1;
    }
    return;
}
