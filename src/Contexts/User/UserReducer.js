export default function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        ...action.payload,
      };

    case "LOGOUT":
      return { isLoggedIn: false };
    case "TEST":
      return {
        ...state,
        testsTaken: state.testsTaken ? state.testsTaken.concat(action.payload) : [action.payload],
      };
    default:
      return state;
  }
}
