import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import Home from "../views/Home.vue";
import AddPage from "../views/AddPage.vue";
import DisplayAll from "../views/DisplayAll.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LoginPage",
    component: LoginPage
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      { path: "", name: "displayAll", component: DisplayAll },
      { path: "add", name: "AddPage", component: AddPage }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
