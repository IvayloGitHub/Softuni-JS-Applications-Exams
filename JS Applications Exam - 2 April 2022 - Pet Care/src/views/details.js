import { html } from '../../node_modules/lit-html/lit-html.js';

import { getPetById, deletePet, getDonationsForAPet, getDonationOfAnUser, donate } from '../api/data.js';

const detailsTemplate = (pet, isOwner, onDelete, onDonation, donations, hasDonation) => html `
        <section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src=${pet.image}>
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${Number(donations) * 100}$</h4>
                    </div>
                    ${sessionStorage.getItem('userId') ? html `
                    <div class="actionBtn">
                        ${isOwner ? html `
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>` 
                        : html ` ${hasDonation ? '' : html `<a @click=${onDonation} href="javascript:void(0)" class="donate">Donate</a>`}`} 
                    </div>` : ''}
                </div>
            </div>
        </section>`;

export async function detailsPage(ctx) {
    const userId = sessionStorage.getItem('userId');
    const petId = ctx.params.id;
    const pet = await getPetById(petId);

    const donations = await getDonationsForAPet(petId);

    const hasDonation = userId ? await getDonationOfAnUser(petId, userId) : 0;

    const isOwner = userId == pet._ownerId;
    ctx.render(detailsTemplate(pet, isOwner, onDelete, onDonation, donations, hasDonation));

    async function onDelete() {
        const confirmed = confirm('Are you sure?');
        if(confirmed) {
            await deletePet(petId);
            ctx.page.redirect('/');
        }
    }

    async function onDonation() {
        await donate(petId);
        ctx.page.redirect(`/details/${petId}`);
    }
}