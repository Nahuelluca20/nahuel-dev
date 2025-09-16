import type { MetaFunction } from "react-router";
import CardProject from "./components/card-project";

const projectsItems = [
  {
    title: "Treefy",
    content:
      "Organize your ideas, share your knowledge, and grow your understanding with Treefy.",
    deployLink: "https://treefy.pages.dev/",
    codeLink: "https://github.com/Nahuelluca20/treefy",
    tags: ["Remix", "Cloudflare", "KV"],
  },
  {
    title: "RAG LLM System",
    content:
      "A RAG system using an LLM that responds according to the user's questions.",
    deployLink: "https://loadertsx.com/blog/how-create-rag-system",
    codeLink: "https://github.com/Nahuelluca20/ollama-techstacks-api",
    tags: ["Python", "FastAPI", "LLMs", "Ollama"],
  },
  {
    title: "Trello clone",
    content:
      "Trello clone using remix, you can create boards and tasks like Trello.",
    deployLink: "https://trello-clone-zeta-wheat.vercel.app/",
    codeLink: "https://github.com/Nahuelluca20/trello-clone",
    tags: ["Remix", "Prisma", "Supabase"],
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
    title: "React Flag API App",
    content:
      "An app made with react that consumes the flag-api API to display the countries and their data.",
    deployLink: "https://react-flag-api.netlify.app/",
    codeLink: "https://github.com/Nahuelluca20/react-flag-API",
    tags: ["React", "React Router", "API"],
  },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Project" },
    { name: "description", content: "My projects - Nahuel dev" },
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
        {projectsItems.map((project) => (
          <CardProject
            key={project.title}
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
