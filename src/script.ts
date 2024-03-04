const themeBtn: HTMLElement = document.querySelector("#themeBtn")!;
const htmlTag: HTMLElement = document.getElementsByTagName("html")[0];

themeBtn.addEventListener("click", function () {
    if (htmlTag.classList.contains("dark")) {
        htmlTag.classList.remove("dark");
        themeBtn.classList.remove("fa-moon");
        themeBtn.classList.add("fa-sun");
        themeBtn.setAttribute("title", "switch to light mode");
    }
    else {
        htmlTag.classList.add("dark");
        themeBtn.classList.remove("fa-sun");
        themeBtn.classList.add("fa-moon");
        themeBtn.setAttribute("title", "switch to dark mode");
    }
})