import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthSession {
  accessToken: string;
  user: AuthUser;
  expiresAt?: number;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  user?: AuthUser;
  session?: AuthSession;
  requiresEmailVerification?: boolean;
}

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

const CONFIG_MISSING_MESSAGE =
  'Supabase credentials are not configured. Please define VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to connect to live authentication.';

function mapSupabaseUser(user: User): AuthUser {
  return {
    id: user.id,
    email: user.email || '',
    name: (user.user_metadata?.full_name as string) || (user.user_metadata?.name as string) || '',
  };
}

function mapSupabaseSession(session: Session): AuthSession {
  return {
    accessToken: session.access_token,
    user: mapSupabaseUser(session.user),
    expiresAt: session.expires_at,
  };
}

/**
 * Registers a new user account with Supabase Auth using email and password.
 */
export async function signUp({ name, email, password }: SignUpParams): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: CONFIG_MISSING_MESSAGE,
    };
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          full_name: name.trim(),
        },
        emailRedirectTo: typeof window !== 'undefined' ? `${window.location.origin}?view=app` : undefined,
      },
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (data.user) {
      // If user is returned but session is null, email confirmation is enabled on Supabase
      const requiresVerification = !data.session;
      return {
        success: true,
        user: mapSupabaseUser(data.user),
        session: data.session ? mapSupabaseSession(data.session) : undefined,
        requiresEmailVerification: requiresVerification,
      };
    }

    return {
      success: false,
      error: 'An unexpected response was received during registration.',
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to connect to authentication server.',
    };
  }
}

/**
 * Authenticates an existing user using email and password via Supabase Auth.
 */
export async function signInWithPassword({ email, password }: SignInParams): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: CONFIG_MISSING_MESSAGE,
    };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    if (data.session && data.user) {
      return {
        success: true,
        user: mapSupabaseUser(data.user),
        session: mapSupabaseSession(data.session),
      };
    }

    return {
      success: false,
      error: 'Failed to establish an authenticated session.',
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to connect to authentication server.',
    };
  }
}

/**
 * Initiates a password reset request via Supabase Auth.
 */
export async function resetPasswordForEmail(email: string): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: CONFIG_MISSING_MESSAGE,
    };
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: typeof window !== 'undefined' ? `${window.location.origin}?view=reset-password` : undefined,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to request password reset.',
    };
  }
}

/**
 * Updates the authenticated user's password with Supabase Auth.
 */
export async function updatePassword(newPassword: string): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return {
      success: false,
      error: CONFIG_MISSING_MESSAGE,
    };
  }

  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      user: data.user ? mapSupabaseUser(data.user) : undefined,
    };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to update password.',
    };
  }
}

/**
 * Signs out the current user session from Supabase.
 */
export async function signOut(): Promise<AuthResult> {
  if (!isSupabaseConfigured() || !supabase) {
    return { success: true };
  }

  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Failed to sign out cleanly.',
    };
  }
}

/**
 * Retrieves the currently active Supabase session, if any.
 */
export async function getActiveSession(): Promise<AuthSession | null> {
  if (!isSupabaseConfigured() || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return null;
    }
    return mapSupabaseSession(data.session);
  } catch {
    return null;
  }
}

/**
 * Subscribes to Supabase authentication state changes (sign in, sign out, token refresh).
 */
export function subscribeToAuthChanges(
  callback: (session: AuthSession | null) => void
): { unsubscribe: () => void } {
  if (!isSupabaseConfigured() || !supabase) {
    return { unsubscribe: () => {} };
  }

  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session ? mapSupabaseSession(session) : null);
  });

  return {
    unsubscribe: () => {
      listener.subscription.unsubscribe();
    },
  };
}
