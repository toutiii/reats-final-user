import React, {Component} from "react";
import {FlatList, RefreshControl, TouchableHighlight, View} from "react-native";
import styles_dish from '../styles/styles-dish'
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import Dish from "../components/Dish";
import {getNewDishesData} from "../api/fetch-home-data";


export default class NewDishesFlatList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            listdata: []
        }
    }

    onRefresh = (async () => {
        this.setState({refreshing: true});
        this.fetchData()
        this.setState({refreshing: false});
    });

    dishItem = ({item}) => {
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

    componentDidMount() {
        this.fetchData();
    }

    fetchData(){
        let newData = getNewDishesData();
        newData.then((results) => {
            this.setState({listdata: this.state.listdata.concat(results)})
        })
    }
    render() {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.listdata}
                    renderItem={this.dishItem}
                    keyExtractor={item => item.id}
                    onEndReached={getNewDishesData}
                    onEndReachedThreshold={0.8}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                    }
                />
            </View>
        )
    }
}
