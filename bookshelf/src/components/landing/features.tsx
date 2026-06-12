import { Library, TrendingUp, Target } from "lucide-react";

const features = [
  {
    icon: Library,
    title: "Organise your shelves",
    description:
      "Want to Read, Currently Reading, Read — plus custom shelves for anything else.",
  },
  {
    icon: TrendingUp,
    title: "Track your progress",
    description: "Log pages as you go and watch your progress bar fill up.",
  },
  {
    icon: Target,
    title: "Hit your reading goals",
    description: "Set a yearly goal and see whether you're on pace to reach it.",
  },
];

export function Features() {
  return (
    <section className="bg-[var(--color-bg-secondary)] px-6 py-16">
      <div className="mx-auto grid max-w-4xl gap-8 sm:grid-cols-3">
        {features.map((feature) => (
          <div key={feature.title} className="text-center sm:text-left">
            <feature.icon size={24} className="mx-auto text-[var(--color-accent)] sm:mx-0" />
            <h3 className="mt-3 font-serif text-lg font-semibold text-[var(--color-text-primary)]">
              {feature.title}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
