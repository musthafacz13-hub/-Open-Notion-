import React, { useState } from 'react';
import {
  CheckSquare,
  FileText,
  Calendar as CalendarIcon,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface InterfacePreviewProps {
  onEnterWorkspace: () => void;
  onGetStarted?: () => void;
}

type ProductPillar = 'goals' | 'notes' | 'calendar';

export const InterfacePreview: React.FC<InterfacePreviewProps> = ({
  onEnterWorkspace,
  onGetStarted,
}) => {
  const [activePillar, setActivePillar] = useState<ProductPillar>('goals');

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-[#E8E8EE] bg-white shadow-xs overflow-hidden transition-all">
      {/* Top Bar: Clean Pillar Selector */}
      <div className="bg-[#FAFAFC] border-b border-[#E8E8EE] px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center p-1 bg-[#EBEBEF] rounded-lg w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActivePillar('goals')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activePillar === 'goals'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Goals</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePillar('notes')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activePillar === 'notes'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>
          <button
            type="button"
            onClick={() => setActivePillar('calendar')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activePillar === 'calendar'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            type="button"
            onClick={onEnterWorkspace}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#191927] hover:text-[#08C83D] transition-colors cursor-pointer"
          >
            <span>Launch workspace</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Structural Showcase (Non-data-driven product architecture) */}
      <div className="p-6 sm:p-8">
        {/* 1. GOALS ARCHITECTURE */}
        {activePillar === 'goals' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="max-w-xl">
              <h3 className="text-base font-semibold text-[#191927]">
                Milestones &amp; Bucket List Architecture
              </h3>
              <p className="text-xs sm:text-sm text-[#646477] mt-1 leading-relaxed">
                Bucket organizes ambitions into clean priorities and concrete target dates.
                Status advances from Not Started to In Progress and Completed with one click.
              </p>
            </div>

            {/* Non-data schematic anatomy */}
            <div className="p-4 rounded-xl border border-[#E8E8EE] bg-[#FAFAFC] space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8EA0]">
                Goal Record Anatomy
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Priority Tiers
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    High · Medium · Low
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Focus on what matters first without endless backlogs.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Target Dates
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    Calendar-Linked
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Target dates populate directly into your monthly planner.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Category Grouping
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    Custom Colors
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Group goals and notes into distinct domains of life.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. NOTES ARCHITECTURE */}
        {activePillar === 'notes' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="max-w-xl">
              <h3 className="text-base font-semibold text-[#191927]">
                Distraction-Free Notes &amp; Actionable Checklists
              </h3>
              <p className="text-xs sm:text-sm text-[#646477] mt-1 leading-relaxed">
                Markdown notes link directly to your active goals. Interactive checklists toggle
                instantly in reading mode without interrupting your workflow.
              </p>
            </div>

            {/* Non-data schematic anatomy */}
            <div className="p-4 rounded-xl border border-[#E8E8EE] bg-[#FAFAFC] space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8EA0]">
                Note System Anatomy
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Goal Association
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    Bidirectional Links
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Keep research, itineraries, and thoughts tied to goals.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Interactive Checklists
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    Zero-Friction Toggles
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Check off items directly without entering edit mode.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Favorites &amp; Views
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    Grid &amp; List Layouts
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Pin critical thoughts and switch between visual layouts.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. CALENDAR ARCHITECTURE */}
        {activePillar === 'calendar' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="max-w-xl">
              <h3 className="text-base font-semibold text-[#191927]">
                Date-Derived Timeline Planning
              </h3>
              <p className="text-xs sm:text-sm text-[#646477] mt-1 leading-relaxed">
                The Bucket calendar is generated automatically from your goals. When you assign
                a target date, it immediately appears on your monthly schedule with zero duplicate entry.
              </p>
            </div>

            {/* Non-data schematic anatomy */}
            <div className="p-4 rounded-xl border border-[#E8E8EE] bg-[#FAFAFC] space-y-3">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8EA0]">
                Calendar Planning Anatomy
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Automatic Derivation
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    No Double-Entry
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Target dates populate cleanly into month, week, and day views.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Timeline Cadence
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    Upcoming &amp; Due
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Spot upcoming commitments and milestones at a glance.
                  </span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-[#E8E8EE]">
                  <span className="text-[10px] uppercase font-semibold text-[#8E8EA0] block">
                    Quick Scheduling
                  </span>
                  <span className="font-medium text-[#191927] mt-1 block">
                    Date-Click Creation
                  </span>
                  <span className="text-[11px] text-[#646477] mt-0.5 block">
                    Click any day cell in the calendar to schedule a new goal.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer info bar */}
        <div className="mt-8 pt-4 border-t border-[#F0F0F4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#646477]">
          <span>Cloud data is isolated and encrypted under your private account.</span>
          {onGetStarted && (
            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex items-center gap-1.5 font-semibold text-[#191927] hover:text-[#08C83D] transition-colors cursor-pointer"
            >
              <span>Get started with Bucket</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
