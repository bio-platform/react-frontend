export interface Task {
    state: string;
    reason?: {
        code?: number;
        message?: string;
    };
}