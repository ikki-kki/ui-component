// unsplash : https://unsplash.com/documentation#search-photos
// debounce : https://lodash.com/docs/4.17.15#debounce

const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const inputEl = document.querySelector('input');
const dropdownMenuEl = document.querySelector('.dropdown-menu');
const imageInfoEl = document.querySelector('.image-info');
const template = _.template(document.querySelector('#dropdown-item-template').textContent);

/**
 * 검색어가 입력됐을때 이벤트
 */
const onInputDebounceQuery = _.debounce(async (e) => {
    const { value: query } = e.target;
    try {
        /**
         * @see https://github.com/axios/axios#response-schema
         */
        const { data } = await axios.get('https://api.unsplash.com/search/photos/', {
            params: {
                client_id: accessKey,
                query
            }
        });

        const { results } = data;

        /**
         * 조회 결과가 존재하지 않는 경우 항목을 표시하지 않음
         */
        if (!results?.length) {
            dropdownMenuEl.classList.remove('show');
            return;
        }

        /**
         * 드롭다운 메뉴에 항목을 추가
         */
        dropdownMenuEl.innerHTML = results.map((item) => {
            const { id, alt_description: description } = item;
            const { regular: url } = item.urls;
            /**
             * `lodash` 템플릿을 활용하여 조회된 데이터 항목을 템플릿으로 변환
             */
            return template({
                id, description, url
            });
        }).join('');
        dropdownMenuEl.classList.add('show');
    } catch (e) {
        alert(e.isAxiosError ? '데이터 조회중 에러 발생!' : '데이터 처리중 에러 발생!');
    }
}, 250);

/**
 * 드롭다운 아이템 항목 선택시 이벤트
 * [>] 아이템 항목이 눌러졌을때의 이벤트를 `dropdownMenu` 엘리먼트에서 위임받아 처리
 */
const onClickDropdownItem = async (e) => {
    try {
        /**
         * 이벤트가 발생한 엘리먼트로부터 가장 인전한 `.dropdown-item` 엘리먼트를 찾음
         */
        const dropdownItemEl = e.target.closest('.dropdown-item');
        const id = dropdownItemEl.dataset.id;

        const { data } = await axios.get(`https://api.unsplash.com/photos/${id}`, {
            params: {
                client_id: accessKey,
            }
        });
        const {
            urls,
            alt_description: description
        } = data
        const { regular: url } = urls;

        /**
         * 이미지 객체 정보 업데이트
         */
        imageInfoEl.src = url
        imageInfoEl.alt = description

        /**
         * 열려있는 검색결과 내용을 닫고 검색어 입력창에 현재 이미지 내용을 입력
         */
        dropdownMenuEl.classList.remove('show');
        inputEl.value = description;
    } catch (e) {
        alert(e.isAxiosError ? '데이터 조회중 에러 발생!' : '데이터 처리중 에러 발생!');
    }
}

inputEl.addEventListener('keydown', onInputDebounceQuery);
dropdownMenuEl.addEventListener('click', onClickDropdownItem);