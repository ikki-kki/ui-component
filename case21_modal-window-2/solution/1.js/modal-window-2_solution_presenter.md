## Case21 : ModalWindow2 - 출제자 해설

### JavaScript로 해당 기능을 구현하시오.

#### A)
- Unspalsh API : https://unsplash.com/documentation#list-photos

```js

const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const imageLists = document.querySelector('.image-lists');
const modal = document.querySelector('.custom-modal');
const thumbnail = modal.querySelector('.thumbnail');
const profileImg = modal.querySelector('.profile-image');
const userName = modal.querySelector('.name');
const insta = modal.querySelector('.insta');


// API 통신
const imageApi = async () => {
  const res = await axios.get('https://api.unsplash.com/photos/', {
    params: {
      client_id: accessKey,
    }
  });
  return res;
};

// 콜백 함수
const render = async (callApi, callTemplate) => {
  const res = await callApi();
  callTemplate(res);
}
```


```js
// 이미지 템플릿 및 클릭 이벤트 추가
const imageTemplate = (res) => {
  const images = res.data;
  for(const image of images) {
    const { urls, alt_description, user } = image;
    const { name, instagram_username, profile_image: {medium} } = user;
    const li = document.createElement('li');

    li.classList.add('image-list');
    li.dataset.user = JSON.stringify({name, instagram_username, medium});
    li.dataset.image = `${urls.regular}`;
    li.innerHTML = `<img src="${urls.regular}" alt="${alt_description}">`;
    imageLists.appendChild(li);

    li.addEventListener('click', function() {
      const obj = {
        image: this.dataset.image,
        ...JSON.parse(this.dataset.user)
      };
      modal.classList.add('active');
      thumbnail.src = obj.image;
      profileImg.src = obj.medium;
      userName.textContent = obj.name;
      insta.textContent = obj.instagram_username;
    })
  }
}
```

- JSON.stringify() : 자바스크립트 값을 JSON 객체를 String 객체로 변환
- JSON.parse() : String 객체를 JSON 객체로 변환

```js
// 이미지 표기 및 modal 이벤트 추가
(async () => {
  await render(imageApi, imageTemplate);
  modal.addEventListener('click', function (e) {
    const target = e.target;
    const isLayer = target.classList.contains('layer');
    isLayer && modal.classList.remove('active');
  });
})();
```
