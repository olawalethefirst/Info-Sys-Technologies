import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

function BCIcon() {
    return (
        <Svg
            viewBox="0 0 512 470"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.svg}
        >
            <Path
                d="M411.947 90.881C408.213 90.881 404.437 89.5796 401.408 86.913C361.024 51.4996 309.376 32.001 256 32.001C205.696 32.001 156.501 49.6436 117.461 81.7076C110.613 87.3183 100.523 86.3156 94.9334 79.489C89.344 72.6623 90.3254 62.5716 97.152 56.961C141.888 20.225 198.315 0.000976562 256 0.000976562C317.141 0.000976562 376.277 22.3156 422.507 62.849C429.141 68.673 429.803 78.785 423.979 85.441C420.821 89.025 416.384 90.881 411.947 90.881Z"
                fill="white"
            />
            <Path
                d="M154.667 85.335H101.333C92.5013 85.335 85.3333 78.167 85.3333 69.335V16.0016C85.3333 9.53764 89.2372 3.6923 95.2106 1.21764C101.184 -1.25703 108.075 0.108303 112.64 4.69497L165.973 58.0283C170.539 62.5936 171.925 69.4843 169.451 75.4576C166.976 81.431 161.131 85.335 154.667 85.335V85.335Z"
                fill="white"
            />
            <Path
                d="M258.56 469.334C197.397 469.334 138.261 447.02 92.0532 406.486C85.3972 400.662 84.7572 390.55 90.5812 383.894C96.4052 377.26 106.517 376.598 113.173 382.422C153.536 417.836 205.163 437.334 258.56 437.334C308.864 437.334 358.059 419.692 397.099 387.628C403.925 381.996 413.995 382.998 419.627 389.846C425.237 396.673 424.235 406.764 417.408 412.374C372.672 449.11 316.245 469.334 258.56 469.334V469.334Z"
                fill="white"
            />
            <Path
                d="M410.667 469.334C406.507 469.334 402.411 467.713 399.36 464.641L346.027 411.308C341.461 406.742 340.075 399.852 342.549 393.878C345.024 387.905 350.869 384.001 357.333 384.001H410.667C419.499 384.001 426.667 391.169 426.667 400.001V453.334C426.667 459.798 422.763 465.644 416.789 468.118C414.805 468.929 412.736 469.334 410.667 469.334Z"
                fill="white"
            />
            <Path
                d="M106.667 234.668C136.122 234.668 160 210.789 160 181.334C160 151.879 136.122 128.001 106.667 128.001C77.2114 128.001 53.3333 151.879 53.3333 181.334C53.3333 210.789 77.2114 234.668 106.667 234.668Z"
                fill="white"
            />
            <Path
                d="M154.667 256.001H58.6667C26.304 256.001 0 282.305 0 314.668V325.334C0 334.166 7.168 341.334 16 341.334H197.333C206.165 341.334 213.333 334.166 213.333 325.334V314.668C213.333 282.305 187.029 256.001 154.667 256.001Z"
                fill="white"
            />
            <Path
                d="M405.333 234.668C434.789 234.668 458.667 210.789 458.667 181.334C458.667 151.879 434.789 128.001 405.333 128.001C375.878 128.001 352 151.879 352 181.334C352 210.789 375.878 234.668 405.333 234.668Z"
                fill="white"
            />
            <Path
                d="M453.333 256.001H357.333C324.971 256.001 298.667 282.305 298.667 314.668V325.334C298.667 334.166 305.835 341.334 314.667 341.334H496C504.832 341.334 512 334.166 512 325.334V314.668C512 282.305 485.696 256.001 453.333 256.001Z"
                fill="white"
            />
        </Svg>
    );
}

const styles = StyleSheet.create({
    svg: {
        flex: 1,
    },
});

export default BCIcon;
