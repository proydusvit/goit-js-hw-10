import './css/styles.css';
import { cardCountriesList, countryСard } from './card'
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';


const DEBOUNCE_DELAY = 300;

const refs = {
    searchBox: document.querySelector('#search-box'),
    countryList: document.querySelector('ul.country-list'),
    countryInfo: document.querySelector('div.country-info')
}

refs.searchBox.addEventListener('input', debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry() {
    const countryName = refs.searchBox.value;
    if (countryName === '') {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
    }
      
      fetchCountries(countryName)
            .then(countrys => {
                if (countrys.length > 10) {
                    Notify.info('Too many matches found. Please enter a more specific name.');
                    refs.countryInfo.innerHTML = '';
                    refs.countryList.innerHTML = '';
                    return;
                }

                if (countrys.length <= 10) {
                    const listMarkup = countrys.map(country => cardCountriesList(country));
                    refs.countryList.innerHTML = listMarkup.join('');
                    refs.countryInfo.innerHTML = '';
                }

                if (countrys.length === 1) {
                    const markup = countrys.map(country => countryСard(country));
                    refs.countryInfo.innerHTML = markup.join('');
                    refs.countryList.innerHTML = '';
                }
            })
            .catch(error => {
                Notify.failure('Oops, there is no country with that name');
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                return error;
            });

    }

  