import { Github, Globe } from "lucide-react";
import { Heading, TooltipTrigger } from "react-aria-components";
import { Link } from "~/components/ui/Link";
import { Tag, TagGroup } from "~/components/ui/TagGroup";
import { Tooltip } from "~/components/ui/Tooltip";

export default function CardProject({
  title,
  content,
  deployLink,
  codeLink,
  tags,
}: {
  title: string;
  content: string;
  deployLink: string;
  codeLink: string;
  tags: string[];
}) {
  return (
    <div className="space-y-2 border-[1.85px] dark:border-[#a9adc1] w-full sm:w-[280px] px-2 py-3 rounded-lg">
      <div className="flex justify-between items-center">
        <Heading className="font-bold text-xl">{title}</Heading>
        <div className="flex gap-2 items-center">
          <TooltipTrigger delay={0}>
            <Link href={deployLink} target="_blank">
              <Globe className="h-5 w-5" />
            </Link>
            <Tooltip onOpenChange={function Ya() {}}>Web</Tooltip>
          </TooltipTrigger>

          <TooltipTrigger delay={0}>
            <Link href={codeLink} target="_blank">
              <Github className="h-5 w-5" />{" "}
            </Link>
            <Tooltip onOpenChange={function Ya() {}}>Code</Tooltip>
          </TooltipTrigger>
        </div>
      </div>
      <p className="text-[#535661] dark:text-[#a9adc1] ">{content}</p>
      <TagGroup color="blue">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagGroup>
    </div>
  );
}
