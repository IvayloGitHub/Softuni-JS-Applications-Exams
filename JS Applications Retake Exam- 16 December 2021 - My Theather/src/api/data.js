import * as api from './api.js';

const host = 'http://localhost:3030';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getTheaters() {
    return await api.get(host + '/data/theaters?sortBy=_createdOn%20desc&distinct=title');
}

export async function createTheater(theater) {
    return await api.post(host + '/data/theaters', theater);
}

export async function getTheaterById(id) {
    return await api.get(host + '/data/theaters/' + id);
}

export async function updateTheater(id, theater) {
    return await api.put(host + '/data/theaters/' + id, theater);
}

export async function deleteTheater(id) {
    return await api.del(host + '/data/theaters/' + id);
}

export async function getMyTheaters() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function likeEvent(theaterId) {
    return await api.post(host + `/data/likes`, {theaterId});
}

export async function getLikesForAEvent(theaterId) {
    return await api.get(host + `/data/likes?where=theaterId%3D%22${theaterId}%22&distinct=_ownerId&count`);
}

export async function getLikesOfAUser(theaterId, userId) {
    return await api.get(host + `/data/likes?where=theaterId%3D%22${theaterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
