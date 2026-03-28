import { create } from 'zustand';
import { Mission } from '@/types/wallet';

interface MissionsState {
  dailyMissions: Mission[];
  refreshMissions: () => void;
  completeMission: (id: string) => Promise<void>;
  claimMissionReward: (id: string) => Promise<void>;
  referral: {
    code: string;
    totalReferred: number;
    earned: number;
  };
}

export const useMissionsStore = create<MissionsState>((set, get) => ({
  dailyMissions: [
    {
      id: 'mission1',
      title: 'Browse 3 DApps',
      description: 'Visit and interact with 3 different DApps using the browser',
      reward: 5,
      expires: Date.now() + 86400000,
      completed: false
    },
    {
      id: 'mission2',
      title: 'Make a Swap',
      description: 'Complete a token swap on any supported DEX',
      reward: 10,
      expires: Date.now() + 86400000,
      completed: false
    },
    {
      id: 'mission3',
      title: 'Stake PVS',
      description: 'Stake any amount of PVS tokens',
      reward: 15,
      expires: Date.now() + 86400000,
      completed: true
    }
  ],
  referral: {
    code: 'EARN123',
    totalReferred: 5,
    earned: 250
  },
  refreshMissions: () => {
    // In a real app, this would fetch from an API
    console.log('Refreshing missions...');
  },
  completeMission: async (id: string) => {
    set(state => ({
      dailyMissions: state.dailyMissions.map(mission =>
        mission.id === id ? { ...mission, completed: true } : mission
      )
    }));
  },
  claimMissionReward: async (id: string) => {
    // In a real app, this would call an API to claim rewards
    console.log('Claiming reward for mission:', id);
  }
}));