import { fromEvent } from "rxjs";
import {
  map,
  debounceTime,
  distinctUntilChanged,
  tap,
  switchMap
} from "rxjs/operators";
import { ajax } from "rxjs/ajax";

const API_URL = "https://api.thecatapi.com/v1/breeds/search";
const $searchInput = document.querySelector(".SearchInput");
const $loadingIndicator = document.querySelector(".LoadingIndicator");
const $textList = document.querySelector(".TextList");
const $infoParagraph = document.querySelector(".InfoParagraph");

const inputStream = fromEvent($searchInput, "input").pipe(
  map((event) => event.target.value)
  // Write other rx operators needed here.
);



inputStream.subscribe({
  next: (cats) => {
    // Write main logic here!

  },

  error: () => {
    // Write error handling codes here.
    
  }
});