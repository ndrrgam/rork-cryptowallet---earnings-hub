import { create } from 'zustand';

interface BrowserHistory {
  url: string;
  title: string;
  favicon: string;
  timestamp: number;
  isDapp: boolean;
}

interface BrowserState {
  history: BrowserHistory[];
  visitedDapps: string[];
  addToHistory: (entry: BrowserHistory) => void;
  addVisitedDapp: (url: string) => void;
  clearHistory: () => void;
}

export const useBrowserStore = create<BrowserState>((set, get) => ({
  history: [],
  visitedDapps: [],
  addToHistory: (entry) => {
    set((state) => ({
      history: [entry, ...state.history]
    }));
  },
  addVisitedDapp: (url) => {
    set((state) => ({
      visitedDapps: state.visitedDapps.includes(url) 
        ? state.visitedDapps 
        : [url, ...state.visitedDapps]
    }));
  },
  clearHistory: () => {
    set({ history: [] });
  }
}));