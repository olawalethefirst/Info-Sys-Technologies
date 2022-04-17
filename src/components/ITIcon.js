import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

function ITIcon({ size }) {
    return (
        <Svg
            viewBox="0 0 508 508"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
        >
            <Path
                d="M32.6611 139.894V394.369H27.6171C18.6313 394.369 10.4878 399.208 5.81796 407.21C1.15379 415.202 0.74022 424.986 4.70307 433.38L4.70314 433.38L19.9264 465.619L21.7274 464.768L19.9265 465.619C31.6658 490.477 55.3187 506 81.6941 506H381.981C408.355 506 432.008 490.477 443.749 465.619L442.14 464.859L443.749 465.619L458.971 433.381C458.971 433.381 458.971 433.381 458.971 433.381C462.936 424.987 462.522 415.202 457.857 407.21C453.186 399.208 445.043 394.369 436.057 394.369H431.014V285.484C475.65 259.972 506 210.025 506 152.756C506 69.7356 442.186 2 363.506 2C289.579 2 228.781 61.8096 221.709 137.894H34.6611H32.6611V139.894ZM397.675 394.369H65.9987V172.957H222.292C231.641 246.479 291.316 303.513 363.505 303.513C375.281 303.513 386.724 301.985 397.675 299.121V394.369ZM363.506 37.0627C423.588 37.0627 472.662 88.8554 472.662 152.756C472.662 216.657 423.588 268.45 363.506 268.45C303.425 268.45 254.349 216.657 254.349 152.756C254.349 88.8554 303.425 37.0627 363.506 37.0627ZM413.891 450.018C407.775 462.972 395.533 470.937 381.982 470.937H81.6941C68.1421 470.937 55.9014 462.972 49.7849 450.019L40.0626 429.431H423.613L413.891 450.018Z"
                fill="white"
                stroke="white"
                stroke-width="4"
            />
            <Path
                d="M318.24 225.561L330.638 212.434C335.651 215.529 341.09 217.933 346.836 219.535V238.244V240.244H348.836H378.174H380.174V238.244V219.535C385.921 217.933 391.359 215.529 396.372 212.434L408.77 225.561L410.224 227.101L411.678 225.561L432.423 203.597L433.72 202.224L432.423 200.85L419.907 187.599C422.878 182.243 425.179 176.43 426.704 170.289H444.244H446.244V168.289V137.226V135.226H444.244H426.704C425.179 129.085 422.879 123.271 419.908 117.915L432.423 104.664L433.72 103.291L432.423 101.918L411.678 79.9532L410.224 78.4137L408.77 79.9532L396.372 93.0803C391.359 89.9857 385.92 87.5821 380.174 85.9791V67.2695V65.2695H378.174H348.836H346.836V67.2695V85.9779C341.09 87.5803 335.651 89.9847 330.638 93.0793L318.24 79.9521L316.786 78.4126L315.332 79.9521L294.587 101.917L293.29 103.29L294.587 104.663L307.103 117.914C304.132 123.271 301.831 129.084 300.305 135.226H282.766H280.766V137.226V168.289V170.289H282.766H300.306C301.831 176.429 304.132 182.243 307.103 187.599L294.587 200.85L293.29 202.224L294.587 203.597L315.332 225.561L316.786 227.101L318.24 225.561ZM363.506 118.744C381.05 118.744 395.518 133.895 395.518 152.756C395.518 171.617 381.049 186.768 363.506 186.768C345.961 186.768 331.493 171.617 331.493 152.756C331.493 133.895 345.961 118.744 363.506 118.744Z"
                fill="white"
                stroke="white"
                stroke-width="4"
            />
        </Svg>
    );
}

ITIcon.propTypes = { size: PropTypes.number };

export default ITIcon;
