## Case15 : ModalWindow - 출제자 해설

###  q1.  vanilla.js 로 코드를 작성해보세요.
​
####  A)  중점포인트
- 모달이 떳을 때, 모달안을 클릭해도 안닫힌다.
- 모달 바탕을 클릭 했을 때, 모달도 닫혀야 된다.
​
```js
document.querySelector('.popup-trigger').addEventListener('click' , function(){

popupModal.classList.add('is--visible')

bodyBlackout.classList.add('is-blacked-out')

});
```
팝업 띄우기 클릭시,
- popupModal class명에 is--visible 추가
- bodyBlackout class명에 is-blacked-out 추가

```js
popupModal.querySelector('.popup-modal__close').addEventListener('click', () => {

popupModal.classList.remove('is--visible')
bodyBlackout.classList.remove('is-blacked-out')

})
​
```
x 버튼 클릭시
- popupModal class명에 is--visible 제거
- bodyBlackout class명에 is-blacked-out 제거

```js
bodyBlackout.addEventListener('click', () => {


popupModal.classList.remove('is--visible')

bodyBlackout.classList.remove('is-blacked-out')

})
```
바탕을 클릭 시 클래스 리스트에서 제거한다.
​
​
바탕을 클릭했을 때 모달이 닫히는 것은
z-index 순서를 조절해서 모달이 바탕화면보다 위에 있기 때문이다.


###  q2.  jQuery 로 코드를 작성해보세요.

####  A) 중점포인트
- q_index.html 만을 건드린다. 
- js 를 작성하지 않는다.
- 문서를 보고 완성
​​
```js
​
<script  src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

<!-- jQuery Modal -->

<script  src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>

<link  rel="stylesheet"  href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css"  />

<script  src='./s2_index.js'></script>

```
body 위로 모듈을 불러온다.


```html
<a  href="#"  rel="modal:close"><i  class="fa fa-window-close popup-modal__close"></i>

</a>
```
modal:close 닫기버튼
modal:open 열기버튼
기타 css 는 따로 작성할 필요없이 script 에 불러온 내용을 붙여 넣습니다.

###  q3.  React 로 코드를 작성해보세요.
​
####  A)  중점포인트
useState 훅으로 잘 처리 합니다.
​
<해설>
css 로 props 를 받는 부분을 봅니다

```css
display: ${props  =>  props.isVisible ? "block" : "none"  };
```
​
> app.js
```js
const [ isVisible , setIsVisible ] = useState(false);

const  onSetIsVisible = (active) => {
setIsVisible(active);

}
```
useState boolean 으로 모달의 상태를 컨트롤 합니다.

```js
<BodyBlackout  isVisible={isVisible}  onSetIsVisible={onSetIsVisible}  />

<Modal  isVisible={isVisible}  onSetIsVisible={onSetIsVisible}  />
```
​

##### 추가로 생각해볼 점
ModalContainer.js 로 BodyBlackout , Modal 컴포넌트를 포함해서 한번에 넘겨서 처리하도록 만들어 봅니다.