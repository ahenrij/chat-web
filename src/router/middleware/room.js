/**
 * Middleware on /room route
 * This middleware is responsible for checking if any
 * room has been joined by the current user before accessing the /room route.
 */
import store from "@/store";

export default (_to, _from, next) => {
  if (store.state.data.rooms.length === 0) {
    return next("/join");
  }
  return next();
};
