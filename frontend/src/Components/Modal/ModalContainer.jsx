// src/Components/Modal/ModalContainer.jsx
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import ShareButtons from '../Share/ShareButtons'

const ModalContainer = ({ isOpen, onClose, children }) => {
  const { pathname } = useLocation()
  const showShare = pathname.startsWith('/blog') // adjust if your route differs

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <div className="relative w-full mx-4 md:mx-0 md:w-3/4 lg:w-1/2 h-[90vh]">
            <motion.div
              // relative = anchor for modal content only
              className="relative bg-gray-50 rounded-2xl shadow-lg w-full h-full p-3 overflow-auto hide-scrollbar"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-3xl leading-none cursor-pointer"
              >
                &times;
              </button>

              <div className="mt-6">{children}</div>
            </motion.div>

            {/* Share buttons anchored to modal, not inside scroll area */}
            {showShare && (
              <div className="absolute bottom-4 right-4 z-10">
                <ShareButtons title="" summary="" />
              </div>
            )}
          </div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ModalContainer
