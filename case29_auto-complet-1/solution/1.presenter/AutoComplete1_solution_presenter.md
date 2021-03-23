## Case29 : AutoComplete 1 - 출제자 해설

### q1. Vanilla JavaScript

#### A)
```js
const debounce = (targetFunction, debounceTime = 500) => {
    let timerId = null;

    return (...args) => {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            targetFunction(...args);
        }, debounceTime);
    };
};
```

```js
$searchInput.addEventListener(
    "keyup",
    debounce(async (event) => {
        const query = event.target.value;

        if (!query) {
            return;
        }

        document.dispatchEvent(
            new CustomEvent(LOADING_EVENT_NAME, {
                detail: {
                    isLoading: true
                }
            })
        );
        // 고양이 검색 API를 검색어 API로 간주합니다
        const response = await fetch(`${API_URL}?q=${query}`);
        const cats = await response.json();
        document.dispatchEvent(
            new CustomEvent(LOADING_EVENT_NAME, {
                detail: {
                    isLoading: false
                }
            })
        );

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
    })
);

document.addEventListener(LOADING_EVENT_NAME, ({
    detail: {
        isLoading
    }
}) => {
    $loadingIndicator.style.visibility = isLoading ? "visible" : "hidden";
});
```

##### 해설

1. 검색어 API가 따로 없기 때문에 The Cat API를 검색어 API로 가정합니다.

2. 기본적으로 input tag에 이벤트리스너를 등록해서(keypress, keyup 같은 이벤트를 수신) 해결합니다.

3. 이때 사용자가 검색어를 입력하다가 전부 지우는 경우 즉, 이벤트리스너에 전달되는 값이 비어있는 경우가 생깁니다. 이럴땐 API 요청을 하는 것이 네트워크 자원 낭비이므로 이 경우를 제외합니다.

4. 로딩 인디케이터를 만드는 것은 다양한 방법이 있습니다.
- 코드에 되어있는 것처럼 Pub-Sub 구조를 활용해 로딩 중임을 알리는 이벤트를 활용하는 방법
- 단순하게, 로딩 인디케이터는 초기에 보이지 않다가 API 요청 이전에 스타일을 이용해 보여주고, API 요청 이후에(Promise, async await) 스타일을 이용해 숨기는 방법

5. API Request는 브라우저에서 API Request를 위해 기본적으로 제공하는 fetch 함수를 사용하는 방법이 있고 axios 같은 third party를 사용할 수 있습니다.
- 이때 fetch, axios, superagent 등의 함수는 Promise 기반으로 동작합니다.
- 따라서 then, catch, finally 함수를 체이닝해서 구현하는 방법과
- 이 API 요청 함수를 감싸는 함수를 async 함수로 만드는 방법이 있고 현재 코드는 이 방법으로 작성 돼있습니다.

6. 이때 사용자가 타이핑을 한 문자씩 할때마다 우리가 등록한 이벤트 핸들러가 실행됩니다. 즉, 현재 상태에서는 사용자의 타이핑 숫자만큼 API Request가 실행됩니다. 우리가 검색 자동완성에서 기대하는 것은 사용자가 유의미한 글자를 모두 입력한 뒤에 API Request를 실행하는 것입니다. 따라서 이벤트 핸들러에 debounce를 걸어서 가장 마지막 타이핑이 일어나고 n초 뒤(코드에서는 0.5초)에 API Request를 실행해서 네트워크 자원을 아끼고 지나치게 자주 로딩 인디케이터와 검색어 목록이 깜빡거리는 점을 차단합니다.

7. API Response를 받아서 검색어 결과를 목록을 표현하는 ul tag에 렌더링 합니다.
- 응답 결과가 있으면 그대로 렌더링하고
- 응답 결과가 null 이거나 빈 배열인 경우처럼 비어있으면 해당하는 검색어가 없다는 UI를 만들어 사용자에게 친절하게 알려줍니다.

8. 이때 API가 네트워크, 서버, 인증 등의 이유로 에러를 낼 수 있습니다.
- API 처리를 Promise 기반으로 했다면 catch, finally 함수를 체이닝해서 에러가 생겼을때 사용자에게 알립니다.
- async await를 사용했다면 API 요청 관련 코드를 try catch로 감싼 뒤 catch에서 동일한 작업을 수행합니다.




### q2. RxJS

#### A)
```js
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
```

```js
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
```

##### 해설
1. Reactive 패러다임은 크게 4가지 개념을 이해하면 됩니다.
- Observable : 우리가 애플리케이션을 만들때 데이터는 API에서도 오고, 여러 DOM tag에 달린 이벤트 리스너에서도 옵니다. Observable은 이런 모든 종류의 데이터의 흐름을 나타냅니다.
- Operator : 이렇게 시간순으로 연속적으로 들어오는 데이터를 우리는 그대로 사용하기도 하지만 계산을 하거나 log를 남기기도 합니다. 이렇게 데이터의 흐름 사이 사이에 어떤 특정한 작업을 해야하는데, 이 작업을 해줄 수 있게 해주는 것이 바로 Operator 입니다. 
- Observer : 이렇게 Observable과 Operator로 데이터가 어떻게 흘러서 어떻게 변하는지를 표현했으니, 이 데이터를 결국엔 어딘가에서 꺼내서 활용을 해야합니다. 그 활용을 하는 주체가 바로 Observer 입니다. 그래서 관찰자 입니다. 더 정확히는,  Observer는 next, error, complete 함수를 프로퍼티로 갖는 객체를 의미합니다. 이 객체를 observableInstance.subscribe(객체) 와 같이 subscribe 함수 안에 넣어주면 데이터를 꺼내오기 시작합니다.
- Subscription : 위에서 subscribe 함수를 실행하면 데이터를 꺼내오기 시작하고 이 함수는 Subscription 객체를 반환합니다. 데이터를 꺼내온다는 것은 RxJS가 Browser 어딘가에 이벤트 핸들러를 달아놨다는 것을 의미하는데, 더 이상 데이터를 활용하지 않아야 하는 순간이 오면 사용한 메모리 자원을 다시 반환해야 합니다. 이때 이 Subscription 객체를 이용해 subscriptionInstance.unsubscribe() 와 같이 자원을 반환합니다.

2. input tag의 input 행위(keypress, keyup 등의 이벤트)를 fromEvent 함수를 이용해 Observable로 만듭니다.

3. 그 다음 Vanilla 버전에서 이벤트 핸들러가 수행했던 행위들(빈 문자 건너뛰기, debounce, 로딩 인디케이터 스타일 바꿔주기, API 요청)을 Operator를 이용해 수행합니다.
- map, debounceTime, tap, ajax 등의 Operator가 이 작업들에 사용됩니다.

4. 이렇게 만들어진 Observable instance를 구독하기 시작합니다. 그럼 Observer에 검색어 목록 데이터가 전달됩니다. 이 값을 이용해 검색어 목록이 없는 경우와 있는 경우를 각각 구분해서 Vanilla 버전에서와 똑같이 렌더링 합니다.

5. 에러 처리에 대해서는, RxJS는 Observer 객체에 error 핸들러를 제공합니다. Observable에서 에러가 나면 error 핸들러가 수행됩니다. 따라서 에러가 생겼을때 이 핸들러에 필요한 작업(사용자에게 에러가 났다고 알려주기)을 수행합니다.



