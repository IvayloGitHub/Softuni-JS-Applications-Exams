import * as api from './api.js';

const host = 'http://localhost:3030';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getArticles() {
    return await api.get(host + '/data/posts?sortBy=_createdOn%20desc');
}

export async function createArticle(article) {
    return await api.post(host + '/data/posts', article);
}

export async function getArticleById(id) {
    return await api.get(host + '/data/posts/' + id);
}

export async function updateArticle(id, article) {
    return await api.put(host + '/data/posts/' + id, article);
}

export async function deleteArticle(id) {
    return await api.del(host + '/data/posts/' + id);
}

export async function getMyArticles() {
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function donate(postId) {
    return await api.post(host + `/data/donations`, {postId});
}

export async function getDonationsForAnArticle(postId) {
    return await api.get(host + `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`);
}

export async function getDonationOfAnUser(postId, userId) {
    return await api.get(host + `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
