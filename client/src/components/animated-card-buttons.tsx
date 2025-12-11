import { cn } from "@/lib/utils";
import React from "react";
import { FiExternalLink, FiGithub } from "react-icons/fi";
interface AnimatedCardButtonsProps {
  repo: string;
  demo?: string;
  className?: string;
  repoClassname?: string;
  demoClassname?: string;
}
const AnimatedCardButtons = ({
  repo,
  demo,
  className,
  repoClassname,
  demoClassname,
}: AnimatedCardButtonsProps) => {
  return (
    <div
      className={cn(
        "mt-4 flex items-center justify-center gap-3 flex-1 ",
        className
      )}
    >
      <a
        href={repo}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-black text-sm text-black transition flex-1 justify-center will-change-transform",
          repoClassname
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <FiGithub className="will-change-transform" />
        <span>Repo</span>
      </a>

      {demo && (
        <a
          href={demo}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-white shadow-lg shadow-primary/30 flex-1 will-change-transform justify-center transition",
            demoClassname
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <FiExternalLink className="will-change-transform" />
          <span>Live Demo</span>
        </a>
      )}
    </div>
  );
};

export default AnimatedCardButtons;
