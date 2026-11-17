import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { PostChallengeModal } from './PostChallengeModal';
import { AdoptModal } from './AdoptModal';
import type { StudentSubmission } from '../../types';
import { 
  Building2, 
  PlusCircle, 
  CheckCircle2, 
  ExternalLink, 
  Award, 
  HeartHandshake, 
  MapPin, 
  FolderCheck,
  Clock,
  Sparkles
} from 'lucide-react';

export const NonProfitDashboard: React.FC = () => {
  const { challenges, submissions, impacts, nonprofits } = usePlatform();
  const currentOrg = nonprofits[0]; // Metro Food Relief Network

  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedSubToAdopt, setSelectedSubToAdopt] = useState<StudentSubmission | null>(null);

  // Submissions forwarded by teachers awaiting non-profit review or already adopted
  const forwardedSubmissions = submissions.filter(
    s => s.status === 'forwarded_to_nonprofit' || s.status === 'adopted_by_nonprofit'
  );

  return (
    <div className="space-y-6">
      {/* Non-Profit Hero & Organization Welcome */}
      <div className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-400/30">
              <Building2 className="w-3.5 h-3.5" />
              Non-Profit Partner Portal
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {currentOrg.name}
            </h1>
            <p className="text-emerald-100/90 text-sm leading-relaxed">
              {currentOrg.mission}
            </p>
            <div className="flex items-center gap-4 text-xs text-emerald-200/80 pt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {currentOrg.location}
              </span>
              <span>•</span>
              <span className="font-medium">{currentOrg.contactPerson}</span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setIsPostModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PlusCircle className="w-4 h-4 text-slate-950" />
              Post Community Need
            </button>
          </div>
        </div>

        {/* Quick Impact Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-emerald-800/60">
          <div>
            <div className="text-2xl font-black text-white">{challenges.length}</div>
            <div className="text-xs text-emerald-200/70 font-medium">Challenges Posted</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {submissions.filter(s => s.status === 'forwarded_to_nonprofit').length}
            </div>
            <div className="text-xs text-emerald-200/70 font-medium">Awaiting Review</div>
          </div>
          <div>
            <div className="text-2xl font-black text-white">
              {submissions.filter(s => s.status === 'adopted_by_nonprofit').length}
            </div>
            <div className="text-xs text-emerald-200/70 font-medium">Solutions Adopted</div>
          </div>
          <div>
            <div className="text-2xl font-black text-emerald-400">{impacts.length}</div>
            <div className="text-xs text-emerald-200/70 font-medium">Verified Community Impacts</div>
          </div>
        </div>
      </div>

      {/* Action Section: Teacher-Forwarded Projects Desk */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FolderCheck className="w-5 h-5 text-indigo-600" />
              Teacher-Forwarded Student Solutions
            </h2>
            <p className="text-xs text-slate-500">
              Vetted by teachers for quality and privacy. Ready for your organization to adopt into real-world use!
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            {forwardedSubmissions.length} Projects Forwarded
          </span>
        </div>

        {forwardedSubmissions.length === 0 ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            No projects have been forwarded by teachers yet. Switch to the <strong>Teacher</strong> role to adapt a challenge and forward student work!
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {forwardedSubmissions.map((sub) => {
              const isAdopted = sub.status === 'adopted_by_nonprofit';

              return (
                <div
                  key={sub.id}
                  className={`rounded-2xl border p-5 transition-all ${
                    isAdopted
                      ? 'border-emerald-200 bg-emerald-50/40 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-indigo-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                        {sub.deliverableType}
                      </span>
                      <h3 className="font-bold text-slate-900 mt-1 text-base">{sub.projectTitle}</h3>
                      <div className="text-xs text-slate-500">
                        By <span className="font-semibold text-slate-700">{sub.studentAlias}</span> • {sub.classroomName}
                      </div>
                    </div>

                    {isAdopted ? (
                      <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Adopted in Real World
                      </span>
                    ) : (
                      <span className="shrink-0 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1 border border-amber-300 animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        Awaiting Adoption
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                    {sub.summary}
                  </p>

                  {/* Teacher endorsement */}
                  {sub.teacherFeedback && (
                    <div className="mt-3 p-2.5 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[11px] text-indigo-900">
                      <span className="font-bold">Teacher Endorsement: </span>
                      "{sub.teacherFeedback}"
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <a
                      href={sub.deliverableUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      View Student Deliverable <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    {!isAdopted ? (
                      <button
                        onClick={() => setSelectedSubToAdopt(sub)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm flex items-center gap-1.5 transition-all"
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        Adopt & Share Real Impact
                      </button>
                    ) : (
                      <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                        <Award className="w-3.5 h-3.5" /> Impact Badge Awarded
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Non-Profit Active Challenges */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your Posted Community Challenges</h2>
            <p className="text-xs text-slate-500">
              Needs submitted to high school and middle school classrooms
            </p>
          </div>
          <button
            onClick={() => setIsPostModalOpen(true)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <PlusCircle className="w-4 h-4" /> Add Another Need
          </button>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {challenges.map((ch) => (
            <div key={ch.id} className="p-5 rounded-2xl border border-slate-200 hover:border-slate-300 transition-all bg-slate-50/50">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  {ch.category}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  ch.urgency === 'High Need' ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {ch.urgency}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 mt-2 text-sm">{ch.title}</h3>
              <p className="text-xs text-slate-600 mt-1 line-clamp-2">{ch.problemStatement}</p>

              <div className="mt-3">
                <div className="text-[11px] font-bold text-slate-700 mb-1">Target Deliverables:</div>
                <ul className="text-xs text-slate-500 space-y-1">
                  {ch.targetDeliverables.map((d, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
                      <span className="truncate">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Posted: {ch.createdAt}</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Live for Teachers
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      <PostChallengeModal isOpen={isPostModalOpen} onClose={() => setIsPostModalOpen(false)} />
      <AdoptModal submission={selectedSubToAdopt} onClose={() => setSelectedSubToAdopt(null)} />
    </div>
  );
};
