import { createFileRoute } from "@tanstack/react-router";
import { StudyLab } from "@/components/quiz/study-lab";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <StudyLab />;
}
