import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles_preview from "../styles/styles-preview"

export default function Preview ({item, imageKey, active,}) {
    return (
        <TouchableOpacity
            style={styles_preview.videoContainer}
            onPress={() => console.log('PRESSED')}
        >
            <View>
                <Image
                    style={[styles_preview.videoPreview, active ? {height: 200, width: 350} : {height: 80}]}
                    source={{uri: item[imageKey]}}
                />
            </View>
            <Text numberOfLines={1} style={styles_preview.desc}>{item.dish_description}</Text>
        </TouchableOpacity>
    );
};
