import React, { useEffect } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Calendar as CalendarIcon,
  FileText,
  Target,
  Sparkles,
  ShieldCheck,
  Zap,
  Layers,
  ChevronRight,
} from 'lucide-react';
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#191927] flex flex-col selection:bg-[#08C83D]/20 selection:text-[#191927]">
      {/* 1. Header */}
      <LandingHeader
        onGetStarted={onGetStarted}
        onEnterWorkspace={onEnterWorkspace}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* 1. HERO SECTION */}
        <section
          id="hero"
          className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 px-4 sm:px-6 max-w-5xl mx-auto text-center"
        >
          {/* Subtle badge / pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#E8E8EE] shadow-xs text-xs font-semibold text-[#646477] mb-8 animate-fadeIn">
            <span className="w-2 h-2 rounded-full bg-[#08C83D] animate-pulse" />
            <span>Personal Workspace &amp; Goal Planner</span>
          </div>

          {/* Suggested Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#191927] leading-[1.08] max-w-4xl mx-auto transition-all">
            Make room for what matters.
          </h1>

          {/* Supporting Text */}
          <p className="mt-6 text-base sm:text-lg md:text-xl text-[#646477] leading-relaxed max-w-2xl mx-auto font-normal">
            Keep your goals, ideas, and plans in one calm space. Organize what matters
            today and make steady progress toward what matters most.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-[#191927] hover:bg-[#2C2C3F] active:bg-[#0E0E18] rounded-xl shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191927]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection('preview')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#191927] bg-white hover:bg-[#F3F3F7] border border-[#E8E8EE] rounded-xl shadow-xs transition-all duration-200 cursor-pointer"
            >
              <span>Explore Bucket</span>
              <ChevronRight className="w-4 h-4 text-[#8E8EA0]" />
            </button>
          </div>

          {/* Micro assurances */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs text-[#8E8EA0]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#08C83D]" />
              Private &amp; Local Storage
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[#08C83D]" />
              Zero Configuration
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#08C83D]" />
              Notion-Inspired Calm
            </span>
          </div>
        </section>

        {/* 2. VISUAL PREVIEW OF THE EXISTING BUCKET INTERFACE */}
        <section
          id="preview"
          className="pb-24 sm:pb-32 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#08C83D]">
              Interface Preview
            </h2>
            <p className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#191927]">
              A clutter-free canvas built for deliberate living
            </p>
            <p className="mt-2 text-sm text-[#646477]">
              Switch tabs in the preview below to inspect real Bucket components in action.
            </p>
          </div>

          <InterfacePreview onEnterWorkspace={onEnterWorkspace} />
        </section>

        {/* 3. GOALS & BUCKET-LIST MANAGEMENT SECTION */}
        <section
          id="goals"
          className="py-20 sm:py-28 bg-white border-y border-[#E8E8EE] scroll-mt-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text narrative */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#08C83D]">
                  <Target className="w-4 h-4" />
                  <span>Intentional Ambitions</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#191927] leading-tight">
                  Turn long-term dreams into steady milestones.
                </h2>
                <p className="text-sm sm:text-base text-[#646477] leading-relaxed">
                  Bucket separates distant aspirations from your immediate week. Prioritize
                  your bucket list with clean tiers, assign deadlines, and track status
                  from <span className="font-semibold text-[#191927]">Not Started</span> to{' '}
                  <span className="font-semibold text-[#08C83D]">Completed</span> without the
                  overwhelm of complex project trackers.
                </p>

                <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#191927]">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#08C83D] shrink-0 mt-0.5" />
                    <span>
                      <strong>High, Medium, and Low priorities</strong> so you always know
                      what to focus on first.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#08C83D] shrink-0 mt-0.5" />
                    <span>
                      <strong>Custom colorful categories</strong> that group health, career,
                      travel, and creative projects.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#08C83D] shrink-0 mt-0.5" />
                    <span>
                      <strong>One-click status progression</strong> with immediate completion
                      celebration and metrics updates.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Graphic Card Showcase */}
              <div className="lg:col-span-7 bg-[#FAFAFC] rounded-2xl border border-[#E8E8EE] p-6 sm:p-8 space-y-4 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#E8E8EE]">
                  <span className="text-xs font-bold tracking-wider uppercase text-[#8E8EA0]">
                    Active Goal Card
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#08C83D]">
                    In Progress
                  </span>
                </div>

                <div className="space-y-3 bg-white p-5 rounded-xl border border-[#E8E8EE]">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-base font-bold text-[#191927]">
                        Complete 100km Alpine Trail Circuit
                      </h4>
                      <p className="text-xs text-[#646477] mt-1">
                        Train elevation gain weekly and prepare lightweight backcountry equipment.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold text-[11px]">
                      High Priority
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#A9C9F5]/30 text-[#191927] font-medium text-[11px]">
                      Outdoors &amp; Fitness
                    </span>
                    <span className="text-[#8E8EA0] text-[11px] ml-auto">
                      Target: Nov 15, 2026
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 text-center">
                  <div className="p-3 bg-white border border-[#E8E8EE] rounded-lg">
                    <span className="text-[10px] uppercase text-[#8E8EA0] font-semibold">Priority</span>
                    <p className="text-xs font-bold text-[#191927] mt-0.5">High</p>
                  </div>
                  <div className="p-3 bg-white border border-[#E8E8EE] rounded-lg">
                    <span className="text-[10px] uppercase text-[#8E8EA0] font-semibold">Timeline</span>
                    <p className="text-xs font-bold text-[#191927] mt-0.5">Scheduled</p>
                  </div>
                  <div className="p-3 bg-white border border-[#E8E8EE] rounded-lg">
                    <span className="text-[10px] uppercase text-[#8E8EA0] font-semibold">Notes Linked</span>
                    <p className="text-xs font-bold text-[#08C83D] mt-0.5">2 Notes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. NOTES & IDEAS SECTION */}
        <section
          id="notes"
          className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual preview */}
            <div className="order-2 lg:order-1 lg:col-span-7 bg-white rounded-2xl border border-[#E8E8EE] p-6 sm:p-8 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#E8E8EE]">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#08C83D]" />
                  <span className="text-xs font-bold text-[#191927]">
                    Gear Checklist &amp; Itinerary
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#8E8EA0]">
                  Linked to: Alpine Trail Circuit
                </span>
              </div>

              <div className="bg-[#FAFAFC] p-4 rounded-xl border border-[#F0F0F4] space-y-2.5 font-sans text-xs">
                <div className="flex items-center gap-2.5 text-[#08C83D]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="line-through text-[#8E8EA0]">
                    Ultralight bivy sack and waterproof seam seal
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#08C83D]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span className="line-through text-[#8E8EA0]">
                    Water filtration squeeze kit and backup tablets
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#191927]">
                  <div className="w-4 h-4 border-2 border-[#191927] rounded-xs shrink-0" />
                  <span className="font-medium">
                    Topographic offline trail maps loaded on GPS
                  </span>
                </div>
                <div className="flex items-center gap-2.5 text-[#191927]">
                  <div className="w-4 h-4 border-2 border-[#191927] rounded-xs shrink-0" />
                  <span className="font-medium">
                    High-calorie backcountry rations (4 days)
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-[#646477]">
                <span>Checklists update live on click without re-editing markdown</span>
                <span className="font-bold text-[#08C83D]">50% Completed</span>
              </div>
            </div>

            {/* Text narrative */}
            <div className="order-1 lg:order-2 lg:col-span-5 space-y-5">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#08C83D]">
                <Layers className="w-4 h-4" />
                <span>Distraction-Free Thinking</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#191927] leading-tight">
                Capture thoughts with zero friction.
              </h2>
              <p className="text-sm sm:text-base text-[#646477] leading-relaxed">
                Ideas are fragile. Bucket’s built-in note editor combines clean markdown
                formatting, interactive checklist checkboxes, and seamless linking to your
                active goals.
              </p>

              <ul className="space-y-3 pt-2 text-xs sm:text-sm text-[#191927]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#08C83D] shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct checklist toggling:</strong> Click checkboxes directly in
                    the view mode without opening the editor.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#08C83D] shrink-0 mt-0.5" />
                  <span>
                    <strong>Goal linkage:</strong> Connect brainstorms, research, and
                    itineraries directly to specific goals.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#08C83D] shrink-0 mt-0.5" />
                  <span>
                    <strong>Starred favorites:</strong> Pin your most crucial notes for
                    instant one-click access.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 5. CALENDAR & PROGRESS TRACKING SECTION */}
        <section
          id="calendar"
          className="py-20 sm:py-28 bg-white border-y border-[#E8E8EE] scroll-mt-16"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Text Narrative */}
              <div className="lg:col-span-5 space-y-5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#08C83D]">
                  <CalendarIcon className="w-4 h-4" />
                  <span>Timeline &amp; Momentum</span>
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#191927] leading-tight">
                  See your commitments across time.
                </h2>
                <p className="text-sm sm:text-base text-[#646477] leading-relaxed">
                  Planning is nothing without a calendar. Visualize upcoming target dates,
                  spot overdue items before they slip away, and analyze your productivity
                  trends with honest, clear metrics.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-3">
                  <div className="p-4 rounded-xl bg-[#FAFAFC] border border-[#E8E8EE]">
                    <span className="text-xs font-bold text-[#191927] block">
                      Month &amp; Week Views
                    </span>
                    <span className="text-xs text-[#646477] mt-1 block">
                      Seamless toggle between macro scheduling and weekly execution.
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#FAFAFC] border border-[#E8E8EE]">
                    <span className="text-xs font-bold text-[#191927] block">
                      Guilt-Free Analytics
                    </span>
                    <span className="text-xs text-[#646477] mt-1 block">
                      Track completion velocity and categories without toxic streak pressure.
                    </span>
                  </div>
                </div>
              </div>

              {/* Graphic Calendar Card */}
              <div className="lg:col-span-7 bg-[#FAFAFC] rounded-2xl border border-[#E8E8EE] p-6 sm:p-8 space-y-5 shadow-sm">
                <div className="flex items-center justify-between border-b border-[#E8E8EE] pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#191927]">Timeline Overview</span>
                  </div>
                  <span className="text-xs font-semibold text-[#08C83D] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    92% Deadline Accuracy
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 bg-white border border-[#E8E8EE] rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#08C83D]/10 text-[#08C83D] flex items-center justify-center font-bold text-xs">
                        OCT 30
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#191927]">
                          Yosemite Trail Half Marathon
                        </h4>
                        <p className="text-[11px] text-[#646477]">Health &amp; Outdoors</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#08C83D]">Target Date</span>
                  </div>

                  <div className="p-3.5 bg-white border border-[#E8E8EE] rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#A9C9F5]/30 text-[#191927] flex items-center justify-center font-bold text-xs">
                        NOV 12
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#191927]">
                          Publish Photo Journal Edition 1
                        </h4>
                        <p className="text-[11px] text-[#646477]">Creative Publishing</p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#646477]">14 days left</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CONCISE CLOSING SECTION WITH SECOND GET STARTED CTA */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#191927] text-white shadow-xl relative overflow-hidden">
            {/* Background subtle decoration */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-[#08C83D]/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-[#A9C9F5]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                Make room for what matters today.
              </h2>
              <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto leading-relaxed">
                Join users who organize their long-term ambitions and daily reflections
                in one calm workspace. No clutter. No subscriptions.
              </p>

              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <button
                  onClick={onGetStarted}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#191927] bg-white hover:bg-gray-100 rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onEnterWorkspace}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white/90 hover:text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition-all duration-200 cursor-pointer"
                >
                  <span>Launch Live Workspace</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. MINIMAL FOOTER */}
      <footer className="border-t border-[#E8E8EE] bg-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#646477]">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center bg-[#191927] text-white shrink-0"
              aria-hidden="true"
            >
              <svg
                className="w-3.5 h-3.5 text-white"
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
            <span className="text-[#8E8EA0]">•</span>
            <span>A calm space for goals, notes, and everyday progress.</span>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-6 font-medium">
            <button
              onClick={() => scrollToSection('goals')}
              className="hover:text-[#191927] transition-colors cursor-pointer"
            >
              Goals
            </button>
            <button
              onClick={() => scrollToSection('notes')}
              className="hover:text-[#191927] transition-colors cursor-pointer"
            >
              Notes
            </button>
            <button
              onClick={() => scrollToSection('calendar')}
              className="hover:text-[#191927] transition-colors cursor-pointer"
            >
              Calendar
            </button>
            <button
              onClick={onEnterWorkspace}
              className="text-[#08C83D] hover:underline transition-colors cursor-pointer font-bold"
            >
              Live Workspace
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-[#F0F0F4] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8E8EA0]">
          <p>© {new Date().getFullYear()} Bucket. Client-side local data storage.</p>
          <p>Designed with intentional simplicity and focus.</p>
        </div>
      </footer>
    </div>
  );
};
