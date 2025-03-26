import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ToggleButtonProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="text-gray-600 hover:text-gray-800 flex items-center"
      onClick={() => setIsOpen(!isOpen)}
    >
      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
    </button>
  );
};

export default ToggleButton;
