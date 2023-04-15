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
          title: "Requests",
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
      title: "Parcel",
      main: true,
      protected: false,
    },
    children: [
      {
        path: "",
        name: "user-requests-list",
        redirect: (to) => {
          return { path: `/${to.params.id}/requests` };
        },
      },
      {
        path: "requests",
        name: "user-requests",
        meta: {
          title: "Requests",
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
          title: "Create",
          protected: false,
        },
        children: [
          {
            path: "",
            name: "create-parcel",
            meta: {
              title: "Create parcel",
              protected: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/UserParcelView.vue"
              ),
          },
        ],
      },
      {
        path: "create/order",
        name: "create-order",
        meta: {
          title: "Order",
          protected: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/UserParcelOrderView.vue"
          ),
      },
      {
        path: "create/deliver",
        name: "create-deliver",
        meta: {
          title: "Deliver",
          protected: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/UserParcelDeliverView.vue"
          ),
      },
    ],
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/MainLayout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const navigation = keyBy(router.getRoutes(), "name");

export { router, navigation };
