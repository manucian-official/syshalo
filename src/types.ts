export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide-react icon name
  features: string[];
  color: string; // e.g., 'cyan', 'purple', 'pink', 'blue'
  intensity: string; // gradient tailwind classes
  details: string; // long explanation for modal/cards
}

export interface ProjectStats {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  thumbnail: string;
  description: string;
  longDescription: string;
  year: string;
  duration: string;
  tags: string[];
  stats: ProjectStats[];
  challenges: string[];
  solutions: string[];
  outcome: string;
}

export interface WorkflowStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  techUsed: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
  avatarSeed: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatarSeed: string;
  bio: string;
  skills: string[];
  hackerCode: string; // cute terminal command text for high-tech aesthetic
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'halo';
  text: string;
  timestamp: Date;
}
