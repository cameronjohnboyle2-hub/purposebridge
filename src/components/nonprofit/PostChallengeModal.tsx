import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import type { ChallengeCategory } from '../../types';
import { aiService } from '../../services/aiService';
import { Sparkles, X, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PostChallengeModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addChallenge, nonprofits } = usePlatform();
  const currentOrg = nonprofits[0]; // Default to Metro Food Relief Network

  const [rawIdea, setRawIdea] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ChallengeCategory>('Tech & Web');
  const [urgency, setUrgency] = useState<'High Need' | 'Medium' | 'Flexible'>('High Need');
  const [problemStatement, setProblemStatement] = useState('');
  const [realWorldContext, setRealWorldContext] = useState('');
  const [deliverables, setDeliverables] = useState('');
  const [skills, setSkills] = useState('');
  const [isAiRefining, setIsAiRefining] = useState(false);
  const [aiSuccessMessage, setAiSuccessMessage] = useState('');

  if (!isOpen) return null;

  const handleAiRefine = async () => {
    if (!rawIdea.trim()) return;
    setIsAiRefining(true);
    setAiSuccessMessage('');
    try {
      const refined = await aiService.refineChallenge(rawIdea, currentOrg.name);
      setTitle(refined.title);
      setCategory(refined.category);
      setUrgency(refined.urgency);
      setProblemStatement(refined.problemStatement);
      setRealWorldContext(refined.realWorldContext);
      setDeliverables(refined.targetDeliverables.join('\n'));
      setSkills(refined.skillsWanted.join(', '));
      setAiSuccessMessage('AI successfully translated your need into an education-ready challenge brief!');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiRefining(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !problemStatement) return;

    addChallenge({
      nonprofitId: currentOrg.id,
      nonprofitName: currentOrg.name,
      nonprofitLocation: currentOrg.location,
      title,
      category,
      urgency,
      problemStatement,
      realWorldContext,
      targetDeliverables: deliverables.split('\n').filter(d => d.trim().length > 0),
      skillsWanted: skills.split(',').map(s => s.trim()).filter(s => s.length > 0),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Post a Real-World Community Challenge</h2>
            <p className="text-xs text-slate-500">
              Posting on behalf of <span className="font-semibold text-emerald-700">{currentOrg.name}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* AI Quick Assistant Box */}
        <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-emerald-50 border border-indigo-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              AI Prompt Refiner (For Busy Non-Profits)
            </span>
            <span className="text-[11px] text-indigo-600 font-medium">Type rough notes & let AI structure it</span>
          </div>
          <p className="text-xs text-slate-600 mb-2">
            Have a problem in mind? E.g. <em>"We need a Spanish flyer & poster for our stray cat adoption drives"</em> or <em>"We need a web map for our winter food pantries"</em>.
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              value={rawIdea}
              onChange={(e) => setRawIdea(e.target.value)}
              placeholder="e.g. We need help organizing our tree planting map and bilingual flyers..."
              className="flex-1 text-xs px-3 py-2 border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <button
              type="button"
              disabled={isAiRefining || !rawIdea.trim()}
              onClick={handleAiRefine}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 flex items-center gap-1.5 shrink-0 shadow-sm transition-all"
            >
              {isAiRefining ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Scoping...
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  Refine for Classrooms
                </>
              )}
            </button>
          </div>

          {aiSuccessMessage && (
            <div className="mt-2 text-xs font-medium text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {aiSuccessMessage}
            </div>
          )}
        </div>

        {/* Detailed Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Challenge Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mobile-Friendly Emergency Pantry & Transit Map"
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ChallengeCategory)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Tech & Web">Tech & Web</option>
                <option value="Marketing & Design">Marketing & Design</option>
                <option value="Data & Research">Data & Research</option>
                <option value="Community & Writing">Community & Writing</option>
                <option value="Environmental Science">Environmental Science</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Urgency</label>
              <select
                value={urgency}
                onChange={(e) => setUrgency(e.target.value as any)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="High Need">🔥 High Need (Needed within 30-45 days)</option>
                <option value="Medium">Medium (Semester Project)</option>
                <option value="Flexible">Flexible / Ongoing</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              The Real-World Problem * (What is broken or missing?)
            </label>
            <textarea
              required
              rows={2}
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Describe what your organization is struggling with and why..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Real-World Context & Stakes (Why should students care?)
            </label>
            <textarea
              rows={2}
              value={realWorldContext}
              onChange={(e) => setRealWorldContext(e.target.value)}
              placeholder="Explain how solving this will actually help real community members..."
              className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Deliverables (one per line)
              </label>
              <textarea
                rows={2}
                value={deliverables}
                onChange={(e) => setDeliverables(e.target.value)}
                placeholder="Responsive mobile web prototype&#10;Bilingual PDF printout&#10;Slide deck"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Skills Wanted (comma separated)
              </label>
              <textarea
                rows={2}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="HTML/CSS, Graphic Design, Spanish Translation, Data Analysis"
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
              <span>Challenges are reviewed by certified teachers before student assignment.</span>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-all"
              >
                Publish Challenge to Schools
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
