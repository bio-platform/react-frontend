export type ConfigurationData = {
	name: string; // name of the machine
	tags: string[]; // tags of usecases
	api: string[]; // posible values ssh, floatingip, ...
	textValues: undefined | string[]; // names of variables for string values
	numberValues: undefined | string[]; // names of variables for numbered values
	options: {
		name: string; // for example "flavor". name required for the api call
		default: string; // string with default value
		options: string[]; // string with all posible values
	}[];

	// name: string, // name of the machine
	// tags: [string], // usecase tags
	// variables: { // variables that are needed for the instace creation
	//     api: [string], // ["ssh", "local_network_id", "floating_ip"]
	//     string: [string], //  ["instance_name"]
	//     options: [string], // ["flavor"] posible values
	//     session: [string], // user info aka user, email
	//     int: undefined | [string] // only for terraform cluster number of nodes
	// },
	// flavor: {
	//     default: string, // name of the flavor
	//     options: [string]  // posible options for the flavor
	// }
};
