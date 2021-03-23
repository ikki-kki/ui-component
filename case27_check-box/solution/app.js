const $currentItem = document.querySelector('.CurrentItem');
const $formTag = document.querySelector('form');

$formTag.addEventListener('submit', (event) => {
  event.preventDefault();
  const formRecords = Array.from(new FormData($formTag));
  const foodRecords = formRecords.filter((record) => record[0] === 'food');
  const interestRecords = formRecords.filter((record) => record[0] === 'interest');

  if (foodRecords.length === 0 || interestRecords.length === 0) {
    $currentItem.innerHTML = '폼을 모두 작성해주세요.';
    return;
  }

  $currentItem.innerHTML = `
      좋아하는 음식 : ${foodRecords.map((record) => record[1]).join(', ')}
      관심사      : ${interestRecords.map((record) => record[1]).join(', ')} 
    `;
});
