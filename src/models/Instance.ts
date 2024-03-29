import { Flavor } from './Flavor';

export type Instance = {
	name: string;
	id: string;
	status: string;
	flavor: Flavor;
	key_name: string;
	access_ipv4: string;
	metadata: {
		workspace_id?: string;
		name?: string;
	};
};
