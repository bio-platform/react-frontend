export type Limit = {
	floating_ips: {
		limit: number;
		used: number;
	};
	instances: {
		limit: number;
		used: number;
	};
	cores: {
		limit: number;
		used: number;
	};
	ram: {
		limit: number;
		used: number;
	};
};
