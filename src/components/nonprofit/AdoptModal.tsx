import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import type { StudentSubmission } from '../../types';
import { Award, CheckCircle2, HeartHandshake, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  submission: StudentSubmission | null;
  onClose: () => void;
}

export const AdoptModal: React.FC<Props> = ({ submission, onClose }) => {
  const { adoptSubmissionAndCreateImpact } = usePlatform();

  const [headlineQuote, setHeadlineQuote] = useState(
    'This student team produced work that rivals professional agencies. We are directly rolling this out to our community!'
  );
  const [badgeName, setBadgeName] = useState('Community Hero & Applied Impact Award');
  const [measurableOutcomes, setMeasurableOutcomes] = useState(
    'Over 500 community members assisted in the first month\nSaved our non-profit an estimated 40 volunteer development hours\nAdopted as official operational workflow'
  );
  const [testimonial, setTestimonial] = useState(
    'The care, empathy, and attention to real-world accessibility that these students demonstrated is truly inspirational. Our entire staff is grateful.'
  );

  if (!submission) return null;

  const handleAdopt = (e: React.FormEvent) => {
    e.preventDefault();

    adoptSubmissionAndCreateImpact(submission.id, {
      headlineQuote,
      badgeName,
      measurableOutcomes: measurableOutcomes.split('\n').filter(o => o.trim().length > 0),
      testimonial
    });

    // Trigger celebratory confetti
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Adopt Student Project Into Production</h2>
              <p className="text-xs text-slate-500">
                Created by <span className="font-semibold text-indigo-600">{submission.studentAlias}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Preview Badge */}
        <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div className="font-bold text-slate-800 text-sm">{submission.projectTitle}</div>
          <div className="text-slate-600 mt-1 line-clamp-2">{submission.summary}</div>
          <div className="mt-2 text-[11px] text-indigo-600 font-semibold flex items-center gap-1">
            <span>Deliverable:</span>
            <a href={submission.deliverableUrl} target="_blank" rel="noreferrer" className="underline hover:text-indigo-800">
              {submission.deliverableUrl}
            </a>
          </div>
        </div>

        <form onSubmit={handleAdopt} className="mt-4 space-y-3">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Official Executive Director Quote / Headline
            </label>
            <input
              type="text"
              required
              value={headlineQuote}
              onChange={(e) => setHeadlineQuote(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              Award an Official Impact Badge
            </label>
            <input
              type="text"
              required
              value={badgeName}
              onChange={(e) => setBadgeName(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Measurable Community Outcomes (one per line)
            </label>
            <textarea
              rows={3}
              required
              value={measurableOutcomes}
              onChange={(e) => setMeasurableOutcomes(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Personal Testimonial for Students & Teacher
            </label>
            <textarea
              rows={2}
              required
              value={testimonial}
              onChange={(e) => setTestimonial(e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              This will update the students' impact portfolio instantly.
            </span>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                Confirm & Publish Real Impact
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
