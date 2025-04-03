import { useEffect, useState } from "react";
import HUD from "./components/HUD";
import ButtonGroup from "./components/ButtonGroup";
import Joystick from "./components/Joystick";

const App = () => {
  const [mode, setMode] = useState("Manual");
  const [speed, setSpeed] = useState(1);
  const [lighting, setLighting] = useState("Laser");
  const [mapView, setMapView] = useState("Camera");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [emergencyStop, setEmergencyStop] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());

  const systemMetrics = {
    distance: "12.5 m",
    runtime: "2:45:12",
    latitude: "28.832644",
    longitude: "33.540729",
    status: "Ok",
    elevation: "126 m",
    temperature: "42°C",
  };

  const handleZoom = (type) => {
    setZoomLevel((prev) => {
      let newZoom = prev;
      if (type === "in") newZoom = Math.min(prev + 0.1, 3);
      if (type === "out") newZoom = Math.max(prev - 0.1, 0.5);
      if (type === "reset") newZoom = 1;
      return newZoom;
    });
  };

  const handleMenuClick = () => {};

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formattedDate = dateTime.toLocaleDateString("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  });
  const formattedTime = dateTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className='min-h-screen  text-white'>
      {/* Top HUD */}
      <header className='px-5 bg-[#131314] border-b-[5px] border-black position-relative h-[66px] flex items-center justify-between'>
        <div className='banner-navbar'></div>

        <HUD metrics={systemMetrics} />

        <div className='mx-2 flex items-center gap-3'>
          <div className='p-1'>
            <i className='fas fa-bell text-xl'></i>
          </div>
          <div className='p-1'>
            <i className='fas fa-wifi text-xl'></i>
          </div>
          <div className='p-1'>
            <i className='fas fa-battery-half block text-xl -mb-3'></i>
            <span className='text-xs'>50%</span>
          </div>
          <div className='p-1 text-end text-sm'>
            <span className='block'>{formattedDate}</span>
            <span>{formattedTime}</span>
          </div>
        </div>
      </header>

      <main className='main px-5 pt-5'>
        <div className='main-content flex flex-col justify-between'>
          <div className='flex justify-between mt-4'>
            {/* Left Control Panel */}
            <div className='flex flex-col items-start'>
              {/* Menu Button */}
              <ButtonGroup
                buttons={[{ label: "MENU" }]}
                onButtonClick={handleMenuClick}
                isSingleBtn={true}
                className={`w-32 mb-8`}
              />

              {/* Drive Mode Buttons */}
              <ButtonGroup
                buttons={[
                  { label: "Auto", active: mode === "Auto" },
                  { label: "Semi-Auto", active: mode === "Semi-Auto" },
                  { label: "Manual", active: mode === "Manual" },
                ]}
                onButtonClick={setMode}
                className={`w-32 mb-8`}
              />

              {/* Speed Selector Buttons */}
              <ButtonGroup
                buttons={[
                  { label: "2x", active: speed === 2 },
                  { label: "1x", active: speed === 1 },
                  { label: "0.5x", active: speed === 0.5 },
                ]}
                onButtonClick={(label) => setSpeed(parseFloat(label))}
                className={`w-[70px]`}
              />
            </div>

            {/* right Control Panel */}
            <div className='flex flex-col items-end'>
              {/* emergency Stop Button */}
              <ButtonGroup
                buttons={[
                  {
                    label: "STOP",
                    active: emergencyStop,
                    activeClass: "bg-red-600 text-white",
                    inactiveClass: "bg-red-800 hover:bg-red-700 text-white",
                  },
                ]}
                onButtonClick={() => setEmergencyStop(!emergencyStop)}
                className={`w-32 mb-8`}
                isSingleBtn={true}
                isFixedWidth={true}
              />

              {/* Lighting Buttons */}
              <ButtonGroup
                buttons={[
                  { label: "Light", active: lighting === "Light" },
                  { label: "Spot-Light", active: lighting === "Spot-Light" },
                  { label: "Laser", active: lighting === "Laser" },
                ]}
                onButtonClick={setLighting}
                className={`w-32 mb-8`}
              />

              {/* Zoom Buttons */}
              <ButtonGroup
                buttons={[
                  { icon: "fas fa-expand" },
                  { icon: "fas fa-search-plus" },
                  { icon: "fas fa-search-minus" },
                ]}
                onButtonClick={handleZoom}
                className={`w-[70px]`}
                isReverse={true}
                isSingleBtn={true}
              />
            </div>
          </div>

          <div className='flex justify-between items-end mt-4 p-5 px-20'>
            {/* Left Joystick */}
            <Joystick />

            {/* Map Buttons */}
            <div className='mx-auto'>
              <div className='rounded-lg p-4 text-center'>
                <div className='block text-4xl font-bold my-2'>
                  {speed} <br></br>m/s
                </div>
              </div>
              <ButtonGroup
                buttons={[
                  { label: "3D Map", active: mapView === "3D Map" },
                  { label: "Camera", active: mapView === "Camera" },
                  { label: "2D Map", active: mapView === "2D Map" },
                ]}
                onButtonClick={setMapView}
                className={`w-[350px]`}
                isHorizontal={true}
                isReverse={true}
              />
            </div>

            {/* right Joystick */}
            <Joystick />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
