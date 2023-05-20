export function getCategories(itemType) {
  let categoriesObject = {};
  if (itemType === "Dish") {
    categoriesObject = [
      { label: "Entrée", value: "starter" },
      { label: "Plat principal", value: "main_dish" },
      { label: "Boisson", value: "drink" },
      { label: "Dessert", value: "dessert" },
    ];
  }
  return categoriesObject;
}

export function getDaysOfWeek() {
  const daysOfWeek = [
    {
      Key: 1,
      value: "Lundi",
    },
    {
      key: 2,
      value: "Mardi",
    },
    {
      key: 3,
      value: "Mercredi",
    },
    {
      key: 4,
      value: "Jeudi",
    },
    {
      key: 5,
      value: "Vendredi",
    },
    {
      key: 6,
      value: "Samedi",
    },
    {
      key: 7,
      value: "Dimanche",
    },
  ];
  return daysOfWeek;
}

export function getData(dataFromBackend) {
  let data = [];
  const indexes = Object.keys(dataFromBackend["data"]);

  for (let i = 0; i < indexes.length; i++) {
    const itemObject = dataFromBackend["data"][i];
    data.push(itemObject);
  }

  return data;
}

export function getDataFromUniqueField(dataFromBackend, objectNumber) {
  const indexes = Object.keys(dataFromBackend["data"]);
  for (let i = 0; i < indexes.length; i++) {
    const itemObject = dataFromBackend["data"][i];
    if (itemObject["order_number"] === objectNumber) {
      return itemObject;
    }
  }
}
