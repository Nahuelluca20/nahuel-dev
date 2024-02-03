import CardProject from "./components/card-project";

export default function projects() {
  return (
    <section className="max-w-[900px] mx-auto">
      <h1 className="text-2xl mb-5 font-bold">Projects</h1>
      <div className="flex flex-wrap gap-4">
        <CardProject
          title="Trello clone"
          content="este proyecto es sarasa sarasa hecho por sarasa"
          deployLink="https://github.com/Nahuelluca20"
          codeLink="https://github.com/Nahuelluca20"
          tags={["Next.js", "TypeScript", "TailwindCSS"]}
        />
      </div>
    </section>
  );
}
