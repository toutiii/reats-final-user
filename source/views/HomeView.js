import React, {Component} from "react";
import {Text, View} from "react-native";
import all_constants from "../constants";
import {getNewDishesData} from "../api/fetch-home-data";
import {FlatListSlider} from "react-native-flatlist-slider";
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
            <View style={{flex: 1, marginTop: '15%'}}>
                <View style={{flex: 1}}>
                    <Text style={{marginLeft: '5%', fontSize: 22}}> {all_constants.home.news_feed_title.new} </Text>
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
                <View style={{flex: 1}}>
                    <Text style={{marginLeft: '5%', fontSize: 22}}> {all_constants.home.news_feed_title.top_rated} </Text>
                    {
                        this.state.listdata.length > 0 &&
                        <FlatListSlider
                            data={this.state.listdata}
                            timer={6000}
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
                <View style={{flex: 1}}>
                    <Text style={{marginLeft: '5%', fontSize: 22}}> {all_constants.home.news_feed_title.famous} </Text>
                    {
                        this.state.listdata.length > 0 &&
                        <FlatListSlider
                            data={this.state.listdata}
                            timer={7000}
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
            </View>
        )
    }
}
