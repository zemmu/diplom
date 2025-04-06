export const yApis = {
  map: "b4d635e2-8271-4f94-bc37-a6fcb20b52ba",
  orgSearch: "c240bcfa-5572-4eab-a349-2dd926096f46",
  geoSuggest: "87de1668-5658-4cb0-a068-ba84af26bbe9"
}

export const mapProps = {
  modules: [
    "multiRouter.MultiRoute", "geocode", "geoQuery", 
    "SuggestView", "suggest", "Placemark", "geocode", 
    "geoObject.addon.balloon"
  ],
  options: {
    yandexMapDisablePoiInteractivity: true
  }
}

export const HOST = "http://127.0.0.1:8000";


export const stringWithCapitalLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1);
