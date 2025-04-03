const HUD = ({ metrics }) => {
  return (
    <div
      className='flex justify-center items-start'
      style={{
        position: "fixed",
        top: "0",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: "99999999",
      }}
    >
      <MetricItem
        label='Distance'
        value={metrics.distance}
        clipPath={`polygon(0 0, 93% 0, 100% 100%, 15% 100%)`}
        className='bg-[#303030]'
      />
      <MetricItem
        label='Running'
        value={metrics.runtime}
        clipPath={`polygon(0 0, 93% 0, 100% 100%, 15% 100%)`}
        className='bg-[#303030]'
      />
      <MetricItem
        label='Latitude'
        value={metrics.latitude}
        clipPath={`polygon(0 0, 93% 0, 100% 100%, 15% 100%)`}
        className='h-[75px] bg-[#767676] border-b-[5px] border-black'
      />
      <MetricItem
        label='STATUS'
        value={metrics.status}
        isStatus={true}
        clipPath={`polygon(0 0, 100% 0, 76% 100%, 24% 100%)`}
        clipPathStatus={`polygon(9% 0, 91% 0, 80% 100%, 20% 100%)`}
        className='h-[85px] bg-[#8E918F] z-20 border-b-[5px] border-black'
      />
      <MetricItem
        label='Longitude'
        value={metrics.longitude}
        clipPath={`polygon(24% 0px, 100% 0px, 86% 100%, 0px 100%)`}
        className='h-[75px] bg-[#767676] z-10 border-b-[5px] border-black'
      />
      <MetricItem
        label='Elevation'
        value={metrics.elevation}
        clipPath={`polygon(24% 0px, 100% 0px, 86% 100%, 0px 100%)`}
        className='bg-[#303030]'
      />
      <MetricItem
        label='Temperature'
        value={metrics.temperature}
        clipPath={`polygon(24% 0px, 100% 0px, 86% 100%, 0px 100%)`}
        className='bg-[#303030]'
      />
    </div>
  );
};

const MetricItem = ({
  label,
  value,
  isStatus,
  clipPath,
  clipPathStatus,
  className = "",
}) => (
  <div
    className={`text-center relative ${
      isStatus ? "w-28" : "w-32"
    } -mr-8 ${className}`}
    style={{ clipPath }}
  >
    <div className='px-4 py-2 h-full flex flex-col justify-center'>
      <div
        className={`text-xs text-gray-400 mb-1 ${
          isStatus && "text-md text-gray-200"
        }`}
      >
        {label}
      </div>
      {isStatus ? (
        <div
          className='font-bold text-white bg-green-500 relative'
          style={{ clipPath: clipPathStatus }}
        >
          <div className='px-2 py-1'>{value}</div>
        </div>
      ) : (
        <div className='font-bold text-white'>{value}</div>
      )}
    </div>
  </div>
);

export default HUD;
