import axios from "axios";
import { API_URL } from "../constants/Environment";
import { Project } from "../models/Project";

export const getLimits = async () => {
    const response = await axios.get(API_URL + "limits/", {
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
    });

    console.log(response);
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

