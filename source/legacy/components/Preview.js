import React from "react";
import { Image, TouchableHighlight, View } from "react-native";
import styles_preview from "../styles/styles-preview";
import all_constants from "../constants";
import Dish from "./Dish";

export default function Preview({ item, imageKey, active }) {
    return (
        <View style={styles_preview.videoContainer}>
            <View>
                <Image
                    style={[
                        styles_preview.videoPreview,
                        active
                            ? { height: 200, width: 350 }
                            : { height: 80 },
                    ]}
                    source={{ uri: item[imageKey] }}
                />
            </View>
            <TouchableHighlight
                underlayColor={all_constants.colors.inputBorderColor}
                style={{ flex: 1 }}
                onPress={() => {
                    console.log("PRESSED");
                }}
            >
                <Dish
                    dish_name={item.dish_name}
                    dish_category={item.dish_category}
                    dish_rating={item.dish_rating}
                    dish_price={item.dish_price + all_constants.currency_symbol}
                    dish_description={item.dish_description}
                    onPress={item.onPress}
                />
            </TouchableHighlight>
        </View>
    );
}
