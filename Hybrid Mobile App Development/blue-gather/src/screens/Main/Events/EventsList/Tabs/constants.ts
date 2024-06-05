import { STATUS_OPTIONS } from "@utils/statusOptions";

export type StatusFilterType = { 
  label: string 
  key: keyof typeof STATUS_OPTIONS;
};

export const tabs: StatusFilterType[] = [
  { 
    label: "em andamento",
    key: "inProgress" 
  },
  { 
    label: "finalizados", 
    key: "concluded"
  },
  { 
    label: "cancelados",
    key: "cancelled" 
  }
];

