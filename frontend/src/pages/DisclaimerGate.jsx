// src/pages/DisclaimerGate.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DisclaimerGate = ({ onAccept, onDecline }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleDecline = (e) => {
    e.stopPropagation();
    if (onDecline) onDecline();
  };

  const handleAccept = (e) => {
    e.stopPropagation();
    if (onAccept) onAccept();
  };

  const toggleOpen = () => setIsOpen((o) => !o);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="card transform translate-y-12 ">
        <div
          // Added px-4 for horizontal padding on small screens (mobile)
          className="relative bg-black w-[450px] sm:w-[750px] mx-auto group transition-all duration-700 aspect-video flex items-center justify-center px-4
  lg:hover:transform lg:hover:scale-105 scale-[0.85] sm:scale-100"
          onClick={toggleOpen}
        >
          {/* PAPER */}
          <div
            className={`
              transition-all flex flex-col items-center py-5 justify-start
              bg-gray-200 w-full h-full absolute rounded-md
              ${isOpen ? '-translate-y-40 duration-1000' : 'translate-y-0 duration-300'}
              lg:group-hover:-translate-y-40 lg:group-hover:duration-1000
            `}
          >
            <div className="w-11/12 md:w-4/5 text-center">
              <p className="text-xl sm:text-2xl font-semibold text-gray-500">
                Legal Disclaimer
              </p>
              <p className="px-10 text-[12px] sm:text-base text-gray-700 pt-2">
                The material, commentary, and resources contained on this website are provided solely for general information and academic exchange. They do not constitute legal advice, do not solicit professional engagement, and do not establish a lawyer-client relationship. Readers should seek tailored counsel before relying on any content herein and are responsible for their own due diligence.
              </p>
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  onClick={handleAccept}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Decline
                </button>
              </div>
            </div>
          </div>

          {/* SEAL */}
          <button
            className={`
              seal bg-[#ff7300] w-16 aspect-square rounded-full z-40
              flex items-center justify-center overflow-hidden
              [clip-path:polygon(50%_0%,_80%_10%,_100%_35%,_100%_70%,_80%_90%,_50%_100%,_20%_90%,_0%_70%,_0%_35%,_20%_10%)]
              border-4 border-[#ff7300]  transition-all duration-1000
              ${isOpen ? 'opacity-0 scale-0 rotate-180' : 'opacity-100 scale-100 rotate-0'}
              lg:group-hover:opacity-0 lg:group-hover:scale-0 lg:group-hover:rotate-180
            `}
          >
            <img
              src="/logoWhite.png"   // <-- put your logo path here (e.g. /assets/logo.png)
              alt="Logo"
              className="w-12 h-12 object-contain"
            />
          </button>

          {/* ENVELOPE FLAPS */}
          <div
            className={`
              tp absolute w-full h-full bg-neutral-800 transition-all
              ${isOpen ? '[clip-path:polygon(50%_0%,_100%_0,_0_0)] duration-100' : '[clip-path:polygon(50%_50%,_100%_0,_0_0)] duration-1000'}
              lg:group-hover:[clip-path:polygon(50%_0%,_100%_0,_0_0)] lg:group-hover:duration-100
            `}
          />
          <div className="lft transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_0_0,_0_100%)]" />
          <div className="rgt transition-all duration-700 absolute w-full h-full bg-neutral-800 [clip-path:polygon(50%_50%,_100%_0,_100%_100%)]" />
          <div className="btm transition-all duration-700 absolute w-full h-full bg-neutral-900 [clip-path:polygon(50%_50%,_100%_100%,_0_100%)]" />
        </div>
      </div>
    </div>
  );
};

export default DisclaimerGate;
