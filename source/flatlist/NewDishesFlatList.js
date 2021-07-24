import React from "react";
import {FlatList, Text, TouchableHighlight, View} from "react-native";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import Dish from "../components/Dish";
import {getNewDishesData} from "../api/fetch-home-data";


export default function NewDishesFlatList({...props}) {
    return (
        <View style={{flex: 1}}>
            <FlatList
                data={getNewDishesData()}
                ListFooterComponent={<View></View>}
                ListFooterComponentStyle={{borderWidth: 5, borderColor: 'red', borderRadius: 50}}
                ListEmptyComponent={
                    <View style={{flex: 1, alignItems: 'center'}}><Text style={{fontSize: 20}}>TEST</Text></View>
                }
                renderItem={({item}) => (
                    <View style={styles_dish.dish_button_container}>
                        <TouchableHighlight
                            onPress={() => {console.log('PRESSED!')}}
                            style={{flex: 1}}
                            underlayColor={all_constants.colors.inputBorderColor}
                        >
                            <Dish
                                key={item.id}
                                dish_photo={item.photo}
                                dish_name={item.dish_name}
                                dish_category={item.dish_category}
                                dish_rating={item.dish_rating}
                                dish_price={item.dish_price + all_constants.currency_symbol}
                                dish_description={item.dish_description}
                                onPress={item.onPress}
                            />
                        </TouchableHighlight>
                        <HorizontalLine/>
                    </View>
                )}
            />
        </View>
    )
}
