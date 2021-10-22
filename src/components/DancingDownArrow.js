import React, { PureComponent } from 'react';
import { StyleSheet, Animated, Pressable } from 'react-native';
import DownArrowIcon from './DownArrowIcon';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

// export default function DancingDownArrow({ arrowWidth, menuIconWidth }) {
//     const AnimatedView = Animated.createAnimatedComponent(View);
//     const styles2 = {
//         iconContainer: {
//             position: 'absolute',
//             width: arrowWidth,
//             height: (arrowWidth * 125) / 42,
//             right: (menuIconWidth - arrowWidth) / 2,
//             bottom: wp(4),
//             opacity: 0.8,
//         },
//     };

//     return (
//         <AnimatedView style={styles2.iconContainer}>
//             <DownArrowIcon />
//         </AnimatedView>
//     );
// }

export default class DancingDownArrow extends PureComponent {
    constructor(props) {
        super(props);
        this.animatedValue = new Animated.Value(0);
    }

    componentDidMount() {
        this.animateIcon();
    }

    animateIcon() {
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.animatedValue, {
                    toValue: wp(1.6),
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(this.animatedValue, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }

    render() {
        const { arrowWidth, menuIconWidth, scrollToNextPage, animatedValue } =
            this.props;
        const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
        const styles2 = {
            iconContainer: {
                width: arrowWidth,
                height: (arrowWidth * 125) / 42,
                right: (menuIconWidth - arrowWidth) / 2,
                opacity: animatedValue,
            },
        };

        return (
            <AnimatedPressable
                onPress={scrollToNextPage}
                hitSlop={wp(2)}
                style={[
                    styles.iconContainer,
                    styles2.iconContainer,

                    {
                        transform: [{ translateY: this.animatedValue }],
                    },
                ]}
            >
                <DownArrowIcon />
            </AnimatedPressable>
        );
    }
}

DancingDownArrow.propTypes = {
    arrowWidth: PropTypes.number,
    menuIconWidth: PropTypes.number,
    scrollToNextPage: PropTypes.func,
};

const styles = StyleSheet.create({
    iconContainer: {
        position: 'absolute',
        bottom: wp(4),
        opacity: 0.8,
    },
});
