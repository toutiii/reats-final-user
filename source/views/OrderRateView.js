import React, { useState } from "react";
import { FlatList, View, TextInput, Text } from "react-native";
import RatingItem from "../components/RatingItem";
import { callBackEnd } from "../api/callBackend";
import { apiBaseUrl, port } from "../env";
import { getItemFromSecureStore } from "../helpers/common_helpers";
import { Rating } from "react-native-ratings";
import CustomButton from "../components/CustomButton";
import all_constants from "../constants";
import CustomAlert from "../components/CustomAlert";

export default function OrderRateView({ ...props }) {
    const data = props.route.params.data;
    const customerID = props.route.params.customerID;
    const orderID = props.route.params.orderID;
    const orderRate = props.route.params.orderRate;
    const orderComment = props.route.params.orderComment;
    const disableRating = props.route.params.disableRating;

    const [
        dishRatings,
        setDishRatings
    ] = useState({
        dishes_ids: [
        ],
        ratings: [
        ],
        comments: [
        ],
        customer_id: customerID,
    });

    const [
        drinkRatings,
        setDrinkRatings
    ] = useState({
        drink_ids: [
        ],
        ratings: [
        ],
        comments: [
        ],
        customer_id: customerID,
    });

    const [
        orderRating,
        setOrderRating
    ] = useState({
        rating: 0,
        comment: "",
        order_id: orderID,
    });

    const [
        showSuccessRatingMessageAlert,
        setShowSuccessRatingMessageAlert
    ] =
    useState(false);

    const [
        showFailureRatingMessageAlert,
        setShowFailureRatingMessageAlert
    ] =
    useState(false);

    const updateItemData = (item, type, key, value) => {
        const isDish = type === "dish";
        const targetRatings = isDish
            ? dishRatings
            : drinkRatings;
        const idKey = isDish
            ? "dishes_ids"
            : "drink_ids";
        const ratingsKey = "ratings";
        const commentsKey = "comments";
        const itemId = isDish
            ? item.dish.id
            : item.drink.id;

        const updatedRatings = { ...targetRatings };
        const index = updatedRatings[idKey]?.indexOf(itemId);

        if (index === -1 || index === undefined) {
            // Add new entry
            updatedRatings[idKey].push(itemId);
            updatedRatings[ratingsKey].push(key === "rating"
                ? value
                : null);
            updatedRatings[commentsKey].push(key === "comment"
                ? value
                : "");
        } else {
            // Update existing entry
            if (key === "rating") {
                updatedRatings[ratingsKey][index] = value;
            } else if (key === "comment") {
                updatedRatings[commentsKey][index] = value;
            }
        }

        if (isDish) {
            setDishRatings(updatedRatings);
        } else {
            setDrinkRatings(updatedRatings);
        }
    };

    async function submitDishRating() {
        const dishRatingPayload = {
            dishes_ids: dishRatings.dishes_ids,
            ratings: dishRatings.ratings,
            comments: dishRatings.comments,
            customer_id: dishRatings.customer_id,
        };

        const access = await getItemFromSecureStore("accessToken");
        const dishSubmitResult = await callBackEnd(
            dishRatingPayload,
            `${apiBaseUrl}:${port}/api/v1/customers-orders-dish-rating/`,
            "POST",
            access,
            false,
            null,
        );
        return dishSubmitResult;
    }

    async function submitDrinkRating() {
        const drinkRatingPayload = {
            drink_ids: drinkRatings.drink_ids,
            ratings: drinkRatings.ratings,
            comments: drinkRatings.comments,
            customer_id: drinkRatings.customer_id,
        };
        const access = await getItemFromSecureStore("accessToken");
        const drinkSubmitResult = await callBackEnd(
            drinkRatingPayload,
            `${apiBaseUrl}:${port}/api/v1/customers-orders-drink-rating/`,
            "POST",
            access,
            false,
            null,
        );
        return drinkSubmitResult;
    }

    async function submitOrderRating() {
        const orderRatingPayload = {
            rating: orderRating.rating,
            comment: orderRating.comment,
            order_id: orderRating.order_id,
        };
        const access = await getItemFromSecureStore("accessToken");
        const orderSubmitResult = await callBackEnd(
            orderRatingPayload,
            `${apiBaseUrl}:${port}/api/v1/customers-orders-rating/${orderID}/`,
            "PUT",
            access,
            false,
            null,
        );
        return orderSubmitResult;
    }

    async function submitRatings() {
        const dishSubmitResult = await submitDishRating();
        const drinkSubmitResult = await submitDrinkRating();
        const orderSubmitResult = await submitOrderRating();

        if (dishSubmitResult.ok && drinkSubmitResult.ok && orderSubmitResult.ok) {
            setShowSuccessRatingMessageAlert(true);
        } else {
            setShowFailureRatingMessageAlert(true);
        }
    }

    function extractRatingsFromItem(item) {
        let rating = 0;
        if (item.dish) {
            if (item.dish.ratings && item.dish.ratings.length == 1) {
                rating = item.dish.ratings[0].rating;
            }
        }
        if (item.drink) {
            if (item.drink.ratings && item.drink.ratings.length > 0) {
                rating = item.drink.ratings[0].rating;
            }
        }
        return rating;
    }

    function extractCommentsFromItem(item) {
        let comment = "";
        if (item.dish) {
            if (item.dish.ratings && item.dish.ratings.length > 0) {
                comment = item.dish.ratings[0].comment;
            }
        }
        if (item.drink) {
            if (item.drink.ratings && item.drink.ratings.length > 0) {
                comment = item.drink.ratings[0].comment;
            }
        }
        return comment;
    }

    function isItemSuitableForRating(item) {
        if (item.dish) {
            return item.dish.ratings && item.dish.ratings.length == 0;
        }
        if (item.drink) {
            return item.drink.ratings && item.drink.ratings.length == 0;
        }
    }

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
            }}
        >
            {showSuccessRatingMessageAlert && (
                <CustomAlert
                    show={showSuccessRatingMessageAlert}
                    title={all_constants.order_rate_view.alert.success.title}
                    message={all_constants.order_rate_view.alert.success.message}
                    confirmButtonColor={"green"}
                    onConfirmPressed={() => {
                        setShowSuccessRatingMessageAlert(false);
                        props.navigation.popToTop();
                    }}
                />
            )}
            {showFailureRatingMessageAlert && (
                <CustomAlert
                    show={showFailureRatingMessageAlert}
                    title={all_constants.order_rate_view.alert.failure.title}
                    message={all_constants.order_rate_view.alert.failure.message}
                    confirmButtonColor={"red"}
                    onConfirmPressed={() => {
                        setShowFailureRatingMessageAlert(false);
                    }}
                />
            )}
            <View style={{ flex: 1, margin: "3%" }}>
                <FlatList
                    data={data}
                    keyExtractor={(item) =>
                        (item.dish
                            ? item.dish.id.toString() + "dish"
                            : item.drink.id.toString() + "drink")
                    }
                    renderItem={({ item }) => (
                        <RatingItem
                            key={item.dish
                                ? item.dish.id
                                : item.drink.id}
                            photo={item.dish
                                ? item.dish.photo
                                : item.drink.photo}
                            name={item.dish
                                ? item.dish.name
                                : item.drink.name}
                            price={item.dish
                                ? item.dish.price
                                : item.drink.price}
                            quantity={item.dish_quantity || item.drink_quantity}
                            rating={
                                isItemSuitableForRating(item)
                                    ? (() => {
                                        // Fetch the current rating from the targetRatings
                                        const targetRatings = item.dish
                                            ? dishRatings
                                            : drinkRatings;
                                        const idKey = item.dish
                                            ? "dishes_ids"
                                            : "drink_ids";
                                        const ratingsKey = "ratings";
                                        const itemId = item.dish
                                            ? item.dish.id
                                            : item.drink.id;

                                        const index = targetRatings[idKey]?.indexOf(itemId);
                                        return index !== undefined && index !== -1
                                            ? targetRatings[ratingsKey][index]
                                            : 0; // Fallback to 0 if no rating is found
                                    })()
                                    : extractRatingsFromItem(item)
                            }
                            comment={
                                isItemSuitableForRating(item)
                                    ? (() => {
                                        // Fetch the current comment from the targetRatings
                                        const targetRatings = item.dish
                                            ? dishRatings
                                            : drinkRatings;
                                        const idKey = item.dish
                                            ? "dishes_ids"
                                            : "drink_ids";
                                        const commentsKey = "comments";
                                        const itemId = item.dish
                                            ? item.dish.id
                                            : item.drink.id;

                                        const index = targetRatings[idKey]?.indexOf(itemId);
                                        return index !== undefined && index !== -1
                                            ? targetRatings[commentsKey][index]
                                            : ""; // Fallback to an empty string if no comment is found
                                    })()
                                    : extractCommentsFromItem(item)
                            }
                            onRatingChange={(rating) =>
                                updateItemData(
                                    item,
                                    item.dish
                                        ? "dish"
                                        : "drink",
                                    "rating",
                                    rating,
                                )
                            }
                            onCommentChange={(comment) =>
                                updateItemData(
                                    item,
                                    item.dish
                                        ? "dish"
                                        : "drink",
                                    "comment",
                                    comment,
                                )
                            }
                            itemCanBeRated={isItemSuitableForRating(item)}
                        />
                    )}
                    ListFooterComponent={
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontSize: 16 }}>
                                    {all_constants.order_rate_view.label.global_order_rate}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    margin: "3%",
                                }}
                            >
                                <Rating
                                    imageSize={35}
                                    readonly={disableRating}
                                    onFinishRating={(rating) =>
                                        setOrderRating((prev) => ({ ...prev, rating: rating }))
                                    }
                                    startingValue={orderRate
                                        ? orderRate
                                        : 0}
                                />
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    borderBottomWidth: 1,
                                    borderLeftWidth: 1,
                                    margin: "3%",
                                }}
                            >
                                <TextInput
                                    placeholder={
                                        disableRating
                                            ? all_constants.order_rate_view.order.comment
                                                .disabled_rating_placeholder
                                            : all_constants.order_rate_view.order.comment
                                                .enabled_rating_placeholder
                                    }
                                    numberOfLines={5}
                                    value={orderComment
                                        ? orderComment
                                        : ""}
                                    onChangeText={(text) =>
                                        setOrderRating((prev) => ({ ...prev, comment: text }))
                                    }
                                    readOnly={disableRating}
                                />
                            </View>
                            {!disableRating && (
                                <View style={{ flex: 1, margin: "7%" }}>
                                    <CustomButton
                                        label={all_constants.modal.dish_modal.submit_rate}
                                        backgroundColor={"green"}
                                        label_color={"white"}
                                        height={50}
                                        border_width={3}
                                        border_radius={30}
                                        font_size={17}
                                        onPress={async () => {
                                            await submitRatings();
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    }
                />
            </View>
        </View>
    );
}
