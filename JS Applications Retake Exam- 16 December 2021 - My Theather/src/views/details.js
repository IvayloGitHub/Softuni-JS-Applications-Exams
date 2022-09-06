import { html } from '../../node_modules/lit-html/lit-html.js';

import { getTheaterById, deleteTheater, getLikesForAEvent, getLikesOfAUser, likeEvent } from '../api/data.js';

const detailsTemplate = (theater, isOwner, onDelete, onLike, likes, hasLike) => html `
        <section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${theater.title}</h1>
                    <div>
                        <img src=${theater.imageUrl} />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${theater.description}</p>
                    <h4>Date: ${theater.date}</h4>
                    <h4>Author: ${theater.author}</h4>
                    
                    ${sessionStorage.getItem('userId') ? 
                    html `
                    <div class="buttons">
                    ${isOwner ? html `
                        <a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
                        <a class="btn-edit" href="/edit/${theater._id}">Edit</a>`
                        : html `${hasLike ? 
                        '' : html `<a class="btn-like" @click=${onLike} href="javascript:void(0)">Like</a>`}`}  
                    </div>` : ''}
                    <p class="likes">Likes: ${likes}</p>
                        
                </div>
            </div>
        </section>`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const theaterId = ctx.params.id;
    const theater = await getTheaterById(theaterId);

    const likes = await getLikesForAEvent(theaterId);

    const hasLike = userId ? await getLikesOfAUser(theaterId, userId) : 0;

    const isOwner = userId == theater._ownerId;
    ctx.render(detailsTemplate(theater, isOwner, onDelete, onLike, likes, hasLike));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if(confirmed) {
            await deleteTheater(theaterId);
            ctx.page.redirect('/profile');
        }
    }

    async function onLike() {
        await likeEvent(theaterId);
        ctx.page.redirect(`/details/${theaterId}`);
    }
}