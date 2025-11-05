import { useState, useRef, useEffect } from 'react';
import { Rocket, Telescope, Satellite, Zap, MessageSquare } from 'lucide-react';

// --- Data Definition ---
const NAV_ITEMS = [
  { id: 'home', label: 'Origin', Icon: Rocket },
  { id: 'about', label: 'Explorer', Icon: Telescope },
  { id: 'projects', label: 'Missions', Icon: Satellite },
  { id: 'skills', label: 'Arsenal', Icon: Zap },
  { id: 'contact', label: 'Transmission', Icon: MessageSquare },
];

// --- Component Props ---
interface NavigationProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  // Effect to move the indicator when the active section changes
  useEffect(() => {
    const containerNode = containerRef.current;
    if (!containerNode) {
      return;
    }

    const activeButton = containerNode.querySelector(`[data-section-id='${activeSection}']`) as HTMLElement;
    if (activeButton) {
      setIndicatorStyle({
        left: `${activeButton.offsetLeft}px`,
        width: `${activeButton.offsetWidth}px`,
      });
    }
  }, [activeSection]);

  return (
    <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[96%] max-w-2xl sm:w-auto sm:top-6">
      <div
        ref={containerRef}
        className="relative flex items-center justify-between sm:justify-center gap-0.5 sm:gap-0 p-0.5 sm:p-1 bg-black/20 backdrop-blur-lg border border-white/10 rounded-full shadow-2xl shadow-black/30"
      >
        {/* Sliding Indicator */}
        <div
          className="absolute top-0.5 sm:top-1 left-0 h-[calc(100%-4px)] sm:h-[calc(100%-8px)] rounded-full bg-white/10 ring-1 ring-blue-500/50 transition-all duration-500 ease-in-out"
          style={indicatorStyle}
        />

        {/* Navigation Buttons */}
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              data-section-id={id}
              onClick={() => onNavigate(id)}
              className={`relative z-10 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-sm font-medium transition-colors duration-300 flex-1 sm:flex-initial whitespace-nowrap
                ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'}
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75`}
            >
              <Icon 
                size={12} 
                className={`sm:w-4 sm:h-4 ${isActive ? 'text-blue-300' : ''}`} 
              />
              <span className="tracking-wide">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}