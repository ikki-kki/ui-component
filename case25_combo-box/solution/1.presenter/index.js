const ITEM_ADDED_EVENTNAME = 'itemAdded';
const items = [];
let currentItem = null;
const $currentItem = document.querySelector('.CurrentItem');
const $inputTag = document.querySelector('.ComboBox input');
const $arrowDown = document.querySelector('.ComboBox img');
const $notification = document.querySelector('.Notification');
const $itemList = document.querySelector('.ComboBox__list');

const toggleItemList = () => {
  const isVisible = $itemList.style.visibility === 'visible';
  $itemList.style.visibility = isVisible ? 'hidden' : 'visible';
};

$inputTag.addEventListener('keyup', (event) => {
  const { value } = event.target;
  if (!value) {
    return;
  }

  if (event.key === 'Enter') {
    items.push(value);
    document.dispatchEvent(new CustomEvent(ITEM_ADDED_EVENTNAME));
    $itemList.innerHTML = items.map((item) => `<li>${item}</li>`).join('');
  }
});

$arrowDown.addEventListener('click', () => {
  toggleItemList();
});

$itemList.addEventListener('click', (event) => {
  if (event.target.nodeName !== 'LI') {
    return;
  }

  $inputTag.value = event.target.innerText;
  // 실무에선 변수로 활용
  $currentItem.textContent = `현재 아이템: ${event.target.innerText}`;
  toggleItemList();
});

document.addEventListener(ITEM_ADDED_EVENTNAME, () => {
  $notification.classList.add('Notification--show');
  $notification.classList.remove('Notification--hide');

  window.setTimeout(() => {
    $notification.classList.add('Notification--hide');
    $notification.classList.remove('Notification--show');
  }, 3000);
});
