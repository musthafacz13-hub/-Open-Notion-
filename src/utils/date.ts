/**
 * Date utility functions for Bucket workspace
 */

export function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return 'No target date';
  try {
    const trimmed = dateString.trim();
    if (!trimmed) return 'No target date';

    // If YYYY-MM-DD
    const parts = trimmed.split('T')[0].split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (isNaN(year) || isNaN(month) || isNaN(day)) return 'No target date';

      const date = new Date(year, month, day);
      if (isNaN(date.getTime())) return 'No target date';
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date);
    }

    const date = new Date(trimmed);
    if (isNaN(date.getTime())) return 'No target date';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return 'No target date';
  }
}

export function formatRelativeOrShortDate(dateString: string | null | undefined): string {
  if (!dateString) return '';
  try {
    const trimmed = dateString.trim();
    if (!trimmed) return '';

    const date = new Date(trimmed);
    if (isNaN(date.getTime())) return '';

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) {
      // Future timestamp, format as short date
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    }

    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
    }).format(date);
  } catch {
    return '';
  }
}

export function isUpcomingDate(targetDate: string | null | undefined): boolean {
  if (!targetDate) return false;
  try {
    const trimmed = targetDate.trim();
    if (!trimmed) return false;

    const parts = trimmed.split('T')[0].split('-');
    let targetTime: number;

    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (isNaN(year) || isNaN(month) || isNaN(day)) return false;
      targetTime = new Date(year, month, day, 23, 59, 59, 999).getTime();
    } else {
      const parsedDate = new Date(trimmed);
      if (isNaN(parsedDate.getTime())) return false;
      targetTime = parsedDate.getTime();
    }

    if (isNaN(targetTime)) return false;
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
    return targetTime >= startOfToday;
  } catch {
    return false;
  }
}

export function getDaysRemaining(targetDate: string | null | undefined): string | null {
  if (!targetDate) return null;
  try {
    const trimmed = targetDate.trim();
    if (!trimmed) return null;

    const parts = trimmed.split('T')[0].split('-');
    let target: Date;

    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
      target = new Date(year, month, day);
    } else {
      target = new Date(trimmed);
    }

    if (isNaN(target.getTime())) return null;

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return `${Math.abs(diffDays)}d overdue`;
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `In ${diffDays} days`;
  } catch {
    return null;
  }
}
