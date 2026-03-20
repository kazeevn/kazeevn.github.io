import type { Metadata } from "next";
import CvContent from "./cv-content";

export const metadata: Metadata = {
  title: "CV | Nikita Kazeev",
  description:
    "Curriculum vitae of Nikita Kazeev, a research scientist working across AI, physics, materials science, and scientific leadership.",
};

export default function CvPage() {
  return <CvContent />;
}
