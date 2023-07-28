export const INIT_STATE = {
  listLot: [],
  luckyNumbers: [],
  totalWinners: 0,
  randomNumber: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LIST_LOT":
      const _genList = Array.from({ length: action.payload }, (_, i) =>
        (i + 1).toString()
      );
      return {
        ...state,
        listLot: _genList,
      };
    case "UPDATE_LIST_LOT":
      return {
        ...state,
        listLot: action.payload,
      };
    case "SET_LUCKY_NUMBERS":
      return {
        ...state,
        luckyNumbers: action.payload,
      };
    case "SET_WINNERS":
      return {
        ...state,
        totalWinners: state.totalWinners + 1,
      };
    case "SET_RANDOM_NUMBER":
      return {
        ...state,
        randomNumber: action.payload,
      };
    case "RESET":
      return INIT_STATE;
  }
};
