export interface UserProfile {
  id: string;
  displayName: string | null;
  createdAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  defaultShelfId: string | null;
}
