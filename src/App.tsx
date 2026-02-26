import { useState, useEffect } from 'react';
import './App.css';
import Slide1 from './slides/Slide1.tsx';
import Slide2 from './slides/Slide2.tsx';
import Slide3 from './slides/Slide3.tsx';
import Slide4 from './slides/Slide4.tsx';
import Slide5 from './slides/Slide5.tsx';
import Slide6 from './slides/Slide6.tsx';
import Slide8 from './slides/Slide8.tsx';
import Slide9 from './slides/Slide9.tsx';
import Slide12 from './slides/Slide12.tsx';
import Slide14 from './slides/Slide14.tsx';
import Slide15 from './slides/Slide15.tsx';
import Slide16 from './slides/Slide16.tsx';
import Slide17 from './slides/Slide17.tsx';

interface SlideConfig {
  id: number;
  component: () => JSX.Element;
  title: string;
}

const slides: SlideConfig[] = [
  { id: 1, component: Slide1, title: 'Bican Loan Management System' },
  { id: 2, component: Slide2, title: 'Project Overview' },
  { id: 3, component: Slide3, title: 'Technical Stack' },
  { id: 4, component: Slide16, title: 'Key Features & Improvements' },
  { id: 5, component: Slide17, title: 'UI Comparison: Old vs New' },
  { id: 6, component: Slide4, title: 'Administration & Governance' },
  { id: 7, component: Slide5, title: 'Member Master' },
  { id: 8, component: Slide6, title: 'Loan Lifecycle Management' },
  { id: 9, component: Slide8, title: 'Intelligent Transaction Engine' },
  { id: 10, component: Slide9, title: 'Automated Demand & Recovery' },
  { id: 11, component: Slide12, title: 'Communication Hub' },
  { id: 12, component: Slide14, title: 'User Experience' },
  { id: 13, component: Slide15, title: 'Conclusion & Future Roadmap' },
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const totalSlides = slides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setDirection('next');
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection('prev');
      setCurrentSlide(currentSlide - 1);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case '?':
          setShowHelp(!showHelp);
          break;
        case 'Home':
          setCurrentSlide(0);
          break;
        case 'End':
          setCurrentSlide(totalSlides - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, showHelp]);

  useEffect(() => {
    setShowHelp(true);
    const timer = setTimeout(() => setShowHelp(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const CurrentSlideComponent = slides[currentSlide].component;
  const progress = ((currentSlide + 1) / totalSlides) * 100;

  return (
    <div className="app">
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <button className="fullscreen-btn" onClick={toggleFullscreen}>
        {isFullscreen ? '⛶ Exit Fullscreen' : '⛶ Fullscreen'}
      </button>

      {showHelp && (
        <div className="shortcuts-hint">
          <div><span className="key">←</span> Previous Slide</div>
          <div><span className="key">→</span> Next Slide</div>
          <div><span className="key">F</span> Fullscreen</div>
          <div><span className="key">?</span> Toggle Help</div>
        </div>
      )}

      <div className={`slide-container ${direction}`} key={currentSlide}>
        <CurrentSlideComponent />
      </div>

      <div className="nav-controls">
        <button 
          className="nav-btn" 
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          ←
        </button>
        <div className="slide-counter">
          {currentSlide + 1} / {totalSlides}
        </div>
        <button 
          className="nav-btn" 
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default App;
