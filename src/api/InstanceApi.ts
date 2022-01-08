import axios from 'axios';

import { API_URL } from '../constants/Environment';
import { Instructions } from '../models/Instructions';
import { Task } from '../models/Task';

import { Instance } from './../models/Instance';
import { ConfigurationData } from './../models/ConfigurationData';
import { FloatingIPData } from './../models/FloatingIPData';

export const getInstances = async () => {
	const response = await axios.get(`${API_URL}instances/`, {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

	return response.data as Instance[];
};

export const getConfigurations = async () => {
	const response = await axios.get(`${API_URL}configurations/`, {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

	return response.data as ConfigurationData[];
};

export const getInstance = async (instance: Instance) => {
	const response = await axios.get(`${API_URL}instances/${instance.id}/`, {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

	return response.data as Instance;
};

export const postInstance = async (
	name: string,
	instanceData: Map<string, string | number>
) => {
	const input_variables = Object.fromEntries(instanceData);
	const fullMap = new Map<string, any>()
		.set('name', name)
		.set('input_variables', input_variables);
	const request = Object.fromEntries(fullMap);

	const response = await axios.post(`${API_URL}instancesv2/`, request, {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

	return response.data.id;
};

export const getFloatingIps = async () => {
	const response = await axios.get(`${API_URL}floating_ips/`, {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});

	return response.data as FloatingIPData[];
};

export const addFloatingIP = async (
	instance_id: string,
	floating_ip: string
) => {
	await axios.put(
		`${API_URL}floating_ips/`,
		{ instance_id, floating_ip },
		{
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		}
	);
};

export const deleteInstance = async (instance: Instance) => {
	await axios.delete(`${API_URL}instances/${instance.id}/`, {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});
};

export const deleteInstanceV2 = async (workspace_id: string, name: string) => {
	await axios.delete(`${API_URL}instancesv2/`, {
		headers: {
			'Content-Type': 'application/json'
		},
		data: {
			workspace_id,
			name
		},
		withCredentials: true
	});
};

export const getInstructions = async (instance: Instance) => {
	try {
		const response = await axios.get(`${API_URL}instructions/${instance.id}/`, {
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		});
		return response.data as Instructions;
	} catch (err) {
		// if (err.response.status === 404) {
		return {
			floating_ip: 'Cannot load IP',
			instructions: null
		} as Instructions;
		// }
	}
};

export const getTask = async (taskId: string) => {
	const response = await axios.get(`${API_URL}tasks/${taskId}/`, {
		headers: {
			'Content-Type': 'application/json'
		},
		withCredentials: true
	});
	return response.data as Task;
};
