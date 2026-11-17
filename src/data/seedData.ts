import type { Challenge, Assignment, StudentSubmission, ImpactRecord, NonProfit } from '../types';

export const INITIAL_NONPROFITS: NonProfit[] = [
  {
    id: 'np-1',
    name: 'Metro Food Relief Network',
    location: 'Seattle, WA',
    website: 'https://metrofoodrelief.example.org',
    contactPerson: 'Elena Rostova, Director of Outreach',
    mission: 'Connecting surplus fresh produce from grocery partners to 42 local neighborhood pantries and community fridges.',
    impactSummary: 'Over 850,000 lbs of food rescued annually, serving 14,000 families across King County.'
  },
  {
    id: 'np-2',
    name: 'Wildlands & Pollinator Coalition',
    location: 'Austin, TX',
    website: 'https://wildlandspollinators.example.org',
    contactPerson: 'Dr. Marcus Vance, Conservation Lead',
    mission: 'Restoring native wildflower corridors and educating urban communities on protecting declining bee and butterfly populations.',
    impactSummary: '12 active urban habitat restoration pockets and 35 partner community gardens.'
  },
  {
    id: 'np-3',
    name: 'SilverTech Community Connect',
    location: 'Chicago, IL',
    website: 'https://silvertechconnect.example.org',
    contactPerson: 'Grace H. Washington, Programs Lead',
    mission: 'Closing the digital literacy gap for seniors so they can safely manage telehealth appointments, communicate with family, and avoid online scams.',
    impactSummary: 'Trained over 1,200 seniors across 16 retirement and community centers.'
  },
  {
    id: 'np-4',
    name: 'Esperanza Youth Literacy Project',
    location: 'Denver, CO',
    website: 'https://esperanzaliteracy.example.org',
    contactPerson: 'Carlos Delgado, Community Librarian',
    mission: 'Creating accessible bilingual early-reading materials and after-school reading clubs for first-generation immigrant elementary students.',
    impactSummary: 'Distributed 6,000 books and established 18 free mini-libraries across East Denver.'
  }
];

export const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    nonprofitId: 'np-1',
    nonprofitName: 'Metro Food Relief Network',
    nonprofitLocation: 'Seattle, WA',
    title: 'Interactive Food Desert & Pantry Access Map',
    category: 'Tech & Web',
    urgency: 'High Need',
    problemStatement: 'Many low-income families in South King County do not know which food pantries are open on weekends or have refrigerated infant formula and fresh produce. Our current PDF schedule is constantly out of date and hard to read on phones.',
    realWorldContext: 'If families cannot quickly see operating hours, walkability transit routes, and special items available in real-time, families travel for hours only to find doors locked. We desperately need a simple, mobile-friendly interactive directory or clickable prototype.',
    targetDeliverables: [
      'Mobile-first responsive web prototype or clickable Figma mockups',
      'Filterable list by neighborhood, weekend hours, and special dietary needs',
      'Transit route/bus line helper suggestions'
    ],
    skillsWanted: ['Web Development / HTML/CSS/JS', 'UX Design', 'Community Data Mapping'],
    createdAt: '2026-11-02',
    status: 'in_progress'
  },
  {
    id: 'ch-2',
    nonprofitId: 'np-3',
    nonprofitName: 'SilverTech Community Connect',
    nonprofitLocation: 'Chicago, IL',
    title: 'Illustrated "Jargon-Free" Telehealth & Scam Prevention Guide',
    category: 'Marketing & Design',
    urgency: 'High Need',
    problemStatement: 'Seniors at our community centers are frequently intimidated by complex medical app logins or fall victim to phishing phone calls pretending to be Medicare representatives. Tech manuals use acronyms and confusing jargon.',
    realWorldContext: 'Over 65% of our community members report feeling severe anxiety when doctors ask them to join video calls. We need an engaging, large-print, step-by-step pocket booklet and printable cheat-sheet posters that demystify video calls and teach seniors how to spot phishing scams.',
    targetDeliverables: [
      'Printable 8-page booklet (large 16pt font, high contrast, clean graphics)',
      '1-page "Refrigerator Quick Reference Card" for scam red flags',
      'Friendly language guide without technical acronyms'
    ],
    skillsWanted: ['Graphic Design / Canva', 'Technical Writing', 'Accessibility Design'],
    createdAt: '2026-10-18',
    status: 'completed'
  },
  {
    id: 'ch-3',
    nonprofitId: 'np-2',
    nonprofitName: 'Wildlands & Pollinator Coalition',
    nonprofitLocation: 'Austin, TX',
    title: 'Schoolyard Micro-Habitat Biodiversity Field Guide & Campaign',
    category: 'Environmental Science',
    urgency: 'Medium',
    problemStatement: 'Urban development has reduced native monarch butterfly and bumblebee nesting zones by 40% along the Central Texas corridor. Most neighborhood residents do not realize their backyards or apartment balconies could serve as crucial stepping stones.',
    realWorldContext: 'We need high school environmental science classes to catalog native flora, design a pocket guide for 5 easy native pollinator plants, and create social media infographics for a citywide "Leave the Leaves" autumn campaign.',
    targetDeliverables: [
      'Species identification cards with soil and sunlight tips',
      'Instagram/TikTok awareness carousel graphics on pesticide alternatives',
      'Budget estimate for planting a 10x10 pollinator patch'
    ],
    skillsWanted: ['Biology / Ecology', 'Infographic Design', 'Digital Communications'],
    createdAt: '2026-11-05',
    status: 'open'
  },
  {
    id: 'ch-4',
    nonprofitId: 'np-4',
    nonprofitName: 'Esperanza Youth Literacy Project',
    nonprofitLocation: 'Denver, CO',
    title: 'Bilingual Illustrated Storybooks on Resilience & Belonging',
    category: 'Community & Writing',
    urgency: 'Medium',
    problemStatement: 'Elementary ESL learners often struggle to find early-reader stories that reflect their bilingual experience and multicultural family transitions. Books available in stores often cost too much for underfunded community centers.',
    realWorldContext: 'We want student authors and digital illustrators to create vibrant, heartwarming 12-page bilingual (English/Spanish) read-along picture books that we can print for free distribution at our after-school reading clubs.',
    targetDeliverables: [
      'Original 12-page illustrated digital story with parallel English/Spanish text',
      'Printable coloring activity sheet related to the story characters',
      'Simple audio recording or narration accompaniment'
    ],
    skillsWanted: ['Creative Writing', 'Spanish Translation', 'Digital Illustration'],
    createdAt: '2026-11-08',
    status: 'open'
  }
];

