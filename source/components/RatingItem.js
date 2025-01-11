import React, { useState } from "react";
import { Image, View, TextInput } from "react-native";
import { Rating } from "react-native-ratings";
import all_constants from "../constants";

export default function RatingItem({ ...props }) {
    const [
        localComment,
        setLocalComment
    ] = useState(props.comment || "");

    return (
        <View style={{ flex: 1, margin: "8%", backgroundColor: "white" }}>
            {/* Image Section */}
            <View style={{ flex: 2 }}>
                <Image
                    source={{ uri: props.photo }}
                    style={{ flex: 1, aspectRatio: 2 }}
                />
            </View>

            {/* Rating Section */}
            <View style={{ flex: 1, margin: "3%" }}>
                <Rating
                    onFinishRating={props.onRatingChange}
                    readonly={!props.itemCanBeRated}
                    imageSize={35}
                    startingValue={props.rating || 0}
                />
            </View>

            {/* Comment Section */}
            <View
                style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderLeftWidth: 1,
                    margin: "3%",
                }}
            >
                <TextInput
                    value={localComment}
                    onChangeText={(text) => {
                        setLocalComment(text); // Update local state
                        props.onCommentChange(text); // Call parent's handler
                    }}
                    numberOfLines={5}
                    placeholder={
                        props.itemCanBeRated
                            ? all_constants.order_rate_view.item.comment
                                .enabled_rating_placeholder
                            : all_constants.order_rate_view.item.comment
                                .disabled_rating_placeholder
                    }
                    editable={props.itemCanBeRated}
                />
            </View>
        </View>
    );
}
