import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from '@/store/store';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import(/* webpackChunkName: "sign-up" */'./views/SignUp.vue'),
    },
    {
      path: '/log-in',
      name: 'log-in',
      component: () => import(/* webpackChunkName: "log-in" */'./views/LogIn.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.userId) {
          if (localStorage.userId !== 'undefined') {
            next('/dashboard');
          } else {
            next();
          }
        } else {
          next();
        }
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */'./views/Dashboard.vue'),
      meta: {
        authRequried: true,
      },
      children: [
        {
          path: '/dashboard/user',
          component: () => import(/* webpackChunkName: "dashboard-user" */'./views/DashboardMain.vue'),
          meta: {
            authRequried: true,
          },
        },
        {
          path: '/dashboard/list-item',
          component: () => import(/* webpackChunkName: "dashboard-list-item" */'./views/DashboardCreateItem.vue'),
          meta: {
            authRequried: true,
          },
          children: [
            {
              name: 'list-item/id',
              path: ':id',
            },
          ],
        },
        {
          name: 'dashboard-messages',
          path: '/dashboard/messages/',
          component: () => import(/* webpackChunkName: "dashboard-messages" */'./views/DashboardMessages.vue'),
          meta: {
            authRequried: true,
          },
          children: [
            {
              path: ':id',
              component: () => import(/* webpackChunkName: "dashboard-chat-window" */'./views/DashboardMessagesChat.vue'),
              meta: {
                authRequried: true,
              },
            },
          ],
        },
        {
          name: 'dashboard-rentals',
          path: '/dashboard/rentals/',
          component: () => import(/* webpackChunkName: "dashboard-rentals" */'./views/DashboardRentals.vue'),
          meta: {
            authRequried: true,
          },
          children: [
            {
              path: ':id',
              name: 'dashboard-rentals-item',
              component: () => import(/* webpackChunkName: "dashboard-rentals-item" */'./views/DashboardRentalsItem.vue'),
              meta: {
                authRequried: true,
              },
            },
          ],
        },
        {
          name: 'dashboard-edit-address',
          path: '/dashboard/edit-address/',
          component: () => import(/* webpackChunkName: "dashboard-edit-address" */'./views/DashboardEditAddress.vue'),
          meta: {
            authRequried: true,
          },
          children: [
            {
              name: 'edit-address/id',
              path: ':id',
            },
          ],
        },
      ],
    },
    {
      path: '/item',
      name: 'item',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "item" */'./views/item/slug.vue'),
      children: [
        {
          name: 'item/slug',
          path: ':slug',
        },
      ],
    },
    {
      path: '/tag',
      name: 'tag',
      component: () => import(/* webpackChunkName: "tag" */'./views/tag/slug.vue'),
      children: [
        {
          path: ':slug',
        },
      ],
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import(/* webpackChunkName: "sign-up" */'./views/Checkout.vue'),
    },
  ],
});

// check to see if user is logged in to a page that requires authentication
// if no user, redirect to log in page
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequried)) {
    /* if (localStorage.userId) {
      if (localStorage.userId !== null &&
        localStorage.userId !== undefined &&
        localStorage.userId !== 'undefined') {
        next();
      } else {
        next('/log-in');
      }
    } else {
      next('/log-in');
    } */
    // TODO: Fix user status of being logged in
    if (store.getters.userId === null) {
      store.watch(store.getters.getUserMethod, (userId) => {
        if (userId) {
          next();
        } else {
          next('/log-in');
        }
      });
      return;
    } if (store.getters.userId) {
      next();
    } else {
      next();
    }
  }
  next();
});

export default router;
