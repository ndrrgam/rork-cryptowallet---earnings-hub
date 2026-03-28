import { create } from 'zustand';
import { EarningState } from '@/types/wallet';

export const useEarningStore = create<EarningState>((set, get) => ({
  totalEarned: 0,
  earningRate: 0.5,
  boosted: 1.2,
  stakingAmount: 100,
  nftBoosters: [
    {
      id: 'booster1',
      name: 'Speed Booster',
      boost: 0.1,
      isActive: true,
    },
    {
      id: 'booster2',
      name: 'Power Booster',
      boost: 0.15,
      isActive: false,
    },
    {
      id: 'booster3',
      name: 'Mega Booster',
      boost: 0.2,
      isActive: false,
    }
  ]
}));