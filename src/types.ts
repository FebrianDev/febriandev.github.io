export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string[];
  current?: boolean;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  icon?: string;
}

export interface Achievement {
  title: string;
  subtitle: string;
  year: string;
  description: string;
}

export interface PortfolioData {
  home: {
    name: string;
    role: string;
    biography: string;
    skills: string[];
  };
  experience: Experience[];
  projects: Project[];
  achievements: Achievement[];
  socials: {
    email: string;
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
  };
}
