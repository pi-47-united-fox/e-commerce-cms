import Vue from "vue";
import VueRouter from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import Home from "../views/Home.vue";
import AddPage from "../views/AddPage.vue";
import DisplayAll from "../views/DisplayAll.vue";
import DisplayBanners from "../views/DisplayBanners.vue";
import AddBanner from "../views/AddBanner.vue";

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
      { path: "add", name: "AddPage", component: AddPage },
      {
        path: ":id/edit",
        name: "EditPage",
        component: () =>
          import(/* webpackChunkName: "EditPage" */ "../views/EditPage.vue")
      },
      { path: "banners", name: "BannersPage", component: DisplayBanners },
      { path: "banners/add", name: "AddBannersPage", component: AddBanner }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

//! navigation guard still broken
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("access_token")) {
    to.path === "/" ? next() : next("/");
  } else {
    to.path === "/" ? next("/home") : next();
  }
});

export default router;
