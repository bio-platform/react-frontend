export interface InstanceData {
    flavor: string;
    image: string;
    key_name: string;
    servername: string;
    network_id: string ;
    metadata:{
        Bioclass_user:string;
        Bioclass_email:string; 
    }
}
