/* eslint-disable max-len */
import { Dimensions } from "react-native";

let all_constants = {
    home: {
        news_feed_title: {
            new: "Nouveautés",
            famous: "Populaires",
        },
    },
    search: {
        placeholder: "Poulet Yassa",
        no_dishes_found: "Aucun résultat.",

        no_addresses_found: "Vous n'avez renseigné aucune adresse de livraison.",
        button: {
            label: {
                search: "Chercher",
                add_to_cart: "AJOUTER AU PANIER",
            },
        },
        custom_alert: {
            empty_search_value: {
                title: "Recherche vide",
                message: "Pas de nom de plat ?",
            },
        },
        stack_navigator: {
            search_item_detail: {
                title: "Retour",
            },
        },
        search_item_detail_view: {
            button: {
                add_to_basket_start: "Ajouter ",
                add_to_basket_end: " dans le panier",
                add_to_basket_default: "Ajouter 1 dans le panier",
                delete_from_basket: "Supprimer",
            },
        },
    },
    pending_orders_view: {
        no_pending_orders: "Vous n'avez pas de commande en attente.",
        stack_navigator: {
            order_item_detail: {
                title: "Retour",
            },
        },
        main_title: "Commandes en cours",
        item_label: {
            dish: " plat",
            dishes: " plats",
            total: "Total: ",
            ordered_at: "Commandé le: ",
            cooking: "En cours de préparation",
        },
        button_label: {
            cancel_order: "ANNULER LA COMMANDE",
        },
    },
    cart: {
        empty_cart: "Votre panier est vide.",
        validate_cart: "VALIDER LE PANIER",
        drop_cart: "VIDER LE PANIER",
        label: {
            item_price: "Prix unitaire: ",
            quantity: "Qté: ",
            item_sub_amount: "Prix: ",
            remove_from_cart: "SUPPRIMER DU PANIER",
            paid: "PAYER",
        },
        alert: {
            title: "Attention",
            remove_item_from_cart_message: "Supprimer cet item du panier ?",
            drop_cart_message: "Tous les items seront supprimés du panier.",
        },
        add_item_alert: {
            add_item_success_message: "L'item a bien été ajouté au panier.",
            add_item_error_message:
        "Échec, merci de rééssayer dans quelques instants.",
        },
        remove_item_alert: {
            remove_item_success_message: "L'item a bien été retiré du panier.",
            remove_item_error_message:
        "Échec, merci de rééssayer dans quelques instants.",
        },
        summary: {
            title: "Récapitulatif",
            sub_amount: "Sous-total",
            service_fees: "Frais de service",
            total_amount: "Total à payer",
        },
    },
    currency_symbol: " €",
    rating_star:
    "https://starpng.com/public/uploads/preview/yellow-star-transparent-background-png-101577029288c5hv8odvjm.png",
    colors: {
        inputBorderColor: "#ffd700",
    },
    flatlist_slider_width: Dimensions.get("screen").width,
    screen: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },
    french_date_format: "EEEE dd MMMM yyyy",
    french_hour_format: "HH:mm",
    short_french_date_format: "dd/MM/yyyy",
    at: " à ",
    drawercontent: {
        logout: "Déconnexion",
        hello: "Bonjour ",
        settings: "Mes paramètres",
        drawer_item: {
            label: {
                account: "Compte",
                connection: "Connexion",
                localization: "Mes adresses",
                wallet: "Portefeuille",
                history: "Mes commandes",
            },
            orders_history: {
                title: "Mes anciennes commandes",
                no_results: "Aucune commande trouvée.",
                infos: {
                    number: "Commande N°",
                    status: "Statut:",
                    owner: "Passée par",
                    amount: "Total de la commande: ",
                    dish_quantity: "Nombre de plats: ",
                    content: "Cette commande contient: ",
                    ordered_label: "le",
                    canceled_label: "Annulée le",
                    approved_label: "Commande acceptée le",
                    delivered_label: "Commande livrée le",
                    picking_label: "Ramassage prévu le",
                    dish_unit_price: "Prix unitaire: ",
                    dish_total: "Total: ",
                    ordered: "Commandé le ",
                },
                status: {
                    canceled: "Annulée",
                    delivered: "Livrée",
                    pending: "En attente de prise en charge",
                    approved: "Acceptée",
                },
            },
        },
        button: {
            labels: {
                add_address: "AJOUTER UNE ADRESSE",
                delete_address: "SUPPRIMER CETTE ADRESSE",
            },
        },
        form: {
            title: "ATTENTION",
            messages: {
                remove_address_warning: "Supprimer définitivement cette adresse ?",
            },
        },
    },
    tab: {
        main_tab_navigator: {
            home: "Accueil",
            order: "Commander",
            pending: "En attente",
            cart: "Mon panier",
        },
    },
    uri: {
        api: {
            mock: "https://postman-echo.com/post",
        },
    },
    field_type: {
        textinput: "textinput",
        image: "image",
        textarea: "textarea",
        select: "select",
        select_picker: "select_picker",
        date_picker: "date_picker",
    },
    label: {
        form: {
            settings: {
                firstname: "Prénom",
                lastname: "Nom",
                phone: "Numéro de téléphone",
                phone_confirmation: "Confirmation téléphone",
                street_number: "Numéro",
                street_name: "Rue",
                address_complement: "Complément d'adresse",
                postal_code: "Code postal",
                town: "Ville",
                image: "Photo de profil",
                delete_account: "SUPPRIMER MON COMPTE",
            },
        },
    },
    modal: {
        dish_modal: {
            hide: "FERMER",
            show: "AFFICHER LES PLATS",
        },
    },
    placeholders: {
        form: {
            settings: {
                street_number: "Numéro de rue",
                street_name: "Ex: rue René Cassin",
                address_complement: "Complément d'adresse",
                postal_code: "Votre code postal",
                town: "Votre ville",
                firstname: "Votre prénom",
                lastname: "Votre nom de famille",
                phone: "Votre numéro de téléphone",
            },
        },
    },
    messages: {
        failed: {
            title: "Échec",
        },
        clear: "EFFACER",
        submit: "VALIDER",
        cancel: "ANNULER",
        signup: "CRÉER UN COMPTE",
        send: "ENVOYER",
        send_again: "JE N'AI PAS REÇU DE CODE",
        errors: {
            title: "Erreur",
        },
        otp: {
            title: {
                send_again_title: "Nouvelle demande",
            },
            message: {
                send_again_message:
          "Un nouveau code vous sera envoyé par SMS dans quelques instants.",
                invalid_code:
          "Code invalide. Veuillez réessayer ou en demander un nouveau.",
            },
        },
        success: {
            title: "Succès",
            login_message: "Connexion réussie",
            signup_message:
        "Vous pouvez désormais vous connecter avec votre numéro de téléphone.",
            otp_message_signup:
        "Vous allez recevoir dans quelques instants un code par SMS que vous devrez renseigner dans le prochain écran.",
            otp_message_login:
        "Si vous avez déjà créé un compte, un code de connexion vous sera envoyé par SMS dans quelques instants.",
        },
    },
    custom_alert: {
        form: {
            title: "ATTENTION",
            message: "Quitter le formulaire et revenir en arrière ?.",
            delete_account_title: "ATTENTION SUPPRESSION DU COMPTE !",
            delete_account_message:
        "Souhaitez vous vraiment supprimer votre compte ? Attention toutes vos données seront perdues.",
        },
        cancel_text: "ANNULER",
        delete_account: "SUPPRIMER",
        keep_account: "CONSERVER",
    },
    validators: {
        max_text_length: 30,
        max_description_length: 200,
        global: {
            field: "Le champ ",
            is_empty: " est vide.",
            invalid_char: " est invalide. Veuillez enlever le ",
            invalid_price: " est invalide. Exemple: 13.90",
            invalid_postal_code: " est invalide. Exemple: 91100.",
            phone_mismatch:
        "Les deux numéros de téléphone saisis doivent être identiques.",
        },

        includes: {
            phone: "téléphone",
        },

        settings: {
            char: " caractères.",
            phone_format_error: " doit contenir exactement 10 chiffres sans espace.",
        },
    },
    search_modal: {
        alert: {
            date: {
                title: "Erreur",
                message:
          "La date de fin ne peut pas être antérieure à la date de début.",
            },
        },
        dish_categories: "Le type de plat",
        dish_results_sort: "Filtrer par",
        default_button_label: "OK",
        search_button_label: "Filtrer",
        clear_filter_button_label: "Réinitialiser",
        start_date: "Date de début",
        end_date: "Date de fin",
    },
    search_bar: {
        placeholder: "Écrivez pour lancer la recherche",
    },
    max_length: {
        form: {
            siret: 14,
            firstname: 50,
            lastname: 50,
            phone: 10,
            street_number: 20,
            street_name: 100,
            address_complement: 100,
            postal_code: 5,
            town: 100,
        },
    },
};

export default all_constants;
