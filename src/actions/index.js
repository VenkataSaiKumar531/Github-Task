export const addFavItem = (item) => ({
  type: "ADD_FAV_ITEM",
  item,
});

export const removeFavItem = (item) => ({
  type: "REMOVE_FAV_ITEM",
  item,
});
