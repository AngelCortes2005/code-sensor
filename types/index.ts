
interface Meteor {
  id: number;
  top: string;
  left: string;
  delay: number;
  duration: number;
}

interface MapProps {
  dots?: Array<{
    start: { lat: number; lng: number; label?: string };
    end: { lat: number; lng: number; label?: string };
  }>;
  lineColor?: string;
  dotColor?: string;
  mapColor?: string;
}