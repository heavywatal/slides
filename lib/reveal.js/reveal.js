var yt=(c,t)=>{for(let e in t)c[e]=t[e];return c},E=(c,t)=>Array.from(c.querySelectorAll(t)),Gt=(c,t,e)=>{e?c.classList.add(t):c.classList.remove(t)},ft=c=>{if(typeof c=="string"){if(c==="null")return null;if(c==="true")return!0;if(c==="false")return!1;if(c.match(/^-?[\d\.]+$/))return parseFloat(c)}return c},lt=(c,t)=>{c.style.transform=t},Ht=(c,t)=>{let e=c.matches||c.matchesSelector||c.msMatchesSelector;return!(!e||!e.call(c,t))},K=(c,t)=>{if(typeof c.closest=="function")return c.closest(t);for(;c;){if(Ht(c,t))return c;c=c.parentNode}return null},dn=c=>{let t=(c=c||document.documentElement).requestFullscreen||c.webkitRequestFullscreen||c.webkitRequestFullScreen||c.mozRequestFullScreen||c.msRequestFullscreen;t&&t.apply(c)},ne=c=>{let t=document.createElement("style");return t.type="text/css",c&&c.length>0&&(t.styleSheet?t.styleSheet.cssText=c:t.appendChild(document.createTextNode(c))),document.head.appendChild(t),t},nn=()=>{let c={};location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi,t=>{c[t.split("=").shift()]=t.split("=").pop()});for(let t in c){let e=c[t];c[t]=ft(unescape(e))}return c.dependencies!==void 0&&delete c.dependencies,c},Tn={mp4:"video/mp4",m4a:"video/mp4",ogv:"video/ogg",mpeg:"video/mpeg",webm:"video/webm"},cn=navigator.userAgent,bt=/(iphone|ipod|ipad|android)/gi.test(cn)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,hn=/android/gi.test(cn),Pn=function(c){if(c){var t=function(v){return[].slice.call(v)},e=3,n=[],i=null,a="requestAnimationFrame"in c?function(){c.cancelAnimationFrame(i),i=c.requestAnimationFrame(function(){return o(n.filter(function(v){return v.dirty&&v.active}))})}:function(){},s=function(v){return function(){n.forEach(function(T){return T.dirty=v}),a()}},o=function(v){v.filter(function(I){return!I.styleComputed}).forEach(function(I){I.styleComputed=d(I)}),v.filter(p).forEach(f);var T=v.filter(u);T.forEach(g),T.forEach(function(I){f(I),r(I)}),T.forEach(C)},r=function(v){return v.dirty=0},g=function(v){v.availableWidth=v.element.parentNode.clientWidth,v.currentWidth=v.element.scrollWidth,v.previousFontSize=v.currentFontSize,v.currentFontSize=Math.min(Math.max(v.minSize,v.availableWidth/v.currentWidth*v.previousFontSize),v.maxSize),v.whiteSpace=v.multiLine&&v.currentFontSize===v.minSize?"normal":"nowrap"},u=function(v){return v.dirty!==2||v.dirty===2&&v.element.parentNode.clientWidth!==v.availableWidth},d=function(v){var T=c.getComputedStyle(v.element,null);return v.currentFontSize=parseFloat(T.getPropertyValue("font-size")),v.display=T.getPropertyValue("display"),v.whiteSpace=T.getPropertyValue("white-space"),!0},p=function(v){var T=!1;return!v.preStyleTestCompleted&&(/inline-/.test(v.display)||(T=!0,v.display="inline-block"),v.whiteSpace!=="nowrap"&&(T=!0,v.whiteSpace="nowrap"),v.preStyleTestCompleted=!0,T)},f=function(v){v.element.style.whiteSpace=v.whiteSpace,v.element.style.display=v.display,v.element.style.fontSize=v.currentFontSize+"px"},C=function(v){v.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:v.previousFontSize,newValue:v.currentFontSize,scaleFactor:v.currentFontSize/v.previousFontSize}}))},h=function(v,T){return function(){v.dirty=T,v.active&&a()}},q=function(v){return function(){n=n.filter(function(T){return T.element!==v.element}),v.observeMutations&&v.observer.disconnect(),v.element.style.whiteSpace=v.originalStyle.whiteSpace,v.element.style.display=v.originalStyle.display,v.element.style.fontSize=v.originalStyle.fontSize}},x=function(v){return function(){v.active||(v.active=!0,a())}},D=function(v){return function(){return v.active=!1}},Y=function(v){v.observeMutations&&(v.observer=new MutationObserver(h(v,1)),v.observer.observe(v.element,v.observeMutations))},M={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in c&&{subtree:!0,childList:!0,characterData:!0}},A=null,S=function(){c.clearTimeout(A),A=c.setTimeout(s(2),P.observeWindowDelay)},z=["resize","orientationchange"];return Object.defineProperty(P,"observeWindow",{set:function(v){var T="".concat(v?"add":"remove","EventListener");z.forEach(function(I){c[T](I,S)})}}),P.observeWindow=!0,P.observeWindowDelay=100,P.fitAll=s(e),P}function U(v,T){var I=Object.assign({},M,T),B=v.map(function(F){var W=Object.assign({},I,{element:F,active:!0});return function(j){j.originalStyle={whiteSpace:j.element.style.whiteSpace,display:j.element.style.display,fontSize:j.element.style.fontSize},Y(j),j.newbie=!0,j.dirty=!0,n.push(j)}(W),{element:F,fit:h(W,e),unfreeze:x(W),freeze:D(W),unsubscribe:q(W)}});return a(),B}function P(v){var T=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return typeof v=="string"?U(t(document.querySelectorAll(v)),T):U([v],T)[0]}}(typeof window>"u"?null:window),ie=class{constructor(t){this.Reveal=t,this.startEmbeddedIframe=this.startEmbeddedIframe.bind(this)}shouldPreload(t){if(this.Reveal.isScrollView())return!0;let e=this.Reveal.getConfig().preloadIframes;return typeof e!="boolean"&&(e=t.hasAttribute("data-preload")),e}load(t,e={}){t.style.display=this.Reveal.getConfig().display,E(t,"img[data-src], video[data-src], audio[data-src], iframe[data-src]").forEach(i=>{(i.tagName!=="IFRAME"||this.shouldPreload(i))&&(i.setAttribute("src",i.getAttribute("data-src")),i.setAttribute("data-lazy-loaded",""),i.removeAttribute("data-src"))}),E(t,"video, audio").forEach(i=>{let a=0;E(i,"source[data-src]").forEach(s=>{s.setAttribute("src",s.getAttribute("data-src")),s.removeAttribute("data-src"),s.setAttribute("data-lazy-loaded",""),a+=1}),bt&&i.tagName==="VIDEO"&&i.setAttribute("playsinline",""),a>0&&i.load()});let n=t.slideBackgroundElement;if(n){n.style.display="block";let i=t.slideBackgroundContentElement,a=t.getAttribute("data-background-iframe");if(n.hasAttribute("data-loaded")===!1){n.setAttribute("data-loaded","true");let o=t.getAttribute("data-background-image"),r=t.getAttribute("data-background-video"),g=t.hasAttribute("data-background-video-loop"),u=t.hasAttribute("data-background-video-muted");if(o)/^data:/.test(o.trim())?i.style.backgroundImage=`url(${o.trim()})`:i.style.backgroundImage=o.split(",").map(d=>`url(${((p="")=>encodeURI(p).replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/[!'()*]/g,f=>`%${f.charCodeAt(0).toString(16).toUpperCase()}`))(decodeURI(d.trim()))})`).join(",");else if(r){let d=document.createElement("video");g&&d.setAttribute("loop",""),(u||this.Reveal.isSpeakerNotes())&&(d.muted=!0),bt&&(d.muted=!0,d.setAttribute("playsinline","")),r.split(",").forEach(p=>{let f=document.createElement("source");f.setAttribute("src",p);let C=((h="")=>Tn[h.split(".").pop()])(p);C&&f.setAttribute("type",C),d.appendChild(f)}),i.appendChild(d)}else if(a&&e.excludeIframes!==!0){let d=document.createElement("iframe");d.setAttribute("allowfullscreen",""),d.setAttribute("mozallowfullscreen",""),d.setAttribute("webkitallowfullscreen",""),d.setAttribute("allow","autoplay"),d.setAttribute("data-src",a),d.style.width="100%",d.style.height="100%",d.style.maxHeight="100%",d.style.maxWidth="100%",i.appendChild(d)}}let s=i.querySelector("iframe[data-src]");s&&this.shouldPreload(n)&&!/autoplay=(1|true|yes)/gi.test(a)&&s.getAttribute("src")!==a&&s.setAttribute("src",a)}this.layout(t)}layout(t){Array.from(t.querySelectorAll(".r-fit-text")).forEach(e=>{Pn(e,{minSize:24,maxSize:.8*this.Reveal.getConfig().height,observeMutations:!1,observeWindow:!1})})}unload(t){t.style.display="none";let e=this.Reveal.getSlideBackground(t);e&&(e.style.display="none",E(e,"iframe[src]").forEach(n=>{n.removeAttribute("src")})),E(t,"video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]").forEach(n=>{n.setAttribute("data-src",n.getAttribute("src")),n.removeAttribute("src")}),E(t,"video[data-lazy-loaded] source[src], audio source[src]").forEach(n=>{n.setAttribute("data-src",n.getAttribute("src")),n.removeAttribute("src")})}formatEmbeddedContent(){let t=(e,n,i)=>{E(this.Reveal.getSlidesElement(),"iframe["+e+'*="'+n+'"]').forEach(a=>{let s=a.getAttribute(e);s&&s.indexOf(i)===-1&&a.setAttribute(e,s+(/\?/.test(s)?"&":"?")+i)})};t("src","youtube.com/embed/","enablejsapi=1"),t("data-src","youtube.com/embed/","enablejsapi=1"),t("src","player.vimeo.com/","api=1"),t("data-src","player.vimeo.com/","api=1")}startEmbeddedContent(t){if(t){let e=this.Reveal.isSpeakerNotes();E(t,'img[src$=".gif"]').forEach(n=>{n.setAttribute("src",n.getAttribute("src"))}),E(t,"video, audio").forEach(n=>{if(K(n,".fragment")&&!K(n,".fragment.visible"))return;let i=this.Reveal.getConfig().autoPlayMedia;if(typeof i!="boolean"&&(i=n.hasAttribute("data-autoplay")||!!K(n,".slide-background")),i&&typeof n.play=="function"){if(e&&!n.muted)return;if(n.readyState>1)this.startEmbeddedMedia({target:n});else if(bt){let a=n.play();a&&typeof a.catch=="function"&&n.controls===!1&&a.catch(()=>{n.controls=!0,n.addEventListener("play",()=>{n.controls=!1})})}else n.removeEventListener("loadeddata",this.startEmbeddedMedia),n.addEventListener("loadeddata",this.startEmbeddedMedia)}}),e||(E(t,"iframe[src]").forEach(n=>{K(n,".fragment")&&!K(n,".fragment.visible")||this.startEmbeddedIframe({target:n})}),E(t,"iframe[data-src]").forEach(n=>{K(n,".fragment")&&!K(n,".fragment.visible")||n.getAttribute("src")!==n.getAttribute("data-src")&&(n.removeEventListener("load",this.startEmbeddedIframe),n.addEventListener("load",this.startEmbeddedIframe),n.setAttribute("src",n.getAttribute("data-src")))}))}}startEmbeddedMedia(t){let e=!!K(t.target,"html"),n=!!K(t.target,".present");e&&n&&(t.target.paused||t.target.ended)&&(t.target.currentTime=0,t.target.play()),t.target.removeEventListener("loadeddata",this.startEmbeddedMedia)}startEmbeddedIframe(t){let e=t.target;if(e&&e.contentWindow){let n=!!K(t.target,"html"),i=!!K(t.target,".present");if(n&&i){let a=this.Reveal.getConfig().autoPlayMedia;typeof a!="boolean"&&(a=e.hasAttribute("data-autoplay")||!!K(e,".slide-background")),/youtube\.com\/embed\//.test(e.getAttribute("src"))&&a?e.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*"):/player\.vimeo\.com\//.test(e.getAttribute("src"))&&a?e.contentWindow.postMessage('{"method":"play"}',"*"):e.contentWindow.postMessage("slide:start","*")}}}stopEmbeddedContent(t,e={}){e=yt({unloadIframes:!0},e),t&&t.parentNode&&(E(t,"video, audio").forEach(n=>{n.hasAttribute("data-ignore")||typeof n.pause!="function"||(n.setAttribute("data-paused-by-reveal",""),n.pause())}),E(t,"iframe").forEach(n=>{n.contentWindow&&n.contentWindow.postMessage("slide:stop","*"),n.removeEventListener("load",this.startEmbeddedIframe)}),E(t,'iframe[src*="youtube.com/embed/"]').forEach(n=>{!n.hasAttribute("data-ignore")&&n.contentWindow&&typeof n.contentWindow.postMessage=="function"&&n.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}),E(t,'iframe[src*="player.vimeo.com/"]').forEach(n=>{!n.hasAttribute("data-ignore")&&n.contentWindow&&typeof n.contentWindow.postMessage=="function"&&n.contentWindow.postMessage('{"method":"pause"}',"*")}),e.unloadIframes===!0&&E(t,"iframe[data-src]").forEach(n=>{n.setAttribute("src","about:blank"),n.removeAttribute("src")}))}},ht=".slides section",ot=".slides>section",sn=".slides>section.present>section",In=/registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview/,se=class{constructor(t){this.Reveal=t}render(){this.element=document.createElement("div"),this.element.className="slide-number",this.Reveal.getRevealElement().appendChild(this.element)}configure(t,e){let n="none";t.slideNumber&&!this.Reveal.isPrintView()&&(t.showSlideNumber==="all"||t.showSlideNumber==="speaker"&&this.Reveal.isSpeakerNotes())&&(n="block"),this.element.style.display=n}update(){this.Reveal.getConfig().slideNumber&&this.element&&(this.element.innerHTML=this.getSlideNumber())}getSlideNumber(t=this.Reveal.getCurrentSlide()){let e,n=this.Reveal.getConfig(),i="h.v";if(typeof n.slideNumber=="function")e=n.slideNumber(t);else{typeof n.slideNumber=="string"&&(i=n.slideNumber),/c/.test(i)||this.Reveal.getHorizontalSlides().length!==1||(i="c");let s=t&&t.dataset.visibility==="uncounted"?0:1;switch(e=[],i){case"c":e.push(this.Reveal.getSlidePastCount(t)+s);break;case"c/t":e.push(this.Reveal.getSlidePastCount(t)+s,"/",this.Reveal.getTotalSlides());break;default:let o=this.Reveal.getIndices(t);e.push(o.h+s);let r=i==="h/v"?"/":".";this.Reveal.isVerticalSlide(t)&&e.push(r,o.v+1)}}let a="#"+this.Reveal.location.getHash(t);return this.formatNumber(e[0],e[1],e[2],a)}formatNumber(t,e,n,i="#"+this.Reveal.location.getHash()){return typeof n!="number"||isNaN(n)?`<a href="${i}">
					<span class="slide-number-a">${t}</span>
					</a>`:`<a href="${i}">
					<span class="slide-number-a">${t}</span>
					<span class="slide-number-delimiter">${e}</span>
					<span class="slide-number-b">${n}</span>
					</a>`}destroy(){this.element.remove()}},ae=class{constructor(t){this.Reveal=t,this.onInput=this.onInput.bind(this),this.onBlur=this.onBlur.bind(this),this.onKeyDown=this.onKeyDown.bind(this)}render(){this.element=document.createElement("div"),this.element.className="jump-to-slide",this.jumpInput=document.createElement("input"),this.jumpInput.type="text",this.jumpInput.className="jump-to-slide-input",this.jumpInput.placeholder="Jump to slide",this.jumpInput.addEventListener("input",this.onInput),this.jumpInput.addEventListener("keydown",this.onKeyDown),this.jumpInput.addEventListener("blur",this.onBlur),this.element.appendChild(this.jumpInput)}show(){this.indicesOnShow=this.Reveal.getIndices(),this.Reveal.getRevealElement().appendChild(this.element),this.jumpInput.focus()}hide(){this.isVisible()&&(this.element.remove(),this.jumpInput.value="",clearTimeout(this.jumpTimeout),delete this.jumpTimeout)}isVisible(){return!!this.element.parentNode}jump(){clearTimeout(this.jumpTimeout),delete this.jumpTimeout;let t,e=this.jumpInput.value.trim("");if(/^\d+$/.test(e)){let n=this.Reveal.getConfig().slideNumber;if(n==="c"||n==="c/t"){let i=this.Reveal.getSlides()[parseInt(e,10)-1];i&&(t=this.Reveal.getIndices(i))}}return t||(/^\d+\.\d+$/.test(e)&&(e=e.replace(".","/")),t=this.Reveal.location.getIndicesFromHash(e,{oneBasedIndex:!0})),!t&&/\S+/i.test(e)&&e.length>1&&(t=this.search(e)),t&&e!==""?(this.Reveal.slide(t.h,t.v,t.f),!0):(this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),!1)}jumpAfter(t){clearTimeout(this.jumpTimeout),this.jumpTimeout=setTimeout(()=>this.jump(),t)}search(t){let e=new RegExp("\\b"+t.trim()+"\\b","i"),n=this.Reveal.getSlides().find(i=>e.test(i.innerText));return n?this.Reveal.getIndices(n):null}cancel(){this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),this.hide()}confirm(){this.jump(),this.hide()}destroy(){this.jumpInput.removeEventListener("input",this.onInput),this.jumpInput.removeEventListener("keydown",this.onKeyDown),this.jumpInput.removeEventListener("blur",this.onBlur),this.element.remove()}onKeyDown(t){t.keyCode===13?this.confirm():t.keyCode===27&&(this.cancel(),t.stopImmediatePropagation())}onInput(t){this.jumpAfter(200)}onBlur(){setTimeout(()=>this.hide(),1)}},te=c=>{let t=c.match(/^#([0-9a-f]{3})$/i);if(t&&t[1])return t=t[1],{r:17*parseInt(t.charAt(0),16),g:17*parseInt(t.charAt(1),16),b:17*parseInt(t.charAt(2),16)};let e=c.match(/^#([0-9a-f]{6})$/i);if(e&&e[1])return e=e[1],{r:parseInt(e.slice(0,2),16),g:parseInt(e.slice(2,4),16),b:parseInt(e.slice(4,6),16)};let n=c.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);if(n)return{r:parseInt(n[1],10),g:parseInt(n[2],10),b:parseInt(n[3],10)};let i=c.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);return i?{r:parseInt(i[1],10),g:parseInt(i[2],10),b:parseInt(i[3],10),a:parseFloat(i[4])}:null},re=class{constructor(t){this.Reveal=t}render(){this.element=document.createElement("div"),this.element.className="backgrounds",this.Reveal.getRevealElement().appendChild(this.element)}create(){this.element.innerHTML="",this.element.classList.add("no-transition"),this.Reveal.getHorizontalSlides().forEach(t=>{let e=this.createBackground(t,this.element);E(t,"section").forEach(n=>{this.createBackground(n,e),e.classList.add("stack")})}),this.Reveal.getConfig().parallaxBackgroundImage?(this.element.style.backgroundImage='url("'+this.Reveal.getConfig().parallaxBackgroundImage+'")',this.element.style.backgroundSize=this.Reveal.getConfig().parallaxBackgroundSize,this.element.style.backgroundRepeat=this.Reveal.getConfig().parallaxBackgroundRepeat,this.element.style.backgroundPosition=this.Reveal.getConfig().parallaxBackgroundPosition,setTimeout(()=>{this.Reveal.getRevealElement().classList.add("has-parallax-background")},1)):(this.element.style.backgroundImage="",this.Reveal.getRevealElement().classList.remove("has-parallax-background"))}createBackground(t,e){let n=document.createElement("div");n.className="slide-background "+t.className.replace(/present|past|future/,"");let i=document.createElement("div");return i.className="slide-background-content",n.appendChild(i),e.appendChild(n),t.slideBackgroundElement=n,t.slideBackgroundContentElement=i,this.sync(t),n}sync(t){let e=t.slideBackgroundElement,n=t.slideBackgroundContentElement,i={background:t.getAttribute("data-background"),backgroundSize:t.getAttribute("data-background-size"),backgroundImage:t.getAttribute("data-background-image"),backgroundVideo:t.getAttribute("data-background-video"),backgroundIframe:t.getAttribute("data-background-iframe"),backgroundColor:t.getAttribute("data-background-color"),backgroundGradient:t.getAttribute("data-background-gradient"),backgroundRepeat:t.getAttribute("data-background-repeat"),backgroundPosition:t.getAttribute("data-background-position"),backgroundTransition:t.getAttribute("data-background-transition"),backgroundOpacity:t.getAttribute("data-background-opacity")},a=t.hasAttribute("data-preload");t.classList.remove("has-dark-background"),t.classList.remove("has-light-background"),e.removeAttribute("data-loaded"),e.removeAttribute("data-background-hash"),e.removeAttribute("data-background-size"),e.removeAttribute("data-background-transition"),e.style.backgroundColor="",n.style.backgroundSize="",n.style.backgroundRepeat="",n.style.backgroundPosition="",n.style.backgroundImage="",n.style.opacity="",n.innerHTML="",i.background&&(/^(http|file|\/\/)/gi.test(i.background)||/\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(i.background)?t.setAttribute("data-background-image",i.background):e.style.background=i.background),(i.background||i.backgroundColor||i.backgroundGradient||i.backgroundImage||i.backgroundVideo||i.backgroundIframe)&&e.setAttribute("data-background-hash",i.background+i.backgroundSize+i.backgroundImage+i.backgroundVideo+i.backgroundIframe+i.backgroundColor+i.backgroundGradient+i.backgroundRepeat+i.backgroundPosition+i.backgroundTransition+i.backgroundOpacity),i.backgroundSize&&e.setAttribute("data-background-size",i.backgroundSize),i.backgroundColor&&(e.style.backgroundColor=i.backgroundColor),i.backgroundGradient&&(e.style.backgroundImage=i.backgroundGradient),i.backgroundTransition&&e.setAttribute("data-background-transition",i.backgroundTransition),a&&e.setAttribute("data-preload",""),i.backgroundSize&&(n.style.backgroundSize=i.backgroundSize),i.backgroundRepeat&&(n.style.backgroundRepeat=i.backgroundRepeat),i.backgroundPosition&&(n.style.backgroundPosition=i.backgroundPosition),i.backgroundOpacity&&(n.style.opacity=i.backgroundOpacity);let s=this.getContrastClass(t);typeof s=="string"&&t.classList.add(s)}getContrastClass(t){let e=t.slideBackgroundElement,n=t.getAttribute("data-background-color");if(!n||!te(n)){let a=window.getComputedStyle(e);a&&a.backgroundColor&&(n=a.backgroundColor)}if(n){let a=te(n);if(a&&a.a!==0)return typeof(i=n)=="string"&&(i=te(i)),(i?(299*i.r+587*i.g+114*i.b)/1e3:null)<128?"has-dark-background":"has-light-background"}var i;return null}bubbleSlideContrastClassToElement(t,e){["has-light-background","has-dark-background"].forEach(n=>{t.classList.contains(n)?e.classList.add(n):e.classList.remove(n)},this)}update(t=!1){let e=this.Reveal.getConfig(),n=this.Reveal.getCurrentSlide(),i=this.Reveal.getIndices(),a=null,s=e.rtl?"future":"past",o=e.rtl?"past":"future";if(Array.from(this.element.childNodes).forEach((g,u)=>{g.classList.remove("past","present","future"),u<i.h?g.classList.add(s):u>i.h?g.classList.add(o):(g.classList.add("present"),a=g),(t||u===i.h)&&E(g,".slide-background").forEach((d,p)=>{d.classList.remove("past","present","future");let f=typeof i.v=="number"?i.v:0;p<f?d.classList.add("past"):p>f?d.classList.add("future"):(d.classList.add("present"),u===i.h&&(a=d))})}),this.previousBackground&&!this.previousBackground.closest("body")&&(this.previousBackground=null),a&&this.previousBackground){let g=this.previousBackground.getAttribute("data-background-hash"),u=a.getAttribute("data-background-hash");if(u&&u===g&&a!==this.previousBackground){this.element.classList.add("no-transition");let d=a.querySelector("video"),p=this.previousBackground.querySelector("video");if(d&&p){let f=d.parentNode;p.parentNode.appendChild(d),f.appendChild(p)}}}let r=a!==this.previousBackground;if(r&&this.previousBackground&&this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground,{unloadIframes:!this.Reveal.slideContent.shouldPreload(this.previousBackground)}),r&&a){this.Reveal.slideContent.startEmbeddedContent(a);let g=a.querySelector(".slide-background-content");if(g){let u=g.style.backgroundImage||"";/\.gif/i.test(u)&&(g.style.backgroundImage="",window.getComputedStyle(g).opacity,g.style.backgroundImage=u)}this.previousBackground=a}n&&this.bubbleSlideContrastClassToElement(n,this.Reveal.getRevealElement()),setTimeout(()=>{this.element.classList.remove("no-transition")},10)}updateParallax(){let t=this.Reveal.getIndices();if(this.Reveal.getConfig().parallaxBackgroundImage){let e,n,i=this.Reveal.getHorizontalSlides(),a=this.Reveal.getVerticalSlides(),s=this.element.style.backgroundSize.split(" ");s.length===1?e=n=parseInt(s[0],10):(e=parseInt(s[0],10),n=parseInt(s[1],10));let o,r,g=this.element.offsetWidth,u=i.length;o=typeof this.Reveal.getConfig().parallaxBackgroundHorizontal=="number"?this.Reveal.getConfig().parallaxBackgroundHorizontal:u>1?(e-g)/(u-1):0,r=o*t.h*-1;let d,p,f=this.element.offsetHeight,C=a.length;d=typeof this.Reveal.getConfig().parallaxBackgroundVertical=="number"?this.Reveal.getConfig().parallaxBackgroundVertical:(n-f)/(C-1),p=C>0?d*t.v:0,this.element.style.backgroundPosition=r+"px "+-p+"px"}}destroy(){this.element.remove()}},an=0,oe=class{constructor(t){this.Reveal=t}run(t,e){this.reset();let n=this.Reveal.getSlides(),i=n.indexOf(e),a=n.indexOf(t);if(t&&e&&t.hasAttribute("data-auto-animate")&&e.hasAttribute("data-auto-animate")&&t.getAttribute("data-auto-animate-id")===e.getAttribute("data-auto-animate-id")&&!(i>a?e:t).hasAttribute("data-auto-animate-restart")){this.autoAnimateStyleSheet=this.autoAnimateStyleSheet||ne();let s=this.getAutoAnimateOptions(e);t.dataset.autoAnimate="pending",e.dataset.autoAnimate="pending",s.slideDirection=i>a?"forward":"backward";let o=t.style.display==="none";o&&(t.style.display=this.Reveal.getConfig().display);let r=this.getAutoAnimatableElements(t,e).map(g=>this.autoAnimateElements(g.from,g.to,g.options||{},s,an++));if(o&&(t.style.display="none"),e.dataset.autoAnimateUnmatched!=="false"&&this.Reveal.getConfig().autoAnimateUnmatched===!0){let g=.8*s.duration,u=.2*s.duration;this.getUnmatchedAutoAnimateElements(e).forEach(d=>{let p=this.getAutoAnimateOptions(d,s),f="unmatched";p.duration===s.duration&&p.delay===s.delay||(f="unmatched-"+an++,r.push(`[data-auto-animate="running"] [data-auto-animate-target="${f}"] { transition: opacity ${p.duration}s ease ${p.delay}s; }`)),d.dataset.autoAnimateTarget=f},this),r.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${g}s ease ${u}s; }`)}this.autoAnimateStyleSheet.innerHTML=r.join(""),requestAnimationFrame(()=>{this.autoAnimateStyleSheet&&(getComputedStyle(this.autoAnimateStyleSheet).fontWeight,e.dataset.autoAnimate="running")}),this.Reveal.dispatchEvent({type:"autoanimate",data:{fromSlide:t,toSlide:e,sheet:this.autoAnimateStyleSheet}})}}reset(){E(this.Reveal.getRevealElement(),'[data-auto-animate]:not([data-auto-animate=""])').forEach(t=>{t.dataset.autoAnimate=""}),E(this.Reveal.getRevealElement(),"[data-auto-animate-target]").forEach(t=>{delete t.dataset.autoAnimateTarget}),this.autoAnimateStyleSheet&&this.autoAnimateStyleSheet.parentNode&&(this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet),this.autoAnimateStyleSheet=null)}autoAnimateElements(t,e,n,i,a){t.dataset.autoAnimateTarget="",e.dataset.autoAnimateTarget=a;let s=this.getAutoAnimateOptions(e,i);n.delay!==void 0&&(s.delay=n.delay),n.duration!==void 0&&(s.duration=n.duration),n.easing!==void 0&&(s.easing=n.easing);let o=this.getAutoAnimatableProperties("from",t,n),r=this.getAutoAnimatableProperties("to",e,n);if(e.classList.contains("fragment")&&delete r.styles.opacity,n.translate!==!1||n.scale!==!1){let d=this.Reveal.getScale(),p={x:(o.x-r.x)/d,y:(o.y-r.y)/d,scaleX:o.width/r.width,scaleY:o.height/r.height};p.x=Math.round(1e3*p.x)/1e3,p.y=Math.round(1e3*p.y)/1e3,p.scaleX=Math.round(1e3*p.scaleX)/1e3,p.scaleX=Math.round(1e3*p.scaleX)/1e3;let f=n.translate!==!1&&(p.x!==0||p.y!==0),C=n.scale!==!1&&(p.scaleX!==0||p.scaleY!==0);if(f||C){let h=[];f&&h.push(`translate(${p.x}px, ${p.y}px)`),C&&h.push(`scale(${p.scaleX}, ${p.scaleY})`),o.styles.transform=h.join(" "),o.styles["transform-origin"]="top left",r.styles.transform="none"}}for(let d in r.styles){let p=r.styles[d],f=o.styles[d];p===f?delete r.styles[d]:(p.explicitValue===!0&&(r.styles[d]=p.value),f.explicitValue===!0&&(o.styles[d]=f.value))}let g="",u=Object.keys(r.styles);return u.length>0&&(o.styles.transition="none",r.styles.transition=`all ${s.duration}s ${s.easing} ${s.delay}s`,r.styles["transition-property"]=u.join(", "),r.styles["will-change"]=u.join(", "),g='[data-auto-animate-target="'+a+'"] {'+Object.keys(o.styles).map(d=>d+": "+o.styles[d]+" !important;").join("")+'}[data-auto-animate="running"] [data-auto-animate-target="'+a+'"] {'+Object.keys(r.styles).map(d=>d+": "+r.styles[d]+" !important;").join("")+"}"),g}getAutoAnimateOptions(t,e){let n={easing:this.Reveal.getConfig().autoAnimateEasing,duration:this.Reveal.getConfig().autoAnimateDuration,delay:0};if(n=yt(n,e),t.parentNode){let i=K(t.parentNode,"[data-auto-animate-target]");i&&(n=this.getAutoAnimateOptions(i,n))}return t.dataset.autoAnimateEasing&&(n.easing=t.dataset.autoAnimateEasing),t.dataset.autoAnimateDuration&&(n.duration=parseFloat(t.dataset.autoAnimateDuration)),t.dataset.autoAnimateDelay&&(n.delay=parseFloat(t.dataset.autoAnimateDelay)),n}getAutoAnimatableProperties(t,e,n){let i=this.Reveal.getConfig(),a={styles:[]};if(n.translate!==!1||n.scale!==!1){let o;if(typeof n.measure=="function")o=n.measure(e);else if(i.center)o=e.getBoundingClientRect();else{let r=this.Reveal.getScale();o={x:e.offsetLeft*r,y:e.offsetTop*r,width:e.offsetWidth*r,height:e.offsetHeight*r}}a.x=o.x,a.y=o.y,a.width=o.width,a.height=o.height}let s=getComputedStyle(e);return(n.styles||i.autoAnimateStyles).forEach(o=>{let r;typeof o=="string"&&(o={property:o}),o.from!==void 0&&t==="from"?r={value:o.from,explicitValue:!0}:o.to!==void 0&&t==="to"?r={value:o.to,explicitValue:!0}:(o.property==="line-height"&&(r=parseFloat(s["line-height"])/parseFloat(s["font-size"])),isNaN(r)&&(r=s[o.property])),r!==""&&(a.styles[o.property]=r)}),a}getAutoAnimatableElements(t,e){let n=(typeof this.Reveal.getConfig().autoAnimateMatcher=="function"?this.Reveal.getConfig().autoAnimateMatcher:this.getAutoAnimatePairs).call(this,t,e),i=[];return n.filter((a,s)=>{if(i.indexOf(a.to)===-1)return i.push(a.to),!0})}getAutoAnimatePairs(t,e){let n=[],i="h1, h2, h3, h4, h5, h6, p, li";return this.findAutoAnimateMatches(n,t,e,"[data-id]",a=>a.nodeName+":::"+a.getAttribute("data-id")),this.findAutoAnimateMatches(n,t,e,i,a=>a.nodeName+":::"+a.textContent.trim()),this.findAutoAnimateMatches(n,t,e,"img, video, iframe",a=>a.nodeName+":::"+(a.getAttribute("src")||a.getAttribute("data-src"))),this.findAutoAnimateMatches(n,t,e,"pre",a=>a.nodeName+":::"+a.textContent.trim()),n.forEach(a=>{Ht(a.from,i)?a.options={scale:!1}:Ht(a.from,"pre")&&(a.options={scale:!1,styles:["width","height"]},this.findAutoAnimateMatches(n,a.from,a.to,".hljs .hljs-ln-code",s=>s.textContent,{scale:!1,styles:[],measure:this.getLocalBoundingBox.bind(this)}),this.findAutoAnimateMatches(n,a.from,a.to,".hljs .hljs-ln-numbers[data-line-number]",s=>s.getAttribute("data-line-number"),{scale:!1,styles:["width"],measure:this.getLocalBoundingBox.bind(this)}))},this),n}getLocalBoundingBox(t){let e=this.Reveal.getScale();return{x:Math.round(t.offsetLeft*e*100)/100,y:Math.round(t.offsetTop*e*100)/100,width:Math.round(t.offsetWidth*e*100)/100,height:Math.round(t.offsetHeight*e*100)/100}}findAutoAnimateMatches(t,e,n,i,a,s){let o={},r={};[].slice.call(e.querySelectorAll(i)).forEach((g,u)=>{let d=a(g);typeof d=="string"&&d.length&&(o[d]=o[d]||[],o[d].push(g))}),[].slice.call(n.querySelectorAll(i)).forEach((g,u)=>{let d=a(g),p;if(r[d]=r[d]||[],r[d].push(g),o[d]){let f=r[d].length-1,C=o[d].length-1;o[d][f]?(p=o[d][f],o[d][f]=null):o[d][C]&&(p=o[d][C],o[d][C]=null)}p&&t.push({from:p,to:g,options:s})})}getUnmatchedAutoAnimateElements(t){return[].slice.call(t.children).reduce((e,n)=>{let i=n.querySelector("[data-auto-animate-target]");return n.hasAttribute("data-auto-animate-target")||i||e.push(n),n.querySelector("[data-auto-animate-target]")&&(e=e.concat(this.getUnmatchedAutoAnimateElements(n))),e},[])}},le=class{constructor(t){this.Reveal=t,this.active=!1,this.activatedCallbacks=[],this.onScroll=this.onScroll.bind(this)}activate(){if(this.active)return;let t=this.Reveal.getState();this.active=!0,this.slideHTMLBeforeActivation=this.Reveal.getSlidesElement().innerHTML;let e=E(this.Reveal.getRevealElement(),ot),n=E(this.Reveal.getRevealElement(),".backgrounds>.slide-background"),i;this.viewportElement.classList.add("loading-scroll-mode","reveal-scroll");let a=window.getComputedStyle(this.viewportElement);a&&a.background&&(i=a.background);let s=[],o=e[0].parentNode,r,g=(u,d,p,f)=>{let C;if(r&&this.Reveal.shouldAutoAnimateBetween(r,u))C=document.createElement("div"),C.className="scroll-page-content scroll-auto-animate-page",C.style.display="none",r.closest(".scroll-page-content").parentNode.appendChild(C);else{let h=document.createElement("div");if(h.className="scroll-page",s.push(h),f&&n.length>d){let x=n[d],D=window.getComputedStyle(x);D&&D.background?h.style.background=D.background:i&&(h.style.background=i)}else i&&(h.style.background=i);let q=document.createElement("div");q.className="scroll-page-sticky",h.appendChild(q),C=document.createElement("div"),C.className="scroll-page-content",q.appendChild(C)}C.appendChild(u),u.classList.remove("past","future"),u.setAttribute("data-index-h",d),u.setAttribute("data-index-v",p),u.slideBackgroundElement&&(u.slideBackgroundElement.remove("past","future"),C.insertBefore(u.slideBackgroundElement,u)),r=u};e.forEach((u,d)=>{this.Reveal.isVerticalStack(u)?u.querySelectorAll("section").forEach((p,f)=>{g(p,d,f,!0)}):g(u,d,0)},this),this.createProgressBar(),E(this.Reveal.getRevealElement(),".stack").forEach(u=>u.remove()),s.forEach(u=>o.appendChild(u)),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.layout(),this.Reveal.setState(t),this.activatedCallbacks.forEach(u=>u()),this.activatedCallbacks=[],this.restoreScrollPosition(),this.viewportElement.classList.remove("loading-scroll-mode"),this.viewportElement.addEventListener("scroll",this.onScroll,{passive:!0})}deactivate(){if(!this.active)return;let t=this.Reveal.getState();this.active=!1,this.viewportElement.removeEventListener("scroll",this.onScroll),this.viewportElement.classList.remove("reveal-scroll"),this.removeProgressBar(),this.Reveal.getSlidesElement().innerHTML=this.slideHTMLBeforeActivation,this.Reveal.sync(),this.Reveal.setState(t),this.slideHTMLBeforeActivation=null}toggle(t){typeof t=="boolean"?t?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}createProgressBar(){this.progressBar=document.createElement("div"),this.progressBar.className="scrollbar",this.progressBarInner=document.createElement("div"),this.progressBarInner.className="scrollbar-inner",this.progressBar.appendChild(this.progressBarInner),this.progressBarPlayhead=document.createElement("div"),this.progressBarPlayhead.className="scrollbar-playhead",this.progressBarInner.appendChild(this.progressBarPlayhead),this.viewportElement.insertBefore(this.progressBar,this.viewportElement.firstChild);let t=n=>{let i=(n.clientY-this.progressBarInner.getBoundingClientRect().top)/this.progressBarHeight;i=Math.max(Math.min(i,1),0),this.viewportElement.scrollTop=i*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight)},e=n=>{this.draggingProgressBar=!1,this.showProgressBar(),document.removeEventListener("mousemove",t),document.removeEventListener("mouseup",e)};this.progressBarInner.addEventListener("mousedown",n=>{n.preventDefault(),this.draggingProgressBar=!0,document.addEventListener("mousemove",t),document.addEventListener("mouseup",e),t(n)})}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null)}layout(){this.isActive()&&(this.syncPages(),this.syncScrollPosition())}syncPages(){let t=this.Reveal.getConfig(),e=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),n=this.Reveal.getScale(),i=t.scrollLayout==="compact",a=this.viewportElement.offsetHeight,s=e.height*n,o=i?s:a;this.scrollTriggerHeight=i?s:a,this.viewportElement.style.setProperty("--page-height",o+"px"),this.viewportElement.style.scrollSnapType=typeof t.scrollSnap=="string"?`y ${t.scrollSnap}`:"",this.slideTriggers=[];let r=Array.from(this.Reveal.getRevealElement().querySelectorAll(".scroll-page"));this.pages=r.map(g=>{let u=this.createPage({pageElement:g,slideElement:g.querySelector("section"),stickyElement:g.querySelector(".scroll-page-sticky"),contentElement:g.querySelector(".scroll-page-content"),backgroundElement:g.querySelector(".slide-background"),autoAnimateElements:g.querySelectorAll(".scroll-auto-animate-page"),autoAnimatePages:[]});u.pageElement.style.setProperty("--slide-height",t.center===!0?"auto":e.height+"px"),this.slideTriggers.push({page:u,activate:()=>this.activatePage(u),deactivate:()=>this.deactivatePage(u)}),this.createFragmentTriggersForPage(u),u.autoAnimateElements.length>0&&this.createAutoAnimateTriggersForPage(u);let d=Math.max(u.scrollTriggers.length-1,0);d+=u.autoAnimatePages.reduce((p,f)=>p+Math.max(f.scrollTriggers.length-1,0),u.autoAnimatePages.length),u.pageElement.querySelectorAll(".scroll-snap-point").forEach(p=>p.remove());for(let p=0;p<d+1;p++){let f=document.createElement("div");f.className="scroll-snap-point",f.style.height=this.scrollTriggerHeight+"px",f.style.scrollSnapAlign=i?"center":"start",u.pageElement.appendChild(f),p===0&&(f.style.marginTop=-this.scrollTriggerHeight+"px")}return i&&u.scrollTriggers.length>0?(u.pageHeight=a,u.pageElement.style.setProperty("--page-height",a+"px")):(u.pageHeight=o,u.pageElement.style.removeProperty("--page-height")),u.scrollPadding=this.scrollTriggerHeight*d,u.totalHeight=u.pageHeight+u.scrollPadding,u.pageElement.style.setProperty("--page-scroll-padding",u.scrollPadding+"px"),d>0?(u.stickyElement.style.position="sticky",u.stickyElement.style.top=Math.max((a-u.pageHeight)/2,0)+"px"):(u.stickyElement.style.position="relative",u.pageElement.style.scrollSnapAlign=u.pageHeight<a?"center":"start"),u}),this.setTriggerRanges(),this.viewportElement.setAttribute("data-scrollbar",t.scrollProgress),t.scrollProgress&&this.totalScrollTriggerCount>1?(this.progressBar||this.createProgressBar(),this.syncProgressBar()):this.removeProgressBar()}setTriggerRanges(){this.totalScrollTriggerCount=this.slideTriggers.reduce((e,n)=>e+Math.max(n.page.scrollTriggers.length,1),0);let t=0;this.slideTriggers.forEach((e,n)=>{e.range=[t,t+Math.max(e.page.scrollTriggers.length,1)/this.totalScrollTriggerCount];let i=(e.range[1]-e.range[0])/e.page.scrollTriggers.length;e.page.scrollTriggers.forEach((a,s)=>{a.range=[t+s*i,t+(s+1)*i]}),t=e.range[1]}),this.slideTriggers[this.slideTriggers.length-1].range[1]=1}createFragmentTriggersForPage(t,e){e=e||t.slideElement;let n=this.Reveal.fragments.sort(e.querySelectorAll(".fragment"),!0);return n.length&&(t.fragments=this.Reveal.fragments.sort(e.querySelectorAll(".fragment:not(.disabled)")),t.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(-1,t.fragments,e)}}),n.forEach((i,a)=>{t.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(a,t.fragments,e)}})})),t.scrollTriggers.length}createAutoAnimateTriggersForPage(t){t.autoAnimateElements.length>0&&this.slideTriggers.push(...Array.from(t.autoAnimateElements).map((e,n)=>{let i=this.createPage({slideElement:e.querySelector("section"),contentElement:e,backgroundElement:e.querySelector(".slide-background")});return this.createFragmentTriggersForPage(i,i.slideElement),t.autoAnimatePages.push(i),{page:i,activate:()=>this.activatePage(i),deactivate:()=>this.deactivatePage(i)}}))}createPage(t){return t.scrollTriggers=[],t.indexh=parseInt(t.slideElement.getAttribute("data-index-h"),10),t.indexv=parseInt(t.slideElement.getAttribute("data-index-v"),10),t}syncProgressBar(){this.progressBarInner.querySelectorAll(".scrollbar-slide").forEach(s=>s.remove());let t=this.viewportElement.scrollHeight,e=this.viewportElement.offsetHeight,n=e/t;this.progressBarHeight=this.progressBarInner.offsetHeight,this.playheadHeight=Math.max(n*this.progressBarHeight,8),this.progressBarScrollableHeight=this.progressBarHeight-this.playheadHeight;let i=e/t*this.progressBarHeight,a=Math.min(i/8,4);this.progressBarPlayhead.style.height=this.playheadHeight-a+"px",i>6?this.slideTriggers.forEach(s=>{let{page:o}=s;o.progressBarSlide=document.createElement("div"),o.progressBarSlide.className="scrollbar-slide",o.progressBarSlide.style.top=s.range[0]*this.progressBarHeight+"px",o.progressBarSlide.style.height=(s.range[1]-s.range[0])*this.progressBarHeight-a+"px",o.progressBarSlide.classList.toggle("has-triggers",o.scrollTriggers.length>0),this.progressBarInner.appendChild(o.progressBarSlide),o.scrollTriggerElements=o.scrollTriggers.map((r,g)=>{let u=document.createElement("div");return u.className="scrollbar-trigger",u.style.top=(r.range[0]-s.range[0])*this.progressBarHeight+"px",u.style.height=(r.range[1]-r.range[0])*this.progressBarHeight-a+"px",o.progressBarSlide.appendChild(u),g===0&&(u.style.display="none"),u})}):this.pages.forEach(s=>s.progressBarSlide=null)}syncScrollPosition(){let t=this.viewportElement.offsetHeight,e=t/this.viewportElement.scrollHeight,n=this.viewportElement.scrollTop,i=this.viewportElement.scrollHeight-t,a=Math.max(Math.min(n/i,1),0),s=Math.max(Math.min((n+t/2)/this.viewportElement.scrollHeight,1),0),o;this.slideTriggers.forEach(r=>{let{page:g}=r;a>=r.range[0]-2*e&&a<=r.range[1]+2*e&&!g.loaded?(g.loaded=!0,this.Reveal.slideContent.load(g.slideElement)):g.loaded&&(g.loaded=!1,this.Reveal.slideContent.unload(g.slideElement)),a>=r.range[0]&&a<=r.range[1]?(this.activateTrigger(r),o=r.page):r.active&&this.deactivateTrigger(r)}),o&&o.scrollTriggers.forEach(r=>{s>=r.range[0]&&s<=r.range[1]?this.activateTrigger(r):r.active&&this.deactivateTrigger(r)}),this.setProgressBarValue(n/(this.viewportElement.scrollHeight-t))}setProgressBarValue(t){this.progressBar&&(this.progressBarPlayhead.style.transform=`translateY(${t*this.progressBarScrollableHeight}px)`,this.getAllPages().filter(e=>e.progressBarSlide).forEach(e=>{e.progressBarSlide.classList.toggle("active",e.active===!0),e.scrollTriggers.forEach((n,i)=>{e.scrollTriggerElements[i].classList.toggle("active",e.active===!0&&n.active===!0)})}),this.showProgressBar())}showProgressBar(){this.progressBar.classList.add("visible"),clearTimeout(this.hideProgressBarTimeout),this.Reveal.getConfig().scrollProgress!=="auto"||this.draggingProgressBar||(this.hideProgressBarTimeout=setTimeout(()=>{this.progressBar&&this.progressBar.classList.remove("visible")},500))}prev(){this.viewportElement.scrollTop-=this.scrollTriggerHeight}next(){this.viewportElement.scrollTop+=this.scrollTriggerHeight}scrollToSlide(t){if(this.active){let e=this.getScrollTriggerBySlide(t);e&&(this.viewportElement.scrollTop=e.range[0]*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight))}else this.activatedCallbacks.push(()=>this.scrollToSlide(t))}storeScrollPosition(){clearTimeout(this.storeScrollPositionTimeout),this.storeScrollPositionTimeout=setTimeout(()=>{sessionStorage.setItem("reveal-scroll-top",this.viewportElement.scrollTop),sessionStorage.setItem("reveal-scroll-origin",location.origin+location.pathname),this.storeScrollPositionTimeout=null},50)}restoreScrollPosition(){let t=sessionStorage.getItem("reveal-scroll-top"),e=sessionStorage.getItem("reveal-scroll-origin");t&&e===location.origin+location.pathname&&(this.viewportElement.scrollTop=parseInt(t,10))}activatePage(t){if(!t.active){t.active=!0;let{slideElement:e,backgroundElement:n,contentElement:i,indexh:a,indexv:s}=t;i.style.display="block",e.classList.add("present"),n&&n.classList.add("present"),this.Reveal.setCurrentScrollPage(e,a,s),this.Reveal.backgrounds.bubbleSlideContrastClassToElement(e,this.viewportElement),Array.from(i.parentNode.querySelectorAll(".scroll-page-content")).forEach(o=>{o!==i&&(o.style.display="none")})}}deactivatePage(t){t.active&&(t.active=!1,t.slideElement&&t.slideElement.classList.remove("present"),t.backgroundElement&&t.backgroundElement.classList.remove("present"))}activateTrigger(t){t.active||(t.active=!0,t.activate())}deactivateTrigger(t){t.active&&(t.active=!1,t.deactivate&&t.deactivate())}getSlideByIndices(t,e){let n=this.getAllPages().find(i=>i.indexh===t&&i.indexv===e);return n?n.slideElement:null}getScrollTriggerBySlide(t){return this.slideTriggers.find(e=>e.page.slideElement===t)}getAllPages(){return this.pages.flatMap(t=>[t,...t.autoAnimatePages||[]])}onScroll(){this.syncScrollPosition(),this.storeScrollPosition()}get viewportElement(){return this.Reveal.getViewportElement()}},de=class{constructor(t){this.Reveal=t}async activate(){let t=this.Reveal.getConfig(),e=E(this.Reveal.getRevealElement(),ht),n=t.slideNumber&&/all|print/i.test(t.showSlideNumber),i=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),a=Math.floor(i.width*(1+t.margin)),s=Math.floor(i.height*(1+t.margin)),o=i.width,r=i.height;await new Promise(requestAnimationFrame),ne("@page{size:"+a+"px "+s+"px; margin: 0px;}"),ne(".reveal section>img, .reveal section>video, .reveal section>iframe{max-width: "+o+"px; max-height:"+r+"px}"),document.documentElement.classList.add("reveal-print","print-pdf"),document.body.style.width=a+"px",document.body.style.height=s+"px";let g=this.Reveal.getViewportElement(),u;if(g){let h=window.getComputedStyle(g);h&&h.background&&(u=h.background)}await new Promise(requestAnimationFrame),this.Reveal.layoutSlideContents(o,r),await new Promise(requestAnimationFrame);let d=e.map(h=>h.scrollHeight),p=[],f=e[0].parentNode,C=1;e.forEach(function(h,q){if(h.classList.contains("stack")===!1){let x=(a-o)/2,D=(s-r)/2,Y=d[q],M=Math.max(Math.ceil(Y/s),1);M=Math.min(M,t.pdfMaxPagesPerSlide),(M===1&&t.center||h.classList.contains("center"))&&(D=Math.max((s-Y)/2,0));let A=document.createElement("div");if(p.push(A),A.className="pdf-page",A.style.height=(s+t.pdfPageHeightOffset)*M+"px",u&&(A.style.background=u),A.appendChild(h),h.style.left=x+"px",h.style.top=D+"px",h.style.width=o+"px",this.Reveal.slideContent.layout(h),h.slideBackgroundElement&&A.insertBefore(h.slideBackgroundElement,h),t.showNotes){let S=this.Reveal.getSlideNotes(h);if(S){let U=typeof t.showNotes=="string"?t.showNotes:"inline",P=document.createElement("div");P.classList.add("speaker-notes"),P.classList.add("speaker-notes-pdf"),P.setAttribute("data-layout",U),P.innerHTML=S,U==="separate-page"?p.push(P):(P.style.left="8px",P.style.bottom="8px",P.style.width=a-2*8+"px",A.appendChild(P))}}if(n){let S=document.createElement("div");S.classList.add("slide-number"),S.classList.add("slide-number-pdf"),S.innerHTML=C++,A.appendChild(S)}if(t.pdfSeparateFragments){let S=this.Reveal.fragments.sort(A.querySelectorAll(".fragment"),!0),z;S.forEach(function(U,P){z&&z.forEach(function(T){T.classList.remove("current-fragment")}),U.forEach(function(T){T.classList.add("visible","current-fragment")},this);let v=A.cloneNode(!0);if(n){let T=P+1;v.querySelector(".slide-number-pdf").innerHTML+="."+T}p.push(v),z=U},this),S.forEach(function(U){U.forEach(function(P){P.classList.remove("visible","current-fragment")})})}else E(A,".fragment:not(.fade-out)").forEach(function(S){S.classList.add("visible")})}},this),await new Promise(requestAnimationFrame),p.forEach(h=>f.appendChild(h)),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.dispatchEvent({type:"pdf-ready"}),g.classList.remove("loading-scroll-mode")}isActive(){return this.Reveal.getConfig().view==="print"}},ce=class{constructor(t){this.Reveal=t}configure(t,e){t.fragments===!1?this.disable():e.fragments===!1&&this.enable()}disable(){E(this.Reveal.getSlidesElement(),".fragment").forEach(t=>{t.classList.add("visible"),t.classList.remove("current-fragment")})}enable(){E(this.Reveal.getSlidesElement(),".fragment").forEach(t=>{t.classList.remove("visible"),t.classList.remove("current-fragment")})}availableRoutes(){let t=this.Reveal.getCurrentSlide();if(t&&this.Reveal.getConfig().fragments){let e=t.querySelectorAll(".fragment:not(.disabled)"),n=t.querySelectorAll(".fragment:not(.disabled):not(.visible)");return{prev:e.length-n.length>0,next:!!n.length}}return{prev:!1,next:!1}}sort(t,e=!1){t=Array.from(t);let n=[],i=[],a=[];t.forEach(o=>{if(o.hasAttribute("data-fragment-index")){let r=parseInt(o.getAttribute("data-fragment-index"),10);n[r]||(n[r]=[]),n[r].push(o)}else i.push([o])}),n=n.concat(i);let s=0;return n.forEach(o=>{o.forEach(r=>{a.push(r),r.setAttribute("data-fragment-index",s)}),s++}),e===!0?n:a}sortAll(){this.Reveal.getHorizontalSlides().forEach(t=>{let e=E(t,"section");e.forEach((n,i)=>{this.sort(n.querySelectorAll(".fragment"))},this),e.length===0&&this.sort(t.querySelectorAll(".fragment"))})}update(t,e,n=this.Reveal.getCurrentSlide()){let i={shown:[],hidden:[]};if(n&&this.Reveal.getConfig().fragments&&(e=e||this.sort(n.querySelectorAll(".fragment"))).length){let a=0;if(typeof t!="number"){let s=this.sort(n.querySelectorAll(".fragment.visible")).pop();s&&(t=parseInt(s.getAttribute("data-fragment-index")||0,10))}Array.from(e).forEach((s,o)=>{if(s.hasAttribute("data-fragment-index")&&(o=parseInt(s.getAttribute("data-fragment-index"),10)),a=Math.max(a,o),o<=t){let r=s.classList.contains("visible");s.classList.add("visible"),s.classList.remove("current-fragment"),o===t&&(this.Reveal.announceStatus(this.Reveal.getStatusText(s)),s.classList.add("current-fragment"),this.Reveal.slideContent.startEmbeddedContent(s)),r||(i.shown.push(s),this.Reveal.dispatchEvent({target:s,type:"visible",bubbles:!1}))}else{let r=s.classList.contains("visible");s.classList.remove("visible"),s.classList.remove("current-fragment"),r&&(this.Reveal.slideContent.stopEmbeddedContent(s),i.hidden.push(s),this.Reveal.dispatchEvent({target:s,type:"hidden",bubbles:!1}))}}),t=typeof t=="number"?t:-1,t=Math.max(Math.min(t,a),-1),n.setAttribute("data-fragment",t)}return i.hidden.length&&this.Reveal.dispatchEvent({type:"fragmenthidden",data:{fragment:i.hidden[0],fragments:i.hidden}}),i.shown.length&&this.Reveal.dispatchEvent({type:"fragmentshown",data:{fragment:i.shown[0],fragments:i.shown}}),i}sync(t=this.Reveal.getCurrentSlide()){return this.sort(t.querySelectorAll(".fragment"))}goto(t,e=0){let n=this.Reveal.getCurrentSlide();if(n&&this.Reveal.getConfig().fragments){let i=this.sort(n.querySelectorAll(".fragment:not(.disabled)"));if(i.length){if(typeof t!="number"){let s=this.sort(n.querySelectorAll(".fragment:not(.disabled).visible")).pop();t=s?parseInt(s.getAttribute("data-fragment-index")||0,10):-1}t+=e;let a=this.update(t,i);return this.Reveal.controls.update(),this.Reveal.progress.update(),this.Reveal.getConfig().fragmentInURL&&this.Reveal.location.writeURL(),!(!a.shown.length&&!a.hidden.length)}}return!1}next(){return this.goto(null,1)}prev(){return this.goto(null,-1)}},he=class{constructor(t){this.Reveal=t,this.active=!1,this.onSlideClicked=this.onSlideClicked.bind(this)}activate(){if(this.Reveal.getConfig().overview&&!this.Reveal.isScrollView()&&!this.isActive()){this.active=!0,this.Reveal.getRevealElement().classList.add("overview"),this.Reveal.cancelAutoSlide(),this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()),E(this.Reveal.getRevealElement(),ht).forEach(i=>{i.classList.contains("stack")||i.addEventListener("click",this.onSlideClicked,!0)});let t=70,e=this.Reveal.getComputedSlideSize();this.overviewSlideWidth=e.width+t,this.overviewSlideHeight=e.height+t,this.Reveal.getConfig().rtl&&(this.overviewSlideWidth=-this.overviewSlideWidth),this.Reveal.updateSlidesVisibility(),this.layout(),this.update(),this.Reveal.layout();let n=this.Reveal.getIndices();this.Reveal.dispatchEvent({type:"overviewshown",data:{indexh:n.h,indexv:n.v,currentSlide:this.Reveal.getCurrentSlide()}})}}layout(){this.Reveal.getHorizontalSlides().forEach((t,e)=>{t.setAttribute("data-index-h",e),lt(t,"translate3d("+e*this.overviewSlideWidth+"px, 0, 0)"),t.classList.contains("stack")&&E(t,"section").forEach((n,i)=>{n.setAttribute("data-index-h",e),n.setAttribute("data-index-v",i),lt(n,"translate3d(0, "+i*this.overviewSlideHeight+"px, 0)")})}),Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((t,e)=>{lt(t,"translate3d("+e*this.overviewSlideWidth+"px, 0, 0)"),E(t,".slide-background").forEach((n,i)=>{lt(n,"translate3d(0, "+i*this.overviewSlideHeight+"px, 0)")})})}update(){let t=Math.min(window.innerWidth,window.innerHeight),e=Math.max(t/5,150)/t,n=this.Reveal.getIndices();this.Reveal.transformSlides({overview:["scale("+e+")","translateX("+-n.h*this.overviewSlideWidth+"px)","translateY("+-n.v*this.overviewSlideHeight+"px)"].join(" ")})}deactivate(){if(this.Reveal.getConfig().overview){this.active=!1,this.Reveal.getRevealElement().classList.remove("overview"),this.Reveal.getRevealElement().classList.add("overview-deactivating"),setTimeout(()=>{this.Reveal.getRevealElement().classList.remove("overview-deactivating")},1),this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()),E(this.Reveal.getRevealElement(),ht).forEach(e=>{lt(e,""),e.removeEventListener("click",this.onSlideClicked,!0)}),E(this.Reveal.getBackgroundsElement(),".slide-background").forEach(e=>{lt(e,"")}),this.Reveal.transformSlides({overview:""});let t=this.Reveal.getIndices();this.Reveal.slide(t.h,t.v),this.Reveal.layout(),this.Reveal.cueAutoSlide(),this.Reveal.dispatchEvent({type:"overviewhidden",data:{indexh:t.h,indexv:t.v,currentSlide:this.Reveal.getCurrentSlide()}})}}toggle(t){typeof t=="boolean"?t?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}onSlideClicked(t){if(this.isActive()){t.preventDefault();let e=t.target;for(;e&&!e.nodeName.match(/section/gi);)e=e.parentNode;if(e&&!e.classList.contains("disabled")&&(this.deactivate(),e.nodeName.match(/section/gi))){let n=parseInt(e.getAttribute("data-index-h"),10),i=parseInt(e.getAttribute("data-index-v"),10);this.Reveal.slide(n,i)}}}},ue=class{constructor(t){this.Reveal=t,this.shortcuts={},this.bindings={},this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this)}configure(t,e){t.navigationMode==="linear"?(this.shortcuts["&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J"]="Next slide",this.shortcuts["&#8592;  ,  &#8593;  ,  P  ,  H  ,  K"]="Previous slide"):(this.shortcuts["N  ,  SPACE"]="Next slide",this.shortcuts["P  ,  Shift SPACE"]="Previous slide",this.shortcuts["&#8592;  ,  H"]="Navigate left",this.shortcuts["&#8594;  ,  L"]="Navigate right",this.shortcuts["&#8593;  ,  K"]="Navigate up",this.shortcuts["&#8595;  ,  J"]="Navigate down"),this.shortcuts["Alt + &#8592;/&#8593/&#8594;/&#8595;"]="Navigate without fragments",this.shortcuts["Shift + &#8592;/&#8593/&#8594;/&#8595;"]="Jump to first/last slide",this.shortcuts["B  ,  ."]="Pause",this.shortcuts.F="Fullscreen",this.shortcuts.G="Jump to slide",this.shortcuts["ESC, O"]="Slide overview"}bind(){document.addEventListener("keydown",this.onDocumentKeyDown,!1)}unbind(){document.removeEventListener("keydown",this.onDocumentKeyDown,!1)}addKeyBinding(t,e){typeof t=="object"&&t.keyCode?this.bindings[t.keyCode]={callback:e,key:t.key,description:t.description}:this.bindings[t]={callback:e,key:null,description:null}}removeKeyBinding(t){delete this.bindings[t]}triggerKey(t){this.onDocumentKeyDown({keyCode:t})}registerKeyboardShortcut(t,e){this.shortcuts[t]=e}getShortcuts(){return this.shortcuts}getBindings(){return this.bindings}onDocumentKeyDown(t){let e=this.Reveal.getConfig();if(typeof e.keyboardCondition=="function"&&e.keyboardCondition(t)===!1||e.keyboardCondition==="focused"&&!this.Reveal.isFocused())return!0;let n=t.keyCode,i=!this.Reveal.isAutoSliding();this.Reveal.onUserInput(t);let a=document.activeElement&&document.activeElement.isContentEditable===!0,s=document.activeElement&&document.activeElement.tagName&&/input|textarea/i.test(document.activeElement.tagName),o=document.activeElement&&document.activeElement.className&&/speaker-notes/i.test(document.activeElement.className),r=!([32,37,38,39,40,63,78,80,191].indexOf(t.keyCode)!==-1&&t.shiftKey||t.altKey)&&(t.shiftKey||t.altKey||t.ctrlKey||t.metaKey);if(a||s||o||r)return;let g,u=[66,86,190,191,112];if(typeof e.keyboard=="object")for(g in e.keyboard)e.keyboard[g]==="togglePause"&&u.push(parseInt(g,10));if(this.Reveal.isOverlayOpen()&&!["Escape","f","c","b","."].includes(t.key)||this.Reveal.isPaused()&&u.indexOf(n)===-1)return!1;let d=e.navigationMode==="linear"||!this.Reveal.hasHorizontalSlides()||!this.Reveal.hasVerticalSlides(),p=!1;if(typeof e.keyboard=="object"){for(g in e.keyboard)if(parseInt(g,10)===n){let f=e.keyboard[g];typeof f=="function"?f.apply(null,[t]):typeof f=="string"&&typeof this.Reveal[f]=="function"&&this.Reveal[f].call(),p=!0}}if(p===!1){for(g in this.bindings)if(parseInt(g,10)===n){let f=this.bindings[g].callback;typeof f=="function"?f.apply(null,[t]):typeof f=="string"&&typeof this.Reveal[f]=="function"&&this.Reveal[f].call(),p=!0}}p===!1&&(p=!0,n===80||n===33?this.Reveal.prev({skipFragments:t.altKey}):n===78||n===34?this.Reveal.next({skipFragments:t.altKey}):n===72||n===37?t.shiftKey?this.Reveal.slide(0):!this.Reveal.overview.isActive()&&d?e.rtl?this.Reveal.next({skipFragments:t.altKey}):this.Reveal.prev({skipFragments:t.altKey}):this.Reveal.left({skipFragments:t.altKey}):n===76||n===39?t.shiftKey?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):!this.Reveal.overview.isActive()&&d?e.rtl?this.Reveal.prev({skipFragments:t.altKey}):this.Reveal.next({skipFragments:t.altKey}):this.Reveal.right({skipFragments:t.altKey}):n===75||n===38?t.shiftKey?this.Reveal.slide(void 0,0):!this.Reveal.overview.isActive()&&d?this.Reveal.prev({skipFragments:t.altKey}):this.Reveal.up({skipFragments:t.altKey}):n===74||n===40?t.shiftKey?this.Reveal.slide(void 0,Number.MAX_VALUE):!this.Reveal.overview.isActive()&&d?this.Reveal.next({skipFragments:t.altKey}):this.Reveal.down({skipFragments:t.altKey}):n===36?this.Reveal.slide(0):n===35?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):n===32?(this.Reveal.overview.isActive()&&this.Reveal.overview.deactivate(),t.shiftKey?this.Reveal.prev({skipFragments:t.altKey}):this.Reveal.next({skipFragments:t.altKey})):[58,59,66,86,190].includes(n)||n===191&&!t.shiftKey?this.Reveal.togglePause():n===70?dn(e.embedded?this.Reveal.getViewportElement():document.documentElement):n===65?e.autoSlideStoppable&&this.Reveal.toggleAutoSlide(i):n===71?e.jumpToSlide&&this.Reveal.toggleJumpToSlide():n===67&&this.Reveal.isOverlayOpen()?this.Reveal.closeOverlay():n!==63&&n!==191||!t.shiftKey?n===112?this.Reveal.toggleHelp():p=!1:this.Reveal.toggleHelp()),p?t.preventDefault&&t.preventDefault():n!==27&&n!==79||(this.Reveal.closeOverlay()===!1&&this.Reveal.overview.toggle(),t.preventDefault&&t.preventDefault()),this.Reveal.cueAutoSlide()}},pe=class{MAX_REPLACE_STATE_FREQUENCY=300;constructor(t){this.Reveal=t,this.writeURLTimeout=0,this.replaceStateTimestamp=0,this.onWindowHashChange=this.onWindowHashChange.bind(this)}bind(){window.addEventListener("hashchange",this.onWindowHashChange,!1)}unbind(){window.removeEventListener("hashchange",this.onWindowHashChange,!1)}getIndicesFromHash(t=window.location.hash,e={}){let n=t.replace(/^#\/?/,""),i=n.split("/");if(/^[0-9]*$/.test(i[0])||!n.length){let a=this.Reveal.getConfig(),s,o=a.hashOneBasedIndex||e.oneBasedIndex?1:0,r=parseInt(i[0],10)-o||0,g=parseInt(i[1],10)-o||0;return a.fragmentInURL&&(s=parseInt(i[2],10),isNaN(s)&&(s=void 0)),{h:r,v:g,f:s}}{let a,s;/\/[-\d]+$/g.test(n)&&(s=parseInt(n.split("/").pop(),10),s=isNaN(s)?void 0:s,n=n.split("/").shift());try{a=document.getElementById(decodeURIComponent(n)).closest(".slides section")}catch{}if(a)return{...this.Reveal.getIndices(a),f:s}}return null}readURL(){let t=this.Reveal.getIndices(),e=this.getIndicesFromHash();e?e.h===t.h&&e.v===t.v&&e.f===void 0||this.Reveal.slide(e.h,e.v,e.f):this.Reveal.slide(t.h||0,t.v||0)}writeURL(t){let e=this.Reveal.getConfig(),n=this.Reveal.getCurrentSlide();if(clearTimeout(this.writeURLTimeout),typeof t=="number")this.writeURLTimeout=setTimeout(this.writeURL,t);else if(n){let i=this.getHash();e.history?window.location.hash=i:e.hash&&(i==="/"?this.debouncedReplaceState(window.location.pathname+window.location.search):this.debouncedReplaceState("#"+i))}}replaceState(t){window.history.replaceState(null,null,t),this.replaceStateTimestamp=Date.now()}debouncedReplaceState(t){clearTimeout(this.replaceStateTimeout),Date.now()-this.replaceStateTimestamp>this.MAX_REPLACE_STATE_FREQUENCY?this.replaceState(t):this.replaceStateTimeout=setTimeout(()=>this.replaceState(t),this.MAX_REPLACE_STATE_FREQUENCY)}getHash(t){let e="/",n=t||this.Reveal.getCurrentSlide(),i=n?n.getAttribute("id"):null;i&&(i=encodeURIComponent(i));let a=this.Reveal.getIndices(t);if(this.Reveal.getConfig().fragmentInURL||(a.f=void 0),typeof i=="string"&&i.length)e="/"+i,a.f>=0&&(e+="/"+a.f);else{let s=this.Reveal.getConfig().hashOneBasedIndex?1:0;(a.h>0||a.v>0||a.f>=0)&&(e+=a.h+s),(a.v>0||a.f>=0)&&(e+="/"+(a.v+s)),a.f>=0&&(e+="/"+a.f)}return e}onWindowHashChange(t){this.readURL()}},ge=class{constructor(t){this.Reveal=t,this.onNavigateLeftClicked=this.onNavigateLeftClicked.bind(this),this.onNavigateRightClicked=this.onNavigateRightClicked.bind(this),this.onNavigateUpClicked=this.onNavigateUpClicked.bind(this),this.onNavigateDownClicked=this.onNavigateDownClicked.bind(this),this.onNavigatePrevClicked=this.onNavigatePrevClicked.bind(this),this.onNavigateNextClicked=this.onNavigateNextClicked.bind(this),this.onEnterFullscreen=this.onEnterFullscreen.bind(this)}render(){let t=this.Reveal.getConfig().rtl,e=this.Reveal.getRevealElement();this.element=document.createElement("aside"),this.element.className="controls",this.element.innerHTML=`<button class="navigate-left" aria-label="${t?"next slide":"previous slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="${t?"previous slide":"next slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`,this.Reveal.getRevealElement().appendChild(this.element),this.controlsLeft=E(e,".navigate-left"),this.controlsRight=E(e,".navigate-right"),this.controlsUp=E(e,".navigate-up"),this.controlsDown=E(e,".navigate-down"),this.controlsPrev=E(e,".navigate-prev"),this.controlsNext=E(e,".navigate-next"),this.controlsFullscreen=E(e,".enter-fullscreen"),this.controlsRightArrow=this.element.querySelector(".navigate-right"),this.controlsLeftArrow=this.element.querySelector(".navigate-left"),this.controlsDownArrow=this.element.querySelector(".navigate-down")}configure(t,e){this.element.style.display=t.controls&&(t.controls!=="speaker-only"||this.Reveal.isSpeakerNotes())?"block":"none",this.element.setAttribute("data-controls-layout",t.controlsLayout),this.element.setAttribute("data-controls-back-arrows",t.controlsBackArrows)}bind(){let t=["touchstart","click"];hn&&(t=["touchstart"]),t.forEach(e=>{this.controlsLeft.forEach(n=>n.addEventListener(e,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(n=>n.addEventListener(e,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(n=>n.addEventListener(e,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(n=>n.addEventListener(e,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(n=>n.addEventListener(e,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(n=>n.addEventListener(e,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(n=>n.addEventListener(e,this.onEnterFullscreen,!1))})}unbind(){["touchstart","click"].forEach(t=>{this.controlsLeft.forEach(e=>e.removeEventListener(t,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(e=>e.removeEventListener(t,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(e=>e.removeEventListener(t,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(e=>e.removeEventListener(t,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(e=>e.removeEventListener(t,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(e=>e.removeEventListener(t,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(e=>e.removeEventListener(t,this.onEnterFullscreen,!1))})}update(){let t=this.Reveal.availableRoutes();[...this.controlsLeft,...this.controlsRight,...this.controlsUp,...this.controlsDown,...this.controlsPrev,...this.controlsNext].forEach(n=>{n.classList.remove("enabled","fragmented"),n.setAttribute("disabled","disabled")}),t.left&&this.controlsLeft.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),t.right&&this.controlsRight.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),t.up&&this.controlsUp.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),t.down&&this.controlsDown.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),(t.left||t.up)&&this.controlsPrev.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),(t.right||t.down)&&this.controlsNext.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")});let e=this.Reveal.getCurrentSlide();if(e){let n=this.Reveal.fragments.availableRoutes();n.prev&&this.controlsPrev.forEach(s=>{s.classList.add("fragmented","enabled"),s.removeAttribute("disabled")}),n.next&&this.controlsNext.forEach(s=>{s.classList.add("fragmented","enabled"),s.removeAttribute("disabled")});let i=this.Reveal.isVerticalSlide(e),a=i&&e.parentElement&&e.parentElement.querySelectorAll(":scope > section").length>1;i&&a?(n.prev&&this.controlsUp.forEach(s=>{s.classList.add("fragmented","enabled"),s.removeAttribute("disabled")}),n.next&&this.controlsDown.forEach(s=>{s.classList.add("fragmented","enabled"),s.removeAttribute("disabled")})):(n.prev&&this.controlsLeft.forEach(s=>{s.classList.add("fragmented","enabled"),s.removeAttribute("disabled")}),n.next&&this.controlsRight.forEach(s=>{s.classList.add("fragmented","enabled"),s.removeAttribute("disabled")}))}if(this.Reveal.getConfig().controlsTutorial){let n=this.Reveal.getIndices();!this.Reveal.hasNavigatedVertically()&&t.down?this.controlsDownArrow.classList.add("highlight"):(this.controlsDownArrow.classList.remove("highlight"),this.Reveal.getConfig().rtl?!this.Reveal.hasNavigatedHorizontally()&&t.left&&n.v===0?this.controlsLeftArrow.classList.add("highlight"):this.controlsLeftArrow.classList.remove("highlight"):!this.Reveal.hasNavigatedHorizontally()&&t.right&&n.v===0?this.controlsRightArrow.classList.add("highlight"):this.controlsRightArrow.classList.remove("highlight"))}}destroy(){this.unbind(),this.element.remove()}onNavigateLeftClicked(t){t.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode==="linear"?this.Reveal.prev():this.Reveal.left()}onNavigateRightClicked(t){t.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode==="linear"?this.Reveal.next():this.Reveal.right()}onNavigateUpClicked(t){t.preventDefault(),this.Reveal.onUserInput(),this.Reveal.up()}onNavigateDownClicked(t){t.preventDefault(),this.Reveal.onUserInput(),this.Reveal.down()}onNavigatePrevClicked(t){t.preventDefault(),this.Reveal.onUserInput(),this.Reveal.prev()}onNavigateNextClicked(t){t.preventDefault(),this.Reveal.onUserInput(),this.Reveal.next()}onEnterFullscreen(t){let e=this.Reveal.getConfig(),n=this.Reveal.getViewportElement();dn(e.embedded?n:n.parentElement)}},me=class{constructor(t){this.Reveal=t,this.onProgressClicked=this.onProgressClicked.bind(this)}render(){this.element=document.createElement("div"),this.element.className="progress",this.Reveal.getRevealElement().appendChild(this.element),this.bar=document.createElement("span"),this.element.appendChild(this.bar)}configure(t,e){this.element.style.display=t.progress?"block":"none"}bind(){this.Reveal.getConfig().progress&&this.element&&this.element.addEventListener("click",this.onProgressClicked,!1)}unbind(){this.Reveal.getConfig().progress&&this.element&&this.element.removeEventListener("click",this.onProgressClicked,!1)}update(){if(this.Reveal.getConfig().progress&&this.bar){let t=this.Reveal.getProgress();this.Reveal.getTotalSlides()<2&&(t=0),this.bar.style.transform="scaleX("+t+")"}}getMaxWidth(){return this.Reveal.getRevealElement().offsetWidth}onProgressClicked(t){this.Reveal.onUserInput(t),t.preventDefault();let e=this.Reveal.getSlides(),n=e.length,i=Math.floor(t.clientX/this.getMaxWidth()*n);this.Reveal.getConfig().rtl&&(i=n-i);let a=this.Reveal.getIndices(e[i]);this.Reveal.slide(a.h,a.v)}destroy(){this.element.remove()}},ve=class{constructor(t){this.Reveal=t,this.lastMouseWheelStep=0,this.cursorHidden=!1,this.cursorInactiveTimeout=0,this.onDocumentCursorActive=this.onDocumentCursorActive.bind(this),this.onDocumentMouseScroll=this.onDocumentMouseScroll.bind(this)}configure(t,e){t.mouseWheel?document.addEventListener("wheel",this.onDocumentMouseScroll,!1):document.removeEventListener("wheel",this.onDocumentMouseScroll,!1),t.hideInactiveCursor?(document.addEventListener("mousemove",this.onDocumentCursorActive,!1),document.addEventListener("mousedown",this.onDocumentCursorActive,!1)):(this.showCursor(),document.removeEventListener("mousemove",this.onDocumentCursorActive,!1),document.removeEventListener("mousedown",this.onDocumentCursorActive,!1))}showCursor(){this.cursorHidden&&(this.cursorHidden=!1,this.Reveal.getRevealElement().style.cursor="")}hideCursor(){this.cursorHidden===!1&&(this.cursorHidden=!0,this.Reveal.getRevealElement().style.cursor="none")}destroy(){this.showCursor(),document.removeEventListener("wheel",this.onDocumentMouseScroll,!1),document.removeEventListener("mousemove",this.onDocumentCursorActive,!1),document.removeEventListener("mousedown",this.onDocumentCursorActive,!1)}onDocumentCursorActive(t){this.showCursor(),clearTimeout(this.cursorInactiveTimeout),this.cursorInactiveTimeout=setTimeout(this.hideCursor.bind(this),this.Reveal.getConfig().hideCursorTime)}onDocumentMouseScroll(t){if(Date.now()-this.lastMouseWheelStep>1e3){this.lastMouseWheelStep=Date.now();let e=t.detail||-t.wheelDelta;e>0?this.Reveal.next():e<0&&this.Reveal.prev()}}},rn=(c,t)=>{let e=document.createElement("script");e.type="text/javascript",e.async=!1,e.defer=!1,e.src=c,typeof t=="function"&&(e.onload=e.onreadystatechange=i=>{(i.type==="load"||/loaded|complete/.test(e.readyState))&&(e.onload=e.onreadystatechange=e.onerror=null,t())},e.onerror=i=>{e.onload=e.onreadystatechange=e.onerror=null,t(new Error("Failed loading script: "+e.src+`
`+i))});let n=document.querySelector("head");n.insertBefore(e,n.lastChild)},fe=class{constructor(t){this.Reveal=t,this.state="idle",this.registeredPlugins={},this.asyncDependencies=[]}load(t,e){return this.state="loading",t.forEach(this.registerPlugin.bind(this)),new Promise(n=>{let i=[],a=0;if(e.forEach(s=>{s.condition&&!s.condition()||(s.async?this.asyncDependencies.push(s):i.push(s))}),i.length){a=i.length;let s=o=>{o&&typeof o.callback=="function"&&o.callback(),--a==0&&this.initPlugins().then(n)};i.forEach(o=>{typeof o.id=="string"?(this.registerPlugin(o),s(o)):typeof o.src=="string"?rn(o.src,()=>s(o)):(console.warn("Unrecognized plugin format",o),s())})}else this.initPlugins().then(n)})}initPlugins(){return new Promise(t=>{let e=Object.values(this.registeredPlugins),n=e.length;if(n===0)this.loadAsync().then(t);else{let i,a=()=>{--n==0?this.loadAsync().then(t):i()},s=0;i=()=>{let o=e[s++];if(typeof o.init=="function"){let r=o.init(this.Reveal);r&&typeof r.then=="function"?r.then(a):a()}else a()},i()}})}loadAsync(){return this.state="loaded",this.asyncDependencies.length&&this.asyncDependencies.forEach(t=>{rn(t.src,t.callback)}),Promise.resolve()}registerPlugin(t){arguments.length===2&&typeof arguments[0]=="string"?(t=arguments[1]).id=arguments[0]:typeof t=="function"&&(t=t());let e=t.id;typeof e!="string"?console.warn("Unrecognized plugin format; can't find plugin.id",t):this.registeredPlugins[e]===void 0?(this.registeredPlugins[e]=t,this.state==="loaded"&&typeof t.init=="function"&&t.init(this.Reveal)):console.warn('reveal.js: "'+e+'" plugin has already been registered')}hasPlugin(t){return!!this.registeredPlugins[t]}getPlugin(t){return this.registeredPlugins[t]}getRegisteredPlugins(){return this.registeredPlugins}destroy(){Object.values(this.registeredPlugins).forEach(t=>{typeof t.destroy=="function"&&t.destroy()}),this.registeredPlugins={},this.asyncDependencies=[]}},ye=class{constructor(t){this.Reveal=t,this.onSlidesClicked=this.onSlidesClicked.bind(this),this.iframeTriggerSelector=null,this.mediaTriggerSelector="[data-preview-image], [data-preview-video]",this.stateProps=["previewIframe","previewImage","previewVideo","previewFit"],this.state={}}update(){this.Reveal.getConfig().previewLinks?this.iframeTriggerSelector="a[href]:not([data-preview-link=false]), [data-preview-link]:not(a):not([data-preview-link=false])":this.iframeTriggerSelector="[data-preview-link]:not([data-preview-link=false])";let t=this.Reveal.getSlidesElement().querySelectorAll(this.iframeTriggerSelector).length>0,e=this.Reveal.getSlidesElement().querySelectorAll(this.mediaTriggerSelector).length>0;t||e?this.Reveal.getSlidesElement().addEventListener("click",this.onSlidesClicked,!1):this.Reveal.getSlidesElement().removeEventListener("click",this.onSlidesClicked,!1)}createOverlay(t){this.dom=document.createElement("div"),this.dom.classList.add("r-overlay"),this.dom.classList.add(t),this.viewport=document.createElement("div"),this.viewport.classList.add("r-overlay-viewport"),this.dom.appendChild(this.viewport),this.Reveal.getRevealElement().appendChild(this.dom)}previewIframe(t){this.close(),this.state={previewIframe:t},this.createOverlay("r-overlay-preview"),this.dom.dataset.state="loading",this.viewport.innerHTML=`<header class="r-overlay-header">
				<a class="r-overlay-button r-overlay-external" href="${t}" target="_blank"><span class="icon"></span></a>
				<button class="r-overlay-button r-overlay-close"><span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content">
				<iframe src="${t}"></iframe>
				<small class="r-overlay-content-inner">
					<span class="r-overlay-error x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`,this.dom.querySelector("iframe").addEventListener("load",e=>{this.dom.dataset.state="loaded"},!1),this.dom.querySelector(".r-overlay-close").addEventListener("click",e=>{this.close(),e.preventDefault()},!1),this.dom.querySelector(".r-overlay-external").addEventListener("click",e=>{this.close()},!1),this.Reveal.dispatchEvent({type:"previewiframe",data:{url:t}})}previewMedia(t,e,n){if(e!=="image"&&e!=="video")return void console.warn("Please specify a valid media type to preview (image|video)");this.close(),n=n||"scale-down",this.createOverlay("r-overlay-preview"),this.dom.dataset.state="loading",this.dom.dataset.previewFit=n,this.viewport.innerHTML=`<header class="r-overlay-header">
				<button class="r-overlay-button r-overlay-close">Esc <span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content"></div>`;let i=this.dom.querySelector(".r-overlay-content");if(e==="image"){this.state={previewImage:t,previewFit:n};let a=document.createElement("img",{});a.src=t,i.appendChild(a),a.addEventListener("load",()=>{this.dom.dataset.state="loaded"},!1),a.addEventListener("error",()=>{this.dom.dataset.state="error",i.innerHTML='<span class="r-overlay-error">Unable to load image.</span>'},!1),this.dom.style.cursor="zoom-out",this.dom.addEventListener("click",s=>{this.close()},!1),this.Reveal.dispatchEvent({type:"previewimage",data:{url:t}})}else{if(e!=="video")throw new Error("Please specify a valid media type to preview");{this.state={previewVideo:t,previewFit:n};let a=document.createElement("video");a.autoplay=this.dom.dataset.previewAutoplay!=="false",a.controls=this.dom.dataset.previewControls!=="false",a.loop=this.dom.dataset.previewLoop==="true",a.muted=this.dom.dataset.previewMuted==="true",a.playsInline=!0,a.src=t,i.appendChild(a),a.addEventListener("loadeddata",()=>{this.dom.dataset.state="loaded"},!1),a.addEventListener("error",()=>{this.dom.dataset.state="error",i.innerHTML='<span class="r-overlay-error">Unable to load video.</span>'},!1),this.Reveal.dispatchEvent({type:"previewvideo",data:{url:t}})}}this.dom.querySelector(".r-overlay-close").addEventListener("click",a=>{this.close(),a.preventDefault()},!1)}previewImage(t,e){this.previewMedia(t,"image",e)}previewVideo(t,e){this.previewMedia(t,"video",e)}toggleHelp(t){typeof t=="boolean"?t?this.showHelp():this.close():this.dom?this.close():this.showHelp()}showHelp(){if(this.Reveal.getConfig().help){this.close(),this.createOverlay("r-overlay-help");let t='<p class="title">Keyboard Shortcuts</p>',e=this.Reveal.keyboard.getShortcuts(),n=this.Reveal.keyboard.getBindings();t+="<table><th>KEY</th><th>ACTION</th>";for(let i in e)t+=`<tr><td>${i}</td><td>${e[i]}</td></tr>`;for(let i in n)n[i].key&&n[i].description&&(t+=`<tr><td>${n[i].key}</td><td>${n[i].description}</td></tr>`);t+="</table>",this.viewport.innerHTML=`
				<header class="r-overlay-header">
					<button class="r-overlay-button r-overlay-close">Esc <span class="icon"></span></button>
				</header>
				<div class="r-overlay-content">
					<div class="r-overlay-help-content">${t}</div>
				</div>
			`,this.dom.querySelector(".r-overlay-close").addEventListener("click",i=>{this.close(),i.preventDefault()},!1),this.Reveal.dispatchEvent({type:"showhelp"})}}isOpen(){return!!this.dom}close(){return!!this.dom&&(this.dom.remove(),this.dom=null,this.state={},this.Reveal.dispatchEvent({type:"closeoverlay"}),!0)}getState(){return this.state}setState(t){this.stateProps.every(e=>this.state[e]===t[e])||(t.previewIframe?this.previewIframe(t.previewIframe):t.previewImage?this.previewImage(t.previewImage,t.previewFit):t.previewVideo?this.previewVideo(t.previewVideo,t.previewFit):this.close())}onSlidesClicked(t){let e=t.target,n=e.closest(this.iframeTriggerSelector),i=e.closest(this.mediaTriggerSelector);if(n){if(t.metaKey||t.shiftKey||t.altKey)return;let a=n.getAttribute("href")||n.getAttribute("data-preview-link");a&&(this.previewIframe(a),t.preventDefault())}else if(i){if(i.hasAttribute("data-preview-image")){let a=i.dataset.previewImage||i.getAttribute("src");a&&(this.previewImage(a,i.dataset.previewFit),t.preventDefault())}else if(i.hasAttribute("data-preview-video")){let a=i.dataset.previewVideo||i.getAttribute("src");if(!a){let s=i.querySelector("source");s&&(a=s.getAttribute("src"))}a&&(this.previewVideo(a,i.dataset.previewFit),t.preventDefault())}}}destroy(){this.close()}},be=class{constructor(t){this.Reveal=t,this.touchStartX=0,this.touchStartY=0,this.touchStartCount=0,this.touchCaptured=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this)}bind(){let t=this.Reveal.getRevealElement();"onpointerdown"in window?(t.addEventListener("pointerdown",this.onPointerDown,!1),t.addEventListener("pointermove",this.onPointerMove,!1),t.addEventListener("pointerup",this.onPointerUp,!1)):window.navigator.msPointerEnabled?(t.addEventListener("MSPointerDown",this.onPointerDown,!1),t.addEventListener("MSPointerMove",this.onPointerMove,!1),t.addEventListener("MSPointerUp",this.onPointerUp,!1)):(t.addEventListener("touchstart",this.onTouchStart,!1),t.addEventListener("touchmove",this.onTouchMove,!1),t.addEventListener("touchend",this.onTouchEnd,!1))}unbind(){let t=this.Reveal.getRevealElement();t.removeEventListener("pointerdown",this.onPointerDown,!1),t.removeEventListener("pointermove",this.onPointerMove,!1),t.removeEventListener("pointerup",this.onPointerUp,!1),t.removeEventListener("MSPointerDown",this.onPointerDown,!1),t.removeEventListener("MSPointerMove",this.onPointerMove,!1),t.removeEventListener("MSPointerUp",this.onPointerUp,!1),t.removeEventListener("touchstart",this.onTouchStart,!1),t.removeEventListener("touchmove",this.onTouchMove,!1),t.removeEventListener("touchend",this.onTouchEnd,!1)}isSwipePrevented(t){if(Ht(t,"video[controls], audio[controls]"))return!0;for(;t&&typeof t.hasAttribute=="function";){if(t.hasAttribute("data-prevent-swipe"))return!0;t=t.parentNode}return!1}onTouchStart(t){if(this.touchCaptured=!1,this.isSwipePrevented(t.target))return!0;this.touchStartX=t.touches[0].clientX,this.touchStartY=t.touches[0].clientY,this.touchStartCount=t.touches.length}onTouchMove(t){if(this.isSwipePrevented(t.target))return!0;let e=this.Reveal.getConfig();if(this.touchCaptured)hn&&t.preventDefault();else{this.Reveal.onUserInput(t);let n=t.touches[0].clientX,i=t.touches[0].clientY;if(t.touches.length===1&&this.touchStartCount!==2){let a=this.Reveal.availableRoutes({includeFragments:!0}),s=n-this.touchStartX,o=i-this.touchStartY;s>40&&Math.abs(s)>Math.abs(o)?(this.touchCaptured=!0,e.navigationMode==="linear"?e.rtl?this.Reveal.next():this.Reveal.prev():this.Reveal.left()):s<-40&&Math.abs(s)>Math.abs(o)?(this.touchCaptured=!0,e.navigationMode==="linear"?e.rtl?this.Reveal.prev():this.Reveal.next():this.Reveal.right()):o>40&&a.up?(this.touchCaptured=!0,e.navigationMode==="linear"?this.Reveal.prev():this.Reveal.up()):o<-40&&a.down&&(this.touchCaptured=!0,e.navigationMode==="linear"?this.Reveal.next():this.Reveal.down()),e.embedded?(this.touchCaptured||this.Reveal.isVerticalSlide())&&t.preventDefault():t.preventDefault()}}}onTouchEnd(t){this.touchCaptured=!1}onPointerDown(t){t.pointerType!==t.MSPOINTER_TYPE_TOUCH&&t.pointerType!=="touch"||(t.touches=[{clientX:t.clientX,clientY:t.clientY}],this.onTouchStart(t))}onPointerMove(t){t.pointerType!==t.MSPOINTER_TYPE_TOUCH&&t.pointerType!=="touch"||(t.touches=[{clientX:t.clientX,clientY:t.clientY}],this.onTouchMove(t))}onPointerUp(t){t.pointerType!==t.MSPOINTER_TYPE_TOUCH&&t.pointerType!=="touch"||(t.touches=[{clientX:t.clientX,clientY:t.clientY}],this.onTouchEnd(t))}},ee="focus",on="blur",we=class{constructor(t){this.Reveal=t,this.onRevealPointerDown=this.onRevealPointerDown.bind(this),this.onDocumentPointerDown=this.onDocumentPointerDown.bind(this)}configure(t,e){t.embedded?this.blur():(this.focus(),this.unbind())}bind(){this.Reveal.getConfig().embedded&&this.Reveal.getRevealElement().addEventListener("pointerdown",this.onRevealPointerDown,!1)}unbind(){this.Reveal.getRevealElement().removeEventListener("pointerdown",this.onRevealPointerDown,!1),document.removeEventListener("pointerdown",this.onDocumentPointerDown,!1)}focus(){this.state!==ee&&(this.Reveal.getRevealElement().classList.add("focused"),document.addEventListener("pointerdown",this.onDocumentPointerDown,!1)),this.state=ee}blur(){this.state!==on&&(this.Reveal.getRevealElement().classList.remove("focused"),document.removeEventListener("pointerdown",this.onDocumentPointerDown,!1)),this.state=on}isFocused(){return this.state===ee}destroy(){this.Reveal.getRevealElement().classList.remove("focused")}onRevealPointerDown(t){this.focus()}onDocumentPointerDown(t){let e=K(t.target,".reveal");e&&e===this.Reveal.getRevealElement()||this.blur()}},ke=class{constructor(t){this.Reveal=t}render(){this.element=document.createElement("div"),this.element.className="speaker-notes",this.element.setAttribute("data-prevent-swipe",""),this.element.setAttribute("tabindex","0"),this.Reveal.getRevealElement().appendChild(this.element)}configure(t,e){t.showNotes&&this.element.setAttribute("data-layout",typeof t.showNotes=="string"?t.showNotes:"inline")}update(){this.Reveal.getConfig().showNotes&&this.element&&this.Reveal.getCurrentSlide()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()&&(this.element.innerHTML=this.getSlideNotes()||'<span class="notes-placeholder">No notes on this slide.</span>')}updateVisibility(){this.Reveal.getConfig().showNotes&&this.hasNotes()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()?this.Reveal.getRevealElement().classList.add("show-notes"):this.Reveal.getRevealElement().classList.remove("show-notes")}hasNotes(){return this.Reveal.getSlidesElement().querySelectorAll("[data-notes], aside.notes").length>0}isSpeakerNotesWindow(){return!!window.location.search.match(/receiver/gi)}getSlideNotes(t=this.Reveal.getCurrentSlide()){if(t.hasAttribute("data-notes"))return t.getAttribute("data-notes");let e=t.querySelectorAll("aside.notes");return e?Array.from(e).map(n=>n.innerHTML).join(`
`):null}destroy(){this.element.remove()}},Se=class{constructor(t,e){this.diameter=100,this.diameter2=this.diameter/2,this.thickness=6,this.playing=!1,this.progress=0,this.progressOffset=1,this.container=t,this.progressCheck=e,this.canvas=document.createElement("canvas"),this.canvas.className="playback",this.canvas.width=this.diameter,this.canvas.height=this.diameter,this.canvas.style.width=this.diameter2+"px",this.canvas.style.height=this.diameter2+"px",this.context=this.canvas.getContext("2d"),this.container.appendChild(this.canvas),this.render()}setPlaying(t){let e=this.playing;this.playing=t,!e&&this.playing?this.animate():this.render()}animate(){let t=this.progress;this.progress=this.progressCheck(),t>.8&&this.progress<.2&&(this.progressOffset=this.progress),this.render(),this.playing&&requestAnimationFrame(this.animate.bind(this))}render(){let t=this.playing?this.progress:0,e=this.diameter2-this.thickness,n=this.diameter2,i=this.diameter2,a=28;this.progressOffset+=.1*(1-this.progressOffset);let s=-Math.PI/2+t*(2*Math.PI),o=-Math.PI/2+this.progressOffset*(2*Math.PI);this.context.save(),this.context.clearRect(0,0,this.diameter,this.diameter),this.context.beginPath(),this.context.arc(n,i,e+4,0,2*Math.PI,!1),this.context.fillStyle="rgba( 0, 0, 0, 0.4 )",this.context.fill(),this.context.beginPath(),this.context.arc(n,i,e,0,2*Math.PI,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle="rgba( 255, 255, 255, 0.2 )",this.context.stroke(),this.playing&&(this.context.beginPath(),this.context.arc(n,i,e,o,s,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle="#fff",this.context.stroke()),this.context.translate(n-14,i-14),this.playing?(this.context.fillStyle="#fff",this.context.fillRect(0,0,10,a),this.context.fillRect(18,0,10,a)):(this.context.beginPath(),this.context.translate(4,0),this.context.moveTo(0,0),this.context.lineTo(24,14),this.context.lineTo(0,a),this.context.fillStyle="#fff",this.context.fill()),this.context.restore()}on(t,e){this.canvas.addEventListener(t,e,!1)}off(t,e){this.canvas.removeEventListener(t,e,!1)}destroy(){this.playing=!1,this.canvas.parentNode&&this.container.removeChild(this.canvas)}},Nn={width:960,height:700,margin:.04,minScale:.2,maxScale:2,controls:!0,controlsTutorial:!0,controlsLayout:"bottom-right",controlsBackArrows:"faded",progress:!0,slideNumber:!1,showSlideNumber:"all",hashOneBasedIndex:!1,hash:!1,respondToHashChanges:!0,jumpToSlide:!0,history:!1,keyboard:!0,keyboardCondition:null,disableLayout:!1,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,navigationMode:"default",shuffle:!1,fragments:!0,fragmentInURL:!0,embedded:!1,help:!0,pause:!0,showNotes:!1,showHiddenSlides:!1,autoPlayMedia:null,preloadIframes:null,autoAnimate:!0,autoAnimateMatcher:null,autoAnimateEasing:"ease",autoAnimateDuration:1,autoAnimateUnmatched:!0,autoAnimateStyles:["opacity","color","background-color","padding","font-size","line-height","letter-spacing","border-width","border-color","border-radius","outline","outline-offset"],autoSlide:0,autoSlideStoppable:!0,autoSlideMethod:null,defaultTiming:null,mouseWheel:!1,previewLinks:!1,postMessage:!0,postMessageEvents:!1,focusBodyOnPageVisibilityChange:!0,transition:"slide",transitionSpeed:"default",backgroundTransition:"fade",parallaxBackgroundImage:"",parallaxBackgroundSize:"",parallaxBackgroundRepeat:"",parallaxBackgroundPosition:"",parallaxBackgroundHorizontal:null,parallaxBackgroundVertical:null,view:null,scrollLayout:"full",scrollSnap:"mandatory",scrollProgress:"auto",scrollActivationWidth:435,pdfMaxPagesPerSlide:Number.POSITIVE_INFINITY,pdfSeparateFragments:!0,pdfPageHeightOffset:-1,viewDistance:3,mobileViewDistance:2,display:"block",hideInactiveCursor:!0,hideCursorTime:5e3,sortFragmentsOnSync:!0,dependencies:[],plugins:[]},un="5.2.1";function pn(c,t){arguments.length<2&&(t=arguments[0],c=document.querySelector(".reveal"));let e={},n,i,a,s,o,r={},g=!1,u=!1,d={hasNavigatedHorizontally:!1,hasNavigatedVertically:!1},p=[],f=1,C={layout:"",overview:""},h={},q="idle",x=0,D=0,Y=-1,M=!1,A=new ie(e),S=new se(e),z=new ae(e),U=new oe(e),P=new re(e),v=new le(e),T=new de(e),I=new ce(e),B=new he(e),F=new ue(e),W=new pe(e),j=new ge(e),it=new me(e),xe=new ve(e),tt=new fe(e),V=new ye(e),dt=new we(e),Ft=new be(e),G=new ke(e);function Rn(){g!==!1&&(u=!0,r.showHiddenSlides||E(h.wrapper,'section[data-visibility="hidden"]').forEach(l=>{let m=l.parentNode;m.childElementCount===1&&/section/i.test(m.nodeName)?m.remove():l.remove()}),function(){h.slides.classList.add("no-transition"),bt?h.wrapper.classList.add("no-hover"):h.wrapper.classList.remove("no-hover"),P.render(),S.render(),z.render(),j.render(),it.render(),G.render(),h.pauseOverlay=((l,m,y,b="")=>{let w=l.querySelectorAll("."+y);for(let H=0;H<w.length;H++){let _=w[H];if(_.parentNode===l)return _}let N=document.createElement(m);return N.className=y,N.innerHTML=b,l.appendChild(N),N})(h.wrapper,"div","pause-overlay",r.controls?'<button class="resume-button">Resume presentation</button>':null),h.statusElement=function(){let l=h.wrapper.querySelector(".aria-status");return l||(l=document.createElement("div"),l.style.position="absolute",l.style.height="1px",l.style.width="1px",l.style.overflow="hidden",l.style.clip="rect( 1px, 1px, 1px, 1px )",l.classList.add("aria-status"),l.setAttribute("aria-live","polite"),l.setAttribute("aria-atomic","true"),h.wrapper.appendChild(l)),l}(),h.wrapper.setAttribute("role","application")}(),r.postMessage&&window.addEventListener("message",Je,!1),setInterval(()=>{(!v.isActive()&&h.wrapper.scrollTop!==0||h.wrapper.scrollLeft!==0)&&(h.wrapper.scrollTop=0,h.wrapper.scrollLeft=0)},1e3),document.addEventListener("fullscreenchange",zt),document.addEventListener("webkitfullscreenchange",zt),rt().forEach(l=>{E(l,"section").forEach((m,y)=>{y>0&&(m.classList.remove("present"),m.classList.remove("past"),m.classList.add("future"),m.setAttribute("aria-hidden","true"))})}),Ee(),P.update(!0),function(){let l=r.view==="print",m=r.view==="scroll"||r.view==="reader";(l||m)&&(l?Lt():Ft.unbind(),h.viewport.classList.add("loading-scroll-mode"),l?document.readyState==="complete"?T.activate():window.addEventListener("load",()=>T.activate()):v.activate())}(),W.readURL(),setTimeout(()=>{h.slides.classList.remove("no-transition"),h.wrapper.classList.add("ready"),Q({type:"ready",data:{indexh:n,indexv:i,currentSlide:s}})},1))}function Ut(l){h.statusElement.textContent=l}function Rt(l){let m="";if(l.nodeType===3)m+=l.textContent;else if(l.nodeType===1){let y=l.getAttribute("aria-hidden"),b=window.getComputedStyle(l).display==="none";y==="true"||b||Array.from(l.childNodes).forEach(w=>{m+=Rt(w)})}return m=m.trim(),m===""?"":m+" "}function Ee(l){let m={...r};if(typeof l=="object"&&yt(r,l),e.isReady()===!1)return;let y=h.wrapper.querySelectorAll(ht).length;h.wrapper.classList.remove(m.transition),h.wrapper.classList.add(r.transition),h.wrapper.setAttribute("data-transition-speed",r.transitionSpeed),h.wrapper.setAttribute("data-background-transition",r.backgroundTransition),h.viewport.style.setProperty("--slide-width",typeof r.width=="string"?r.width:r.width+"px"),h.viewport.style.setProperty("--slide-height",typeof r.height=="string"?r.height:r.height+"px"),r.shuffle&&Kt(),Gt(h.wrapper,"embedded",r.embedded),Gt(h.wrapper,"rtl",r.rtl),Gt(h.wrapper,"center",r.center),r.pause===!1&&kt(),U.reset(),o&&(o.destroy(),o=null),y>1&&r.autoSlide&&r.autoSlideStoppable&&(o=new Se(h.wrapper,()=>Math.min(Math.max((Date.now()-Y)/x,0),1)),o.on("click",Ln),M=!1),r.navigationMode!=="default"?h.wrapper.setAttribute("data-navigation-mode",r.navigationMode):h.wrapper.removeAttribute("data-navigation-mode"),G.configure(r,m),dt.configure(r,m),xe.configure(r,m),j.configure(r,m),it.configure(r,m),F.configure(r,m),I.configure(r,m),S.configure(r,m),$e()}function Ae(){window.addEventListener("resize",Ge,!1),r.touch&&Ft.bind(),r.keyboard&&F.bind(),r.progress&&it.bind(),r.respondToHashChanges&&W.bind(),j.bind(),dt.bind(),h.slides.addEventListener("click",Qe,!1),h.slides.addEventListener("transitionend",Ze,!1),h.pauseOverlay.addEventListener("click",kt,!1),r.focusBodyOnPageVisibilityChange&&document.addEventListener("visibilitychange",tn,!1)}function Lt(){Ft.unbind(),dt.unbind(),F.unbind(),j.unbind(),it.unbind(),W.unbind(),window.removeEventListener("resize",Ge,!1),h.slides.removeEventListener("click",Qe,!1),h.slides.removeEventListener("transitionend",Ze,!1),h.pauseOverlay.removeEventListener("click",kt,!1)}function Re(l,m,y){c.addEventListener(l,m,y)}function Le(l,m,y){c.removeEventListener(l,m,y)}function Vt(l){typeof l.layout=="string"&&(C.layout=l.layout),typeof l.overview=="string"&&(C.overview=l.overview),C.layout?lt(h.slides,C.layout+" "+C.overview):lt(h.slides,C.overview)}function Q({target:l=h.wrapper,type:m,data:y,bubbles:b=!0}){let w=document.createEvent("HTMLEvents",1,2);return w.initEvent(m,b,!0),yt(w,y),l.dispatchEvent(w),l===h.wrapper&&Te(m),w}function Ce(l){Q({type:"slidechanged",data:{indexh:n,indexv:i,previousSlide:a,currentSlide:s,origin:l}})}function Te(l,m){if(r.postMessageEvents&&window.parent!==window.self){let y={namespace:"reveal",eventName:l,state:Xe()};yt(y,m),window.parent.postMessage(JSON.stringify(y),"*")}}function mt(){if(h.wrapper&&!T.isActive()){let l=h.viewport.offsetWidth,m=h.viewport.offsetHeight;if(!r.disableLayout){bt&&!r.embedded&&document.documentElement.style.setProperty("--vh",.01*window.innerHeight+"px");let y=v.isActive()?Ct(l,m):Ct(),b=f;Pe(r.width,r.height),h.slides.style.width=y.width+"px",h.slides.style.height=y.height+"px",f=Math.min(y.presentationWidth/y.width,y.presentationHeight/y.height),f=Math.max(f,r.minScale),f=Math.min(f,r.maxScale),f===1||v.isActive()?(h.slides.style.zoom="",h.slides.style.left="",h.slides.style.top="",h.slides.style.bottom="",h.slides.style.right="",Vt({layout:""})):(h.slides.style.zoom="",h.slides.style.left="50%",h.slides.style.top="50%",h.slides.style.bottom="auto",h.slides.style.right="auto",Vt({layout:"translate(-50%, -50%) scale("+f+")"}));let w=Array.from(h.wrapper.querySelectorAll(ht));for(let N=0,H=w.length;N<H;N++){let _=w[N];_.style.display!=="none"&&(r.center||_.classList.contains("center")?_.classList.contains("stack")?_.style.top=0:_.style.top=Math.max((y.height-_.scrollHeight)/2,0)+"px":_.style.top="")}b!==f&&Q({type:"resize",data:{oldScale:b,scale:f,size:y}})}(function(){if(h.wrapper&&!r.disableLayout&&!T.isActive()&&typeof r.scrollActivationWidth=="number"&&r.view!=="scroll"){let y=Ct();y.presentationWidth>0&&y.presentationWidth<=r.scrollActivationWidth?v.isActive()||(P.create(),v.activate()):v.isActive()&&v.deactivate()}})(),h.viewport.style.setProperty("--slide-scale",f),h.viewport.style.setProperty("--viewport-width",l+"px"),h.viewport.style.setProperty("--viewport-height",m+"px"),v.layout(),it.update(),P.updateParallax(),B.isActive()&&B.update()}}function Pe(l,m){E(h.slides,"section > .stretch, section > .r-stretch").forEach(y=>{let b=((w,N=0)=>{if(w){let H,_=w.style.height;return w.style.height="0px",w.parentNode.style.height="auto",H=N-w.parentNode.offsetHeight,w.style.height=_+"px",w.parentNode.style.removeProperty("height"),H}return N})(y,m);if(/(img|video)/gi.test(y.nodeName)){let w=y.naturalWidth||y.videoWidth,N=y.naturalHeight||y.videoHeight,H=Math.min(l/w,b/N);y.style.width=w*H+"px",y.style.height=N*H+"px"}else y.style.width=l+"px",y.style.height=b+"px"})}function Ct(l,m){let y=r.width,b=r.height;r.disableLayout&&(y=h.slides.offsetWidth,b=h.slides.offsetHeight);let w={width:y,height:b,presentationWidth:l||h.wrapper.offsetWidth,presentationHeight:m||h.wrapper.offsetHeight};return w.presentationWidth-=w.presentationWidth*r.margin,w.presentationHeight-=w.presentationHeight*r.margin,typeof w.width=="string"&&/%$/.test(w.width)&&(w.width=parseInt(w.width,10)/100*w.presentationWidth),typeof w.height=="string"&&/%$/.test(w.height)&&(w.height=parseInt(w.height,10)/100*w.presentationHeight),w}function Ie(l,m){typeof l=="object"&&typeof l.setAttribute=="function"&&l.setAttribute("data-previous-indexv",m||0)}function Ne(l){if(typeof l=="object"&&typeof l.setAttribute=="function"&&l.classList.contains("stack")){let m=l.hasAttribute("data-start-indexv")?"data-start-indexv":"data-previous-indexv";return parseInt(l.getAttribute(m)||0,10)}return 0}function wt(l=s){return l&&l.parentNode&&!!l.parentNode.nodeName.match(/section/i)}function Me(){return!(!s||!wt(s))&&!s.nextElementSibling}function ze(){return n===0&&i===0}function Wt(){return!!s&&!s.nextElementSibling&&(!wt(s)||!s.parentNode.nextElementSibling)}function Be(){if(r.pause){let l=h.wrapper.classList.contains("paused");Tt(),h.wrapper.classList.add("paused"),l===!1&&Q({type:"paused"})}}function kt(){let l=h.wrapper.classList.contains("paused");h.wrapper.classList.remove("paused"),vt(),l&&Q({type:"resumed"})}function He(l){typeof l=="boolean"?l?Be():kt():St()?kt():Be()}function St(){return h.wrapper.classList.contains("paused")}function et(l,m,y,b){if(Q({type:"beforeslidechange",data:{indexh:l===void 0?n:l,indexv:m===void 0?i:m,origin:b}}).defaultPrevented)return;a=s;let w=h.wrapper.querySelectorAll(ot);if(v.isActive()){let Z=v.getSlideByIndices(l,m);return void(Z&&v.scrollToSlide(Z))}if(w.length===0)return;m!==void 0||B.isActive()||(m=Ne(w[l])),a&&a.parentNode&&a.parentNode.classList.contains("stack")&&Ie(a.parentNode,i);let N=p.concat();p.length=0;let H=n||0,_=i||0;n=_e(ot,l===void 0?n:l),i=_e(sn,m===void 0?i:m);let at=n!==H||i!==_;at||(a=null);let ct=w[n],J=ct.querySelectorAll("section");c.classList.toggle("is-vertical-slide",J.length>1),s=J[i]||ct;let O=!1;at&&a&&s&&!B.isActive()&&(q="running",O=jt(a,s,H,_),O&&h.slides.classList.add("disable-slide-transitions")),Xt(),mt(),B.isActive()&&B.update(),y!==void 0&&I.goto(y),a&&a!==s&&(a.classList.remove("present"),a.setAttribute("aria-hidden","true"),ze()&&setTimeout(()=>{E(h.wrapper,ot+".stack").forEach(Z=>{Ie(Z,0)})},0));t:for(let Z=0,Cn=p.length;Z<Cn;Z++){for(let Bt=0;Bt<N.length;Bt++)if(N[Bt]===p[Z]){N.splice(Bt,1);continue t}h.viewport.classList.add(p[Z]),Q({type:p[Z]})}for(;N.length;)h.viewport.classList.remove(N.pop());at&&Ce(b),!at&&a||(A.stopEmbeddedContent(a),A.startEmbeddedContent(s)),requestAnimationFrame(()=>{Ut(Rt(s))}),it.update(),j.update(),G.update(),P.update(),P.updateParallax(),S.update(),I.update(),W.writeURL(),vt(),O&&(setTimeout(()=>{h.slides.classList.remove("disable-slide-transitions")},0),r.autoAnimate&&U.run(a,s))}function jt(l,m,y,b){return l.hasAttribute("data-auto-animate")&&m.hasAttribute("data-auto-animate")&&l.getAttribute("data-auto-animate-id")===m.getAttribute("data-auto-animate-id")&&!(n>y||i>b?m:l).hasAttribute("data-auto-animate-restart")}function $e(){Lt(),Ae(),mt(),x=r.autoSlide,vt(),P.create(),W.writeURL(),r.sortFragmentsOnSync===!0&&I.sortAll(),j.update(),it.update(),Xt(),G.update(),G.updateVisibility(),V.update(),P.update(!0),S.update(),A.formatEmbeddedContent(),r.autoPlayMedia===!1?A.stopEmbeddedContent(s,{unloadIframes:!1}):A.startEmbeddedContent(s),B.isActive()&&B.layout()}function Kt(l=rt()){l.forEach((m,y)=>{let b=l[Math.floor(Math.random()*l.length)];b.parentNode===m.parentNode&&m.parentNode.insertBefore(m,b);let w=m.querySelectorAll("section");w.length&&Kt(w)})}function _e(l,m){let y=E(h.wrapper,l),b=y.length,w=v.isActive()||T.isActive(),N=!1,H=!1;if(b){r.loop&&(m>=b&&(N=!0),(m%=b)<0&&(m=b+m,H=!0)),m=Math.max(Math.min(m,b-1),0);for(let J=0;J<b;J++){let O=y[J],Z=r.rtl&&!wt(O);O.classList.remove("past"),O.classList.remove("present"),O.classList.remove("future"),O.setAttribute("hidden",""),O.setAttribute("aria-hidden","true"),O.querySelector("section")&&O.classList.add("stack"),w?O.classList.add("present"):J<m?(O.classList.add(Z?"future":"past"),r.fragments&&De(O)):J>m?(O.classList.add(Z?"past":"future"),r.fragments&&qe(O)):J===m&&r.fragments&&(N?qe(O):H&&De(O))}let _=y[m],at=_.classList.contains("present");_.classList.add("present"),_.removeAttribute("hidden"),_.removeAttribute("aria-hidden"),at||Q({target:_,type:"visible",bubbles:!1});let ct=_.getAttribute("data-state");ct&&(p=p.concat(ct.split(" ")))}else m=0;return m}function De(l){E(l,".fragment").forEach(m=>{m.classList.add("visible"),m.classList.remove("current-fragment")})}function qe(l){E(l,".fragment.visible").forEach(m=>{m.classList.remove("visible","current-fragment")})}function Xt(){let l,m,y=rt(),b=y.length;if(b&&n!==void 0){let w=B.isActive()?10:r.viewDistance;bt&&(w=B.isActive()?6:r.mobileViewDistance),T.isActive()&&(w=Number.MAX_VALUE);for(let N=0;N<b;N++){let H=y[N],_=E(H,"section"),at=_.length;if(l=Math.abs((n||0)-N)||0,r.loop&&(l=Math.abs(((n||0)-N)%(b-w))||0),l<w?A.load(H):A.unload(H),at){let ct=Ne(H);for(let J=0;J<at;J++){let O=_[J];m=Math.abs(N===(n||0)?(i||0)-J:J-ct),l+m<w?A.load(O):A.unload(O)}}}We()?h.wrapper.classList.add("has-vertical-slides"):h.wrapper.classList.remove("has-vertical-slides"),Ve()?h.wrapper.classList.add("has-horizontal-slides"):h.wrapper.classList.remove("has-horizontal-slides")}}function st({includeFragments:l=!1}={}){let m=h.wrapper.querySelectorAll(ot),y=h.wrapper.querySelectorAll(sn),b={left:n>0,right:n<m.length-1,up:i>0,down:i<y.length-1};if(r.loop&&(m.length>1&&(b.left=!0,b.right=!0),y.length>1&&(b.up=!0,b.down=!0)),m.length>1&&r.navigationMode==="linear"&&(b.right=b.right||b.down,b.left=b.left||b.up),l===!0){let w=I.availableRoutes();b.left=b.left||w.prev,b.up=b.up||w.prev,b.down=b.down||w.next,b.right=b.right||w.next}if(r.rtl){let w=b.left;b.left=b.right,b.right=w}return b}function Oe(l=s){let m=rt(),y=0;t:for(let b=0;b<m.length;b++){let w=m[b],N=w.querySelectorAll("section");for(let H=0;H<N.length;H++){if(N[H]===l)break t;N[H].dataset.visibility!=="uncounted"&&y++}if(w===l)break;w.classList.contains("stack")===!1&&w.dataset.visibility!=="uncounted"&&y++}return y}function Fe(l){let m,y=n,b=i;if(l)if(v.isActive())y=parseInt(l.getAttribute("data-index-h"),10),l.getAttribute("data-index-v")&&(b=parseInt(l.getAttribute("data-index-v"),10));else{let w=wt(l),N=w?l.parentNode:l,H=rt();y=Math.max(H.indexOf(N),0),b=void 0,w&&(b=Math.max(E(l.parentNode,"section").indexOf(l),0))}if(!l&&s&&s.querySelectorAll(".fragment").length>0){let w=s.querySelector(".current-fragment");m=w&&w.hasAttribute("data-fragment-index")?parseInt(w.getAttribute("data-fragment-index"),10):s.querySelectorAll(".fragment.visible").length-1}return{h:y,v:b,f:m}}function Yt(){return E(h.wrapper,ht+':not(.stack):not([data-visibility="uncounted"])')}function rt(){return E(h.wrapper,ot)}function Ue(){return E(h.wrapper,".slides>section>section")}function Ve(){return rt().length>1}function We(){return Ue().length>1}function je(){return Yt().length}function Ke(l,m){let y=rt()[l],b=y&&y.querySelectorAll("section");return b&&b.length&&typeof m=="number"?b?b[m]:void 0:y}function Xe(){let l=Fe();return{indexh:l.h,indexv:l.v,indexf:l.f,paused:St(),overview:B.isActive(),...V.getState()}}function vt(){if(Tt(),s&&r.autoSlide!==!1){let l=s.querySelector(".current-fragment[data-autoslide]"),m=l?l.getAttribute("data-autoslide"):null,y=s.parentNode?s.parentNode.getAttribute("data-autoslide"):null,b=s.getAttribute("data-autoslide");m?x=parseInt(m,10):b?x=parseInt(b,10):y?x=parseInt(y,10):(x=r.autoSlide,s.querySelectorAll(".fragment").length===0&&E(s,"video, audio").forEach(w=>{w.hasAttribute("data-autoplay")&&x&&1e3*w.duration/w.playbackRate>x&&(x=1e3*w.duration/w.playbackRate+1e3)})),!x||M||St()||B.isActive()||Wt()&&!I.availableRoutes().next&&r.loop!==!0||(D=setTimeout(()=>{typeof r.autoSlideMethod=="function"?r.autoSlideMethod():Qt(),vt()},x),Y=Date.now()),o&&o.setPlaying(D!==-1)}}function Tt(){clearTimeout(D),D=-1}function Pt(){x&&!M&&(M=!0,Q({type:"autoslidepaused"}),clearTimeout(D),o&&o.setPlaying(!1))}function It(){x&&M&&(M=!1,Q({type:"autoslideresumed"}),vt())}function Nt({skipFragments:l=!1}={}){if(d.hasNavigatedHorizontally=!0,v.isActive())return v.prev();r.rtl?(B.isActive()||l||I.next()===!1)&&st().left&&et(n+1,r.navigationMode==="grid"?i:void 0):(B.isActive()||l||I.prev()===!1)&&st().left&&et(n-1,r.navigationMode==="grid"?i:void 0)}function Mt({skipFragments:l=!1}={}){if(d.hasNavigatedHorizontally=!0,v.isActive())return v.next();r.rtl?(B.isActive()||l||I.prev()===!1)&&st().right&&et(n-1,r.navigationMode==="grid"?i:void 0):(B.isActive()||l||I.next()===!1)&&st().right&&et(n+1,r.navigationMode==="grid"?i:void 0)}function Jt({skipFragments:l=!1}={}){if(v.isActive())return v.prev();(B.isActive()||l||I.prev()===!1)&&st().up&&et(n,i-1)}function Zt({skipFragments:l=!1}={}){if(d.hasNavigatedVertically=!0,v.isActive())return v.next();(B.isActive()||l||I.next()===!1)&&st().down&&et(n,i+1)}function Ye({skipFragments:l=!1}={}){if(v.isActive())return v.prev();if(l||I.prev()===!1)if(st().up)Jt({skipFragments:l});else{let m;if(m=r.rtl?E(h.wrapper,ot+".future").pop():E(h.wrapper,ot+".past").pop(),m&&m.classList.contains("stack")){let y=m.querySelectorAll("section").length-1||void 0;et(n-1,y)}else r.rtl?Mt({skipFragments:l}):Nt({skipFragments:l})}}function Qt({skipFragments:l=!1}={}){if(d.hasNavigatedHorizontally=!0,d.hasNavigatedVertically=!0,v.isActive())return v.next();if(l||I.next()===!1){let m=st();m.down&&m.right&&r.loop&&Me()&&(m.down=!1),m.down?Zt({skipFragments:l}):r.rtl?Nt({skipFragments:l}):Mt({skipFragments:l})}}function Je(l){let m=l.data;if(typeof m=="string"&&m.charAt(0)==="{"&&m.charAt(m.length-1)==="}"&&(m=JSON.parse(m),m.method&&typeof e[m.method]=="function"))if(In.test(m.method)===!1){let y=e[m.method].apply(e,m.args);Te("callback",{method:m.method,result:y})}else console.warn('reveal.js: "'+m.method+'" is is blacklisted from the postMessage API')}function Ze(l){q==="running"&&/section/gi.test(l.target.nodeName)&&(q="idle",Q({type:"slidetransitionend",data:{indexh:n,indexv:i,previousSlide:a,currentSlide:s}}))}function Qe(l){let m=K(l.target,'a[href^="#"]');if(m){let y=m.getAttribute("href"),b=W.getIndicesFromHash(y);b&&(e.slide(b.h,b.v,b.f),l.preventDefault())}}function Ge(l){mt()}function tn(l){document.hidden===!1&&document.activeElement!==document.body&&(typeof document.activeElement.blur=="function"&&document.activeElement.blur(),document.body.focus())}function zt(l){(document.fullscreenElement||document.webkitFullscreenElement)===h.wrapper&&(l.stopImmediatePropagation(),setTimeout(()=>{e.layout(),e.focus.focus()},1))}function Ln(l){Wt()&&r.loop===!1?(et(0,0),It()):M?It():Pt()}let en={VERSION:un,initialize:function(l){if(!c)throw'Unable to find presentation root (<div class="reveal">).';if(g)throw"Reveal.js has already been initialized.";if(g=!0,h.wrapper=c,h.slides=c.querySelector(".slides"),!h.slides)throw'Unable to find slides container (<div class="slides">).';return r={...Nn,...r,...t,...l,...nn()},/print-pdf/gi.test(window.location.search)&&(r.view="print"),function(){r.embedded===!0?h.viewport=K(c,".reveal-viewport")||c:(h.viewport=document.body,document.documentElement.classList.add("reveal-full-page")),h.viewport.classList.add("reveal-viewport")}(),window.addEventListener("load",mt,!1),tt.load(r.plugins,r.dependencies).then(Rn),new Promise(m=>e.on("ready",m))},configure:Ee,destroy:function(){g=!1,u!==!1&&(Lt(),Tt(),G.destroy(),dt.destroy(),V.destroy(),tt.destroy(),xe.destroy(),j.destroy(),it.destroy(),P.destroy(),S.destroy(),z.destroy(),document.removeEventListener("fullscreenchange",zt),document.removeEventListener("webkitfullscreenchange",zt),document.removeEventListener("visibilitychange",tn,!1),window.removeEventListener("message",Je,!1),window.removeEventListener("load",mt,!1),h.pauseOverlay&&h.pauseOverlay.remove(),h.statusElement&&h.statusElement.remove(),document.documentElement.classList.remove("reveal-full-page"),h.wrapper.classList.remove("ready","center","has-horizontal-slides","has-vertical-slides"),h.wrapper.removeAttribute("data-transition-speed"),h.wrapper.removeAttribute("data-background-transition"),h.viewport.classList.remove("reveal-viewport"),h.viewport.style.removeProperty("--slide-width"),h.viewport.style.removeProperty("--slide-height"),h.slides.style.removeProperty("width"),h.slides.style.removeProperty("height"),h.slides.style.removeProperty("zoom"),h.slides.style.removeProperty("left"),h.slides.style.removeProperty("top"),h.slides.style.removeProperty("bottom"),h.slides.style.removeProperty("right"),h.slides.style.removeProperty("transform"),Array.from(h.wrapper.querySelectorAll(ht)).forEach(l=>{l.style.removeProperty("display"),l.style.removeProperty("top"),l.removeAttribute("hidden"),l.removeAttribute("aria-hidden")}))},sync:$e,syncSlide:function(l=s){P.sync(l),I.sync(l),A.load(l),P.update(),G.update()},syncFragments:I.sync.bind(I),slide:et,left:Nt,right:Mt,up:Jt,down:Zt,prev:Ye,next:Qt,navigateLeft:Nt,navigateRight:Mt,navigateUp:Jt,navigateDown:Zt,navigatePrev:Ye,navigateNext:Qt,navigateFragment:I.goto.bind(I),prevFragment:I.prev.bind(I),nextFragment:I.next.bind(I),on:Re,off:Le,addEventListener:Re,removeEventListener:Le,layout:mt,shuffle:Kt,availableRoutes:st,availableFragments:I.availableRoutes.bind(I),toggleHelp:V.toggleHelp.bind(V),toggleOverview:B.toggle.bind(B),toggleScrollView:v.toggle.bind(v),togglePause:He,toggleAutoSlide:function(l){typeof l=="boolean"?l?It():Pt():M?It():Pt()},toggleJumpToSlide:function(l){typeof l=="boolean"?l?z.show():z.hide():z.isVisible()?z.hide():z.show()},isFirstSlide:ze,isLastSlide:Wt,isLastVerticalSlide:Me,isVerticalSlide:wt,isVerticalStack:function(l=s){return l.classList.contains(".stack")||l.querySelector("section")!==null},isPaused:St,isAutoSliding:function(){return!(!x||M)},isSpeakerNotes:G.isSpeakerNotesWindow.bind(G),isOverview:B.isActive.bind(B),isFocused:dt.isFocused.bind(dt),isOverlayOpen:V.isOpen.bind(V),isScrollView:v.isActive.bind(v),isPrintView:T.isActive.bind(T),isReady:()=>u,loadSlide:A.load.bind(A),unloadSlide:A.unload.bind(A),startEmbeddedContent:()=>A.startEmbeddedContent(s),stopEmbeddedContent:()=>A.stopEmbeddedContent(s,{unloadIframes:!1}),previewIframe:V.previewIframe.bind(V),previewImage:V.previewImage.bind(V),previewVideo:V.previewVideo.bind(V),showPreview:V.previewIframe.bind(V),hidePreview:V.close.bind(V),addEventListeners:Ae,removeEventListeners:Lt,dispatchEvent:Q,getState:Xe,setState:function(l){if(typeof l=="object"){et(ft(l.indexh),ft(l.indexv),ft(l.indexf));let m=ft(l.paused),y=ft(l.overview);typeof m=="boolean"&&m!==St()&&He(m),typeof y=="boolean"&&y!==B.isActive()&&B.toggle(y),V.setState(l)}},getProgress:function(){let l=je(),m=Oe();if(s){let y=s.querySelectorAll(".fragment");y.length>0&&(m+=s.querySelectorAll(".fragment.visible").length/y.length*.9)}return Math.min(m/(l-1),1)},getIndices:Fe,getSlidesAttributes:function(){return Yt().map(l=>{let m={};for(let y=0;y<l.attributes.length;y++){let b=l.attributes[y];m[b.name]=b.value}return m})},getSlidePastCount:Oe,getTotalSlides:je,getSlide:Ke,getPreviousSlide:()=>a,getCurrentSlide:()=>s,getSlideBackground:function(l,m){let y=typeof l=="number"?Ke(l,m):l;if(y)return y.slideBackgroundElement},getSlideNotes:G.getSlideNotes.bind(G),getSlides:Yt,getHorizontalSlides:rt,getVerticalSlides:Ue,hasHorizontalSlides:Ve,hasVerticalSlides:We,hasNavigatedHorizontally:()=>d.hasNavigatedHorizontally,hasNavigatedVertically:()=>d.hasNavigatedVertically,shouldAutoAnimateBetween:jt,addKeyBinding:F.addKeyBinding.bind(F),removeKeyBinding:F.removeKeyBinding.bind(F),triggerKey:F.triggerKey.bind(F),registerKeyboardShortcut:F.registerKeyboardShortcut.bind(F),getComputedSlideSize:Ct,setCurrentScrollPage:function(l,m,y){let b=n||0;n=m,i=y;let w=s!==l;a=s,s=l,s&&a&&r.autoAnimate&&jt(a,s,b,i)&&U.run(a,s),w&&(a&&(A.stopEmbeddedContent(a),A.stopEmbeddedContent(a.slideBackgroundElement)),A.startEmbeddedContent(s),A.startEmbeddedContent(s.slideBackgroundElement)),requestAnimationFrame(()=>{Ut(Rt(s))}),Ce()},getScale:()=>f,getConfig:()=>r,getQueryHash:nn,getSlidePath:W.getHash.bind(W),getRevealElement:()=>c,getSlidesElement:()=>h.slides,getViewportElement:()=>h.viewport,getBackgroundsElement:()=>P.element,registerPlugin:tt.registerPlugin.bind(tt),hasPlugin:tt.hasPlugin.bind(tt),getPlugin:tt.getPlugin.bind(tt),getPlugins:tt.getRegisteredPlugins.bind(tt)};return yt(e,{...en,announceStatus:Ut,getStatusText:Rt,focus:dt,scroll:v,progress:it,controls:j,location:W,overview:B,keyboard:F,fragments:I,backgrounds:P,slideContent:A,slideNumber:S,onUserInput:function(l){r.autoSlideStoppable&&Pt()},closeOverlay:V.close.bind(V),updateSlidesVisibility:Xt,layoutSlideContents:Pe,transformSlides:Vt,cueAutoSlide:vt,cancelAutoSlide:Tt}),en}var nt=pn,ln=[];nt.initialize=c=>(Object.assign(nt,new pn(document.querySelector(".reveal"),c)),ln.map(t=>t(nt)),nt.initialize()),["configure","on","off","addEventListener","removeEventListener","registerPlugin"].forEach(c=>{nt[c]=(...t)=>{ln.push(e=>e[c].call(null,...t))}}),nt.isReady=()=>!1,nt.VERSION=un;function Mn(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}var gt={async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1},wn=/[&<>"']/,zn=new RegExp(wn.source,"g"),kn=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,Bn=new RegExp(kn.source,"g"),Hn={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},gn=c=>Hn[c];function X(c,t){if(t){if(wn.test(c))return c.replace(zn,gn)}else if(kn.test(c))return c.replace(Bn,gn);return c}var $n=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;function Sn(c){return c.replace($n,(t,e)=>(e=e.toLowerCase())==="colon"?":":e.charAt(0)==="#"?e.charAt(1)==="x"?String.fromCharCode(parseInt(e.substring(2),16)):String.fromCharCode(+e.substring(1)):"")}var _n=/(^|[^\[])\^/g;function $(c,t){c=typeof c=="string"?c:c.source,t=t||"";let e={replace:(n,i)=>(i=(i=i.source||i).replace(_n,"$1"),c=c.replace(n,i),e),getRegex:()=>new RegExp(c,t)};return e}var Dn=/[^\w:]/g,qn=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;function mn(c,t,e){if(c){let n;try{n=decodeURIComponent(Sn(e)).replace(Dn,"").toLowerCase()}catch{return null}if(n.indexOf("javascript:")===0||n.indexOf("vbscript:")===0||n.indexOf("data:")===0)return null}t&&!qn.test(e)&&(e=function(n,i){$t[" "+n]||(On.test(n)?$t[" "+n]=n+"/":$t[" "+n]=_t(n,"/",!0)),n=$t[" "+n];let a=n.indexOf(":")===-1;return i.substring(0,2)==="//"?a?i:n.replace(Fn,"$1")+i:i.charAt(0)==="/"?a?i:n.replace(Un,"$1")+i:n+i}(t,e));try{e=encodeURI(e).replace(/%25/g,"%")}catch{return null}return e}var $t={},On=/^[^:]+:\/*[^/]*$/,Fn=/^([^:]+:)[\s\S]*$/,Un=/^([^:]+:\/*[^/]*)[\s\S]*$/,Dt={exec:function(){}};function vn(c,t){let e=c.replace(/\|/g,(i,a,s)=>{let o=!1,r=a;for(;--r>=0&&s[r]==="\\";)o=!o;return o?"|":" |"}).split(/ \|/),n=0;if(e[0].trim()||e.shift(),e.length>0&&!e[e.length-1].trim()&&e.pop(),e.length>t)e.splice(t);else for(;e.length<t;)e.push("");for(;n<e.length;n++)e[n]=e[n].trim().replace(/\\\|/g,"|");return e}function _t(c,t,e){let n=c.length;if(n===0)return"";let i=0;for(;i<n;){let a=c.charAt(n-i-1);if(a!==t||e){if(a===t||!e)break;i++}else i++}return c.slice(0,n-i)}function fn(c,t){if(t<1)return"";let e="";for(;t>1;)1&t&&(e+=c),t>>=1,c+=c;return e+c}function yn(c,t,e,n){let i=t.href,a=t.title?X(t.title):null,s=c[1].replace(/\\([\[\]])/g,"$1");if(c[0].charAt(0)!=="!"){n.state.inLink=!0;let o={type:"link",raw:e,href:i,title:a,text:s,tokens:n.inlineTokens(s)};return n.state.inLink=!1,o}return{type:"image",raw:e,href:i,title:a,text:X(s)}}var Et=class{constructor(t){this.options=t||gt}space(t){let e=this.rules.block.newline.exec(t);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(t){let e=this.rules.block.code.exec(t);if(e){let n=e[0].replace(/^ {1,4}/gm,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?n:_t(n,`
`)}}}fences(t){let e=this.rules.block.fences.exec(t);if(e){let n=e[0],i=function(a,s){let o=a.match(/^(\s+)(?:```)/);if(o===null)return s;let r=o[1];return s.split(`
`).map(g=>{let u=g.match(/^\s+/);if(u===null)return g;let[d]=u;return d.length>=r.length?g.slice(r.length):g}).join(`
`)}(n,e[3]||"");return{type:"code",raw:n,lang:e[2]?e[2].trim().replace(this.rules.inline._escapes,"$1"):e[2],text:i}}}heading(t){let e=this.rules.block.heading.exec(t);if(e){let n=e[2].trim();if(/#$/.test(n)){let i=_t(n,"#");this.options.pedantic?n=i.trim():i&&!/ $/.test(i)||(n=i.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(t){let e=this.rules.block.hr.exec(t);if(e)return{type:"hr",raw:e[0]}}blockquote(t){let e=this.rules.block.blockquote.exec(t);if(e){let n=e[0].replace(/^ *>[ \t]?/gm,""),i=this.lexer.state.top;this.lexer.state.top=!0;let a=this.lexer.blockTokens(n);return this.lexer.state.top=i,{type:"blockquote",raw:e[0],tokens:a,text:n}}}list(t){let e=this.rules.block.list.exec(t);if(e){let n,i,a,s,o,r,g,u,d,p,f,C,h=e[1].trim(),q=h.length>1,x={type:"list",raw:"",ordered:q,start:q?+h.slice(0,-1):"",loose:!1,items:[]};h=q?`\\d{1,9}\\${h.slice(-1)}`:`\\${h}`,this.options.pedantic&&(h=q?h:"[*+-]");let D=new RegExp(`^( {0,3}${h})((?:[	 ][^\\n]*)?(?:\\n|$))`);for(;t&&(C=!1,e=D.exec(t))&&!this.rules.block.hr.test(t);){if(n=e[0],t=t.substring(n.length),u=e[2].split(`
`,1)[0].replace(/^\t+/,M=>" ".repeat(3*M.length)),d=t.split(`
`,1)[0],this.options.pedantic?(s=2,f=u.trimLeft()):(s=e[2].search(/[^ ]/),s=s>4?1:s,f=u.slice(s),s+=e[1].length),r=!1,!u&&/^ *$/.test(d)&&(n+=d+`
`,t=t.substring(d.length+1),C=!0),!C){let M=new RegExp(`^ {0,${Math.min(3,s-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),A=new RegExp(`^ {0,${Math.min(3,s-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),S=new RegExp(`^ {0,${Math.min(3,s-1)}}(?:\`\`\`|~~~)`),z=new RegExp(`^ {0,${Math.min(3,s-1)}}#`);for(;t&&(p=t.split(`
`,1)[0],d=p,this.options.pedantic&&(d=d.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!S.test(d))&&!z.test(d)&&!M.test(d)&&!A.test(t);){if(d.search(/[^ ]/)>=s||!d.trim())f+=`
`+d.slice(s);else{if(r||u.search(/[^ ]/)>=4||S.test(u)||z.test(u)||A.test(u))break;f+=`
`+d}r||d.trim()||(r=!0),n+=p+`
`,t=t.substring(p.length+1),u=d.slice(s)}}x.loose||(g?x.loose=!0:/\n *\n *$/.test(n)&&(g=!0)),this.options.gfm&&(i=/^\[[ xX]\] /.exec(f),i&&(a=i[0]!=="[ ] ",f=f.replace(/^\[[ xX]\] +/,""))),x.items.push({type:"list_item",raw:n,task:!!i,checked:a,loose:!1,text:f}),x.raw+=n}x.items[x.items.length-1].raw=n.trimRight(),x.items[x.items.length-1].text=f.trimRight(),x.raw=x.raw.trimRight();let Y=x.items.length;for(o=0;o<Y;o++)if(this.lexer.state.top=!1,x.items[o].tokens=this.lexer.blockTokens(x.items[o].text,[]),!x.loose){let M=x.items[o].tokens.filter(S=>S.type==="space"),A=M.length>0&&M.some(S=>/\n.*\n/.test(S.raw));x.loose=A}if(x.loose)for(o=0;o<Y;o++)x.items[o].loose=!0;return x}}html(t){let e=this.rules.block.html.exec(t);if(e){let n={type:"html",raw:e[0],pre:!this.options.sanitizer&&(e[1]==="pre"||e[1]==="script"||e[1]==="style"),text:e[0]};if(this.options.sanitize){let i=this.options.sanitizer?this.options.sanitizer(e[0]):X(e[0]);n.type="paragraph",n.text=i,n.tokens=this.lexer.inline(i)}return n}}def(t){let e=this.rules.block.def.exec(t);if(e){let n=e[1].toLowerCase().replace(/\s+/g," "),i=e[2]?e[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",a=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline._escapes,"$1"):e[3];return{type:"def",tag:n,raw:e[0],href:i,title:a}}}table(t){let e=this.rules.block.table.exec(t);if(e){let n={type:"table",header:vn(e[1]).map(i=>({text:i})),align:e[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:e[3]&&e[3].trim()?e[3].replace(/\n[ \t]*$/,"").split(`
`):[]};if(n.header.length===n.align.length){n.raw=e[0];let i,a,s,o,r=n.align.length;for(i=0;i<r;i++)/^ *-+: *$/.test(n.align[i])?n.align[i]="right":/^ *:-+: *$/.test(n.align[i])?n.align[i]="center":/^ *:-+ *$/.test(n.align[i])?n.align[i]="left":n.align[i]=null;for(r=n.rows.length,i=0;i<r;i++)n.rows[i]=vn(n.rows[i],n.header.length).map(g=>({text:g}));for(r=n.header.length,a=0;a<r;a++)n.header[a].tokens=this.lexer.inline(n.header[a].text);for(r=n.rows.length,a=0;a<r;a++)for(o=n.rows[a],s=0;s<o.length;s++)o[s].tokens=this.lexer.inline(o[s].text);return n}}}lheading(t){let e=this.rules.block.lheading.exec(t);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(t){let e=this.rules.block.paragraph.exec(t);if(e){let n=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:n,tokens:this.lexer.inline(n)}}}text(t){let e=this.rules.block.text.exec(t);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(t){let e=this.rules.inline.escape.exec(t);if(e)return{type:"escape",raw:e[0],text:X(e[1])}}tag(t){let e=this.rules.inline.tag.exec(t);if(e)return!this.lexer.state.inLink&&/^<a /i.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(e[0]):X(e[0]):e[0]}}link(t){let e=this.rules.inline.link.exec(t);if(e){let n=e[2].trim();if(!this.options.pedantic&&/^</.test(n)){if(!/>$/.test(n))return;let s=_t(n.slice(0,-1),"\\");if((n.length-s.length)%2==0)return}else{let s=function(o,r){if(o.indexOf(r[1])===-1)return-1;let g=o.length,u=0,d=0;for(;d<g;d++)if(o[d]==="\\")d++;else if(o[d]===r[0])u++;else if(o[d]===r[1]&&(u--,u<0))return d;return-1}(e[2],"()");if(s>-1){let o=(e[0].indexOf("!")===0?5:4)+e[1].length+s;e[2]=e[2].substring(0,s),e[0]=e[0].substring(0,o).trim(),e[3]=""}}let i=e[2],a="";if(this.options.pedantic){let s=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);s&&(i=s[1],a=s[3])}else a=e[3]?e[3].slice(1,-1):"";return i=i.trim(),/^</.test(i)&&(i=this.options.pedantic&&!/>$/.test(n)?i.slice(1):i.slice(1,-1)),yn(e,{href:i&&i.replace(this.rules.inline._escapes,"$1"),title:a&&a.replace(this.rules.inline._escapes,"$1")},e[0],this.lexer)}}reflink(t,e){let n;if((n=this.rules.inline.reflink.exec(t))||(n=this.rules.inline.nolink.exec(t))){let i=(n[2]||n[1]).replace(/\s+/g," ");if(i=e[i.toLowerCase()],!i){let a=n[0].charAt(0);return{type:"text",raw:a,text:a}}return yn(n,i,n[0],this.lexer)}}emStrong(t,e,n=""){let i=this.rules.inline.emStrong.lDelim.exec(t);if(!i||i[3]&&n.match(/[\p{L}\p{N}]/u))return;let a=i[1]||i[2]||"";if(!a||a&&(n===""||this.rules.inline.punctuation.exec(n))){let s=i[0].length-1,o,r,g=s,u=0,d=i[0][0]==="*"?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd;for(d.lastIndex=0,e=e.slice(-1*t.length+s);(i=d.exec(e))!=null;){if(o=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!o)continue;if(r=o.length,i[3]||i[4]){g+=r;continue}if((i[5]||i[6])&&s%3&&!((s+r)%3)){u+=r;continue}if(g-=r,g>0)continue;r=Math.min(r,r+g+u);let p=t.slice(0,s+i.index+(i[0].length-o.length)+r);if(Math.min(s,r)%2){let C=p.slice(1,-1);return{type:"em",raw:p,text:C,tokens:this.lexer.inlineTokens(C)}}let f=p.slice(2,-2);return{type:"strong",raw:p,text:f,tokens:this.lexer.inlineTokens(f)}}}}codespan(t){let e=this.rules.inline.code.exec(t);if(e){let n=e[2].replace(/\n/g," "),i=/[^ ]/.test(n),a=/^ /.test(n)&&/ $/.test(n);return i&&a&&(n=n.substring(1,n.length-1)),n=X(n,!0),{type:"codespan",raw:e[0],text:n}}}br(t){let e=this.rules.inline.br.exec(t);if(e)return{type:"br",raw:e[0]}}del(t){let e=this.rules.inline.del.exec(t);if(e)return{type:"del",raw:e[0],text:e[2],tokens:this.lexer.inlineTokens(e[2])}}autolink(t,e){let n=this.rules.inline.autolink.exec(t);if(n){let i,a;return n[2]==="@"?(i=X(this.options.mangle?e(n[1]):n[1]),a="mailto:"+i):(i=X(n[1]),a=i),{type:"link",raw:n[0],text:i,href:a,tokens:[{type:"text",raw:i,text:i}]}}}url(t,e){let n;if(n=this.rules.inline.url.exec(t)){let i,a;if(n[2]==="@")i=X(this.options.mangle?e(n[0]):n[0]),a="mailto:"+i;else{let s;do s=n[0],n[0]=this.rules.inline._backpedal.exec(n[0])[0];while(s!==n[0]);i=X(n[0]),a=n[1]==="www."?"http://"+n[0]:n[0]}return{type:"link",raw:n[0],text:i,href:a,tokens:[{type:"text",raw:i,text:i}]}}}inlineText(t,e){let n=this.rules.inline.text.exec(t);if(n){let i;return i=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):X(n[0]):n[0]:X(this.options.smartypants?e(n[0]):n[0]),{type:"text",raw:n[0],text:i}}}},L={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:Dt,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/};L.def=$(L.def).replace("label",L._label).replace("title",L._title).getRegex(),L.bullet=/(?:[*+-]|\d{1,9}[.)])/,L.listItemStart=$(/^( *)(bull) */).replace("bull",L.bullet).getRegex(),L.list=$(L.list).replace(/bull/g,L.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+L.def.source+")").getRegex(),L._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",L._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,L.html=$(L.html,"i").replace("comment",L._comment).replace("tag",L._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),L.paragraph=$(L._paragraph).replace("hr",L.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",L._tag).getRegex(),L.blockquote=$(L.blockquote).replace("paragraph",L.paragraph).getRegex(),L.normal={...L},L.gfm={...L.normal,table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"},L.gfm.table=$(L.gfm.table).replace("hr",L.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",L._tag).getRegex(),L.gfm.paragraph=$(L._paragraph).replace("hr",L.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",L.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",L._tag).getRegex(),L.pedantic={...L.normal,html:$(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",L._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:Dt,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:$(L.normal._paragraph).replace("hr",L.hr).replace("heading",` *#{1,6} *[^
]`).replace("lheading",L.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()};var k={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:Dt,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:Dt,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/};function Vn(c){return c.replace(/---/g,"\u2014").replace(/--/g,"\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1\u2018").replace(/'/g,"\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1\u201C").replace(/"/g,"\u201D").replace(/\.{3}/g,"\u2026")}function bn(c){let t,e,n="",i=c.length;for(t=0;t<i;t++)e=c.charCodeAt(t),Math.random()>.5&&(e="x"+e.toString(16)),n+="&#"+e+";";return n}k._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",k.punctuation=$(k.punctuation).replace(/punctuation/g,k._punctuation).getRegex(),k.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,k.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g,k._comment=$(L._comment).replace("(?:-->|$)","-->").getRegex(),k.emStrong.lDelim=$(k.emStrong.lDelim).replace(/punct/g,k._punctuation).getRegex(),k.emStrong.rDelimAst=$(k.emStrong.rDelimAst,"g").replace(/punct/g,k._punctuation).getRegex(),k.emStrong.rDelimUnd=$(k.emStrong.rDelimUnd,"g").replace(/punct/g,k._punctuation).getRegex(),k._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,k._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,k._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,k.autolink=$(k.autolink).replace("scheme",k._scheme).replace("email",k._email).getRegex(),k._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,k.tag=$(k.tag).replace("comment",k._comment).replace("attribute",k._attribute).getRegex(),k._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,k._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,k._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,k.link=$(k.link).replace("label",k._label).replace("href",k._href).replace("title",k._title).getRegex(),k.reflink=$(k.reflink).replace("label",k._label).replace("ref",L._label).getRegex(),k.nolink=$(k.nolink).replace("ref",L._label).getRegex(),k.reflinkSearch=$(k.reflinkSearch,"g").replace("reflink",k.reflink).replace("nolink",k.nolink).getRegex(),k.normal={...k},k.pedantic={...k.normal,strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:$(/^!?\[(label)\]\((.*?)\)/).replace("label",k._label).getRegex(),reflink:$(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",k._label).getRegex()},k.gfm={...k.normal,escape:$(k.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/},k.gfm.url=$(k.gfm.url,"i").replace("email",k.gfm._extended_email).getRegex(),k.breaks={...k.gfm,br:$(k.br).replace("{2,}","*").getRegex(),text:$(k.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()};var ut=class c{constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||gt,this.options.tokenizer=this.options.tokenizer||new Et,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let e={block:L.normal,inline:k.normal};this.options.pedantic?(e.block=L.pedantic,e.inline=k.pedantic):this.options.gfm&&(e.block=L.gfm,this.options.breaks?e.inline=k.breaks:e.inline=k.gfm),this.tokenizer.rules=e}static get rules(){return{block:L,inline:k}}static lex(t,e){return new c(e).lex(t)}static lexInline(t,e){return new c(e).inlineTokens(t)}lex(t){let e;for(t=t.replace(/\r\n|\r/g,`
`),this.blockTokens(t,this.tokens);e=this.inlineQueue.shift();)this.inlineTokens(e.src,e.tokens);return this.tokens}blockTokens(t,e=[]){let n,i,a,s;for(t=this.options.pedantic?t.replace(/\t/g,"    ").replace(/^ +$/gm,""):t.replace(/^( *)(\t+)/gm,(o,r,g)=>r+"    ".repeat(g.length));t;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some(o=>!!(n=o.call({lexer:this},t,e))&&(t=t.substring(n.raw.length),e.push(n),!0))))if(n=this.tokenizer.space(t))t=t.substring(n.raw.length),n.raw.length===1&&e.length>0?e[e.length-1].raw+=`
`:e.push(n);else if(n=this.tokenizer.code(t))t=t.substring(n.raw.length),i=e[e.length-1],!i||i.type!=="paragraph"&&i.type!=="text"?e.push(n):(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue[this.inlineQueue.length-1].src=i.text);else if(n=this.tokenizer.fences(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.heading(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.hr(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.blockquote(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.list(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.html(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.def(t))t=t.substring(n.raw.length),i=e[e.length-1],!i||i.type!=="paragraph"&&i.type!=="text"?this.tokens.links[n.tag]||(this.tokens.links[n.tag]={href:n.href,title:n.title}):(i.raw+=`
`+n.raw,i.text+=`
`+n.raw,this.inlineQueue[this.inlineQueue.length-1].src=i.text);else if(n=this.tokenizer.table(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.lheading(t))t=t.substring(n.raw.length),e.push(n);else{if(a=t,this.options.extensions&&this.options.extensions.startBlock){let o=1/0,r=t.slice(1),g;this.options.extensions.startBlock.forEach(function(u){g=u.call({lexer:this},r),typeof g=="number"&&g>=0&&(o=Math.min(o,g))}),o<1/0&&o>=0&&(a=t.substring(0,o+1))}if(this.state.top&&(n=this.tokenizer.paragraph(a)))i=e[e.length-1],s&&i.type==="paragraph"?(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):e.push(n),s=a.length!==t.length,t=t.substring(n.raw.length);else if(n=this.tokenizer.text(t))t=t.substring(n.raw.length),i=e[e.length-1],i&&i.type==="text"?(i.raw+=`
`+n.raw,i.text+=`
`+n.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=i.text):e.push(n);else if(t){let o="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(o);break}throw new Error(o)}}return this.state.top=!0,e}inline(t,e=[]){return this.inlineQueue.push({src:t,tokens:e}),e}inlineTokens(t,e=[]){let n,i,a,s,o,r,g=t;if(this.tokens.links){let u=Object.keys(this.tokens.links);if(u.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(g))!=null;)u.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(g=g.slice(0,s.index)+"["+fn("a",s[0].length-2)+"]"+g.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.blockSkip.exec(g))!=null;)g=g.slice(0,s.index)+"["+fn("a",s[0].length-2)+"]"+g.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);for(;(s=this.tokenizer.rules.inline.escapedEmSt.exec(g))!=null;)g=g.slice(0,s.index+s[0].length-2)+"++"+g.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--;for(;t;)if(o||(r=""),o=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some(u=>!!(n=u.call({lexer:this},t,e))&&(t=t.substring(n.raw.length),e.push(n),!0))))if(n=this.tokenizer.escape(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.tag(t))t=t.substring(n.raw.length),i=e[e.length-1],i&&n.type==="text"&&i.type==="text"?(i.raw+=n.raw,i.text+=n.text):e.push(n);else if(n=this.tokenizer.link(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.reflink(t,this.tokens.links))t=t.substring(n.raw.length),i=e[e.length-1],i&&n.type==="text"&&i.type==="text"?(i.raw+=n.raw,i.text+=n.text):e.push(n);else if(n=this.tokenizer.emStrong(t,g,r))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.codespan(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.br(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.del(t))t=t.substring(n.raw.length),e.push(n);else if(n=this.tokenizer.autolink(t,bn))t=t.substring(n.raw.length),e.push(n);else if(this.state.inLink||!(n=this.tokenizer.url(t,bn))){if(a=t,this.options.extensions&&this.options.extensions.startInline){let u=1/0,d=t.slice(1),p;this.options.extensions.startInline.forEach(function(f){p=f.call({lexer:this},d),typeof p=="number"&&p>=0&&(u=Math.min(u,p))}),u<1/0&&u>=0&&(a=t.substring(0,u+1))}if(n=this.tokenizer.inlineText(a,Vn))t=t.substring(n.raw.length),n.raw.slice(-1)!=="_"&&(r=n.raw.slice(-1)),o=!0,i=e[e.length-1],i&&i.type==="text"?(i.raw+=n.raw,i.text+=n.text):e.push(n);else if(t){let u="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(u);break}throw new Error(u)}}else t=t.substring(n.raw.length),e.push(n);return e}},At=class{constructor(t){this.options=t||gt}code(t,e,n){let i=(e||"").match(/\S*/)[0];if(this.options.highlight){let a=this.options.highlight(t,i);a!=null&&a!==t&&(n=!0,t=a)}return t=t.replace(/\n$/,"")+`
`,i?'<pre><code class="'+this.options.langPrefix+X(i)+'">'+(n?t:X(t,!0))+`</code></pre>
`:"<pre><code>"+(n?t:X(t,!0))+`</code></pre>
`}blockquote(t){return`<blockquote>
${t}</blockquote>
`}html(t){return t}heading(t,e,n,i){return this.options.headerIds?`<h${e} id="${this.options.headerPrefix+i.slug(n)}">${t}</h${e}>
`:`<h${e}>${t}</h${e}>
`}hr(){return this.options.xhtml?`<hr/>
`:`<hr>
`}list(t,e,n){let i=e?"ol":"ul";return"<"+i+(e&&n!==1?' start="'+n+'"':"")+`>
`+t+"</"+i+`>
`}listitem(t){return`<li>${t}</li>
`}checkbox(t){return"<input "+(t?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "}paragraph(t){return`<p>${t}</p>
`}table(t,e){return e&&(e=`<tbody>${e}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+e+`</table>
`}tablerow(t){return`<tr>
${t}</tr>
`}tablecell(t,e){let n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong(t){return`<strong>${t}</strong>`}em(t){return`<em>${t}</em>`}codespan(t){return`<code>${t}</code>`}br(){return this.options.xhtml?"<br/>":"<br>"}del(t){return`<del>${t}</del>`}link(t,e,n){if((t=mn(this.options.sanitize,this.options.baseUrl,t))===null)return n;let i='<a href="'+t+'"';return e&&(i+=' title="'+e+'"'),i+=">"+n+"</a>",i}image(t,e,n){if((t=mn(this.options.sanitize,this.options.baseUrl,t))===null)return n;let i=`<img src="${t}" alt="${n}"`;return e&&(i+=` title="${e}"`),i+=this.options.xhtml?"/>":">",i}text(t){return t}},qt=class{strong(t){return t}em(t){return t}codespan(t){return t}del(t){return t}html(t){return t}text(t){return t}link(t,e,n){return""+n}image(t,e,n){return""+n}br(){return""}},Ot=class{constructor(){this.seen={}}serialize(t){return t.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")}getNextSafeSlug(t,e){let n=t,i=0;if(this.seen.hasOwnProperty(n)){i=this.seen[t];do i++,n=t+"-"+i;while(this.seen.hasOwnProperty(n))}return e||(this.seen[t]=i,this.seen[n]=0),n}slug(t,e={}){let n=this.serialize(t);return this.getNextSafeSlug(n,e.dryrun)}},pt=class c{constructor(t){this.options=t||gt,this.options.renderer=this.options.renderer||new At,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new qt,this.slugger=new Ot}static parse(t,e){return new c(e).parse(t)}static parseInline(t,e){return new c(e).parseInline(t)}parse(t,e=!0){let n,i,a,s,o,r,g,u,d,p,f,C,h,q,x,D,Y,M,A,S="",z=t.length;for(n=0;n<z;n++)if(p=t[n],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[p.type]&&(A=this.options.extensions.renderers[p.type].call({parser:this},p),A!==!1||!["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(p.type)))S+=A||"";else switch(p.type){case"space":continue;case"hr":S+=this.renderer.hr();continue;case"heading":S+=this.renderer.heading(this.parseInline(p.tokens),p.depth,Sn(this.parseInline(p.tokens,this.textRenderer)),this.slugger);continue;case"code":S+=this.renderer.code(p.text,p.lang,p.escaped);continue;case"table":for(u="",g="",s=p.header.length,i=0;i<s;i++)g+=this.renderer.tablecell(this.parseInline(p.header[i].tokens),{header:!0,align:p.align[i]});for(u+=this.renderer.tablerow(g),d="",s=p.rows.length,i=0;i<s;i++){for(r=p.rows[i],g="",o=r.length,a=0;a<o;a++)g+=this.renderer.tablecell(this.parseInline(r[a].tokens),{header:!1,align:p.align[a]});d+=this.renderer.tablerow(g)}S+=this.renderer.table(u,d);continue;case"blockquote":d=this.parse(p.tokens),S+=this.renderer.blockquote(d);continue;case"list":for(f=p.ordered,C=p.start,h=p.loose,s=p.items.length,d="",i=0;i<s;i++)x=p.items[i],D=x.checked,Y=x.task,q="",x.task&&(M=this.renderer.checkbox(D),h?x.tokens.length>0&&x.tokens[0].type==="paragraph"?(x.tokens[0].text=M+" "+x.tokens[0].text,x.tokens[0].tokens&&x.tokens[0].tokens.length>0&&x.tokens[0].tokens[0].type==="text"&&(x.tokens[0].tokens[0].text=M+" "+x.tokens[0].tokens[0].text)):x.tokens.unshift({type:"text",text:M}):q+=M),q+=this.parse(x.tokens,h),d+=this.renderer.listitem(q,Y,D);S+=this.renderer.list(d,f,C);continue;case"html":S+=this.renderer.html(p.text);continue;case"paragraph":S+=this.renderer.paragraph(this.parseInline(p.tokens));continue;case"text":for(d=p.tokens?this.parseInline(p.tokens):p.text;n+1<z&&t[n+1].type==="text";)p=t[++n],d+=`
`+(p.tokens?this.parseInline(p.tokens):p.text);S+=e?this.renderer.paragraph(d):d;continue;default:{let U='Token with "'+p.type+'" type was not found.';if(this.options.silent)return void console.error(U);throw new Error(U)}}return S}parseInline(t,e){e=e||this.renderer;let n,i,a,s="",o=t.length;for(n=0;n<o;n++)if(i=t[n],this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[i.type]&&(a=this.options.extensions.renderers[i.type].call({parser:this},i),a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)))s+=a||"";else switch(i.type){case"escape":case"text":s+=e.text(i.text);break;case"html":s+=e.html(i.text);break;case"link":s+=e.link(i.href,i.title,this.parseInline(i.tokens,e));break;case"image":s+=e.image(i.href,i.title,i.text);break;case"strong":s+=e.strong(this.parseInline(i.tokens,e));break;case"em":s+=e.em(this.parseInline(i.tokens,e));break;case"codespan":s+=e.codespan(i.text);break;case"br":s+=e.br();break;case"del":s+=e.del(this.parseInline(i.tokens,e));break;default:{let r='Token with "'+i.type+'" type was not found.';if(this.options.silent)return void console.error(r);throw new Error(r)}}return s}},xt=class{constructor(t){this.options=t||gt}static passThroughHooks=new Set(["preprocess","postprocess"]);preprocess(t){return t}postprocess(t){return t}};function xn(c,t){return(e,n,i)=>{typeof n=="function"&&(i=n,n=null);let a={...n},s=function(o,r,g){return u=>{if(u.message+=`
Please report this to https://github.com/markedjs/marked.`,o){let d="<p>An error occurred:</p><pre>"+X(u.message+"",!0)+"</pre>";return r?Promise.resolve(d):g?void g(null,d):d}if(r)return Promise.reject(u);if(!g)throw u;g(u)}}((n={...R.defaults,...a}).silent,n.async,i);if(e==null)return s(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(function(o){o&&o.sanitize&&!o.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}(n),n.hooks&&(n.hooks.options=n),i){let o=n.highlight,r;try{n.hooks&&(e=n.hooks.preprocess(e)),r=c(e,n)}catch(d){return s(d)}let g=function(d){let p;if(!d)try{n.walkTokens&&R.walkTokens(r,n.walkTokens),p=t(r,n),n.hooks&&(p=n.hooks.postprocess(p))}catch(f){d=f}return n.highlight=o,d?s(d):i(null,p)};if(!o||o.length<3||(delete n.highlight,!r.length))return g();let u=0;return R.walkTokens(r,function(d){d.type==="code"&&(u++,setTimeout(()=>{o(d.text,d.lang,function(p,f){if(p)return g(p);f!=null&&f!==d.text&&(d.text=f,d.escaped=!0),u--,u===0&&g()})},0))}),void(u===0&&g())}if(n.async)return Promise.resolve(n.hooks?n.hooks.preprocess(e):e).then(o=>c(o,n)).then(o=>n.walkTokens?Promise.all(R.walkTokens(o,n.walkTokens)).then(()=>o):o).then(o=>t(o,n)).then(o=>n.hooks?n.hooks.postprocess(o):o).catch(s);try{n.hooks&&(e=n.hooks.preprocess(e));let o=c(e,n);n.walkTokens&&R.walkTokens(o,n.walkTokens);let r=t(o,n);return n.hooks&&(r=n.hooks.postprocess(r)),r}catch(o){return s(o)}}}function R(c,t,e){return xn(ut.lex,pt.parse)(c,t,e)}R.options=R.setOptions=function(c){var t;return R.defaults={...R.defaults,...c},t=R.defaults,gt=t,R},R.getDefaults=Mn,R.defaults=gt,R.use=function(...c){let t=R.defaults.extensions||{renderers:{},childTokens:{}};c.forEach(e=>{let n={...e};if(n.async=R.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if(i.renderer){let a=t.renderers[i.name];t.renderers[i.name]=a?function(...s){let o=i.renderer.apply(this,s);return o===!1&&(o=a.apply(this,s)),o}:i.renderer}if(i.tokenizer){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");t[i.level]?t[i.level].unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]))}i.childTokens&&(t.childTokens[i.name]=i.childTokens)}),n.extensions=t),e.renderer){let i=R.defaults.renderer||new At;for(let a in e.renderer){let s=i[a];i[a]=(...o)=>{let r=e.renderer[a].apply(i,o);return r===!1&&(r=s.apply(i,o)),r}}n.renderer=i}if(e.tokenizer){let i=R.defaults.tokenizer||new Et;for(let a in e.tokenizer){let s=i[a];i[a]=(...o)=>{let r=e.tokenizer[a].apply(i,o);return r===!1&&(r=s.apply(i,o)),r}}n.tokenizer=i}if(e.hooks){let i=R.defaults.hooks||new xt;for(let a in e.hooks){let s=i[a];xt.passThroughHooks.has(a)?i[a]=o=>{if(R.defaults.async)return Promise.resolve(e.hooks[a].call(i,o)).then(g=>s.call(i,g));let r=e.hooks[a].call(i,o);return s.call(i,r)}:i[a]=(...o)=>{let r=e.hooks[a].apply(i,o);return r===!1&&(r=s.apply(i,o)),r}}n.hooks=i}if(e.walkTokens){let i=R.defaults.walkTokens;n.walkTokens=function(a){let s=[];return s.push(e.walkTokens.call(this,a)),i&&(s=s.concat(i.call(this,a))),s}}R.setOptions(n)})},R.walkTokens=function(c,t){let e=[];for(let n of c)switch(e=e.concat(t.call(R,n)),n.type){case"table":for(let i of n.header)e=e.concat(R.walkTokens(i.tokens,t));for(let i of n.rows)for(let a of i)e=e.concat(R.walkTokens(a.tokens,t));break;case"list":e=e.concat(R.walkTokens(n.items,t));break;default:R.defaults.extensions&&R.defaults.extensions.childTokens&&R.defaults.extensions.childTokens[n.type]?R.defaults.extensions.childTokens[n.type].forEach(function(i){e=e.concat(R.walkTokens(n[i],t))}):n.tokens&&(e=e.concat(R.walkTokens(n.tokens,t)))}return e},R.parseInline=xn(ut.lexInline,pt.parseInline),R.Parser=pt,R.parser=pt.parse,R.Renderer=At,R.TextRenderer=qt,R.Lexer=ut,R.lexer=ut.lex,R.Tokenizer=Et,R.Slugger=Ot,R.Hooks=xt,R.parse=R,R.options,R.setOptions,R.use,R.walkTokens,R.parseInline,pt.parse,ut.lex;var En=()=>{let c,t,e=null;function n(){if(e&&!e.closed)e.focus();else{if(e=window.open("about:blank","reveal.js - Notes","width=1100,height=700"),e.marked=R,e.document.write(`<!--
	NOTE: You need to build the notes plugin after making changes to this file.
-->
<html lang="en">
	<head>
		<meta charset="utf-8">

		<title>reveal.js - Speaker View</title>

		<style>
			body {
				font-family: Helvetica;
				font-size: 18px;
			}

			#current-slide,
			#upcoming-slide,
			#speaker-controls {
				padding: 6px;
				box-sizing: border-box;
				-moz-box-sizing: border-box;
			}

			#current-slide iframe,
			#upcoming-slide iframe {
				width: 100%;
				height: 100%;
				border: 1px solid #ddd;
			}

			#current-slide .label,
			#upcoming-slide .label {
				position: absolute;
				top: 10px;
				left: 10px;
				z-index: 2;
			}

			#connection-status {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 20;
				padding: 30% 20% 20% 20%;
				font-size: 18px;
				color: #222;
				background: #fff;
				text-align: center;
				box-sizing: border-box;
				line-height: 1.4;
			}

			.overlay-element {
				height: 34px;
				line-height: 34px;
				padding: 0 10px;
				text-shadow: none;
				background: rgba( 220, 220, 220, 0.8 );
				color: #222;
				font-size: 14px;
			}

			.overlay-element.interactive:hover {
				background: rgba( 220, 220, 220, 1 );
			}

			#current-slide {
				position: absolute;
				width: 60%;
				height: 100%;
				top: 0;
				left: 0;
				padding-right: 0;
			}

			#upcoming-slide {
				position: absolute;
				width: 40%;
				height: 40%;
				right: 0;
				top: 0;
			}

			/* Speaker controls */
			#speaker-controls {
				position: absolute;
				top: 40%;
				right: 0;
				width: 40%;
				height: 60%;
				overflow: auto;
				font-size: 18px;
			}

				.speaker-controls-time.hidden,
				.speaker-controls-notes.hidden {
					display: none;
				}

				.speaker-controls-time .label,
				.speaker-controls-pace .label,
				.speaker-controls-notes .label {
					text-transform: uppercase;
					font-weight: normal;
					font-size: 0.66em;
					color: #666;
					margin: 0;
				}

				.speaker-controls-time, .speaker-controls-pace {
					border-bottom: 1px solid rgba( 200, 200, 200, 0.5 );
					margin-bottom: 10px;
					padding: 10px 16px;
					padding-bottom: 20px;
					cursor: pointer;
				}

				.speaker-controls-time .reset-button {
					opacity: 0;
					float: right;
					color: #666;
					text-decoration: none;
				}
				.speaker-controls-time:hover .reset-button {
					opacity: 1;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock {
					width: 50%;
				}

				.speaker-controls-time .timer,
				.speaker-controls-time .clock,
				.speaker-controls-time .pacing .hours-value,
				.speaker-controls-time .pacing .minutes-value,
				.speaker-controls-time .pacing .seconds-value {
					font-size: 1.9em;
				}

				.speaker-controls-time .timer {
					float: left;
				}

				.speaker-controls-time .clock {
					float: right;
					text-align: right;
				}

				.speaker-controls-time span.mute {
					opacity: 0.3;
				}

				.speaker-controls-time .pacing-title {
					margin-top: 5px;
				}

				.speaker-controls-time .pacing.ahead {
					color: blue;
				}

				.speaker-controls-time .pacing.on-track {
					color: green;
				}

				.speaker-controls-time .pacing.behind {
					color: red;
				}

				.speaker-controls-notes {
					padding: 10px 16px;
				}

				.speaker-controls-notes .value {
					margin-top: 5px;
					line-height: 1.4;
					font-size: 1.2em;
				}

			/* Layout selector\xA0*/
			#speaker-layout {
				position: absolute;
				top: 10px;
				right: 10px;
				color: #222;
				z-index: 10;
			}
				#speaker-layout select {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					border: 0;
					box-shadow: 0;
					cursor: pointer;
					opacity: 0;

					font-size: 1em;
					background-color: transparent;

					-moz-appearance: none;
					-webkit-appearance: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
				}

				#speaker-layout select:focus {
					outline: none;
					box-shadow: none;
				}

			.clear {
				clear: both;
			}

			/* Speaker layout: Wide */
			body[data-speaker-layout="wide"] #current-slide,
			body[data-speaker-layout="wide"] #upcoming-slide {
				width: 50%;
				height: 45%;
				padding: 6px;
			}

			body[data-speaker-layout="wide"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="wide"] #upcoming-slide {
				top: 0;
				left: 50%;
			}

			body[data-speaker-layout="wide"] #speaker-controls {
				top: 45%;
				left: 0;
				width: 100%;
				height: 50%;
				font-size: 1.25em;
			}

			/* Speaker layout: Tall */
			body[data-speaker-layout="tall"] #current-slide,
			body[data-speaker-layout="tall"] #upcoming-slide {
				width: 45%;
				height: 50%;
				padding: 6px;
			}

			body[data-speaker-layout="tall"] #current-slide {
				top: 0;
				left: 0;
			}

			body[data-speaker-layout="tall"] #upcoming-slide {
				top: 50%;
				left: 0;
			}

			body[data-speaker-layout="tall"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 45%;
				width: 55%;
				height: 100%;
				font-size: 1.25em;
			}

			/* Speaker layout: Notes only */
			body[data-speaker-layout="notes-only"] #current-slide,
			body[data-speaker-layout="notes-only"] #upcoming-slide {
				display: none;
			}

			body[data-speaker-layout="notes-only"] #speaker-controls {
				padding-top: 40px;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				font-size: 1.25em;
			}

			@media screen and (max-width: 1080px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 16px;
				}
			}

			@media screen and (max-width: 900px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 14px;
				}
			}

			@media screen and (max-width: 800px) {
				body[data-speaker-layout="default"] #speaker-controls {
					font-size: 12px;
				}
			}

		</style>
	</head>

	<body>

		<div id="connection-status">Loading speaker view...</div>

		<div id="current-slide"></div>
		<div id="upcoming-slide"><span class="overlay-element label">Upcoming</span></div>
		<div id="speaker-controls">
			<div class="speaker-controls-time">
				<h4 class="label">Time <span class="reset-button">Click to Reset</span></h4>
				<div class="clock">
					<span class="clock-value">0:00 AM</span>
				</div>
				<div class="timer">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
				<div class="clear"></div>

				<h4 class="label pacing-title" style="display: none">Pacing \u2013 Time to finish current slide</h4>
				<div class="pacing" style="display: none">
					<span class="hours-value">00</span><span class="minutes-value">:00</span><span class="seconds-value">:00</span>
				</div>
			</div>

			<div class="speaker-controls-notes hidden">
				<h4 class="label">Notes</h4>
				<div class="value"></div>
			</div>
		</div>
		<div id="speaker-layout" class="overlay-element interactive">
			<span class="speaker-layout-label"></span>
			<select class="speaker-layout-dropdown"></select>
		</div>

		<script>

			(function() {

				var notes,
					notesValue,
					currentState,
					currentSlide,
					upcomingSlide,
					layoutLabel,
					layoutDropdown,
					pendingCalls = {},
					lastRevealApiCallId = 0,
					connected = false

				var connectionStatus = document.querySelector( '#connection-status' );

				var SPEAKER_LAYOUTS = {
					'default': 'Default',
					'wide': 'Wide',
					'tall': 'Tall',
					'notes-only': 'Notes only'
				};

				setupLayout();

				let openerOrigin;

				try {
					openerOrigin = window.opener.location.origin;
				}
				catch ( error ) { console.warn( error ) }

				// In order to prevent XSS, the speaker view will only run if its
				// opener has the same origin as itself
				if( window.location.origin !== openerOrigin ) {
					connectionStatus.innerHTML = 'Cross origin error.<br>The speaker window can only be opened from the same origin.';
					return;
				}

				var connectionTimeout = setTimeout( function() {
					connectionStatus.innerHTML = 'Error connecting to main window.<br>Please try closing and reopening the speaker view.';
				}, 5000 );

				window.addEventListener( 'message', function( event ) {

					// Validate the origin of all messages to avoid parsing messages
					// that aren't meant for us. Ignore when running off file:// so
					// that the speaker view continues to work without a web server.
					if( window.location.origin !== event.origin && window.location.origin !== 'file://' ) {
						return
					}

					clearTimeout( connectionTimeout );
					connectionStatus.style.display = 'none';

					var data = JSON.parse( event.data );

					// The overview mode is only useful to the reveal.js instance
					// where navigation occurs so we don't sync it
					if( data.state ) delete data.state.overview;

					// Messages sent by the notes plugin inside of the main window
					if( data && data.namespace === 'reveal-notes' ) {
						if( data.type === 'connect' ) {
							handleConnectMessage( data );
						}
						else if( data.type === 'state' ) {
							handleStateMessage( data );
						}
						else if( data.type === 'return' ) {
							pendingCalls[data.callId](data.result);
							delete pendingCalls[data.callId];
						}
					}
					// Messages sent by the reveal.js inside of the current slide preview
					else if( data && data.namespace === 'reveal' ) {
						const supportedEvents = [
							'slidechanged',
							'fragmentshown',
							'fragmenthidden',
							'paused',
							'resumed',
							'previewiframe',
							'previewimage',
							'previewvideo',
							'closeoverlay'
						];

						if( /ready/.test( data.eventName ) ) {
							// Send a message back to notify that the handshake is complete
							window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'connected'} ), '*' );
						}
						else if( supportedEvents.includes( data.eventName ) && currentState !== JSON.stringify( data.state ) ) {
							dispatchStateToMainWindow( data.state );
						}
					}

				} );

				/**
				 * Updates the presentation in the main window to match the state
				 * of the presentation in the notes window.
				 */
				const dispatchStateToMainWindow = debounce(( state ) => {
					window.opener.postMessage( JSON.stringify({ method: 'setState', args: [ state ]} ), '*' );
				}, 500);

				/**
				 * Asynchronously calls the Reveal.js API of the main frame.
				 */
				function callRevealApi( methodName, methodArguments, callback ) {

					var callId = ++lastRevealApiCallId;
					pendingCalls[callId] = callback;
					window.opener.postMessage( JSON.stringify( {
						namespace: 'reveal-notes',
						type: 'call',
						callId: callId,
						methodName: methodName,
						arguments: methodArguments
					} ), '*' );

				}

				/**
				 * Called when the main window is trying to establish a
				 * connection.
				 */
				function handleConnectMessage( data ) {

					if( connected === false ) {
						connected = true;

						setupIframes( data );
						setupKeyboard();
						setupNotes();
						setupTimer();
						setupHeartbeat();
					}

				}

				/**
				 * Called when the main window sends an updated state.
				 */
				function handleStateMessage( data ) {

					// Store the most recently set state to avoid circular loops
					// applying the same state
					currentState = JSON.stringify( data.state );

					// No need for updating the notes in case of fragment changes
					if ( data.notes ) {
						notes.classList.remove( 'hidden' );
						notesValue.style.whiteSpace = data.whitespace;
						if( data.markdown ) {
							notesValue.innerHTML = marked( data.notes );
						}
						else {
							notesValue.innerHTML = data.notes;
						}
					}
					else {
						notes.classList.add( 'hidden' );
					}

					// Don't show lightboxes in the upcoming slide
					const { previewVideo, previewImage, previewIframe, ...upcomingState } = data.state;

					// Update the note slides
					currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ data.state ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'setState', args: [ upcomingState ] }), '*' );
					upcomingSlide.contentWindow.postMessage( JSON.stringify({ method: 'next' }), '*' );

				}

				// Limit to max one state update per X ms
				handleStateMessage = debounce( handleStateMessage, 200 );

				/**
				 * Forward keyboard events to the current slide window.
				 * This enables keyboard events to work even if focus
				 * isn't set on the current slide iframe.
				 *
				 * Block F5 default handling, it reloads and disconnects
				 * the speaker notes window.
				 */
				function setupKeyboard() {

					document.addEventListener( 'keydown', function( event ) {
						if( event.keyCode === 116 || ( event.metaKey && event.keyCode === 82 ) ) {
							event.preventDefault();
							return false;
						}
						currentSlide.contentWindow.postMessage( JSON.stringify({ method: 'triggerKey', args: [ event.keyCode ] }), '*' );
					} );

				}

				/**
				 * Creates the preview iframes.
				 */
				function setupIframes( data ) {

					var params = [
						'receiver',
						'progress=false',
						'history=false',
						'transition=none',
						'autoSlide=0',
						'backgroundTransition=none'
					].join( '&' );

					var urlSeparator = /\\?/.test(data.url) ? '&' : '?';
					var hash = '#/' + data.state.indexh + '/' + data.state.indexv;
					var currentURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&postMessageEvents=true' + hash;
					var upcomingURL = data.url + urlSeparator + params + '&scrollActivationWidth=false&controls=false' + hash;

					currentSlide = document.createElement( 'iframe' );
					currentSlide.setAttribute( 'width', 1280 );
					currentSlide.setAttribute( 'height', 1024 );
					currentSlide.setAttribute( 'src', currentURL );
					document.querySelector( '#current-slide' ).appendChild( currentSlide );

					upcomingSlide = document.createElement( 'iframe' );
					upcomingSlide.setAttribute( 'width', 640 );
					upcomingSlide.setAttribute( 'height', 512 );
					upcomingSlide.setAttribute( 'src', upcomingURL );
					document.querySelector( '#upcoming-slide' ).appendChild( upcomingSlide );

				}

				/**
				 * Setup the notes UI.
				 */
				function setupNotes() {

					notes = document.querySelector( '.speaker-controls-notes' );
					notesValue = document.querySelector( '.speaker-controls-notes .value' );

				}

				/**
				 * We send out a heartbeat at all times to ensure we can
				 * reconnect with the main presentation window after reloads.
				 */
				function setupHeartbeat() {

					setInterval( () => {
						window.opener.postMessage( JSON.stringify({ namespace: 'reveal-notes', type: 'heartbeat'} ), '*' );
					}, 1000 );

				}

				function getTimings( callback ) {

					callRevealApi( 'getSlidesAttributes', [], function ( slideAttributes ) {
						callRevealApi( 'getConfig', [], function ( config ) {
							var totalTime = config.totalTime;
							var minTimePerSlide = config.minimumTimePerSlide || 0;
							var defaultTiming = config.defaultTiming;
							if ((defaultTiming == null) && (totalTime == null)) {
								callback(null);
								return;
							}
							// Setting totalTime overrides defaultTiming
							if (totalTime) {
								defaultTiming = 0;
							}
							var timings = [];
							for ( var i in slideAttributes ) {
								var slide = slideAttributes[ i ];
								var timing = defaultTiming;
								if( slide.hasOwnProperty( 'data-timing' )) {
									var t = slide[ 'data-timing' ];
									timing = parseInt(t);
									if( isNaN(timing) ) {
										console.warn("Could not parse timing '" + t + "' of slide " + i + "; using default of " + defaultTiming);
										timing = defaultTiming;
									}
								}
								timings.push(timing);
							}
							if ( totalTime ) {
								// After we've allocated time to individual slides, we summarize it and
								// subtract it from the total time
								var remainingTime = totalTime - timings.reduce( function(a, b) { return a + b; }, 0 );
								// The remaining time is divided by the number of slides that have 0 seconds
								// allocated at the moment, giving the average time-per-slide on the remaining slides
								var remainingSlides = (timings.filter( function(x) { return x == 0 }) ).length
								var timePerSlide = Math.round( remainingTime / remainingSlides, 0 )
								// And now we replace every zero-value timing with that average
								timings = timings.map( function(x) { return (x==0 ? timePerSlide : x) } );
							}
							var slidesUnderMinimum = timings.filter( function(x) { return (x < minTimePerSlide) } ).length
							if ( slidesUnderMinimum ) {
								message = "The pacing time for " + slidesUnderMinimum + " slide(s) is under the configured minimum of " + minTimePerSlide + " seconds. Check the data-timing attribute on individual slides, or consider increasing the totalTime or minimumTimePerSlide configuration options (or removing some slides).";
								alert(message);
							}
							callback( timings );
						} );
					} );

				}

				/**
				 * Return the number of seconds allocated for presenting
				 * all slides up to and including this one.
				 */
				function getTimeAllocated( timings, callback ) {

					callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
						var allocated = 0;
						for (var i in timings.slice(0, currentSlide + 1)) {
							allocated += timings[i];
						}
						callback( allocated );
					} );

				}

				/**
				 * Create the timer and clock and start updating them
				 * at an interval.
				 */
				function setupTimer() {

					var start = new Date(),
					timeEl = document.querySelector( '.speaker-controls-time' ),
					clockEl = timeEl.querySelector( '.clock-value' ),
					hoursEl = timeEl.querySelector( '.hours-value' ),
					minutesEl = timeEl.querySelector( '.minutes-value' ),
					secondsEl = timeEl.querySelector( '.seconds-value' ),
					pacingTitleEl = timeEl.querySelector( '.pacing-title' ),
					pacingEl = timeEl.querySelector( '.pacing' ),
					pacingHoursEl = pacingEl.querySelector( '.hours-value' ),
					pacingMinutesEl = pacingEl.querySelector( '.minutes-value' ),
					pacingSecondsEl = pacingEl.querySelector( '.seconds-value' );

					var timings = null;
					getTimings( function ( _timings ) {

						timings = _timings;
						if (_timings !== null) {
							pacingTitleEl.style.removeProperty('display');
							pacingEl.style.removeProperty('display');
						}

						// Update once directly
						_updateTimer();

						// Then update every second
						setInterval( _updateTimer, 1000 );

					} );


					function _resetTimer() {

						if (timings == null) {
							start = new Date();
							_updateTimer();
						}
						else {
							// Reset timer to beginning of current slide
							getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
								var slideEndTiming = slideEndTimingSeconds * 1000;
								callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
									var currentSlideTiming = timings[currentSlide] * 1000;
									var previousSlidesTiming = slideEndTiming - currentSlideTiming;
									var now = new Date();
									start = new Date(now.getTime() - previousSlidesTiming);
									_updateTimer();
								} );
							} );
						}

					}

					timeEl.addEventListener( 'click', function() {
						_resetTimer();
						return false;
					} );

					function _displayTime( hrEl, minEl, secEl, time) {

						var sign = Math.sign(time) == -1 ? "-" : "";
						time = Math.abs(Math.round(time / 1000));
						var seconds = time % 60;
						var minutes = Math.floor( time / 60 ) % 60 ;
						var hours = Math.floor( time / ( 60 * 60 )) ;
						hrEl.innerHTML = sign + zeroPadInteger( hours );
						if (hours == 0) {
							hrEl.classList.add( 'mute' );
						}
						else {
							hrEl.classList.remove( 'mute' );
						}
						minEl.innerHTML = ':' + zeroPadInteger( minutes );
						if (hours == 0 && minutes == 0) {
							minEl.classList.add( 'mute' );
						}
						else {
							minEl.classList.remove( 'mute' );
						}
						secEl.innerHTML = ':' + zeroPadInteger( seconds );
					}

					function _updateTimer() {

						var diff, hours, minutes, seconds,
						now = new Date();

						diff = now.getTime() - start.getTime();

						clockEl.innerHTML = now.toLocaleTimeString( 'en-US', { hour12: true, hour: '2-digit', minute:'2-digit' } );
						_displayTime( hoursEl, minutesEl, secondsEl, diff );
						if (timings !== null) {
							_updatePacing(diff);
						}

					}

					function _updatePacing(diff) {

						getTimeAllocated( timings, function ( slideEndTimingSeconds ) {
							var slideEndTiming = slideEndTimingSeconds * 1000;

							callRevealApi( 'getSlidePastCount', [], function ( currentSlide ) {
								var currentSlideTiming = timings[currentSlide] * 1000;
								var timeLeftCurrentSlide = slideEndTiming - diff;
								if (timeLeftCurrentSlide < 0) {
									pacingEl.className = 'pacing behind';
								}
								else if (timeLeftCurrentSlide < currentSlideTiming) {
									pacingEl.className = 'pacing on-track';
								}
								else {
									pacingEl.className = 'pacing ahead';
								}
								_displayTime( pacingHoursEl, pacingMinutesEl, pacingSecondsEl, timeLeftCurrentSlide );
							} );
						} );
					}

				}

				/**
				 * Sets up the speaker view layout and layout selector.
				 */
				function setupLayout() {

					layoutDropdown = document.querySelector( '.speaker-layout-dropdown' );
					layoutLabel = document.querySelector( '.speaker-layout-label' );

					// Render the list of available layouts
					for( var id in SPEAKER_LAYOUTS ) {
						var option = document.createElement( 'option' );
						option.setAttribute( 'value', id );
						option.textContent = SPEAKER_LAYOUTS[ id ];
						layoutDropdown.appendChild( option );
					}

					// Monitor the dropdown for changes
					layoutDropdown.addEventListener( 'change', function( event ) {

						setLayout( layoutDropdown.value );

					}, false );

					// Restore any currently persisted layout
					setLayout( getLayout() );

				}

				/**
				 * Sets a new speaker view layout. The layout is persisted
				 * in local storage.
				 */
				function setLayout( value ) {

					var title = SPEAKER_LAYOUTS[ value ];

					layoutLabel.innerHTML = 'Layout' + ( title ? ( ': ' + title ) : '' );
					layoutDropdown.value = value;

					document.body.setAttribute( 'data-speaker-layout', value );

					// Persist locally
					if( supportsLocalStorage() ) {
						window.localStorage.setItem( 'reveal-speaker-layout', value );
					}

				}

				/**
				 * Returns the ID of the most recently set speaker layout
				 * or our default layout if none has been set.
				 */
				function getLayout() {

					if( supportsLocalStorage() ) {
						var layout = window.localStorage.getItem( 'reveal-speaker-layout' );
						if( layout ) {
							return layout;
						}
					}

					// Default to the first record in the layouts hash
					for( var id in SPEAKER_LAYOUTS ) {
						return id;
					}

				}

				function supportsLocalStorage() {

					try {
						localStorage.setItem('test', 'test');
						localStorage.removeItem('test');
						return true;
					}
					catch( e ) {
						return false;
					}

				}

				function zeroPadInteger( num ) {

					var str = '00' + parseInt( num );
					return str.substring( str.length - 2 );

				}

				/**
				 * Limits the frequency at which a function can be called.
				 */
				function debounce( fn, ms ) {

					var lastTime = 0,
						timeout;

					return function() {

						var args = arguments;
						var context = this;

						clearTimeout( timeout );

						var timeSinceLastCall = Date.now() - lastTime;
						if( timeSinceLastCall > ms ) {
							fn.apply( context, args );
							lastTime = Date.now();
						}
						else {
							timeout = setTimeout( function() {
								fn.apply( context, args );
								lastTime = Date.now();
							}, ms - timeSinceLastCall );
						}

					}

				}

			})();

		<\/script>
	</body>
