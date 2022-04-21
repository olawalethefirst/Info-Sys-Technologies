import { useState, useCallback, useEffect } from 'react';
import { Keyboard } from 'react-native';
import scrollToComponentBottom from '../helperFunctions/scrollToComponentBottom';

export default function useScrollToItemBottom() {
    const [keyboadActive, setKeyboardActive] = useState(false);

    const scrollToItemBottom = useCallback(
        (mutiLineInputRef, containerRef, scrollRef, windowHeight, both) => {
            if (!keyboadActive) {
                scrollToComponentBottom(
                    mutiLineInputRef,
                    containerRef,
                    scrollRef,
                    windowHeight,
                    both
                );
            }
        },
        [keyboadActive]
    );
    const updateKeyboardActive = useCallback(() => {
        const events = ['keyboardDidShow', 'keyboardDidHide'];

        const listeners = events.map((e) =>
            Keyboard.addListener(e, () => {
                setKeyboardActive(e === events[0]);
            })
        );
        return () => listeners.forEach((listener) => listener.remove());
    }, []);

    useEffect(() => {
        const unsubscribe = updateKeyboardActive();

        return unsubscribe;
    }, [updateKeyboardActive]);

    return [scrollToItemBottom];
}
