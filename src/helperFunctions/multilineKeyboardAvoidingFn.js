import { Platform, Keyboard } from 'react-native';

export default function keyBoardAvoidingFn(
    megaSize,
    inputRef,
    containerRef,
    scrollRef,
    windowHeight
) {
    console.log(
        !!megaSize,
        !!inputRef.current,
        !!containerRef.current,
        !!scrollRef.current,
        !!windowHeight
    );
    const isIOS = Platform.OS === 'ios';

    if (isIOS && megaSize) {
        let fieldFormOffset;
        let fieldHeight;
        if (inputRef.current && containerRef.current) {
            inputRef.current.measureLayout(
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
                        fieldFormOffset -
                        (windowHeight - //can be effectiveBodyHeight if tabBar and header present or window heightwhen both absent. Keyboard height ignores height of tabBar in calculation of keyboardHeight when tabBar present
                            height -
                            fieldHeight);
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
