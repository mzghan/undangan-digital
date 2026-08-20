import type { ChecklistItemPremium } from "./checklistPremium";

export interface TimelinePremiumSetRequest {
  session_id: string;
  wedding_date: string;
}

export interface TimelinePremiumResponse {
  session_id: string;
  wedding_date: string | null;
  items: ChecklistItemPremium[];
}
