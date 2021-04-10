import { Flavor } from "./Flavor";

export interface Instance{
    name: string;
    id: string;
    status:string;
    flavor: Flavor;
    
}