import { MetaFunction } from "react-router";
import { Link } from "~/components/ui/Link";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact" },
    { name: "description", content: "Contact me - Nahuel dev" },
  ];
};

export default function contact() {
  return (
    <section>
      <h1 className="text-2xl mb-5 font-bold max-w-[900px] mx-auto">Contact</h1>
      <div className="space-y-5 text-lg font-medium leading-7 max-w-[900px] mx-auto">
        <p>
          {"I'm"} always open to new opportunities and collaborations. Whether
          you want to discuss a potential project or just say hi, feel free to
          reach out to me at{" "}
          <Link href="mailto:nahueldevelop@gmail.com">
            nahueldevelop@gmail.com
          </Link>
          ,{" "}
          <Link
            href="https://www.linkedin.com/in/nahueldevelop/"
            target="__blank"
          >
            LinkedIn
          </Link>{" "}
          or{" "}
          <Link href="https://github.com/Nahuelluca20" target="__blank">
            Github
          </Link>
          . {"I'll"} get back to you as soon as possible.
        </p>
      </div>
    </section>
  );
}