export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-1',
    challengeId: 'ch-1',
    challengeTitle: 'Interactive Food Desert & Pantry Access Map',
    nonprofitName: 'Metro Food Relief Network',
    teacherId: 'teach-1',
    teacherName: 'Marcus Davis',
    schoolName: 'Lincoln Heights Community High School',
    classroomName: 'Period 3: Computer Science & Digital Civics',
    gradeLevel: '10th - 11th Grade',
    subject: 'Computer Science / Civics',
    standards: [
      'CSTA 3A-AP-14: Design and iteratively develop computational artifacts.',
      'CCSS.ELA-LITERACY.RST.9-10.7: Translate quantitative or technical information into visual representations.',
      'Civic Tech Standard: Addressing community disparities using digital tools.'
    ],
    milestones: [
      {
        id: 'm1',
        title: 'Phase 1: Needs Analysis & Wireframing',
        description: 'Interview non-profit partner brief, interview family needs, sketch 3 low-fidelity mobile layouts.',
        daysToComplete: 5
      },
      {
        id: 'm2',
        title: 'Phase 2: Data Cleaning & Feature Prototype',
        description: 'Organize 25 pantry datasets (hours, locations, transit stops) and implement clickable filters.',
        daysToComplete: 7
      },
      {
        id: 'm3',
        title: 'Phase 3: Accessibility Audit & Teacher Review',
        description: 'Run WCAG contrast checks, Spanish language toggle readiness, submit draft to Mr. Davis.',
        daysToComplete: 4
      },
      {
        id: 'm4',
        title: 'Phase 4: Final Presentation & Non-Profit Delivery',
        description: 'Polish submission, record a 2-minute demo video for Metro Food Relief Network.',
        daysToComplete: 4
      }
    ],
    rubric: [
      {
        id: 'r1',
        criterion: 'Real-World Usability & Mobile Accessibility',
        description: 'Clear UI, easy navigation for non-technical users, high color contrast, readable text.',
        points: 30
      },
      {
        id: 'r2',
        criterion: 'Data Accuracy & Transit Route Guidance',
        description: 'Accurate operating hours, filter logic for baby formula/refrigerated goods, nearby bus routes.',
        points: 30
      },
      {
        id: 'r3',
        criterion: 'Iterative Development & Code Quality',
        description: 'Clean repository, modular components, responsive design across screen sizes.',
        points: 25
      },
      {
        id: 'r4',
        criterion: 'Empathy & Civic Impact Reflection',
        description: 'Demonstrates deep understanding of end-user dignity, constraints, and non-profit workflow.',
        points: 15
      }
    ],
    teacherInstructions: 'Remember: Your prototype is not just homework—Elena at Metro Food Relief will be reviewing the top prototypes to guide their real winter outreach rollout. Keep designs clean and respect user bandwidth constraints.',
    dueDate: '2026-11-28',
    createdAt: '2026-11-04'
  },
  {
    id: 'asg-2',
    challengeId: 'ch-2',
    challengeTitle: 'Illustrated "Jargon-Free" Telehealth & Scam Prevention Guide',
    nonprofitName: 'SilverTech Community Connect',
    teacherId: 'teach-2',
    teacherName: 'Sarah Jenkins',
    schoolName: 'Oakridge Arts & Technology Academy',
    classroomName: 'Period 4: Graphic Design & Applied Communications',
    gradeLevel: '11th - 12th Grade',
    subject: 'Visual Communications / Digital Media',
    standards: [
      'AASL 1.B.1: Learners generate products that illustrate learning.',
      'CCSS.ELA-LITERACY.WHST.11-12.2: Write informative/explanatory texts to convey complex ideas clearly.'
    ],
    milestones: [
      {
        id: 'm2-1',
        title: 'User Persona Empathy Mapping',
        description: 'Interview a senior relative or community center volunteer on tech anxieties.',
        daysToComplete: 4
      },
      {
        id: 'm2-2',
        title: 'Drafting Copy & Anti-Jargon Glossary',
        description: 'Translate confusing terms like "Two-Factor Auth" and "Phishing Link" into gentle metaphors.',
        daysToComplete: 5
      },
      {
        id: 'm2-3',
        title: 'Graphic Layout & Contrast Testing',
        description: 'Design 8 pages with large type, warm illustrations, and printable format.',
        daysToComplete: 6
      }
    ],
    rubric: [
      { id: 'r2-1', criterion: 'Clarity & Empathy in Language', description: 'Zero tech jargon, gentle and empowering tone.', points: 35 },
      { id: 'r2-2', criterion: 'Visual Accessibility', description: 'High contrast, 16pt+ typography, clear visual hierarchy.', points: 35 },
      { id: 'r2-3', criterion: 'Actionable Scam Checklist', description: 'Practical 3-step test for seniors to verify suspicious calls.', points: 30 }
    ],
    teacherInstructions: 'Grace from SilverTech will be selecting the top booklet to print and distribute across 16 Chicago senior community centers.',
    dueDate: '2026-11-15',
    createdAt: '2026-10-20'
  }
];

