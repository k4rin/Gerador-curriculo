export type Skill = { name: string; level: 'Básico' | 'Intermediário' | 'Avançado' }
export type Experience = {
  id: string; // id único para cada experiência
  company: string;
  position: string;
  startDate: string; // formato ISO yyyy-mm-dd
  endDate: string | null; // null se trabalho atual
  isCurrent: boolean;
  description: string;
}
export type Education = {
  id: number;
  curso: string;
  institution: string;
  inicio: string;
  fim: string;
}

export type Resume = {
  name: string
  title: string // Cargo
  email: string
  phone?: string
  linkedin?: string
  summary: string
  skills: Skill[]
  experience: Experience[]
  education: Education[] 
}