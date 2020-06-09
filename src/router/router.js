const Login = () => import("@/views/Login.vue");
const NoFound = () => import("@/views/404.vue");
const Home = () => import("@/views/Home.vue");
const Blog = () => import("@/views/Blog.vue");
const Detail = () => import("@/views/Detail.vue");
const About = () => import("@/views/About.vue");
const Archives = () => import("@/views/Archives.vue");
const Manage = () => import("@/views/Manage.vue");
const Backstage = () => import("@/views/Backstage.vue");
const MyWrite = () => import("@/views/MyWrite.vue");
const MyDetail = () => import("@/views/MyDetail.vue");
const EditInfo = () => import("@/views/EditInfo.vue");
const Photograph = () => import("@/views/Photograph.vue");
const EditPhoto = () => import("@/views/EditPhoto.vue");
const EditPhotoInfo = () => import("@/views/EditPhotoInfo.vue");
const Resume = () => import("@/views/Resume.vue");

export default [
  {
    path: "/",
    redirect: to => "/home"
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/404",
    name: "404",
    component: NoFound,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  },
  {
    path: "/home",
    name: "home",
    component: Home,
    meta: {
      title: "Wnig's Blog",
      keepAlive: false
    }
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/detail",
    name: "detail",
    component: Detail,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/archives",
    name: "archives",
    component: Archives,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/photograph",
    name: "photograph",
    component: Photograph,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/manage",
    name: "manage",
    component: Manage,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/backstage",
    name: "backstage",
    component: Backstage,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/mywrite",
    name: "mywrite",
    component: MyWrite,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/mydetail",
    name: "mydetail",
    component: MyDetail,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/editInfo",
    name: "editInfo",
    component: EditInfo,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/editPhoto",
    name: "editPhoto",
    component: EditPhoto,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/editPhotoInfo",
    name: "editPhotoInfo",
    component: EditPhotoInfo,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  },
  {
    path: "/resume",
    name: "resume",
    component: Resume,
    meta: {
      title: `Wnig's Blog`,
      keepAlive: false
    }
  }
];
