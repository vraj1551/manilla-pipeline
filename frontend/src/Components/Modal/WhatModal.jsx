// src/Components/Modal/WhatModal.jsx
import React from 'react'
import {
  Lightbulb,
  Scale,
  ShieldCheck,
  FileText,
  Briefcase,
  Users,
  Search,
  BookOpen,
  PenTool,
  Handshake,
  Home,
  Award
} from 'lucide-react';

const WhatModal = () => (
  <div className="w-full bg-gray-50 font-inter text-gray-800 p-2 lg:p-6">
    <div className="max-w-4xl w-full mx-auto bg-white shadow-lg rounded-xl p-6 lg:p-10">
      
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-[2.618rem] font-extrabold text-[#ff7300]">
          What We Do
        </h1>
        <p className="mt-4 text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Turning an idea into an asset takes more than enthusiasm. It calls for
          foresight, structure, and critical thinking. That’s where legal
          clarity begins to matter.
        </p>
      </header>

      {/* Core Message */}
      <section className="mb-10 space-y-6 text-base leading-relaxed">
        {[{
          Icon: Lightbulb,
          color: 'text-yellow-600',
          text: `We support visionaries as they shape their legacy. A unique name,
            logo, or concept forms the soul of any brand — it anchors identity,
            tells a story, and sets one apart in a crowded market. We help
            assess how protectable your intellectual property is, outline the
            boundaries of your business presence, and provide the tools to help
            you document and defend your creative or commercial identity.`
        },{
          Icon: Briefcase,
          color: 'text-green-600',
          text: `At Manilla Law Firm, we engage with businesses, creatives, and
            changemakers who think ahead. Our role is to bring structure to
            vision — through documents, registrations, and strategies that
            align with both business ambition and legal frameworks.`
        },{
          Icon: ShieldCheck,
          color: 'text-purple-600',
          text: `We approach law as a means to clarity — not complication. Our work
            is rooted in practicality, plain language, and mutual respect for
            both creativity and compliance. If you're building something that
            matters to you, it deserves to be protected with equal care.`
        }].map(({ Icon, color, text }, i) => (
          <div
            key={i}
            className="
              flex flex-col items-center text-center gap-4
              sm:flex-row sm:items-start sm:text-left
            "
          >
            <Icon className={`w-6 h-6 sm:w-8 sm:h-8 md:w-8 md:h-8 ${color} flex-shrink-0`} />
            <p>{text}</p>
          </div>
        ))}

        <p className="mt-8 text-center text-[1.618rem] font-semibold text-[#ff7300]">
          We don't just deal with law. We work with people who are building
          things meant to last.
        </p>
      </section>

      {/* Summary */}
      <section className="bg-[#fdf0e5] p-6 sm:p-8 rounded-lg shadow-inner mt-10">
        <h2 className="flex items-center gap-3 text-[1.618rem] font-bold text-gray-700 mb-6">
          <FileText className="w-6 h-6 text-gray-700" />
          SUMMARY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {/* Left column: 10 items */}
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-500" /> Trademark Search
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-500" /> Trademark Registration
            </li>
            <li className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-500" /> Trademark Renewal
            </li>
            <li className="flex items-center gap-2">
              <Handshake className="w-5 h-5 text-gray-500" /> Trademark Assignment
            </li>
            <li className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-gray-500" /> Copyright Registration
            </li>
            <li className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-500" /> Patentability Search
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-500" /> Patent Registration
            </li>
            <li className="flex items-center gap-2">
              <Handshake className="w-5 h-5 text-gray-500" /> Patent Assignment
            </li>
            <li className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-500" /> Freedom to Operate Search
            </li>
            <li className="flex items-center gap-2">
              <Search className="w-5 h-5 text-gray-500" /> Design Search
            </li>
          </ul>

          {/* Right column: 9 items */}
          <ul className="space-y-3 text-base">
            <li className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-500" /> Design Registration
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-gray-500" /> Drafting Contracts and Agreements
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-gray-500" /> Drafting Deeds of Partnership and Trust
            </li>
            <li className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-500" /> Estate Planning
            </li>
            <li className="flex items-center gap-2">
              <FileText className="w-8 h-8 text-gray-500" /> Drafting Policies and Notices
            </li>
            <li className="flex items-center gap-2">
              <Users className="w-5 h-5 text-gray-500" /> Arbitration and Mediation
            </li>
            <li className="flex items-center gap-2">
              <Handshake className="w-5 h-5 text-gray-500" /> Negotiation and Dispute Resolution
            </li>
            <li className="flex items-center gap-2">
              <Home className="w-5 h-5 text-gray-500" /> Title Clearance for Property
            </li>
            <li className="flex items-center gap-2">
              <Award className="w-5 h-5 text-gray-500" /> PoSH Training
            </li>
          </ul>
        </div>
      </section>
    </div>
  </div>
);

export default WhatModal;
