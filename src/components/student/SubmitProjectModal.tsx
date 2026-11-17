import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import type { Assignment } from '../../types';
import { aiService } from '../../services/aiService';
import { 
  X, 
  Sparkles, 
  Loader2, 
  Send, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

interface Props {
  assignment: Assignment | null;
  onClose: () => void;
}

export const SubmitProjectModal: React.FC<Props> = ({ assignment, onClose }) => {
  const { submitStudentProject } = usePlatform();

  const [projectTitle, setProjectTitle] = useState('');
  const [deliverableType, setDeliverableType] = useState<any>('Live Demo Link');
  const [deliverableUrl, setDeliverableUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [solutionDescription, setSolutionDescription] = useState('');

  const [isAiChecking, setIsAiChecking] = useState(false);
  const [aiCoachFeedback, setAiCoachFeedback] = useState<any>(null);

  if (!assignment) return null;

  const handleAiPreFlightCheck = async () => {
    if (!projectTitle || !summary) return;
    setIsAiChecking(true);
    try {
      const result = await aiService.coachStudentDraft(projectTitle, summary, solutionDescription);
      setAiCoachFeedback(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiChecking(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectTitle || !summary || !deliverableUrl) return;

    submitStudentProject({
      assignmentId: assignment.id,
      challengeId: assignment.challengeId,
      challengeTitle: assignment.challengeTitle,
      nonprofitName: assignment.nonprofitName,
      classroomName: assignment.classroomName,
      studentAlias: 'Maya Chen & Team (Team EchoImpact)',
      projectTitle,
      summary,
      solutionDescription,
      deliverableType,
      deliverableUrl
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
              {assignment.classroomName}
            </span>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">Submit Project for Teacher Review</h2>
            <p className="text-xs text-slate-500">
              Community Partner: <span className="font-semibold text-emerald-700">{assignment.nonprofitName}</span>
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Project Solution Name *</label>
            <input
              type="text"
              required
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="e.g. PantryPulse: Instant Low-Bandwidth Food Finder"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Deliverable Type</label>
              <select
                value={deliverableType}
                onChange={(e) => setDeliverableType(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Live Demo Link">Live Demo Link</option>
                <option value="Figma / Design Mockups">Figma / Design Mockups</option>
                <option value="GitHub Repository">GitHub Repository</option>
                <option value="PDF / Report">PDF / Report</option>
                <option value="Slide Deck">Slide Deck Presentation</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Link to Deliverable Artifact *</label>
              <input
                type="url"
                required
                value={deliverableUrl}
                onChange={(e) => setDeliverableUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Short Project Summary (2-3 sentences explaining your solution) *
            </label>
            <textarea
              required
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="What does your project do, and who does it help?"
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Empathy & Real-World Design Choices (Why did you design it this way?)
            </label>
            <textarea
              rows={3}
              value={solutionDescription}
              onChange={(e) => setSolutionDescription(e.target.value)}
              placeholder="Explain how you accounted for accessibility, language barriers, bandwidth limitations, or community dignity..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* AI Pre-Flight Check Button & Feedback */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-indigo-50 border border-amber-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  AI Pre-Flight Rubric Check
                </div>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  Get friendly coaching before turning your assignment in to Mr. Davis.
                </p>
              </div>

              <button
                type="button"
                disabled={isAiChecking || !projectTitle || !summary}
                onClick={handleAiPreFlightCheck}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 shrink-0"
              >
                {isAiChecking ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Checking Rubric...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Run Pre-Flight Check
                  </>
                )}
              </button>
            </div>

            {aiCoachFeedback && (
              <div className="mt-3 pt-3 border-t border-amber-200/60 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-emerald-800">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Readiness Score: {aiCoachFeedback.readinessScore}%
                  </span>
                  <span className="text-[11px] font-normal text-slate-600">
                    {aiCoachFeedback.realWorldAlignmentNote}
                  </span>
                </div>

                <div className="text-[11px] text-slate-700 space-y-1">
                  <div>
                    <strong>Strengths: </strong>
                    {aiCoachFeedback.strengths.join(' ')}
                  </div>
                  <div className="text-amber-900 font-medium">
                    <strong>Suggestion: </strong>
                    {aiCoachFeedback.improvements.join(' ')}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Teacher will vet before forwarding to partner.
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                Turn in to Teacher
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
