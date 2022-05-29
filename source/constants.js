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
    search:{
        placeholder: 'Poulet Yassa',
        no_dishes_found: 'Aucun résultat.',
        button:{
            label:{
                search: "J'ai faim"
            }
        },
        custom_alert: {
            empty_search_value: {
                title: 'Recherche vide',
                message: "Pas de nom de plat ?"
            }
        },
        stack_navigator: {
            search_item_detail: {
                title: 'Retour'
            }
        },
        search_item_detail_view: {
            button: {
                add_to_basket: 'Commander',
                delete_from_basket: 'Supprimer'
            }
        },
    },
    currency_symbol: '€',
    rating_star: 'https://starpng.com/public/uploads/preview/yellow-star-transparent-background-png-101577029288c5hv8odvjm.png',
    colors: {
        inputBorderColor: '#ffd700',
    },
    flatlist_slider_width: Dimensions.get('screen').width,
    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
}
