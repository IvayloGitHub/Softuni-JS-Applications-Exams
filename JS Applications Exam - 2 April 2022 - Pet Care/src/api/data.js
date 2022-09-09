import * as api from './api.js';

const host = 'http://localhost:3030';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getPets() {
    return await api.get(host + '/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function createPet(pet) {
    return await api.post(host + '/data/pets', pet);
}

export async function getPetById(id) {
    return await api.get(host + '/data/pets/' + id);
}

export async function updatePet(id, pet) {
    return await api.put(host + '/data/pets/' + id, pet);
}

export async function deletePet(id) {
    return await api.del(host + '/data/pets/' + id);
}

export async function donate(petId) {
    return await api.post(host + `/data/donation`, {petId});
}

export async function getDonationsForAPet(petId) {
    return await api.get(host + `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function getDonationOfAnUser(petId, userId) {
    return await api.get(host + `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
