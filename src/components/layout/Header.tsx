import React, { useState } from 'react';
import { NavigationItem } from '../../types';
import { Plus, Search, X } from 'lucide-react';

interface HeaderProps {
  currentTab: NavigationItem;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewGoal: () => void;
  onNewNote: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  searchQuery,
  onSearchChange,
  onNewGoal,
  onNewNote,
}) => {
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const getTabTitle = (tab: NavigationItem) => {
    switch (tab) {
      case 'dashboard':
        return 'Dashboard';
      case 'bucket-list':
        return 'Bucket List';
      case 'notes':
        return 'Notes';
      case 'categories':
        return 'Categories';
      case 'calendar':
        return 'Calendar';
      case 'analytics':
        return 'Analytics';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-[#E8E8EE] px-4 sm:px-6 h-14 flex items-center justify-between gap-3">
      {/* Mobile search bar takeover */}
      {isMobileSearchOpen ? (
        <div className="flex-1 flex items-center gap-2 sm:hidden py-1">
          <div className="flex-1 relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8EA0] pointer-events-none" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search goals &amp; notes..."
              className="w-full pl-8 pr-7 py-1.5 text-xs text-[#191927] bg-[#FAFAFC] border border-[#E8E8EE] rounded-lg focus:outline-none focus:border-[#191927] focus:bg-white transition-all placeholder:text-[#8E8EA0]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8EA0] hover:text-[#191927] p-0.5"
                aria-label="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setIsMobileSearchOpen(false);
              onSearchChange('');
            }}
            className="text-xs text-[#646477] hover:text-[#191927] px-2 py-1"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          {/* Left: View Breadcrumb */}
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xs text-[#8E8EA0] hidden sm:inline">Workspace</span>
            <span className="text-xs text-[#D0D0DC] hidden sm:inline">/</span>
            <h1 className="text-sm font-semibold text-[#191927] truncate">
              {getTabTitle(currentTab)}
            </h1>
          </div>

          {/* Center / Search: Desktop search bar */}
          <div className="flex-1 max-w-xs relative hidden sm:block">
            <label htmlFor="workspace-search-desktop" className="sr-only">
              Search goals and notes
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8E8EA0] pointer-events-none" />
              <input
                id="workspace-search-desktop"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search goals &amp; notes..."
                className="w-full pl-8 pr-7 py-1.5 text-xs text-[#191927] bg-[#FAFAFC] border border-[#E8E8EE] rounded-lg focus:outline-none focus:border-[#191927] focus:bg-white transition-all placeholder:text-[#8E8EA0]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8E8EA0] hover:text-[#191927] p-0.5"
                  aria-label="Clear search"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile search toggle button */}
            <button
              type="button"
              onClick={() => setIsMobileSearchOpen(true)}
              className="sm:hidden p-2 text-[#646477] hover:text-[#191927] hover:bg-[#F3F3F7] rounded-lg transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Open search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onNewNote}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#191927] bg-white border border-[#E8E8EE] rounded-lg hover:bg-[#F3F3F7] active:bg-[#EBEBEF] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#191927] min-h-[34px]"
            >
              <Plus className="w-3.5 h-3.5 text-[#646477]" />
              <span>New Note</span>
            </button>

            <button
              type="button"
              onClick={onNewGoal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-[#191927] hover:bg-[#2B2B40] active:bg-[#141420] rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#191927] min-h-[34px]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Goal</span>
            </button>
          </div>
        </>
      )}
    </header>
  );
};
