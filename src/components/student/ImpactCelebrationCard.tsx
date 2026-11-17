import React, { useState } from 'react';
import type { ImpactRecord } from '../../types';
import { 
  Award, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  X,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  impact: ImpactRecord;
}

export const ImpactCelebrationCard: React.FC<Props> = ({ impact }) => {
  const [showCertificate, setShowCertificate] = useState(false);

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 via-emerald-50 to-white rounded-3xl border-2 border-emerald-300 shadow-xl p-6 md:p-8 relative overflow-hidden transition-all hover:shadow-2xl">
      {/* Decorative Gold Accent */}
      <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-400 to-emerald-400 text-slate-950 font-black text-[11px] px-6 py-1.5 rounded-bl-2xl uppercase tracking-wider shadow-sm flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5" />
        Verified Real-World Impact
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-600 text-white shadow-md">
              <Award className="w-6 h-6" />
            </span>
            <div>
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                Official Recognition Awarded
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                {impact.badgeName}
              </h2>
            </div>
          </div>

          <div className="text-xs text-slate-600 font-medium">
            Adopted by <strong className="text-slate-900">{impact.nonprofitName}</strong> on {impact.adoptedDate}
          </div>

          {/* Director Quote Callout */}
          <div className="p-4 rounded-2xl bg-white/90 border border-emerald-200 shadow-sm relative text-xs">
            <p className="italic text-slate-700 leading-relaxed font-serif text-sm">
              "{impact.headlineQuote}"
            </p>
            <div className="mt-2 text-slate-500 font-semibold text-[11px] flex items-center gap-1.5">
              <span>— {impact.directorName}</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">{impact.nonprofitName}</span>
            </div>
          </div>

          {/* Measurable Community Outcomes Grid */}
          <div>
            <div className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Measurable Differences Your Work Made in the Community:
            </div>
            <div className="grid sm:grid-cols-2 gap-2">
              {impact.measurableOutcomes.map((metric, i) => (
                <div key={i} className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 font-medium flex items-start gap-2 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action & Certificate Card */}
        <div className="w-full lg:w-72 shrink-0 bg-white rounded-2xl border border-emerald-200 p-5 shadow-md flex flex-col items-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-amber-100 border-4 border-amber-300 flex items-center justify-center text-amber-700 shadow-inner">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <div className="font-extrabold text-slate-900 text-sm">
              Civic Impact Credential
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              Certified for student college portfolios & LinkedIn
            </div>
          </div>

          <div className="w-full space-y-2 pt-2 border-t border-slate-100">
            <button
              onClick={() => {
                triggerCelebration();
                setShowCertificate(true);
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <FileText className="w-4 h-4" />
              View Impact Certificate
            </button>

            <button
              onClick={triggerCelebration}
              className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Celebrate Impact 🎉
            </button>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-amber-200 text-center my-8 relative">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Certificate Header */}
            <div className="border-4 border-double border-amber-300 p-8 rounded-2xl bg-amber-50/20">
              <div className="flex justify-center mb-2">
                <div className="w-14 h-14 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg">
                  <Award className="w-8 h-8" />
                </div>
              </div>

              <div className="text-xs uppercase font-extrabold tracking-widest text-amber-800">
                Certificate of Real-World Community Impact
              </div>
              <h3 className="text-2xl font-serif font-black text-slate-900 mt-2">
                Presented to {impact.studentAlias}
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto mt-2">
                In recognition of exceptional applied learning, civic empathy, and technical execution that solved a vital community challenge.
              </p>

              <div className="my-6 p-4 rounded-xl bg-white border border-amber-200 text-left text-xs max-w-lg mx-auto">
                <div className="font-bold text-slate-800">Impact Verified by {impact.nonprofitName}:</div>
                <ul className="mt-2 space-y-1 text-slate-600">
                  {impact.measurableOutcomes.map((m, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-end justify-between pt-6 border-t border-amber-200 max-w-lg mx-auto text-xs">
                <div className="text-left">
                  <div className="font-serif italic font-bold text-slate-800 text-sm border-b border-slate-400 pb-0.5">
                    {impact.directorName}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Executive Director, {impact.nonprofitName}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-800 border-b border-slate-400 pb-0.5">
                    {impact.adoptedDate}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">Verification Date</div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button
                onClick={() => window.print()}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
              >
                <Printer className="w-4 h-4" />
                Print / Save as PDF
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
