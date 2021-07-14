import { FloatingIPData } from './../models/FloatingIPData';
import { ConfigurationData } from './../models/ConfigurationData';
import { FloatingIP } from './../models/FloatingIP';
import { InstanceData } from './../models/InstanceData';
import { Instance } from './../models/Instance';
import axios from "axios";
import { API_URL } from "../constants/Environment";

export const createInstanceDummy = async () => {
  const promise = new Promise(resolve => {
    setTimeout(() => { resolve(true) }, 2000);
  });
  await promise;
  return "done";
}

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

export const addFloatingIP = async (floating_ip : FloatingIP) => {
  const response = await axios.post(API_URL + 'floating_ips/', floating_ip, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export const postKeyPair = async (name: string) => {
  const response = await axios.post(API_URL + 'keypairs/', { keyname: name }, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}

export const deleteInstance = async (instance: Instance) => {
  const response = await axios.delete(API_URL + 'instances/' + instance.id + '/', {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
}