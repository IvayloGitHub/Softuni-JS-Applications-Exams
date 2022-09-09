import { html } from '../../node_modules/lit-html/lit-html.js';

import { getMyArticles } from '../api/data.js';

const profileTemplate = (articles) => html `
        <section id="my-posts-page">
            <h1 class="title">My Posts</h1>

            <div class="my-posts">
                ${articles.length != 0 ? articles.map(articleTemplate) : html `<h1 class="title no-posts-title">You have no posts yet!</h1>`}
            </div>
            
        </section>`;

const articleTemplate = (article) => html `
                <div class="post">
                    <h2 class="post-title">${article.title}</h2>
                    <img class="post-image" src=${article.imageUrl} alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/details/${article._id}" class="details-btn btn">Details</a>
                    </div>
                </div>`;

export async function profilePage(ctx) {
    const articles = await getMyArticles();

    ctx.render(profileTemplate(articles));
}