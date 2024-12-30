/* eslint-disable max-len */
import { Dimensions } from "react-native";

let all_constants = {
    go_back: "Retour",
    merchantDisplayName: "Reats.",
    home: {
        news_feed_title: {
            new: "Nouveautés",
            famous: "Populaires",
        },
    },
    search: {
        alert: {
            title: "Erreur",
            missing_address_message:
        "Veuillez sélectionner une adresse de livraison.",
            missing_delivery_mode_message:
        "Veuillez sélectionner un mode de livraison.",
            warning_title: "ATTENTION",
            warning_message:
        "La commande chez plusieurs cuisiniers à la fois n'étant pas pris en charge, " +
        "la liste des résultats a été mise à jour pour vous proposer des plats préparés par" +
        "le même cuisinier.",
            delivery_mode_change_warning:
        "Le changement du mode de livraison entraînera la suppression de votre panier. Continuer ?",
            no_delivery_address_alert_message:
        "Pour vous proposer des plats, cette application a besoin que vous renseigniez au moins une adresse de livraison. \n\n" +
        "Appuyez sur OK pour ouvrir le menu principal. Vous pourrez ensuite le faire dans la section 'Mes adresses'.",
            no_delivery_address_set:
        "Attention aucune adresse de livraison ne semble avoir été configurée, appuyez ici.",
            delivery_address_change_warning:
        "Le changement de l'adresse de livraison entraînera la suppression de votre panier. Continuer ?",
            button: {
                label: {
                    yes: "OUI",
                    no: "NON",
                },
            },
        },
        placeholder: "Poulet Yassa",
        no_dishes_found: "Aucun résultat.",
        no_drinks_found: "Ce cuisinier ne propose pas de boissons pour l'instant.",
        no_desserts_found:
      "Ce cuisinier ne propose pas de desserts pour l'instant.",
        no_starters_found: "Ce cuisinier ne propose pas d'entrées pour l'instant.",
        no_addresses_found: "Vous n'avez renseigné aucune adresse de livraison.",
        button: {
            label: {
                search: "Chercher",
                add_to_cart: "AJOUTER AU PANIER",
                search_dishes: "RECHERCHER",
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
        address: {
            title: "Adresse de livraison",
            no_address: "Aucune adresse de livraison trouvée.",
            placeholder: "Veuillez choisir une adresse",
            search_placeholder: "Rechercher une adresse",
        },
        delivery_mode: {
            now: "Immédiat",
            scheduled: "Différé",
            delivery_mode_placeholder: "Veuillez choisir un un mode de livraison",
            original_now_name: "now",
            original_scheduled_name: "scheduled",
        },
    },
    pending_orders_view: {
        no_pending_orders: "Aucun résultat",
        stack_navigator: {
            order_item_detail: {
                title: "Retour",
            },
        },
        main_title: "Commandes",
        item_label: {
            dish: " plat",
            dishes: " plats",
            drink: " boisson",
            drinks: " boissons",
            total: "Total: ",
            ordered_at: "Commandé le ",
            pending: "En attente de validation",
            processing: "En cours de préparation",
            completed: "En attente de livraison",
        },
        button_label: {
            cancel_order: "ANNULER LA COMMANDE",
        },
        title: {
            pending: "En attente",
            processing: "Acceptée(s",
            completed: "Préparation terminée",
        },
        cancel: {
            title: "ANNULER LA COMMANDE ?",
            pending_message:
        "Attention cette action est définitive.\n\n" +
        "Vous serez remboursé uniquement du montant du panier ainsi que des frais de livraison.",
            message:
        "Attention cette action est définitive.\n\n" +
        "Vous pouvez annuler cette commande, mais celle-ci ayant déjà été acceptée par le cuisinier, vous ne serez pas remboursé.",
            success: {
                title: "COMMANDE ANNULÉE",
                message:
          "Votre commande a bien été annulée. \n\n" +
          "Si votre commande était éligible à un remboursement, celui-ci vous parviendra d'ici quelques jours.",
            },
            failure: {
                title: "ÉCHEC",
                message:
          "Impossible d'annuler la commande, veuiillez réessayer plus tard.",
            },
        },
    },
    cart: {
        empty_cart: "Votre panier est vide.",
        validate_cart: "VALIDER LE PANIER",
        drop_cart: "VIDER LE PANIER",
        go_to_cart_summary: "CONTINUER",
        label: {
            item_price: "Prix unitaire: ",
            quantity: "Qté: ",
            item_sub_amount: "Prix: ",
            remove_from_cart: "SUPPRIMER DU PANIER",
            paid: "RÉGLER MA COMMANDE",
        },
        alert: {
            title: "Attention",
            remove_item_from_cart_message: "Supprimer cet item du panier ?",
            drop_cart_message: "Tous les items seront supprimés du panier.",
            remove_item_with_additional_items_message:
        "L'ajout de desserts/boissons/entrées n'est possible que si vous commandez un plat. Si vous supprimez cet item, les éléments ci-après seront également supprimés du panier: ",
            not_editable_address_message:
        "Pour modifier l'adresse de livraison, veuillez revenir sur l'écran de recherche.",
            acceptance_rate: {
                title: "Information",
                message:
          "Ce chiffre représente le taux d'acceptation de ce cuisinier. \n\n" +
          "Plus il est élevé, plus il est probable que votre commande soit acceptée.",
            },
        },
        add_item_alert: {
            add_item_success_message: "L'item a bien été ajouté au panier.",
            add_item_success_message_advanced:
        "L'item a bien été ajouté au panier. \n \n" +
        "Notez que la liste des résultats sera filtrée pour vous proposer des plats préparés par le même cuisinier. \n \n" +
        "Pour supprimer ce filtre, il vous suffit de vider le panier et de lancer une nouvelle recherche.",
            add_item_error_message:
        "Échec, merci de rééssayer dans quelques instants.",
        },
        clear_cart_alert: {
            clear_cart_success_message: "Le panier a bien été vidé.",
            clear_cart_error_message:
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
            delivery_fees: "Frais de livraison",
            delivery_infos: "Informations de livraison",
            delivery_date: "Date",
            estimated_delivery_time: "Heure estimée de livraison",
            delivery_address: "Adresse",
        },
        title: {
            drinks: "Boissons",
            desserts: "Desserts",
            starter: "Entrées",
        },
        delivery: {
            title: "Informations de livraison",
            wrong_delivery_hours:
        "Veuillez sélectionner une heure de livraison entre 08:00 et 22:00.",
            missing_delivery_infos:
        "Veuillez renseigner toutes les informations de livraison.",
            past_time:
        "L'heure de livraison ne peut pas être antérieure ou égale à l'heure actuelle.",
            too_soon:
        "Une commande planifiée doit être passsée au plus tôt une heure à l'avance.",
        },
        button: {
            close: "FERMER",
        },
        asap: {
            title: "Livraison immédiate",
        },
        payment: {
            success_title: "Paiement réussi",
            success_message:
        "Vous recevrez une notification lorsque votre commande sera acceptée par le cuisinier. \n\n" +
        "Vous pouvez annuler cette commande, mais selon son statut il est possible que vous ne soyez pas remboursé.",
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
                    quantity: "Nombre d'item(s): ",
                    content: "Cette commande contient: ",
                    ordered_label: "le",
                    canceled_label: "Annulée le",
                    approved_label: "Commande acceptée le",
                    delivered_label: "Commande livrée le",
                    picking_label: "Ramassage prévu le",
                    price: "Prix à l'unité(€): ",
                    dish_total: "Total: ",
                    ordered: "Commandé le ",
                    item: "item(s)",
                },
                status: {
                    ordered: "Commandée",
                    canceled: "Annulée",
                    delivered: "Livrée",
                    pending: "En attente de prise en charge",
                    processed: "Acceptée",
                    cancelled_by_customer: "Annulée par le client ",
                    cancelled_by_cooker: "Annulée par le cuisinier ",
                    completed: "Prête pour livraison",
                },
                original_status: {
                    cancelled_by_customer: "cancelled_by_customer",
                    cancelled_by_cooker: "cancelled_by_cooker",
                    delivered: "delivered",
                    pending: "pending",
                    processed: "processing",
                    completed: "completed",
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
                delete_address: "SUPPRIMER CETTE ADRESSE",
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
        delete: "SUPPRIMER",
        signup: "CRÉER UN COMPTE",
        send: "ENVOYER",
        send_again: "JE N'AI PAS REÇU DE CODE",
        understood: "J'AI COMPRIS",
        quit: "QUITTER",
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
            message: "Quitter le formulaire et revenir en arrière ?",
            delete_account_title: "ATTENTION",
            delete_account_message:
        "Souhaitez vous vraiment supprimer votre compte ? Attention toutes vos données seront perdues.",
            delete_address_message: "Supprimer définitivement cette adresse ?",
            delete_address_title: "ATTENTION",
        },
        cancel_text: "ANNULER",
        delete_account: "SUPPRIMER",
        keep_account: "CONSERVER",
        sign_out_title: "DÉCONNEXION",
        sign_out_message: "Souhaitez-vous vous déconnecter ?",
        sign_out_confirm_text: "OUI",
        sign_out_cancel_text: "NON",
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
        close_filter_button_label: "Fermer",
        start_date: "Date de début",
        end_date: "Date de fin",
        cancel: "Annuler",
        dish_name_filter_placeholder: "Ex: Poulet Yassa",
        dish_name_filter_label: "Nom du plat",
        dish_country_filter_label: "Origine du plat",
        dish_country_filter_placeholder: "Ex: Choisissez un pays",
        dish_delivery_mode: "Plats livrables:",
        radion_button: {
            label: {
                now_delivery_mode: "Immédiatement",
                schedule_delivery_mode: "En différé",
            },
        },
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
