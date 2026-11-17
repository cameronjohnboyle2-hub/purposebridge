import React, { useState } from 'react';
import { usePlatform } from '../../context/PlatformContext';
import type { Challenge, Milestone, RubricCriterion } from '../../types';
import { aiService } from '../../services/aiService';
import { 
  Sparkles, 
  X, 
  BookOpen, 
  CheckCircle2, 
  Loader2, 
  ShieldCheck, 
  Calendar,
  Layers
} from 'lucide-react';

interface Props {
  challenge: Challenge | null;
  onClose: () => void;
}

export const CurriculumAdapterModal: React.FC<Props> = ({ challenge, onClose }) => {
  const { createAssignmentFromChallenge } = usePlatform();

  const [classroomName, setClassroomName] = useState('Period 3: Computer Science & Digital Civics');
  const [gradeLevel, setGradeLevel] = useState('10th - 11th Grade');
  const [subject] = useState('Applied Civics & Computer Science');
  const [dueDate, setDueDate] = useState('2026-12-15');

  // AI-generated or editable fields
  const [standards, setStandards] = useState<string[]>([
    'CSTA 3A-AP-14: Design and iteratively develop computational artifacts.',
    'CCSS.ELA-LITERACY.WHST.9-10.2: Informative writing for authentic audiences.'
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 'm1', title: 'Phase 1: Empathy & Client Research', description: 'Analyze non-profit constraints and interview needs.', daysToComplete: 4 },
    { id: 'm2', title: 'Phase 2: Prototype & Peer Review', description: 'Draft initial solution and run peer testing.', daysToComplete: 6 },
    { id: 'm3', title: 'Phase 3: Final Delivery & Polish', description: 'Finalize deliverable for non-profit submission.', daysToComplete: 4 }
  ]);

  const [rubric, setRubric] = useState<RubricCriterion[]>([
    { id: 'r1', criterion: 'Real-World Usability & Mission Fit', description: 'Addresses the non-profit challenge effectively.', points: 35 },
    { id: 'r2', criterion: 'Accessibility & User Dignity', description: 'Uses inclusive and accessible design.', points: 35 },
    { id: 'r3', criterion: 'Craftsmanship & Reflection', description: 'Demonstrates deep mastery and civic empathy.', points: 30 }
  ]);

  const [teacherInstructions, setTeacherInstructions] = useState(
    'Students: Remember this is a real-world client brief. Your work will be evaluated and the top submissions will be officially forwarded to the organization.'
  );

  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState(false);

  if (!challenge) return null;

  const handleAiAutoAdapt = async () => {
    setIsAiGenerating(true);
    setAiGeneratedSuccess(false);
    try {
      const res = await aiService.adaptToCurriculum(
        challenge.title,
        challenge.nonprofitName,
        gradeLevel,
        subject
      );
      setStandards(res.standards);
      setMilestones(res.milestones);
      setRubric(res.rubric);
      setTeacherInstructions(res.teacherInstructions);
      setAiGeneratedSuccess(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();

    createAssignmentFromChallenge({
      challengeId: challenge.id,
      challengeTitle: challenge.title,
      nonprofitName: challenge.nonprofitName,
      classroomName,
      gradeLevel,
      subject,
      standards,
      milestones,
      rubric,
      teacherInstructions,
      dueDate
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-100 my-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Adapt Community Need Into Classroom Assignment</h2>
              <p className="text-xs text-slate-500">
                Partner: <span className="font-semibold text-emerald-700">{challenge.nonprofitName}</span>
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Challenge Context Banner */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="font-bold text-slate-800 text-sm">{challenge.title}</div>
          <p className="text-slate-600 mt-1">{challenge.problemStatement}</p>
          <div className="mt-2 text-indigo-700 font-medium">
            <strong>Target Deliverables Wanted:</strong> {challenge.targetDeliverables.join(' • ')}
          </div>
        </div>

        {/* AI Quick Generator Bar */}
        <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              AI Curriculum Adapter
            </div>
            <p className="text-[11px] text-indigo-800 mt-0.5">
              Instantly scaffold rubrics, milestones, and Common Core/CSTA standards for this project.
            </p>
          </div>

          <button
            type="button"
            disabled={isAiGenerating}
            onClick={handleAiAutoAdapt}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 shrink-0"
          >
            {isAiGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Scaffolding Standards...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                Auto-Generate Rubric & Plan
              </>
            )}
          </button>
        </div>

        {aiGeneratedSuccess && (
          <div className="mt-2 text-xs font-semibold text-emerald-700 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Standards and 4-phase scaffolding generated successfully!
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleCreateAssignment} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Classroom / Period</label>
              <input
                type="text"
                required
                value={classroomName}
                onChange={(e) => setClassroomName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Grade Level</label>
              <input
                type="text"
                required
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Due Date</label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Educational Standards */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              Aligned Educational Standards (Common Core / CSTA / NGSS)
            </label>
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
              {standards.map((std, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-700 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0"></span>
                  <span>{std}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Phased Milestones */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              Project Milestones (Preventing Last-Minute Cramming)
            </label>
            <div className="grid sm:grid-cols-2 gap-2">
              {milestones.map((m, i) => (
                <div key={m.id || i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-800">{m.title}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{m.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Grading Rubric */}
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-600" />
              Grading Rubric Criteria
            </label>
            <div className="space-y-2">
              {rubric.map((r, i) => (
                <div key={r.id || i} className="p-2.5 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-800">{r.criterion}</div>
                    <div className="text-[11px] text-slate-500">{r.description}</div>
                  </div>
                  <span className="shrink-0 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-bold text-xs">
                    {r.points} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Teacher Guidance Notes & Instructions to Students
            </label>
            <textarea
              rows={2}
              value={teacherInstructions}
              onChange={(e) => setTeacherInstructions(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[11px] text-slate-500 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              FERPA Compliant: Students work in a protected classroom sandbox.
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
                className="px-5 py-2 font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-sm transition-all"
              >
                Publish Assignment to Class
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
