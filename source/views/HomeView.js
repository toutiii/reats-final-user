import React, {Component} from "react";
import {View} from "react-native";
import all_constants from "../constants";
import HorizontalLine from "../components/HorizontalLine";
import Dish from "../components/Dish";
import {getNewDishesData} from "../api/fetch-home-data";
import {FlatListSlider} from "react-native-flatlist-slider";
import DishItem from "../components/DishItem";
import Preview from "../components/Preview";


export default class HomeView extends Component {

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
                {
                    this.state.listdata.length > 0 &&
                    <FlatListSlider
                        data={this.state.listdata}
                        timer={5000}
                        component={<Preview/>}
                        indicatorActiveWidth={20}
                        imageKey={'photo'}
                        contentContainerStyle={{paddingHorizontal: 16}}
                        width={all_constants.flatlist_slider_width}
                        autoscroll={true}
                        loop={false}
                        animation={true}
                    />
                }
            </View>
        )
    }
}
