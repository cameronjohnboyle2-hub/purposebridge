import React, { createContext, useContext, useState, useEffect } from 'react';
import type { 
  UserRole, 
  Challenge, 
  Assignment, 
  StudentSubmission, 
  ImpactRecord, 
  NonProfit 
} from '../types';
import { 
  INITIAL_NONPROFITS, 
  INITIAL_CHALLENGES, 
  INITIAL_ASSIGNMENTS, 
  INITIAL_SUBMISSIONS, 
  INITIAL_IMPACTS 
} from '../data/seedData';

interface PlatformContextType {
  view: 'landing' | 'portal';
  setView: (view: 'landing' | 'portal') => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  nonprofits: NonProfit[];
  challenges: Challenge[];
  assignments: Assignment[];
  submissions: StudentSubmission[];
  impacts: ImpactRecord[];
  
  // Actions
  addChallenge: (challengeData: Partial<Challenge>) => void;
  createAssignmentFromChallenge: (assignmentData: Partial<Assignment>) => void;
  submitStudentProject: (submissionData: Partial<StudentSubmission>) => void;
  updateTeacherFeedback: (submissionId: string, feedback: string, grade: string, requestRevision?: boolean) => void;
  forwardSubmissionToNonProfit: (submissionId: string) => void;
  adoptSubmissionAndCreateImpact: (
    submissionId: string, 
    impactData: {
      headlineQuote: string;
      measurableOutcomes: string[];
      badgeName: string;
      testimonial: string;
    }
  ) => void;
  resetToDemoSeed: () => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<'landing' | 'portal'>('landing');
  const [role, setRole] = useState<UserRole>('teacher');

  const handleSetRole = (newRole: UserRole) => {
    setRole(newRole);
    setView('portal');
  };
  
