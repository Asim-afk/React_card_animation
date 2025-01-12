import { useState } from "react";
import "./App.css";
import AnimatedCard from "./CardAnimation";

const cards = [
  {
    title: ["All Courses"],
    description: ["courses you're powering", "through right now."],
    count: "23",
    key: 1,
  },
  {
    title: ["Upcoming", "Courses"],
    description: ["exciting new courses", "waiting to boost your skills."],
    count: "05",
    key: 2,
  },
  {
    title: ["Ongoing", "Courses"],
    description: ["currently happening—don't", "miss out on the action!"],
    count: "10",
    key: 3,
  },
];

export default function App() {
  const [current, setCurrent] = useState(1);
  const [previous, setPrevious] = useState(0);

  const handleCardChange = (newKey: number) => {
    setPrevious(current);
    setCurrent(newKey);
  };

  return (
    <div className="mx-auto p-8 ">
      <div className="mb-8 pl-5">
        <h2 className="text-gray-800 text-2xl mb-4">
          Explore our classes and master trending skills!
        </h2>
        <h1 className="text-4xl font-bold">
          Dive Into{" "}
          <span className="text-emerald-500">What&apos;s Hot Right Now!</span>
          🔥
        </h1>
      </div>
      {cards.map((card) => (
        <AnimatedCard
          card={card}
          current={current}
          previous={previous}
          setCurrent={handleCardChange}
          key={card.key}
        />
      ))}
    </div>
  );
}
