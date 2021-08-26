import { Network } from './../models/Network';
import { KeyPair } from './../models/KeyPair';
import axios from "axios";
import { API_URL } from "../constants/Environment";
import { Limit } from "../models/Limit";
import { Project } from "../models/Project";
import { PostKey } from '../models/PostKey';

export const getLimits = async () => {
    const response = await axios.get(API_URL + "limits/", {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    return response.data as Limit;
}

export const getProjects = async () => {
    const response = await axios.get(API_URL + "projects/", {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    return response.data.projects as Project[];
}

export const putProject = async (project: Project) => {
    await axios.put(API_URL, { project_id: project.id }, {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });
}

export const postKey = async (postKey: PostKey) => {
    await axios.post(API_URL + 'keypairs/', postKey, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

export const getKeys = async () => {
    const response = await axios.get(API_URL + "keypairs/", {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    return response.data as KeyPair[];
}

export const getNetworks = async () => {
    const response = await axios.get(API_URL + "networks/", {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    return response.data as Network[];
}


