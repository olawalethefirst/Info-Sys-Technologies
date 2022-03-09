import { Platform, Keyboard } from 'react-native';

export default function scrollToComponentBottom(
    componentRef,
    containerRef,
    scrollRef,
    windowHeight
) {
    const isIOS = Platform.OS === 'ios';

    if (isIOS) {
        let fieldFormOffset;
        let fieldHeight;
        if (componentRef.current && containerRef.current) {
            componentRef.current.measureLayout(
                containerRef.current,
                (left, top, width, height) => {
                    fieldFormOffset = top;
                    fieldHeight = height;
                }
            );
        }
        Keyboard.addListener(
            'keyboardDidShow',
            ({ endCoordinates: { height } }) => {
                if (fieldHeight && fieldFormOffset) {
                    const offset =
                        fieldFormOffset - (windowHeight - height - fieldHeight);
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
