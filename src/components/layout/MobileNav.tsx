import React, { useState } from 'react';
import { NavigationItem } from '../../types';
import {
  LayoutDashboard,
  CheckSquare,
  FileText,
  MoreHorizontal,
  Tag,
  Calendar,
  BarChart2,
  Settings,
  X,
} from 'lucide-react';

interface MobileNavProps {
  currentTab: NavigationItem;
  onSelectTab: (tab: NavigationItem) => void;
  goalCount: number;
  noteCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentTab,
  onSelectTab,
  goalCount,
  noteCount,
}) => {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const primaryItems = [
    {
      id: 'dashboard' as NavigationItem,
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'bucket-list' as NavigationItem,
      label: 'Goals',
      icon: CheckSquare,
      badge: goalCount > 0 ? goalCount : undefined,
    },
    {
      id: 'notes' as NavigationItem,
      label: 'Notes',
      icon: FileText,
      badge: noteCount > 0 ? noteCount : undefined,
    },
  ];

  const secondaryItems = [
    { id: 'categories' as NavigationItem, label: 'Categories', icon: Tag },
    { id: 'calendar' as NavigationItem, label: 'Calendar', icon: Calendar },
    { id: 'analytics' as NavigationItem, label: 'Analytics', icon: BarChart2 },
    { id: 'settings' as NavigationItem, label: 'Settings', icon: Settings },
  ];

  const isSecondaryActive = secondaryItems.some((item) => item.id === currentTab);

  return (
    <>
      {/* More Sheet for Mobile */}
      {showMoreMenu && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-[#191927]/40 backdrop-blur-[2px]"
          onClick={() => setShowMoreMenu(false)}
        >
          <div
            className="absolute bottom-20 inset-x-3 bg-white rounded-xl border border-[#E8E8EE] shadow-xl p-3 space-y-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#E8E8EE] mb-1">
              <span className="text-xs font-semibold text-[#191927]">Workspace Sections</span>
              <button
                type="button"
                onClick={() => setShowMoreMenu(false)}
                className="p-1.5 text-[#646477] hover:text-[#191927] min-h-[32px] min-w-[32px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            {secondaryItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectTab(item.id);
                    setShowMoreMenu(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-[#F3F3F7] text-[#191927] font-semibold'
                      : 'text-[#646477] hover:bg-[#FAFAFC] hover:text-[#191927]'
                  }`}
                >
                  <Icon className="w-4 h-4 text-[#8E8EA0]" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar with Safe-Area Support */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#E8E8EE] px-2 pt-1 flex items-center justify-around"
        style={{
          paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 4px)',
          minHeight: 'calc(3.5rem + env(safe-area-inset-bottom, 0px))',
        }}
        aria-label="Mobile Navigation"
      >
        {primaryItems.map((item) => {
          const isActive = currentTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setShowMoreMenu(false);
                onSelectTab(item.id);
              }}
              className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] text-[11px] font-medium transition-colors relative ${
                isActive ? 'text-[#191927]' : 'text-[#8E8EA0] hover:text-[#646477]'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon className="w-4 h-4" />
                {item.badge !== undefined && (
                  <span className="absolute -top-1 -right-2 text-[9px] font-bold px-1 rounded-full bg-[#191927] text-white tabular-nums">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1">{item.label}</span>
            </button>
          );
        })}

        {/* More Button */}
        <button
          type="button"
          onClick={() => setShowMoreMenu(!showMoreMenu)}
          className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] text-[11px] font-medium transition-colors ${
            isSecondaryActive || showMoreMenu
              ? 'text-[#191927]'
              : 'text-[#8E8EA0] hover:text-[#646477]'
          }`}
          aria-expanded={showMoreMenu}
          aria-label="More sections"
        >
          <MoreHorizontal className="w-4 h-4" />
          <span className="mt-1">More</span>
        </button>
      </nav>
    </>
  );
};
