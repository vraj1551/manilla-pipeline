// src/Components/Modal/BlogModalWrapper.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '../../pages/Home'
import BlogModal from './BlogModal'

export default function BlogModalWrapper() {
  const navigate = useNavigate()

  return (
    <>
      <Home />
      <BlogModal
        isOpen={true}
        onClose={() => navigate('/')}
      />
    </>
  )
}