const $currentItem = document.querySelector('.CurrentItem');
const $formTag = document.querySelector('form');

const formMap = {
  contact: '연락 수단',
  delivery: '배송 수단',
};

$formTag.addEventListener('submit', (event) => {
  event.preventDefault();
  const formRecords = Array.from(new FormData($formTag));

  if (Object.keys(formMap).length !== formRecords.length) {
    $currentItem.innerHTML = '폼을 모두 작성해주세요.';
    return;
  }

  $currentItem.innerHTML = formRecords
    .map((record) => `${formMap[record[0]]}: ${record[1]}`)
    .join('<br />');
});
