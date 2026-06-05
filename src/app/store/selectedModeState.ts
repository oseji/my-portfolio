import { create } from "zustand";

type Mode = "frontend" | "qa";

interface ModeStore {
	mode: Mode;
	setMode: (mode: Mode) => void;
	toggle: () => void;
	setFrontend: () => void;
	setQA: () => void;
}

export const useModeStore = create<ModeStore>((set) => ({
	mode: "frontend" as const,

	setMode: (mode) => set({ mode }),

	toggle: () =>
		set((state) => ({
			mode: state.mode === "frontend" ? "qa" : "frontend",
		})),

	setFrontend: () => {
		set({ mode: "frontend" });
	},
	setQA: () => {
		set({ mode: "qa" });
	},
}));
