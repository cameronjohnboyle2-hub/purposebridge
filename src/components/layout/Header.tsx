import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import type { UserRole } from '../../types';
import { 
  Building2, 
  GraduationCap, 
  BookOpen, 
  RotateCcw, 
  Sparkles,
  HeartHandshake,
  Compass,
  ArrowRight
} from 'lucide-react';

export const Header: React.FC = () => {
  const { role, setRole, view, setView, resetToDemoSeed } = usePlatform();

  const roleConfigs: Record<UserRole, { title: string; subtitle: string; icon: React.ReactNode; color: string; badge: string }> = {
    nonprofit: {
      title: 'Elena Rostova',
      subtitle: 'Director, Metro Food Relief & Partner Charities',
      icon: <Building2 className="w-5 h-5 text-emerald-600" />,
      color: 'border-emerald-500 bg-emerald-50 text-emerald-900',
      badge: 'Non-Profit Partner'
    },
    teacher: {
      title: 'Marcus Davis',
      subtitle: '10th & 11th Grade Civics & Tech Educator, Lincoln Heights High',
      icon: <BookOpen className="w-5 h-5 text-indigo-600" />,
      color: 'border-indigo-500 bg-indigo-50 text-indigo-900',
      badge: 'Educator / Curriculum Lead'
    },
    student: {
      title: 'Maya Chen & Team',
      subtitle: '11th Grade Student Lead • Lincoln Heights High School',
      icon: <GraduationCap className="w-5 h-5 text-amber-600" />,
      color: 'border-amber-500 bg-amber-50 text-amber-900',
      badge: 'Student Innovator'
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top Banner: One-Click Persona Switcher for Hackathon Live Demo */}
      <div className="bg-slate-900 text-slate-100 px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-slate-300 uppercase tracking-wider text-[11px]">
            Live Hackathon Demo Mode:
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('landing')}
            className={`px-3 py-1 rounded-md text-xs font-bold flex items-center gap-1.5 transition-all ${
              view === 'landing'
                ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            📖 About & How It Works
          </button>

          <span className="text-slate-600">|</span>

          <button
            onClick={() => setRole('nonprofit')}
            className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              view === 'portal' && role === 'nonprofit'
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-400/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            1. Non-Profit Director
          </button>

          <button
            onClick={() => setRole('teacher')}
            className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              view === 'portal' && role === 'teacher'
                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            2. High School Teacher
          </button>

          <button
            onClick={() => setRole('student')}
            className={`px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1.5 transition-all ${
              view === 'portal' && role === 'student'
                ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            3. Student Team Lead
          </button>

          <button
            onClick={resetToDemoSeed}
            title="Reset to default seed data"
            className="ml-3 px-2 py-1 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1 text-[11px]"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Data
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Clickable */}
        <button
          onClick={() => setView('landing')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-emerald-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-all">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Purpose<span className="text-indigo-600">Bridge</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Sparkles className="w-2.5 h-2.5 text-indigo-500" /> AI-Powered
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              Connecting Non-Profit Challenges with Classroom Learning for Measurable Real-World Impact
            </p>
          </div>
        </button>

        {/* Current Active Persona Profile or Intro Banner */}
        <div className="flex items-center gap-3">
          {view === 'landing' ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-xs text-slate-500 font-medium">
                Viewing Platform Introduction
              </span>
              <button
                onClick={() => setRole('teacher')}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
              >
                <span>Enter Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1.5">
                  <span>{roleConfigs[role].title}</span>
                  <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${roleConfigs[role].color}`}>
                    {roleConfigs[role].badge}
                  </span>
                </div>
                <div className="text-xs text-slate-500 truncate max-w-xs">
                  {roleConfigs[role].subtitle}
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                {roleConfigs[role].icon}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
