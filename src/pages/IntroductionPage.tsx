import React, { useState } from "react";
import Page from "../components/Intro/Page";
import IntroTab from "../components/Intro/IntroTab";
export const slides = [
  {
    title: "Introduction ",
    content:
      "In this section, you will learn about right-angled triangles, their properties, and how to apply the Pythagoras Theorem to solve problems. A right-angled triangle has one angle equal to 90°, and the relationship between its sides is crucial for many geometric calculations.",
    audioUrl: "./audio/introAudio.mp3",
  },
  {
    title: "Pythagoras Theorem",
    content:
      "In a right-angled triangle, the square of the hypotenuse is equal to the sum of the squares of the other two sides.",
    formula: "In mathematical terms: a² + b² = c² ",
    audioUrl: "./audio/Audio2.mp3",
  },
  {
    title: "Understanding the Triangle's Sides",
    content:
      "Hover over each side of the triangle to learn more about the relationship between the sides of a right-angled triangle.",
    formula:
      "Where: c is the hypotenuse, a is the perpendicular, and b is the base",
    audioUrl: "./audio/Audio3.mp3",
  },
];

export default function IntroductionPage() {
  const [isIntroTab, setIsIntroTab] = useState(true);
  return (
    <>
      {isIntroTab ? (
        <IntroTab isIntroTab={isIntroTab} setIsIntroTab={setIsIntroTab} />
      ) : (
        <Page />
      )}
    </>
  );
}
