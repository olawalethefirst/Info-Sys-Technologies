import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

function CAIcon() {
    return (
        <Svg
            viewBox="0 0 516 486"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            styles={styles.svg}
        >
            <Path
                d="M32 2v45H2v150h30v92H2v150h30v45h482V2H32zm452 452H62v-45H32v-90h30V167H32V77h30V32h422v422z"
                fill="#fff"
                stroke="#fff"
                strokeWidth={4}
            />
            <Path
                d="M424 196.778h30v92.443h-30v-92.443zM273 288c24.813 0 45-20.187 45-45s-20.187-45-45-45-45 20.187-45 45 20.187 45 45 45zm0-60c8.271 0 15 6.729 15 15s-6.729 15-15 15-15-6.729-15-15 6.729-15 15-15z"
                fill="#fff"
                stroke="#fff"
                strokeWidth={4}
            />
            <Path
                d="M105.181 410.819C113.68 419.319 124.98 424 137 424c12.021 0 23.321-4.682 31.819-13.181l68.895-68.894C248.987 345.961 260.813 348 273 348c12.187 0 24.013-2.039 35.286-6.074l68.894 68.894C385.679 419.318 396.979 424 409 424c12.02 0 23.32-4.681 31.819-13.181 17.546-17.545 17.546-46.094 0-63.639l-68.894-68.895C375.961 267.013 378 255.187 378 243c0-12.187-2.039-24.013-6.074-35.286l68.894-68.895c17.546-17.545 17.546-46.094 0-63.639C432.32 66.681 421.02 62 409 62c-12.021 0-23.321 4.682-31.819 13.181l-68.895 68.894C297.013 140.039 285.187 138 273 138c-12.187 0-24.013 2.039-35.286 6.074L168.82 75.181C160.321 66.682 149.021 62 137 62c-12.02 0-23.32 4.681-31.819 13.181-17.546 17.545-17.546 46.094 0 63.639l68.894 68.895C170.039 218.987 168 230.813 168 243c0 12.187 2.039 24.013 6.074 35.286l-68.894 68.895c-17.545 17.545-17.545 46.093.001 63.638v0zm21.213-42.425l83.493-83.493-4.583-9.575C200.457 265.199 198 254.323 198 243s2.457-22.199 7.304-32.325l4.583-9.575-83.493-83.493c-5.849-5.849-5.849-15.364 0-21.213A14.902 14.902 0 01137 92a14.9 14.9 0 0110.606 4.394l83.493 83.493 9.575-4.583C250.801 170.457 261.677 168 273 168s22.199 2.457 32.325 7.304l9.575 4.583 83.494-83.493A14.9 14.9 0 01409 92c4.006 0 7.773 1.561 10.606 4.394 5.849 5.849 5.849 15.364 0 21.213L336.113 201.1l4.583 9.575C345.543 220.801 348 231.677 348 243c0 11.323-2.457 22.199-7.304 32.325l-4.583 9.575 83.493 83.493c5.849 5.849 5.849 15.364 0 21.213A14.902 14.902 0 01409 394a14.9 14.9 0 01-10.606-4.394L314.9 306.113l-9.575 4.583C295.199 315.543 284.323 318 273 318c-11.323 0-22.199-2.457-32.325-7.304l-9.575-4.583-83.494 83.493A14.9 14.9 0 01137 394a14.902 14.902 0 01-10.606-4.394c-5.849-5.848-5.849-15.364 0-21.212v0z"
                fill="#fff"
                stroke="#fff"
                strokeWidth={4}
            />
        </Svg>
    );
}

const styles = StyleSheet.create({
    svg: {
        flex: 1,
    },
});
export default CAIcon;