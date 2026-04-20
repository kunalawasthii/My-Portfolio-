/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Basics {
  name: string;
  title: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  links: string[];
}

export interface Experience {
  company: string;
  role: string;
  dates: string;
  location: string;
  bullets: string[];
}

export interface Achievement {
  title: string;
  context: string;
  type: string;
}

export interface Project {
  title: string;
  stack: string[];
  bullets: string[];
  links?: string[];
  certificateUrl?: string;
}

export interface Education {
  institution: string;
  degree: string;
  dates: string;
}

export interface Certification {
  name: string;
  url?: string;
}

export interface ResumeData {
  basics: Basics;
  experience: Experience[];
  achievements: Achievement[];
  projects: Project[];
  skills: Record<string, string[]>;
  education: Education[];
  certifications: Certification[];
  extra: string[];
}
