import React, { useState } from 'react';
import {Animated, StatusBar, TextInput, TouchableHighlight, View} from 'react-native';
import LoaderComponent from "../components/LoaderComponent";
import CustomButton from "../components/CustomButton";
import all_constants from "../constants";
import styles_search_view from "../styles/styles-search-view";
import {getNewDishesData} from "../api/fetch-home-data";
import styles_dish from "../styles/styles-dish";
import Dish from "../components/Dish";
import HorizontalLine from "../components/HorizontalLine";
import CustomAlert from "../components/CustomAlert";



export default function SearchView ({...props}) {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [isSearching, setIsSearching] = useState(false);
    const [data, setData] = useState([]);
    const [makeRequest, setMakeRequest] = useState(false);
    const [meal_wanted, setMealWanted] = useState('')
    const [showAlert, setStateShowAlert] = useState(false);

    var loaderComponent = array.map(
        (item, index) => {
            return (
                <View key={index}>
                    <LoaderComponent />
                </View>)
        }
    )

    const fetchData = () => {
        if (meal_wanted === '') {
            setStateShowAlert(true)
        }
        else {
            setMakeRequest(true);
            setIsSearching(true);
            let newData = getNewDishesData();
            newData.then(results => {
                setData(results);
                setIsSearching(false);
            })
        }
    }

    return (
        <Animated.View style={{backgroundColor: 'white', flex: 1}}>
            <StatusBar barStyle="light-content" />
            <View style={{marginTop: '5%', alignItems: 'center', flex: 1}}>
                <TextInput
                    placeholder={all_constants.search.placeholder}
                    style={styles_search_view.formField}
                    placeholderTextColor={'#888888'}
                    onChangeText={(value) => setMealWanted(value)}
                    width={all_constants.screen.width - 40}
                />
                <View style={{top:10}}>
                    <CustomButton
                        label={all_constants.search.button.label.search}
                        height={50}
                        border_width={3}
                        border_radius={30}
                        font_size={17}
                        backgroundColor={'tomato'}
                        label_color={'white'}
                        button_width={all_constants.screen.width - 40}
                        onPress={fetchData}
                    />
                </View>
            </View>
            <Animated.View style={{flex: 5}}>
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                    }}
                    contentInsetAdjustmentBehavior="automatic"
                >
                    {isSearching && loaderComponent}
                    {!isSearching && makeRequest && (
                        <View style={{flex: 1}}>
                            {
                                data.map((dishObject) => {
                                    return(
                                        <TouchableHighlight
                                            key={dishObject.id}
                                            style={styles_dish.dish_button_container}
                                            onPress={() => {props.navigation.navigate('SearchItemDetail', { item: dishObject });}}
                                            underlayColor={all_constants.colors.inputBorderColor}
                                        >
                                            <View>
                                                <Dish
                                                    dish_photo={dishObject.photo}
                                                    dish_name={dishObject.dish_name}
                                                    dish_category={dishObject.dish_category}
                                                    dish_rating={dishObject.dish_rating}
                                                    dish_price={dishObject.dish_price + all_constants.currency_symbol}
                                                    dish_description={dishObject.dish_description}
                                                />

                                            </View>
                                        </TouchableHighlight>
                                    )})}
                        </View>
                    )}
                </Animated.ScrollView>
            </Animated.View>
            {
                showAlert && (
                    <CustomAlert
                        show={showAlert}
                        title={all_constants.search.custom_alert.empty_search_value.title}
                        message={all_constants.search.custom_alert.empty_search_value.message}
                        confirmButtonColor='red'
                        onConfirmPressed={() => {
                            setStateShowAlert(false);
                        }}
                    />
                )
            }
        </Animated.View>
    );
};
