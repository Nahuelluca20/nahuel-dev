import { type RouteConfig, index } from "@react-router/dev/routes";

// export default [
// route("/", "./routes/index.tsx"),
// route("/blog/:slug", "./routes/blog.$slug/route.tsx"),
// route("/projects", "./routes/projects/route.tsx"),
// route("/about", "./routes/about/route.tsx"),
// route("/contact", "./routes/contact/route.tsx"),
// route("/blog", "./routes/blog/route.tsx"),
// route("/projects", "./routes/projects/route.tsx"),
// ] satisfies RouteConfig;
export default [index("routes/home.tsx")] satisfies RouteConfig;
