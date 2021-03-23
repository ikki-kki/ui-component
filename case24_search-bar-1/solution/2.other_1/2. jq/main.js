// unsplash : https://unsplash.com/documentation#search-photos
// debounce : https://lodash.com/docs/4.17.15#debounce

const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const $input = $('input');
const $dropdownMenu = $('.dropdown-menu');
const $imageInfo = $('.image-info');
const template = _.template($('#dropdown-item-template').text());

/**
 * 검색어가 입력됐을때 이벤트
 */
const onInputDebounceQuery = _.debounce(async (e) => {
    const { value: query } = e.target;
    try {
        /**
         * @see https://github.com/axios/axios#response-schema
         */
        const requestUrl = `https://api.unsplash.com/search/photos/?query=${query}&client_id=${accessKey}`;
        const data = await $.ajax(requestUrl, {
            method: 'GET'
        });

        const { results } = data;

        /**
         * 조회 결과가 존재하지 않는 경우 항목을 표시하지 않음
         */
        if (!results?.length) {
            $dropdownMenu.removeClass('show');
            return;
        }

        /**
         * 드롭다운 메뉴에 항목을 추가
         */
        $dropdownMenu.html(
            results.map((item) => {
                const { id, alt_description: description } = item;
                const { regular: url } = item.urls;
                /**
                 * `lodash` 템플릿을 활용하여 조회된 데이터 항목을 템플릿으로 변환
                 */
                return template({
                    id, description, url
                });
            }).join('')
        );
        $dropdownMenu.addClass('show');
    } catch (e) {
        alert(e.status !== 200 ? '데이터 조회중 에러 발생!' : '데이터 처리중 에러 발생!');
    }
}, 250);

/**
 * 드롭다운 아이템 항목 선택시 이벤트
 */
const onClickDropdownItem = async (e) => {
    try {
        const $dropdownItem = $(e.currentTarget);
        /**
         * @see https://api.jquery.com/data/
         */
        const id = $dropdownItem.data('id');

        const requestUrl = `https://api.unsplash.com/photos/${id}/?client_id=${accessKey}`;
        const data = await $.ajax(requestUrl, {
            method: 'GET'
        });
        const {
            urls,
            alt_description: description
        } = data
        const { regular: url } = urls;

        /**
         * 이미지 객체 정보 업데이트
         * @see https://api.jquery.com/attr/
         */
        $imageInfo.attr('src', url);
        $imageInfo.attr('alt', description);

        /**
         * 열려있는 검색결과 내용을 닫고 검색어 입력창에 현재 이미지 내용을 입력
         * @see https://api.jquery.com/addclass/
         * @see https://api.jquery.com/removeclass/
         */
        $dropdownMenu.removeClass('show');
        /**
         * @see https://api.jquery.com/val/
         */
        $input.val(description);
    } catch (e) {
        alert(e.isAxiosError ? '데이터 조회중 에러 발생!' : '데이터 처리중 에러 발생!');
    }
}

$input.on('keydown', onInputDebounceQuery);
/**
 * [!] 아이템 항목이 눌러졌을때의 이벤트를 `dropdownMenu` 엘리먼트에서 위임받아 처리
 */
$dropdownMenu.on('click', '.dropdown-item', onClickDropdownItem);