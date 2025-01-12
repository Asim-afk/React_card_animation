import gsap from "gsap";
import { useCallback, useEffect, useRef } from "react";

type Card = {
  title: string[];
  description: string[];
  count: string;
  key: number;
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
  const viewAllRef = useRef(null);
  const imageRef = useRef(null);
  const isInitialMount = useRef(true);
  const overlayRef = useRef(null);
  const cardClick = useCallback(
    (isInit: boolean) => {
      const container = containerRef.current;
      const text = textRef.current;
      const overlay = overlayRef.current;
      const image = imageRef.current;
      const viewAll = viewAllRef.current;

      gsap.killTweensOf([container, text, overlay, image, viewAll]);

      if (!isInit && card.key !== current && card.key !== previous) {
        return;
      }

      if (!isInit && card.key === current && card.key === previous) {
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

        gsap.fromTo(
          image,
          {
            x: previous > current ? "100%" : "-100%",
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.inOut",
          }
        );

        gsap.to(overlay, {
          clipPath: "circle(0% at bottom left)",
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(viewAll, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        });

        const tl = gsap.timeline();
        tl.to(text, {
          rotation: -95,
          y: -160,
          x: -90,
          transformOrigin: "left bottom",
          duration: 0.3,
          ease: "power2.inOut",
        })
          .to(text, {
            rotation: 5,
            y: 0,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
          })
          .to(text, {
            rotation: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
      } else if (isInit || card.key === previous) {
        gsap.to(container, {
          flex: 1,
          width: 280,
          color: "#C33241",
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(image, {
          x: previous > current ? "-100%" : "100%",
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(viewAll, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        });

        gsap.to(overlay, {
          clipPath: "circle(200% at bottom left)",
          duration: 0.8,
          ease: "power3.inOut",
        });

        const tl = gsap.timeline();
        tl.to(text, {
          rotation: 5,
          y: 0,
          x: 0,
          duration: 0.3,
          ease: "power2.inOut",
        })
          .to(text, {
            rotation: -95,
            y: -160,
            x: -90,
            duration: 0.6,
            ease: "power2.out",
          })
          .to(text, {
            rotation: -90,
            duration: 0.3,
            ease: "power2.inOut",
          });
      }
    },
    [card, current, previous]
  );
  const handleClick = () => {
    if (current === card.key || current === previous) return;
    cardClick(false);
    setCurrent(card.key);
  };

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
          clipPath: "circle(200% at bottom left)",
        }}
      />
      <div className="min-h-[460px]  flex flex-col justify-between  relative z-10">
        <div
          ref={viewAllRef}
          className="ml-auto font-bold text-xl pr-6 pt-6 flex items-center gap-4"
        >
          <span className="group flex items-center">
            View all Courses
            <span className="ml-1  animate-none group-hover:animate-arrow">
              →
            </span>
          </span>
        </div>
        <div
          ref={imageRef}
          className="flex items-center mt-auto justify-center h-[125px] w-[full] overflow-hidden"
        >
          <img className="object-cover h-full" src={"center.png"} alt="card" />
        </div>
        <div className="flex gap-20 items-center px-12">
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
