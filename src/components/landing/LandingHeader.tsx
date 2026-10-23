import React, { useState } from 'react';
import { ArrowRight, Menu, X, LayoutDashboard } from 'lucide-react';

interface LandingHeaderProps {
  onGetStarted: () => void;
  onEnterWorkspace: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = ({
  onGetStarted,
  onEnterWorkspace,
  onScrollToSection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E8E8EE] transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button
          onClick={() => handleNavClick('hero')}
          className="flex items-center gap-2.5 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191927] rounded-lg p-1 -ml-1 transition-transform"
          aria-label="Bucket Home"
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#191927] text-white shrink-0 group-hover:scale-105 transition-transform shadow-xs"
            aria-hidden="true"
          >
            <svg
              className="w-4 h-4 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 11 17.5 20a2 2 0 0 1-2 1.8H8.5A2 2 0 0 1 6.5 20L5 11" />
              <path d="M4 11h16" />
              <path d="M9 11V6a3 3 0 0 1 6 0v5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-[#191927] group-hover:text-[#08C83D] transition-colors">
              Bucket
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#646477]">
          <button
            onClick={() => handleNavClick('preview')}
            className="hover:text-[#191927] transition-colors cursor-pointer py-1"
          >
            Preview
          </button>
          <button
            onClick={() => handleNavClick('goals')}
            className="hover:text-[#191927] transition-colors cursor-pointer py-1"
          >
            Goals
          </button>
          <button
            onClick={() => handleNavClick('notes')}
            className="hover:text-[#191927] transition-colors cursor-pointer py-1"
          >
            Notes
          </button>
          <button
            onClick={() => handleNavClick('calendar')}
            className="hover:text-[#191927] transition-colors cursor-pointer py-1"
          >
            Calendar
          </button>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onEnterWorkspace}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#646477] hover:text-[#191927] hover:bg-[#F3F3F7] rounded-md transition-colors cursor-pointer"
            title="Launch interactive workspace"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Workspace</span>
          </button>
          <button
            onClick={onGetStarted}
            className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-white bg-[#191927] hover:bg-[#2C2C3F] active:bg-[#0E0E18] rounded-md transition-all shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#191927]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-80" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onGetStarted}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-[#191927] rounded-md"
          >
            Get Started
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#646477] hover:text-[#191927] hover:bg-[#F3F3F7] rounded-md transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-[#E8E8EE] bg-white px-4 py-3 space-y-2 shadow-md animate-fadeIn">
          <button
            onClick={() => handleNavClick('preview')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#191927] hover:bg-[#F3F3F7] rounded-md"
          >
            Interface Preview
          </button>
          <button
            onClick={() => handleNavClick('goals')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#191927] hover:bg-[#F3F3F7] rounded-md"
          >
            Goals & Bucket List
          </button>
          <button
            onClick={() => handleNavClick('notes')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#191927] hover:bg-[#F3F3F7] rounded-md"
          >
            Notes & Ideas
          </button>
          <button
            onClick={() => handleNavClick('calendar')}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#191927] hover:bg-[#F3F3F7] rounded-md"
          >
            Calendar Planning
          </button>
          <div className="pt-2 border-t border-[#E8E8EE] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onEnterWorkspace();
              }}
              className="w-full flex items-center justify-center gap-2 py-2 text-xs font-semibold text-[#191927] bg-[#F3F3F7] hover:bg-[#EBEBEF] rounded-md"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Launch Live Workspace</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
