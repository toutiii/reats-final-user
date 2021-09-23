import React, {Component} from "react";
import {ActivityIndicator, Animated, ScrollView, Text, View} from "react-native";
import all_constants from "../constants";
import {getNewDishesData} from "../api/fetch-home-data";
import {FlatListSlider} from "react-native-flatlist-slider";
import Preview from "../components/Preview";
import { SafeAreaView } from 'react-native-safe-area-context';


export default class HomeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false,
            listdata: [],
            isFetching: false,
            opacity: new Animated.Value(1)
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.setState({isFetching: true});
        let newData = getNewDishesData();
        newData.then(results => {
            this.setState({
                listdata: results,
                isFetching: false
            })
        })
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <ScrollView style={{flex: 1, marginTop: '10%'}}>
                    <Text style={{marginLeft: '3%', fontSize: 22}}>
                        {all_constants.home.news_feed_title.new}
                    </Text>
                    {
                        this.state.isFetching?
                            <View style={{flex: 1}}>
                                <ActivityIndicator size="large" color="tomato" />
                            </View>
                        :
                            <View style={{flex: 1}}>
                                {
                                    this.state.listdata.length > 0 &&
                                    <FlatListSlider
                                        data={this.state.listdata}
                                        timer={7000}
                                        component={<Preview/>}
                                        indicatorActiveWidth={20}
                                        imageKey={'photo'}
                                        contentContainerStyle={{marginTop: '5%'}}
                                        width={all_constants.flatlist_slider_width}
                                        autoscroll={true}
                                        loop={false}
                                        animation={true}
                                    />
                                }
                            </View>
                    }
                    <View style={{flex: 1, marginTop: '3%'}}>
                        <Text style={{marginLeft: '3%', fontSize: 22}}>
                            {all_constants.home.news_feed_title.top_rated}
                        </Text>
                        {
                            this.state.isFetching?
                                <View style={{flex: 1}}>
                                    <ActivityIndicator size="large" color="tomato" />
                                </View>
                                :
                                <View style={{flex: 1}}>
                                    {
                                        this.state.listdata.length > 0 &&
                                        <FlatListSlider
                                            data={this.state.listdata}
                                            timer={7000}
                                            component={<Preview/>}
                                            indicatorActiveWidth={20}
                                            imageKey={'photo'}
                                            contentContainerStyle={{marginTop: '5%'}}
                                            width={all_constants.flatlist_slider_width}
                                            autoscroll={true}
                                            loop={false}
                                            animation={true}
                                        />
                                    }
                                </View>
                        }
                    </View>
                    <View style={{flex: 1, marginTop: '5%'}}>
                        <Text style={{marginLeft: '3%', fontSize: 22}}>
                            {all_constants.home.news_feed_title.famous}
                        </Text>
                        {
                            this.state.isFetching?
                                <View style={{flex: 1}}>
                                    <ActivityIndicator size="large" color="tomato" />
                                </View>
                                :
                                <View style={{flex: 1}}>
                                    {
                                        this.state.listdata.length > 0 &&
                                        <FlatListSlider
                                            data={this.state.listdata}
                                            timer={7000}
                                            component={<Preview/>}
                                            indicatorActiveWidth={20}
                                            imageKey={'photo'}
                                            contentContainerStyle={{marginTop: '5%'}}
                                            width={all_constants.flatlist_slider_width}
                                            autoscroll={true}
                                            loop={false}
                                            animation={true}
                                        />
                                    }
                                </View>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}
