export interface Coordinate {
  lat: number;
  lon: number;
}
export interface Depot {
  id: string;
  lat: number;
  lon: number;
  name: string;
}
export interface Customer {
  id: string;
  lat: number;
  lon: number;
  name?: string;
  orderId?: string;
}
export interface RouteStop {
  stopNumber: number;
  nodeId: string;
  nodeName: string;
  legDistance: number;
  cumulativeDistance: number;
  eta: string;
  lat: number;
  lon: number;
}
export interface Route {
  id: string;
  representativeId: string;
  representativeName: string;
  stops: RouteStop[];
  totalDistance: number;
  totalTime: number;
  color: string;
}
export interface KPIMetrics {
  totalDistance: number;
  totalTime: number;
  computeTime: number;
  numberOfStops: number;
  delayScore?: number;
  ratingPenalty?: number;
  coverageRatio?: number;
  workloadBalanceIndex?: number;
  jainsFairnessIndex?: number;
}
export interface Representative {
  id: string;
  name: string;
  workload: number;
  opportunityScore: number;
  priorityScore: number;
  color: string;
  assignedCustomers: string[];
}
export interface Dataset {
  depots: Depot[];
  customers: Customer[];
  totalOrders: number;
}
export interface ValidationResult {
  invalid: number;
  duplicates: number;
  nearDuplicates: number;
  isValid: boolean;
}
export interface AlgorithmRun {
  type: 'baseline' | 'enhanced';
  routes: Route[];
  kpis: KPIMetrics;
  representatives: Representative[];
  timestamp: string;
}