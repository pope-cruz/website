"use client";

import { useRef } from "react";

type KineticNameProps = {
  name: string;
};

export function KineticName({ name }: KineticNameProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  function handlePointerMove(event: React.PointerEvent<HTMLHeadingElement>) {
    if (event.pointerType === "touch") return;

    const letters = headingRef.current?.querySelectorAll<HTMLElement>("[data-letter]");
    if (!letters) return;

    letters.forEach((letter) => {
      const bounds = letter.getBoundingClientRect();
      const center = bounds.left + bounds.width / 2;
      const distance = Math.abs(event.clientX - center);
      const influence = Math.max(0, 1 - distance / 150);

      letter.style.setProperty("--letter-weight", String(Math.round(510 + influence * 340)));
      letter.style.setProperty("--letter-lift", `${(-influence * 0.075).toFixed(3)}em`);
    });
  }

  function resetLetters() {
    const letters = headingRef.current?.querySelectorAll<HTMLElement>("[data-letter]");

    letters?.forEach((letter) => {
      letter.style.removeProperty("--letter-weight");
      letter.style.removeProperty("--letter-lift");
    });
  }

  return (
    <h1
      id="page-title"
      ref={headingRef}
      className="kinetic-name"
      aria-label={name}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetLetters}
    >
      {Array.from(name).map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className={letter === " " ? "name-space" : "name-letter"}
          data-letter={letter === " " ? undefined : ""}
          aria-hidden="true"
        >
          {letter === " " ? "\u00a0" : letter}
        </span>
      ))}
    </h1>
  );
}
