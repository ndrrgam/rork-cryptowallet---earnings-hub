export interface Token {
  id: string;
  symbol: string;
  name: string;
  balance: string;
  value: number;
  change24h: number;
  icon: string;
}

export interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'earn' | 'stake' | 'unstake';
  amount: string;
  token: string;
  address?: string;
  timestamp: number;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: number;
  expires: number;
  completed: boolean;
}

export interface EarningState {
  totalEarned: number;
  earningRate: number;
  boosted: number;
  stakingAmount: number;
  nftBoosters: Array<{
    id: string;
    name: string;
    boost: number;
    isActive: boolean;
  }>;
}