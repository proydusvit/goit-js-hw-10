export function cardCountriesList({ flags, name }) {
    return `
    <li>
        <img src="${flags.svg}" alt="${name.official}" width="25" />
    <h2>${name.official}</h2>
        
</li>`
}
export function countryСard({ flags, name, capital, population, languages }) {
  return `
     
        <img class="country-info__flags" src="${flags.svg}" alt="${name.official}" width="50" />
        <h2 class="country-info__name">${name.official}</h2>
      </div>
      <p><span class="country-info__weight">Capital:</span> ${capital}</p>
      <p><span class="country-info__weight">Population:</span> ${population}</p>
      <p><span class="country-info__weight">Languages:</span> ${Object.values(
        languages,
      )}</p>
  `;
}