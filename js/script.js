let placeCard = document.querySelector('.place-card');
let row=placeCard.parentNode;
placeCard.remove();
const countCards = 9;
const rooturl = 'https://ubereats-demo-api.herokuapp.com/v1/places';
let offset = 1;
let limit = offset + countCards;

let btn = document.querySelector('.download');
btn.addEventListener('click', fetchCards);
fetchCards();

function fetchCards() {
    url = rooturl + `?offset=${offset}&limit=${limit}`;
    fetch(url).
        then(res => res.json()).
        then(data => fillCards(data)).
        catch(err => console.log(err));
}

function fillCards(json) {
    json.items.forEach((card, num) => {
        currentCard = placeCard.cloneNode(true);
        row.append(currentCard);
        placeCard = currentCard;
        let curCl = placeCard.querySelector('.place-card__title');
        curCl.innerText = card.title;
        curCl = placeCard.querySelector('.place-card__price');
        curCl.innerText = card.price;
        curCl = placeCard.querySelector('.place-card__stars');
        curCl.innerText = card.rating;
        curCl = placeCard.querySelector('.place-card__votes');
        curCl.innerText = card.reviews;
        curCl = placeCard.querySelector('.place-card__kitchen');
        curCl.innerText = card.type;
        curCl = placeCard.querySelector('.place-card__image img');
        curCl.src = card.img;
        curCl.alt = card.title;
    });
    if (json.total <= limit) {
        btn.classList.add('disabled');
    }
    else {
        btn.classList.remove('disabled');
         offset+= countCards;
         limit+= offset;
    }

}
