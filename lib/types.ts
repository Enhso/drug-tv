export type NodeType = 'drug' | 'target' | 'disease';

export interface DrugData {
  drugbankId: string;
  description: string;
  mechanismOfAction: string;
  maxPhase: number;
  polypharmacologyScore: number;
}

export interface TargetData {
  geneName: string;
  organism: string;
  targetClass: string;
}

export interface DiseaseData {
  [key: string]: unknown;
}

export interface BaseNode {
  id: string;
  label: string;
}

export interface DrugNode extends BaseNode {
  type: 'drug';
  data: DrugData;
}

export interface TargetNode extends BaseNode {
  type: 'target';
  data: TargetData;
}

export interface DiseaseNode extends BaseNode {
  type: 'disease';
  data: DiseaseData;
}

export type GraphNode = DrugNode | TargetNode | DiseaseNode;

export type EdgeType = 'drug_target_interaction' | 'drug_disease_indication';

export interface InteractionData {
  affinityType: string;
  affinityNm: number;
  pIC50: number;
}

export interface IndicationData {
  [key: string]: unknown;
}

export interface BaseEdge {
  source: string;
  target: string;
}

export interface InteractionEdge extends BaseEdge {
  type: 'drug_target_interaction';
  data: InteractionData;
}

export interface IndicationEdge extends BaseEdge {
  type: 'drug_disease_indication';
  data: IndicationData;
}

export type GraphEdge = InteractionEdge | IndicationEdge;

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
