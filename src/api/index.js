import axios from 'axios';

const url = 'http://localhost:5000';

export const fetchData = () => axios.get(`${url}/sectors`);
export const saveData = (newData) => axios.post(`${url}/data`, newData);
export const getUserData = (id) => axios.get(`${url}/data/${id}`);
export const updateUserData = (id, updatedData) => axios.patch(`${url}/update-data/${id}`, updatedData);