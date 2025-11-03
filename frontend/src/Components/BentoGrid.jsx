// src/Components/BentoGrid.jsx
import React, { useEffect, useRef, useState } from 'react';
import { createSwapy } from 'swapy';
import { GripVertical } from 'lucide-react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

import Brand from './CardDesigns/Brand';
import Who from './CardDesigns/Who';
import GetInTouch from './CardDesigns/GetInTouch';
import What from './CardDesigns/What';
import How from './CardDesigns/How';
import Socials from './CardDesigns/Socials';

import ModalContainer from './Modal/ModalContainer';
import BrandModal from './Modal/BrandModal';
import WhoModal from './Modal/WhoModal';
import GetInTouchModal from './Modal/GetInTouchModal';
import WhatModal from './Modal/WhatModal';
import HowModal from './Modal/HowModal';
import SocialsModal from './Modal/SocialsModal';

const MODALS_BY_ID = {
  '1': BrandModal,
  '2': WhoModal,
  '3': WhatModal,
  '4': HowModal,
  '5': GetInTouchModal,
  '6': SocialsModal,
};

// Default box positions:
// 1: Brand, 2: Who, 3: How, 4: GetInTouch, 5: What, 6: Socials
const DEFAULT_LAYOUT = { 1: '1', 2: '2', 3: '4', 4: '5', 5: '3', 6: '6' };

export default function BentoGrid() {
  const navigate = useNavigate();
  const location = useLocation();

  const containerRef = useRef(null);
  const swapyRef = useRef(null);
  const pointer = useRef({ downX: 0, downY: 0, dragging: false, slot: null });

  const [layout, setLayout] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const NON_CLICKABLE = ['1', '6'];

  // Detect mobile view (<768px)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load & persist layout
  useEffect(() => {
    const cookie = Cookies.get('bento_layout');
    if (cookie) {
      try {
        setLayout(JSON.parse(cookie));
        return;
      } catch {
        /* ignore */
      }
    }
    setLayout(DEFAULT_LAYOUT);
  }, []);

  // Enable swapy only on non-mobile
  useEffect(() => {
    if (isMobile || !containerRef.current || !layout) return;

    swapyRef.current = createSwapy(containerRef.current, {
      handle: '.swapy-handle',
      placeholderClass: 'bg-transparent',
      ghostClass: 'bg-transparent',
    });

    swapyRef.current.onSwap = ({ item, fromSlot, toSlot }) => {
      const itemId = item.dataset.swapyItem;
      const from = Number(fromSlot.dataset.swapySlot);
      const to = Number(toSlot.dataset.swapySlot);

      setLayout(prev => {
        const updated = { ...prev, [to]: itemId, [from]: prev[to] };
        Cookies.set('bento_layout', JSON.stringify(updated), { expires: 365 });
        return updated;
      });
    };

    return () => swapyRef.current?.destroy();
  }, [isMobile, layout]);

  if (!layout) return null;

  const handleCardClick = id => {
    setSelectedCard(id);
    setModalOpen(true);
  };

  const renderSummary = id => {
    switch (id) {
      case '1': return <Brand />;
      case '2': return <Who />;
      case '3': return <What />;
      case '4': return <How
        onBlogClick={blog =>
          navigate(`/blog/${blog.slug}`, { state: { background: location } })
        }
        onOpenHowModal={() => handleCardClick('4')}
      />;
      case '5': return <GetInTouch />;
      case '6': return <Socials />;
      default: return null;
    }
  };

  const slotClasses = {
    1: 'lg:col-start-1 lg:col-span-6 lg:row-start-1 lg:row-span-5',
    2: 'lg:col-start-7 lg:col-span-4 lg:row-start-1 lg:row-span-5',
    3: 'lg:col-start-11 lg:col-span-4 lg:row-start-1 lg:row-span-8',
    4: 'lg:col-start-1 lg:col-span-5 lg:row-start-6 lg:row-span-4',
    5: 'lg:col-start-6 lg:col-span-5 lg:row-start-6 lg:row-span-4',
    6: 'lg:col-start-11 lg:col-span-4 lg:row-start-9 lg:row-span-1',
  };
  const heightClasses = {
    '1': 'h-64 md:h-auto',
    '2': 'h-64 md:h-auto',
    '3': 'h-64 md:h-auto',
    '4': 'h-64 md:h-auto',
    '5': 'h-64 md:h-auto',
    '6': 'h-auto',
  };
  const textSizeClasses = {
    '1': 'text-lg',
    '2': 'text-lg',
    '3': 'text-xl',
    '4': 'text-base',
    '5': 'text-base',
    '6': 'text-sm',
  };

  return (
    <>
      <div
        ref={containerRef}
        className="
          h-full grid gap-4
          grid-cols-1
          md:grid-cols-2 md:grid-rows-3 md:[grid-auto-rows:1fr]
          lg:grid-cols-14 lg:grid-rows-9
          px-0 py-6 lg:px-2
        "
      >
        {Object.entries(layout).map(([slot, cardId]) => {
          const isFixed = slot === '6';
          const clickAllowed = !NON_CLICKABLE.includes(cardId);

          return (
            <div
              key={slot}
              className={`${slotClasses[slot]} ${heightClasses[slot]}`}
              {...(!isFixed && !isMobile && { 'data-swapy-slot': slot })}
            >
              <div
                onPointerDown={e => {
                  if (!isFixed) {
                    pointer.current = {
                      downX: e.clientX,
                      downY: e.clientY,
                      dragging: false,
                      slot,
                    };
                  }
                }}
                onPointerMove={e => {
                  const { slot: cur, downX, downY } = pointer.current;
                  if (
                    cur === slot &&
                    Math.hypot(e.clientX - downX, e.clientY - downY) > 5
                  ) {
                    pointer.current.dragging = true;
                  }
                }}
                onPointerUp={() => {
                  if (
                    pointer.current.slot === slot &&
                    !pointer.current.dragging &&
                    clickAllowed &&
                    cardId !== '4'
                  ) {
                    handleCardClick(cardId);
                  }
                  pointer.current.dragging = false;
                  pointer.current.slot = null;
                }}
                className={`
                  relative w-full h-full flex items-center justify-center
                  font-bold text-white select-none rounded-xl shadow-sm
                  transition-shadow duration-200 ${textSizeClasses[slot]}
                  ${!isFixed && !isMobile ? 'md:swapy-handle cursor-grab' : ''}
                `}
                {...(!isFixed && !isMobile && { 'data-swapy-item': cardId })}
              >
                {!isFixed && !isMobile && (
                  <div className="swapy-handle absolute top-2 right-2 z-20 p-1 block md:hidden">
                    <GripVertical className="h-5 w-5 text-black" />
                  </div>
                )}
                {renderSummary(cardId)}
              </div>
            </div>
          );
        })}
      </div>

      <ModalContainer isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedCard && React.createElement(MODALS_BY_ID[selectedCard], {
          ...(selectedCard === '4' && {
            onBlogClick: blog => {
              navigate(`/blog/${blog.slug}`, { state: { background: location } });
              setModalOpen(false);
            }
          })
        })}
      </ModalContainer>
    </>
  );
}
