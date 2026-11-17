import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import type { Assignment } from '../../types';
import { SubmitProjectModal } from './SubmitProjectModal';
import { ImpactCelebrationCard } from './ImpactCelebrationCard';
import { 
  GraduationCap, 
  Clock, 
  Send, 
  ExternalLink, 
  Calendar, 
  Layers, 
  HeartHandshake,
  Award
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { assignments, submissions, impacts } = usePlatform();

  const [selectedAssignmentToSubmit, setSelectedAssignmentToSubmit] = useState<Assignment | null>(null);

  return (
    <div className="space-y-6">
      {/* Student Hero */}
      <div className="bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 text-xs font-semibold border border-amber-400/30">
              <GraduationCap className="w-3.5 h-3.5" />
              Student Innovator Workspace
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Maya Chen & Team EchoImpact
            </h1>
            <p className="text-amber-100/90 text-sm leading-relaxed">
              Lincoln Heights Community High School • Period 3: Computer Science & Digital Civics (Instructor: Mr. Marcus Davis)
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-center">
            <div>
              <div className="text-xl font-black text-white">{assignments.length}</div>
              <div className="text-[10px] text-amber-200 uppercase font-semibold">Active Missions</div>
            </div>
            <div>
              <div className="text-xl font-black text-white">{submissions.length}</div>
              <div className="text-[10px] text-amber-200 uppercase font-semibold">Turned In</div>
            </div>
            <div>
              <div className="text-xl font-black text-emerald-400">{impacts.length}</div>
              <div className="text-[10px] text-amber-200 uppercase font-semibold">Adopted Work</div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 1: VERIFIED REAL-WORLD IMPACT (THE "WHY IT MATTERS" REWARD) */}
      {impacts.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-emerald-100 text-emerald-700">
              <Award className="w-4 h-4" />
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Your Real-World Impact Showcase (Live in the Community)
            </h2>
          </div>

          <div className="space-y-4">
            {impacts.map((imp) => (
              <ImpactCelebrationCard key={imp.id} impact={imp} />
            ))}
          </div>
        </section>
      )}

      {/* SECTION 2: ACTIVE CLASSROOM MISSIONS (PURPOSE-DRIVEN ASSIGNMENTS) */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-indigo-600" />
              Your Real-World Community Assignments
            </h2>
            <p className="text-xs text-slate-500">
              Assigned by your teacher. Top solutions will be officially forwarded to non-profit partners for real community use!
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
            {assignments.length} Assigned
          </span>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {assignments.map((asg) => (
            <div
              key={asg.id}
              className="rounded-2xl border border-slate-200 hover:border-amber-300 transition-all p-5 bg-slate-50/50 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    Community Partner: {asg.nonprofitName}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Due: {asg.dueDate}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{asg.challengeTitle}</h3>

                <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs">
                  <span className="font-bold text-indigo-900 block mb-1">Teacher Instructions:</span>
                  <p className="text-slate-600">{asg.teacherInstructions}</p>
                </div>

                {/* Milestones */}
                <div>
                  <div className="text-[11px] font-bold text-slate-700 mb-1.5 flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-indigo-600" />
                    Project Phasing & Milestones:
                  </div>
                  <div className="space-y-1">
                    {asg.milestones.map((m) => (
                      <div key={m.id} className="text-xs text-slate-600 flex items-start gap-1.5">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>
                          <strong>{m.title}:</strong> {m.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">
                  Standards Aligned: {asg.standards.length} Curricula
                </span>

                <button
                  onClick={() => setSelectedAssignmentToSubmit(asg)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  Turn In Deliverable
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: YOUR SUBMISSION STATUS & TEACHER FEEDBACK */}
      <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Your Submitted Work & Feedback Status</h2>
            <p className="text-xs text-slate-500">
              Track teacher feedback, revisions, and when your work gets forwarded to community non-profits.
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
            {submissions.length} Submissions
          </span>
        </div>

        <div className="space-y-3">
          {submissions.map((sub) => {
            const isAdopted = sub.status === 'adopted_by_nonprofit';
            const isForwarded = sub.status === 'forwarded_to_nonprofit';

            return (
              <div
                key={sub.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{sub.projectTitle}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-600">
                      {sub.deliverableType}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Challenge: <strong>{sub.challengeTitle}</strong> ({sub.nonprofitName})
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{sub.summary}</p>

                  {/* Teacher Feedback Quote */}
                  {sub.teacherFeedback && (
                    <div className="mt-2 p-2.5 rounded-xl bg-indigo-50 border border-indigo-100 text-xs text-indigo-950">
                      <span className="font-bold">Mr. Davis's Feedback: </span>
                      "{sub.teacherFeedback}"
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <a
                    href={sub.deliverableUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                  >
                    View Project <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {isAdopted ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1 border border-emerald-300">
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      Adopted by Non-Profit!
                    </span>
                  ) : isForwarded ? (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-800 flex items-center gap-1 border border-indigo-300">
                      <Send className="w-3.5 h-3.5 text-indigo-600" />
                      Forwarded to Non-Profit
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 flex items-center gap-1 border border-amber-300">
                      <Clock className="w-3.5 h-3.5" />
                      Under Teacher Review
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Submit Modal */}
      <SubmitProjectModal
        assignment={selectedAssignmentToSubmit}
        onClose={() => setSelectedAssignmentToSubmit(null)}
      />
    </div>
  );
};
