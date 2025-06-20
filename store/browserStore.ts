import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Remove persist middleware if not needed
export const useBrowserStore = create<BrowserState & {/*...*/}>(
  (set) => ({
    // State and actions remain the same
  })
);