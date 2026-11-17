import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import type { StudentSubmission } from '../../types';
import { 
  X, 
  Send, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';

interface Props {
  submission: StudentSubmission | null;
  onClose: () => void;
}

export const ReviewSubmissionModal: React.FC<Props> = ({ submission, onClose }) => {
  const { updateTeacherFeedback, forwardSubmissionToNonProfit } = usePlatform();

  const [feedback, setFeedback] = useState(
    submission?.teacherFeedback || 
    'Terrific execution! Your empathy for real-world constraints is evident. The UI is clean, intuitive, and ready for production use.'
  );
  const [grade, setGrade] = useState(submission?.teacherGrade || '95 / 100 (Exemplary)');
  const [isForwardSuccess, setIsForwardSuccess] = useState(false);

  if (!submission) return null;

  const handleSaveGrade = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeacherFeedback(submission.id, feedback, grade);
    onClose();
  };

  const handleForwardToNonProfit = () => {
    updateTeacherFeedback(submission.id, feedback, grade);
    forwardSubmissionToNonProfit(submission.id);
    setIsForwardSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                {submission.classroomName}
              </span>
              <span className="text-xs text-slate-500">Student: <strong>{submission.studentAlias}</strong></span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-1">{submission.projectTitle}</h2>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Description & Artifact Link */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div>
            <span className="font-bold text-slate-700">Project Summary:</span>
            <p className="text-slate-600 mt-0.5">{submission.summary}</p>
          </div>

          <div>
            <span className="font-bold text-slate-700">Detailed Solution & Strategy:</span>
            <p className="text-slate-600 mt-0.5">{submission.solutionDescription}</p>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-slate-200/60">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-700">Artifact:</span>
              <span className="px-2 py-0.5 bg-white border border-slate-200 rounded font-mono text-[11px]">
                {submission.deliverableType}
              </span>
            </div>

            <a
              href={submission.deliverableUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 underline"
            >
              Open Artifact Deliverable <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* AI Formative Coach Diagnostics */}
        {submission.aiCoachNotes && (
          <div className="mt-3 p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs">
            <div className="flex items-center justify-between font-bold text-indigo-900 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                AI Formative Assessment Check
              </span>
              <span className="text-[11px] text-indigo-700">
                Readiness Score: <strong>{submission.aiCoachNotes.readinessScore}%</strong>
              </span>
            </div>
            <div className="text-[11px] text-slate-600 space-y-1">
              <div>
                <strong>Strengths: </strong>
                {submission.aiCoachNotes.strengths.join(' • ')}
              </div>
            </div>
          </div>
        )}

        {/* Grading & Feedback Form */}
        <form onSubmit={handleSaveGrade} className="mt-4 space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Teacher Feedback & Guidance (Visible to student)
            </label>
            <textarea
              rows={3}
              required
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Grade / Mastery Level</label>
            <input
              type="text"
              required
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              placeholder="e.g. 95 / 100 (Exemplary)"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* FERPA / Child Privacy Callout */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-start gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-emerald-950">
              <div className="font-bold">Student Privacy Safeguard (FERPA Guardrail)</div>
              When forwarding to the non-profit, student identities are anonymized to team alias and grade level. Direct outside contact is prevented; you remain the sole mentor and intermediary.
            </div>
          </div>

          {isForwardSuccess && (
            <div className="p-3 bg-emerald-100 text-emerald-900 rounded-xl font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Successfully forwarded to {submission.nonprofitName}! Switch to the Non-Profit role to review and adopt.
            </div>
          )}

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Save Grade & Feedback
              </button>

              <button
                type="button"
                onClick={handleForwardToNonProfit}
                className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Approve & Forward to Non-Profit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
