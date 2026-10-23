import React, { useState } from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

interface InterfacePreviewProps {
  onEnterWorkspace: () => void;
}

export const InterfacePreview: React.FC<InterfacePreviewProps> = ({ onEnterWorkspace }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'goals' | 'notes' | 'calendar'>('dashboard');

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-2xl border border-[#E8E8EE] bg-white shadow-xl overflow-hidden transition-all duration-300">
      {/* Top Application Frame Header */}
      <div className="h-12 bg-[#FAFAFC] border-b border-[#E8E8EE] px-4 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#E8E8EE]" />
          <div className="w-3 h-3 rounded-full bg-[#E8E8EE]" />
          <div className="w-3 h-3 rounded-full bg-[#E8E8EE]" />
          <span className="ml-2 text-xs font-medium text-[#8E8EA0] hidden sm:inline">
            bucket.app / workspace
          </span>
        </div>

        {/* Interactive Tab Switcher in the Preview */}
        <div className="flex items-center p-0.5 bg-[#EBEBEF] rounded-lg">
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'dashboard'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dashboard</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('goals')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'goals'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Goals</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Notes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Calendar</span>
          </button>
        </div>

        <button
          onClick={onEnterWorkspace}
          className="flex items-center gap-1 text-xs font-semibold text-[#08C83D] hover:underline cursor-pointer"
        >
          <span>Open Live</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* Main Preview Screen Content */}
      <div className="p-4 sm:p-6 md:p-8 bg-[#FAFAFC] min-h-[380px]">
        {/* DASHBOARD PREVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E8E8EE] pb-4">
              <div>
                <h3 className="text-xl font-bold tracking-tight text-[#191927]">
                  Good morning, Alex
                </h3>
                <p className="text-xs text-[#646477] mt-0.5">
                  Here is where your goals and projects stand today.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#08C83D]/10 text-[#08C83D]">
                  <Sparkles className="w-3 h-3" />
                  67% On Track
                </span>
              </div>
            </div>

            {/* Metric Cards Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8E8EA0]">
                  Total Goals
                </span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-[#191927] tabular-nums">12</span>
                  <span className="text-xs text-[#646477]">workspace</span>
                </div>
              </div>
              <div className="p-4 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8E8EA0]">
                  In Progress
                </span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-[#191927] tabular-nums">5</span>
                  <span className="text-xs text-amber-600 font-medium">active</span>
                </div>
              </div>
              <div className="p-4 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8E8EA0]">
                  Completed
                </span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-[#08C83D] tabular-nums">7</span>
                  <span className="text-xs text-[#08C83D] font-medium">58% rate</span>
                </div>
              </div>
              <div className="p-4 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#8E8EA0]">
                  Active Notes
                </span>
                <div className="mt-1 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-[#191927] tabular-nums">9</span>
                  <span className="text-xs text-[#646477]">3 favorites</span>
                </div>
              </div>
            </div>

            {/* Upcoming Goals Mini Feed */}
            <div className="bg-white border border-[#E8E8EE] rounded-xl p-4 shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#646477]">
                  Upcoming Targets
                </span>
                <span className="text-xs text-[#8E8EA0]">Next 14 Days</span>
              </div>
              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAFAFC] border border-[#F0F0F4]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#08C83D]" />
                    <div>
                      <p className="text-xs font-semibold text-[#191927]">
                        Run Half Marathon in Yosemite
                      </p>
                      <p className="text-[10px] text-[#646477]">Health & Fitness • Target Oct 30</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    High Priority
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAFAFC] border border-[#F0F0F4]">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#F9E94E]" />
                    <div>
                      <p className="text-xs font-semibold text-[#191927]">
                        Publish Architectural Photography Zine
                      </p>
                      <p className="text-[10px] text-[#646477]">Creative • Target Nov 12</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                    Medium
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* GOALS PREVIEW */}
        {activeTab === 'goals' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E8E8EE] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#191927]">Bucket List & Active Goals</h3>
                <p className="text-xs text-[#646477]">Organized by priority and target date</p>
              </div>
              <span className="text-xs font-semibold text-[#191927] bg-[#EBEBEF] px-2.5 py-1 rounded-md">
                12 Items
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#08C83D]" />
                    <h4 className="text-xs font-bold text-[#191927]">
                      Learn conversational Japanese
                    </h4>
                  </div>
                  <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
                    In Progress
                  </span>
                </div>
                <p className="text-xs text-[#646477] mt-2 line-clamp-2">
                  Complete 50 daily speaking practice sessions and JLPT N5 vocabulary flashcards.
                </p>
                <div className="mt-3 pt-3 border-t border-[#F0F0F4] flex items-center justify-between text-[11px] text-[#8E8EA0]">
                  <span>Learning</span>
                  <span className="flex items-center gap-1 text-[#191927] font-medium">
                    <Clock className="w-3 h-3 text-[#646477]" /> Target: Dec 15
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#A9C9F5]" />
                    <h4 className="text-xs font-bold text-[#191927]">
                      Build custom mechanical keyboard
                    </h4>
                  </div>
                  <span className="text-[10px] font-medium bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded">
                    In Progress
                  </span>
                </div>
                <p className="text-xs text-[#646477] mt-2 line-clamp-2">
                  Source lubed switches, solder PCB, and configure QMK layer firmware.
                </p>
                <div className="mt-3 pt-3 border-t border-[#F0F0F4] flex items-center justify-between text-[11px] text-[#8E8EA0]">
                  <span>Creative</span>
                  <span className="flex items-center gap-1 text-[#191927] font-medium">
                    <Clock className="w-3 h-3 text-[#646477]" /> Target: Nov 20
                  </span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#08C83D]" />
                    <h4 className="text-xs font-bold text-[#191927] line-through text-[#8E8EA0]">
                      Solo hike the John Muir Trail section
                    </h4>
                  </div>
                  <span className="text-[10px] font-medium bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                    Completed
                  </span>
                </div>
                <p className="text-xs text-[#8E8EA0] mt-2">
                  42 miles navigated with ultralight pack setup.
                </p>
                <div className="mt-3 pt-3 border-t border-[#F0F0F4] flex items-center justify-between text-[11px] text-[#8E8EA0]">
                  <span>Outdoors</span>
                  <span className="text-[#08C83D] font-medium">Achieved</span>
                </div>
              </div>

              <div className="p-4 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F6C6DA]" />
                    <h4 className="text-xs font-bold text-[#191927]">
                      Write 5-song acoustic EP
                    </h4>
                  </div>
                  <span className="text-[10px] font-medium bg-gray-100 text-[#646477] px-1.5 py-0.5 rounded">
                    Not Started
                  </span>
                </div>
                <p className="text-xs text-[#646477] mt-2 line-clamp-2">
                  Draft chord melodies and record initial voice memo acoustic demos.
                </p>
                <div className="mt-3 pt-3 border-t border-[#F0F0F4] flex items-center justify-between text-[11px] text-[#8E8EA0]">
                  <span>Music</span>
                  <span className="flex items-center gap-1 text-[#646477]">
                    <Clock className="w-3 h-3" /> Target: Jan 2027
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NOTES PREVIEW */}
        {activeTab === 'notes' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E8E8EE] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#191927]">Notes & Ideas</h3>
                <p className="text-xs text-[#646477]">Clean markdown notes with interactive checklists</p>
              </div>
              <span className="text-xs font-medium text-[#646477]">Markdown Supported</span>
            </div>

            <div className="p-5 bg-white border border-[#E8E8EE] rounded-xl shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#191927]">
                    Weekly Reflection & Sprint Prep
                  </span>
                  <span className="text-[10px] bg-[#EBEBEF] text-[#646477] px-2 py-0.5 rounded">
                    Personal
                  </span>
                </div>
                <span className="text-[11px] text-[#8E8EA0]">Updated 2h ago</span>
              </div>

              <div className="space-y-2 text-xs text-[#191927] font-mono leading-relaxed bg-[#FAFAFC] p-3 rounded-lg border border-[#F0F0F4]">
                <div className="flex items-center gap-2 font-sans font-medium text-[#08C83D]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="line-through text-[#8E8EA0]">Review Q3 milestones and celebrate small wins</span>
                </div>
                <div className="flex items-center gap-2 font-sans font-medium text-[#08C83D]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span className="line-through text-[#8E8EA0]">Finalize gear list for mountain pass hike</span>
                </div>
                <div className="flex items-center gap-2 font-sans font-medium text-[#191927]">
                  <div className="w-3.5 h-3.5 border-2 border-[#191927] rounded-xs" />
                  <span>Draft initial layout for photo zine editorial spreads</span>
                </div>
                <div className="flex items-center gap-2 font-sans font-medium text-[#191927]">
                  <div className="w-3.5 h-3.5 border-2 border-[#191927] rounded-xs" />
                  <span>Schedule 30-min Japanese language exchange partner call</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CALENDAR PREVIEW */}
        {activeTab === 'calendar' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-[#E8E8EE] pb-3">
              <div>
                <h3 className="text-lg font-bold text-[#191927]">Calendar Timeline</h3>
                <p className="text-xs text-[#646477]">Keep target dates visible and actionable</p>
              </div>
              <span className="text-xs font-semibold text-[#191927]">October 2026</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 sm:gap-2 text-center text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="py-1 font-semibold text-[#8E8EA0] text-[11px]">
                  {day}
                </div>
              ))}
              {/* Sample calendar cells */}
              {[26, 27, 28, 29, 30, 31, 1].map((date, idx) => (
                <div
                  key={idx}
                  className={`p-2 min-h-[64px] rounded-lg border text-left transition-all ${
                    date === 30
                      ? 'bg-emerald-50/60 border-[#08C83D]'
                      : 'bg-white border-[#E8E8EE]'
                  }`}
                >
                  <span
                    className={`text-[11px] font-bold ${
                      date === 30 ? 'text-[#08C83D]' : 'text-[#646477]'
                    }`}
                  >
                    {date}
                  </span>
                  {date === 30 && (
                    <div className="mt-1 p-1 bg-[#08C83D] text-white rounded text-[9px] font-semibold truncate leading-tight">
                      Half Marathon
                    </div>
                  )}
                  {date === 28 && (
                    <div className="mt-1 p-1 bg-[#191927] text-white rounded text-[9px] font-semibold truncate leading-tight">
                      Photo review
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar inside preview with direct callout */}
      <div className="px-6 py-3 bg-white border-t border-[#E8E8EE] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <span className="text-[#646477]">
          Every feature runs entirely client-side with instant persistence in your browser.
        </span>
        <button
          onClick={onEnterWorkspace}
          className="inline-flex items-center gap-1.5 font-bold text-[#191927] hover:text-[#08C83D] transition-colors cursor-pointer"
        >
          <span>Explore live workspace</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
