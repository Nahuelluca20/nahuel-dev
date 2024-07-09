import { MetaFunction } from "@remix-run/cloudflare";
import CardProject from "./components/card-project";

const projectsItems = [
  {
    title: "Trello clone",
    content:
      "Trello clone using remix, you can create boards and tasks like Trello.",
    deployLink: "https://trello-clone-zeta-wheat.vercel.app/",
    codeLink: "https://github.com/Nahuelluca20/trello-clone",
    tags: ["Remix", "Prisma", "Supabase"],
  },
  {
    title: "MDX notes editor",
    content:
      "In this app made with NextJS 14 and Strapi's Markdoc you can create notes with MDX and have the live preview.",
    deployLink: "https://nextjs-mdx-notes.vercel.app/dashboard",
    codeLink: "https://github.com/Nahuelluca20/nextjs-mdx-notes",
    tags: ["NextJS", "NextAuth", "TursoDB"],
  },
  {
    title: "React Flag API App",
    content:
      "An app made with react that consumes the flag-api API to display the countries and their data.",
    deployLink: "https://react-flag-api.netlify.app/",
    codeLink: "https://github.com/Nahuelluca20/react-flag-API",
    tags: ["React", "React Router", "API"],
  },
  {
    title: "WhosIn?",
    content:
      "WhosIn is an app to create events and have your friends confirm their presence.",
    deployLink: "https://whos-in-sage.vercel.app/",
    codeLink: "https://github.com/Nahuelluca20/WhosIn-",
    tags: ["Nextjs", "Prisma", "Clerk"],
  },
  {
    title: "Hacker News Clone",
    content:
      "Hacker News mini clone, you can see the latest stories and access comments.",
    deployLink: "https://hackernews-remix-clone.netlify.app/",
    codeLink: "https://github.com/Nahuelluca20/hacker-news-remix-clone",
    tags: ["Remix", "TailwindCSS", "API"],
  },
  {
    title: "Blog MDX",
    content: "Simple blog using MDX.",
    deployLink: "https://sider-dev-blog.vercel.app/",
    codeLink: "https://github.com/Nahuelluca20/blog-mdx-nextjs",
    tags: ["NextJS", "MDX", "shadcn/ui"],
  },
  {
    title: "Task Manager",
    content: "App to manage tasks using Remix and Supabase.",
    deployLink: "https://task-manager-remix.vercel.app/",
    codeLink: "https://github.com/Nahuelluca20/task-manager-remix",
    tags: ["Remix", "Supabase", "shadcn/ui"],
  },
  {
    title: "Comments App",
    content:
      "Feedback app using tRPC for a typesafe API and PlantScale as a database.",
    deployLink: "https://comments-app-alpha.vercel.app/",
    codeLink: "https://github.com/Nahuelluca20/comments-app",
    tags: ["NextJS", "tRPC", "NextAuth"],
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Project" },
    { name: "description", content: "My projexts - Nahuel dev" },
  ];
};

export default function projects() {
  return (
    <section className="max-w-[900px] mx-auto">
      <h1 className="text-2xl mb-2 font-bold">Projects</h1>
      <h3 className="text-lg text-[#535661] dark:text-[#a9adc1] font-medium">
        Here are some of the projects I have worked on.
      </h3>
      <div className="flex flex-wrap gap-4 py-5">
        {projectsItems.map((project, index) => (
          <CardProject
            key={index}
            title={project.title}
            content={project.content}
            deployLink={project.deployLink}
            codeLink={project.codeLink}
            tags={project.tags}
          />
        ))}
      </div>
    </section>
  );
}
