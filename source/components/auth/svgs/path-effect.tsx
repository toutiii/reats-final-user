import { FC } from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const PathEffect: FC<SvgProps> = (props) => {
    return (
        <Svg width="100%" height="100%" viewBox="0 0 601 498" fill="none" {...props}>
            <Path
                stroke="#FF7622"
                strokeDasharray="8 8"
                strokeLinecap="round"
                strokeWidth="3"
                d="m556 52-83.725 28.78a15 15 0 0 0-9.862 16.974l2.183 11.539a15.001 15.001 0 0 1-9.811 16.956l-31.33 10.897c-11.105 3.863-13.651 18.419-4.516 25.822l87.084 70.568a15 15 0 0 1 4.838 16.24l-29.37 91.465a15.004 15.004 0 0 0 2.662 14.072L599 496"
            />
        </Svg>
    );
};

export default PathEffect;
