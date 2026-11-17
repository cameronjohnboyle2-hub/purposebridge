export type UserRole = 'nonprofit' | 'teacher' | 'student';

export type ChallengeCategory = 
  | 'Tech & Web'
  | 'Marketing & Design'
  | 'Data & Research'
  | 'Community & Writing'
  | 'Environmental Science';

export interface NonProfit {
  id: string;
  name: string;
  logoUrl?: string;
  mission: string;
  location: string;
  website: string;
  contactPerson: string;
  impactSummary: string;
}

export interface Challenge {
  id: string;
  nonprofitId: string;
  nonprofitName: string;
  nonprofitLogo?: string;
  nonprofitLocation: string;
  title: string;
  problemStatement: string;
  realWorldContext: string;
  category: ChallengeCategory;
  urgency: 'High Need' | 'Medium' | 'Flexible';
  targetDeliverables: string[];
  skillsWanted: string[];
  createdAt: string;
  status: 'open' | 'adapted' | 'in_progress' | 'completed';
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  daysToComplete: number;
}

export interface RubricCriterion {
  id: string;
  criterion: string;
  description: string;
  points: number;
}

export interface Assignment {
  id: string;
  challengeId: string;
  challengeTitle: string;
  nonprofitName: string;
  teacherId: string;
  teacherName: string;
  schoolName: string;
  classroomName: string;
  gradeLevel: string;
  subject: string;
  standards: string[];
  milestones: Milestone[];
  rubric: RubricCriterion[];
  teacherInstructions: string;
  dueDate: string;
  createdAt: string;
}

export interface StudentSubmission {
  id: string;
  assignmentId: string;
  challengeId: string;
  challengeTitle: string;
  nonprofitName: string;
  studentAlias: string; // e.g. "Maya C. & Leo K. (Team EcoTech)"
  classroomName: string;
  projectTitle: string;
  summary: string;
  solutionDescription: string;
  deliverableType: 'Live Demo Link' | 'Figma / Design Mockups' | 'PDF / Report' | 'GitHub Repository' | 'Slide Deck';
  deliverableUrl: string;
  previewSnippet?: string;
  submittedAt: string;
  status: 'draft' | 'submitted_to_teacher' | 'teacher_revision_requested' | 'teacher_approved' | 'forwarded_to_nonprofit' | 'adopted_by_nonprofit';
  teacherFeedback?: string;
  teacherGrade?: string;
  aiCoachNotes?: {
    strengths: string[];
    improvements: string[];
    readinessScore: number;
  };
}

export interface ImpactRecord {
  id: string;
  challengeId: string;
  challengeTitle: string;
  submissionId: string;
  studentAlias: string;
  nonprofitName: string;
  directorName: string;
  adoptedDate: string;
  headlineQuote: string;
  measurableOutcomes: string[];
  badgeName: string;
  badgeIcon: string;
  communityPhotoUrl?: string;
  testimonial: string;
}
