import {StyleSheet} from "react-native";
import React from "react";

let styles_dish;
export default styles_dish = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    dish_button_container: {
        flex: 1,
        aspectRatio: 16/9,
        alignItems: 'center',
        marginTop: '15%',
        width: '100%'
    },
    images: {
        flex: 1,
    },
    dish_infos:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    dish_price:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    dish_name:{
        flex: 1,
        justifyContent: 'flex-end',
    },
    dish_rating: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
    },
    rating_star:{
        width: 20,
        height: 20,
    },
})
