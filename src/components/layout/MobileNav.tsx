import React from 'react';
import { NavigationItem } from '../../types';
import { LayoutDashboard, CheckSquare, FileText } from 'lucide-react';

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

  return (
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
            onClick={() => onSelectTab(item.id)}
            className={`flex-1 flex flex-col items-center justify-center h-full min-h-[44px] text-[11px] font-medium transition-colors relative focus:outline-none focus-visible:ring-2 focus-visible:ring-[#191927] rounded-lg ${
              isActive ? 'text-[#191927] font-semibold' : 'text-[#8E8EA0] hover:text-[#646477]'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            <div className="relative">
              <Icon className="w-4 h-4" aria-hidden="true" />
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
    </nav>
  );
};
