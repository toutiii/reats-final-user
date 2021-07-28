import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import styles_preview from "../styles/styles-preview"
import styles_dish from "../styles/styles-dish";
import all_constants from "../constants";
import Dish from "./Dish";

export default function Preview ({item, imageKey, active}) {
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
            <Dish
                dish_name={item.dish_name}
                dish_category={item.dish_category}
                dish_rating={item.dish_rating}
                dish_price={item.dish_price + all_constants.currency_symbol}
                dish_description={item.dish_description}
                onPress={item.onPress}
            />
        </TouchableOpacity>
    );
};
