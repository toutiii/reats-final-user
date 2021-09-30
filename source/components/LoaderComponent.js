import React from 'react';
import { Rect } from "react-native-svg";
import ContentLoader from 'rn-content-loader';
import {View} from "react-native";

const LoaderComponent = props => (
    <View style={{marginTop: '15%'}}>
        <ContentLoader height={300}>
            <Rect x="0" y="13" rx="4" ry="4" width="450" height="150" />
            <Rect x="200" y="190" rx="4" ry="4" width="100" height="13" />
            <Rect x="0" y="220" rx="4" ry="4" width="200" height="20" />
            <Rect x="200" y="260" rx="4" ry="4" width="100" height="13" />
        </ContentLoader>
    </View>
)

export default LoaderComponent;
