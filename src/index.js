import './styles.css';

import cardTpl from './templates/card.hbs';
import apiService from './js/apiService';

const refs = {
    searchForm: document.querySelector('#search-form'),
    galleryContainer: document.querySelector('.gallery'),
    loadMore: document.querySelector('#load-more')
}

refs.searchForm.addEventListener ("submit", e =>{
    e.preventDefault();
    apiService.query = e.currentTarget.elements.query.value;
    refs.galleryContainer.innerHTML = "";
    refs.loadMore.classList.add('is-hidden');
    apiService.resetPage();
    apiService.fetchImages().then(card =>{
        updateImagesMarkup(card);
        
    });
});

function updateImagesMarkup(card) {
    const markup = cardTpl(card);
    refs.galleryContainer.insertAdjacentHTML('beforeend', markup);
    if(markup){
        refs.loadMore.classList.remove('is-hidden')
    }
}

refs.loadMore.addEventListener('click', () =>{
    apiService.fetchImages().then(card =>{
        updateImagesMarkup(card);
        refs.loadMore.classList.remove('is-hidden')
        window.scrollBy({
            top: 1400,
            left: 0,
            behavior: 'smooth',
          });
          
    });

 })