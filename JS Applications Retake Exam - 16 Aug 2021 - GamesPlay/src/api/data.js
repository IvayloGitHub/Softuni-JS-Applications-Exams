import * as api from './api.js';

const host = 'http://localhost:3030';

api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getRecentGames() {
    return await api.get(host + '/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function getGames() {
    return await api.get(host + '/data/games?sortBy=_createdOn%20desc');
}

export async function createGame(game) {
    return await api.post(host + '/data/games', game);
}

export async function getGameById(id) {
    return await api.get(host + '/data/games/' + id);
}

export async function updateGame(id, game) {
    return await api.put(host + '/data/games/' + id, game);
}

export async function deleteGame(id) {
    return await api.del(host + '/data/games/' + id);
}

export async function getAllCommentsForAGame(gameId) {
    return await api.get(host + `/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function createComment(gameId, comment) {
    return await api.post(host + `/data/comments`, {gameId, comment});
}

