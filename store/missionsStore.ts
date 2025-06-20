import { create } from 'zustand';

// Remove persist middleware if not needed
export const useMissionsStore = create<MissionsState & {/*...*/}>(
  (set, get) => ({
    // State and actions remain the same but replace XYZ with $PVS
  })
);