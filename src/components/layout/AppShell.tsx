import React from 'react';
import { NavigationItem } from '../../types';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';

interface AppShellProps {
  currentTab: NavigationItem;
  onSelectTab: (tab: NavigationItem) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNewGoal: () => void;
  onNewNote: () => void;
  goalCount: number;
  noteCount: number;
  onLoadFixtures: () => void;
  onClearData: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  currentTab,
  onSelectTab,
  searchQuery,
  onSearchChange,
  onNewGoal,
  onNewNote,
  goalCount,
  noteCount,
  onLoadFixtures,
  onClearData,
  children,
}) => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#191927] flex flex-row antialiased">
      {/* Desktop Persistent Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={onSelectTab}
        goalCount={goalCount}
        noteCount={noteCount}
        onLoadFixtures={onLoadFixtures}
        onClearData={onClearData}
      />

      {/* Main Workspace Canvas */}
      <div
        className="flex-1 flex flex-col min-w-0 md:pb-8"
        style={{
          paddingBottom: 'calc(4rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        {/* Top Header */}
        <Header
          currentTab={currentTab}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          onNewGoal={onNewGoal}
          onNewNote={onNewNote}
        />

        {/* Workspace Content */}
        <main className="flex-1 overflow-x-hidden">
          {children}
        </main>

        {/* Mobile Fixed Bottom Navigation */}
        <MobileNav
          currentTab={currentTab}
          onSelectTab={onSelectTab}
          goalCount={goalCount}
          noteCount={noteCount}
        />
      </div>
    </div>
  );
};
