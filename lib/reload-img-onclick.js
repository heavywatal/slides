{
const reload_all_img = function() {
  const imgs = document.getElementsByTagName("img");
  for (let i = 0; i < imgs.length; ++i) {
    const src = imgs[i].src;
    imgs[i].src += "?q";
    imgs[i].src = src;
  }
};
const reload_src_element = function(ev) {
  const original_src = ev.srcElement.src;
  ev.srcElement.src += "?q";
  ev.srcElement.src = original_src;
};
const reload_src = function(ev) {
  if (ev.shiftKey || ev.metaKey || ev.altKey) {
    reload_all_img();
  } else {
    reload_src_element(ev);
  }
};
const img_elements = document.getElementsByTagName("img");
for (let i = 0; i < img_elements.length; ++i) {
  img_elements[i].onclick = reload_src;
}
};
