import { useState } from "react";
import "./App.css";
import AnimatedCard from "./Test";

const cards = [
  {
    title: ["All Courses"],
    description: ["courses you're powering", "through right now."],
    count: "23",
    key: 1,
    color: "#F9EBEC",
    textColor: "#C33241",
  },
  {
    title: ["Upcoming", "Courses"],
    description: ["exciting new courses", "waiting to boost your skills."],
    count: "05",
    key: 2,
    color: "#EBF9F1",
    textColor: "#32C37A",
  },
  {
    title: ["Ongoing", "Courses"],
    description: ["currently happening—don't", "miss out on the action!"],
    count: "10",
    key: 3,
    color: "#EBF3F9",
    textColor: "#3283C3",
  },
];

export default function App() {
  const [current, setCurrent] = useState(1);
  const [previous, setPrevious] = useState(1);

  const handleCardChange = (newKey: number) => {
    setPrevious(current);
    setCurrent(newKey);
  };

  return (
    <div className="mx-auto p-8 px-64">
      {/* ...existing code... */}
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
