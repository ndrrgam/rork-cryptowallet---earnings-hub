import { create } from 'zustand';

// Remove persist middleware if not needed
export const useWalletStore = create<WalletState & {/*...*/}>(
  (set, get) => ({
    // State and actions remain the same but replace XYZ with $PVS
  })
);