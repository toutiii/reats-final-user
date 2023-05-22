import { Dimensions } from "react-native";

let all_constants;
export default all_constants = {
  home: {
    news_feed_title: {
      new: "Les nouveautés",
      top_rated: "Les mieux notés",
      famous: "Les plus commandés",
    },
  },
  search: {
    placeholder: "Poulet Yassa",
    no_dishes_found: "Aucun résultat.",
    button: {
      label: {
        search: "Chercher",
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
      delivery: {
        delivery_circa: " vers ",
        delivery_day: "Livraison",
        delivery_hour: "Heure de livraison",
        delivery_info: "Informations de livraison",
        dish_origin: "Origine du plat",
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
        localization: "Localisation",
        wallet: "Portefeuille",
      },
    },
  },
  tab: {
    main_tab_navigator: {
      home: "Accueil",
      order: "Commander",
      pending: "En attente",
      history: "Historique",
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
        email: "Email",
        current_password: "Mot de passe actuel",
        new_password: "Nouveau mot de passe",
        new_password_confirmation: "Confirmation nouveau mot de passe",
        firstname: "Prénom",
        lastname: "Nom",
        phone: "Numéro de téléphone",
        street_number: "Numéro",
        street_name: "Rue",
        address_complement: "Complément d'adresse",
        postal_code: "Code postal",
        town: "Ville",
        order_days: "Jours de prise de commandes",
        max_order_number: "Votre nombre max de plats",
        noon_delivery_hours: "Votre créneau en journée",
        noon_delivery_days: "Les plats sont livrés en journée le",
        evening_delivery_hours: "Votre créneau en soirée",
        evening_delivery_days: "Les plats sont livrés en soirée le",
        image: "Photo de profil",
      },
    },
  },
  modal: {
    dish_modal: {
      hide: "FERMER",
    },
    form: {
      settings: {
        order_days:
          "Vous choisissez ici les jours où les clients peuvent vous passer des commandes. \n \n" +
          "Ex: Mardi,Mercredi \n \n" +
          "Cela signifie que vous acceptez de recevoir uniquement les commandes les mardis et mercredis. \n \n " +
          "En dehors de ces jours, vous ne serez pas visible des clients et vous ne recevrez donc aucune commande.",
        max_order_number:
          "Vous estimez ici le nombre maximal de plats que vous pensez pouvoir préparer sur une période. \n \n" +
          "Ex: 18 \n \n" +
          "Cela signifie que vous ne pourrez jamais avoir plus de 18 plats à préparer par vague de commandes. \n \n " +
          "Veillez à ne pas en mettre trop pour pouvoir être dans les temps pour la collecte des commandes par nos livreurs. \n \n" +
          "Attention, il ne s'agit pas forcément ici du nombre de commandes. En effet une commande peut comporter plusieurs plats.",
        noon_delivery_hours:
          "Vous choisissez ici le créneau du midi pour la collecte de vos plats par nos livreurs. \n \n" +
          "Ex: 11-13 \n \n" +
          "Cela signifie qu'entre 11h au plus tôt et 13h au plus tard, nos livreurs peuvent venir récupérer les commandes à votre adresse. \n \n " +
          "Attention, si vous paramétrez des horaires décalées, par exemple 14-16, les clients recevront vos commandes entre 14h30 et 16h30 !",
        noon_delivery_days:
          "Vous choisissez les jours où nos livreurs peuvent passer récupérer les commandes en journée. \n \n" +
          "Ex: Vendredi,Samedi \n \n" +
          "Cela signifie que les vendredis et samedis, les livreurs pourront passer collecter les commandes pour les livraisons du midi. \n \n " +
          "Notez que 'midi' dans la phrase ci-dessus fait référence aux horaires de collecte définies dans le champ 'Votre créneau du midi' ",
        evening_delivery_hours:
          "Vous choisissez ici le créneau du soir pour la collecte de vos plats par nos livreurs. \n \n" +
          "Ex: 18-20 \n \n" +
          "Cela signifie qu'entre 18h au plus tôt et 20h au plus tard, nos livreurs peuvent venir récupérer les commandes à votre adresse. \n \n " +
          "Attention, si vous paramétrez des horaires décalées, par exemple 20-22, les clients recevront vos commandes entre 20h30 et 22h30 !",
        evening_delivery_days:
          "Vous choisissez les jours où nos livreurs peuvent passer récupérer les commandes en soirée. \n \n" +
          "Ex: Jeudi,Vendredi \n \n" +
          "Cela signifie que les jeudis et vendredis, les livreurs pourront passer collecter les commandes pour les livraisons en soirée. \n \n " +
          "Notez que 'soirée' dans la phrase ci-dessus fait référence aux horaires de collecte définies dans le champ 'Votre créneau du soir' ",
        email:
          "Pour modifier uniquement votre email, saisissez votre nouvel email et votre mot de passe actuel.",
        password:
          "Pour modifier votre mot de passe, remplissez tous les champs de ce formulaire. \n \n" +
          "Le mot de passe doit faire entre 6 et 10 caractères. Il doit contenir au moins une majuscule, un chiffre et un des caractères spéciaux suivants: !, #, *",
      },
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
        email: "Votre email",
        user_settings_current_password: "Votre mot de passe actuel",
        user_settings_new_password: "Votre nouveau mot de passe",
        user_settings_new_password_confirmation:
          "Confirmez votre nouveau mot de passe",
        order_days: "Sélectionnez les jours où vous acceptez les commandes",
        max_order_number:
          "Le nombre maximum de plats que vous pouvez préparer à la fois",
        noon_delivery_hours:
          "L'amplitude horaire des livraisons à midi \n Ex: 11-13",
        noon_delivery_days: "Sélectionnez les jours d'expédition le midi",
        evening_delivery_hours:
          "L'amplitude horaire des livraisons le soir \n Ex: 18-21",
        evening_delivery_days: "Sélectionnez les jours d'expédition en soirée",
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
    submit: "VALIDER",
    cancel: "ANNULER",
    errors: {
      title: "Erreur",
      empty_email: "Veuillez renseigner votre mail",
      wrong_email_format: "Veuillez entrer un email valide",
      empty_password: "Veuillez renseigner votre mot de passe",
      forgot_password: "Mot de passe oublié ?",
    },
    success: {
      title: "Succès",
      email_sent: "Un email a été envoyé à ",
      reset_password:
        "Si vous êtes inscrit, vous recevrez un email contenant un nouveau mot de passe. Pensez à regarder vos spams.",
    },
  },
  custom_alert: {
    form: {
      title: "ATTENTION",
      message: "Quitter le formulaire et revenir en arrière ?.",
    },
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
    },

    includes: {
      phone: "téléphone",
    },

    settings: {
      invalid_email_error: "Veuillez renseigner un email valide.",
      too_short_password_error: "Le mot de passe doit faire au moins ",
      char: " caractères.",
      password_missing_special_chars:
        "Le mot de passe doit contenir un des caractères suivants: ",
      password_missing_uppercase:
        "Le mot de passe doit contenir au moins une majuscule.",
      password_missing_digit:
        "Le mot de passe doit contenir au moins un chiffre.",
      non_equal_password_error:
        "Les champs nouveau mot de passe et confirmation nouveau mot de passe doivent être identiques.",
      phone_format_error: " doit contenir exactement 10 chiffres sans espace.",
    },
  },
  password: {
    min_length: 6,
  },
};
