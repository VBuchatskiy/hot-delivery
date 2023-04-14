import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { keyBy } from "lodash";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/requests",
  },
  {
    path: "/requests",
    children: [
      {
        path: "",
        name: "requests",
        meta: {
          title: "requests",
          main: true,
          protected: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/RequestListView.vue"
          ),
      },
    ],
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/MainLayout.vue"),
  },
  {
    path: "/:id?",
    name: "parcel",
    meta: {
      title: "parcel",
      main: true,
      protected: false,
    },
    children: [
      {
        path: "",
        redirect: (to) => {
          return { path: `/${to.params.id}/requests` };
        },
      },
      {
        path: "requests",
        name: "user-requests",
        meta: {
          title: "requests",
          protected: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/UserRequestListView.vue"
          ),
      },
      {
        path: "create",
        meta: {
          title: "create",
          protected: false,
        },
        children: [
          {
            path: "",
            name: "create-parcel",
            meta: {
              title: "parcel",
              protected: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/UserParcelView.vue"
              ),
          },
          {
            path: "order",
            name: "create-order",
            meta: {
              title: "order",
              protected: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/UserParcelOrderView.vue"
              ),
          },
          {
            path: "deliver",
            name: "create-deliver",
            meta: {
              title: "deliver",
              protected: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/UserParcelDeliverView.vue"
              ),
          },
        ],
      },
    ],
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/MainLayout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(
    process.env.NODE_ENV === "production" ? "/smart-expert/" : "/"
  ),
  routes,
});

const navigation = keyBy(router.getRoutes(), "name");

export { router, navigation };
