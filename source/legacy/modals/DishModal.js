import { FlatList, View, Button } from "react-native";
import React from "react";
import DishForModal from "../components/DishForModal";
import Modal from "react-native-modal";
import all_constants from "../constants";

export default function DishModal({ ...props }) {
    return (
        <View>
            <Modal
                testID={"modal"}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
                isVisible={props.state}
            >
                <View style={{ flex: 1, backgroundColor: "white", padding: 10 }}>
                    <View style={{ flex: 1 }}>
                        <Button
                            title={all_constants.cart.button.close}
                            onPress={props.onPressCloseModal}
                        />
                    </View>

                    <View style={{ flex: 8 }}>
                        <FlatList
                            data={props.modal_data}
                            renderItem={({ item }) => (
                                <DishForModal
                                    key={item.dish
                                        ? item.dish.id
                                        : item.drink.id}
                                    photo={item.dish
                                        ? item.dish.photo
                                        : item.drink.photo}
                                    name={item.dish
                                        ? item.dish.name
                                        : item.drink.name}
                                    rating={
                                        item.dish
                                            ? item.dish.rating
                                            : item.drink.rating
                                                ? item.drink.rating
                                                : "-/-"
                                    }
                                    price={item.dish
                                        ? item.dish.price
                                        : item.drink.price}
                                    quantity={
                                        item.dish_quantity
                                            ? item.dish_quantity
                                            : item.drink_quantity
                                    }
                                />
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
