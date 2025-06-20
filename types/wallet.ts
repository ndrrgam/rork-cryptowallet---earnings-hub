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
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  address?: string;
  hash?: string;
}

export interface WalletState {
  address: string;
  privateKey?: string;
  tokens: Token[];
  transactions: Transaction[];
  totalBalance: number;
  isLoading: boolean;
  error: string | null;
}

export interface EarningState {
  isActive: boolean;
  rate: number; // tokens per hour
  boosted: number; // boost multiplier
  totalEarned: string;
  lastClaim: number;
  stakingAmount: string;
  nftBoosters: NFTBooster[];
}

export interface NFTBooster {
  id: string;
  name: string;
  boost: number;
  image: string;
  isActive: boolean;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  reward: string;
  completed: boolean;
  expires: number;
}

export interface ReferralInfo {
  code: string;
  totalReferred: number;
  earned: string;
}