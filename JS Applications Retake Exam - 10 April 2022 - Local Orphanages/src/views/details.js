import { html } from '../../node_modules/lit-html/lit-html.js';

import { getArticleById, deleteArticle, getDonationsForAnArticle, getDonationOfAnUser, donate } from '../api/data.js';

const detailsTemplate = (article, isOwner, onDelete, onDonation, donations, hasDonation) => html `
        <section id="details-page">
            <h1 class="title">Post Details</h1>

            <div id="container">
                <div id="details">
                    <div class="image-wrapper">
                        <img src=${article.imageUrl} alt="Material Image" class="post-image">
                    </div>
                    <div class="info">
                        <h2 class="title post-title">${article.title}</h2>
                        <p class="post-description">Description: ${article.description}</p>
                        <p class="post-address">Address: ${article.address}</p>
                        <p class="post-number">Phone number: ${article.phone}</p>
                        <p class="donate-Item">Donate Materials: ${donations}</p>

                        <!--Edit and Delete are only for creator-->
                        ${sessionStorage.getItem('userId') ? html `
                        <div class="btns">
                        ${isOwner ? html `
                            <a href="/edit/${article._id}" class="edit-btn btn">Edit</a>
                            <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
                            : html `${hasDonation ? '' : html `<a href="javascript:void(0)" @click=${onDonation} class="donate-btn btn">Donate</a>`}`}    
                        </div>` : ''}

                    </div>
                </div>
            </div>
        </section>`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const articleId = ctx.params.id;
    const article = await getArticleById(articleId);

    const donations = await getDonationsForAnArticle(articleId);

    const hasDonation = userId ? await getDonationOfAnUser(articleId, userId) : 0;

    const isOwner = userId == article._ownerId;
    ctx.render(detailsTemplate(article, isOwner, onDelete, onDonation, donations, hasDonation));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if(confirmed) {
            await deleteArticle(articleId);
            ctx.page.redirect('/');
        }
    }

    async function onDonation() {
        await donate(articleId);
        ctx.page.redirect(`/details/${articleId}`);
    }
}