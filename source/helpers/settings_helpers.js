const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getUserSettings() {
  await sleep(3000);
  const userSettingsObject = {
    credential_infos_section: {
      title: "credential_infos",
      data: {
        email: "toulevi@yahoo.fr",
        password: "********",
      },
    },
    order_infos_section: {
      title: "order_infos",
      data: {
        order_days: "Lundi, Mercredi, Vendredi",
        max_order_number: "30",
        noon_delivery_hours: "11-13",
        noon_delivery_days: "Samedi",
        evening_delivery_hours: "18-20",
        evening_delivery_days: "Mardi, Jeudi, Samedi",
      },
    },
    personal_infos_section: {
      title: "personal_infos",
      data: {
        photo:
          "https://img-3.journaldesfemmes.fr/M_bbWpTVNekL5O_MLzQ4dyInmJU=/750x/smart/1c9fe4d4419047f18efc37134a046e5a/recipe-jdf/1001383.jpg",
        siren: "362521879",
        siret: "36252187900034",
        firstname: "Irène",
        lastname: "JANTEN",
        phone: "0649510110",
      },
    },
    address_section: {
      title: "address",
      data: [
        {
          id: 10,
          street_number: "1",
          street_name: "rue René Cassin",
          address_complement: "Résidence Neptune",
          postal_code: "91100",
          town: "Corbeil-Essonnes",
        },
        {
          id: 20,
          street_number: "2",
          street_name: "rue René Cassin",
          address_complement: "Résidence Neptune",
          postal_code: "91100",
          town: "Corbeil-Essonnes",
        },
        {
          id: 30,
          street_number: "3",
          street_name: "rue René Cassin",
          address_complement: "Résidence Neptune",
          postal_code: "91100",
          town: "Corbeil-Essonnes",
        },
        {
          id: 40,
          street_number: "4",
          street_name: "rue René Cassin",
          address_complement: "Résidence Neptune",
          postal_code: "91100",
          town: "Corbeil-Essonnes",
        },
        {
          id: 50,
          street_number: "5",
          street_name: "rue René Cassin",
          address_complement: "Résidence Neptune",
          postal_code: "91100",
          town: "Corbeil-Essonnes",
        },
        {
          id: 60,
          street_number: "6",
          street_name: "rue René Cassin",
          address_complement: "Résidence Neptune",
          postal_code: "91100",
          town: "Corbeil-Essonnes",
        },
        {
          id: 70,
          street_number: "7",
          street_name: "rue René Cassin",
          address_complement: "Résidence Neptune",
          postal_code: "91100",
          town: "Corbeil-Essonnes",
        },
        {
          id: 80,
          street_number: "8",
          street_name: "rue René Cassin",
          address_complement: "Résidence Neptune",
          postal_code: "91100",
          town: "Corbeil-Essonnes",
        },
      ],
    },
  };
  return userSettingsObject;
}
