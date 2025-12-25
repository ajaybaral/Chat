import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-backgroundLight1 via-backgroundLight2 to-backgroundLight3 dark:from-backgroundDark3 dark:via-backgroundDark2 dark:to-backgroundDark1">
      {/* Floating Circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary opacity-10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-32 right-20 w-96 h-96 bg-accent opacity-10 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-primary opacity-5 rounded-full blur-2xl animate-pulse-slow"></div>
      
      {/* Chat Bubble Doodles */}
      <svg className="absolute top-10 right-10 w-20 h-20 text-primary opacity-20 animate-bounce-slow" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.31 0-2.56-.29-3.67-.8l-.26-.14-2.68.45.45-2.68-.14-.26C5.29 14.56 5 13.31 5 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7z"/>
      </svg>

      <svg className="absolute bottom-20 left-20 w-16 h-16 text-accent opacity-20 animate-wiggle" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>

      {/* Message Icons */}
      <div className="absolute top-1/4 left-1/4 text-primary opacity-15">
        <svg className="w-12 h-12 animate-float" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="2"/>
          <circle cx="6" cy="12" r="2"/>
          <circle cx="18" cy="12" r="2"/>
        </svg>
      </div>

      <div className="absolute bottom-1/3 right-1/4 text-accent opacity-15 animate-float-delayed">
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
        </svg>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

export default AnimatedBackground;
