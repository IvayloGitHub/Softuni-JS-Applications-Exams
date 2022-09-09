import { html } from '../../node_modules/lit-html/lit-html.js';

import { getArticles } from '../api/data.js';

const homeTemplate = (articles) => html `
        <section id="dashboard-page">
            <h1 class="title">All Posts</h1>

            <div class="all-posts">
                ${articles.length != 0 ? articles.map(articleTemplate) 
                    : html `<h1 class="title no-posts-title">No posts yet!</h1>`}
            </div>
            
        </section>`

const articleTemplate = (article) => html `
            <div class="post">
                    <h2 class="post-title">${article.title}</h2>
                    <img class="post-image" src=${article.imageUrl} alt="Material Image">
                    <div class="btn-wrapper">
                        <a href="/details/${article._id}" class="details-btn btn">Details</a>
                    </div>
            </div>`;      

export async function homePage(ctx) {

    const articles = await getArticles();

    ctx.render(homeTemplate(articles));
}