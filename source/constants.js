import { Dimensions } from "react-native";

let all_constants;
export default all_constants = {
    home: {
        news_feed_title: {
            new: 'Les nouveautés',
            top_rated: 'Les mieux notés',
            famous: 'Les plus commandés'
        }
    },
    search: {
        placeholder: 'Poulet Yassa',
        no_dishes_found: 'Aucun résultat.',
        button: {
            label: {
                search: "Chercher"
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
                add_to_basket_start: "Ajouter ",
                add_to_basket_end: " dans le panier",
                add_to_basket_default: "Ajouter 1 dans le panier",
                delete_from_basket: 'Supprimer',
            },
            delivery: {
                delivery_circa: ' vers ',
                delivery_day: 'Livraison',
                delivery_hour: 'Heure de livraison',
                delivery_info: 'Informations de livraison',
                dish_origin: 'Origine du plat',
            }
        },
    },
    currency_symbol: ' €',
    rating_star: 'https://starpng.com/public/uploads/preview/yellow-star-transparent-background-png-101577029288c5hv8odvjm.png',
    colors: {
        inputBorderColor: '#ffd700',
    },
    flatlist_slider_width: Dimensions.get('screen').width,
    screen: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    french_date_format: "EEEE dd MMMM yyyy",
    french_hour_format: "HH:mm"
}
