import React from "react";

const CircularIndicator = ({
  value,
  label,
  iconClass,
  showSideTicks,
  showTwoAngle,
  rightValue,
  leftValue,
}) => {
  return (
    <div className='relative flex flex-col items-center w-24 h-24'>
      <svg width='100%' height='100%' viewBox='0 0 100 100'>
        <defs>
          <marker
            id='arrowhead'
            orient='auto'
            markerWidth='3'
            markerHeight='4'
            refX='0.1'
            refY='2'
          >
            <path d='M0,0 V4 L2,2 Z' fill='yellow' />
          </marker>
        </defs>
        <circle cx='50' cy='50' r='40' fill='none' />

        {showTwoAngle ? (
          <g>
            {[185, 5].map((angle) => {
              const innerRadius = 30;
              const outerRadius = 50;
              const x1 = 50 + innerRadius * Math.cos((angle * Math.PI) / 180);
              const y1 = 50 + innerRadius * Math.sin((angle * Math.PI) / 180);
              const x2 = 50 + outerRadius * Math.cos((angle * Math.PI) / 180);
              const y2 = 50 + outerRadius * Math.sin((angle * Math.PI) / 180);

              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke='yellow'
                  strokeWidth='3'
                />
              );
            })}
          </g>
        ) : (
          <g>
            {[45, 135, 225, 315].map((angle, index) => {
              const innerRadius = 30;
              const outerRadius = 50;
              const x1 = 50 + innerRadius * Math.cos((angle * Math.PI) / 180);
              const y1 = 50 + innerRadius * Math.sin((angle * Math.PI) / 180);
              const x2 = 50 + outerRadius * Math.cos((angle * Math.PI) / 180);
              const y2 = 50 + outerRadius * Math.sin((angle * Math.PI) / 180);

              if (index === 2) {
                return (
                  <line
                    key={angle}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke='yellow'
                    strokeWidth='3'
                    markerEnd='url(#arrowhead)'
                  />
                );
              }

              return (
                <line
                  key={angle}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke='yellow'
                  strokeWidth='3'
                />
              );
            })}
          </g>
        )}

        {showSideTicks
          ? [180, 0].flatMap((sideAngle) =>
              [...Array(7)].map((_, i) => {
                const tickSpacing = 15;
                const angleOffset = (i - 3) * tickSpacing;
                const angle = sideAngle + angleOffset;

                const x1 = 50 + 35 * Math.cos((angle * Math.PI) / 180);
                const y1 = 50 + 35 * Math.sin((angle * Math.PI) / 180);
                const x2 = 50 + 40 * Math.cos((angle * Math.PI) / 180);
                const y2 = 50 + 40 * Math.sin((angle * Math.PI) / 180);

                return (
                  <line
                    key={`${sideAngle}-${i}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke='white'
                    strokeWidth='2'
                  />
                );
              })
            )
          : [...Array(36)].map((_, i) => {
              const angle = i * 20;
              const x1 = 50 + 35 * Math.cos((angle * Math.PI) / 180);
              const y1 = 50 + 35 * Math.sin((angle * Math.PI) / 180);
              const x2 = 50 + 40 * Math.cos((angle * Math.PI) / 180);
              const y2 = 50 + 40 * Math.sin((angle * Math.PI) / 180);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke='white'
                  strokeWidth='2'
                />
              );
            })}
      </svg>

      <span
        className={`absolute top-1/2 transform -translate-y-1/2 text-white text-xl font-bold`}
      >
        {iconClass ? (
          <div className='flex flex-col items-center'>
            <i className={iconClass}></i>
            <span
              className={`text-md absolute ${
                rightValue
                  ? "left-20 top-0"
                  : leftValue
                  ? "right-20 -top-2"
                  : "top-1/2"
              }`}
            >
              {value}°
            </span>
          </div>
        ) : (
          <div className='flex flex-col items-center'>
            <span className='text-md'>{value}°</span>
            <span className='text-xs text-center'>{label}</span>
          </div>
        )}
      </span>
    </div>
  );
};

export default CircularIndicator;
