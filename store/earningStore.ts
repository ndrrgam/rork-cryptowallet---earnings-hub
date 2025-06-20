import { create } from 'zustand';

// Remove persist middleware if not needed
export const useEarningStore = create<EarningState & {/*...*/}>(
  (set, get) => ({
    // State and actions remain the same but replace XYZ with $PVS
  })
);