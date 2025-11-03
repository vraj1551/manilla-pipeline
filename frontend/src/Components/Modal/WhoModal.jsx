// src/Components/Modal/WhoModal.jsx
import React from 'react'
import { Lightbulb, Briefcase, Users, Star } from 'lucide-react';

const WhoModal = () => (
  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-5xl mx-auto">
      
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#ff7300] mb-4 leading-tight">
          Who We Are
        </h1>
        <p className="mt-4 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
          We are a boutique legal practice with a specialised focus on Corporate,
          Commercial, and Intellectual Property Law, designed to meet the evolving
          needs of modern businesses, creators, and innovators.
        </p>
      </div>

      {/* Core Philosophy Section */}
      <div className="mt-12 flex flex-col gap-6">
        {/* Card 1 */}
        <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
          <Lightbulb className="h-10 w-10 sm:h-12 sm:w-12 text-[#ff7300] mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            Legal Precision & Innovation
          </h3>
          <p className="text-base sm:text-lg text-gray-600">
            Our team brings together legal precision, commercial awareness, and
            creative intuition, helping clients build structures that are resilient,
            compliant, and future-focused.
          </p>
        </div>

        {/* Card 2 */}
        <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
          <Briefcase className="h-10 w-10 sm:h-12 sm:w-12 text-[#ff7300] mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            Experience & Personal Touch
          </h3>
          <p className="text-base sm:text-lg text-gray-600">
            Since 2019, our founder has nurtured a practice that is both technically
            sound and deeply personal—shaped by years of cross-sector experience
            at the intersection of business, branding, and law.
          </p>
        </div>

        {/* Card 3 */}
        <div className="w-full bg-white rounded-lg shadow-lg p-6 sm:p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105">
          <Users className="h-10 w-10 sm:h-12 sm:w-12 text-[#ff7300] mb-4" />
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
            Client-Centric Growth
          </h3>
          <p className="text-base sm:text-lg text-gray-600">
            Beyond the credentials, what defines us most is the company we keep.
            We grow because of our clients. Every new venture we support teaches us
            something more.
          </p>
        </div>
      </div>


      {/* Client Diversity Section */}
      <div className="mt-16 bg-[#fdf0e5] rounded-lg p-8 sm:p-10 shadow-inner">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 text-center mb-6">
          The Diverse World We Support
        </h2>
        <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
          Our Manilla folders carry a diverse and dynamic collection of ideas in motion. We work with fintech disruptors building SaaS and PaaS ecosystems, video game studios and amusement parks, thrifting platforms redefining the digital marketplace, and pharmaceutical and cosmetic brands at the cutting edge of science and self-care.
        </p>
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
          Our clients include unique individuals creating board games, montessori-style wooden toys, and farm-to-table restaurateurs—each bringing craft, culture, and character to commerce. We also support educators and neurodevelopmental experts, photographers, designers, ateliers, stylists, and wellness entrepreneurs who are reshaping how we learn, create, and live well.
        </p>
        <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
          From cardiologists, dermatologists, and physiotherapists advancing specialised care, to industrial manufacturers engineering the backbone of progress—every client adds a unique layer of insight and ingenuity to our practice. Each one is driven by a vision. Each one is redefining value. We're here to protect it.
        </p>
      </div>

      {/* Concluding Statement */}
      <div className="mt-16 text-center">
        <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4">
          These are the voices that shape our practice.
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 font-medium">
          And as they build whats next—we ensure their ideas are protected, their risks managed,
          and their foundations secure.
        </p>
      </div>
    </div>
  </div>
);

export default WhoModal;
