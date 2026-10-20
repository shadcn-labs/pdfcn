export interface ProjectProposalStat {
  label: string;
  value: string;
  note?: string;
}

export interface ProjectProposalMilestone {
  date: string;
  title: string;
  body: string;
}

export interface ProjectProposalBudgetSlice {
  label: string;
  value: number;
}

export interface ProjectProposalNextStep {
  text: string;
  done?: boolean;
}

export interface ProjectProposalProps {
  company: string;
  client: string;
  projectTitle: string;
  date: string;
  stats?: ProjectProposalStat[];
  deliverables?: string[];
  milestones?: ProjectProposalMilestone[];
  budget?: ProjectProposalBudgetSlice[];
  nextSteps?: ProjectProposalNextStep[];
  accentColor?: string;
  renderingBase?: "takumi";
}
