// fetch fake data
const fetchTabsData = () => {
  return new Promise((resolve) => {
    setTimeout(
      () =>
        resolve([
          {
            title: "HTML",
            content: `HTML(HyperText Markup Language) is the most basic building block of the Web. It describes and defines the content of a webpage along with the basic layout of the webpage. Other technologies besides HTML are generally used to describe a web page's appearance/presentation(CSS) or functionality/ behavior(JavaScript).`,
          },
          {
            title: "CSS",
            content: `Cascading Style Sheets(CSS) is a stylesheet language used to describe the presentation of a document written in HTML or XML (including XML dialects such as SVG, MathML or XHTML). CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.`,
          },
          {
            title: "JavaScript",
            content: `JavaScript(JS) is a lightweight interpreted or JIT-compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.`,
          },
        ]),
      1000
    );
  });
};

const createTabs = async () => {
  // 현재 활성화된 탭의 인덱스
  let currentTabIndex = 0;

  const $tabs = document.querySelector(".tabs");
  const $spinner = document.querySelector(".spinner");

  // fetch fake data
  try {
    const tabsData = await fetchTabsData();

    $spinner.style.display = "none";
    $tabs.style.setProperty("--tabs-length", tabsData.length);

    const nav = tabsData.map(
      ({ title }, i) => `
        ${i === 0 ? "<nav>" : ""}
        <div class="tab" data-index="${i}">${title}</div>
        ${i === tabsData.length - 1 ? '<span class="glider"></span></nav>' : ""}`
    );

    const contents = tabsData.map(
      ({ content }, i) => `<div class="tab-content ${i === currentTabIndex ? "active" : ""}">${content}</div>`
    );
    
    $tabs.innerHTML = [...nav, ...contents].join("");
  } catch (e) {
    console.error(e);
  }

  document.querySelector("nav").onclick = (() => {
    const $glider = document.querySelector(".glider");
    const $tabContents = document.querySelectorAll(".tab-content");

    return (e) => {
      currentTabIndex = +e.target.dataset.index;

      $glider.style.transform = `translate3D(${currentTabIndex * 100}%, 0, 0)`;

      $tabContents.forEach(($tabContent, i) => {
        $tabContent.classList.toggle("active", i === currentTabIndex);
      });
    };
  })();
};

document.addEventListener("DOMContentLoaded", createTabs);
