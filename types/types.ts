// types/index.ts
export interface Meteor {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

export interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
}