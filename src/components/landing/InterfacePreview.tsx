import React, { useState } from 'react';
import {
  CheckSquare,
  FileText,
  Calendar as CalendarIcon,
  Check,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';

interface InterfacePreviewProps {
  onEnterWorkspace: () => void;
  onGetStarted?: () => void;
}

interface PreviewGoal {
  id: string;
  title: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  targetDate: string;
  isCompleted: boolean;
}

interface PreviewChecklistItem {
  id: string;
  text: string;
  done: boolean;
}

export const InterfacePreview: React.FC<InterfacePreviewProps> = ({
  onEnterWorkspace,
  onGetStarted,
}) => {
  const [activeTab, setActiveTab] = useState<'goals' | 'notes' | 'calendar'>('goals');
  const [goalFilter, setGoalFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Interactive sample goals (purely local to the interactive preview)
  const [goals, setGoals] = useState<PreviewGoal[]>([
    {
      id: 'g1',
      title: 'Hike the High Sierra Trail',
      category: 'Outdoors',
      priority: 'High',
      targetDate: 'Oct 28',
      isCompleted: false,
    },
    {
      id: 'g2',
      title: 'Master conversational Japanese',
      category: 'Learning',
      priority: 'Medium',
      targetDate: 'Nov 15',
      isCompleted: false,
    },
    {
      id: 'g3',
      title: 'Publish architectural photography series',
      category: 'Creative',
      priority: 'Medium',
      targetDate: 'Dec 02',
      isCompleted: true,
    },
  ]);

  // Interactive sample checklist items for notes
  const [checklists, setChecklists] = useState<PreviewChecklistItem[]>([
    { id: 'c1', text: 'Ultralight waterproof shelter and ground cover', done: true },
    { id: 'c2', text: 'Gravity filtration squeeze kit and backup tablets', done: true },
    { id: 'c3', text: 'Topographic offline trail maps cached to GPS', done: false },
    { id: 'c4', text: 'Four-day high-density backcountry nutrition ration pack', done: false },
  ]);

  const toggleGoal = (id: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isCompleted: !g.isCompleted } : g))
    );
  };

  const toggleChecklist = (id: string) => {
    setChecklists((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const filteredGoals = goals.filter((g) => {
    if (goalFilter === 'active') return !g.isCompleted;
    if (goalFilter === 'completed') return g.isCompleted;
    return true;
  });

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl border border-[#E8E8EE] bg-white shadow-xs overflow-hidden transition-all">
      {/* Top Bar: Functional Segmented Switcher & Live Workspace Action */}
      <div className="bg-[#FAFAFC] border-b border-[#E8E8EE] px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Capability Switcher */}
        <div className="flex items-center p-1 bg-[#EBEBEF] rounded-lg w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('goals')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'goals'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Goals</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('notes')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'notes'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Notes</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('calendar')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-white text-[#191927] shadow-xs'
                : 'text-[#646477] hover:text-[#191927]'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Calendar</span>
          </button>
        </div>

        {/* Live Workspace Jump */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          <span className="text-[11px] text-[#8E8EA0] hidden sm:inline">
            Interactive Product Preview
          </span>
          <button
            type="button"
            onClick={onEnterWorkspace}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#191927] hover:text-[#08C83D] transition-colors cursor-pointer"
          >
            <span>Open live workspace</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Preview Surface */}
      <div className="p-5 sm:p-7 min-h-[340px] flex flex-col justify-between">
        {/* 1. GOALS TAB */}
        {activeTab === 'goals' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#F0F0F4]">
              <div>
                <h3 className="text-sm font-semibold text-[#191927]">
                  Milestones &amp; Bucket List
                </h3>
                <p className="text-xs text-[#646477]">
                  Prioritize targets with clean status tracking.
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex items-center gap-1 text-xs">
                <button
                  type="button"
                  onClick={() => setGoalFilter('all')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    goalFilter === 'all'
                      ? 'bg-[#191927] text-white'
                      : 'text-[#646477] hover:bg-[#F3F3F7]'
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setGoalFilter('active')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    goalFilter === 'active'
                      ? 'bg-[#191927] text-white'
                      : 'text-[#646477] hover:bg-[#F3F3F7]'
                  }`}
                >
                  In Progress
                </button>
                <button
                  type="button"
                  onClick={() => setGoalFilter('completed')}
                  className={`px-2.5 py-1 rounded text-xs font-medium transition-colors cursor-pointer ${
                    goalFilter === 'completed'
                      ? 'bg-[#191927] text-white'
                      : 'text-[#646477] hover:bg-[#F3F3F7]'
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Goal Cards */}
            <div className="space-y-2.5">
              {filteredGoals.map((g) => (
                <div
                  key={g.id}
                  className={`p-3.5 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                    g.isCompleted
                      ? 'bg-[#FAFAFC] border-[#E8E8EE] opacity-75'
                      : 'bg-white border-[#E8E8EE] hover:border-[#D0D0DC]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => toggleGoal(g.id)}
                      className={`w-5 h-5 rounded flex items-center justify-center border transition-colors cursor-pointer shrink-0 ${
                        g.isCompleted
                          ? 'bg-[#08C83D] border-[#08C83D] text-white'
                          : 'border-[#D0D0DC] hover:border-[#191927] bg-white'
                      }`}
                      aria-label={g.isCompleted ? 'Mark goal incomplete' : 'Mark goal complete'}
                    >
                      {g.isCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>
                    <div className="min-w-0">
                      <p
                        className={`text-xs sm:text-sm font-medium truncate ${
                          g.isCompleted ? 'line-through text-[#8E8EA0]' : 'text-[#191927]'
                        }`}
                      >
                        {g.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-[#8E8EA0]">
                        <span>{g.category}</span>
                        <span>·</span>
                        <span>Target: {g.targetDate}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded font-medium ${
                        g.priority === 'High'
                          ? 'bg-rose-50 text-rose-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {g.priority}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleGoal(g.id)}
                      className="hidden sm:inline-flex text-[11px] text-[#646477] hover:text-[#191927] cursor-pointer"
                    >
                      {g.isCompleted ? 'Reopen' : 'Complete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#8E8EA0] pt-1">
              Click any goal checkmark to test one-click completion.
            </p>
          </div>
        )}

        {/* 2. NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="pb-3 border-b border-[#F0F0F4]">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#191927]">
                  High Sierra Trail Preparation
                </h3>
                <span className="text-[11px] text-[#8E8EA0]">Linked to Goal</span>
              </div>
              <p className="text-xs text-[#646477] mt-0.5">
                Markdown notes with direct, view-mode checklist toggles.
              </p>
            </div>

            {/* Checklist items */}
            <div className="p-4 rounded-lg bg-[#FAFAFC] border border-[#E8E8EE] space-y-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E8EA0] block mb-2">
                Gear &amp; Provision Checklist
              </span>
              {checklists.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklist(item.id)}
                  className="flex items-start gap-2.5 text-xs cursor-pointer group select-none py-1"
                >
                  <button
                    type="button"
                    className={`w-4 h-4 rounded-xs border mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                      item.done
                        ? 'bg-[#08C83D] border-[#08C83D] text-white'
                        : 'border-[#C8C8D4] bg-white group-hover:border-[#191927]'
                    }`}
                    aria-label={item.done ? 'Uncheck item' : 'Check item'}
                  >
                    {item.done && <Check className="w-3 h-3 stroke-[3]" />}
                  </button>
                  <span
                    className={`leading-tight transition-colors ${
                      item.done ? 'line-through text-[#8E8EA0]' : 'text-[#191927]'
                    }`}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#8E8EA0] pt-1">
              Checklist items update live on click without opening a text editor.
            </p>
          </div>
        )}

        {/* 3. CALENDAR TAB */}
        {activeTab === 'calendar' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0F0F4]">
              <div>
                <h3 className="text-sm font-semibold text-[#191927]">Timeline Calendar</h3>
                <p className="text-xs text-[#646477]">
                  Target dates automatically populate onto your calendar.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#191927]">October 2026</span>
            </div>

            {/* Calendar Grid Representation */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="py-1 font-semibold text-[#8E8EA0] text-[11px]">
                  {day}
                </div>
              ))}
              {[26, 27, 28, 29, 30, 31, 1].map((date, idx) => (
                <div
                  key={idx}
                  className={`p-2 min-h-[58px] rounded border text-left flex flex-col justify-between transition-colors ${
                    date === 28
                      ? 'bg-emerald-50/50 border-[#08C83D]'
                      : date === 30
                      ? 'bg-white border-[#E8E8EE]'
                      : 'bg-white border-[#F0F0F4]'
                  }`}
                >
                  <span
                    className={`text-[11px] font-semibold ${
                      date === 28 ? 'text-[#08C83D]' : 'text-[#646477]'
                    }`}
                  >
                    {date}
                  </span>
                  {date === 28 && (
                    <div className="p-1 rounded bg-[#08C83D] text-white text-[10px] font-medium leading-none truncate">
                      Sierra Trail
                    </div>
                  )}
                  {date === 30 && (
                    <div className="p-1 rounded bg-[#191927] text-white text-[10px] font-medium leading-none truncate">
                      Monthly Review
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#8E8EA0] pt-1">
              Derived automatically from goal target dates with zero manual sync.
            </p>
          </div>
        )}

        {/* Preview Footer Callout */}
        <div className="mt-6 pt-4 border-t border-[#F0F0F4] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#646477]">
          <span>Experience the full workspace with your private account.</span>
          {onGetStarted && (
            <button
              type="button"
              onClick={onGetStarted}
              className="inline-flex items-center gap-1.5 font-semibold text-[#191927] hover:text-[#08C83D] transition-colors cursor-pointer"
            >
              <span>Get started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
