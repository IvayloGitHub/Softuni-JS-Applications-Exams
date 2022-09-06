import { html } from '../../node_modules/lit-html/lit-html.js';

import { search, getAlbumById } from '../api/data.js';

const searchTemplate = (albums, onSearch, name) => html `
        <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name" .value=${name || ''}>
                <button @click=${onSearch} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>

            <!--Show after click Search button-->
            <div class="search-result">
                <!--If have matches-->
                ${albums.length ? albums.map(albumTemplate) : html `<p class="no-result">No result.</p>`}

            </div>
        </section>`;

const albumTemplate = (album) => html `
                <div class="card-box">
                    <img src=${album.imgUrl}>
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${album.name}</p>
                            <p class="artist">Artist: ${album.artist}</p>
                            <p class="genre">Genre: ${album.genre}</p>
                            <p class="price">Price: $${album.price}</p>
                            <p class="date">Release Date: ${album.releaseDate}</p>
                        </div>
                       ${sessionStorage.getItem('authToken') ? html `<div class="btn-group">
                            <a href="/details/${album._id}" id="details">Details</a>
                        </div>` : ''}
                      
                    </div>
                </div>`;

export async function searchPage(ctx) {

    const name = ctx.querystring.split('=')[1];
    const albums = name ? await search(name) : [];
    ctx.render(searchTemplate(albums, onSearch, name));

    function onSearch() {
        const query = document.querySelector('#search-input').value;
        if (query == '') {
            return alert('Serach field must be filled!');
        }
        ctx.page.redirect('/search?query=' + query); 
    }
}
