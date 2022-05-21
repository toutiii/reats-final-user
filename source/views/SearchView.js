import React, { useState } from 'react';
import {Animated, SafeAreaView, StatusBar, TextInput, TouchableHighlight, View} from 'react-native';
import LoaderComponent from "../components/LoaderComponent";
import CustomButton from "../components/CustomButton";
import all_constants from "../constants";
import styles_search_view from "../styles/styles-search-view";
import {getNewDishesData} from "../api/fetch-home-data";
import styles_dish from "../styles/styles-dish";
import Dish from "../components/Dish";
import HorizontalLine from "../components/HorizontalLine";
import CustomAlert from "../components/CustomAlert";



export default function SearchView () {
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [scrollYValue, setScrollYValue] = useState(new Animated.Value(0));
    const [isSearching, setIsSearching] = useState(false);
    const [data, setData] = useState([]);
    const [makeRequest, setMakeRequest] = useState(false);
    const [meal_wanted, setMealWanted] = useState('')
    const [showAlert, setStateShowAlert] = useState(false);
    const clampedScroll = Animated.diffClamp(
        Animated.add(
            scrollYValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
                extrapolateLeft: 'clamp',
            }),
            new Animated.Value(0),
        ),
        0,
        50,
    )
    const searchBarTranslate = clampedScroll.interpolate({
        inputRange: [0, 50],
        outputRange: [0, -(250)],
        extrapolate: 'clamp',
    });
    const searchBarOpacity = clampedScroll.interpolate({
        inputRange: [0, 10],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
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
        <Animated.View>
            <StatusBar barStyle="light-content" />
            <SafeAreaView>
                <Animated.View style={[
                    styles_search_view.container,
                    {
                        transform: [
                            {
                                translateY: searchBarTranslate
                            }
                        ],
                        opacity: searchBarOpacity,
                    }
                ]}>
                    <TextInput
                        placeholder={all_constants.search.placeholder}
                        style={styles_search_view.formField}
                        placeholderTextColor={'#888888'}
                        onChangeText={(value) => setMealWanted(value)}
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
                </Animated.View>
                <Animated.ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        backgroundColor: 'white',
                        paddingTop: '10%'
                    }}
                    contentContainerStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        marginTop: 50,
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollYValue } } }],
                        { useNativeDriver: false },
                    )}
                    contentInsetAdjustmentBehavior="automatic"
                >
                    {isSearching && loaderComponent}
                    {!isSearching && makeRequest && (
                        <View style={{flex: 1}}>
                            {
                                data.map((dishObject) => {
                                    return(
                                        <View key={dishObject.id} style={styles_dish.dish_button_container}>
                                            <Dish
                                                dish_photo={dishObject.photo}
                                                dish_name={dishObject.dish_name}
                                                dish_category={dishObject.dish_category}
                                                dish_rating={dishObject.dish_rating}
                                                dish_price={dishObject.dish_price + all_constants.currency_symbol}
                                                dish_description={dishObject.dish_description}
                                            />
                                            <HorizontalLine/>
                                        </View>
                                    )})}
                        </View>
                    )}
                </Animated.ScrollView>
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
            </SafeAreaView>
        </Animated.View>
    );
};
