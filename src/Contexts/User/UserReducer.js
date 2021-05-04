export default function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        isLoggedIn: true,
        ...action.payload,
      };

    case "LOGOUT":
      return { isLoggedIn: false };
    default:
      return state;
  }
}
