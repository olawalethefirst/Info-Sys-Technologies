import { Platform, Keyboard } from 'react-native';

export default function scrollToComponentBottom(
    componentRef,
    containerRef,
    scrollRef,
    windowHeight
) {
    const isIOS = Platform.OS === 'ios';

    if (isIOS) {
        let componentOffset;
        let componentHeight;
        if (componentRef.current && containerRef.current) {
            componentRef.current.measureLayout(
                containerRef.current,
                (left, top, width, height) => {
                    componentOffset = top;
                    componentHeight = height;
                }
            );
        }
        Keyboard.addListener(
            'keyboardDidShow',
            ({ endCoordinates: { height } }) => {
                if (componentHeight && componentOffset) {
                    const offset =
                        componentOffset -
                        (windowHeight - height - componentHeight);
                    scrollRef?.current?.scrollToOffset
                        ? scrollRef.current.scrollToOffset({
                              offset: Math.round(offset),
                              animated: true,
                          })
                        : scrollRef?.current?.scrollTo({
                              y: Math.round(offset),
                              animated: true,
                          });
                }
                Keyboard.removeAllListeners('keyboardDidShow');
            }
        );
    }
}
