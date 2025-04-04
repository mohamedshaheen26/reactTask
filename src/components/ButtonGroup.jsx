const ButtonGroup = ({
  buttons = [],
  onButtonClick,
  isSingleBtn = false,
  className = false,
  isHorizontal = false,
  isReverse = false,
}) => {
  return (
    <div
      className={`border-[5px] border-black/70 bg-[#8E918F]/30 backdrop-blur-xxs rounded-xl shadow-inner ${
        isHorizontal && "flex"
      } ${className} ${!isSingleBtn && "parent"}`}
    >
      {buttons.map((button, index) => {
        const {
          label = "",
          icon = "",
          active = false,
          activeClass = "",
          inactiveClass = "",
        } = button;

        return (
          <button
            key={index}
            onClick={() => {
              onButtonClick(button.label ? button.label : button);
            }}
            className={`w-full p-2 ${
              active ? activeClass : inactiveClass
            } child ${
              isHorizontal & isReverse
                ? "flex flex-col-reverse items-center gap-0"
                : isReverse
                ? "flex flex-row-reverse items-center gap-2"
                : "flex items-center gap-2"
            } transition-all border-b last:border-b-0 border-[black]
          `}
          >
            <span className='m-auto text-white'>
              
              {icon ? <i className={`fas ${icon}`}></i> : label}
            </span>

            {!isSingleBtn && (
              <span className={`flex ${isHorizontal && "rotate-[270deg]"}`}>
                {[...Array(2)].map((_, i) => (
                  <i
                    key={i}
                    className={`fas fa-ellipsis-v ${
                      active ? "text-yellow-500" : "text-black"
                    }`}
                  ></i>
                ))}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
