import { create } from 'zustand';
import { WalletState, Token, Transaction } from '@/types/wallet';

// Mock data for initial state
const mockTokens: Token[] = [
  {
    id: 'xyz',
    symbol: 'XYZ',
    name: 'XYZ Token',
    balance: '1250.00',
    value: 1250,
    change24h: 5.2,
    icon: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop&auto=format'
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    balance: '0.25',
    value: 750,
    change24h: -2.1,
    icon: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=64&h=64&fit=crop&auto=format'
  }
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'earn',
    amount: '10.5',
    token: 'XYZ',
    timestamp: Date.now() - 3600000,
    status: 'completed'
  },
  {
    id: '2',
    type: 'receive',
    amount: '0.1',
    token: 'ETH',
    timestamp: Date.now() - 86400000,
    status: 'completed',
    address: '0x1234...5678',
    hash: '0xabcd...efgh'
  },
  {
    id: '3',
    type: 'send',
    amount: '50',
    token: 'XYZ',
    timestamp: Date.now() - 172800000,
    status: 'completed',
    address: '0x8765...4321',
    hash: '0xijkl...mnop'
  }
];

// Initial state
const initialState: WalletState = {
  address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  tokens: mockTokens,
  transactions: mockTransactions,
  totalBalance: 2000,
  isLoading: false,
  error: null
};

export const useWalletStore = create<
  WalletState & {
    addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
    updateBalance: (tokenId: string, newBalance: string) => void;
    refreshWallet: () => Promise<void>;
    sendToken: (to: string, amount: string, tokenId: string) => Promise<boolean>;
  }
>((set, get) => ({
  ...initialState,
  
  addTransaction: (transaction) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    
    set((state) => ({
      transactions: [newTransaction, ...state.transactions]
    }));
  },
  
  updateBalance: (tokenId, newBalance) => {
    set((state) => ({
      tokens: state.tokens.map((token) => 
        token.id === tokenId 
          ? { ...token, balance: newBalance } 
          : token
      ),
      totalBalance: state.tokens.reduce((sum, token) => {
        const balance = token.id === tokenId 
          ? parseFloat(newBalance) * token.value / parseFloat(token.balance)
          : token.value;
        return sum + balance;
      }, 0)
    }));
  },
  
  refreshWallet: async () => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would fetch actual balances from the blockchain
      set((state) => ({
        isLoading: false,
        tokens: state.tokens.map(token => ({
          ...token,
          balance: (parseFloat(token.balance) * (1 + (Math.random() * 0.02 - 0.01))).toFixed(2),
          change24h: token.change24h + (Math.random() * 2 - 1)
        }))
      }));
      
      // Recalculate total balance
      set((state) => ({
        totalBalance: state.tokens.reduce((sum, token) => sum + token.value, 0)
      }));
      
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Failed to refresh wallet" 
      });
    }
  },
  
  sendToken: async (to, amount, tokenId) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const token = get().tokens.find(t => t.id === tokenId);
      if (!token) throw new Error("Token not found");
      
      const currentBalance = parseFloat(token.balance);
      const sendAmount = parseFloat(amount);
      
      if (sendAmount > currentBalance) {
        throw new Error("Insufficient balance");
      }
      
      // Update balance
      const newBalance = (currentBalance - sendAmount).toFixed(2);
      get().updateBalance(tokenId, newBalance);
      
      // Add transaction
      get().addTransaction({
        type: 'send',
        amount,
        token: tokenId,
        timestamp: Date.now(),
        status: 'completed',
        address: to,
        hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 10)}`
      });
      
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ 
        isLoading: false, 
        error: error instanceof Error ? error.message : "Transaction failed" 
      });
      return false;
    }
  }
}));