import { Heart, Shield, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Growing Community",
    description: "We hope our community never stops growing. Our help will always be here for you.",
  },
  {
    icon: Heart,
    title: "Developed with Care",
    description: "We always double check before deploying an update, keeping our bot from breaking down and our members always happy.",
  },
  {
    icon: Zap,
    title: "Premium Experience",
    description: "Your experience using our bot is guaranteed to be great. Fast, reliable, and always improving.",
  },
  {
    icon: Shield,
    title: "Trusted & Reliable",
    description: "Trusted by more than 83 servers",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary text-sm font-medium tracking-wider uppercase">Features</span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-foreground">
            Why choose TEAL?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We guarentee our bot is fun, and comptetive. Our members love it!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative glass rounded-2xl p-8 hover:bg-secondary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
