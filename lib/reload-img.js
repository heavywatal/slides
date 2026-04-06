function reload_src(img) {
  const original_src = img.src;
  img.src += "?q";
  img.src = original_src;
}
function reload_all_img() {
  for (const img of document.getElementsByTagName("img")) {
    reload_src(img);
  }
}
for (const element of document.getElementsByTagName("img")) {
  element.onclick = (ev) => {
    if (ev.shiftKey || ev.metaKey || ev.altKey) {
      reload_all_img();
    } else {
      reload_src(ev.target);
    }
  };
}
