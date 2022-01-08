export type Task = {
	state: string;
	reason?: {
		code?: number;
		message?: string;
	};
};
