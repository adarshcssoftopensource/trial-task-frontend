import axios from "axios"

const BASE_URL = import.meta.env.VITE_KEY_BASE_URL;



const getAllUsers = async () => {
    try {
        const { data } = await axios.get(`${BASE_URL}/user`);
        return data
    } catch (error) {
        throw error;
    }
};

const createUser = async (payload) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/user`, payload);
        return data;
    } catch (error) {
        throw error
    }
}

const getOneUser = async (id) => {
    try {
        const { data } = await axios.get(`${BASE_URL}/user/${id}`);
        return data
    } catch (error) {
        throw error
    }
}

const updateUser = async (payload) => {
    try {
        const { data } = await axios.put(`${BASE_URL}/user`, payload);
        return data;
    } catch (error) {
        throw error
    }
}
const deleteUser = async (id) => {
    try {
        const { data } = await axios.delete(`${BASE_URL}/user/${id}`);
        return data;
    } catch (error) {
        throw error
    }
};

export {
    createUser, getAllUsers, getOneUser, deleteUser, updateUser
}