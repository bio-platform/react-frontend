export interface SecurityGroup{
    name:string;
    id:string;
    security_group_rules:SecurityGroupRules[];
}

export interface SecurityGroupRules{
    direction:string;
    protocol:string;
    port_range_max:number;
}