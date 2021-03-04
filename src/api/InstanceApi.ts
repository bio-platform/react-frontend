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

export const getInstance = async (instance: Instance) => {
  const response = await axios.get(API_URL + "instances/" + instance.id + '/', {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return response.data as Instance;
}

export const postInstance = async (instanceData: InstanceData) => {
  const response = await axios.post(API_URL + 'instances/', instanceData, {
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