import { useState, useRef, useEffect } from "react";

const Joystick = () => {
  const joystickRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  const handleStart = (e) => {
    setIsActive(true);
    updatePosition(e);
  };

  const handleMove = (e) => {
    if (!isActive) return;
    updatePosition(e);
  };

  const handleEnd = () => {
    setIsActive(false);
    setPosition({ x: 0, y: 0 });
  };

  const updatePosition = (e) => {
    if (!joystickRef.current) return;

    const rect = joystickRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = (clientX - centerX) / (rect.width / 2);
    const y = (clientY - centerY) / (rect.height / 2);

    const distance = Math.min(Math.sqrt(x * x + y * y), 1);
    const angle = Math.atan2(y, x);

    setPosition({
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("touchend", handleEnd);
    };
  }, [isActive]);

  return (
    <div className='text-center mb-8'>
      <div
        ref={joystickRef}
        className='relative w-48 h-48 bg-[#8E918F]/30 border-[5px] border-black/70 rounded-full mx-auto'
        onMouseDown={handleStart}
        onTouchStart={handleStart}
      >
        <div
          className='absolute w-full h-full'
          style={{
            transform: `translate(${position.x * 20}px, ${position.y * 20}px)`,
            transition: isActive ? "none" : "transform 0.2s ease-out",
          }}
        >
          <div
            className='absolute w-24 h-24 bg-black/30 rounded-full border-2 border-yellow-500'
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%)`,
            }}
          >
            {/* Directional Arrows */}
            <div className='absolute inset-0 flex items-center justify-center'>
              <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white-500'></div>
              </div>
              <div className='absolute -right-2 top-1/2 transform translate-x-1/2 -translate-y-1/2'>
                <div className='w-0 h-0 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent border-b-white-500'></div>
              </div>
              <div className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-1/2'>
                <div className='w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-b-white-500'></div>
              </div>
              <div className='absolute -left-2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-b-white-500'></div>
              </div>
            </div>

            <div
              className='absolute w-12 h-12 bg-[#202124] rounded-full'
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Joystick;
