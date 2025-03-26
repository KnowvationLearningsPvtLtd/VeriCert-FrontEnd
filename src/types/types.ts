export interface IssuedReceivedData {
  id: string;
  value: number;
}

export interface CategoryDistributionData {
  category: string;
  count: number;
}

export interface IssuedOverTimeData {
  date: string;
  count: number;
}

export interface ChartsProps {
  data: {
    issuedReceived: IssuedReceivedData[];
    categoryDistribution: CategoryDistributionData[];
    issuedOverTime: IssuedOverTimeData[];
  };
}
