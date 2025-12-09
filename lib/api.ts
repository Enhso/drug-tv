import { GraphData, DrugData, TargetData, DiseaseData } from './types';

export async function fetchGraphTopology(): Promise<GraphData> {
  const response = await fetch('/api/topology');
  if (!response.ok) {
    throw new Error('Failed to fetch graph topology');
  }
  return response.json();
}

export async function fetchNodeDetails(id: string): Promise<DrugData | TargetData | DiseaseData> {
  const response = await fetch(`/api/nodes/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch details for node ${id}`);
  }
  return response.json();
}
