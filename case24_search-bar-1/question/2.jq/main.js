// unsplash : https://unsplash.com/documentation#search-photos
// debounce : https://lodash.com/docs/4.17.15#debounce

const accessKey = "hPyF-tz9tHnxeaoTwb7q0GTw10Wxwr85cD63lk7d7UE";
const $input = $('input');
const $dropdownMenu = $('.dropdown-menu');
const $imageInfo = $('.image-info');


const fetchImages = async search => {
    const res = await axios.get('https://api.unsplash.com/search/photos/', {
        params: {
            client_id: accessKey,
            query: search
        }
    });
    return res.data.results;
};

const fetchImage = async id => {
    const res = await axios.get(`https://api.unsplash.com/photos/${id}`, {
        params: {
            client_id: accessKey,
        }
    });

    return res.data;
}

const onSearch = async e => {
    const images = await fetchImages(e.target.value);
    if(!images.length) {
        $dropdownMenu.removeClass('show');
        return;
    }
    $dropdownMenu.addClass('show');
    $dropdownMenu.empty();
    listTemplate(images);
}

const listTemplate = (images) => {
    // Do Something Here!
}

const imageTemplate = (image) => {
    const {urls, alt_description} = image;
    $imageInfo.attr('src', urls.regular);
    $imageInfo.attr('alt', alt_description);
}

$input.on('input', _.debounce(onSearch, 600));