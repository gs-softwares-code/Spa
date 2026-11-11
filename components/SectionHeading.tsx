import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  const alignCls = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleCls = tone === "light" ? "text-ivory" : "text-earth";
  const introCls = tone === "light" ? "text-sand/80" : "text-muted";
  return (
    <Reveal className={`flex flex-col gap-4 ${alignCls}`}>
      {eyebrow && (
        <span className="eyebrow flex items-center gap-3">
          <span className="gold-rule w-8" />
          {eyebrow}
          {align === "center" && <span className="gold-rule w-8" />}
        </span>
      )}
      <h2 className={`text-balance text-4xl leading-tight sm:text-5xl ${titleCls}`}>{title}</h2>
      {intro && <p className={`max-w-2xl text-base leading-relaxed ${introCls}`}>{intro}</p>}
    </Reveal>
  );
}
