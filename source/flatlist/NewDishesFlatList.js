import React from "react";
import {FlatList, RefreshControl, TouchableHighlight, View} from "react-native";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import Dish from "../components/Dish";
import {getNewDishesData} from "../api/fetch-home-data";


export default function NewDishesFlatList({...props}) {

    const [refreshing, setRefreshing] = React.useState(false);
    const [listData, setListData] = React.useState([]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        setListData(await getNewDishesData());
        setRefreshing(false);
    }, [refreshing]);

    const dishItem = ({item}) => {
        return (
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
        );
    }

    React.useEffect(() => {
        async function fetchMyAPI() {
            setListData(await getNewDishesData());
        }
        fetchMyAPI()
    }, [])

    return (
        <View style={{flex: 1}}>
            <FlatList
                data={listData}
                renderItem={dishItem}
                keyExtractor={item => item.id}
                onEndReached={getNewDishesData}
                onEndReachedThreshold={0.8}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            />
        </View>
    )
}
