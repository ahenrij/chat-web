import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CreateRoomView from "../views/CreateRoomView.vue";
import JoinRoomView from "../views/JoinRoomView.vue";
import RoomView from "../views/RoomView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/create",
    name: "create",
    component: CreateRoomView,
  },
  {
    path: "/join",
    name: "join",
    component: JoinRoomView,
  },
  {
    path: "/chat",
    name: "chat",
    component: RoomView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
