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
  map((event) => event.target.value),
  debounceTime(500),
  distinctUntilChanged(),
  tap(() => ($loadingIndicator.style.visibility = "visible")),
  switchMap((query) =>
    ajax(`${API_URL}?q=${query}`, { method: "GET" }).pipe(
      map(({ response }) => response)
    )
  ),
  tap(() => ($loadingIndicator.style.visibility = "hidden"))
);

inputStream.subscribe({
  next: (cats) => {
    if (!cats.length) {
      $textList.innerHTML = "";
      $textList.style.visibility = "hidden";
      $infoParagraph.innerHTML = "해당하는 검색어가 없습니다..!";
      return;
    }

    $textList.innerHTML = cats
      .slice(0, 5)
      .map((cat) => `<li>${cat.name}</li>`)
      .join("");
    $textList.style.visibility = "visible";
    $infoParagraph.innerHTML = "";
  },
  error: () => {
    $infoParagraph.innerHTML =
      "An error has occurred when fetching search queries.";
  }
});
