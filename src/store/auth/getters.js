export default {
  userId(state) {
    return state.userId;
  },
  userEmail(state) {
    return state.userEmail;
  },
  getUserMethod(state) {
    return function () {
      return state.userId;
    };
  },
  user(state) {
    return state.user;
  },
  userName(state) {
    return state.name;
  },
};
