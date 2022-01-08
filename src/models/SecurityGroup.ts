export type SecurityGroup = {
	name: string;
	id: string;
	security_group_rules: SecurityGroupRules[];
};

export type SecurityGroupRules = {
	direction: string;
	protocol: string;
	port_range_max: number;
};
