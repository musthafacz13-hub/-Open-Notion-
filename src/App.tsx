import { useState, useEffect, useMemo, useCallback } from 'react';
import { Goal, Note, Category, NavigationItem, GoalPriority, GoalStatus } from './types';
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
  loadStoredCategories,
  saveStoredCategories,
  clearWorkspaceData,
  getFixtureData,
} from './utils/storage';
import { parseYmdDate } from './utils/date';
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
import { CategoriesScreen } from './components/categories/CategoriesScreen';
import { CategoryModal } from './components/categories/CategoryModal';
import { CategoryDetailModal } from './components/categories/CategoryDetailModal';
import { CategoryDeleteModal } from './components/categories/CategoryDeleteModal';
import { CalendarScreen } from './components/calendar/CalendarScreen';
import { Toast, ToastMessage } from './components/common/Toast';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<NavigationItem>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  // Primary Workspace Data
  const [goals, setGoals] = useState<Goal[]>(() => loadStoredGoals());
  const [notes, setNotes] = useState<Note[]>(() => loadStoredNotes());
  const [categories, setCategories] = useState<Category[]>(() => loadStoredCategories());

  // Deep-linking Category filter for navigation
  const [goalCategoryFilter, setGoalCategoryFilter] = useState<string>('All');
  const [noteCategoryFilter, setNoteCategoryFilter] = useState<string>('All');

  // Modal States
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goalInitialTargetDate, setGoalInitialTargetDate] = useState<string | null>(null);

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

  // Category Modal States
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [isCategoryDetailModalOpen, setIsCategoryDetailModalOpen] = useState(false);
  const [detailCategory, setDetailCategory] = useState<Category | null>(null);

  const [isCategoryDeleteModalOpen, setIsCategoryDeleteModalOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);

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

  useEffect(() => {
    saveStoredCategories(categories);
  }, [categories]);

  // Derived Metrics & Collections
  const metrics = useMemo(() => calculateMetrics(goals), [goals]);
  const upcomingGoals = useMemo(() => getUpcomingGoals(goals), [goals]);
  const recentGoals = useMemo(() => sortRecentlyUpdated(goals), [goals]);
  const recentNotes = useMemo(() => sortRecentlyUpdated(notes), [notes]);
  const scheduledGoalCount = useMemo(
    () => goals.filter((g) => Boolean(g.targetDate && g.targetDate.trim() && parseYmdDate(g.targetDate))).length,
    [goals]
  );

  // Goal Actions
  const handleOpenNewGoal = () => {
    setEditingGoal(null);
    setGoalInitialTargetDate(null);
    setIsGoalModalOpen(true);
  };

  const handleOpenEditGoal = (goal: Goal) => {
    setEditingGoal(goal);
    setGoalInitialTargetDate(null);
    setIsGoalModalOpen(true);
  };

  const handleNewGoalForDate = (dateYmd: string) => {
    setEditingGoal(null);
    setGoalInitialTargetDate(dateYmd);
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
    categoryId?: string | null;
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
        categoryId:
          goalData.categoryId !== undefined
            ? goalData.categoryId
            : editingGoal.categoryId || null,
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
        categoryId: goalData.categoryId || null,
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
    categoryId?: string | null;
    category?: string | null;
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
        categoryId:
          noteData.categoryId !== undefined
            ? noteData.categoryId
            : existing?.categoryId || null,
        category:
          noteData.category !== undefined
            ? noteData.category
            : existing?.category || null,
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
        categoryId: noteData.categoryId || null,
        category: noteData.category || null,
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

  // Category Actions
  const handleOpenNewCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (category: Category) => {
    setEditingCategory(category);
    setIsCategoryModalOpen(true);
  };

  const handleOpenDetailCategory = (category: Category) => {
    setDetailCategory(category);
    setIsCategoryDetailModalOpen(true);
  };

  const handlePromptDeleteCategory = (category: Category) => {
    setDeletingCategory(category);
    setIsCategoryDeleteModalOpen(true);
  };

  const handleConfirmDeleteCategory = () => {
    if (!deletingCategory) return;
    const catToDelete = deletingCategory;
    const catNameLower = catToDelete.name.toLowerCase().trim();

    // 1. Remove category from categories collection
    setCategories((prev) => prev.filter((c) => c.id !== catToDelete.id));

    // 2. Clear category association from goals without deleting the goal
    setGoals((prev) =>
      prev.map((g) => {
        if (
          g.categoryId === catToDelete.id ||
          (g.category && g.category.toLowerCase().trim() === catNameLower)
        ) {
          return {
            ...g,
            categoryId: null,
            category: '',
            updatedAt: new Date().toISOString(),
          };
        }
        return g;
      })
    );

    // 3. Clear category association from notes without deleting the note
    setNotes((prev) =>
      prev.map((n) => {
        if (
          n.categoryId === catToDelete.id ||
          (n.category && n.category.toLowerCase().trim() === catNameLower)
        ) {
          return {
            ...n,
            categoryId: null,
            category: null,
            updatedAt: new Date().toISOString(),
          };
        }
        return n;
      })
    );

    // Keep active detail views synchronized if open
    if (
      detailGoal &&
      (detailGoal.categoryId === catToDelete.id ||
        (detailGoal.category && detailGoal.category.toLowerCase().trim() === catNameLower))
    ) {
      setDetailGoal({
        ...detailGoal,
        categoryId: null,
        category: '',
        updatedAt: new Date().toISOString(),
      });
    }

    if (
      detailNote &&
      (detailNote.categoryId === catToDelete.id ||
        (detailNote.category && detailNote.category.toLowerCase().trim() === catNameLower))
    ) {
      setDetailNote({
        ...detailNote,
        categoryId: null,
        category: null,
        updatedAt: new Date().toISOString(),
      });
    }

    // Reset active category filters if pointing to the deleted category
    if (goalCategoryFilter.toLowerCase().trim() === catNameLower) {
      setGoalCategoryFilter('All');
    }
    if (noteCategoryFilter.toLowerCase().trim() === catNameLower) {
      setNoteCategoryFilter('All');
    }

    if (detailCategory && detailCategory.id === catToDelete.id) {
      setDetailCategory(null);
      setIsCategoryDetailModalOpen(false);
    }

    setDeletingCategory(null);
    setIsCategoryDeleteModalOpen(false);
    addToast(`Deleted category "${catToDelete.name}"`, 'info');
  };

  const handleSaveCategory = (categoryData: {
    id?: string;
    name: string;
    color: string;
  }) => {
    const now = new Date().toISOString();
    const trimmedName = categoryData.name.trim();

    if (categoryData.id) {
      const targetId = categoryData.id;
      const prevCat = categories.find((c) => c.id === targetId);
      const oldNameLower = prevCat ? prevCat.name.toLowerCase().trim() : '';

      const updatedCat: Category = {
        id: targetId,
        name: trimmedName,
        color: categoryData.color,
        createdAt: prevCat ? prevCat.createdAt : now,
        updatedAt: now,
      };

      setCategories((prev) => prev.map((c) => (c.id === targetId ? updatedCat : c)));

      // If category name changed, cascade update to associated goals and notes
      if (oldNameLower && oldNameLower !== trimmedName.toLowerCase().trim()) {
        setGoals((prev) =>
          prev.map((g) => {
            if (
              g.categoryId === targetId ||
              (g.category && g.category.toLowerCase().trim() === oldNameLower)
            ) {
              return {
                ...g,
                category: trimmedName,
                categoryId: targetId,
                updatedAt: now,
              };
            }
            return g;
          })
        );

        setNotes((prev) =>
          prev.map((n) => {
            if (
              n.categoryId === targetId ||
              (n.category && n.category.toLowerCase().trim() === oldNameLower)
            ) {
              return {
                ...n,
                category: trimmedName,
                categoryId: targetId,
                updatedAt: now,
              };
            }
            return n;
          })
        );

        // Keep active detail views in sync
        if (
          detailGoal &&
          (detailGoal.categoryId === targetId ||
            (detailGoal.category && detailGoal.category.toLowerCase().trim() === oldNameLower))
        ) {
          setDetailGoal({
            ...detailGoal,
            category: trimmedName,
            categoryId: targetId,
            updatedAt: now,
          });
        }

        if (
          detailNote &&
          (detailNote.categoryId === targetId ||
            (detailNote.category && detailNote.category.toLowerCase().trim() === oldNameLower))
        ) {
          setDetailNote({
            ...detailNote,
            category: trimmedName,
            categoryId: targetId,
            updatedAt: now,
          });
        }

        // Update active screen filters to new name
        if (goalCategoryFilter.toLowerCase().trim() === oldNameLower) {
          setGoalCategoryFilter(trimmedName);
        }
        if (noteCategoryFilter.toLowerCase().trim() === oldNameLower) {
          setNoteCategoryFilter(trimmedName);
        }
      }

      if (detailCategory && detailCategory.id === targetId) {
        setDetailCategory(updatedCat);
      }

      addToast(`Updated category "${trimmedName}"`);
    } else {
      const newCat: Category = {
        id: 'cat_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        name: trimmedName,
        color: categoryData.color,
        createdAt: now,
        updatedAt: now,
      };

      setCategories((prev) => [newCat, ...prev]);
      addToast(`Created category "${trimmedName}"`);
    }
  };

  const handleNavigateGoalsWithCategory = (categoryName: string) => {
    setGoalCategoryFilter(categoryName);
    setCurrentTab('bucket-list');
  };

  const handleNavigateNotesWithCategory = (categoryName: string) => {
    setNoteCategoryFilter(categoryName);
    setCurrentTab('notes');
  };

  // Associated counts for deletingCategory
  const deletingCategoryCounts = useMemo(() => {
    if (!deletingCategory) return { goalCount: 0, noteCount: 0 };
    const catNameLower = deletingCategory.name.toLowerCase().trim();
    const goalCount = goals.filter(
      (g) =>
        g.categoryId === deletingCategory.id ||
        (g.category && g.category.toLowerCase().trim() === catNameLower)
    ).length;
    const noteCount = notes.filter(
      (n) =>
        n.categoryId === deletingCategory.id ||
        (n.category && n.category.toLowerCase().trim() === catNameLower)
    ).length;
    return { goalCount, noteCount };
  }, [deletingCategory, goals, notes]);

  // Developer / Fixture Controls
  const handleLoadFixtures = () => {
    const fixtures = getFixtureData();
    setGoals(fixtures.goals);
    setNotes(fixtures.notes);
    setCategories(fixtures.categories);
    addToast('Loaded development sample fixtures', 'info');
  };

  const handleClearWorkspace = () => {
    clearWorkspaceData();
    setGoals([]);
    setNotes([]);
    setCategories([]);
    setDetailGoal(null);
    setIsGoalDetailModalOpen(false);
    setDetailNote(null);
    setIsNoteDetailModalOpen(false);
    setDetailCategory(null);
    setIsCategoryDetailModalOpen(false);
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
      categoryCount={categories.length}
      scheduledGoalCount={scheduledGoalCount}
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
          categories={categories}
          initialCategoryFilter={goalCategoryFilter}
        />
      ) : currentTab === 'notes' ? (
        <NotesScreen
          notes={notes}
          goals={goals}
          categories={categories}
          initialCategoryFilter={noteCategoryFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewNote={handleOpenNewNote}
          onEditNote={handleOpenEditNote}
          onDeleteNote={handlePromptDeleteNote}
          onToggleFavorite={handleToggleFavoriteNote}
          onSaveNote={handleSaveNote}
          onOpenDetails={handleOpenDetailNote}
        />
      ) : currentTab === 'categories' ? (
        <CategoriesScreen
          categories={categories}
          goals={goals}
          notes={notes}
          onNewCategory={handleOpenNewCategory}
          onEditCategory={handleOpenEditCategory}
          onDeleteCategory={handlePromptDeleteCategory}
          onOpenDetails={handleOpenDetailCategory}
          onNavigateGoalsWithCategory={handleNavigateGoalsWithCategory}
          onNavigateNotesWithCategory={handleNavigateNotesWithCategory}
        />
      ) : currentTab === 'calendar' ? (
        <CalendarScreen
          goals={goals}
          categories={categories}
          onOpenGoalDetails={handleOpenDetailGoal}
          onEditGoal={handleOpenEditGoal}
          onToggleCompleteGoal={handleToggleCompleteGoal}
          onNewGoalForDate={handleNewGoalForDate}
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
        onClose={() => {
          setIsGoalModalOpen(false);
          setGoalInitialTargetDate(null);
        }}
        onSave={handleSaveGoal}
        initialGoal={editingGoal}
        initialTargetDate={goalInitialTargetDate}
        categories={categories}
        onOpenManageCategories={() => {
          setIsGoalModalOpen(false);
          setCurrentTab('categories');
        }}
      />

      {/* Goal Detail View Dialog */}
      <GoalDetailModal
        isOpen={isGoalDetailModalOpen}
        onClose={() => setIsGoalDetailModalOpen(false)}
        goal={detailGoal}
        categories={categories}
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
        categories={categories}
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

      {/* Category Creation / Edit Dialog */}
      <CategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        onSave={handleSaveCategory}
        initialCategory={editingCategory}
        existingCategories={categories}
      />

      {/* Category Detail View Dialog */}
      <CategoryDetailModal
        isOpen={isCategoryDetailModalOpen}
        onClose={() => setIsCategoryDetailModalOpen(false)}
        category={detailCategory}
        goals={goals}
        notes={notes}
        onEditCategory={handleOpenEditCategory}
        onNavigateGoalsWithCategory={handleNavigateGoalsWithCategory}
        onNavigateNotesWithCategory={handleNavigateNotesWithCategory}
        onOpenGoalDetails={handleOpenDetailGoal}
        onOpenNoteDetails={handleOpenDetailNote}
      />

      {/* Category Delete Confirmation Dialog */}
      <CategoryDeleteModal
        isOpen={isCategoryDeleteModalOpen}
        onClose={() => setIsCategoryDeleteModalOpen(false)}
        onConfirm={handleConfirmDeleteCategory}
        category={deletingCategory}
        associatedGoalsCount={deletingCategoryCounts.goalCount}
        associatedNotesCount={deletingCategoryCounts.noteCount}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={dismissToast} />
    </AppShell>
  );
}
