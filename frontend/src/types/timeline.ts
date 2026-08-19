import type { ChecklistItem } from "./checklist";

export interface TimelineSetRequest {
  session_id: string;
  wedding_date: string;
}

export interface TimelineResponse {
  session_id: string;
  wedding_date: string | null;
  items: ChecklistItem[];
}
