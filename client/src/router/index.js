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
    component: Home,
    children: [
      { path: "", name: "DisplayAll", component: DisplayAll },
      { path: "add", name: "AddPage", component: AddPage }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//! navigation guard still broken
// router.beforeEach((to, from, next) => {
//   if (localStorage.getItem("access_token")) {
//     if (to.path === "/") {
//       next({ path: "/home" });
//     } else {
//       next();
//     }
//   } else {
//     next({ path: "/" });
//   }
// });

export default router;
