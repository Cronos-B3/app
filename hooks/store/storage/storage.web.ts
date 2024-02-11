import { createJSONStorage } from "zustand/middleware";

export const storage = createJSONStorage(() => localStorage);