  // Load from localStorage or use initial seed
  const [nonprofits] = useState<NonProfit[]>(() => {
    const saved = localStorage.getItem('pb_nonprofits');
    return saved ? JSON.parse(saved) : INITIAL_NONPROFITS;
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('pb_challenges');
    return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem('pb_assignments');
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [submissions, setSubmissions] = useState<StudentSubmission[]>(() => {
    const saved = localStorage.getItem('pb_submissions');
    return saved ? JSON.parse(saved) : INITIAL_SUBMISSIONS;
  });

  const [impacts, setImpacts] = useState<ImpactRecord[]>(() => {
    const saved = localStorage.getItem('pb_impacts');
    return saved ? JSON.parse(saved) : INITIAL_IMPACTS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('pb_challenges', JSON.stringify(challenges));
  }, [challenges]);

  useEffect(() => {
    localStorage.setItem('pb_assignments', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('pb_submissions', JSON.stringify(submissions));
  }, [submissions]);

  useEffect(() => {
    localStorage.setItem('pb_impacts', JSON.stringify(impacts));
  }, [impacts]);

  const addChallenge = (challengeData: Partial<Challenge>) => {
    const newChallenge: Challenge = {
      id: `ch-${Date.now()}`,
      nonprofitId: challengeData.nonprofitId || 'np-1',
      nonprofitName: challengeData.nonprofitName || 'Community Partner Organization',
      nonprofitLocation: challengeData.nonprofitLocation || 'Local Region',
      title: challengeData.title || 'Untitled Community Need',
      problemStatement: challengeData.problemStatement || '',
      realWorldContext: challengeData.realWorldContext || '',
      category: challengeData.category || 'Tech & Web',
      urgency: challengeData.urgency || 'Medium',
      targetDeliverables: challengeData.targetDeliverables || ['Project Deliverable Prototype'],
      skillsWanted: challengeData.skillsWanted || ['Problem Solving', 'Creativity'],
      createdAt: new Date().toISOString().split('T')[0],
      status: 'open'
    };
    setChallenges(prev => [newChallenge, ...prev]);
  };

  const createAssignmentFromChallenge = (assignmentData: Partial<Assignment>) => {
    const newAssignment: Assignment = {
      id: `asg-${Date.now()}`,
      challengeId: assignmentData.challengeId || '',
      challengeTitle: assignmentData.challengeTitle || '',
      nonprofitName: assignmentData.nonprofitName || '',
      teacherId: 'teach-1',
      teacherName: 'Marcus Davis',
      schoolName: 'Lincoln Heights Community High School',
      classroomName: assignmentData.classroomName || 'Period 3: Computer Science & Digital Civics',
      gradeLevel: assignmentData.gradeLevel || '10th - 12th Grade',
      subject: assignmentData.subject || 'Applied Civics & Tech',
      standards: assignmentData.standards || ['CCSS Standards Aligned', 'Applied Problem Solving'],
      milestones: assignmentData.milestones || [],
      rubric: assignmentData.rubric || [],
      teacherInstructions: assignmentData.teacherInstructions || '',
      dueDate: assignmentData.dueDate || '2026-12-15',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAssignments(prev => [newAssignment, ...prev]);

    // Mark challenge status as adapted
    if (assignmentData.challengeId) {
      setChallenges(prev => prev.map(ch => 
        ch.id === assignmentData.challengeId ? { ...ch, status: 'adapted' } : ch
      ));
    }
  };

  const submitStudentProject = (submissionData: Partial<StudentSubmission>) => {
    const newSub: StudentSubmission = {
      id: `sub-${Date.now()}`,
      assignmentId: submissionData.assignmentId || '',
      challengeId: submissionData.challengeId || '',
      challengeTitle: submissionData.challengeTitle || '',
      nonprofitName: submissionData.nonprofitName || '',
      studentAlias: submissionData.studentAlias || 'Maya C. (Student)',
      classroomName: submissionData.classroomName || 'Period 3: Computer Science & Digital Civics',
      projectTitle: submissionData.projectTitle || 'Student Community Solution',
      summary: submissionData.summary || '',
      solutionDescription: submissionData.solutionDescription || '',
      deliverableType: submissionData.deliverableType || 'Live Demo Link',
      deliverableUrl: submissionData.deliverableUrl || 'https://demo.example.org',
      previewSnippet: submissionData.previewSnippet || '',
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'submitted_to_teacher',
      aiCoachNotes: {
        strengths: ['Clear real-world focus', 'Empathy for user constraints', 'Accessible structure'],
        improvements: ['Include sample feedback or quote from community member'],
        readinessScore: 92
      }
    };

    setSubmissions(prev => [newSub, ...prev]);
  };

  const updateTeacherFeedback = (
    submissionId: string, 
    feedback: string, 
    grade: string, 
    requestRevision = false
  ) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id !== submissionId) return sub;
      return {
        ...sub,
        teacherFeedback: feedback,
        teacherGrade: grade,
        status: requestRevision ? 'teacher_revision_requested' : 'teacher_approved'
      };
    }));
  };

  const forwardSubmissionToNonProfit = (submissionId: string) => {
    setSubmissions(prev => prev.map(sub => {
      if (sub.id !== submissionId) return sub;
      return {
        ...sub,
        status: 'forwarded_to_nonprofit'
      };
    }));
  };

  const adoptSubmissionAndCreateImpact = (
    submissionId: string, 
    impactData: {
      headlineQuote: string;
      measurableOutcomes: string[];
      badgeName: string;
      testimonial: string;
    }
  ) => {
    const targetSub = submissions.find(s => s.id === submissionId);
    if (!targetSub) return;

    // 1. Update submission status to adopted_by_nonprofit
    setSubmissions(prev => prev.map(s => 
      s.id === submissionId ? { ...s, status: 'adopted_by_nonprofit' } : s
    ));

    // 2. Mark challenge completed
    setChallenges(prev => prev.map(ch => 
      ch.id === targetSub.challengeId ? { ...ch, status: 'completed' } : ch
    ));

    // 3. Create impact record
    const newImpact: ImpactRecord = {
      id: `imp-${Date.now()}`,
      challengeId: targetSub.challengeId,
      challengeTitle: targetSub.challengeTitle,
      submissionId: targetSub.id,
      studentAlias: targetSub.studentAlias,
      nonprofitName: targetSub.nonprofitName,
      directorName: 'Elena Rostova (Executive Director)',
      adoptedDate: new Date().toISOString().split('T')[0],
      headlineQuote: impactData.headlineQuote,
      measurableOutcomes: impactData.measurableOutcomes,
      badgeName: impactData.badgeName,
      badgeIcon: 'Award',
      communityPhotoUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=600&q=80',
      testimonial: impactData.testimonial
    };

    setImpacts(prev => [newImpact, ...prev]);
  };

  const resetToDemoSeed = () => {
    localStorage.removeItem('pb_challenges');
    localStorage.removeItem('pb_assignments');
    localStorage.removeItem('pb_submissions');
    localStorage.removeItem('pb_impacts');
    setChallenges(INITIAL_CHALLENGES);
    setAssignments(INITIAL_ASSIGNMENTS);
    setSubmissions(INITIAL_SUBMISSIONS);
    setImpacts(INITIAL_IMPACTS);
  };

  return (
    <PlatformContext.Provider value={{
      view,
      setView,
      role,
      setRole: handleSetRole,
      nonprofits,
      challenges,
      assignments,
      submissions,
      impacts,
      addChallenge,
      createAssignmentFromChallenge,
      submitStudentProject,
      updateTeacherFeedback,
      forwardSubmissionToNonProfit,
      adoptSubmissionAndCreateImpact,
      resetToDemoSeed
    }}>
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
