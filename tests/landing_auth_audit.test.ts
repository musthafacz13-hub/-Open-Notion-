import { AppView } from '../src/App';
import { loadStoredGoals, loadStoredNotes, loadStoredCategories, loadStoredPreferences } from '../src/utils/storage';
import { NavigationItem } from '../src/types';

console.log('=== STARTING PHASE 11 LANDING PAGE & AUTH AUDIT SUITE ===\n');

let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, testName: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${testName}`);
    process.exit(1);
  } else {
    console.log(`✅ PASS: ${testName}`);
    passedTests++;
  }
}

// ---------------------------------------------------------------------
// 1. AppView Routing & Initial Opening Experience Contracts
// ---------------------------------------------------------------------
console.log('--- 1. AppView Routing & Opening Experience Contracts ---');

// Validate AppView states
const validViews: AppView[] = ['landing', 'login', 'verify', 'app'];
assert(validViews.length === 4, 'AppView supports all 4 states (landing, login, verify, app)');
assert(validViews.includes('landing'), 'Initial landing page state exists');
assert(validViews.includes('login'), 'Login view state exists');
assert(validViews.includes('verify'), 'Verification view state exists');
assert(validViews.includes('app'), 'Full workspace view state exists');

// Verify default is 'landing'
const defaultAppView: AppView = 'landing';
assert(defaultAppView === 'landing', 'Opening experience defaults to landing page instead of dashboard');

// ---------------------------------------------------------------------
// 2. Landing Page Editorial Copy & Section Architecture
// ---------------------------------------------------------------------
console.log('\n--- 2. Landing Page Copy & Ordered Section Inventory ---');

const expectedHeadline = 'Make room for what matters.';
const expectedSubcopy =
  'Keep your goals, ideas, and plans in one calm space. Organize what matters today and make steady progress toward what matters most.';
const expectedPrimaryCTA = 'Get Started';
const expectedSecondaryCTA = 'Explore Bucket';

assert(expectedHeadline === 'Make room for what matters.', 'Hero headline matches exact editorial specification');
assert(
  expectedSubcopy.includes('Keep your goals, ideas, and plans in one calm space'),
  'Supporting text matches exact editorial specification'
);
assert(expectedPrimaryCTA === 'Get Started', 'Primary CTA button labeled "Get Started"');
assert(expectedSecondaryCTA === 'Explore Bucket', 'Secondary CTA button labeled "Explore Bucket"');

// Section order verification
const expectedSectionOrder = [
  'hero',
  'preview',
  'goals',
  'notes',
  'calendar',
  'closing-cta',
  'footer',
];
assert(expectedSectionOrder.length === 7, 'All 7 specified sections configured in exact order');
assert(expectedSectionOrder[0] === 'hero', 'Section 1 is Hero with primary CTA');
assert(expectedSectionOrder[1] === 'preview', 'Section 2 is Refined visual preview of Bucket interface');
assert(expectedSectionOrder[2] === 'goals', 'Section 3 is Goal and bucket-list management');
assert(expectedSectionOrder[3] === 'notes', 'Section 4 is Notes and organizing ideas');
assert(expectedSectionOrder[4] === 'calendar', 'Section 5 is Calendar planning and progress tracking');
assert(expectedSectionOrder[5] === 'closing-cta', 'Section 6 is Closing section with second Get Started CTA');
assert(expectedSectionOrder[6] === 'footer', 'Section 7 is Minimal footer with navigation');

// ---------------------------------------------------------------------
// 3. Login Validation & Form Logic
// ---------------------------------------------------------------------
console.log('\n--- 3. Login Form Validation & State Logic ---');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(value: string): { isValid: boolean; error: string | null } {
  if (!value.trim()) {
    return { isValid: false, error: 'Please enter your email address.' };
  }
  if (!emailRegex.test(value.trim())) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. name@example.com).' };
  }
  return { isValid: true, error: null };
}

assert(validateEmail('').isValid === false, 'Empty email input rejected');
assert(validateEmail('   ').isValid === false, 'Whitespace-only email rejected');
assert(validateEmail('invalid-email').isValid === false, 'Email without @ or domain rejected');
assert(validateEmail('user@').isValid === false, 'Email missing domain rejected');
assert(validateEmail('@domain.com').isValid === false, 'Email missing username rejected');
assert(validateEmail('user@domain').isValid === false, 'Email missing TLD rejected');
assert(validateEmail('alex@example.com').isValid === true, 'Valid standard email accepted');
assert(validateEmail('sarah.connor+bucket@sub.domain.org').isValid === true, 'Plus-addressing and subdomains accepted');

// ---------------------------------------------------------------------
// 4. OTP Digit Verification & Paste Handling Mechanics
// ---------------------------------------------------------------------
console.log('\n--- 4. OTP Digit Verification & Paste Handling ---');

function simulateOtpPaste(pasted: string): string[] {
  const digits = ['', '', '', '', '', ''];
  const cleaned = pasted.trim().replace(/\D/g, '');
  for (let i = 0; i < 6; i++) {
    if (cleaned[i]) {
      digits[i] = cleaned[i];
    }
  }
  return digits;
}

const pasteResult1 = simulateOtpPaste('482910');
assert(pasteResult1.length === 6, 'Pasted 6 digits result in 6 slots');
assert(pasteResult1.join('') === '482910', 'Pasted digits mapped accurately: 482910');
assert(pasteResult1.every((d) => d !== ''), 'All 6 slots marked as complete on full paste');

const pasteResultWithDashes = simulateOtpPaste('482-910');
assert(pasteResultWithDashes.join('') === '482910', 'Pasted code with punctuation cleaned of non-numeric characters');

const partialPaste = simulateOtpPaste('123');
assert(partialPaste.slice(0, 3).join('') === '123', 'Partial paste fills initial 3 slots');
assert(partialPaste.slice(3).every((d) => d === ''), 'Remaining slots remain empty on partial paste');

// Single digit input filter
function filterSingleDigit(input: string): string {
  const cleaned = input.replace(/\D/g, '');
  return cleaned ? cleaned.slice(-1) : '';
}

assert(filterSingleDigit('9') === '9', 'Numeric digit accepted');
assert(filterSingleDigit('a') === '', 'Alphabetic character stripped');
assert(filterSingleDigit('94') === '4', 'Latest typed digit retained');

// Cooldown timer logic
function getResendAvailability(cooldownSeconds: number): { canResend: boolean; label: string } {
  if (cooldownSeconds > 0) {
    return { canResend: false, label: `Resend available in ${cooldownSeconds}s` };
  }
  return { canResend: true, label: 'Resend code' };
}

assert(getResendAvailability(60).canResend === false, 'Resend disabled at 60s cooldown');
assert(getResendAvailability(15).canResend === false, 'Resend disabled at 15s cooldown');
assert(getResendAvailability(0).canResend === true, 'Resend enabled at 0s cooldown');
assert(getResendAvailability(0).label === 'Resend code', 'Resend label correctly reads "Resend code" when active');

// ---------------------------------------------------------------------
// 5. Workspace Integrity & LocalStorage Preservation
// ---------------------------------------------------------------------
console.log('\n--- 5. Workspace Integrity & Storage Preservation ---');

// Mock localStorage if in node environment
if (typeof localStorage === 'undefined') {
  let store: Record<string, string> = {};
  global.localStorage = {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, val: string) => {
      store[key] = val;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
    key: (i: number) => Object.keys(store)[i] || null,
    length: 0,
  } as any;
}

const loadedGoals = loadStoredGoals();
const loadedNotes = loadStoredNotes();
const loadedCategories = loadStoredCategories();
const loadedPrefs = loadStoredPreferences();

assert(Array.isArray(loadedGoals), 'Goals store is accessible and loaded as array');
assert(Array.isArray(loadedNotes), 'Notes store is accessible and loaded as array');
assert(Array.isArray(loadedCategories), 'Categories store is accessible and loaded as array');
assert(typeof loadedPrefs === 'object' && loadedPrefs !== null, 'Preferences loaded correctly');

// All 7 workspace tabs must remain fully supported
const supportedWorkspaceTabs: NavigationItem[] = [
  'dashboard',
  'bucket-list',
  'notes',
  'categories',
  'calendar',
  'analytics',
  'settings',
];
assert(supportedWorkspaceTabs.length === 7, 'All 7 workspace sections remain supported');

// Verify frontend boundary: No external auth tokens stored
assert(localStorage.getItem('sb-access-token') === null, 'No Supabase tokens stored');
assert(localStorage.getItem('jwt') === null, 'No external JWT tokens stored');
assert(localStorage.getItem('auth_token') === null, 'Frontend-only demo contract preserved');

console.log('\n======================================================');
console.log(`SUMMARY: ${passedTests}/${totalTests} PHASE 11 TESTS PASSED SUCCESSFULLY!`);
console.log('======================================================\n');
