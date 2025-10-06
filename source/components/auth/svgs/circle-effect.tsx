import { FC } from "react";
import Svg, { Circle, SvgProps } from "react-native-svg";

const CircleEffect: FC<SvgProps> = (props) => {
    return (
        <Svg width="100%" height="100%" viewBox="0 0 601 498" fill="none" {...props}>
            <Circle cx="100.5" cy="135.5" r="88.5" stroke="#FF7622" strokeDasharray="4 4" strokeWidth="94" />
        </Svg>
    );
};

export default CircleEffect;
