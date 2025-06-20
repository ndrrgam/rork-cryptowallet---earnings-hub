import { create } from 'zustand';
import { EarningState, NFTBooster } from '@/types/wallet';
import { useWalletStore } from './walletStore';

// Mock NFT boosters
const mockBoosters: NFTBooster[] = [
  {
    id: 'nft1',
    name: 'Bronze Booster',
    boost: 0.2, // 20% boost
    image: 'https://images.unsplash.com/photo-1635236066449-5b45769be233?w=200&h=200&fit=crop&auto=format',
    isActive: true
  },
  {
    id: 'nft2',
    name: 'Silver Booster',
    boost: 0.5, // 50% boost
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=200&h=200&fit=crop&auto=format',
    isActive: false
  }
];

// Initial state
const initialState: EarningState = {
  isActive: true,
  rate: 5, // 5 tokens per hour
  boosted: 1.2, // 20% boost
  totalEarned: '1250.00',
  lastClaim: Date.now() - 3600000, // 1 hour ago
  stakingAmount: '500.00',
  nftBoosters: mockBoosters
};

export const useEarningStore = create<
  EarningState & {
    toggleDNS: () => void;
    claimEarnings: () => Promise<boolean>;
    stakeTokens: (amount: string) => Promise<boolean>;
    unstakeTokens: (amount: string) => Promise<boolean>;
    toggleNFTBooster: (id: string) => void;
    calculatePendingEarnings: () => number;
  }
>((set, get) => ({
  ...initialState,
  
  toggleDNS: () => {
    set((state) => ({
      isActive: !state.isActive
    }));
  },
  
  claimEarnings: async () => {
    try {
      const pendingAmount = get().calculatePendingEarnings();
      if (pendingAmount <= 0) return false;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update total earned
      set((state) => ({
        totalEarned: (parseFloat(state.totalEarned) + pendingAmount).toFixed(2),
        lastClaim: Date.now()
      }));
      
      // Add transaction to wallet
      const walletStore = useWalletStore.getState();
      walletStore.addTransaction({
        type: 'earn',
        amount: pendingAmount.toFixed(2),
        token: 'XYZ',
        timestamp: Date.now(),
        status: 'completed'
      });
      
      // Update token balance
      const xyzToken = walletStore.tokens.find(t => t.id === 'xyz');
      if (xyzToken) {
        const newBalance = (parseFloat(xyzToken.balance) + pendingAmount).toFixed(2);
        walletStore.updateBalance('xyz', newBalance);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to claim earnings:', error);
      return false;
    }
  },
  
  stakeTokens: async (amount) => {
    try {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) return false;
      
      const walletStore = useWalletStore.getState();
      const xyzToken = walletStore.tokens.find(t => t.id === 'xyz');
      
      if (!xyzToken || parseFloat(xyzToken.balance) < amountNum) {
        return false; // Insufficient balance
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update staking amount
      set((state) => ({
        stakingAmount: (parseFloat(state.stakingAmount) + amountNum).toFixed(2),
        // Increase rate based on staking amount
        rate: state.rate + (amountNum / 100), // +1 token per hour for every 100 staked
        boosted: state.boosted + (amountNum / 1000) // +0.1 boost for every 1000 staked
      }));
      
      // Deduct from wallet balance
      const newBalance = (parseFloat(xyzToken.balance) - amountNum).toFixed(2);
      walletStore.updateBalance('xyz', newBalance);
      
      // Add transaction
      walletStore.addTransaction({
        type: 'stake',
        amount: amount,
        token: 'XYZ',
        timestamp: Date.now(),
        status: 'completed'
      });
      
      return true;
    } catch (error) {
      console.error('Failed to stake tokens:', error);
      return false;
    }
  },
  
  unstakeTokens: async (amount) => {
    try {
      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) return false;
      
      const currentStaked = parseFloat(get().stakingAmount);
      if (amountNum > currentStaked) return false; // Cannot unstake more than staked
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update staking amount
      set((state) => ({
        stakingAmount: (currentStaked - amountNum).toFixed(2),
        // Decrease rate based on unstaking amount
        rate: Math.max(5, state.rate - (amountNum / 100)), // Minimum 5 tokens per hour
        boosted: Math.max(1, state.boosted - (amountNum / 1000)) // Minimum 1x boost
      }));
      
      // Add to wallet balance
      const walletStore = useWalletStore.getState();
      const xyzToken = walletStore.tokens.find(t => t.id === 'xyz');
      
      if (xyzToken) {
        const newBalance = (parseFloat(xyzToken.balance) + amountNum).toFixed(2);
        walletStore.updateBalance('xyz', newBalance);
      }
      
      // Add transaction
      walletStore.addTransaction({
        type: 'unstake',
        amount: amount,
        token: 'XYZ',
        timestamp: Date.now(),
        status: 'completed'
      });
      
      return true;
    } catch (error) {
      console.error('Failed to unstake tokens:', error);
      return false;
    }
  },
  
  toggleNFTBooster: (id) => {
    set((state) => ({
      nftBoosters: state.nftBoosters.map(booster => 
        booster.id === id 
          ? { ...booster, isActive: !booster.isActive } 
          : booster
      ),
      // Recalculate boost
      boosted: state.nftBoosters.reduce((total, booster) => {
        if (booster.id === id) {
          return booster.isActive 
            ? total - booster.boost // If it was active, remove boost
            : total + booster.boost; // If it was inactive, add boost
        }
        return booster.isActive ? total + booster.boost : total;
      }, 1) // Base multiplier is 1
    }));
  },
  
  calculatePendingEarnings: () => {
    const { isActive, rate, boosted, lastClaim } = get();
    if (!isActive) return 0;
    
    const hoursSinceLastClaim = (Date.now() - lastClaim) / (1000 * 60 * 60);
    return rate * boosted * hoursSinceLastClaim;
  }
}));