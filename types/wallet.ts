// Replace all instances of XYZ with $PVS in the types
export interface Token {
  id: string;
  symbol: string; // Will be "$PVS" instead of "XYZ"
  name: string; // Will be "$PVS Token" instead of "XYZ Token"
  balance: string;
  value: number;
  change24h: number;
  icon: string;
}
// Rest of the types remain the same