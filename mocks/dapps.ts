import { DApp } from '@/components/DAppCard';

export const featuredDApps: DApp[] = [
  {
    id: 'uniswap',
    name: 'Uniswap',
    description: 'Swap, earn, and build on the leading decentralized crypto trading protocol.',
    category: 'DeFi',
    url: 'https://app.uniswap.org',
    icon: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop&auto=format',
    banner: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800&h=300&fit=crop&auto=format',
    featured: true
  },
  {
    id: 'opensea',
    name: 'OpenSea',
    description: 'Discover, collect, and sell extraordinary NFTs on the world\'s first & largest NFT marketplace.',
    category: 'NFT',
    url: 'https://opensea.io',
    icon: 'https://images.unsplash.com/photo-1646671424735-6f0f4fe20d8d?w=64&h=64&fit=crop&auto=format',
    banner: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=800&h=300&fit=crop&auto=format',
    featured: true
  },
  {
    id: 'aave',
    name: 'Aave',
    description: 'Open source and non-custodial liquidity protocol for earning interest and borrowing assets.',
    category: 'DeFi',
    url: 'https://app.aave.com',
    icon: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop&auto=format',
    banner: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=300&fit=crop&auto=format',
    featured: true
  }
];

export const popularDApps: DApp[] = [
  {
    id: 'compound',
    name: 'Compound',
    description: 'Algorithmic, autonomous interest rate protocol built for developers.',
    category: 'DeFi',
    url: 'https://app.compound.finance',
    icon: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop&auto=format'
  },
  {
    id: 'curve',
    name: 'Curve Finance',
    description: 'Exchange liquidity pool designed for stablecoin trading.',
    category: 'DeFi',
    url: 'https://curve.fi',
    icon: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop&auto=format'
  },
  {
    id: 'rarible',
    name: 'Rarible',
    description: 'Create, sell or collect digital items secured with blockchain.',
    category: 'NFT',
    url: 'https://rarible.com',
    icon: 'https://images.unsplash.com/photo-1646671424735-6f0f4fe20d8d?w=64&h=64&fit=crop&auto=format'
  },
  {
    id: 'sushiswap',
    name: 'SushiSwap',
    description: 'Community-run DEX with yield farming opportunities.',
    category: 'DeFi',
    url: 'https://app.sushi.com',
    icon: 'https://images.unsplash.com/photo-1622630998477-20aa696ecb05?w=64&h=64&fit=crop&auto=format'
  },
  {
    id: 'foundation',
    name: 'Foundation',
    description: 'Platform for artists and collectors to buy, sell, and auction NFTs.',
    category: 'NFT',
    url: 'https://foundation.app',
    icon: 'https://images.unsplash.com/photo-1646671424735-6f0f4fe20d8d?w=64&h=64&fit=crop&auto=format'
  }
];

export const categories = [
  'All',
  'DeFi',
  'NFT',
  'Gaming',
  'Social',
  'Utility'
];

export const allDApps: DApp[] = [
  ...featuredDApps,
  ...popularDApps,
  {
    id: 'axieinfinity',
    name: 'Axie Infinity',
    description: 'Digital pet universe where players battle, collect, and earn tokens.',
    category: 'Gaming',
    url: 'https://axieinfinity.com',
    icon: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=64&h=64&fit=crop&auto=format'
  },
  {
    id: 'decentraland',
    name: 'Decentraland',
    description: 'Virtual reality platform powered by the Ethereum blockchain.',
    category: 'Gaming',
    url: 'https://decentraland.org',
    icon: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=64&h=64&fit=crop&auto=format'
  },
  {
    id: 'ens',
    name: 'ENS Domains',
    description: 'Decentralized naming for wallets, websites, & more.',
    category: 'Utility',
    url: 'https://app.ens.domains',
    icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop&auto=format'
  },
  {
    id: 'lens',
    name: 'Lens Protocol',
    description: 'Web3 social graph on Polygon for content creators.',
    category: 'Social',
    url: 'https://lens.xyz',
    icon: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=64&h=64&fit=crop&auto=format'
  }
];