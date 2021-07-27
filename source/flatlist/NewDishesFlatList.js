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
