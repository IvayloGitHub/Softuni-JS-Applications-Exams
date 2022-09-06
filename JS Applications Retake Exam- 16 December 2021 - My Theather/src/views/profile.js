import { html } from '../../node_modules/lit-html/lit-html.js';

import { getMyTheaters } from '../api/data.js';

const profileTemplate = (theaters) => html `
        <section id="profilePage">
            <div class="userInfo">
                <div class="avatar">
                    <img src="./images/profilePic.png">
                </div>
                <h2>${sessionStorage.getItem('email')}</h2>
            </div>
            <div class="board">

                ${theaters.length != 0 ? theaters.map(theaterTemplate) 
                    : html ` <div class="no-events">
                                <p>This user has no events yet!</p>
                             </div>`}
              
            </div>
        </section>`;

const theaterTemplate = (theater) => html `
                <div class="eventBoard">
                    <div class="event-info">
                        <img src=${theater.imageUrl}>
                        <h2>${theater.title}</h2>
                        <h6>${theater.date}</h6>
                        <a href="/details/${theater._id}" class="details-button">Details</a>
                    </div>
                </div>`;

export async function profilePage(ctx) {
    const theaters = await getMyTheaters();

    ctx.render(profileTemplate(theaters));
}