export const INITIAL_SUBMISSIONS: StudentSubmission[] = [
  {
    id: 'sub-1',
    assignmentId: 'asg-2',
    challengeId: 'ch-2',
    challengeTitle: 'Illustrated "Jargon-Free" Telehealth & Scam Prevention Guide',
    nonprofitName: 'SilverTech Community Connect',
    studentAlias: 'Maya C. & Tariq N. (Team GoldenGuard)',
    classroomName: 'Period 4: Graphic Design & Applied Communications',
    projectTitle: 'The Calm & Confident Senior Tech Handbook',
    summary: 'A pocket-sized 8-page large-print guide featuring illustrated animal characters that explain video doctor visits and provide a simple 3-step "Pause, Check, Verify" rule for phone scams.',
    solutionDescription: 'We focused on reducing anxiety. Rather than red scary warnings, we used soothing teal and peach palettes with 18pt friendly serif type. We included a laminated-style "Fridge Card" that lists 5 official Medicare contact methods and warns against gift card scams.',
    deliverableType: 'Figma / Design Mockups',
    deliverableUrl: 'https://figma.example.com/file/calm-confident-senior-guide',
    previewSnippet: 'Page 3: "How to Join Your Doctor on Camera in 3 Taps" — includes life-size button illustrations matching actual tablet screens.',
    submittedAt: '2026-11-10',
    status: 'adopted_by_nonprofit',
    teacherFeedback: 'Outstanding work Maya and Tariq! Your empathy for older adults shines through every page. The contrast ratios pass AAA accessibility standards.',
    teacherGrade: '98 / 100 (Exemplary)',
    aiCoachNotes: {
      strengths: [
        'Exceptional typography hierarchy suitable for low-vision readers',
        'Concrete examples of phone scams rather than vague warnings',
        'Empowering tone that does not speak down to seniors'
      ],
      improvements: [
        'Consider adding a tiny Spanish subtitle on key phone numbers'
      ],
      readinessScore: 96
    }
  },
  {
    id: 'sub-2',
    assignmentId: 'asg-1',
    challengeId: 'ch-1',
    challengeTitle: 'Interactive Food Desert & Pantry Access Map',
    nonprofitName: 'Metro Food Relief Network',
    studentAlias: 'Jordan P. & Samira B. (CivicBytes)',
    classroomName: 'Period 3: Computer Science & Digital Civics',
    projectTitle: 'PantryPulse: Instant Low-Bandwidth Food Finder',
    summary: 'A lightweight mobile web app that loads under 50KB, works offline via service workers, and displays real-time open status for 38 food pantries with transit bus line tags.',
    solutionDescription: 'Because many clients have limited prepaid cellular data plans, we built PantryPulse with zero bulky frameworks so it loads instantly even on 3G speeds. Users can filter by "Open Now", "Baby Formula Available", and "Walkable from RapidRide Transit Line".',
    deliverableType: 'Live Demo Link',
    deliverableUrl: 'https://pantrypulse-seattle.example.dev',
    previewSnippet: 'Features offline caching of pantry schedules and 1-tap Spanish / Vietnamese language translations.',
    submittedAt: '2026-11-14',
    status: 'forwarded_to_nonprofit',
    teacherFeedback: 'Brilliant thinking on low-bandwidth constraints! I have forwarded this directly to Elena at Metro Food Relief Network for their tech committee review.',
    teacherGrade: '95 / 100',
    aiCoachNotes: {
      strengths: [
        'Under-50KB asset payload directly addresses real-world client equity constraints',
        'Clear transit line integration',
        'Intuitive one-tap language switching'
      ],
      improvements: [
        'Add wheelchair accessibility badges to individual pantry locations'
      ],
      readinessScore: 94
    }
  },
  {
    id: 'sub-3',
    assignmentId: 'asg-1',
    challengeId: 'ch-1',
    challengeTitle: 'Interactive Food Desert & Pantry Access Map',
    nonprofitName: 'Metro Food Relief Network',
    studentAlias: 'Alex K. & Chloe D. (Team FreshRoute)',
    classroomName: 'Period 3: Computer Science & Digital Civics',
    projectTitle: 'FreshRoute SMS & Web Pantry Directory',
    summary: 'A hybrid web and SMS interface allowing community members to text their zip code to receive the nearest 2 open pantries and today\'s specialty food inventory.',
    solutionDescription: 'We noticed some unhoused folks don\'t have smart phones but have flip phones with basic texting. We built a Twilio test integration and a companion web map.',
    deliverableType: 'GitHub Repository',
    deliverableUrl: 'https://github.com/lincoln-civic-tech/freshroute-sms',
    previewSnippet: 'Text "FOOD 98118" to 555-PANTRY for instant address, hours, and Spanish assistance availability.',
    submittedAt: '2026-11-15',
    status: 'submitted_to_teacher',
    aiCoachNotes: {
      strengths: [
        'Creative multi-channel access (SMS + Web) addressing digital divide',
        'Clear documentation in the GitHub README'
      ],
      improvements: [
        'Ensure cost estimates for SMS numbers are documented for the non-profit'
      ],
      readinessScore: 88
    }
  }
];

