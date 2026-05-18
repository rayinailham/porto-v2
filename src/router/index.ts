import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: { title: "Rayina Ilham — Go-first microservice architect shipping AI." },
    },
    {
      path: "/work",
      name: "work",
      component: () => import("@/views/WorkIndexView.vue"),
      meta: { title: "Work · Rayina Ilham" },
    },
    {
      path: "/work/:slug",
      name: "case-study",
      component: () => import("@/views/CaseStudyView.vue"),
      meta: { title: "Case study · Rayina Ilham" },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
      meta: { title: "About · Rayina Ilham" },
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/views/ContactView.vue"),
      meta: { title: "Contact · Rayina Ilham" },
    },
    {
      path: "/sui",
      name: "sui",
      component: () => import("@/views/SuiView.vue"),
      meta: { title: "// sui", quiet: true, noindex: true },
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/",
    },
  ],
  scrollBehavior(_to, _from, saved) {
    if (saved) return saved;
    return { top: 0, behavior: "instant" as ScrollBehavior };
  },
});

router.afterEach((to) => {
  const title = (to.meta?.title as string) ?? "Rayina Ilham";
  if (typeof document !== "undefined") document.title = title;
});

export default router;
