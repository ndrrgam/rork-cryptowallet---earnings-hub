import { create } from 'zustand';

interface BrowserState {
  history: BrowserHistoryItem[];
  bookmarks: Bookmark[];
  visitedDapps: string[];
}

export interface BrowserHistoryItem {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  timestamp: number;
  isDapp: boolean;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  isDapp: boolean;
}

// Mock data
const mockHistory: BrowserHistoryItem[] = [
  {
    id: 'h1',
    url: 'https://uniswap.org',
    title: 'Uniswap: Decentralized Trading Protocol',
    favicon: 'https://uniswap.org/favicon.ico',
    timestamp: Date.now() - 3600000,
    isDapp: true
  },
  {
    id: 'h2',
    url: 'https://opensea.io',
    title: 'OpenSea: NFT Marketplace',
    favicon: 'https://opensea.io/favicon.ico',
    timestamp: Date.now() - 7200000,
    isDapp: true
  }
];

const mockBookmarks: Bookmark[] = [
  {
    id: 'b1',
    url: 'https://uniswap.org',
    title: 'Uniswap',
    favicon: 'https://uniswap.org/favicon.ico',
    isDapp: true
  },
  {
    id: 'b2',
    url: 'https://aave.com',
    title: 'Aave',
    favicon: 'https://aave.com/favicon.ico',
    isDapp: true
  }
];

export const useBrowserStore = create<
  BrowserState & {
    addToHistory: (item: Omit<BrowserHistoryItem, 'id'>) => void;
    clearHistory: () => void;
    addBookmark: (bookmark: Omit<Bookmark, 'id'>) => void;
    removeBookmark: (id: string) => void;
    addVisitedDapp: (url: string) => void;
  }
>((set) => ({
  history: mockHistory,
  bookmarks: mockBookmarks,
  visitedDapps: ['https://uniswap.org', 'https://opensea.io'],
  
  addToHistory: (item) => {
    if (item.url === 'about:blank') return;
    
    set((state) => {
      // Don't add duplicates from the same browsing session
      const exists = state.history.some(h => h.url === item.url && 
        (Date.now() - h.timestamp) < 300000); // 5 minutes
      
      if (exists) return state;
      
      return {
        history: [
          {
            ...item,
            id: Date.now().toString()
          },
          ...state.history
        ].slice(0, 100) // Limit history to 100 items
      };
    });
  },
  
  clearHistory: () => {
    set({ history: [] });
  },
  
  addBookmark: (bookmark) => {
    set((state) => ({
      bookmarks: [
        {
          ...bookmark,
          id: Date.now().toString()
        },
        ...state.bookmarks
      ]
    }));
  },
  
  removeBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter(b => b.id !== id)
    }));
  },
  
  addVisitedDapp: (url) => {
    set((state) => {
      if (state.visitedDapps.includes(url)) return state;
      
      return {
        visitedDapps: [...state.visitedDapps, url]
      };
    });
  }
}));