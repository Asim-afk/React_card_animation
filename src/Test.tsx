import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";

type Card = {
  title: string[];
  description: string[];
  count: string;
  key: number;
  color: string;
  textColor: string;
};

const AnimatedCard = ({
  current,
  previous,
  setCurrent,
  card,
}: {
  current: number;
  previous: number;
  setCurrent: (data: number) => void;
  card: Card;
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const countRef = useRef(null);
  const isInitialMount = useRef(true);
  const overlayRef = useRef(null);
  const cardClick = useCallback(
    (isInit: boolean) => {
      const container = containerRef.current;
      const text = textRef.current;
      const overlay = overlayRef.current;

      if (!isInit && card.key !== current && card.key !== previous) {
        return;
      }

      if (card.key === current) {
        gsap.to(container, {
          flex: 1,
          width: 592,
          color: "#F9EBEC",
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(overlay, {
          clipPath: "circle(0% at bottom left)",
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(text, {
          rotation: 0,
          transformOrigin: "left bottom",
          y: 0,
          x: 0,
          duration: 0.8,
          ease: "power3.inOut",
        });
      } else if (isInit ? true : card.key === previous) {
        gsap.to(container, {
          flex: 1,
          width: 280,
          color: "#C33241",
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(overlay, {
          clipPath: "circle(150% at bottom left)",
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(text, {
          rotation: -90,
          transformOrigin: "left bottom",
          y: -160,
          x: -75,
          duration: 0.8,
          ease: "power3.inOut",
        });
      }
    },
    [card, current, previous]
  );

  const handleClick = () => {
    if (current === card.key) return;
    cardClick(false);
    setCurrent(card.key);
  };

  const isSelected = current === card.key;

  useEffect(() => {
    if (isInitialMount.current) {
      cardClick(true);
      isInitialMount.current = false;
    } else {
      cardClick(false);
    }
  }, [cardClick, current]);
  return (
    <div
      onClick={handleClick}
      ref={containerRef}
      className={`
      mx-5
      float-left
      rounded-3xl 
      p-1 
      cursor-pointer
      hover:shadow-lg
      transition-shadow
      relative
      overflow-hidden
      text-[#F9EBEC]
      bg-[#C33241]
    `}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 text-[#C33241] bg-[#F9EBEC]"
        style={{
          clipPath: "circle(150% at bottom left)",
        }}
      />
      <div className="min-h-[460px] flex flex-col  relative z-10">
        <div className=" top-8">
          {isSelected && (
            <div className="flex items-center gap-4">
              <a href="#" className="group flex items-center">
                View all Courses
                <span className="ml-1 font-bold text-xl animate-none group-hover:animate-arrow">
                  →
                </span>
              </a>
            </div>
          )}
        </div>
        <div className="flex mt-auto gap-20 items-center p-2">
          <div ref={countRef} className="font-[700] text-[150px] relative">
            {card.count}
            <span className="text-[64px] absolute top-0 ml-2">+</span>
          </div>
          <div ref={textRef}>
            <div className="w-[250px]">
              {card.title.map((title) => (
                <h3 className="text-[32px] font-[700] ">{title}</h3>
              ))}
              {card.description.map((desc) => (
                <p className="font-[400] text-[18px]">{desc}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedCard;