export const INITIAL_IMPACTS: ImpactRecord[] = [
  {
    id: 'imp-1',
    challengeId: 'ch-2',
    challengeTitle: 'Illustrated "Jargon-Free" Telehealth & Scam Prevention Guide',
    submissionId: 'sub-1',
    studentAlias: 'Maya C. & Tariq N. (Team GoldenGuard)',
    nonprofitName: 'SilverTech Community Connect',
    directorName: 'Grace H. Washington',
    adoptedDate: '2026-11-12',
    headlineQuote: 'Our seniors were so proud to hold a guide written specifically for their dignity. Maya and Tariq’s work is actively protecting people from financial fraud every single day.',
    measurableOutcomes: [
      '1,200 physical booklets printed and distributed across 16 Chicago senior centers',
      '450 laminated refrigerator scam-alert cards placed in residential units',
      'Zero reported successful phone scams among workshop attendees in November',
      'Featured in the Chicago Community Health & Aging Quarterly Newsletter'
    ],
    badgeName: 'Community Guardian & Accessibility Champion',
    badgeIcon: 'ShieldCheck',
    communityPhotoUrl: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=600&q=80',
    testimonial: 'Before this handbook, Mrs. Henderson was terrified to click her doctor’s video link for her cardiovascular follow-up. Using Page 3’s step-by-step illustrations, she joined independently last week with no stress. High school students made that possible.'
  }
];
