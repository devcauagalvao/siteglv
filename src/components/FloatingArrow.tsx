import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

type Direction = "left" | "right" | "up" | "down";

type FloatingArrowProps = {
  to?: string;
  ariaLabel?: string;
  className?: string;
  direction?: Direction;
  title?: string;
  useHistoryBack?: boolean; 
  onClick?: () => void;
};

const iconFor = (direction: Direction | undefined) => {
  switch (direction) {
    case "right":
      return ArrowRight;
    case "up":
      return ArrowUp;
    case "down":
      return ArrowDown;
    case "left":
    default:
      return ArrowLeft;
  }
};

const FloatingArrow = ({
  to,
  ariaLabel = "Voltar",
  className = "fixed top-20 sm:top-24 left-4",
  direction = "left",
  title,
  useHistoryBack,
  onClick,
}: FloatingArrowProps) => {
  const navigate = useNavigate();
  const Icon = iconFor(direction);

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (to) {
      navigate(to);
      return;
    }
    if (useHistoryBack) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      title={title || ariaLabel}
      onClick={handleClick}
      className={`${className} z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-md shadow-lg hover:bg-white/20 hover:border-blue-500/40 transition`}
    >
      <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
    </button>
  );
};

export default FloatingArrow;
