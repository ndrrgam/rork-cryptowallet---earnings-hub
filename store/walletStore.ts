import { create } from 'zustand';
import { Token, Transaction } from '@/types/wallet';

interface WalletState {
  address: string;
  totalBalance: number;
  tokens: Token[];
  transactions: Transaction[];
  isLoading: boolean;
  refreshWallet: () => Promise<void>;
  sendToken: (recipient: string, amount: string, tokenId: string) => Promise<boolean>;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  address: '0x1234...5678',
  totalBalance: 1234.56,
  tokens: [
    {
      id: 'pvs',
      symbol: 'PVS',
      name: 'PVS Token',
      balance: '1000.00',
      value: 1000.00,
      change24h: 5.67,
      icon: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop&auto=format'
    }
  ],
  transactions: [
    {
      id: '1',
      type: 'receive',
      amount: '100',
      token: 'PVS',
      address: '0x9876...4321',
      timestamp: Date.now() - 3600000
    }
  ],
  isLoading: false,
  refreshWallet: async () => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ isLoading: false });
  },
  sendToken: async (recipient: string, amount: string, tokenId: string) => {
    set({ isLoading: true });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({ isLoading: false });
    return true;
  }
}));