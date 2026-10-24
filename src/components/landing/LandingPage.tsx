import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { LandingHeader } from './LandingHeader';
import { InterfacePreview } from './InterfacePreview';

interface LandingPageProps {
  onGetStarted: () => void;
  onEnterWorkspace: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGetStarted,
  onEnterWorkspace,
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#191927] flex flex-col selection:bg-[#08C83D]/15 selection:text-[#191927]">
      {/* 1. Compact Navigation Header */}
      <LandingHeader
        onGetStarted={onGetStarted}
        onEnterWorkspace={onEnterWorkspace}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <section
          id="hero"
          className="pt-16 pb-12 sm:pt-24 sm:pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center"
        >
          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#191927] leading-[1.08] max-w-3xl mx-auto">
            Make room for what matters.
          </h1>

          {/* Supporting Text */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-[#646477] leading-relaxed max-w-xl mx-auto font-normal">
            Your goals, notes, and plans. One calm space.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#191927] hover:bg-[#2C2C3F] active:bg-[#0E0E18] rounded-xl transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191927] min-h-[44px]"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('preview')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#191927] bg-white hover:bg-[#F3F3F7] active:bg-[#EBEBEF] border border-[#E8E8EE] rounded-xl transition-colors cursor-pointer min-h-[44px]"
            >
              <span>Explore Bucket</span>
            </button>
          </div>
        </section>

        {/* 3. Genuine Product Preview */}
        <section
          id="preview"
          className="pb-20 sm:pb-28 px-4 sm:px-6 max-w-5xl mx-auto scroll-mt-14"
        >
          <div className="text-center max-w-md mx-auto mb-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#646477]">
              Product Preview
            </h2>
            <p className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-[#191927]">
              Designed for clarity and momentum
            </p>
          </div>

          <InterfacePreview
            onEnterWorkspace={onEnterWorkspace}
            onGetStarted={onGetStarted}
          />
        </section>
      </main>

      {/* 4. Minimal Footer */}
      <footer className="border-t border-[#E8E8EE] bg-white py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#646477]">
          {/* Brand & Wordmark */}
          <div className="flex items-center gap-2.5">
            <div
              className="w-5 h-5 rounded flex items-center justify-center bg-[#191927] text-white shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-3 h-3 text-white"
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
            <span className="font-semibold text-[#191927]">Bucket</span>
            <span className="text-[#8E8EA0]">·</span>
            <span>One calm space for what matters.</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-5 font-medium">
            <button
              type="button"
              onClick={() => scrollToSection('preview')}
              className="hover:text-[#191927] transition-colors cursor-pointer"
            >
              Preview
            </button>
            <button
              type="button"
              onClick={onEnterWorkspace}
              className="hover:text-[#191927] transition-colors cursor-pointer"
            >
              Workspace
            </button>
            <button
              type="button"
              onClick={onGetStarted}
              className="hover:text-[#08C83D] font-semibold text-[#191927] transition-colors cursor-pointer"
            >
              Get started
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-6 pt-4 border-t border-[#F0F0F4] text-[11px] text-[#8E8EA0] text-center sm:text-left">
          <span>© {new Date().getFullYear()} Bucket. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};
