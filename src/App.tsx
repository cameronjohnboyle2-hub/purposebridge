import React from 'react';
import { PlatformProvider, usePlatform } from './context/PlatformContext';
import { Header } from './components/layout/Header';
import { LandingPage } from './components/landing/LandingPage';
import { NonProfitDashboard } from './components/nonprofit/NonProfitDashboard';
import { TeacherDashboard } from './components/teacher/TeacherDashboard';
import { StudentDashboard } from './components/student/StudentDashboard';
import { HeartHandshake } from 'lucide-react';

const MainContent: React.FC = () => {
  const { view, role } = usePlatform();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'landing' ? (
          <LandingPage />
        ) : (
          <>
            {role === 'nonprofit' && <NonProfitDashboard />}
            {role === 'teacher' && <TeacherDashboard />}
            {role === 'student' && <StudentDashboard />}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-indigo-600" />
            <span className="font-bold text-slate-800">PurposeBridge Platform</span>
            <span>• Built for the AI Day Hackathon</span>
          </div>

          <div className="flex items-center gap-6">
            <span>Solving the K-12 Student Engagement Crisis with Authentic Purpose</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">FERPA Safeguarded</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <PlatformProvider>
      <MainContent />
    </PlatformProvider>
  );
}
