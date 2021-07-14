export interface InstanceData {
    ssh: undefined | string,
    floating_ip : undefined | string,
    local_network_id : undefined | string,
    user_name : undefined | string,
    user_email: undefined | string,
    variables: Map<string, (string | number)>,
}