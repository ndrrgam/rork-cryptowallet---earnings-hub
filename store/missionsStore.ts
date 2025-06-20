import { create } from 'zustand';
import { Mission, ReferralInfo } from '@/types/wallet';
import { useWalletStore } from './walletStore';

// Mock missions
const mockMissions: Mission[] = [
  {
    id: 'm1',
    title: 'Browse 5 DApps',
    description: 'Explore 5 different DApps in the Explorer',
    reward: '10',
    completed: false,
    expires: Date.now() + 86400000 // 24 hours
  },
  {
    id: 'm2',
    title: 'Stake XYZ Tokens',
    description: 'Stake at least 100 XYZ tokens',
    reward: '25',
    completed: false,
    expires: Date.now() + 86400000 // 24 hours
  },
  {
    id: 'm3',
    title: 'Secure Browsing',
    description: 'Use the secure browser for at least 30 minutes',
    reward: '15',
    completed: false,
    expires: Date.now() + 86400000 // 24 hours
  }
];

// Initial referral info
const initialReferral: ReferralInfo = {
  code: 'XYZ' + Math.random().toString(36).substring(2, 8).toUpperCase(),
  totalReferred: 0,
  earned: '0.00'
};

interface MissionsState {
  dailyMissions: Mission[];
  referral: ReferralInfo;
  lastRefresh: number;
}

export const useMissionsStore = create<
  MissionsState & {
    completeMission: (id: string) => Promise<boolean>;
    claimMissionReward: (id: string) => Promise<boolean>;
    refreshMissions: () => void;
    referFriend: (email: string) => Promise<boolean>;
  }
>((set, get) => ({
  dailyMissions: mockMissions,
  referral: initialReferral,
  lastRefresh: Date.now(),
  
  completeMission: async (id) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      set((state) => ({
        dailyMissions: state.dailyMissions.map(mission => 
          mission.id === id ? { ...mission, completed: true } : mission
        )
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to complete mission:', error);
      return false;
    }
  },
  
  claimMissionReward: async (id) => {
    try {
      const mission = get().dailyMissions.find(m => m.id === id);
      if (!mission || !mission.completed) return false;
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Add reward to wallet
      const walletStore = useWalletStore.getState();
      const xyzToken = walletStore.tokens.find(t => t.id === 'xyz');
      
      if (xyzToken) {
        const newBalance = (parseFloat(xyzToken.balance) + parseFloat(mission.reward)).toFixed(2);
        walletStore.updateBalance('xyz', newBalance);
        
        // Add transaction
        walletStore.addTransaction({
          type: 'earn',
          amount: mission.reward,
          token: 'XYZ',
          timestamp: Date.now(),
          status: 'completed'
        });
      }
      
      // Remove mission from list
      set((state) => ({
        dailyMissions: state.dailyMissions.filter(m => m.id !== id)
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to claim mission reward:', error);
      return false;
    }
  },
  
  refreshMissions: () => {
    const now = Date.now();
    const hoursSinceLastRefresh = (now - get().lastRefresh) / (1000 * 60 * 60);
    
    // Only refresh if it's been more than 20 hours
    if (hoursSinceLastRefresh < 20) return;
    
    // Generate new missions
    const newMissions: Mission[] = [
      {
        id: 'm' + now + '1',
        title: 'Visit 3 New DApps',
        description: 'Explore 3 DApps you haven\'t visited before',
        reward: '15',
        completed: false,
        expires: now + 86400000 // 24 hours
      },
      {
        id: 'm' + now + '2',
        title: 'Send XYZ Tokens',
        description: 'Send at least 10 XYZ tokens to another wallet',
        reward: '20',
        completed: false,
        expires: now + 86400000 // 24 hours
      },
      {
        id: 'm' + now + '3',
        title: 'Use Secure Browser',
        description: 'Browse for at least 15 minutes with VPN enabled',
        reward: '10',
        completed: false,
        expires: now + 86400000 // 24 hours
      }
    ];
    
    set({
      dailyMissions: newMissions,
      lastRefresh: now
    });
  },
  
  referFriend: async (email) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, this would send an invitation email
      
      // Update referral stats (in a real app, this would happen when the friend signs up)
      set((state) => ({
        referral: {
          ...state.referral,
          totalReferred: state.referral.totalReferred + 1,
          earned: (parseFloat(state.referral.earned) + 50).toFixed(2) // 50 XYZ per referral
        }
      }));
      
      return true;
    } catch (error) {
      console.error('Failed to refer friend:', error);
      return false;
    }
  }
}));