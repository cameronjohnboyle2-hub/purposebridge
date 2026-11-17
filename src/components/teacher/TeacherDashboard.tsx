import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import type { Challenge, StudentSubmission } from '../../types';
import { CurriculumAdapterModal } from './CurriculumAdapterModal';
import { ReviewSubmissionModal } from './ReviewSubmissionModal';
import { 
  BookOpen, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileCheck
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { challenges, assignments, submissions } = usePlatform();

  const [activeTab, setActiveTab] = useState<'challenges' | 'grading'>('challenges');
  const [selectedChallengeToAdapt, setSelectedChallengeToAdapt] = useState<Challenge | null>(null);
  const [selectedSubToReview, setSelectedSubToReview] = useState<StudentSubmission | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredChallenges = selectedCategory === 'All' 
    ? challenges 
    : challenges.filter(c => c.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Teacher Hero */}
      <div className="bg-gradient-to-br from-indigo-800 via-indigo-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-400/30">
              <BookOpen className="w-3.5 h-3.5" />
              Educator Curriculum Hub
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Marcus Davis • Applied Civics & Computer Science
            </h1>
            <p className="text-indigo-100/90 text-sm leading-relaxed">
              Lincoln Heights Community High School • Bridging classroom coursework with verified local non-profit needs to give students authentic purpose.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
            <div>
              <div className="text-xl font-black text-white">{challenges.length}</div>
              <div className="text-[10px] text-indigo-200 uppercase font-semibold">Community Needs</div>
            </div>
            <div>
              <div className="text-xl font-black text-white">{assignments.length}</div>
              <div className="text-[10px] text-indigo-200 uppercase font-semibold">Active Classes</div>
            </div>
            <div>
              <div className="text-xl font-black text-emerald-400">{submissions.length}</div>
              <div className="text-[10px] text-indigo-200 uppercase font-semibold">Student Projects</div>
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-2 mt-8 pt-6 border-t border-indigo-700/60">
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'challenges'
                ? 'bg-white text-indigo-950 shadow-md'
                : 'text-indigo-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            1. Browse Non-Profit Challenges ({challenges.length})
          </button>

          <button
            onClick={() => setActiveTab('grading')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'grading'
                ? 'bg-white text-indigo-950 shadow-md'
                : 'text-indigo-200 hover:text-white hover:bg-white/10'
            }`}
          >
            <FileCheck className="w-4 h-4" />
            2. Student Submissions & Grading ({submissions.length})
          </button>
        </div>
      </div>

      {/* TAB 1: BROWSE CHALLENGES */}
      {activeTab === 'challenges' && (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-500 mr-1">Filter by Discipline:</span>
              {['All', 'Tech & Web', 'Marketing & Design', 'Data & Research', 'Community & Writing', 'Environmental Science'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-500">
              Showing <strong>{filteredChallenges.length}</strong> verified community needs
            </div>
          </div>

          {/* Challenges Grid */}
          <div className="grid gap-5 md:grid-cols-2">
            {filteredChallenges.map((ch) => {
              const hasBeenAdapted = assignments.some(a => a.challengeId === ch.id);

              return (
                <div
                  key={ch.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {ch.category}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" /> {ch.nonprofitLocation}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">{ch.title}</h3>
                    <div className="text-xs font-semibold text-emerald-700 mt-0.5">
                      Partner: {ch.nonprofitName}
                    </div>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {ch.problemStatement}
                    </p>

                    <div className="mt-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                      <div className="font-bold text-slate-700 mb-1">Target Deliverables for Students:</div>
                      <ul className="space-y-1 text-slate-600">
                        {ch.targetDeliverables.map((d, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">•</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    {hasBeenAdapted ? (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Adapted for Your Classroom
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">Available to adapt</span>
                    )}

                    <button
                      onClick={() => setSelectedChallengeToAdapt(ch)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm flex items-center gap-1.5 transition-all"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Adapt Into Assignment
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT SUBMISSIONS & GRADING */}
      {activeTab === 'grading' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Student Submissions Queue</h2>
                <p className="text-xs text-slate-500">
                  Review student prototypes, provide formative advice, and forward the best work to community partners.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                {submissions.length} Total Student Deliverables
              </span>
            </div>

            <div className="space-y-3">
              {submissions.map((sub) => {
                const isForwarded = sub.status === 'forwarded_to_nonprofit';
                const isAdopted = sub.status === 'adopted_by_nonprofit';

                return (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl border border-slate-200 hover:border-indigo-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50"
                  >
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{sub.projectTitle}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                          {sub.deliverableType}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Student Team: <strong className="text-slate-700">{sub.studentAlias}</strong> • {sub.classroomName}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">{sub.summary}</p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {isAdopted ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Adopted by Non-Profit
                        </span>
                      ) : isForwarded ? (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 flex items-center gap-1 border border-indigo-300">
                          <Send className="w-3.5 h-3.5 text-indigo-600" />
                          Forwarded to Partner
                        </span>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1 border border-amber-300">
                          <Clock className="w-3.5 h-3.5" />
                          Awaiting Teacher Vetting
                        </span>
                      )}

                      <button
                        onClick={() => setSelectedSubToReview(sub)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 shadow-sm transition-all flex items-center gap-1.5"
                      >
                        Grade & Forward
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CurriculumAdapterModal
        challenge={selectedChallengeToAdapt}
        onClose={() => setSelectedChallengeToAdapt(null)}
      />

      <ReviewSubmissionModal
        submission={selectedSubToReview}
        onClose={() => setSelectedSubToReview(null)}
      />
    </div>
  );
};
