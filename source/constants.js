import {Dimensions} from "react-native";

let all_constants;
export default all_constants = {
    home:{
        news_feed_title:{
            new: 'Les nouveautés',
            top_rated: 'Les mieux notés',
            famous: 'Les plus commandés'
        }
    },
    currency_symbol: '€',
    rating_star: 'https://starpng.com/public/uploads/preview/yellow-star-transparent-background-png-101577029288c5hv8odvjm.png',
    colors: {
        inputBorderColor: '#ffd700',
    },
    flatlist_slider_width: Dimensions.get('screen').width
}
