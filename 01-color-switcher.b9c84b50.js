const t={start:document.querySelector("[data-start]"),stop:document.querySelector("[data-stop]")};let e=null;function a(e){e.target===t.start?o(!0,!1):o(!1,!0)}function o(e,a){t.start.disabled=e,t.stop.disabled=a}t.start.addEventListener("click",(t=>{e=setInterval((()=>{document.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3),a(t)})),t.stop.addEventListener("click",(t=>{clearInterval(e),a(t)}));
//# sourceMappingURL=01-color-switcher.b9c84b50.js.map
