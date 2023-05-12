import React from 'react';
import { Image, Text, View } from "react-native";
import all_constants from "../constants";
import { getDeliveryDateInfo } from "../helpers/toolbox";
import HorizontalLine from '../components/HorizontalLine';
import CustomButton from "../components/CustomButton";


export default function OrderDetailView({ ...props }) {

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Image
                    source={{ uri: props.route.params.item.photo }}
                    style={{ aspectRatio: 16 / 9, width: '100%' }}
                />
            </View>

            <View style={{ flex: 2, alignItems: 'center', backgroundColor: 'white' }}>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text numberOfLines={3} style={{ fontSize: 20, textAlign: 'center' }}>
                        {props.route.params.item.dish_name}
                    </Text>
                </View>

                <View style={{ width: '60%' }}>
                    <HorizontalLine
                        line_color='tomato'
                    />
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontStyle: 'italic', fontSize: 18 }}>
                        {props.route.params.item.number_of_dishes}
                        {
                            props.route.params.item.number_of_dishes > 1 ?
                                all_constants.pending_orders_view.item_label.dishes
                                : all_constants.pending_orders_view.item_label.dish
                        }{' '}
                        {all_constants.pending_orders_view.item_label.cooking.toLocaleLowerCase()}
                    </Text>
                </View>

                <View style={{ width: '60%' }}>
                    <HorizontalLine
                        line_color='tomato'
                    />
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>
                        {all_constants.pending_orders_view.item_label.ordered_at}
                        {
                            getDeliveryDateInfo(new Date(props.route.params.item.dish_order_datetime),
                                all_constants.short_french_date_format)
                        }
                        {all_constants.at}
                        {
                            getDeliveryDateInfo(new Date(props.route.params.item.dish_order_datetime),
                                all_constants.french_hour_format)
                        }
                    </Text>
                </View>

                <View style={{ width: '60%' }}>
                    <HorizontalLine
                        line_color='tomato'
                    />
                </View>

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: 18 }}>
                        {all_constants.pending_orders_view.item_label.total}
                        {props.route.params.item.dish_price * props.route.params.item.number_of_dishes}
                        {all_constants.currency_symbol}
                    </Text>
                </View>

                {
                    !props.route.params.item.is_order_deleted && (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', bottom: '2%' }}>
                            <CustomButton
                                label={all_constants.pending_orders_view.button_label.cancel_order}
                                height={50}
                                border_width={3}
                                border_radius={30}
                                font_size={17}
                                backgroundColor={'red'}
                                label_color={'white'}
                                button_width={all_constants.screen.width - 40}
                                onPress={() => {
                                    console.log('PRESSED')
                                }}
                            />
                        </View>)
                        
                        
                }


            </View>

        </View>
    )
}
