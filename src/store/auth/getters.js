export default {
  userId(state) {
    return state.userId;
  },
  getUserMethod(state) {
    return function () {
      return state.userId;
    };
  },
  user(state) {
    return state.user;
  },
};
