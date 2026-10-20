import { useState, useEffect, useMemo, useCallback } from 'react';
import { Goal, Note, NavigationItem, GoalPriority, GoalStatus } from './types';
import {
  calculateMetrics,
  getUpcomingGoals,
  sortRecentlyUpdated,
} from './utils/calculations';
import {
  loadStoredGoals,
  saveStoredGoals,
  loadStoredNotes,
  saveStoredNotes,
  clearWorkspaceData,
  getFixtureData,
} from './utils/storage';
import { AppShell } from './components/layout/AppShell';
import { DashboardScreen } from './components/dashboard/DashboardScreen';
import { BucketListScreen } from './components/bucket/BucketListScreen';
import { ComingSoonView } from './components/common/ComingSoonView';
import { GoalModal } from './components/goals/GoalModal';
import { GoalDeleteModal } from './components/goals/GoalDeleteModal';
import { GoalDetailModal } from './components/goals/GoalDetailModal';
import { NoteModal } from './components/notes/NoteModal';
import { NoteDeleteModal } from './components/notes/NoteDeleteModal';
import { NoteDetailModal } from './components/notes/NoteDetailModal';
import { NotesScreen } from './components/notes/NotesScreen';
import { Toast, ToastMessage } from './components/common/Toast';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationItem>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Workspace Data
  const [goals, setGoals] = useState<Goal[]>(() => loadStoredGoals());
  const [notes, setNotes] = useState<Note[]>(() => loadStoredNotes());

  // Modal States
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);

  const [isGoalDetailModalOpen, setIsGoalDetailModalOpen] = useState(false);
  const [detailGoal, setDetailGoal] = useState<Goal | null>(null);

  const [isGoalDeleteModalOpen, setIsGoalDeleteModalOpen] = useState(false);
  const [deletingGoal, setDeletingGoal] = useState<Goal | null>(null);

  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [isNoteDetailModalOpen, setIsNoteDetailModalOpen] = useState(false);
  const [detailNote, setDetailNote] = useState<Note | null>(null);

  const [isNoteDeleteModalOpen, setIsNoteDeleteModalOpen] = useState(false);
  const [deletingNote, setDeletingNote] = useState<Note | null>(null);

  // Transient Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Sync to Local Storage
  useEffect(() => {
    saveStoredGoals(goals);
  }, [goals]);

  useEffect(() => {
    saveStoredNotes(notes);
  }, [notes]);

  // Derived Metrics & Collections
  const metrics = useMemo(() => calculateMetrics(goals), [goals]);
  const upcomingGoals = useMemo(() => getUpcomingGoals(goals), [goals]);
  const recentGoals = useMemo(() => sortRecentlyUpdated(goals), [goals]);
  const recentNotes = useMemo(() => sortRecentlyUpdated(notes), [notes]);

  // Goal Actions
  const handleOpenNewGoal = () => {
    setEditingGoal(null);
    setIsGoalModalOpen(true);
  };

  const handleOpenEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsGoalModalOpen(true);
  };

  const handleOpenDetailGoal = (goal: Goal) => {
    setDetailGoal(goal);
    setIsGoalDetailModalOpen(true);
  };

  const handleSaveGoal = (goalData: {
    title: string;
    description: string;
    category: string;
    priority: GoalPriority;
    status: GoalStatus;
    targetDate: string | null;
  }) => {
    const now = new Date().toISOString();

    if (editingGoal) {
      // Edit existing
      const updatedGoal: Goal = {
        ...editingGoal,
        ...goalData,
        updatedAt: now,
      };

      setGoals((prev) =>
        prev.map((g) => (g.id === editingGoal.id ? updatedGoal : g))
      );

      // Keep detail modal in sync if open
      if (detailGoal && detailGoal.id === editingGoal.id) {
        setDetailGoal(updatedGoal);
      }

      addToast(`Updated "${goalData.title}"`);
    } else {
      // Create new
      const newGoal: Goal = {
        id: 'goal_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        ...goalData,
        createdAt: now,
        updatedAt: now,
      };
      setGoals((prev) => [newGoal, ...prev]);
      addToast(`Created goal "${goalData.title}"`);
    }
  };

  const handleStatusChangeGoal = (goalId: string, nextStatus: GoalStatus) => {
    const now = new Date().toISOString();
    let updatedTitle = '';

    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        updatedTitle = g.title;
        const updated = {
          ...g,
          status: nextStatus,
          updatedAt: now,
        };
        if (detailGoal && detailGoal.id === goalId) {
          setDetailGoal(updated);
        }
        return updated;
      })
    );

    const msg =
      nextStatus === 'Completed'
        ? `Completed "${updatedTitle}"!`
        : `Marked "${updatedTitle}" as ${nextStatus}`;
    addToast(msg);
  };

  const handleToggleCompleteGoal = (goalId: string) => {
    const now = new Date().toISOString();
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const nextStatus: GoalStatus = g.status === 'Completed' ? 'In Progress' : 'Completed';
        const msg =
          nextStatus === 'Completed'
            ? `Completed "${g.title}"!`
            : `Marked "${g.title}" in progress`;
        addToast(msg);

        const updated = {
          ...g,
          status: nextStatus,
          updatedAt: now,
        };
        if (detailGoal && detailGoal.id === goalId) {
          setDetailGoal(updated);
        }
        return updated;
      })
    );
  };

  const handlePromptDeleteGoal = (goal: Goal) => {
    setDeletingGoal(goal);
    setIsGoalDeleteModalOpen(true);
  };

  const handleConfirmDeleteGoal = () => {
    if (!deletingGoal) return;
    const title = deletingGoal.title;
    const goalIdToDelete = deletingGoal.id;

    // Remove goal from goals list
    setGoals((prev) => prev.filter((g) => g.id !== goalIdToDelete));

    // Clear any links to this goal in notes to prevent orphaned references
    setNotes((prev) =>
      prev.map((n) => (n.linkedGoalId === goalIdToDelete ? { ...n, linkedGoalId: null } : n))
    );

    if (detailGoal && detailGoal.id === goalIdToDelete) {
      setDetailGoal(null);
      setIsGoalDetailModalOpen(false);
    }

    setDeletingGoal(null);
    addToast(`Deleted "${title}"`, 'info');
  };

  // Note Actions
  const handleOpenNewNote = () => {
    setEditingNote(null);
    setIsNoteModalOpen(true);
  };

  const handleOpenEditNote = (note: Note) => {
    setEditingNote(note);
    setIsNoteModalOpen(true);
  };

  const handleOpenDetailNote = (note: Note) => {
    setDetailNote(note);
    setIsNoteDetailModalOpen(true);
  };

  const handleSaveNote = (noteData: {
    id?: string;
    title: string;
    content: string;
    isFavorite: boolean;
    linkedGoalId?: string | null;
  }): Note => {
    const now = new Date().toISOString();
    const targetId = noteData.id || editingNote?.id;

    if (targetId) {
      const existing = notes.find((n) => n.id === targetId);
      const updatedNote: Note = {
        id: targetId,
        title: noteData.title,
        content: noteData.content,
        isFavorite: noteData.isFavorite,
        linkedGoalId:
          noteData.linkedGoalId !== undefined
            ? noteData.linkedGoalId
            : existing?.linkedGoalId || null,
        createdAt: existing?.createdAt || now,
        updatedAt: now,
        tags: existing?.tags || [],
      };

      setNotes((prev) => prev.map((n) => (n.id === targetId ? updatedNote : n)));

      if (detailNote && detailNote.id === targetId) {
        setDetailNote(updatedNote);
      }

      addToast(`Updated note "${noteData.title}"`);
      return updatedNote;
    } else {
      const newNote: Note = {
        id: 'note_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        title: noteData.title,
        content: noteData.content,
        isFavorite: noteData.isFavorite,
        linkedGoalId: noteData.linkedGoalId || null,
        createdAt: now,
        updatedAt: now,
        tags: [],
      };
      setNotes((prev) => [newNote, ...prev]);
      addToast(`Created note "${noteData.title}"`);
      return newNote;
    }
  };

  const handleToggleFavoriteNote = (noteId: string) => {
    setNotes((prev) =>
      prev.map((n) => {
        if (n.id !== noteId) return n;
        const next = !n.isFavorite;
        const updated = {
          ...n,
          isFavorite: next,
          updatedAt: new Date().toISOString(),
        };
        if (detailNote && detailNote.id === noteId) {
          setDetailNote(updated);
        }
        return updated;
      })
    );
  };

  const handlePromptDeleteNote = (note: Note) => {
    setDeletingNote(note);
    setIsNoteDeleteModalOpen(true);
  };

  const handleConfirmDeleteNote = () => {
    if (!deletingNote) return;
    const title = deletingNote.title;
    setNotes((prev) => prev.filter((n) => n.id !== deletingNote.id));

    if (detailNote && detailNote.id === deletingNote.id) {
      setDetailNote(null);
      setIsNoteDetailModalOpen(false);
    }

    setDeletingNote(null);
    addToast(`Deleted note "${title}"`, 'info');
  };

  // Developer / Fixture Controls
  const handleLoadFixtures = () => {
    const fixtures = getFixtureData();
    setGoals(fixtures.goals);
    setNotes(fixtures.notes);
    addToast('Loaded development sample fixtures', 'info');
  };

  const handleClearWorkspace = () => {
    clearWorkspaceData();
    setGoals([]);
    setNotes([]);
    setDetailGoal(null);
    setIsGoalDetailModalOpen(false);
    setDetailNote(null);
    setIsNoteDetailModalOpen(false);
    addToast('Cleared workspace data', 'info');
  };

  return (
    <AppShell
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      onNewGoal={handleOpenNewGoal}
      onNewNote={handleOpenNewNote}
      goalCount={goals.length}
      noteCount={notes.length}
      onLoadFixtures={handleLoadFixtures}
      onClearData={handleClearWorkspace}
    >
      {currentTab === 'dashboard' ? (
        <DashboardScreen
          goals={goals}
          notes={notes}
          metrics={metrics}
          upcomingGoals={upcomingGoals}
          recentGoals={recentGoals}
          recentNotes={recentNotes}
          onNewGoal={handleOpenNewGoal}
          onNewNote={handleOpenNewNote}
          onOpenDetails={handleOpenDetailGoal}
          onEditGoal={handleOpenEditGoal}
          onToggleComplete={handleToggleCompleteGoal}
          onDeleteGoal={handlePromptDeleteGoal}
          onEditNote={handleOpenEditNote}
          onDeleteNote={handlePromptDeleteNote}
          onToggleFavoriteNote={handleToggleFavoriteNote}
          onExploreBucketList={() => setCurrentTab('bucket-list')}
          onExploreNotes={() => setCurrentTab('notes')}
          searchQuery={searchQuery}
        />
      ) : currentTab === 'bucket-list' ? (
        <BucketListScreen
          goals={goals}
          metrics={metrics}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewGoal={handleOpenNewGoal}
          onOpenDetails={handleOpenDetailGoal}
          onEditGoal={handleOpenEditGoal}
          onToggleComplete={handleToggleCompleteGoal}
          onDeleteGoal={handlePromptDeleteGoal}
        />
      ) : currentTab === 'notes' ? (
        <NotesScreen
          notes={notes}
          goals={goals}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewNote={handleOpenNewNote}
          onEditNote={handleOpenEditNote}
          onDeleteNote={handlePromptDeleteNote}
          onToggleFavorite={handleToggleFavoriteNote}
          onSaveNote={handleSaveNote}
          onOpenDetails={handleOpenDetailNote}
        />
      ) : (
        <ComingSoonView
          section={currentTab}
          onNavigateDashboard={() => setCurrentTab('dashboard')}
          onNewGoal={handleOpenNewGoal}
          onNewNote={handleOpenNewNote}
          goals={goals}
          notes={notes}
        />
      )}

      {/* Goal Creation / Edit Dialog */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        onSave={handleSaveGoal}
        initialGoal={editingGoal}
      />

      {/* Goal Detail View Dialog */}
      <GoalDetailModal
        isOpen={isGoalDetailModalOpen}
        onClose={() => setIsGoalDetailModalOpen(false)}
        goal={detailGoal}
        onEdit={(goal) => {
          setIsGoalDetailModalOpen(false);
          handleOpenEditGoal(goal);
        }}
        onDelete={(goal) => {
          setIsGoalDetailModalOpen(false);
          handlePromptDeleteGoal(goal);
        }}
        onStatusChange={handleStatusChangeGoal}
      />

      {/* Goal Delete Confirmation Dialog */}
      <GoalDeleteModal
        isOpen={isGoalDeleteModalOpen}
        onClose={() => setIsGoalDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteGoal}
        goal={deletingGoal}
      />

      {/* Note Creation / Edit Dialog */}
      <NoteModal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        onSave={handleSaveNote}
        initialNote={editingNote}
        goals={goals}
      />

      {/* Note Detail View Dialog */}
      <NoteDetailModal
        isOpen={isNoteDetailModalOpen}
        onClose={() => setIsNoteDetailModalOpen(false)}
        note={detailNote}
        goals={goals}
        onEdit={(note) => {
          setIsNoteDetailModalOpen(false);
          handleOpenEditNote(note);
        }}
        onDelete={(note) => {
          setIsNoteDetailModalOpen(false);
          handlePromptDeleteNote(note);
        }}
        onToggleFavorite={handleToggleFavoriteNote}
      />

      {/* Note Delete Confirmation Dialog */}
      <NoteDeleteModal
        isOpen={isNoteDeleteModalOpen}
        onClose={() => setIsNoteDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteNote}
        note={deletingNote}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </AppShell>
  );
}
