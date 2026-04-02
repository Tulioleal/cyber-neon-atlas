# Idea

La idea es crear una herramienta de inteligencia geográfica que permita a un usuario no solo ver datos aislados, sino comparar regiones y entender la demografía global de forma visual.

Para los datos, utilizaremos [the REST Countries API](https://restcountries.com/) V4

## Funcionalidades Principales (Features)

### Explorador de Mapas Interactivo:

Un mapa mundial (usando librerías como Leaflet o Simple Maps) donde, al hacer clic en un país, el dashboard se actualiza con su información específica.

### Comparador de Países (Versus Mode):

Poder seleccionar dos o tres países y generar un gráfico de barras comparativo automático sobre su población, área (km²) y cantidad de fronteras terrestres.

### Filtros Avanzados por Lenguaje y Moneda:

Capacidad de filtrar países que comparten el mismo idioma o moneda (ej. "Ver todos los países donde se habla español"). Esto es ideal para practicar el manejo de arreglos (arrays) complejos en JavaScript.

### Buscador Inteligente con Autocompletado:

Una barra de búsqueda que sugiera nombres de países mientras escribes y que, al seleccionar uno, haga un "vuelo" (zoom) en el mapa hacia ese país

------------------------------------------------------------------------------

Estos son los datos que se van a poder utilizar, solo estos, por cada pais:

| Field             | Type           | Description                                 |
| ----------------- | -------------- | ------------------------------------------- |
| `name`            | Object         | Country name (common, official, nativeName) |
| `tld`             | List\<String\> | Top-level internet domains                  |
| `cca2`            | String         | ISO 3166-1 alpha-2 two-letter code          |
| `ccn3`            | String         | ISO 3166-1 numeric code (UN M49)            |
| `cca3`            | String         | ISO 3166-1 alpha-3 three-letter code        |
| `cioc`            | String         | International Olympic Committee code        |
| `fifa`            | String         | FIFA code                                   |
| `independent`     | Boolean        | ISO 3166-1 sovereignty status               |
| `status`          | String         | ISO 3166-1 assignment status                |
| `unMember`        | Boolean        | UN member state                             |
| `sovereignState`  | String         | ★ cca3 of the governing sovereign state, or |
| `currencies`      | List\<Object\> | Official currencies                         |
| `idd`             | Object         | International direct dialling info          |
| `callingCodes`    | List\<String\> | ★ Full international calling codes          |
| `capital`         | List\<String\> | Capital city names                          |
| `capitalInfo`     | Object         | Capital latitude/longitude                  |
| `altSpellings`    | List\<String\> | Alternate country name spellings            |
| `region`          | String         | UN geographic region                        |
| `subregion`       | String         | UN geographic subregion                     |
| `continents`      | List\<String\> | Continents the country lies on              |
| `languages`       | List\<Object\> | Official languages with ISO codes           |
| `translations`    | List\<Object\> | Country name in many languages              |
| `geolocation`     | Object         | ★ Latitude and longitude (named fields)     |
| `landlocked`      | Boolean        | Whether the country is landlocked           |
| `borders`         | List\<String\> | Bordering country cca3 codes                |
| `area`            | Double         | Land area in km²                            |
| `flag`            | Object         | SVG and PNG flag images, alt text, and emoji|
| `demonyms`        | List\<Object\> | Genderized demonyms by language             |
| `coatOfArms`      | Object         | SVG and PNG coat of arms URLs               |
| `population`      | Integer        | Estimated population                        |
| `maps`            | Object         | Google Maps and OpenStreetMap links         |
| `gini`            | List\<Object\> | Gini inequality index by year               |
| `car`             | Object         | Driving side and oval signs                 |
| `postalCode`      | Object         | Postal code format and regex                |
| `startOfWeek`     | String         | First day of the week                       |
| `timezones`       | List\<String\> | UTC timezone offsets                        |
| `regionalBlocs`   | List\<Object\> | ★ Regional/trade bloc memberships           |
| `religion`        | List\<Object\> | ★ Religious group breakdown                 |
| `ethnicity`       | List\<Object\> | ★ Ethnic group breakdown                    |
| `government`      | Object         | ★ Government type and current leaders       |
| `density`         | Double         | ★ Population density (people/km²)           |
| `gdp`             | Object         | ★ GDP total and per-capita (USD)            |
| `nationalHoliday` | String         | ★ National/independence day (date string)   |
| `anthem`          | String         | ★ Name of the national anthem               |
| `hdi`             | Double         | ★ Human Development Index score             |
