import { FloatingIPData } from './../models/FloatingIPData';
import { ConfigurationData } from './../models/ConfigurationData';
import { FloatingIP } from './../models/FloatingIP';
import { Instance } from './../models/Instance';
import axios from "axios";
import { API_URL } from "../constants/Environment";
import { Instructions } from '../models/Instructions';

export const getInstances = async () => {
  const response = await axios.get(API_URL + "instances/", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data as Instance[];
}

export const getConfigurations = async () => {
  const response = await axios.get(API_URL + "configurations/", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data as ConfigurationData[];
}

export const getInstance = async (instance: Instance) => {
  const response = await axios.get(API_URL + "instances/" + instance.id + '/', {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data as Instance;
}

export const postInstance = async (name: string, instanceData: Map<string, string | number>) => {
  const input_variables = Object.fromEntries(instanceData);
  const fullMap = new Map<string, any>().set("name", name).set("input_variables", input_variables);
  const request = Object.fromEntries(fullMap);

  const response = await axios.post(API_URL + 'instancesv2/', request, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data.id;
}

export const getFloatingIps = async () => {
  const response = await axios.get(API_URL + "floating_ips/", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data as FloatingIPData[];
}

export const addFloatingIP = async (instance_id: string, floating_ip: string) => {
  await axios.put(API_URL + 'floating_ips/', { instance_id: instance_id, floating_ip: floating_ip }, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export const deleteInstance = async (instance: Instance) => {
  await axios.delete(API_URL + 'instances/' + instance.id + '/', {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export const deleteInstanceV2 = async (workspace_id: string, name: string) => {
  await axios.delete(API_URL + 'instancesv2/', {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      workspace_id: workspace_id,
      name: name
    },
    withCredentials: true,
  });
}

export const getInstructions = async (instance: Instance) => {
  try {
    const response = await axios.get(API_URL + "instructions/" + instance.id + '/', {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    return response.data as Instructions;
  } catch (err) {
    // if (err.response.status === 404) {
    return { floating_ip: null, instructions: null } as Instructions;
    // }
  }

}