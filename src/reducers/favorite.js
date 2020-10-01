const favorite = (state = {}, { type, item }) => {
  console.log("state", type, item);
  switch (type) {
    case "ADD_FAV_ITEM":
      return { ...state, [item.id]: item };
    case "REMOVE_FAV_ITEM":
      const copyState = { ...state };
      delete copyState[item.id];
      return { ...copyState };
    case "GET_FAV_ITEMS":
      return { ...state, [item.id]: item };
    default:
      return state;
  }
};

export default favorite;
