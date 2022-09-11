import { html } from '../../node_modules/lit-html/lit-html.js';

import { getGameById, deleteGame, getAllCommentsForAGame, createComment } from '../api/data.js';

const detailsTemplate = (game, isOwner, onDelete, onComment, comments) => html `
        <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">${game.summary}</p>

                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                    <h2>Comments:</h2>
                    <ul>
                        <!-- list all comments for current game (If any) -->
                        ${comments.length != 0 ? comments.map(commentTemplate) : html `<p class="no-comment">No comments.</p>`}
                    </ul>  
                </div>

                ${isOwner ? html `
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>` : ''}
            </div>

            ${sessionStorage.getItem('userId') && !isOwner ? html `
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onComment} class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>` : ''}
      

        </section>`;

const commentTemplate = (comment) => html `
            <li class="comment">
                <p>Content: ${comment.comment}</p>
            </li>`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const gameId = ctx.params.id;
    const game = await getGameById(gameId);

    const comments = await getAllCommentsForAGame(gameId);

    const isOwner = userId == game._ownerId;
    
    ctx.render(detailsTemplate(game, isOwner, onDelete, onComment, comments));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if(confirmed) {
            await deleteGame(gameId);
            ctx.page.redirect('/');
        }
    }

    async function onComment(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const comment = formData.get('comment').trim();

        if (!comment) {
            return alert('Comment field cannot be empty!');
        }

        await createComment(gameId, comment);

        event.target.reset();
        ctx.page.redirect( `/details/${gameId}`);
    }
}