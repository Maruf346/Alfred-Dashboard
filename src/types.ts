export type UserRow = {
  id: number;
  initials: string;
  color: string;
  name: string;
  email: string;
  status: string;
  plan: string;
  planStyle: string;
};

export type SubRow = {
  id: number;
  initials: string;
  color: string;
  name: string;
  email: string;
  plan: string;
  planStyle: string;
  billing: string;
  billingDate: string;
  status: string;
};

export type RetentionRow = { id: string; month: string; premium: number; basic: number };

export type GrowthRow = { id: string; month: string; value: number };

export type NotifKind = "subscription" | "user" | "payment" | "system";

export interface Notif {
  id: string;
  kind: NotifKind;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export type GrowthPeriod = "Last 6 Months" | "Last 1 Year";
