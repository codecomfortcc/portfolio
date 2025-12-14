import { StaticImageData } from "next/image";
export interface TechnologiesProps {
  name: string;
  icon: string; 
}

export interface Project {
  id: string;
  title: string;
  description: string;
  logo?: string;
  currentStatus: "development" | "completed" | "planning" | "paused" | "deprecated";
  futureStatus: "maintained" | "unmaintained" | "community" | "archived" | "none";
  imageSrc: string | StaticImageData;
  repo: string;
  demo?: string;
  technologies: TechnologiesProps[];
  createdAt: string;
  updatedAt: string;
}

export type CreateProject = Omit<Project, "id" | "createdAt" | "updatedAt">;

export interface Contact {
    name: string;
    email: string;
    message: string;
}
