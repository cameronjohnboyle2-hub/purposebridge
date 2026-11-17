import React from 'react';
import { usePlatform } from '../../context/PlatformContext';
import { 
  Sparkles, 
  ArrowRight, 
  Building2, 
  BookOpen, 
  GraduationCap, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  TrendingDown,
  Compass
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole } = usePlatform();

  return (
    <div className="space-y-16 py-4">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-14 shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-bold text-indigo-300">
            <Sparkles className="w-4 h-4 text-amber-400" />
            AI Day Hackathon • Purpose-Driven Learning Platform
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-tight">
            Stop Doing Busywork. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-emerald-300 to-amber-300">
              Start Making Real Community Impact.
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            High school students are checking out because schoolwork feels useless. Meanwhile, local non-profits are starved for help. <strong>PurposeBridge</strong> connects them: non-profits post authentic problems, teachers adapt them into standards-aligned projects, and students create solutions that are actually put to use in the real world.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setRole('teacher')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 text-white font-extrabold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Launch Live Interactive Demo</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-sm border border-white/15 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-indigo-300" />
              <span>How It Works</span>
            </a>
          </div>

          {/* Quick Stats Ticker */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800 text-left max-w-3xl mx-auto">
            <div>
              <div className="text-2xl font-black text-white">32%</div>
              <div className="text-xs text-slate-400">High School Student Engagement (Gallup)</div>
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-400">100%</div>
              <div className="text-xs text-slate-400">Authentic Non-Profit Challenges</div>
            </div>
            <div>
              <div className="text-2xl font-black text-indigo-400">FERPA</div>
              <div className="text-xs text-slate-400">Safeguarded Student Sandbox</div>
            </div>
            <div>
              <div className="text-2xl font-black text-amber-400">Verified</div>
              <div className="text-xs text-slate-400">Real-World Community Outcomes</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM WE ARE SOLVING */}
      <section className="max-w-5xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">The Core Disconnect</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why Students Check Out — And How PurposeBridge Fixes It
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
            Education research shows engagement collapses between 5th and 11th grade because schoolwork turns into repetitive test drills with zero real-world consequence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Card: The Old Way */}
          <div className="bg-rose-50/50 rounded-2xl border border-rose-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-700 font-extrabold text-sm">
              <TrendingDown className="w-5 h-5" />
              The Traditional Classroom Dilemma
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>Purpose-Free "Busywork":</strong> Students fill out worksheets that are graded and immediately thrown into the recycling bin.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>The "Google / AI" Problem:</strong> When answers can be retrieved by an LLM in 2 seconds, students feel like human printers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span><strong>"When will I ever use this?":</strong> Students have no idea why quadratic equations, essays, or code matter to anybody outside school walls.</span>
              </li>
            </ul>
          </div>

          {/* Card: The PurposeBridge Way */}
          <div className="bg-emerald-50/50 rounded-2xl border border-emerald-200 p-6 space-y-4">
            <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              The PurposeBridge Authentic Model
            </div>
            <ul className="space-y-3 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Real Needs from Verified Non-Profits:</strong> Students work on real food pantry maps, senior tech guides, environmental field studies, and bilingual storybooks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Teacher-Moderated Learning Sandbox:</strong> Teachers adapt problems into safe, standards-aligned assignments with AI rubrics and milestones.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold shrink-0">✓</span>
                <span><strong>Closed-Loop Real Impact:</strong> Top student projects are deployed into the community, earning verifiable badges and impact certificates for college resumes.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (THE 4-STEP CYCLE) */}
      <section id="how-it-works" className="max-w-5xl mx-auto scroll-mt-24">
        <div className="text-center space-y-2 mb-10">
          <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">The 4-Step Closed Loop</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            How PurposeBridge Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            From community need to classroom curriculum to live community adoption.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-sm">
              1
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-emerald-600" />
              Non-Profit Posts Need
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Charities post real hurdles (web tools, guides, campaigns). The built-in <strong>AI Refiner</strong> formats vague notes into clean educational briefs.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative hover:border-indigo-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-sm">
              2
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Teacher Adapts
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Educators choose a challenge and click <strong>AI Curriculum Adapter</strong> to generate aligned Common Core/CSTA standards, milestones, and rubrics.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative hover:border-amber-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
              3
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              Student Builds & Vets
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Students build in a safe sandbox, run <strong>AI Pre-Flight checks</strong>, and receive teacher advice. Teachers forward the best work to the partner.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative hover:border-emerald-300 transition-all">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black text-sm shadow-md">
              4
            </div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              Real Impact Verified
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The non-profit adopts the solution into production, logs metrics, and awards the student team a verified <strong>Certificate of Community Impact</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CHOOSE YOUR TOUR (INTERACTIVE PERSONA CARDS) */}
      <section className="max-w-5xl mx-auto bg-slate-100/70 p-6 md:p-8 rounded-3xl border border-slate-200">
        <div className="text-center space-y-2 mb-8">
          <div className="text-xs font-extrabold uppercase tracking-widest text-indigo-600">Live Hackathon Exploration</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Choose a Role to Enter the Platform
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto">
            You can switch between any of these 3 perspectives at any time using the sticky top bar!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Persona 1: Non-Profit */}
          <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">Persona 1</div>
              <h3 className="font-extrabold text-slate-900 text-lg">Elena Rostova</h3>
              <div className="text-xs text-slate-500 font-medium">Director • Metro Food Relief Network</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Post emergency community challenges using the <strong>AI Prompt Refiner</strong>, review teacher-vetted student submissions, and officially adopt projects for public rollout.
              </p>
            </div>

            <button
              onClick={() => setRole('nonprofit')}
              className="mt-6 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Enter as Non-Profit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Persona 2: Teacher */}
          <div className="bg-white rounded-2xl border border-indigo-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-800">Persona 2</div>
              <h3 className="font-extrabold text-slate-900 text-lg">Marcus Davis</h3>
              <div className="text-xs text-slate-500 font-medium">11th Grade Civics & Tech Educator</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Browse non-profit needs, use the <strong>AI Curriculum Adapter</strong> to scaffold standard rubrics and milestones, grade drafts, and forward top projects to charity directors.
              </p>
            </div>

            <button
              onClick={() => setRole('teacher')}
              className="mt-6 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Enter as Teacher</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Persona 3: Student */}
          <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Persona 3</div>
              <h3 className="font-extrabold text-slate-900 text-lg">Maya Chen & Team</h3>
              <div className="text-xs text-slate-500 font-medium">11th Grade Student Lead • Team EchoImpact</div>
              <p className="text-xs text-slate-600 leading-relaxed">
                See the real-world purpose behind your assignment, run <strong>AI Pre-Flight checks</strong> on your draft, and view your verified community impact badge and certificate.
              </p>
            </div>

            <button
              onClick={() => setRole('student')}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Enter as Student</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. CHILD PRIVACY / FERPA CALLOUT */}
      <section className="max-w-4xl mx-auto p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
        <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900">Built with Student Privacy & FERPA Compliance:</strong> Under-18 students are protected in a walled-garden sandbox. Outside organizations never have direct private access or unmoderated communication with students. All projects forwarded to non-profits are vetted by certified teachers and anonymized to team aliases.
        </div>
      </section>
    </div>
  );
};
