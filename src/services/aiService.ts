import type { Milestone, RubricCriterion } from '../types';

export interface AIProblemRefinement {
  title: string;
  category: 'Tech & Web' | 'Marketing & Design' | 'Data & Research' | 'Community & Writing' | 'Environmental Science';
  urgency: 'High Need' | 'Medium' | 'Flexible';
  problemStatement: string;
  realWorldContext: string;
  targetDeliverables: string[];
  skillsWanted: string[];
}

export interface AICurriculumResult {
  standards: string[];
  milestones: Milestone[];
  rubric: RubricCriterion[];
  teacherInstructions: string;
}

export interface AIStudentCoachResult {
  readinessScore: number;
  strengths: string[];
  improvements: string[];
  realWorldAlignmentNote: string;
}

/**
 * Intelligent helper simulating or calling AI models to refine prompts,
 * adapt curriculum, and provide formative student guidance.
 */
export const aiService = {
  /**
   * Refines a rough non-profit prompt into an educational-grade challenge brief
   */
  async refineChallenge(rawDraft: string, organizationName: string): Promise<AIProblemRefinement> {
    // Simulate brief processing delay for realistic AI generation feel
    await new Promise(r => setTimeout(r, 600));

    const lower = rawDraft.toLowerCase();

    if (lower.includes('animal') || lower.includes('shelter') || lower.includes('pet')) {
      return {
        title: 'Digital Adoption Stories & Foster Care Campaign Kit',
        category: 'Marketing & Design',
        urgency: 'High Need',
        problemStatement: `At ${organizationName}, senior and special-needs animals stay in shelters 3x longer because standard adoption listings lack engaging visuals and heartfelt personal stories.`,
        realWorldContext: 'Every week an animal spends in a kennel increases stress behaviors. High-quality student-crafted social reels, photo essays, and printable foster-care posters directly increase foster home placements by an estimated 35%.',
        targetDeliverables: [
          '3 sample mini-documentary scripts / carousel cards for long-stay animals',
          'Printable QR-code foster flyer for local veterinary offices and coffee shops',
          'Social media caption kit highlighting pet personality quirks and medical foster needs'
        ],
        skillsWanted: ['Digital Storytelling', 'Graphic Design (Canva/Photoshop)', 'Empathy-Driven Copywriting']
      };
    }

    if (lower.includes('water') || lower.includes('recycle') || lower.includes('climate') || lower.includes('tree')) {
      return {
        title: 'Neighborhood Canopy & Heat Island Reduction Strategy',
        category: 'Environmental Science',
        urgency: 'Medium',
        problemStatement: `Urban neighborhoods served by ${organizationName} experience summer temperatures 7-10 degrees higher due to sparse tree canopy and asphalt density.`,
        realWorldContext: 'Elderly residents and children in these zones face acute heat illness risks. Student geospatial mapping and community planting guidebooks will be submitted directly to the city parks department for planting grants.',
        targetDeliverables: [
          'Microclimate assessment report mapping 3 high-priority street blocks',
          'Species selection guide of drought-tolerant shade trees',
          'Bilingual door-hanger flyer inviting residents to request free street saplings'
        ],
        skillsWanted: ['GIS / Data Mapping', 'Environmental Ecology', 'Bilingual Civic Outreach']
      };
    }

    // Default smart refinement based on input
    return {
      title: rawDraft.length > 30 ? rawDraft.slice(0, 45) + '...' : `Community Impact Initiative for ${organizationName}`,
      category: lower.includes('code') || lower.includes('app') || lower.includes('site') ? 'Tech & Web' : 'Marketing & Design',
      urgency: 'High Need',
      problemStatement: `Current outreach materials and resources at ${organizationName} are outdated, limiting community awareness and volunteer engagement.`,
      realWorldContext: `This challenge addresses a vital operational bottleneck. Solutions submitted by student teams will be directly reviewed by ${organizationName}'s leadership team for live public deployment.`,
      targetDeliverables: [
        'User-friendly deliverable prototype tailored to community accessibility standards',
        'Implementation cheat sheet for non-profit staff',
        'Brief presentation summary explaining design and impact choices'
      ],
      skillsWanted: ['Creative Problem Solving', 'Audience-Centered Design', 'Clear Technical Writing']
    };
  },

  /**
   * Adapts a community challenge into an educational rubric, standards, and milestone phases
   */
  async adaptToCurriculum(
    challengeTitle: string,
    nonprofitName: string,
    gradeLevel: string,
    subject: string
  ): Promise<AICurriculumResult> {
    await new Promise(r => setTimeout(r, 700));

    return {
      standards: [
        `CCSS.ELA-LITERACY.WHST.${gradeLevel.includes('9') ? '9-10' : '11-12'}.2: Produce clear and coherent writing in which the development, organization, and style are appropriate to task, purpose, and audience.`,
        `CSTA 3A-AP-14 / ISTE 1.4: Design and iteratively develop computational or digital artifacts to address authentic community problems in ${subject}.`,
        `Civic Engagement Standard 4: Collaborate with non-governmental stakeholders (${nonprofitName}) to evaluate real-world needs.`
      ],
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: 'Phase 1: Empathy Interview & Community Discovery',
          description: `Analyze ${nonprofitName}'s real-world constraints for "${challengeTitle}", explore end-user needs, and formulate initial problem statements.`,
          daysToComplete: 4
        },
        {
          id: `m-${Date.now()}-2`,
          title: 'Phase 2: Rapid Prototyping & Peer Critique',
          description: 'Construct low-fidelity draft / wireframes and conduct a peer review session using the empathy rubric.',
          daysToComplete: 6
        },
        {
          id: `m-${Date.now()}-3`,
          title: 'Phase 3: Accessibility & Quality Refinement',
          description: 'Test against WCAG readability and language guidelines; submit formal draft to teacher for vetting.',
          daysToComplete: 5
        },
        {
          id: `m-${Date.now()}-4`,
          title: 'Phase 4: Non-Profit Submission Portfolio',
          description: `Deliver finalized artifact and brief video summary for ${nonprofitName}'s executive review.`,
          daysToComplete: 3
        }
      ],
      rubric: [
        {
          id: `r-${Date.now()}-1`,
          criterion: 'Real-World Functionality & Mission Fit',
          description: `Directly addresses ${nonprofitName}'s challenge "${challengeTitle}"; deliverable is ready for real-world deployment without rework.`,
          points: 30
        },
        {
          id: `r-${Date.now()}-2`,
          criterion: 'Accessibility & User Dignity',
          description: 'Uses inclusive language, readable typography, high-contrast visual design, and respectful tone.',
          points: 25
        },
        {
          id: `r-${Date.now()}-3`,
          criterion: 'Technical / Design Craftsmanship',
          description: `Demonstrates mastery of ${subject} principles, modular organization, and thoughtful execution.`,
          points: 25
        },
        {
          id: `r-${Date.now()}-4`,
          criterion: 'Civic Reflection & Empathy',
          description: 'Student demonstrates deep understanding of community impact, client constraints, and human stakes.',
          points: 20
        }
      ],
      teacherInstructions: `Guide students to treat ${nonprofitName} as a real client for "${challengeTitle}" in ${subject}. Emphasize that top deliverables will be officially forwarded to the organization's leadership. Protect student PII by using team aliases.`
    };
  },

  /**
   * Provides formative coaching to students before they submit to the teacher
   */
  async coachStudentDraft(
    projectTitle: string,
    summary: string,
    solutionDesc: string
  ): Promise<AIStudentCoachResult> {
    await new Promise(r => setTimeout(r, 600));

    const wordCount = solutionDesc.split(/\s+/).filter(Boolean).length;

    return {
      readinessScore: 92,
      strengths: [
        `Strong client focus: "${projectTitle}" directly considers the daily hurdles faced by end users.`,
        `Clear summary: Your overview explains both the "what" and the "how" with clarity.`,
        `Authentic purpose: Addressing "${summary.slice(0, 45)}..." provides tangible community utility.`
      ],
      improvements: [
        wordCount < 20 
          ? `Elaborate slightly on your technical/design choices so Mr. Davis and the partner can appreciate your workflow.`
          : `Consider testing your project with someone outside your team to ensure there are no confusing terms.`,
        `Make sure your deliverable link has public view permissions enabled before Mr. Davis forwards it to the non-profit.`
      ],
      realWorldAlignmentNote: `Your draft "${projectTitle}" aligns closely with the non-profit partner’s urgency and target deliverables!`
    };
  }
};