</html>`),!e)return void alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");(function(){let o=t.getConfig().url,r=typeof o=="string"?o:window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search;c=setInterval(function(){e.postMessage(JSON.stringify({namespace:"reveal-notes",type:"connect",state:t.getState(),url:r}),"*")},500),window.addEventListener("message",a)})()}}function i(o){let r=t.getCurrentSlide(),g=r.querySelectorAll("aside.notes"),u=r.querySelector(".current-fragment"),d={namespace:"reveal-notes",type:"state",notes:"",markdown:!1,whitespace:"normal",state:t.getState()};if(r.hasAttribute("data-notes")&&(d.notes=r.getAttribute("data-notes"),d.whitespace="pre-wrap"),u){let p=u.querySelector("aside.notes");p?(d.notes=p.innerHTML,d.markdown=typeof p.getAttribute("data-markdown")=="string",g=null):u.hasAttribute("data-notes")&&(d.notes=u.getAttribute("data-notes"),d.whitespace="pre-wrap",g=null)}g&&g.length&&(g=Array.from(g).filter(p=>p.closest(".fragment")===null),d.notes=g.map(p=>p.innerHTML).join(`
`),d.markdown=g[0]&&typeof g[0].getAttribute("data-markdown")=="string"),e.postMessage(JSON.stringify(d),"*")}function a(o){if(function(r){try{return window.location.origin===r.source.location.origin}catch{return!1}}(o))try{let r=JSON.parse(o.data);r&&r.namespace==="reveal-notes"&&r.type==="connected"?(clearInterval(c),s()):r&&r.namespace==="reveal-notes"&&r.type==="call"&&function(g,u,d){let p=t[g].apply(t,u);e.postMessage(JSON.stringify({namespace:"reveal-notes",type:"return",result:p,callId:d}),"*")}(r.methodName,r.arguments,r.callId)}catch{}}function s(){t.on("slidechanged",i),t.on("fragmentshown",i),t.on("fragmenthidden",i),t.on("overviewhidden",i),t.on("overviewshown",i),t.on("paused",i),t.on("resumed",i),t.on("previewiframe",i),t.on("previewimage",i),t.on("previewvideo",i),t.on("closeoverlay",i),i()}return{id:"notes",init:function(o){t=o,/receiver/i.test(window.location.search)||(window.location.search.match(/(\?|\&)notes/gi)!==null?n():window.addEventListener("message",r=>{if(!e&&typeof r.data=="string"){let u;try{u=JSON.parse(r.data)}catch{}u&&u.namespace==="reveal-notes"&&u.type==="heartbeat"&&(g=r.source,e&&!e.closed?e.focus():(e=g,window.addEventListener("message",a),s()))}var g}),t.addKeyBinding({keyCode:83,key:"S",description:"Speaker notes view"},function(){n()}))},open:n}};var An=()=>{let c,t,e,n,i,a,s;function o(){t=document.createElement("div"),t.classList.add("searchbox"),t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.zIndex=10,t.innerHTML=`<input type="search" class="searchinput" placeholder="Search..." style="vertical-align: top;"/>
		</span>`,e=t.querySelector(".searchinput"),e.style.width="240px",e.style.fontSize="14px",e.style.padding="4px 6px",e.style.color="#000",e.style.background="#fff",e.style.borderRadius="2px",e.style.border="0",e.style.outline="0",e.style.boxShadow="0 2px 18px rgba(0, 0, 0, 0.2)",e.style["-webkit-appearance"]="none",c.getRevealElement().appendChild(t),e.addEventListener("keyup",function(p){p.keyCode===13?(p.preventDefault(),function(){if(a){var f=e.value;f===""?(s&&s.remove(),n=null):(s=new d("slidecontent"),n=s.apply(f),i=0)}n&&(n.length&&n.length<=i&&(i=0),n.length>i&&(c.slide(n[i].h,n[i].v),i++))}(),a=!1):a=!0},!1),g()}function r(){t||o(),t.style.display="inline",e.focus(),e.select()}function g(){t||o(),t.style.display="none",s&&s.remove()}function u(){t||o(),t.style.display!=="inline"?r():g()}function d(p,f){var C=document.getElementById(p)||document.body,h=f||"EM",q=new RegExp("^(?:"+h+"|SCRIPT|FORM)$"),x=["#ff6","#a0ffff","#9f9","#f99","#f6f"],D=[],Y=0,M="",A=[];this.setRegex=function(S){S=S.trim(),M=new RegExp("("+S+")","i")},this.getRegex=function(){return M.toString().replace(/^\/\\b\(|\)\\b\/i$/g,"").replace(/\|/g," ")},this.hiliteWords=function(S){if(S!=null&&S&&M&&!q.test(S.nodeName)){if(S.hasChildNodes())for(var z=0;z<S.childNodes.length;z++)this.hiliteWords(S.childNodes[z]);var U,P;if(S.nodeType==3&&(U=S.nodeValue)&&(P=M.exec(U))){for(var v=S;v!=null&&v.nodeName!="SECTION";)v=v.parentNode;var T=c.getIndices(v),I=A.length,B=!1;for(z=0;z<I;z++)A[z].h===T.h&&A[z].v===T.v&&(B=!0);B||A.push(T),D[P[0].toLowerCase()]||(D[P[0].toLowerCase()]=x[Y++%x.length]);var F=document.createElement(h);F.appendChild(document.createTextNode(P[0])),F.style.backgroundColor=D[P[0].toLowerCase()],F.style.fontStyle="inherit",F.style.color="#000";var W=S.splitText(P.index);W.nodeValue=W.nodeValue.substring(P[0].length),S.parentNode.insertBefore(F,W)}}},this.remove=function(){for(var S,z=document.getElementsByTagName(h);z.length&&(S=z[0]);)S.parentNode.replaceChild(S.firstChild,S)},this.apply=function(S){if(S!=null&&S)return this.remove(),this.setRegex(S),this.hiliteWords(C),A}}return{id:"search",init:p=>{c=p,c.registerKeyboardShortcut("CTRL + Shift + F","Search"),document.addEventListener("keydown",function(f){f.key=="F"&&(f.ctrlKey||f.metaKey)&&(f.preventDefault(),u())},!1)},open:r,close:g,toggle:u}};window.Reveal=nt;nt.initialize({width:960,height:720,margin:0,controls:!0,controlsLayout:"bottom-right",controlsTutorial:!1,controlsBackArrows:"faded",progress:!1,slideNumber:"c/t",showSlideNumber:"all",hashOneBasedIndex:!0,hash:!0,respondToHashChanges:!1,jumpToSlide:!0,history:!1,keyboard:!0,keyboardCondition:null,disableLayout:!1,overview:!0,center:!1,touch:!0,loop:!1,rtl:!1,navigationMode:"linear",shuffle:!1,fragments:!0,fragmentInURL:!0,embedded:!1,help:!0,pause:!1,showNotes:!1,autoPlayMedia:null,preloadIframes:null,autoAnimate:!1,mouseWheel:!1,previewLinks:!1,transition:"none",transitionSpeed:"fast",backgroundTransition:"none",pdfMaxPagesPerSlide:1,pdfSeparateFragments:!1,viewDistance:2,plugins:[En,An]});document.querySelector("html").style.fontSize="160%";export{nt as Reveal};
/*!
 * reveal.js 5.2.1
 * https://revealjs.com
 * MIT licensed
 *
 * Copyright (C) 2011-2024 Hakim El Hattab, https://hakim.se
 */
/*!
 * Handles finding a text string anywhere in the slides and showing the next occurrence to the user
 * by navigatating to that slide and highlighting it.
 *
 * @author Jon Snyder <snyder.jon@gmail.com>, February 2013
 */
