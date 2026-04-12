var Se=(e,t)=>{for(let n in t)e[n]=t[n];return e},k=(e,t)=>Array.from(e.querySelectorAll(t)),dt=(e,t,n)=>{n?e.classList.add(t):e.classList.remove(t)},ke=e=>{if(typeof e=="string"){if(e==="null")return null;if(e==="true")return!0;if(e==="false")return!1;if(e.match(/^-?[\d\.]+$/))return parseFloat(e)}return e},ue=(e,t)=>{e.style.transform=t},je=(e,t)=>{let n=e.matches||e.matchesSelector||e.msMatchesSelector;return!!(n&&n.call(e,t))},j=(e,t)=>{if(e&&typeof e.closest=="function")return e.closest(t);for(;e;){if(je(e,t))return e;e=e.parentElement}return null},gn=e=>{e=e||document.documentElement;let t=e.requestFullscreen||e.webkitRequestFullscreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullscreen;t&&t.apply(e)},oi=(e,t,n,i="")=>{let s=e.querySelectorAll("."+n);for(let a=0;a<s.length;a++){let o=s[a];if(o.parentNode===e)return o}let r=document.createElement(t);return r.className=n,r.innerHTML=i,e.appendChild(r),r},ut=e=>{let t=document.createElement("style");return e&&e.length>0&&t.appendChild(document.createTextNode(e)),document.head.appendChild(t),t},ln=()=>{let e={};location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi,t=>{let n=t.split("=").shift(),i=t.split("=").pop();return n&&i!==void 0&&(e[n]=i),t});for(let t in e){let n=e[t];e[t]=ke(unescape(n))}return e.dependencies!==void 0&&delete e.dependencies,e},di=(e,t=0)=>{if(e){var n;let i,s=e.style.height;return e.style.height="0px",e.parentElement&&(e.parentElement.style.height="auto"),i=t-(((n=e.parentElement)==null?void 0:n.offsetHeight)||0),e.style.height=s+"px",e.parentElement&&e.parentElement.style.removeProperty("height"),i}return t},ci={mp4:"video/mp4",m4a:"video/mp4",ogv:"video/ogg",mpeg:"video/mpeg",webm:"video/webm"},hi=(e="")=>{let t=e.split(".").pop();return t?ci[t]:void 0},ui=(e="")=>encodeURI(e).replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/[!'()*]/g,t=>`%${t.charCodeAt(0).toString(16).toUpperCase()}`),We=navigator.userAgent,ge=/(iphone|ipod|ipad|android)/gi.test(We)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1;/chrome/i.test(We)&&/edge/i.test(We);var mn=/android/gi.test(We),pi=(function(e){if(e){var t=function(v){return[].slice.call(v)},n=0,i=1,s=2,r=3,a=[],o=null,l="requestAnimationFrame"in e?function(){var v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{sync:!1};e.cancelAnimationFrame(o);var R=function(){return p(a.filter((function(C){return C.dirty&&C.active})))};if(v.sync)return R();o=e.requestAnimationFrame(R)}:function(){},c=function(v){return function(R){a.forEach((function(C){return C.dirty=v})),l(R)}},p=function(v){v.filter((function(C){return!C.styleComputed})).forEach((function(C){C.styleComputed=h(C)})),v.filter(S).forEach(T);var R=v.filter(b);R.forEach(m),R.forEach((function(C){T(C),g(C)})),R.forEach($)},g=function(v){return v.dirty=n},m=function(v){v.availableWidth=v.element.parentNode.clientWidth,v.currentWidth=v.element.scrollWidth,v.previousFontSize=v.currentFontSize,v.currentFontSize=Math.min(Math.max(v.minSize,v.availableWidth/v.currentWidth*v.previousFontSize),v.maxSize),v.whiteSpace=v.multiLine&&v.currentFontSize===v.minSize?"normal":"nowrap"},b=function(v){return v.dirty!==s||v.dirty===s&&v.element.parentNode.clientWidth!==v.availableWidth},h=function(v){var R=e.getComputedStyle(v.element,null);return v.currentFontSize=parseFloat(R.getPropertyValue("font-size")),v.display=R.getPropertyValue("display"),v.whiteSpace=R.getPropertyValue("white-space"),!0},S=function(v){var R=!1;return!v.preStyleTestCompleted&&(/inline-/.test(v.display)||(R=!0,v.display="inline-block"),v.whiteSpace!=="nowrap"&&(R=!0,v.whiteSpace="nowrap"),v.preStyleTestCompleted=!0,R)},T=function(v){v.element.style.whiteSpace=v.whiteSpace,v.element.style.display=v.display,v.element.style.fontSize=v.currentFontSize+"px"},$=function(v){v.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:v.previousFontSize,newValue:v.currentFontSize,scaleFactor:v.currentFontSize/v.previousFontSize}}))},W=function(v,R){return function(C){v.dirty=R,v.active&&l(C)}},J=function(v){return function(){a=a.filter((function(R){return R.element!==v.element})),v.observeMutations&&v.observer.disconnect(),v.element.style.whiteSpace=v.originalStyle.whiteSpace,v.element.style.display=v.originalStyle.display,v.element.style.fontSize=v.originalStyle.fontSize}},F=function(v){return function(){v.active||(v.active=!0,l())}},E=function(v){return function(){return v.active=!1}},M=function(v){v.observeMutations&&(v.observer=new MutationObserver(W(v,i)),v.observer.observe(v.element,v.observeMutations))},A={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in e&&{subtree:!0,childList:!0,characterData:!0}},P=null,O=function(){e.clearTimeout(P),P=e.setTimeout(c(s),L.observeWindowDelay)},x=["resize","orientationchange"];return Object.defineProperty(L,"observeWindow",{set:function(v){var R=`${v?"add":"remove"}EventListener`;x.forEach((function(C){e[R](C,O)}))}}),L.observeWindow=!0,L.observeWindowDelay=100,L.fitAll=c(r),L}function D(v,R){var C=Object.assign({},A,R),X=v.map((function(Z){var de=Object.assign({},C,{element:Z,active:!0});return(function(U){U.originalStyle={whiteSpace:U.element.style.whiteSpace,display:U.element.style.display,fontSize:U.element.style.fontSize},M(U),U.newbie=!0,U.dirty=!0,a.push(U)})(de),{element:Z,fit:W(de,r),unfreeze:F(de),freeze:E(de),unsubscribe:J(de)}}));return l(),X}function L(v){var R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return typeof v=="string"?D(t(document.querySelectorAll(v)),R):D([v],R)[0]}})(typeof window>"u"?null:window);function Le(e){"@babel/helpers - typeof";return Le=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},Le(e)}function gi(e,t){if(Le(e)!="object"||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var i=n.call(e,t||"default");if(Le(i)!="object")return i;throw TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(e)}function mi(e){var t=gi(e,"string");return Le(t)=="symbol"?t:t+""}function gt(e,t,n){return(t=mi(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var vi=class{constructor(e){gt(this,"allowedToPlayAudio",null),this.Reveal=e,this.startEmbeddedMedia=this.startEmbeddedMedia.bind(this),this.startEmbeddedIframe=this.startEmbeddedIframe.bind(this),this.preventIframeAutoFocus=this.preventIframeAutoFocus.bind(this),this.ensureMobileMediaPlaying=this.ensureMobileMediaPlaying.bind(this),this.failedAudioPlaybackTargets=new Set,this.failedVideoPlaybackTargets=new Set,this.failedMutedVideoPlaybackTargets=new Set,this.renderMediaPlayButton()}renderMediaPlayButton(){this.mediaPlayButton=document.createElement("button"),this.mediaPlayButton.className="r-overlay-button r-media-play-button",this.mediaPlayButton.addEventListener("click",()=>{this.resetTemporarilyMutedMedia(),new Set([...this.failedAudioPlaybackTargets,...this.failedVideoPlaybackTargets,...this.failedMutedVideoPlaybackTargets]).forEach(e=>{this.startEmbeddedMedia({target:e})}),this.clearMediaPlaybackErrors()})}shouldPreload(e){if(this.Reveal.isScrollView())return!0;let t=this.Reveal.getConfig().preloadIframes;return typeof t!="boolean"&&(t=e.hasAttribute("data-preload")),t}load(e,t={}){let n=this.Reveal.getConfig().display;if(n.includes("!important")){let s=n.replace(/\s*!important\s*$/,"").trim();e.style.setProperty("display",s,"important")}else e.style.display=n;k(e,"img[data-src], video[data-src], audio[data-src], iframe[data-src]").forEach(s=>{let r=s.tagName==="IFRAME";(!r||this.shouldPreload(s))&&(s.setAttribute("src",s.getAttribute("data-src")),s.setAttribute("data-lazy-loaded",""),s.removeAttribute("data-src"),r&&s.addEventListener("load",this.preventIframeAutoFocus))}),k(e,"video, audio").forEach(s=>{let r=0;k(s,"source[data-src]").forEach(a=>{a.setAttribute("src",a.getAttribute("data-src")),a.removeAttribute("data-src"),a.setAttribute("data-lazy-loaded",""),r+=1}),ge&&s.tagName==="VIDEO"&&s.setAttribute("playsinline",""),r>0&&s.load()});let i=e.slideBackgroundElement;if(i){i.style.display="block";let s=e.slideBackgroundContentElement,r=e.getAttribute("data-background-iframe");if(i.hasAttribute("data-loaded")===!1){i.setAttribute("data-loaded","true");let o=e.getAttribute("data-background-image"),l=e.getAttribute("data-background-video"),c=e.hasAttribute("data-background-video-loop"),p=e.hasAttribute("data-background-video-muted");if(o)/^data:/.test(o.trim())?s.style.backgroundImage=`url(${o.trim()})`:s.style.backgroundImage=o.split(",").map(g=>`url(${ui(decodeURI(g.trim()))})`).join(",");else if(l){let g=document.createElement("video");c&&g.setAttribute("loop",""),(p||this.Reveal.isSpeakerNotes())&&(g.muted=!0),ge&&g.setAttribute("playsinline",""),l.split(",").forEach(m=>{let b=document.createElement("source");b.setAttribute("src",m);let h=hi(m);h&&b.setAttribute("type",h),g.appendChild(b)}),s.appendChild(g)}else if(r&&t.excludeIframes!==!0){let g=document.createElement("iframe");g.setAttribute("allowfullscreen",""),g.setAttribute("mozallowfullscreen",""),g.setAttribute("webkitallowfullscreen",""),g.setAttribute("allow","autoplay"),g.setAttribute("data-src",r),g.style.width="100%",g.style.height="100%",g.style.maxHeight="100%",g.style.maxWidth="100%",s.appendChild(g)}}let a=s.querySelector("iframe[data-src]");a&&this.shouldPreload(i)&&!/autoplay=(1|true|yes)/gi.test(r)&&a.getAttribute("src")!==r&&a.setAttribute("src",r)}this.layout(e)}layout(e){Array.from(e.querySelectorAll(".r-fit-text")).forEach(t=>{pi(t,{minSize:24,maxSize:this.Reveal.getConfig().height*.8,observeMutations:!1,observeWindow:!1})})}unload(e){e.style.display="none";let t=this.Reveal.getSlideBackground(e);t&&(t.style.display="none",k(t,"iframe[src]").forEach(n=>{n.removeAttribute("src")})),k(e,"video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]").forEach(n=>{n.setAttribute("data-src",n.getAttribute("src")),n.removeAttribute("src")}),k(e,"video[data-lazy-loaded] source[src], audio source[src]").forEach(n=>{n.setAttribute("data-src",n.getAttribute("src")),n.removeAttribute("src")})}formatEmbeddedContent(){let e=(t,n,i)=>{k(this.Reveal.getSlidesElement(),"iframe["+t+'*="'+n+'"]').forEach(s=>{let r=s.getAttribute(t);r&&r.indexOf(i)===-1&&s.setAttribute(t,r+(/\?/.test(r)?"&":"?")+i)})};e("src","youtube.com/embed/","enablejsapi=1"),e("data-src","youtube.com/embed/","enablejsapi=1"),e("src","player.vimeo.com/","api=1"),e("data-src","player.vimeo.com/","api=1")}startEmbeddedContent(e){if(e){let t=this.Reveal.isSpeakerNotes();k(e,'img[src$=".gif"]').forEach(n=>{n.setAttribute("src",n.getAttribute("src"))}),k(e,"video, audio").forEach(n=>{if(j(n,".fragment")&&!j(n,".fragment.visible"))return;let i=this.Reveal.getConfig().autoPlayMedia;if(typeof i!="boolean"&&(i=n.hasAttribute("data-autoplay")||!!j(n,".slide-background")),i&&typeof n.play=="function"){if(t&&!n.muted)return;n.readyState>1?this.startEmbeddedMedia({target:n}):ge?(n.addEventListener("canplay",this.ensureMobileMediaPlaying),this.playMediaElement(n)):(n.removeEventListener("loadeddata",this.startEmbeddedMedia),n.addEventListener("loadeddata",this.startEmbeddedMedia))}}),t||(k(e,"iframe[src]").forEach(n=>{j(n,".fragment")&&!j(n,".fragment.visible")||this.startEmbeddedIframe({target:n})}),k(e,"iframe[data-src]").forEach(n=>{j(n,".fragment")&&!j(n,".fragment.visible")||n.getAttribute("src")!==n.getAttribute("data-src")&&(n.removeEventListener("load",this.startEmbeddedIframe),n.addEventListener("load",this.startEmbeddedIframe),n.setAttribute("src",n.getAttribute("data-src")))}))}}ensureMobileMediaPlaying(e){let t=e.target;typeof t.getVideoPlaybackQuality=="function"&&setTimeout(()=>{let n=t.paused===!1,i=t.getVideoPlaybackQuality().totalVideoFrames;n&&i===0&&(t.load(),t.play())},1e3)}startEmbeddedMedia(e){let t=!!j(e.target,"html"),n=!!j(e.target,".present");t&&n&&(e.target.paused||e.target.ended)&&(e.target.currentTime=0,this.playMediaElement(e.target)),e.target.removeEventListener("loadeddata",this.startEmbeddedMedia)}playMediaElement(e){let t=e.play();t&&typeof t.catch=="function"&&t.then(()=>{e.muted||(this.allowedToPlayAudio=!0)}).catch(n=>{if(n.name==="NotAllowedError")if(this.allowedToPlayAudio=!1,e.tagName==="VIDEO"){this.onVideoPlaybackNotAllowed(e);let i=!!j(e,"html"),s=!!j(e,".present"),r=e.muted;i&&s&&!r&&(e.setAttribute("data-muted-by-reveal","true"),e.muted=!0,e.play().catch(()=>{this.onMutedVideoPlaybackNotAllowed(e)}))}else e.tagName==="AUDIO"&&this.onAudioPlaybackNotAllowed(e)})}startEmbeddedIframe(e){let t=e.target;if(this.preventIframeAutoFocus(e),t&&t.contentWindow){let n=!!j(e.target,"html"),i=!!j(e.target,".present");if(n&&i){let s=this.Reveal.getConfig().autoPlayMedia;typeof s!="boolean"&&(s=t.hasAttribute("data-autoplay")||!!j(t,".slide-background")),/youtube\.com\/embed\//.test(t.getAttribute("src"))&&s?t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*"):/player\.vimeo\.com\//.test(t.getAttribute("src"))&&s?t.contentWindow.postMessage('{"method":"play"}',"*"):t.contentWindow.postMessage("slide:start","*")}}}stopEmbeddedContent(e,t={}){t=Se({unloadIframes:!0},t),e&&e.parentNode&&(k(e,"video, audio").forEach(n=>{!n.hasAttribute("data-ignore")&&typeof n.pause=="function"&&(n.setAttribute("data-paused-by-reveal",""),n.pause(),ge&&n.removeEventListener("canplay",this.ensureMobileMediaPlaying))}),k(e,"iframe").forEach(n=>{n.contentWindow&&n.contentWindow.postMessage("slide:stop","*"),n.removeEventListener("load",this.preventIframeAutoFocus),n.removeEventListener("load",this.startEmbeddedIframe)}),k(e,'iframe[src*="youtube.com/embed/"]').forEach(n=>{!n.hasAttribute("data-ignore")&&n.contentWindow&&typeof n.contentWindow.postMessage=="function"&&n.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}),k(e,'iframe[src*="player.vimeo.com/"]').forEach(n=>{!n.hasAttribute("data-ignore")&&n.contentWindow&&typeof n.contentWindow.postMessage=="function"&&n.contentWindow.postMessage('{"method":"pause"}',"*")}),t.unloadIframes===!0&&k(e,"iframe[data-src]").forEach(n=>{n.setAttribute("src","about:blank"),n.removeAttribute("src")}))}isAllowedToPlayAudio(){return this.allowedToPlayAudio}showPlayOrUnmuteButton(){let e=this.failedAudioPlaybackTargets.size,t=this.failedVideoPlaybackTargets.size,n=this.failedMutedVideoPlaybackTargets.size,i="Play media";n>0?i="Play video":t>0?i="Unmute video":e>0&&(i="Play audio"),this.mediaPlayButton.textContent=i,this.Reveal.getRevealElement().appendChild(this.mediaPlayButton)}onAudioPlaybackNotAllowed(e){this.failedAudioPlaybackTargets.add(e),this.showPlayOrUnmuteButton(e)}onVideoPlaybackNotAllowed(e){this.failedVideoPlaybackTargets.add(e),this.showPlayOrUnmuteButton()}onMutedVideoPlaybackNotAllowed(e){this.failedMutedVideoPlaybackTargets.add(e),this.showPlayOrUnmuteButton()}resetTemporarilyMutedMedia(){new Set([...this.failedAudioPlaybackTargets,...this.failedVideoPlaybackTargets,...this.failedMutedVideoPlaybackTargets]).forEach(e=>{e.hasAttribute("data-muted-by-reveal")&&(e.muted=!1,e.removeAttribute("data-muted-by-reveal"))})}clearMediaPlaybackErrors(){this.resetTemporarilyMutedMedia(),this.failedAudioPlaybackTargets.clear(),this.failedVideoPlaybackTargets.clear(),this.failedMutedVideoPlaybackTargets.clear(),this.mediaPlayButton&&this.mediaPlayButton.parentNode&&this.mediaPlayButton.remove()}preventIframeAutoFocus(e){let t=e.target;if(t&&this.Reveal.getConfig().preventIframeAutoFocus){let n=0,i=()=>{document.activeElement===t?document.activeElement.blur():n<1e3&&(n+=100,setTimeout(i,100))};setTimeout(i,100)}}afterSlideChanged(){this.clearMediaPlaybackErrors()}},me=".slides section",oe=".slides>section",ct=".slides>section.present>section",fi=".backgrounds>.slide-background",yi=/registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview|previewIframe/,bi=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement("div"),this.element.className="slide-number",this.Reveal.getRevealElement().appendChild(this.element)}configure(e,t){let n="none";e.slideNumber&&!this.Reveal.isPrintView()&&(e.showSlideNumber==="all"||e.showSlideNumber==="speaker"&&this.Reveal.isSpeakerNotes())&&(n="block"),this.element.style.display=n}update(){this.Reveal.getConfig().slideNumber&&this.element&&(this.element.innerHTML=this.getSlideNumber())}getSlideNumber(e=this.Reveal.getCurrentSlide()){let t=this.Reveal.getConfig(),n,i="h.v";if(typeof t.slideNumber=="function")n=t.slideNumber(e);else{typeof t.slideNumber=="string"&&(i=t.slideNumber),!/c/.test(i)&&this.Reveal.getHorizontalSlides().length===1&&(i="c");let r=e&&e.dataset.visibility==="uncounted"?0:1;switch(n=[],i){case"c":n.push(this.Reveal.getSlidePastCount(e)+r);break;case"c/t":n.push(this.Reveal.getSlidePastCount(e)+r,"/",this.Reveal.getTotalSlides());break;default:let a=this.Reveal.getIndices(e);n.push(a.h+r);let o=i==="h/v"?"/":".";this.Reveal.isVerticalSlide(e)&&n.push(o,a.v+1)}}let s="#"+this.Reveal.location.getHash(e);return this.formatNumber(n[0],n[1],n[2],s)}formatNumber(e,t,n,i="#"+this.Reveal.location.getHash()){return typeof n=="number"&&!isNaN(n)?`<a href="${i}">
					<span class="slide-number-a">${e}</span>
					<span class="slide-number-delimiter">${t}</span>
					<span class="slide-number-b">${n}</span>
					</a>`:`<a href="${i}">
					<span class="slide-number-a">${e}</span>
					</a>`}destroy(){this.element.remove()}},wi=class{constructor(e){this.Reveal=e,this.onInput=this.onInput.bind(this),this.onBlur=this.onBlur.bind(this),this.onKeyDown=this.onKeyDown.bind(this)}render(){this.element=document.createElement("div"),this.element.className="jump-to-slide",this.jumpInput=document.createElement("input"),this.jumpInput.type="text",this.jumpInput.className="jump-to-slide-input",this.jumpInput.placeholder="Jump to slide",this.jumpInput.addEventListener("input",this.onInput),this.jumpInput.addEventListener("keydown",this.onKeyDown),this.jumpInput.addEventListener("blur",this.onBlur),this.element.appendChild(this.jumpInput)}show(){this.indicesOnShow=this.Reveal.getIndices(),this.Reveal.getRevealElement().appendChild(this.element),this.jumpInput.focus()}hide(){this.isVisible()&&(this.element.remove(),this.jumpInput.value="",clearTimeout(this.jumpTimeout),delete this.jumpTimeout)}isVisible(){return!!this.element.parentNode}jump(){clearTimeout(this.jumpTimeout),delete this.jumpTimeout;let e=this.jumpInput.value.trim(""),t;if(/^\d+$/.test(e)){let n=this.Reveal.getConfig().slideNumber;if(n==="c"||n==="c/t"){let i=this.Reveal.getSlides()[parseInt(e,10)-1];i&&(t=this.Reveal.getIndices(i))}}return t||(/^\d+\.\d+$/.test(e)&&(e=e.replace(".","/")),t=this.Reveal.location.getIndicesFromHash(e,{oneBasedIndex:!0})),!t&&/\S+/i.test(e)&&e.length>1&&(t=this.search(e)),t&&e!==""?(this.Reveal.slide(t.h,t.v,t.f),!0):(this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),!1)}jumpAfter(e){clearTimeout(this.jumpTimeout),this.jumpTimeout=setTimeout(()=>this.jump(),e)}search(e){let t=RegExp("\\b"+e.trim()+"\\b","i"),n=this.Reveal.getSlides().find(i=>t.test(i.innerText));return n?this.Reveal.getIndices(n):null}cancel(){this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),this.hide()}confirm(){this.jump(),this.hide()}destroy(){this.jumpInput.removeEventListener("input",this.onInput),this.jumpInput.removeEventListener("keydown",this.onKeyDown),this.jumpInput.removeEventListener("blur",this.onBlur),this.element.remove()}onKeyDown(e){e.keyCode===13?this.confirm():e.keyCode===27&&(this.cancel(),e.stopImmediatePropagation())}onInput(e){this.jumpAfter(200)}onBlur(){setTimeout(()=>this.hide(),1)}},pt=e=>{let t=e.match(/^#([0-9a-f]{3})$/i);if(t&&t[1]){let r=t[1];return{r:parseInt(r.charAt(0),16)*17,g:parseInt(r.charAt(1),16)*17,b:parseInt(r.charAt(2),16)*17}}let n=e.match(/^#([0-9a-f]{6})$/i);if(n&&n[1]){let r=n[1];return{r:parseInt(r.slice(0,2),16),g:parseInt(r.slice(2,4),16),b:parseInt(r.slice(4,6),16)}}let i=e.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);if(i)return{r:parseInt(i[1],10),g:parseInt(i[2],10),b:parseInt(i[3],10)};let s=e.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);return s?{r:parseInt(s[1],10),g:parseInt(s[2],10),b:parseInt(s[3],10),a:parseFloat(s[4])}:null},ki=e=>(typeof e=="string"&&(e=pt(e)),e?(e.r*299+e.g*587+e.b*114)/1e3:null),Si=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement("div"),this.element.className="backgrounds",this.Reveal.getRevealElement().appendChild(this.element)}create(){this.element.innerHTML="",this.element.classList.add("no-transition"),this.Reveal.getHorizontalSlides().forEach(e=>{let t=this.createBackground(e,this.element);k(e,"section").forEach(n=>{this.createBackground(n,t),t.classList.add("stack")})}),this.Reveal.getConfig().parallaxBackgroundImage?(this.element.style.backgroundImage='url("'+this.Reveal.getConfig().parallaxBackgroundImage+'")',this.element.style.backgroundSize=this.Reveal.getConfig().parallaxBackgroundSize,this.element.style.backgroundRepeat=this.Reveal.getConfig().parallaxBackgroundRepeat,this.element.style.backgroundPosition=this.Reveal.getConfig().parallaxBackgroundPosition,setTimeout(()=>{this.Reveal.getRevealElement().classList.add("has-parallax-background")},1)):(this.element.style.backgroundImage="",this.Reveal.getRevealElement().classList.remove("has-parallax-background"))}createBackground(e,t){let n=document.createElement("div");n.className="slide-background "+e.className.replace(/present|past|future/,"");let i=document.createElement("div");return i.className="slide-background-content",n.appendChild(i),t.appendChild(n),e.slideBackgroundElement=n,e.slideBackgroundContentElement=i,this.sync(e),n}sync(e){let t=e.slideBackgroundElement,n=e.slideBackgroundContentElement,i={background:e.getAttribute("data-background"),backgroundSize:e.getAttribute("data-background-size"),backgroundImage:e.getAttribute("data-background-image"),backgroundVideo:e.getAttribute("data-background-video"),backgroundIframe:e.getAttribute("data-background-iframe"),backgroundColor:e.getAttribute("data-background-color"),backgroundGradient:e.getAttribute("data-background-gradient"),backgroundRepeat:e.getAttribute("data-background-repeat"),backgroundPosition:e.getAttribute("data-background-position"),backgroundTransition:e.getAttribute("data-background-transition"),backgroundOpacity:e.getAttribute("data-background-opacity")},s=e.hasAttribute("data-preload");e.classList.remove("has-dark-background"),e.classList.remove("has-light-background"),t.removeAttribute("data-loaded"),t.removeAttribute("data-background-hash"),t.removeAttribute("data-background-size"),t.removeAttribute("data-background-transition"),t.style.backgroundColor="",n.style.backgroundSize="",n.style.backgroundRepeat="",n.style.backgroundPosition="",n.style.backgroundImage="",n.style.opacity="",n.innerHTML="",i.background&&(/^(http|file|\/\/)/gi.test(i.background)||/\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(i.background)?e.setAttribute("data-background-image",i.background):t.style.background=i.background),(i.background||i.backgroundColor||i.backgroundGradient||i.backgroundImage||i.backgroundVideo||i.backgroundIframe)&&t.setAttribute("data-background-hash",i.background+i.backgroundSize+i.backgroundImage+i.backgroundVideo+i.backgroundIframe+i.backgroundColor+i.backgroundGradient+i.backgroundRepeat+i.backgroundPosition+i.backgroundTransition+i.backgroundOpacity),i.backgroundSize&&t.setAttribute("data-background-size",i.backgroundSize),i.backgroundColor&&(t.style.backgroundColor=i.backgroundColor),i.backgroundGradient&&(t.style.backgroundImage=i.backgroundGradient),i.backgroundTransition&&t.setAttribute("data-background-transition",i.backgroundTransition),s&&t.setAttribute("data-preload",""),i.backgroundSize&&(n.style.backgroundSize=i.backgroundSize),i.backgroundRepeat&&(n.style.backgroundRepeat=i.backgroundRepeat),i.backgroundPosition&&(n.style.backgroundPosition=i.backgroundPosition),i.backgroundOpacity&&(n.style.opacity=i.backgroundOpacity);let r=this.getContrastClass(e);typeof r=="string"&&e.classList.add(r)}getContrastClass(e){let t=e.slideBackgroundElement,n=e.getAttribute("data-background-color");if(!n||!pt(n)){let i=window.getComputedStyle(t);i&&i.backgroundColor&&(n=i.backgroundColor)}if(n){let i=pt(n);if(i&&i.a!==0)return ki(n)<128?"has-dark-background":"has-light-background"}return null}bubbleSlideContrastClassToElement(e,t){["has-light-background","has-dark-background"].forEach(n=>{e.classList.contains(n)?t.classList.add(n):t.classList.remove(n)},this)}update(e=!1){let t=this.Reveal.getConfig(),n=this.Reveal.getCurrentSlide(),i=this.Reveal.getIndices(),s=null,r=t.rtl?"future":"past",a=t.rtl?"past":"future";if(Array.from(this.element.childNodes).forEach((l,c)=>{l.classList.remove("past","present","future"),c<i.h?l.classList.add(r):c>i.h?l.classList.add(a):(l.classList.add("present"),s=l),(e||c===i.h)&&k(l,".slide-background").forEach((p,g)=>{p.classList.remove("past","present","future");let m=typeof i.v=="number"?i.v:0;g<m?p.classList.add("past"):g>m?p.classList.add("future"):(p.classList.add("present"),c===i.h&&(s=p))})}),this.previousBackground&&!this.previousBackground.closest("body")&&(this.previousBackground=null),s&&this.previousBackground){let l=this.previousBackground.getAttribute("data-background-hash"),c=s.getAttribute("data-background-hash");if(c&&c===l&&s!==this.previousBackground){this.element.classList.add("no-transition");let p=s.querySelector("video"),g=this.previousBackground.querySelector("video");if(p&&g){let m=p.parentNode;g.parentNode.appendChild(p),m.appendChild(g)}}}let o=s!==this.previousBackground;if(o&&this.previousBackground&&this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground,{unloadIframes:!this.Reveal.slideContent.shouldPreload(this.previousBackground)}),o&&s){this.Reveal.slideContent.startEmbeddedContent(s);let l=s.querySelector(".slide-background-content");if(l){let c=l.style.backgroundImage||"";/\.gif/i.test(c)&&(l.style.backgroundImage="",window.getComputedStyle(l).opacity,l.style.backgroundImage=c)}this.previousBackground=s}n&&this.bubbleSlideContrastClassToElement(n,this.Reveal.getRevealElement()),setTimeout(()=>{this.element.classList.remove("no-transition")},10)}updateParallax(){let e=this.Reveal.getIndices();if(this.Reveal.getConfig().parallaxBackgroundImage){let t=this.Reveal.getHorizontalSlides(),n=this.Reveal.getVerticalSlides(),i=this.element.style.backgroundSize.split(" "),s,r;i.length===1?s=r=parseInt(i[0],10):(s=parseInt(i[0],10),r=parseInt(i[1],10));let a=this.element.offsetWidth,o=t.length,l,c;l=typeof this.Reveal.getConfig().parallaxBackgroundHorizontal=="number"?this.Reveal.getConfig().parallaxBackgroundHorizontal:o>1?(s-a)/(o-1):0,c=l*e.h*-1;let p=this.element.offsetHeight,g=n.length,m,b;m=typeof this.Reveal.getConfig().parallaxBackgroundVertical=="number"?this.Reveal.getConfig().parallaxBackgroundVertical:(r-p)/(g-1),b=g>0?m*e.v:0,this.element.style.backgroundPosition=c+"px "+-b+"px"}}destroy(){this.element.remove()}},on=0,Ei=class{constructor(e){this.Reveal=e}run(e,t){this.reset();let n=this.Reveal.getSlides(),i=n.indexOf(t),s=n.indexOf(e);if(e&&t&&e.hasAttribute("data-auto-animate")&&t.hasAttribute("data-auto-animate")&&e.getAttribute("data-auto-animate-id")===t.getAttribute("data-auto-animate-id")&&!(i>s?t:e).hasAttribute("data-auto-animate-restart")){this.autoAnimateStyleSheet=this.autoAnimateStyleSheet||ut();let r=this.getAutoAnimateOptions(t);e.dataset.autoAnimate="pending",t.dataset.autoAnimate="pending",r.slideDirection=i>s?"forward":"backward";let a=e.style.display==="none";a&&(e.style.display=this.Reveal.getConfig().display);let o=this.getAutoAnimatableElements(e,t).map(l=>this.autoAnimateElements(l.from,l.to,l.options||{},r,on++));if(a&&(e.style.display="none"),t.dataset.autoAnimateUnmatched!=="false"&&this.Reveal.getConfig().autoAnimateUnmatched===!0){let l=r.duration*.8,c=r.duration*.2;this.getUnmatchedAutoAnimateElements(t).forEach(p=>{let g=this.getAutoAnimateOptions(p,r),m="unmatched";(g.duration!==r.duration||g.delay!==r.delay)&&(m="unmatched-"+on++,o.push(`[data-auto-animate="running"] [data-auto-animate-target="${m}"] { transition: opacity ${g.duration}s ease ${g.delay}s; }`)),p.dataset.autoAnimateTarget=m},this),o.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${l}s ease ${c}s; }`)}this.autoAnimateStyleSheet.innerHTML=o.join(""),requestAnimationFrame(()=>{this.autoAnimateStyleSheet&&(getComputedStyle(this.autoAnimateStyleSheet).fontWeight,t.dataset.autoAnimate="running")}),this.Reveal.dispatchEvent({type:"autoanimate",data:{fromSlide:e,toSlide:t,sheet:this.autoAnimateStyleSheet}})}}reset(){k(this.Reveal.getRevealElement(),'[data-auto-animate]:not([data-auto-animate=""])').forEach(e=>{e.dataset.autoAnimate=""}),k(this.Reveal.getRevealElement(),"[data-auto-animate-target]").forEach(e=>{delete e.dataset.autoAnimateTarget}),this.autoAnimateStyleSheet&&this.autoAnimateStyleSheet.parentNode&&(this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet),this.autoAnimateStyleSheet=null)}autoAnimateElements(e,t,n,i,s){e.dataset.autoAnimateTarget="",t.dataset.autoAnimateTarget=s;let r=this.getAutoAnimateOptions(t,i);n.delay!==void 0&&(r.delay=n.delay),n.duration!==void 0&&(r.duration=n.duration),n.easing!==void 0&&(r.easing=n.easing);let a=this.getAutoAnimatableProperties("from",e,n),o=this.getAutoAnimatableProperties("to",t,n);if(t.classList.contains("fragment")&&delete o.styles.opacity,n.translate!==!1||n.scale!==!1){let p=this.Reveal.getScale(),g={x:(a.x-o.x)/p,y:(a.y-o.y)/p,scaleX:a.width/o.width,scaleY:a.height/o.height};g.x=Math.round(g.x*1e3)/1e3,g.y=Math.round(g.y*1e3)/1e3,g.scaleX=Math.round(g.scaleX*1e3)/1e3,g.scaleX=Math.round(g.scaleX*1e3)/1e3;let m=n.translate!==!1&&(g.x!==0||g.y!==0),b=n.scale!==!1&&(g.scaleX!==0||g.scaleY!==0);if(m||b){let h=[];m&&h.push(`translate(${g.x}px, ${g.y}px)`),b&&h.push(`scale(${g.scaleX}, ${g.scaleY})`),a.styles.transform=h.join(" "),a.styles["transform-origin"]="top left",o.styles.transform="none"}}for(let p in o.styles){let g=o.styles[p],m=a.styles[p];g===m?delete o.styles[p]:(g.explicitValue===!0&&(o.styles[p]=g.value),m.explicitValue===!0&&(a.styles[p]=m.value))}let l="",c=Object.keys(o.styles);if(c.length>0){a.styles.transition="none",o.styles.transition=`all ${r.duration}s ${r.easing} ${r.delay}s`,o.styles["transition-property"]=c.join(", "),o.styles["will-change"]=c.join(", ");let p=Object.keys(a.styles).map(m=>m+": "+a.styles[m]+" !important;").join(""),g=Object.keys(o.styles).map(m=>m+": "+o.styles[m]+" !important;").join("");l='[data-auto-animate-target="'+s+'"] {'+p+'}[data-auto-animate="running"] [data-auto-animate-target="'+s+'"] {'+g+"}"}return l}getAutoAnimateOptions(e,t){let n={easing:this.Reveal.getConfig().autoAnimateEasing,duration:this.Reveal.getConfig().autoAnimateDuration,delay:0};if(n=Se(n,t),e.parentNode){let i=j(e.parentNode,"[data-auto-animate-target]");i&&(n=this.getAutoAnimateOptions(i,n))}return e.dataset.autoAnimateEasing&&(n.easing=e.dataset.autoAnimateEasing),e.dataset.autoAnimateDuration&&(n.duration=parseFloat(e.dataset.autoAnimateDuration)),e.dataset.autoAnimateDelay&&(n.delay=parseFloat(e.dataset.autoAnimateDelay)),n}getAutoAnimatableProperties(e,t,n){let i=this.Reveal.getConfig(),s={styles:[]};if(n.translate!==!1||n.scale!==!1){let a;if(typeof n.measure=="function")a=n.measure(t);else if(i.center)a=t.getBoundingClientRect();else{let o=this.Reveal.getScale();a={x:t.offsetLeft*o,y:t.offsetTop*o,width:t.offsetWidth*o,height:t.offsetHeight*o}}s.x=a.x,s.y=a.y,s.width=a.width,s.height=a.height}let r=getComputedStyle(t);return(n.styles||i.autoAnimateStyles).forEach(a=>{let o;typeof a=="string"&&(a={property:a}),a.from!==void 0&&e==="from"?o={value:a.from,explicitValue:!0}:a.to!==void 0&&e==="to"?o={value:a.to,explicitValue:!0}:(a.property==="line-height"&&(o=parseFloat(r["line-height"])/parseFloat(r["font-size"])),isNaN(o)&&(o=r[a.property])),o!==""&&(s.styles[a.property]=o)}),s}getAutoAnimatableElements(e,t){let n=(typeof this.Reveal.getConfig().autoAnimateMatcher=="function"?this.Reveal.getConfig().autoAnimateMatcher:this.getAutoAnimatePairs).call(this,e,t),i=[];return n.filter((s,r)=>{if(i.indexOf(s.to)===-1)return i.push(s.to),!0})}getAutoAnimatePairs(e,t){let n=[],i="h1, h2, h3, h4, h5, h6, p, li";return this.findAutoAnimateMatches(n,e,t,"[data-id]",s=>s.nodeName+":::"+s.getAttribute("data-id")),this.findAutoAnimateMatches(n,e,t,i,s=>s.nodeName+":::"+s.textContent.trim()),this.findAutoAnimateMatches(n,e,t,"img, video, iframe",s=>s.nodeName+":::"+(s.getAttribute("src")||s.getAttribute("data-src"))),this.findAutoAnimateMatches(n,e,t,"pre",s=>s.nodeName+":::"+s.textContent.trim()),n.forEach(s=>{je(s.from,i)?s.options={scale:!1}:je(s.from,"pre")&&(s.options={scale:!1,styles:["width","height"]},this.findAutoAnimateMatches(n,s.from,s.to,".hljs .hljs-ln-code",r=>r.textContent,{scale:!1,styles:[],measure:this.getLocalBoundingBox.bind(this)}),this.findAutoAnimateMatches(n,s.from,s.to,".hljs .hljs-ln-numbers[data-line-number]",r=>r.getAttribute("data-line-number"),{scale:!1,styles:["width"],measure:this.getLocalBoundingBox.bind(this)}))},this),n}getLocalBoundingBox(e){let t=this.Reveal.getScale();return{x:Math.round(e.offsetLeft*t*100)/100,y:Math.round(e.offsetTop*t*100)/100,width:Math.round(e.offsetWidth*t*100)/100,height:Math.round(e.offsetHeight*t*100)/100}}findAutoAnimateMatches(e,t,n,i,s,r){let a={},o={};[].slice.call(t.querySelectorAll(i)).forEach((l,c)=>{let p=s(l);typeof p=="string"&&p.length&&(a[p]=a[p]||[],a[p].push(l))}),[].slice.call(n.querySelectorAll(i)).forEach((l,c)=>{let p=s(l);o[p]=o[p]||[],o[p].push(l);let g;if(a[p]){let m=o[p].length-1,b=a[p].length-1;a[p][m]?(g=a[p][m],a[p][m]=null):a[p][b]&&(g=a[p][b],a[p][b]=null)}g&&e.push({from:g,to:l,options:r})})}getUnmatchedAutoAnimateElements(e){return[].slice.call(e.children).reduce((t,n)=>{let i=n.querySelector("[data-auto-animate-target]");return!n.hasAttribute("data-auto-animate-target")&&!i&&t.push(n),n.querySelector("[data-auto-animate-target]")&&(t=t.concat(this.getUnmatchedAutoAnimateElements(n))),t},[])}},xi=500,Ri=4,Ai=6,Li=8,Ti=class{constructor(e){this.Reveal=e,this.active=!1,this.activatedCallbacks=[],this.onScroll=this.onScroll.bind(this)}activate(){if(this.active)return;let e=this.Reveal.getState();this.active=!0,this.slideHTMLBeforeActivation=this.Reveal.getSlidesElement().innerHTML;let t=k(this.Reveal.getRevealElement(),oe),n=k(this.Reveal.getRevealElement(),fi);this.viewportElement.classList.add("loading-scroll-mode","reveal-scroll");let i,s=window.getComputedStyle(this.viewportElement);s&&s.background&&(i=s.background);let r=[],a=t[0].parentNode,o,l=(c,p,g,m)=>{let b;if(o&&this.Reveal.shouldAutoAnimateBetween(o,c))b=document.createElement("div"),b.className="scroll-page-content scroll-auto-animate-page",b.style.display="none",o.closest(".scroll-page-content").parentNode.appendChild(b);else{let h=document.createElement("div");if(h.className="scroll-page",r.push(h),m&&n.length>p){let T=n[p],$=window.getComputedStyle(T);$&&$.background?h.style.background=$.background:i&&(h.style.background=i)}else i&&(h.style.background=i);let S=document.createElement("div");S.className="scroll-page-sticky",h.appendChild(S),b=document.createElement("div"),b.className="scroll-page-content",S.appendChild(b)}b.appendChild(c),c.classList.remove("past","future"),c.setAttribute("data-index-h",p),c.setAttribute("data-index-v",g),c.slideBackgroundElement&&(c.slideBackgroundElement.remove("past","future"),b.insertBefore(c.slideBackgroundElement,c)),o=c};t.forEach((c,p)=>{this.Reveal.isVerticalStack(c)?c.querySelectorAll("section").forEach((g,m)=>{l(g,p,m,!0)}):l(c,p,0)},this),this.createProgressBar(),k(this.Reveal.getRevealElement(),".stack").forEach(c=>c.remove()),r.forEach(c=>a.appendChild(c)),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.layout(),this.Reveal.setState(e),this.activatedCallbacks.forEach(c=>c()),this.activatedCallbacks=[],this.restoreScrollPosition(),this.viewportElement.classList.remove("loading-scroll-mode"),this.viewportElement.addEventListener("scroll",this.onScroll,{passive:!0})}deactivate(){if(!this.active)return;let e=this.Reveal.getState();this.active=!1,this.viewportElement.removeEventListener("scroll",this.onScroll),this.viewportElement.classList.remove("reveal-scroll"),this.removeProgressBar(),this.Reveal.getSlidesElement().innerHTML=this.slideHTMLBeforeActivation,this.Reveal.sync(),this.Reveal.setState(e),this.slideHTMLBeforeActivation=null}toggle(e){typeof e=="boolean"?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}createProgressBar(){this.progressBar=document.createElement("div"),this.progressBar.className="scrollbar",this.progressBarInner=document.createElement("div"),this.progressBarInner.className="scrollbar-inner",this.progressBar.appendChild(this.progressBarInner),this.progressBarPlayhead=document.createElement("div"),this.progressBarPlayhead.className="scrollbar-playhead",this.progressBarInner.appendChild(this.progressBarPlayhead),this.viewportElement.insertBefore(this.progressBar,this.viewportElement.firstChild);let e=n=>{let i=(n.clientY-this.progressBarInner.getBoundingClientRect().top)/this.progressBarHeight;i=Math.max(Math.min(i,1),0),this.viewportElement.scrollTop=i*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight)},t=n=>{this.draggingProgressBar=!1,this.showProgressBar(),document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t)};this.progressBarInner.addEventListener("mousedown",n=>{n.preventDefault(),this.draggingProgressBar=!0,document.addEventListener("mousemove",e),document.addEventListener("mouseup",t),e(n)})}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null)}layout(){this.isActive()&&(this.syncPages(),this.syncScrollPosition())}syncPages(){let e=this.Reveal.getConfig(),t=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),n=this.Reveal.getScale(),i=e.scrollLayout==="compact",s=this.viewportElement.offsetHeight,r=t.height*n,a=i?r:s;this.scrollTriggerHeight=i?r:s,this.viewportElement.style.setProperty("--page-height",a+"px"),this.viewportElement.style.scrollSnapType=typeof e.scrollSnap=="string"?`y ${e.scrollSnap}`:"",this.slideTriggers=[],this.pages=Array.from(this.Reveal.getRevealElement().querySelectorAll(".scroll-page")).map(o=>{let l=this.createPage({pageElement:o,slideElement:o.querySelector("section"),stickyElement:o.querySelector(".scroll-page-sticky"),contentElement:o.querySelector(".scroll-page-content"),backgroundElement:o.querySelector(".slide-background"),autoAnimateElements:o.querySelectorAll(".scroll-auto-animate-page"),autoAnimatePages:[]});l.pageElement.style.setProperty("--slide-height",e.center===!0?"auto":t.height+"px"),this.slideTriggers.push({page:l,activate:()=>this.activatePage(l),deactivate:()=>this.deactivatePage(l)}),this.createFragmentTriggersForPage(l),l.autoAnimateElements.length>0&&this.createAutoAnimateTriggersForPage(l);let c=Math.max(l.scrollTriggers.length-1,0);c+=l.autoAnimatePages.reduce((p,g)=>p+Math.max(g.scrollTriggers.length-1,0),l.autoAnimatePages.length),l.pageElement.querySelectorAll(".scroll-snap-point").forEach(p=>p.remove());for(let p=0;p<c+1;p++){let g=document.createElement("div");g.className="scroll-snap-point",g.style.height=this.scrollTriggerHeight+"px",g.style.scrollSnapAlign=i?"center":"start",l.pageElement.appendChild(g),p===0&&(g.style.marginTop=-this.scrollTriggerHeight+"px")}return i&&l.scrollTriggers.length>0?(l.pageHeight=s,l.pageElement.style.setProperty("--page-height",s+"px")):(l.pageHeight=a,l.pageElement.style.removeProperty("--page-height")),l.scrollPadding=this.scrollTriggerHeight*c,l.totalHeight=l.pageHeight+l.scrollPadding,l.pageElement.style.setProperty("--page-scroll-padding",l.scrollPadding+"px"),c>0?(l.stickyElement.style.position="sticky",l.stickyElement.style.top=Math.max((s-l.pageHeight)/2,0)+"px"):(l.stickyElement.style.position="relative",l.pageElement.style.scrollSnapAlign=l.pageHeight<s?"center":"start"),l}),this.setTriggerRanges(),this.viewportElement.setAttribute("data-scrollbar",e.scrollProgress),e.scrollProgress&&this.totalScrollTriggerCount>1?(this.progressBar||this.createProgressBar(),this.syncProgressBar()):this.removeProgressBar()}setTriggerRanges(){this.totalScrollTriggerCount=this.slideTriggers.reduce((t,n)=>t+Math.max(n.page.scrollTriggers.length,1),0);let e=0;this.slideTriggers.forEach((t,n)=>{t.range=[e,e+Math.max(t.page.scrollTriggers.length,1)/this.totalScrollTriggerCount];let i=(t.range[1]-t.range[0])/t.page.scrollTriggers.length;t.page.scrollTriggers.forEach((s,r)=>{s.range=[e+r*i,e+(r+1)*i]}),e=t.range[1]}),this.slideTriggers[this.slideTriggers.length-1].range[1]=1}createFragmentTriggersForPage(e,t){t=t||e.slideElement;let n=this.Reveal.fragments.sort(t.querySelectorAll(".fragment"),!0);return n.length&&(e.fragments=this.Reveal.fragments.sort(t.querySelectorAll(".fragment:not(.disabled)")),e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(-1,e.fragments,t)}}),n.forEach((i,s)=>{e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(s,e.fragments,t)}})})),e.scrollTriggers.length}createAutoAnimateTriggersForPage(e){e.autoAnimateElements.length>0&&this.slideTriggers.push(...Array.from(e.autoAnimateElements).map((t,n)=>{let i=this.createPage({slideElement:t.querySelector("section"),contentElement:t,backgroundElement:t.querySelector(".slide-background")});return this.createFragmentTriggersForPage(i,i.slideElement),e.autoAnimatePages.push(i),{page:i,activate:()=>this.activatePage(i),deactivate:()=>this.deactivatePage(i)}}))}createPage(e){return e.scrollTriggers=[],e.indexh=parseInt(e.slideElement.getAttribute("data-index-h"),10),e.indexv=parseInt(e.slideElement.getAttribute("data-index-v"),10),e}syncProgressBar(){this.progressBarInner.querySelectorAll(".scrollbar-slide").forEach(r=>r.remove());let e=this.viewportElement.scrollHeight,t=this.viewportElement.offsetHeight,n=t/e;this.progressBarHeight=this.progressBarInner.offsetHeight,this.playheadHeight=Math.max(n*this.progressBarHeight,Li),this.progressBarScrollableHeight=this.progressBarHeight-this.playheadHeight;let i=t/e*this.progressBarHeight,s=Math.min(i/8,Ri);this.progressBarPlayhead.style.height=this.playheadHeight-s+"px",i>Ai?this.slideTriggers.forEach(r=>{let{page:a}=r;a.progressBarSlide=document.createElement("div"),a.progressBarSlide.className="scrollbar-slide",a.progressBarSlide.style.top=r.range[0]*this.progressBarHeight+"px",a.progressBarSlide.style.height=(r.range[1]-r.range[0])*this.progressBarHeight-s+"px",a.progressBarSlide.classList.toggle("has-triggers",a.scrollTriggers.length>0),this.progressBarInner.appendChild(a.progressBarSlide),a.scrollTriggerElements=a.scrollTriggers.map((o,l)=>{let c=document.createElement("div");return c.className="scrollbar-trigger",c.style.top=(o.range[0]-r.range[0])*this.progressBarHeight+"px",c.style.height=(o.range[1]-o.range[0])*this.progressBarHeight-s+"px",a.progressBarSlide.appendChild(c),l===0&&(c.style.display="none"),c})}):this.pages.forEach(r=>r.progressBarSlide=null)}syncScrollPosition(){let e=this.viewportElement.offsetHeight,t=e/this.viewportElement.scrollHeight,n=this.viewportElement.scrollTop,i=this.viewportElement.scrollHeight-e,s=Math.max(Math.min(n/i,1),0),r=Math.max(Math.min((n+e/2)/this.viewportElement.scrollHeight,1),0),a;this.slideTriggers.forEach(o=>{let{page:l}=o;s>=o.range[0]-t*2&&s<=o.range[1]+t*2&&!l.loaded?(l.loaded=!0,this.Reveal.slideContent.load(l.slideElement)):l.loaded&&(l.loaded=!1,this.Reveal.slideContent.unload(l.slideElement)),s>=o.range[0]&&s<=o.range[1]?(this.activateTrigger(o),a=o.page):o.active&&this.deactivateTrigger(o)}),a&&a.scrollTriggers.forEach(o=>{r>=o.range[0]&&r<=o.range[1]?this.activateTrigger(o):o.active&&this.deactivateTrigger(o)}),this.setProgressBarValue(n/(this.viewportElement.scrollHeight-e))}setProgressBarValue(e){this.progressBar&&(this.progressBarPlayhead.style.transform=`translateY(${e*this.progressBarScrollableHeight}px)`,this.getAllPages().filter(t=>t.progressBarSlide).forEach(t=>{t.progressBarSlide.classList.toggle("active",t.active===!0),t.scrollTriggers.forEach((n,i)=>{t.scrollTriggerElements[i].classList.toggle("active",t.active===!0&&n.active===!0)})}),this.showProgressBar())}showProgressBar(){this.progressBar.classList.add("visible"),clearTimeout(this.hideProgressBarTimeout),this.Reveal.getConfig().scrollProgress==="auto"&&!this.draggingProgressBar&&(this.hideProgressBarTimeout=setTimeout(()=>{this.progressBar&&this.progressBar.classList.remove("visible")},xi))}prev(){this.viewportElement.scrollTop-=this.scrollTriggerHeight}next(){this.viewportElement.scrollTop+=this.scrollTriggerHeight}scrollToSlide(e){if(!this.active)this.activatedCallbacks.push(()=>this.scrollToSlide(e));else{let t=this.getScrollTriggerBySlide(e);t&&(this.viewportElement.scrollTop=t.range[0]*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight))}}storeScrollPosition(){clearTimeout(this.storeScrollPositionTimeout),this.storeScrollPositionTimeout=setTimeout(()=>{sessionStorage.setItem("reveal-scroll-top",this.viewportElement.scrollTop),sessionStorage.setItem("reveal-scroll-origin",location.origin+location.pathname),this.storeScrollPositionTimeout=null},50)}restoreScrollPosition(){let e=sessionStorage.getItem("reveal-scroll-top"),t=sessionStorage.getItem("reveal-scroll-origin");e&&t===location.origin+location.pathname&&(this.viewportElement.scrollTop=parseInt(e,10))}activatePage(e){if(!e.active){e.active=!0;let{slideElement:t,backgroundElement:n,contentElement:i,indexh:s,indexv:r}=e;i.style.display="block",t.classList.add("present"),n&&n.classList.add("present"),this.Reveal.setCurrentScrollPage(t,s,r),this.Reveal.backgrounds.bubbleSlideContrastClassToElement(t,this.viewportElement),Array.from(i.parentNode.querySelectorAll(".scroll-page-content")).forEach(a=>{a!==i&&(a.style.display="none")})}}deactivatePage(e){e.active&&(e.active=!1,e.slideElement&&e.slideElement.classList.remove("present"),e.backgroundElement&&e.backgroundElement.classList.remove("present"))}activateTrigger(e){e.active||(e.active=!0,e.activate())}deactivateTrigger(e){e.active&&(e.active=!1,e.deactivate&&e.deactivate())}getSlideByIndices(e,t){let n=this.getAllPages().find(i=>i.indexh===e&&i.indexv===t);return n?n.slideElement:null}getScrollTriggerBySlide(e){return this.slideTriggers.find(t=>t.page.slideElement===e)}getAllPages(){return this.pages.flatMap(e=>[e,...e.autoAnimatePages||[]])}onScroll(){this.syncScrollPosition(),this.storeScrollPosition()}get viewportElement(){return this.Reveal.getViewportElement()}};function dn(e,t,n,i,s,r,a){try{var o=e[r](a),l=o.value}catch(c){n(c);return}o.done?t(l):Promise.resolve(l).then(i,s)}function Pi(e){return function(){var t=this,n=arguments;return new Promise(function(i,s){var r=e.apply(t,n);function a(l){dn(r,i,s,a,o,"next",l)}function o(l){dn(r,i,s,a,o,"throw",l)}a(void 0)})}}var Ci=class{constructor(e){this.Reveal=e}activate(){var e=this;return Pi(function*(){let t=e.Reveal.getConfig(),n=k(e.Reveal.getRevealElement(),me),i=t.slideNumber&&/all|print/i.test(t.showSlideNumber),s=e.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),r=Math.floor(s.width*(1+t.margin)),a=Math.floor(s.height*(1+t.margin)),o=s.width,l=s.height;yield new Promise(requestAnimationFrame),ut("@page{size:"+r+"px "+a+"px; margin: 0px;}"),ut(".reveal section>img, .reveal section>video, .reveal section>iframe{max-width: "+o+"px; max-height:"+l+"px}"),document.documentElement.classList.add("reveal-print","print-pdf"),document.body.style.width=r+"px",document.body.style.height=a+"px";let c=e.Reveal.getViewportElement(),p;if(c){let S=window.getComputedStyle(c);S&&S.background&&(p=S.background)}yield new Promise(requestAnimationFrame),e.Reveal.layoutSlideContents(o,l),yield new Promise(requestAnimationFrame);let g=n.map(S=>S.scrollHeight),m=[],b=n[0].parentNode,h=1;n.forEach(function(S,T){if(S.classList.contains("stack")===!1){let $=(r-o)/2,W=(a-l)/2,J=g[T],F=Math.max(Math.ceil(J/a),1);F=Math.min(F,t.pdfMaxPagesPerSlide),(F===1&&t.center||S.classList.contains("center"))&&(W=Math.max((a-J)/2,0));let E=document.createElement("div");if(m.push(E),E.className="pdf-page",E.style.height=(a+t.pdfPageHeightOffset)*F+"px",p&&(E.style.background=p),E.appendChild(S),S.style.left=$+"px",S.style.top=W+"px",S.style.width=o+"px",this.Reveal.slideContent.layout(S),S.slideBackgroundElement&&E.insertBefore(S.slideBackgroundElement,S),t.showNotes){let M=this.Reveal.getSlideNotes(S);if(M){let A=typeof t.showNotes=="string"?t.showNotes:"inline",P=document.createElement("div");P.classList.add("speaker-notes"),P.classList.add("speaker-notes-pdf"),P.setAttribute("data-layout",A),P.innerHTML=M,A==="separate-page"?m.push(P):(P.style.left="8px",P.style.bottom="8px",P.style.width=r-16+"px",E.appendChild(P))}}if(i){let M=document.createElement("div");M.classList.add("slide-number"),M.classList.add("slide-number-pdf"),M.innerHTML=h++,E.appendChild(M)}if(t.pdfSeparateFragments){let M=this.Reveal.fragments.sort(E.querySelectorAll(".fragment"),!0),A;M.forEach(function(P,O){A&&A.forEach(function(D){D.classList.remove("current-fragment")}),P.forEach(function(D){D.classList.add("visible","current-fragment")},this);let x=E.cloneNode(!0);if(i){let D=x.querySelector(".slide-number-pdf"),L=O+1;D.innerHTML+="."+L}m.push(x),A=P},this),M.forEach(function(P){P.forEach(function(O){O.classList.remove("visible","current-fragment")})})}else k(E,".fragment:not(.fade-out)").forEach(function(M){M.classList.add("visible")})}},e),yield new Promise(requestAnimationFrame),m.forEach(S=>b.appendChild(S)),e.Reveal.slideContent.layout(e.Reveal.getSlidesElement()),e.Reveal.dispatchEvent({type:"pdf-ready"}),c.classList.remove("loading-scroll-mode")})()}isActive(){return this.Reveal.getConfig().view==="print"}},Ii=class{constructor(e){this.Reveal=e}configure(e,t){e.fragments===!1?this.disable():t.fragments===!1&&this.enable()}disable(){k(this.Reveal.getSlidesElement(),".fragment").forEach(e=>{e.classList.add("visible"),e.classList.remove("current-fragment")})}enable(){k(this.Reveal.getSlidesElement(),".fragment").forEach(e=>{e.classList.remove("visible"),e.classList.remove("current-fragment")})}availableRoutes(){let e=this.Reveal.getCurrentSlide();if(e&&this.Reveal.getConfig().fragments){let t=e.querySelectorAll(".fragment:not(.disabled)"),n=e.querySelectorAll(".fragment:not(.disabled):not(.visible)");return{prev:t.length-n.length>0,next:!!n.length}}else return{prev:!1,next:!1}}sort(e,t=!1){e=Array.from(e);let n=[],i=[],s=[];e.forEach(a=>{if(a.hasAttribute("data-fragment-index")){let o=parseInt(a.getAttribute("data-fragment-index"),10);n[o]||(n[o]=[]),n[o].push(a)}else i.push([a])}),n=n.concat(i);let r=0;return n.forEach(a=>{a.forEach(o=>{s.push(o),o.setAttribute("data-fragment-index",r)}),r++}),t===!0?n:s}sortAll(){this.Reveal.getHorizontalSlides().forEach(e=>{let t=k(e,"section");t.forEach((n,i)=>{this.sort(n.querySelectorAll(".fragment"))},this),t.length===0&&this.sort(e.querySelectorAll(".fragment"))})}update(e,t,n=this.Reveal.getCurrentSlide()){let i={shown:[],hidden:[]};if(n&&this.Reveal.getConfig().fragments&&(t=t||this.sort(n.querySelectorAll(".fragment")),t.length)){let s=0;if(typeof e!="number"){let r=this.sort(n.querySelectorAll(".fragment.visible")).pop();r&&(e=parseInt(r.getAttribute("data-fragment-index")||0,10))}Array.from(t).forEach((r,a)=>{if(r.hasAttribute("data-fragment-index")&&(a=parseInt(r.getAttribute("data-fragment-index"),10)),s=Math.max(s,a),a<=e){let o=r.classList.contains("visible");r.classList.add("visible"),r.classList.remove("current-fragment"),a===e&&(this.Reveal.announceStatus(this.Reveal.getStatusText(r)),r.classList.add("current-fragment"),this.Reveal.slideContent.startEmbeddedContent(r)),o||(i.shown.push(r),this.Reveal.dispatchEvent({target:r,type:"visible",bubbles:!1}))}else{let o=r.classList.contains("visible");r.classList.remove("visible"),r.classList.remove("current-fragment"),o&&(this.Reveal.slideContent.stopEmbeddedContent(r),i.hidden.push(r),this.Reveal.dispatchEvent({target:r,type:"hidden",bubbles:!1}))}}),e=typeof e=="number"?e:-1,e=Math.max(Math.min(e,s),-1),n.setAttribute("data-fragment",e)}return i.hidden.length&&this.Reveal.dispatchEvent({type:"fragmenthidden",data:{fragment:i.hidden[0],fragments:i.hidden}}),i.shown.length&&this.Reveal.dispatchEvent({type:"fragmentshown",data:{fragment:i.shown[0],fragments:i.shown}}),i}sync(e=this.Reveal.getCurrentSlide()){return this.sort(e.querySelectorAll(".fragment"))}goto(e,t=0){let n=this.Reveal.getCurrentSlide();if(n&&this.Reveal.getConfig().fragments){let i=this.sort(n.querySelectorAll(".fragment:not(.disabled)"));if(i.length){if(typeof e!="number"){let r=this.sort(n.querySelectorAll(".fragment:not(.disabled).visible")).pop();e=r?parseInt(r.getAttribute("data-fragment-index")||0,10):-1}e+=t;let s=this.update(e,i);return this.Reveal.controls.update(),this.Reveal.progress.update(),this.Reveal.getConfig().fragmentInURL&&this.Reveal.location.writeURL(),!!(s.shown.length||s.hidden.length)}}return!1}next(){return this.goto(null,1)}prev(){return this.goto(null,-1)}},Mi=class{constructor(e){this.Reveal=e,this.active=!1,this.onSlideClicked=this.onSlideClicked.bind(this)}activate(){if(this.Reveal.getConfig().overview&&!this.Reveal.isScrollView()&&!this.isActive()){this.active=!0,this.Reveal.getRevealElement().classList.add("overview"),this.Reveal.cancelAutoSlide(),this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()),k(this.Reveal.getRevealElement(),me).forEach(n=>{n.classList.contains("stack")||n.addEventListener("click",this.onSlideClicked,!0)});let e=this.Reveal.getComputedSlideSize();this.overviewSlideWidth=e.width+70,this.overviewSlideHeight=e.height+70,this.Reveal.getConfig().rtl&&(this.overviewSlideWidth=-this.overviewSlideWidth),this.Reveal.updateSlidesVisibility(),this.layout(),this.update(),this.Reveal.layout();let t=this.Reveal.getIndices();this.Reveal.dispatchEvent({type:"overviewshown",data:{indexh:t.h,indexv:t.v,currentSlide:this.Reveal.getCurrentSlide()}})}}layout(){this.Reveal.getHorizontalSlides().forEach((e,t)=>{e.setAttribute("data-index-h",t),ue(e,"translate3d("+t*this.overviewSlideWidth+"px, 0, 0)"),e.classList.contains("stack")&&k(e,"section").forEach((n,i)=>{n.setAttribute("data-index-h",t),n.setAttribute("data-index-v",i),ue(n,"translate3d(0, "+i*this.overviewSlideHeight+"px, 0)")})}),Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((e,t)=>{ue(e,"translate3d("+t*this.overviewSlideWidth+"px, 0, 0)"),k(e,".slide-background").forEach((n,i)=>{ue(n,"translate3d(0, "+i*this.overviewSlideHeight+"px, 0)")})})}update(){let e=Math.min(window.innerWidth,window.innerHeight),t=Math.max(e/5,150)/e,n=this.Reveal.getIndices();this.Reveal.transformSlides({overview:["scale("+t+")","translateX("+-n.h*this.overviewSlideWidth+"px)","translateY("+-n.v*this.overviewSlideHeight+"px)"].join(" ")})}deactivate(){if(this.Reveal.getConfig().overview){this.active=!1,this.Reveal.getRevealElement().classList.remove("overview"),this.Reveal.getRevealElement().classList.add("overview-deactivating"),setTimeout(()=>{this.Reveal.getRevealElement().classList.remove("overview-deactivating")},1),this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()),k(this.Reveal.getRevealElement(),me).forEach(t=>{ue(t,""),t.removeEventListener("click",this.onSlideClicked,!0)}),k(this.Reveal.getBackgroundsElement(),".slide-background").forEach(t=>{ue(t,"")}),this.Reveal.transformSlides({overview:""});let e=this.Reveal.getIndices();this.Reveal.slide(e.h,e.v),this.Reveal.layout(),this.Reveal.cueAutoSlide(),this.Reveal.dispatchEvent({type:"overviewhidden",data:{indexh:e.h,indexv:e.v,currentSlide:this.Reveal.getCurrentSlide()}})}}toggle(e){typeof e=="boolean"?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}onSlideClicked(e){if(this.isActive()){e.preventDefault();let t=e.target;for(;t&&!t.nodeName.match(/section/gi);)t=t.parentNode;if(t&&!t.classList.contains("disabled")&&(this.deactivate(),t.nodeName.match(/section/gi))){let n=parseInt(t.getAttribute("data-index-h"),10),i=parseInt(t.getAttribute("data-index-v"),10);this.Reveal.slide(n,i)}}}},Ni=class{constructor(e){this.Reveal=e,this.shortcuts={},this.bindings={},this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this)}configure(e,t){e.navigationMode==="linear"?(this.shortcuts["&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J"]="Next slide",this.shortcuts["&#8592;  ,  &#8593;  ,  P  ,  H  ,  K"]="Previous slide"):(this.shortcuts["N  ,  SPACE"]="Next slide",this.shortcuts["P  ,  Shift SPACE"]="Previous slide",this.shortcuts["&#8592;  ,  H"]="Navigate left",this.shortcuts["&#8594;  ,  L"]="Navigate right",this.shortcuts["&#8593;  ,  K"]="Navigate up",this.shortcuts["&#8595;  ,  J"]="Navigate down"),this.shortcuts["Alt + &#8592;/&#8593/&#8594;/&#8595;"]="Navigate without fragments",this.shortcuts["Shift + &#8592;/&#8593/&#8594;/&#8595;"]="Jump to first/last slide",this.shortcuts["B  ,  ."]="Pause",this.shortcuts.F="Fullscreen",this.shortcuts.G="Jump to slide",this.shortcuts["ESC, O"]="Slide overview"}bind(){document.addEventListener("keydown",this.onDocumentKeyDown,!1)}unbind(){document.removeEventListener("keydown",this.onDocumentKeyDown,!1)}addKeyBinding(e,t){typeof e=="object"&&e.keyCode?this.bindings[e.keyCode]={callback:t,key:e.key,description:e.description}:this.bindings[e]={callback:t,key:null,description:null}}removeKeyBinding(e){delete this.bindings[e]}triggerKey(e){this.onDocumentKeyDown({keyCode:e})}registerKeyboardShortcut(e,t){this.shortcuts[e]=t}getShortcuts(){return this.shortcuts}getBindings(){return this.bindings}onDocumentKeyDown(e){let t=this.Reveal.getConfig();if(typeof t.keyboardCondition=="function"&&t.keyboardCondition(e)===!1||t.keyboardCondition==="focused"&&!this.Reveal.isFocused())return!0;let n=e.keyCode,i=!this.Reveal.isAutoSliding();this.Reveal.onUserInput(e);let s=document.activeElement&&document.activeElement.isContentEditable===!0,r=document.activeElement&&document.activeElement.tagName&&/input|textarea/i.test(document.activeElement.tagName),a=document.activeElement&&document.activeElement.className&&/speaker-notes/i.test(document.activeElement.className),o=!([32,37,38,39,40,63,78,80,191].indexOf(e.keyCode)!==-1&&e.shiftKey||e.altKey)&&(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey);if(s||r||a||o)return;let l=[66,86,190,191,112],c;if(typeof t.keyboard=="object")for(c in t.keyboard)t.keyboard[c]==="togglePause"&&l.push(parseInt(c,10));if(this.Reveal.isOverlayOpen()&&!["Escape","f","c","b","."].includes(e.key)||this.Reveal.isPaused()&&l.indexOf(n)===-1)return!1;let p=t.navigationMode==="linear"||!this.Reveal.hasHorizontalSlides()||!this.Reveal.hasVerticalSlides(),g=!1;if(typeof t.keyboard=="object"){for(c in t.keyboard)if(parseInt(c,10)===n){let m=t.keyboard[c];typeof m=="function"?m.apply(null,[e]):typeof m=="string"&&typeof this.Reveal[m]=="function"&&this.Reveal[m].call(),g=!0}}if(g===!1){for(c in this.bindings)if(parseInt(c,10)===n){let m=this.bindings[c].callback;typeof m=="function"?m.apply(null,[e]):typeof m=="string"&&typeof this.Reveal[m]=="function"&&this.Reveal[m].call(),g=!0}}g===!1&&(g=!0,n===80||n===33?this.Reveal.prev({skipFragments:e.altKey}):n===78||n===34?this.Reveal.next({skipFragments:e.altKey}):n===72||n===37?e.shiftKey?this.Reveal.slide(0):!this.Reveal.overview.isActive()&&p?t.rtl?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.left({skipFragments:e.altKey}):n===76||n===39?e.shiftKey?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):!this.Reveal.overview.isActive()&&p?t.rtl?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey}):this.Reveal.right({skipFragments:e.altKey}):n===75||n===38?e.shiftKey?this.Reveal.slide(void 0,0):!this.Reveal.overview.isActive()&&p?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.up({skipFragments:e.altKey}):n===74||n===40?e.shiftKey?this.Reveal.slide(void 0,Number.MAX_VALUE):!this.Reveal.overview.isActive()&&p?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.down({skipFragments:e.altKey}):n===36?this.Reveal.slide(0):n===35?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):n===32?(this.Reveal.overview.isActive()&&this.Reveal.overview.deactivate(),e.shiftKey?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey})):[58,59,66,86,190].includes(n)||n===191&&!e.shiftKey?this.Reveal.togglePause():n===70?gn(t.embedded?this.Reveal.getViewportElement():document.documentElement):n===65?t.autoSlideStoppable&&this.Reveal.toggleAutoSlide(i):n===71?t.jumpToSlide&&this.Reveal.toggleJumpToSlide():n===67&&this.Reveal.isOverlayOpen()?this.Reveal.closeOverlay():(n===63||n===191)&&e.shiftKey||n===112?this.Reveal.toggleHelp():g=!1),g?e.preventDefault&&e.preventDefault():n===27||n===79?(this.Reveal.closeOverlay()===!1&&this.Reveal.overview.toggle(),e.preventDefault&&e.preventDefault()):n===13&&this.Reveal.overview.isActive()&&(this.Reveal.overview.deactivate(),e.preventDefault&&e.preventDefault()),this.Reveal.cueAutoSlide()}};function cn(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter(function(s){return Object.getOwnPropertyDescriptor(e,s).enumerable})),n.push.apply(n,i)}return n}function ee(e){for(var t=1;t<arguments.length;t++){var n=arguments[t]==null?{}:arguments[t];t%2?cn(Object(n),!0).forEach(function(i){gt(e,i,n[i])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):cn(Object(n)).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(n,i))})}return e}var Bi=class{constructor(e){gt(this,"MAX_REPLACE_STATE_FREQUENCY",300),this.Reveal=e,this.writeURLTimeout=0,this.replaceStateTimestamp=0,this.onWindowHashChange=this.onWindowHashChange.bind(this)}bind(){window.addEventListener("hashchange",this.onWindowHashChange,!1)}unbind(){window.removeEventListener("hashchange",this.onWindowHashChange,!1)}getIndicesFromHash(e=window.location.hash,t={}){let n=e.replace(/^#\/?/,""),i=n.split("/");if(!/^[0-9]*$/.test(i[0])&&n.length){let s,r;/\/[-\d]+$/g.test(n)&&(r=parseInt(n.split("/").pop(),10),r=isNaN(r)?void 0:r,n=n.split("/").shift());try{let a=decodeURIComponent(n);s=(document.getElementById(a)||document.querySelector(`[data-id="${a}"]`)).closest(".slides section")}catch{}if(s)return ee(ee({},this.Reveal.getIndices(s)),{},{f:r})}else{let s=this.Reveal.getConfig(),r=s.hashOneBasedIndex||t.oneBasedIndex?1:0,a=parseInt(i[0],10)-r||0,o=parseInt(i[1],10)-r||0,l;return s.fragmentInURL&&(l=parseInt(i[2],10),isNaN(l)&&(l=void 0)),{h:a,v:o,f:l}}return null}readURL(){let e=this.Reveal.getIndices(),t=this.getIndicesFromHash();t?(t.h!==e.h||t.v!==e.v||t.f!==void 0)&&this.Reveal.slide(t.h,t.v,t.f):this.Reveal.slide(e.h||0,e.v||0)}writeURL(e){let t=this.Reveal.getConfig(),n=this.Reveal.getCurrentSlide();if(clearTimeout(this.writeURLTimeout),typeof e=="number")this.writeURLTimeout=setTimeout(this.writeURL,e);else if(n){let i=this.getHash();t.history?window.location.hash=i:t.hash&&(i==="/"?this.debouncedReplaceState(window.location.pathname+window.location.search):this.debouncedReplaceState("#"+i))}}replaceState(e){window.history.replaceState(null,null,e),this.replaceStateTimestamp=Date.now()}debouncedReplaceState(e){clearTimeout(this.replaceStateTimeout),Date.now()-this.replaceStateTimestamp>this.MAX_REPLACE_STATE_FREQUENCY?this.replaceState(e):this.replaceStateTimeout=setTimeout(()=>this.replaceState(e),this.MAX_REPLACE_STATE_FREQUENCY)}getHash(e){let t="/",n=e||this.Reveal.getCurrentSlide(),i=n?n.getAttribute("id"):null;i&&(i=encodeURIComponent(i));let s=this.Reveal.getIndices(e);if(this.Reveal.getConfig().fragmentInURL||(s.f=void 0),typeof i=="string"&&i.length)t="/"+i,s.f>=0&&(t+="/"+s.f);else{let r=+!!this.Reveal.getConfig().hashOneBasedIndex;(s.h>0||s.v>0||s.f>=0)&&(t+=s.h+r),(s.v>0||s.f>=0)&&(t+="/"+(s.v+r)),s.f>=0&&(t+="/"+s.f)}return t}onWindowHashChange(e){this.readURL()}},zi=class{constructor(e){this.Reveal=e,this.onNavigateLeftClicked=this.onNavigateLeftClicked.bind(this),this.onNavigateRightClicked=this.onNavigateRightClicked.bind(this),this.onNavigateUpClicked=this.onNavigateUpClicked.bind(this),this.onNavigateDownClicked=this.onNavigateDownClicked.bind(this),this.onNavigatePrevClicked=this.onNavigatePrevClicked.bind(this),this.onNavigateNextClicked=this.onNavigateNextClicked.bind(this),this.onEnterFullscreen=this.onEnterFullscreen.bind(this)}render(){let e=this.Reveal.getConfig().rtl,t=this.Reveal.getRevealElement();this.element=document.createElement("aside"),this.element.className="controls",this.element.innerHTML=`<button class="navigate-left" aria-label="${e?"next slide":"previous slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="${e?"previous slide":"next slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`,this.Reveal.getRevealElement().appendChild(this.element),this.controlsLeft=k(t,".navigate-left"),this.controlsRight=k(t,".navigate-right"),this.controlsUp=k(t,".navigate-up"),this.controlsDown=k(t,".navigate-down"),this.controlsPrev=k(t,".navigate-prev"),this.controlsNext=k(t,".navigate-next"),this.controlsFullscreen=k(t,".enter-fullscreen"),this.controlsRightArrow=this.element.querySelector(".navigate-right"),this.controlsLeftArrow=this.element.querySelector(".navigate-left"),this.controlsDownArrow=this.element.querySelector(".navigate-down")}configure(e,t){let n=e.controls==="speaker"||e.controls==="speaker-only";this.element.style.display=e.controls&&(!n||this.Reveal.isSpeakerNotes())?"block":"none",this.element.setAttribute("data-controls-layout",e.controlsLayout),this.element.setAttribute("data-controls-back-arrows",e.controlsBackArrows)}bind(){let e=["touchstart","click"];mn&&(e=["touchend"]),e.forEach(t=>{this.controlsLeft.forEach(n=>n.addEventListener(t,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(n=>n.addEventListener(t,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(n=>n.addEventListener(t,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(n=>n.addEventListener(t,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(n=>n.addEventListener(t,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(n=>n.addEventListener(t,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(n=>n.addEventListener(t,this.onEnterFullscreen,!1))})}unbind(){["touchstart","touchend","click"].forEach(e=>{this.controlsLeft.forEach(t=>t.removeEventListener(e,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(t=>t.removeEventListener(e,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(t=>t.removeEventListener(e,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(t=>t.removeEventListener(e,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(t=>t.removeEventListener(e,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(t=>t.removeEventListener(e,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(t=>t.removeEventListener(e,this.onEnterFullscreen,!1))})}update(){let e=this.Reveal.availableRoutes();[...this.controlsLeft,...this.controlsRight,...this.controlsUp,...this.controlsDown,...this.controlsPrev,...this.controlsNext].forEach(n=>{n.classList.remove("enabled","fragmented"),n.setAttribute("disabled","disabled")}),e.left&&this.controlsLeft.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),e.right&&this.controlsRight.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),e.up&&this.controlsUp.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),e.down&&this.controlsDown.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),(e.left||e.up)&&this.controlsPrev.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")}),(e.right||e.down)&&this.controlsNext.forEach(n=>{n.classList.add("enabled"),n.removeAttribute("disabled")});let t=this.Reveal.getCurrentSlide();if(t){let n=this.Reveal.fragments.availableRoutes();n.prev&&this.controlsPrev.forEach(r=>{r.classList.add("fragmented","enabled"),r.removeAttribute("disabled")}),n.next&&this.controlsNext.forEach(r=>{r.classList.add("fragmented","enabled"),r.removeAttribute("disabled")});let i=this.Reveal.isVerticalSlide(t),s=i&&t.parentElement&&t.parentElement.querySelectorAll(":scope > section").length>1;i&&s?(n.prev&&this.controlsUp.forEach(r=>{r.classList.add("fragmented","enabled"),r.removeAttribute("disabled")}),n.next&&this.controlsDown.forEach(r=>{r.classList.add("fragmented","enabled"),r.removeAttribute("disabled")})):(n.prev&&this.controlsLeft.forEach(r=>{r.classList.add("fragmented","enabled"),r.removeAttribute("disabled")}),n.next&&this.controlsRight.forEach(r=>{r.classList.add("fragmented","enabled"),r.removeAttribute("disabled")}))}if(this.Reveal.getConfig().controlsTutorial){let n=this.Reveal.getIndices();!this.Reveal.hasNavigatedVertically()&&e.down?this.controlsDownArrow.classList.add("highlight"):(this.controlsDownArrow.classList.remove("highlight"),this.Reveal.getConfig().rtl?!this.Reveal.hasNavigatedHorizontally()&&e.left&&n.v===0?this.controlsLeftArrow.classList.add("highlight"):this.controlsLeftArrow.classList.remove("highlight"):!this.Reveal.hasNavigatedHorizontally()&&e.right&&n.v===0?this.controlsRightArrow.classList.add("highlight"):this.controlsRightArrow.classList.remove("highlight"))}}destroy(){this.unbind(),this.element.remove()}onNavigateLeftClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode==="linear"?this.Reveal.prev():this.Reveal.left()}onNavigateRightClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode==="linear"?this.Reveal.next():this.Reveal.right()}onNavigateUpClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.up()}onNavigateDownClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.down()}onNavigatePrevClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.prev()}onNavigateNextClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.next()}onEnterFullscreen(e){let t=this.Reveal.getConfig(),n=this.Reveal.getViewportElement();gn(t.embedded?n:n.parentElement)}},Hi=class{constructor(e){this.Reveal=e,this.onProgressClicked=this.onProgressClicked.bind(this)}render(){this.element=document.createElement("div"),this.element.className="progress",this.Reveal.getRevealElement().appendChild(this.element),this.bar=document.createElement("span"),this.element.appendChild(this.bar)}configure(e,t){this.element.style.display=e.progress?"block":"none"}bind(){this.Reveal.getConfig().progress&&this.element&&this.element.addEventListener("click",this.onProgressClicked,!1)}unbind(){this.Reveal.getConfig().progress&&this.element&&this.element.removeEventListener("click",this.onProgressClicked,!1)}update(){if(this.Reveal.getConfig().progress&&this.bar){let e=this.Reveal.getProgress();this.Reveal.getTotalSlides()<2&&(e=0),this.bar.style.transform="scaleX("+e+")"}}getMaxWidth(){return this.Reveal.getRevealElement().offsetWidth}onProgressClicked(e){this.Reveal.onUserInput(e),e.preventDefault();let t=this.Reveal.getSlides(),n=t.length,i=Math.floor(e.clientX/this.getMaxWidth()*n);this.Reveal.getConfig().rtl&&(i=n-i);let s=this.Reveal.getIndices(t[i]);this.Reveal.slide(s.h,s.v)}destroy(){this.element.remove()}},Di=class{constructor(e){this.Reveal=e,this.lastMouseWheelStep=0,this.cursorHidden=!1,this.cursorInactiveTimeout=0,this.onDocumentCursorActive=this.onDocumentCursorActive.bind(this),this.onDocumentMouseScroll=this.onDocumentMouseScroll.bind(this)}configure(e,t){e.mouseWheel?document.addEventListener("wheel",this.onDocumentMouseScroll,!1):document.removeEventListener("wheel",this.onDocumentMouseScroll,!1),e.hideInactiveCursor?(document.addEventListener("mousemove",this.onDocumentCursorActive,!1),document.addEventListener("mousedown",this.onDocumentCursorActive,!1)):(this.showCursor(),document.removeEventListener("mousemove",this.onDocumentCursorActive,!1),document.removeEventListener("mousedown",this.onDocumentCursorActive,!1))}showCursor(){this.cursorHidden&&(this.cursorHidden=!1,this.Reveal.getRevealElement().style.cursor="")}hideCursor(){this.cursorHidden===!1&&(this.cursorHidden=!0,this.Reveal.getRevealElement().style.cursor="none")}destroy(){this.showCursor(),document.removeEventListener("wheel",this.onDocumentMouseScroll,!1),document.removeEventListener("mousemove",this.onDocumentCursorActive,!1),document.removeEventListener("mousedown",this.onDocumentCursorActive,!1)}onDocumentCursorActive(e){this.showCursor(),clearTimeout(this.cursorInactiveTimeout),this.cursorInactiveTimeout=setTimeout(this.hideCursor.bind(this),this.Reveal.getConfig().hideCursorTime)}onDocumentMouseScroll(e){if(Date.now()-this.lastMouseWheelStep>1e3){this.lastMouseWheelStep=Date.now();let t=e.detail||-e.wheelDelta;t>0?this.Reveal.next():t<0&&this.Reveal.prev()}}},hn=(e,t)=>{let n=document.createElement("script");n.type="text/javascript",n.async=!1,n.defer=!1,n.src=e,typeof t=="function"&&(n.onload=s=>{s.type==="load"&&(n.onload=n.onerror=null,t())},n.onerror=s=>{n.onload=n.onerror=null,t(Error("Failed loading script: "+n.src+`
`+s))});let i=document.querySelector("head");i&&i.insertBefore(n,i.lastChild)},$i=class{constructor(e){this.Reveal=e,this.state="idle",this.registeredPlugins={},this.asyncDependencies=[]}load(e,t){return this.state="loading",e.forEach(this.registerPlugin.bind(this)),new Promise(n=>{let i=[],s=0;if(t.forEach(r=>{(!r.condition||r.condition())&&(r.async?this.asyncDependencies.push(r):i.push(r))}),i.length){s=i.length;let r=a=>{a&&typeof a.callback=="function"&&a.callback(),--s===0&&this.initPlugins().then(n)};i.forEach(a=>{typeof a.id=="string"?(this.registerPlugin(a),r(a)):typeof a.src=="string"?hn(a.src,()=>r(a)):(console.warn("Unrecognized plugin format",a),r())})}else this.initPlugins().then(n)})}initPlugins(){return new Promise(e=>{let t=Object.values(this.registeredPlugins),n=t.length;if(n===0)this.loadAsync().then(e);else{let i,s=()=>{--n===0?this.loadAsync().then(e):i()},r=0;i=()=>{let a=t[r++];if(typeof a.init=="function"){let o=a.init(this.Reveal);o&&typeof o.then=="function"?o.then(s):s()}else s()},i()}})}loadAsync(){return this.state="loaded",this.asyncDependencies.length&&this.asyncDependencies.forEach(e=>{hn(e.src,e.callback)}),Promise.resolve()}registerPlugin(e){arguments.length===2&&typeof arguments[0]=="string"?(e=arguments[1],e.id=arguments[0]):typeof e=="function"&&(e=e());let t=e.id;typeof t=="string"?this.registeredPlugins[t]===void 0?(this.registeredPlugins[t]=e,this.state==="loaded"&&typeof e.init=="function"&&e.init(this.Reveal)):console.warn('reveal.js: "'+t+'" plugin has already been registered'):console.warn("Unrecognized plugin format; can't find plugin.id",e)}hasPlugin(e){return!!this.registeredPlugins[e]}getPlugin(e){return this.registeredPlugins[e]}getRegisteredPlugins(){return this.registeredPlugins}destroy(){Object.values(this.registeredPlugins).forEach(e=>{typeof e.destroy=="function"&&e.destroy()}),this.registeredPlugins={},this.asyncDependencies=[]}},Oi=class{constructor(e){this.Reveal=e,this.onSlidesClicked=this.onSlidesClicked.bind(this),this.iframeTriggerSelector=null,this.mediaTriggerSelector="[data-preview-image], [data-preview-video]",this.stateProps=["previewIframe","previewImage","previewVideo","previewFit"],this.state={}}update(){this.Reveal.getConfig().previewLinks?this.iframeTriggerSelector="a[href]:not([data-preview-link=false]), [data-preview-link]:not(a):not([data-preview-link=false])":this.iframeTriggerSelector="[data-preview-link]:not([data-preview-link=false])";let e=this.Reveal.getSlidesElement().querySelectorAll(this.iframeTriggerSelector).length>0,t=this.Reveal.getSlidesElement().querySelectorAll(this.mediaTriggerSelector).length>0;e||t?this.Reveal.getSlidesElement().addEventListener("click",this.onSlidesClicked,!1):this.Reveal.getSlidesElement().removeEventListener("click",this.onSlidesClicked,!1)}createOverlay(e){this.dom=document.createElement("div"),this.dom.classList.add("r-overlay"),this.dom.classList.add(e),this.viewport=document.createElement("div"),this.viewport.classList.add("r-overlay-viewport"),this.dom.appendChild(this.viewport),this.Reveal.getRevealElement().appendChild(this.dom)}previewIframe(e){this.close(),this.state={previewIframe:e},this.createOverlay("r-overlay-preview"),this.dom.dataset.state="loading",this.viewport.innerHTML=`<header class="r-overlay-header">
				<a class="r-overlay-header-button r-overlay-external" href="${e}" target="_blank"><span class="icon"></span></a>
				<button class="r-overlay-header-button r-overlay-close"><span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content">
				<iframe src="${e}"></iframe>
				<small class="r-overlay-content-inner">
					<span class="r-overlay-error x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`,this.dom.querySelector("iframe").addEventListener("load",t=>{this.dom.dataset.state="loaded"},!1),this.dom.querySelector(".r-overlay-close").addEventListener("click",t=>{this.close(),t.preventDefault()},!1),this.dom.querySelector(".r-overlay-external").addEventListener("click",t=>{this.close()},!1),this.Reveal.dispatchEvent({type:"previewiframe",data:{url:e}})}previewMedia(e,t,n){if(t!=="image"&&t!=="video"){console.warn("Please specify a valid media type to preview (image|video)");return}this.close(),n=n||"scale-down",this.createOverlay("r-overlay-preview"),this.dom.dataset.state="loading",this.dom.dataset.previewFit=n,this.viewport.innerHTML=`<header class="r-overlay-header">
				<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content"></div>`;let i=this.dom.querySelector(".r-overlay-content");if(t==="image"){this.state={previewImage:e,previewFit:n};let s=document.createElement("img",{});s.src=e,i.appendChild(s),s.addEventListener("load",()=>{this.dom.dataset.state="loaded"},!1),s.addEventListener("error",()=>{this.dom.dataset.state="error",i.innerHTML='<span class="r-overlay-error">Unable to load image.</span>'},!1),this.dom.style.cursor="zoom-out",this.dom.addEventListener("click",r=>{this.close()},!1),this.Reveal.dispatchEvent({type:"previewimage",data:{url:e}})}else if(t==="video"){this.state={previewVideo:e,previewFit:n};let s=document.createElement("video");s.autoplay=this.dom.dataset.previewAutoplay!=="false",s.controls=this.dom.dataset.previewControls!=="false",s.loop=this.dom.dataset.previewLoop==="true",s.muted=this.dom.dataset.previewMuted==="true",s.playsInline=!0,s.src=e,i.appendChild(s),s.addEventListener("loadeddata",()=>{this.dom.dataset.state="loaded"},!1),s.addEventListener("error",()=>{this.dom.dataset.state="error",i.innerHTML='<span class="r-overlay-error">Unable to load video.</span>'},!1),this.Reveal.dispatchEvent({type:"previewvideo",data:{url:e}})}else throw Error("Please specify a valid media type to preview");this.dom.querySelector(".r-overlay-close").addEventListener("click",s=>{this.close(),s.preventDefault()},!1)}previewImage(e,t){this.previewMedia(e,"image",t)}previewVideo(e,t){this.previewMedia(e,"video",t)}toggleHelp(e){typeof e=="boolean"?e?this.showHelp():this.close():this.dom?this.close():this.showHelp()}showHelp(){if(this.Reveal.getConfig().help){this.close(),this.createOverlay("r-overlay-help");let e='<p class="title">Keyboard Shortcuts</p>',t=this.Reveal.keyboard.getShortcuts(),n=this.Reveal.keyboard.getBindings();e+="<table><th>KEY</th><th>ACTION</th>";for(let i in t)e+=`<tr><td>${i}</td><td>${t[i]}</td></tr>`;for(let i in n)n[i].key&&n[i].description&&(e+=`<tr><td>${n[i].key}</td><td>${n[i].description}</td></tr>`);e+="</table>",this.viewport.innerHTML=`
				<header class="r-overlay-header">
					<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
				</header>
				<div class="r-overlay-content">
					<div class="r-overlay-help-content">${e}</div>
				</div>
			`,this.dom.querySelector(".r-overlay-close").addEventListener("click",i=>{this.close(),i.preventDefault()},!1),this.Reveal.dispatchEvent({type:"showhelp"})}}isOpen(){return!!this.dom}close(){return this.dom?(this.dom.remove(),this.dom=null,this.state={},this.Reveal.dispatchEvent({type:"closeoverlay"}),!0):!1}getState(){return this.state}setState(e){this.stateProps.every(t=>this.state[t]===e[t])||(e.previewIframe?this.previewIframe(e.previewIframe):e.previewImage?this.previewImage(e.previewImage,e.previewFit):e.previewVideo?this.previewVideo(e.previewVideo,e.previewFit):this.close())}onSlidesClicked(e){let t=e.target,n=t.closest(this.iframeTriggerSelector),i=t.closest(this.mediaTriggerSelector);if(n){if(e.metaKey||e.shiftKey||e.altKey)return;let s=n.getAttribute("data-preview-link"),r=typeof s=="string"&&s.startsWith("http")?s:n.getAttribute("href");r&&(this.previewIframe(r),e.preventDefault())}else if(i){if(i.hasAttribute("data-preview-image")){let s=i.dataset.previewImage||i.getAttribute("src");s&&(this.previewImage(s,i.dataset.previewFit),e.preventDefault())}else if(i.hasAttribute("data-preview-video")){let s=i.dataset.previewVideo||i.getAttribute("src");if(!s){let r=i.querySelector("source");r&&(s=r.getAttribute("src"))}s&&(this.previewVideo(s,i.dataset.previewFit),e.preventDefault())}}}destroy(){this.close()}},Ue=40,qi=class{constructor(e){this.Reveal=e,this.touchStartX=0,this.touchStartY=0,this.touchStartCount=0,this.touchCaptured=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this)}bind(){let e=this.Reveal.getRevealElement();"onpointerdown"in window?(e.addEventListener("pointerdown",this.onPointerDown,!1),e.addEventListener("pointermove",this.onPointerMove,!1),e.addEventListener("pointerup",this.onPointerUp,!1)):window.navigator.msPointerEnabled?(e.addEventListener("MSPointerDown",this.onPointerDown,!1),e.addEventListener("MSPointerMove",this.onPointerMove,!1),e.addEventListener("MSPointerUp",this.onPointerUp,!1)):(e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1))}unbind(){let e=this.Reveal.getRevealElement();e.removeEventListener("pointerdown",this.onPointerDown,!1),e.removeEventListener("pointermove",this.onPointerMove,!1),e.removeEventListener("pointerup",this.onPointerUp,!1),e.removeEventListener("MSPointerDown",this.onPointerDown,!1),e.removeEventListener("MSPointerMove",this.onPointerMove,!1),e.removeEventListener("MSPointerUp",this.onPointerUp,!1),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1)}isSwipePrevented(e){if(je(e,"video[controls], audio[controls]"))return!0;for(;e&&typeof e.hasAttribute=="function";){if(e.hasAttribute("data-prevent-swipe"))return!0;e=e.parentNode}return!1}onTouchStart(e){if(this.touchCaptured=!1,this.isSwipePrevented(e.target))return!0;this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.touchStartCount=e.touches.length}onTouchMove(e){if(this.isSwipePrevented(e.target))return!0;let t=this.Reveal.getConfig();if(this.touchCaptured)mn&&e.preventDefault();else{this.Reveal.onUserInput(e);let n=e.touches[0].clientX,i=e.touches[0].clientY;if(e.touches.length===1&&this.touchStartCount!==2){let s=this.Reveal.availableRoutes({includeFragments:!0}),r=n-this.touchStartX,a=i-this.touchStartY;r>Ue&&Math.abs(r)>Math.abs(a)?(this.touchCaptured=!0,t.navigationMode==="linear"?t.rtl?this.Reveal.next():this.Reveal.prev():this.Reveal.left()):r<-Ue&&Math.abs(r)>Math.abs(a)?(this.touchCaptured=!0,t.navigationMode==="linear"?t.rtl?this.Reveal.prev():this.Reveal.next():this.Reveal.right()):a>Ue&&s.up?(this.touchCaptured=!0,t.navigationMode==="linear"?this.Reveal.prev():this.Reveal.up()):a<-Ue&&s.down&&(this.touchCaptured=!0,t.navigationMode==="linear"?this.Reveal.next():this.Reveal.down()),t.embedded?(this.touchCaptured||this.Reveal.isVerticalSlide())&&e.preventDefault():e.preventDefault()}}}onTouchEnd(e){this.touchCaptured&&!this.Reveal.slideContent.isAllowedToPlayAudio()&&this.Reveal.startEmbeddedContent(this.Reveal.getCurrentSlide()),this.touchCaptured=!1}onPointerDown(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType==="touch")&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchStart(e))}onPointerMove(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType==="touch")&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchMove(e))}onPointerUp(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType==="touch")&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchEnd(e))}},ht="focus",un="blur",Fi=class{constructor(e){this.Reveal=e,this.onRevealPointerDown=this.onRevealPointerDown.bind(this),this.onDocumentPointerDown=this.onDocumentPointerDown.bind(this)}configure(e,t){e.embedded?this.blur():(this.focus(),this.unbind())}bind(){this.Reveal.getConfig().embedded&&this.Reveal.getRevealElement().addEventListener("pointerdown",this.onRevealPointerDown,!1)}unbind(){this.Reveal.getRevealElement().removeEventListener("pointerdown",this.onRevealPointerDown,!1),document.removeEventListener("pointerdown",this.onDocumentPointerDown,!1)}focus(){this.state!==ht&&(this.Reveal.getRevealElement().classList.add("focused"),document.addEventListener("pointerdown",this.onDocumentPointerDown,!1)),this.state=ht}blur(){this.state!==un&&(this.Reveal.getRevealElement().classList.remove("focused"),document.removeEventListener("pointerdown",this.onDocumentPointerDown,!1)),this.state=un}isFocused(){return this.state===ht}destroy(){this.Reveal.getRevealElement().classList.remove("focused")}onRevealPointerDown(e){this.focus()}onDocumentPointerDown(e){let t=j(e.target,".reveal");(!t||t!==this.Reveal.getRevealElement())&&this.blur()}},Vi=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement("div"),this.element.className="speaker-notes",this.element.setAttribute("data-prevent-swipe",""),this.element.setAttribute("tabindex","0"),this.Reveal.getRevealElement().appendChild(this.element)}configure(e,t){e.showNotes&&this.element.setAttribute("data-layout",typeof e.showNotes=="string"?e.showNotes:"inline")}update(){this.Reveal.getConfig().showNotes&&this.element&&this.Reveal.getCurrentSlide()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()&&(this.element.innerHTML=this.getSlideNotes()||'<span class="notes-placeholder">No notes on this slide.</span>')}updateVisibility(){this.Reveal.getConfig().showNotes&&this.hasNotes()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()?this.Reveal.getRevealElement().classList.add("show-notes"):this.Reveal.getRevealElement().classList.remove("show-notes")}hasNotes(){return this.Reveal.getSlidesElement().querySelectorAll("[data-notes], aside.notes").length>0}isSpeakerNotesWindow(){return!!window.location.search.match(/receiver/gi)}getSlideNotes(e=this.Reveal.getCurrentSlide()){if(e.hasAttribute("data-notes"))return e.getAttribute("data-notes");let t=e.querySelectorAll("aside.notes");return t?Array.from(t).map(n=>n.innerHTML).join(`
`):null}destroy(){this.element.remove()}},Ui=class{constructor(e,t){this.diameter=100,this.diameter2=this.diameter/2,this.thickness=6,this.playing=!1,this.progress=0,this.progressOffset=1,this.container=e,this.progressCheck=t,this.canvas=document.createElement("canvas"),this.canvas.className="playback",this.canvas.width=this.diameter,this.canvas.height=this.diameter,this.canvas.style.width=this.diameter2+"px",this.canvas.style.height=this.diameter2+"px",this.context=this.canvas.getContext("2d"),this.container.appendChild(this.canvas),this.render()}setPlaying(e){let t=this.playing;this.playing=e,!t&&this.playing?this.animate():this.render()}animate(){let e=this.progress;this.progress=this.progressCheck(),e>.8&&this.progress<.2&&(this.progressOffset=this.progress),this.render(),this.playing&&requestAnimationFrame(this.animate.bind(this))}render(){let e=this.playing?this.progress:0,t=this.diameter2-this.thickness,n=this.diameter2,i=this.diameter2;this.progressOffset+=(1-this.progressOffset)*.1;let s=-Math.PI/2+Math.PI*2*e,r=-Math.PI/2+this.progressOffset*(Math.PI*2);this.context.save(),this.context.clearRect(0,0,this.diameter,this.diameter),this.context.beginPath(),this.context.arc(n,i,t+4,0,Math.PI*2,!1),this.context.fillStyle="rgba( 0, 0, 0, 0.4 )",this.context.fill(),this.context.beginPath(),this.context.arc(n,i,t,0,Math.PI*2,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle="rgba( 255, 255, 255, 0.2 )",this.context.stroke(),this.playing&&(this.context.beginPath(),this.context.arc(n,i,t,r,s,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle="#fff",this.context.stroke()),this.context.translate(n-28/2,i-28/2),this.playing?(this.context.fillStyle="#fff",this.context.fillRect(0,0,28/2-4,28),this.context.fillRect(18,0,28/2-4,28)):(this.context.beginPath(),this.context.translate(4,0),this.context.moveTo(0,0),this.context.lineTo(24,28/2),this.context.lineTo(0,28),this.context.fillStyle="#fff",this.context.fill()),this.context.restore()}on(e,t){this.canvas.addEventListener(e,t,!1)}off(e,t){this.canvas.removeEventListener(e,t,!1)}destroy(){this.playing=!1,this.canvas.parentNode&&this.container.removeChild(this.canvas)}},ji={width:960,height:700,margin:.04,minScale:.2,maxScale:2,controls:!0,controlsTutorial:!0,controlsLayout:"bottom-right",controlsBackArrows:"faded",progress:!0,slideNumber:!1,showSlideNumber:"all",hashOneBasedIndex:!1,hash:!1,respondToHashChanges:!0,jumpToSlide:!0,history:!1,keyboard:!0,keyboardCondition:null,disableLayout:!1,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,navigationMode:"default",shuffle:!1,fragments:!0,fragmentInURL:!0,embedded:!1,help:!0,pause:!0,showNotes:!1,showHiddenSlides:!1,autoPlayMedia:null,preloadIframes:null,mouseWheel:!1,previewLinks:!1,viewDistance:3,mobileViewDistance:2,display:"block",hideInactiveCursor:!0,hideCursorTime:5e3,sortFragmentsOnSync:!0,autoAnimate:!0,autoAnimateMatcher:null,autoAnimateEasing:"ease",autoAnimateDuration:1,autoAnimateUnmatched:!0,autoAnimateStyles:["opacity","color","background-color","padding","font-size","line-height","letter-spacing","border-width","border-color","border-radius","outline","outline-offset"],autoSlide:0,autoSlideStoppable:!0,autoSlideMethod:null,defaultTiming:null,postMessage:!0,postMessageEvents:!1,focusBodyOnPageVisibilityChange:!0,transition:"slide",transitionSpeed:"default",backgroundTransition:"fade",parallaxBackgroundImage:"",parallaxBackgroundSize:"",parallaxBackgroundRepeat:"",parallaxBackgroundPosition:"",parallaxBackgroundHorizontal:null,parallaxBackgroundVertical:null,view:null,scrollLayout:"full",scrollSnap:"mandatory",scrollProgress:"auto",scrollActivationWidth:435,pdfMaxPagesPerSlide:1/0,pdfSeparateFragments:!0,pdfPageHeightOffset:-1,dependencies:[],plugins:[]},vn="6.0.1";function fn(e,t){arguments.length<2&&(t=arguments[0],e=document.querySelector(".reveal"));let n={},i={},s=!1,r=!1,a,o,l,c,p={hasNavigatedHorizontally:!1,hasNavigatedVertically:!1},g=[],m=1,b={layout:"",overview:""},h={},S="idle",T=0,$,W=0,J=-1,F=!1,E=new vi(n),M=new bi(n),A=new wi(n),P=new Ei(n),O=new Si(n),x=new Ti(n),D=new Ci(n),L=new Ii(n),v=new Mi(n),R=new Ni(n),C=new Bi(n),X=new zi(n),Z=new Hi(n),de=new Di(n),U=new $i(n),V=new Oi(n),pe=new Fi(n),Qe=new qi(n),Q=new Vi(n);function Hn(d){if(!e)throw'Unable to find presentation root (<div class="reveal">).';if(s)throw"Reveal.js has already been initialized.";if(s=!0,h.wrapper=e,h.slides=e.querySelector(".slides"),!h.slides)throw'Unable to find slides container (<div class="slides">).';return i=ee(ee(ee(ee(ee({},ji),i),t),d),ln()),/print-pdf/gi.test(window.location.search)&&(i.view="print"),Dn(),window.addEventListener("load",be,!1),U.load(i.plugins,i.dependencies).then($n),new Promise(u=>n.on("ready",u))}function Dn(){i.embedded===!0?h.viewport=j(e,".reveal-viewport")||e:(h.viewport=document.body,document.documentElement.classList.add("reveal-full-page")),h.viewport.classList.add("reveal-viewport")}function $n(){s!==!1&&(r=!0,Lt(),qn(),jn(),Vn(),Un(),Gn(),Pt(),O.update(!0),On(),C.readURL(),setTimeout(()=>{h.slides.classList.remove("no-transition"),h.wrapper.classList.add("ready"),Y({type:"ready",data:{indexh:a,indexv:o,currentSlide:c}})},1))}function On(){let d=i.view==="print",u=i.view==="scroll"||i.view==="reader";(d||u)&&(d?Ne():Qe.unbind(),h.viewport.classList.add("loading-scroll-mode"),d?document.readyState==="complete"?D.activate():window.addEventListener("load",()=>D.activate()):x.activate())}function Lt(){i.showHiddenSlides||k(h.wrapper,'section[data-visibility="hidden"]').forEach(d=>{let u=d.parentNode;u.childElementCount===1&&/section/i.test(u.nodeName)?u.remove():d.remove()})}function qn(){h.slides.classList.add("no-transition"),ge?h.wrapper.classList.add("no-hover"):h.wrapper.classList.remove("no-hover"),O.render(),M.render(),A.render(),X.render(),Z.render(),Q.render(),h.pauseOverlay=oi(h.wrapper,"div","pause-overlay",i.controls?'<button class="resume-button">Resume presentation</button>':null),h.statusElement=Fn(),h.wrapper.setAttribute("role","application")}function Fn(){let d=h.wrapper.querySelector(".aria-status");return d||(d=document.createElement("div"),d.style.position="absolute",d.style.height="1px",d.style.width="1px",d.style.overflow="hidden",d.style.clip="rect( 1px, 1px, 1px, 1px )",d.classList.add("aria-status"),d.setAttribute("aria-live","polite"),d.setAttribute("aria-atomic","true"),h.wrapper.appendChild(d)),d}function Ge(d){h.statusElement.textContent=d}function Me(d){let u="";if(d.nodeType===3)u+=d.textContent.trim();else if(d.nodeType===1){let f=d.getAttribute("aria-hidden"),y=window.getComputedStyle(d).display==="none";if(f!=="true"&&!y){if(d.tagName==="IMG"||d.tagName==="VIDEO"){let w=d.getAttribute("alt");w&&(u+=Tt(w))}Array.from(d.childNodes).forEach(w=>{u+=Me(w)}),["P","DIV","UL","OL","LI","H1","H2","H3","H4","H5","H6","BLOCKQUOTE"].includes(d.tagName)&&u.trim()!==""&&(u=Tt(u))}}return u=u.trim(),u===""?"":u+" "}function Tt(d){let u=d.trim();return u===""?d:/[.!?]$/.test(u)?u:u+"."}function Vn(){setInterval(()=>{(!x.isActive()&&h.wrapper.scrollTop!==0||h.wrapper.scrollLeft!==0)&&(h.wrapper.scrollTop=0,h.wrapper.scrollLeft=0)},1e3)}function Un(){document.addEventListener("fullscreenchange",Fe),document.addEventListener("webkitfullscreenchange",Fe)}function jn(){i.postMessage&&window.addEventListener("message",en,!1)}function Pt(d){let u=ee({},i);if(typeof d=="object"&&Se(i,d),n.isReady()===!1)return;let f=h.wrapper.querySelectorAll(me).length;h.wrapper.classList.remove(u.transition),h.wrapper.classList.add(i.transition),h.wrapper.setAttribute("data-transition-speed",i.transitionSpeed),h.wrapper.setAttribute("data-background-transition",i.backgroundTransition),h.viewport.style.setProperty("--slide-width",typeof i.width=="string"?i.width:i.width+"px"),h.viewport.style.setProperty("--slide-height",typeof i.height=="string"?i.height:i.height+"px"),i.shuffle&&it(),dt(h.wrapper,"embedded",i.embedded),dt(h.wrapper,"rtl",i.rtl),dt(h.wrapper,"center",i.center),i.pause===!1&&Re(),P.reset(),$&&($.destroy(),$=null),f>1&&i.autoSlide&&i.autoSlideStoppable&&($=new Ui(h.wrapper,()=>Math.min(Math.max((Date.now()-J)/T,0),1)),$.on("click",ri),F=!1),i.navigationMode==="default"?h.wrapper.removeAttribute("data-navigation-mode"):h.wrapper.setAttribute("data-navigation-mode",i.navigationMode),Q.configure(i,u),pe.configure(i,u),de.configure(i,u),X.configure(i,u),Z.configure(i,u),R.configure(i,u),L.configure(i,u),M.configure(i,u),Vt()}function Ct(){window.addEventListener("resize",sn,!1),i.touch&&Qe.bind(),i.keyboard&&R.bind(),i.progress&&Z.bind(),i.respondToHashChanges&&C.bind(),X.bind(),pe.bind(),h.slides.addEventListener("click",nn,!1),h.slides.addEventListener("transitionend",tn,!1),h.pauseOverlay.addEventListener("click",Re,!1),i.focusBodyOnPageVisibilityChange&&document.addEventListener("visibilitychange",an,!1)}function Ne(){Qe.unbind(),pe.unbind(),R.unbind(),X.unbind(),Z.unbind(),C.unbind(),window.removeEventListener("resize",sn,!1),h.slides.removeEventListener("click",nn,!1),h.slides.removeEventListener("transitionend",tn,!1),h.pauseOverlay.removeEventListener("click",Re,!1)}function Wn(){s=!1,r!==!1&&(Ne(),He(),Q.destroy(),pe.destroy(),V.destroy(),U.destroy(),de.destroy(),X.destroy(),Z.destroy(),O.destroy(),M.destroy(),A.destroy(),document.removeEventListener("fullscreenchange",Fe),document.removeEventListener("webkitfullscreenchange",Fe),document.removeEventListener("visibilitychange",an,!1),window.removeEventListener("message",en,!1),window.removeEventListener("load",be,!1),h.pauseOverlay&&h.pauseOverlay.remove(),h.statusElement&&h.statusElement.remove(),document.documentElement.classList.remove("reveal-full-page"),h.wrapper.classList.remove("ready","center","has-horizontal-slides","has-vertical-slides"),h.wrapper.removeAttribute("data-transition-speed"),h.wrapper.removeAttribute("data-background-transition"),h.viewport.classList.remove("reveal-viewport"),h.viewport.style.removeProperty("--slide-width"),h.viewport.style.removeProperty("--slide-height"),h.slides.style.removeProperty("width"),h.slides.style.removeProperty("height"),h.slides.style.removeProperty("zoom"),h.slides.style.removeProperty("left"),h.slides.style.removeProperty("top"),h.slides.style.removeProperty("bottom"),h.slides.style.removeProperty("right"),h.slides.style.removeProperty("transform"),Array.from(h.wrapper.querySelectorAll(me)).forEach(d=>{d.style.removeProperty("display"),d.style.removeProperty("top"),d.removeAttribute("hidden"),d.removeAttribute("aria-hidden")}))}function It(d,u,f){e.addEventListener(d,u,f)}function Mt(d,u,f){e.removeEventListener(d,u,f)}function et(d){typeof d.layout=="string"&&(b.layout=d.layout),typeof d.overview=="string"&&(b.overview=d.overview),b.layout?ue(h.slides,b.layout+" "+b.overview):ue(h.slides,b.overview)}function Y({target:d=h.wrapper,type:u,data:f,bubbles:y=!0}){let w=document.createEvent("HTMLEvents",1,2);return w.initEvent(u,y,!0),Se(w,f),d.dispatchEvent(w),d===h.wrapper&&Bt(u),w}function Nt(d){Y({type:"slidechanged",data:{indexh:a,indexv:o,previousSlide:l,currentSlide:c,origin:d}})}function Bt(d,u){if(i.postMessageEvents&&window.parent!==window.self){let f={namespace:"reveal",eventName:d,state:Qt()};Se(f,u),window.parent.postMessage(JSON.stringify(f),"*")}}function be(){if(h.wrapper&&!D.isActive()){let d=h.viewport.offsetWidth,u=h.viewport.offsetHeight;if(!i.disableLayout){ge&&!i.embedded&&document.documentElement.style.setProperty("--vh",window.innerHeight*.01+"px");let f=x.isActive()?Be(d,u):Be(),y=m;zt(i.width,i.height),h.slides.style.width=f.width+"px",h.slides.style.height=f.height+"px",m=Math.min(f.presentationWidth/f.width,f.presentationHeight/f.height),m=Math.max(m,i.minScale),m=Math.min(m,i.maxScale),m===1||x.isActive()?(h.slides.style.zoom="",h.slides.style.left="",h.slides.style.top="",h.slides.style.bottom="",h.slides.style.right="",et({layout:""})):(h.slides.style.zoom="",h.slides.style.left="50%",h.slides.style.top="50%",h.slides.style.bottom="auto",h.slides.style.right="auto",et({layout:"translate(-50%, -50%) scale("+m+")"}));let w=Array.from(h.wrapper.querySelectorAll(me));for(let B=0,H=w.length;B<H;B++){let q=w[B];q.style.display!=="none"&&(i.center||q.classList.contains("center")?q.classList.contains("stack")?q.style.top=0:q.style.top=Math.max((f.height-q.scrollHeight)/2,0)+"px":q.style.top="")}y!==m&&Y({type:"resize",data:{oldScale:y,scale:m,size:f}})}_n(),h.viewport.style.setProperty("--slide-scale",m),h.viewport.style.setProperty("--viewport-width",d+"px"),h.viewport.style.setProperty("--viewport-height",u+"px"),x.layout(),Z.update(),O.updateParallax(),v.isActive()&&v.update()}}function zt(d,u){k(h.slides,"section > .stretch, section > .r-stretch").forEach(f=>{let y=di(f,u);if(/(img|video)/gi.test(f.nodeName)){let w=f.naturalWidth||f.videoWidth,B=f.naturalHeight||f.videoHeight,H=Math.min(d/w,y/B);f.style.width=w*H+"px",f.style.height=B*H+"px"}else f.style.width=d+"px",f.style.height=y+"px"})}function _n(){if(h.wrapper&&!i.disableLayout&&!D.isActive()&&typeof i.scrollActivationWidth=="number"&&i.view!=="scroll"){let d=Be();d.presentationWidth>0&&d.presentationWidth<=i.scrollActivationWidth?x.isActive()||(O.create(),x.activate()):x.isActive()&&x.deactivate()}}function Be(d,u){let f=i.width,y=i.height;i.disableLayout&&(f=h.slides.offsetWidth,y=h.slides.offsetHeight);let w={width:f,height:y,presentationWidth:d||h.wrapper.offsetWidth,presentationHeight:u||h.wrapper.offsetHeight};return w.presentationWidth-=w.presentationWidth*i.margin,w.presentationHeight-=w.presentationHeight*i.margin,typeof w.width=="string"&&/%$/.test(w.width)&&(w.width=parseInt(w.width,10)/100*w.presentationWidth),typeof w.height=="string"&&/%$/.test(w.height)&&(w.height=parseInt(w.height,10)/100*w.presentationHeight),w}function Ht(d,u){typeof d=="object"&&typeof d.setAttribute=="function"&&d.setAttribute("data-previous-indexv",u||0)}function Dt(d){if(typeof d=="object"&&typeof d.setAttribute=="function"&&d.classList.contains("stack")){let u=d.hasAttribute("data-start-indexv")?"data-start-indexv":"data-previous-indexv";return parseInt(d.getAttribute(u)||0,10)}return 0}function xe(d=c){return d&&d.parentNode&&!!d.parentNode.nodeName.match(/section/i)}function Kn(d=c){return d.classList.contains(".stack")||d.querySelector("section")!==null}function $t(){return c&&xe(c)?!c.nextElementSibling:!1}function Ot(){return a===0&&o===0}function tt(){return c?!(c.nextElementSibling||xe(c)&&c.parentNode.nextElementSibling):!1}function qt(){if(i.pause){let d=h.wrapper.classList.contains("paused");He(),h.wrapper.classList.add("paused"),d===!1&&Y({type:"paused"})}}function Re(){let d=h.wrapper.classList.contains("paused");h.wrapper.classList.remove("paused"),we(),d&&Y({type:"resumed"})}function Ft(d){typeof d=="boolean"?d?qt():Re():Ae()?Re():qt()}function Ae(){return h.wrapper.classList.contains("paused")}function Xn(d){typeof d=="boolean"?d?A.show():A.hide():A.isVisible()?A.hide():A.show()}function Yn(d){typeof d=="boolean"?d?$e():De():F?$e():De()}function Jn(){return!!(T&&!F)}function se(d,u,f,y){if(Y({type:"beforeslidechange",data:{indexh:d===void 0?a:d,indexv:u===void 0?o:u,origin:y}}).defaultPrevented)return;l=c;let w=h.wrapper.querySelectorAll(oe);if(x.isActive()){let _=x.getSlideByIndices(d,u);_&&x.scrollToSlide(_);return}if(w.length===0)return;u===void 0&&!v.isActive()&&(u=Dt(w[d])),l&&l.parentNode&&l.parentNode.classList.contains("stack")&&Ht(l.parentNode,o);let B=g.concat();g.length=0;let H=a||0,q=o||0;a=ze(oe,d===void 0?a:d),o=ze(ct,u===void 0?o:u);let le=a!==H||o!==q;le||(l=null);let he=w[a],G=he.querySelectorAll("section");e.classList.toggle("is-vertical-slide",G.length>1),c=G[o]||he;let z=!1;le&&l&&c&&!v.isActive()&&(S="running",z=nt(l,c,H,q),z&&h.slides.classList.add("disable-slide-transitions")),st(),be(),v.isActive()&&v.update(),f!==void 0&&L.goto(f),l&&l!==c&&(l.classList.remove("present"),l.setAttribute("aria-hidden","true"),Ot()&&setTimeout(()=>{ti().forEach(_=>{Ht(_,0)})},0));e:for(let _=0,li=g.length;_<li;_++){for(let Ve=0;Ve<B.length;Ve++)if(B[Ve]===g[_]){B.splice(Ve,1);continue e}h.viewport.classList.add(g[_]),Y({type:g[_]})}for(;B.length;)h.viewport.classList.remove(B.pop());le&&(E.afterSlideChanged(),Nt(y)),(le||!l)&&(E.stopEmbeddedContent(l),E.startEmbeddedContent(c)),requestAnimationFrame(()=>{Ge(Me(c))}),Z.update(),X.update(),Q.update(),O.update(),O.updateParallax(),M.update(),L.update(),C.writeURL(),we(),z&&(setTimeout(()=>{h.slides.classList.remove("disable-slide-transitions")},0),i.autoAnimate&&P.run(l,c))}function nt(d,u,f,y){return d.hasAttribute("data-auto-animate")&&u.hasAttribute("data-auto-animate")&&d.getAttribute("data-auto-animate-id")===u.getAttribute("data-auto-animate-id")&&!(a>f||o>y?u:d).hasAttribute("data-auto-animate-restart")}function Zn(d,u,f){let y=a||0;a=u,o=f;let w=c!==d;l=c,c=d,c&&l&&i.autoAnimate&&nt(l,c,y,o)&&P.run(l,c),w&&(E.afterSlideChanged(),l&&(E.stopEmbeddedContent(l),E.stopEmbeddedContent(l.slideBackgroundElement)),E.startEmbeddedContent(c),E.startEmbeddedContent(c.slideBackgroundElement)),requestAnimationFrame(()=>{Ge(Me(c))}),Nt()}function Vt(){Ne(),Ct(),be(),T=i.autoSlide,we(),O.create(),C.writeURL(),i.sortFragmentsOnSync===!0&&L.sortAll(),a!==void 0&&(a=ze(oe,a),o=ze(ct,o)),X.update(),Z.update(),st(),Q.update(),Q.updateVisibility(),V.update(),O.update(!0),M.update(),E.formatEmbeddedContent(),i.autoPlayMedia===!1?E.stopEmbeddedContent(c,{unloadIframes:!1}):E.startEmbeddedContent(c),v.isActive()&&v.layout(),Y({type:"sync"})}function Qn(d=c){O.sync(d),L.sync(d),E.load(d),O.update(),Q.update(),Y({type:"slidesync",data:{slide:d}})}function Gn(){ce().forEach(d=>{k(d,"section").forEach((u,f)=>{f>0&&(u.classList.remove("present"),u.classList.remove("past"),u.classList.add("future"),u.setAttribute("aria-hidden","true"))})})}function it(d=ce()){d.forEach((u,f)=>{let y=d[Math.floor(Math.random()*d.length)];y.parentNode===u.parentNode&&u.parentNode.insertBefore(u,y);let w=u.querySelectorAll("section");w.length&&it(w)})}function ze(d,u){let f=k(h.wrapper,d),y=f.length,w=x.isActive()||D.isActive(),B=!1,H=!1;if(y){i.loop&&(u>=y&&(B=!0),u%=y,u<0&&(u=y+u,H=!0)),u=Math.max(Math.min(u,y-1),0);for(let G=0;G<y;G++){let z=f[G],_=i.rtl&&!xe(z);if(z.classList.remove("past"),z.classList.remove("present"),z.classList.remove("future"),z.setAttribute("hidden",""),z.setAttribute("aria-hidden","true"),z.querySelector("section")&&z.classList.add("stack"),w){z.classList.add("present");continue}G<u?(z.classList.add(_?"future":"past"),i.fragments&&Ut(z)):G>u?(z.classList.add(_?"past":"future"),i.fragments&&jt(z)):G===u&&i.fragments&&(B?jt(z):H&&Ut(z))}let q=f[u],le=q.classList.contains("present");q.classList.add("present"),q.removeAttribute("hidden"),q.removeAttribute("aria-hidden"),le||Y({target:q,type:"visible",bubbles:!1});let he=q.getAttribute("data-state");he&&(g=g.concat(he.split(" ")))}else u=0;return u}function Ut(d){k(d,".fragment").forEach(u=>{u.classList.add("visible"),u.classList.remove("current-fragment")})}function jt(d){k(d,".fragment.visible").forEach(u=>{u.classList.remove("visible","current-fragment")})}function st(){let d=ce(),u=d.length,f,y;if(u&&a!==void 0){let w=v.isActive(),B=w?10:i.viewDistance;ge&&(B=w?6:i.mobileViewDistance),D.isActive()&&(B=Number.MAX_VALUE);for(let H=0;H<u;H++){let q=d[H],le=k(q,"section"),he=le.length;if(f=Math.abs((a||0)-H)||0,i.loop&&(f=Math.abs(((a||0)-H)%(u-B))||0),f<B?E.load(q):E.unload(q),he){let G=w?0:Dt(q);for(let z=0;z<he;z++){let _=le[z];y=Math.abs(H===(a||0)?(o||0)-z:z-G),f+y<B?E.load(_):E.unload(_)}}}Yt()?h.wrapper.classList.add("has-vertical-slides"):h.wrapper.classList.remove("has-vertical-slides"),Xt()?h.wrapper.classList.add("has-horizontal-slides"):h.wrapper.classList.remove("has-horizontal-slides")}}function re({includeFragments:d=!1}={}){let u=h.wrapper.querySelectorAll(oe),f=h.wrapper.querySelectorAll(ct),y={left:a>0,right:a<u.length-1,up:o>0,down:o<f.length-1};if(i.loop&&(u.length>1&&(y.left=!0,y.right=!0),f.length>1&&(y.up=!0,y.down=!0)),u.length>1&&i.navigationMode==="linear"&&(y.right=y.right||y.down,y.left=y.left||y.up),d===!0){let w=L.availableRoutes();y.left=y.left||w.prev,y.up=y.up||w.prev,y.down=y.down||w.next,y.right=y.right||w.next}if(i.rtl){let w=y.left;y.left=y.right,y.right=w}return y}function Wt(d=c){let u=ce(),f=0;e:for(let y=0;y<u.length;y++){let w=u[y],B=w.querySelectorAll("section");for(let H=0;H<B.length;H++){if(B[H]===d)break e;B[H].dataset.visibility!=="uncounted"&&f++}if(w===d)break;w.classList.contains("stack")===!1&&w.dataset.visibility!=="uncounted"&&f++}return f}function ei(){let d=Jt(),u=Wt();if(c){let f=c.querySelectorAll(".fragment");if(f.length>0){let y=c.querySelectorAll(".fragment.visible");u+=y.length/f.length*.9}}return Math.min(u/(d-1),1)}function _t(d){let u=a,f=o,y;if(d)if(x.isActive())u=parseInt(d.getAttribute("data-index-h"),10),d.getAttribute("data-index-v")&&(f=parseInt(d.getAttribute("data-index-v"),10));else{let w=xe(d),B=w?d.parentNode:d,H=ce();u=Math.max(H.indexOf(B),0),f=void 0,w&&(f=Math.max(k(d.parentNode,"section").indexOf(d),0))}if(!d&&c&&c.querySelectorAll(".fragment").length>0){let w=c.querySelector(".current-fragment");y=w&&w.hasAttribute("data-fragment-index")?parseInt(w.getAttribute("data-fragment-index"),10):c.querySelectorAll(".fragment.visible").length-1}return{h:u,v:f,f:y}}function at(){return k(h.wrapper,me+':not(.stack):not([data-visibility="uncounted"])')}function ce(){return k(h.wrapper,oe)}function Kt(){return k(h.wrapper,".slides>section>section")}function ti(){return k(h.wrapper,oe+".stack")}function Xt(){return ce().length>1}function Yt(){return Kt().length>1}function ni(){return at().map(d=>{let u={};for(let f=0;f<d.attributes.length;f++){let y=d.attributes[f];u[y.name]=y.value}return u})}function Jt(){return at().length}function Zt(d,u){let f=ce()[d],y=f&&f.querySelectorAll("section");return y&&y.length&&typeof u=="number"?y?y[u]:void 0:f}function ii(d,u){let f=typeof d=="number"?Zt(d,u):d;if(f)return f.slideBackgroundElement}function Qt(){let d=_t();return ee({indexh:d.h,indexv:d.v,indexf:d.f,paused:Ae(),overview:v.isActive()},V.getState())}function si(d){if(typeof d=="object"){se(ke(d.indexh),ke(d.indexv),ke(d.indexf));let u=ke(d.paused),f=ke(d.overview);typeof u=="boolean"&&u!==Ae()&&Ft(u),typeof f=="boolean"&&f!==v.isActive()&&v.toggle(f),V.setState(d)}}function we(){if(He(),c&&i.autoSlide!==!1){let d=c.querySelector(".current-fragment[data-autoslide]"),u=d?d.getAttribute("data-autoslide"):null,f=c.parentNode?c.parentNode.getAttribute("data-autoslide"):null,y=c.getAttribute("data-autoslide");u?T=parseInt(u,10):y?T=parseInt(y,10):f?T=parseInt(f,10):(T=i.autoSlide,c.querySelectorAll(".fragment").length===0&&k(c,"video, audio").forEach(w=>{w.hasAttribute("data-autoplay")&&T&&w.duration*1e3/w.playbackRate>T&&(T=w.duration*1e3/w.playbackRate+1e3)})),T&&!F&&!Ae()&&!v.isActive()&&(!tt()||L.availableRoutes().next||i.loop===!0)&&(W=setTimeout(()=>{typeof i.autoSlideMethod=="function"?i.autoSlideMethod():ot(),we()},T),J=Date.now()),$&&$.setPlaying(W!==-1)}}function He(){clearTimeout(W),W=-1}function De(){T&&!F&&(F=!0,Y({type:"autoslidepaused"}),clearTimeout(W),$&&$.setPlaying(!1))}function $e(){T&&F&&(F=!1,Y({type:"autoslideresumed"}),we())}function Oe({skipFragments:d=!1}={}){if(p.hasNavigatedHorizontally=!0,x.isActive())return x.prev();i.rtl?(v.isActive()||d||L.next()===!1)&&re().left&&se(a+1,i.navigationMode==="grid"?o:void 0):(v.isActive()||d||L.prev()===!1)&&re().left&&se(a-1,i.navigationMode==="grid"?o:void 0)}function qe({skipFragments:d=!1}={}){if(p.hasNavigatedHorizontally=!0,x.isActive())return x.next();i.rtl?(v.isActive()||d||L.prev()===!1)&&re().right&&se(a-1,i.navigationMode==="grid"?o:void 0):(v.isActive()||d||L.next()===!1)&&re().right&&se(a+1,i.navigationMode==="grid"?o:void 0)}function rt({skipFragments:d=!1}={}){if(x.isActive())return x.prev();(v.isActive()||d||L.prev()===!1)&&re().up&&se(a,o-1)}function lt({skipFragments:d=!1}={}){if(p.hasNavigatedVertically=!0,x.isActive())return x.next();(v.isActive()||d||L.next()===!1)&&re().down&&se(a,o+1)}function Gt({skipFragments:d=!1}={}){if(x.isActive())return x.prev();if(d||L.prev()===!1)if(re().up)rt({skipFragments:d});else{let u;if(u=i.rtl?k(h.wrapper,oe+".future").pop():k(h.wrapper,oe+".past").pop(),u&&u.classList.contains("stack")){let f=u.querySelectorAll("section").length-1||void 0;se(a-1,f)}else i.rtl?qe({skipFragments:d}):Oe({skipFragments:d})}}function ot({skipFragments:d=!1}={}){if(p.hasNavigatedHorizontally=!0,p.hasNavigatedVertically=!0,x.isActive())return x.next();if(d||L.next()===!1){let u=re();u.down&&u.right&&i.loop&&$t()&&(u.down=!1),u.down?lt({skipFragments:d}):i.rtl?Oe({skipFragments:d}):qe({skipFragments:d})}}function ai(d){i.autoSlideStoppable&&De()}function en(d){let u=d.data;if(typeof u=="string"&&u.charAt(0)==="{"&&u.charAt(u.length-1)==="}"&&(u=JSON.parse(u),u.method&&typeof n[u.method]=="function"))if(yi.test(u.method)===!1){let f=n[u.method].apply(n,u.args);Bt("callback",{method:u.method,result:f})}else console.warn('reveal.js: "'+u.method+'" is is blacklisted from the postMessage API')}function tn(d){S==="running"&&/section/gi.test(d.target.nodeName)&&(S="idle",Y({type:"slidetransitionend",data:{indexh:a,indexv:o,previousSlide:l,currentSlide:c}}))}function nn(d){let u=j(d.target,'a[href^="#"]');if(u){let f=u.getAttribute("href"),y=C.getIndicesFromHash(f);y&&(n.slide(y.h,y.v,y.f),d.preventDefault())}}function sn(d){be()}function an(d){document.hidden===!1&&document.activeElement!==document.body&&(typeof document.activeElement.blur=="function"&&document.activeElement.blur(),document.body.focus())}function Fe(d){(document.fullscreenElement||document.webkitFullscreenElement)===h.wrapper&&(d.stopImmediatePropagation(),setTimeout(()=>{n.layout(),n.focus.focus()},1))}function ri(d){tt()&&i.loop===!1?(se(0,0),$e()):F?$e():De()}let rn={VERSION:vn,initialize:Hn,configure:Pt,destroy:Wn,sync:Vt,syncSlide:Qn,syncFragments:L.sync.bind(L),slide:se,left:Oe,right:qe,up:rt,down:lt,prev:Gt,next:ot,navigateLeft:Oe,navigateRight:qe,navigateUp:rt,navigateDown:lt,navigatePrev:Gt,navigateNext:ot,navigateFragment:L.goto.bind(L),prevFragment:L.prev.bind(L),nextFragment:L.next.bind(L),on:It,off:Mt,addEventListener:It,removeEventListener:Mt,layout:be,shuffle:it,availableRoutes:re,availableFragments:L.availableRoutes.bind(L),toggleHelp:V.toggleHelp.bind(V),toggleOverview:v.toggle.bind(v),toggleScrollView:x.toggle.bind(x),togglePause:Ft,toggleAutoSlide:Yn,toggleJumpToSlide:Xn,isFirstSlide:Ot,isLastSlide:tt,isLastVerticalSlide:$t,isVerticalSlide:xe,isVerticalStack:Kn,isPaused:Ae,isAutoSliding:Jn,isSpeakerNotes:Q.isSpeakerNotesWindow.bind(Q),isOverview:v.isActive.bind(v),isFocused:pe.isFocused.bind(pe),isOverlayOpen:V.isOpen.bind(V),isScrollView:x.isActive.bind(x),isPrintView:D.isActive.bind(D),isReady:()=>r,loadSlide:E.load.bind(E),unloadSlide:E.unload.bind(E),startEmbeddedContent:()=>E.startEmbeddedContent(c),stopEmbeddedContent:()=>E.stopEmbeddedContent(c,{unloadIframes:!1}),previewIframe:V.previewIframe.bind(V),previewImage:V.previewImage.bind(V),previewVideo:V.previewVideo.bind(V),showPreview:V.previewIframe.bind(V),hidePreview:V.close.bind(V),addEventListeners:Ct,removeEventListeners:Ne,dispatchEvent:Y,getState:Qt,setState:si,getProgress:ei,getIndices:_t,getSlidesAttributes:ni,getSlidePastCount:Wt,getTotalSlides:Jt,getSlide:Zt,getPreviousSlide:()=>l,getCurrentSlide:()=>c,getSlideBackground:ii,getSlideNotes:Q.getSlideNotes.bind(Q),getSlides:at,getHorizontalSlides:ce,getVerticalSlides:Kt,hasHorizontalSlides:Xt,hasVerticalSlides:Yt,hasNavigatedHorizontally:()=>p.hasNavigatedHorizontally,hasNavigatedVertically:()=>p.hasNavigatedVertically,shouldAutoAnimateBetween:nt,addKeyBinding:R.addKeyBinding.bind(R),removeKeyBinding:R.removeKeyBinding.bind(R),triggerKey:R.triggerKey.bind(R),registerKeyboardShortcut:R.registerKeyboardShortcut.bind(R),getComputedSlideSize:Be,setCurrentScrollPage:Zn,removeHiddenSlides:Lt,getScale:()=>m,getConfig:()=>i,getQueryHash:ln,getSlidePath:C.getHash.bind(C),getRevealElement:()=>e,getSlidesElement:()=>h.slides,getViewportElement:()=>h.viewport,getBackgroundsElement:()=>O.element,registerPlugin:U.registerPlugin.bind(U),hasPlugin:U.hasPlugin.bind(U),getPlugin:U.getPlugin.bind(U),getPlugins:U.getRegisteredPlugins.bind(U)};return Se(n,ee(ee({},rn),{},{announceStatus:Ge,getStatusText:Me,focus:pe,scroll:x,progress:Z,controls:X,location:C,overview:v,keyboard:R,fragments:L,backgrounds:O,slideContent:E,slideNumber:M,onUserInput:ai,closeOverlay:V.close.bind(V),updateSlidesVisibility:st,layoutSlideContents:zt,transformSlides:et,cueAutoSlide:we,cancelAutoSlide:He})),rn}var te=fn,pn=[];te.initialize=e=>{let t=document.querySelector(".reveal");if(!(t instanceof HTMLElement))throw Error('Unable to find presentation root (<div class="reveal">).');return Object.assign(te,new fn(t,e)),pn.map(n=>n(te)),te.initialize()},["configure","on","off","addEventListener","removeEventListener","registerPlugin"].forEach(e=>{te[e]=(...t)=>{pn.push(n=>n[e].call(null,...t))}}),te.isReady=()=>!1,te.VERSION=vn;var Wi=`<!--
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
							notesValue.innerHTML = marked.parse( data.notes );
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
</html>`;function yt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ye=yt();function yn(e){ye=e}var fe={exec:()=>null};function I(e,t=""){let n=typeof e=="string"?e:e.source,i={replace:(s,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(K.caret,"$1"),n=n.replace(s,a),i},getRegex:()=>new RegExp(n,t)};return i}var _i=(()=>{try{return!0}catch{return!1}})(),K={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}#`),htmlBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:e=>RegExp(`^ {0,${Math.min(3,e-1)}}>`)},Ki=/^(?:[ \t]*(?:\n|$))+/,Xi=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Yi=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Ie=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Ji=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bt=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,An=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Ln=I(An).replace(/bull/g,bt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Zi=I(An).replace(/bull/g,bt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),wt=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Qi=/^[^\n]+/,kt=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Gi=I(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",kt).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),es=I(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,bt).getRegex(),Je="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",St=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,ts=I("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",St).replace("tag",Je).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),bn=I(wt).replace("hr",Ie).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Je).getRegex(),Et={blockquote:I(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",bn).getRegex(),code:Xi,def:Gi,fences:Yi,heading:Ji,hr:Ie,html:ts,lheading:Ln,list:es,newline:Ki,paragraph:bn,table:fe,text:Qi},wn=I("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Ie).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Je).getRegex(),ns={...Et,lheading:Zi,table:wn,paragraph:I(wt).replace("hr",Ie).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",wn).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Je).getRegex()},is={...Et,html:I(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",St).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:fe,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:I(wt).replace("hr",Ie).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Ln).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ss=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,as=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Tn=/^( {2,}|\\)\n(?!\s*$)/,rs=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Ee=/[\p{P}\p{S}]/u,Ze=/[\s\p{P}\p{S}]/u,xt=/[^\s\p{P}\p{S}]/u,ls=I(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Ze).getRegex(),Pn=/(?!~)[\p{P}\p{S}]/u,os=/(?!~)[\s\p{P}\p{S}]/u,ds=/(?:[^\s\p{P}\p{S}]|~)/u,cs=I(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",_i?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Cn=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,hs=I(Cn,"u").replace(/punct/g,Ee).getRegex(),us=I(Cn,"u").replace(/punct/g,Pn).getRegex(),In="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",ps=I(In,"gu").replace(/notPunctSpace/g,xt).replace(/punctSpace/g,Ze).replace(/punct/g,Ee).getRegex(),gs=I(In,"gu").replace(/notPunctSpace/g,ds).replace(/punctSpace/g,os).replace(/punct/g,Pn).getRegex(),ms=I("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,xt).replace(/punctSpace/g,Ze).replace(/punct/g,Ee).getRegex(),vs=I(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,Ee).getRegex(),fs=I("^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)","gu").replace(/notPunctSpace/g,xt).replace(/punctSpace/g,Ze).replace(/punct/g,Ee).getRegex(),ys=I(/\\(punct)/,"gu").replace(/punct/g,Ee).getRegex(),bs=I(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),ws=I(St).replace("(?:-->|$)","-->").getRegex(),ks=I("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",ws).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),Ke=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,Ss=I(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",Ke).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Mn=I(/^!?\[(label)\]\[(ref)\]/).replace("label",Ke).replace("ref",kt).getRegex(),Nn=I(/^!?\[(ref)\](?:\[\])?/).replace("ref",kt).getRegex(),Es=I("reflink|nolink(?!\\()","g").replace("reflink",Mn).replace("nolink",Nn).getRegex(),kn=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Rt={_backpedal:fe,anyPunctuation:ys,autolink:bs,blockSkip:cs,br:Tn,code:as,del:fe,delLDelim:fe,delRDelim:fe,emStrongLDelim:hs,emStrongRDelimAst:ps,emStrongRDelimUnd:ms,escape:ss,link:Ss,nolink:Nn,punctuation:ls,reflink:Mn,reflinkSearch:Es,tag:ks,text:rs,url:fe},xs={...Rt,link:I(/^!?\[(label)\]\((.*?)\)/).replace("label",Ke).getRegex(),reflink:I(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",Ke).getRegex()},mt={...Rt,emStrongRDelimAst:gs,emStrongLDelim:us,delLDelim:vs,delRDelim:fs,url:I(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",kn).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:I(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",kn).getRegex()},Rs={...mt,br:I(Tn).replace("{2,}","*").getRegex(),text:I(mt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},_e={normal:Et,gfm:ns,pedantic:is},Te={normal:Rt,gfm:mt,breaks:Rs,pedantic:xs},As={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Sn=e=>As[e];function ae(e,t){if(t){if(K.escapeTest.test(e))return e.replace(K.escapeReplace,Sn)}else if(K.escapeTestNoEncode.test(e))return e.replace(K.escapeReplaceNoEncode,Sn);return e}function En(e){try{e=encodeURI(e).replace(K.percentDecode,"%")}catch{return null}return e}function xn(e,t){let n=e.replace(K.findPipe,(s,r,a)=>{let o=!1,l=r;for(;--l>=0&&a[l]==="\\";)o=!o;return o?"|":" |"}).split(K.splitPipe),i=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t)if(n.length>t)n.splice(t);else for(;n.length<t;)n.push("");for(;i<n.length;i++)n[i]=n[i].trim().replace(K.slashPipe,"|");return n}function Pe(e,t,n){let i=e.length;if(i===0)return"";let s=0;for(;s<i;){let r=e.charAt(i-s-1);if(r===t&&!n)s++;else if(r!==t&&n)s++;else break}return e.slice(0,i-s)}function Ls(e,t){if(e.indexOf(t[1])===-1)return-1;let n=0;for(let i=0;i<e.length;i++)if(e[i]==="\\")i++;else if(e[i]===t[0])n++;else if(e[i]===t[1]&&(n--,n<0))return i;return n>0?-2:-1}function Ts(e,t=0){let n=t,i="";for(let s of e)if(s==="	"){let r=4-n%4;i+=" ".repeat(r),n+=r}else i+=s,n++;return i}function Rn(e,t,n,i,s){let r=t.href,a=t.title||null,o=e[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let l={type:e[0].charAt(0)==="!"?"image":"link",raw:n,href:r,title:a,text:o,tokens:i.inlineTokens(o)};return i.state.inLink=!1,l}function Ps(e,t,n){let i=e.match(n.other.indentCodeCompensation);if(i===null)return t;let s=i[1];return t.split(`
`).map(r=>{let a=r.match(n.other.beginningSpace);if(a===null)return r;let[o]=a;return o.length>=s.length?r.slice(s.length):r}).join(`
`)}var Xe=class{options;rules;lexer;constructor(e){this.options=e||ye}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:Pe(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],i=Ps(n,t[3]||"",this.rules);return{type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:i}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let i=Pe(n,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(n=i.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:"hr",raw:Pe(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=Pe(t[0],`
`).split(`
`),i="",s="",r=[];for(;n.length>0;){let a=!1,o=[],l;for(l=0;l<n.length;l++)if(this.rules.other.blockquoteStart.test(n[l]))o.push(n[l]),a=!0;else if(!a)o.push(n[l]);else break;n=n.slice(l);let c=o.join(`
`),p=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${p}`:p;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(p,r,!0),this.lexer.state.top=g,n.length===0)break;let m=r.at(-1);if(m?.type==="code")break;if(m?.type==="blockquote"){let b=m,h=b.raw+`
`+n.join(`
`),S=this.blockquote(h);r[r.length-1]=S,i=i.substring(0,i.length-b.raw.length)+S.raw,s=s.substring(0,s.length-b.text.length)+S.text;break}else if(m?.type==="list"){let b=m,h=b.raw+`
`+n.join(`
`),S=this.list(h);r[r.length-1]=S,i=i.substring(0,i.length-m.raw.length)+S.raw,s=s.substring(0,s.length-b.raw.length)+S.raw,n=h.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:r,text:s}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),i=n.length>1,s={type:"list",raw:"",ordered:i,start:i?+n.slice(0,-1):"",loose:!1,items:[]};n=i?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=i?n:"[*+-]");let r=this.rules.other.listItemRegex(n),a=!1;for(;e;){let l=!1,c="",p="";if(!(t=r.exec(e))||this.rules.block.hr.test(e))break;c=t[0],e=e.substring(c.length);let g=Ts(t[2].split(`
`,1)[0],t[1].length),m=e.split(`
`,1)[0],b=!g.trim(),h=0;if(this.options.pedantic?(h=2,p=g.trimStart()):b?h=t[1].length+1:(h=g.search(this.rules.other.nonSpaceChar),h=h>4?1:h,p=g.slice(h),h+=t[1].length),b&&this.rules.other.blankLine.test(m)&&(c+=m+`
`,e=e.substring(m.length+1),l=!0),!l){let S=this.rules.other.nextBulletRegex(h),T=this.rules.other.hrRegex(h),$=this.rules.other.fencesBeginRegex(h),W=this.rules.other.headingBeginRegex(h),J=this.rules.other.htmlBeginRegex(h),F=this.rules.other.blockquoteBeginRegex(h);for(;e;){let E=e.split(`
`,1)[0],M;if(m=E,this.options.pedantic?(m=m.replace(this.rules.other.listReplaceNesting,"  "),M=m):M=m.replace(this.rules.other.tabCharGlobal,"    "),$.test(m)||W.test(m)||J.test(m)||F.test(m)||S.test(m)||T.test(m))break;if(M.search(this.rules.other.nonSpaceChar)>=h||!m.trim())p+=`
`+M.slice(h);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||$.test(g)||W.test(g)||T.test(g))break;p+=`
`+m}b=!m.trim(),c+=E+`
`,e=e.substring(E.length+1),g=M.slice(h)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(a=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(p),loose:!1,text:p,tokens:[]}),s.raw+=c}let o=s.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let l of s.items){if(this.lexer.state.top=!1,l.tokens=this.lexer.blockTokens(l.text,[]),l.task){if(l.text=l.text.replace(this.rules.other.listReplaceTask,""),l.tokens[0]?.type==="text"||l.tokens[0]?.type==="paragraph"){l.tokens[0].raw=l.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),l.tokens[0].text=l.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let p=this.lexer.inlineQueue.length-1;p>=0;p--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[p].src)){this.lexer.inlineQueue[p].src=this.lexer.inlineQueue[p].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(l.raw);if(c){let p={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};l.checked=p.checked,s.loose?l.tokens[0]&&["paragraph","text"].includes(l.tokens[0].type)&&"tokens"in l.tokens[0]&&l.tokens[0].tokens?(l.tokens[0].raw=p.raw+l.tokens[0].raw,l.tokens[0].text=p.raw+l.tokens[0].text,l.tokens[0].tokens.unshift(p)):l.tokens.unshift({type:"paragraph",raw:p.raw,text:p.raw,tokens:[p]}):l.tokens.unshift(p)}}if(!s.loose){let c=l.tokens.filter(p=>p.type==="space");s.loose=c.length>0&&c.some(p=>this.rules.other.anyLine.test(p.raw))}}if(s.loose)for(let l of s.items){l.loose=!0;for(let c of l.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(e){let t=this.rules.block.html.exec(e);if(t)return{type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return{type:"def",tag:n,raw:t[0],href:i,title:s}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=xn(t[1]),i=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?r.align.push("right"):this.rules.other.tableAlignCenter.test(a)?r.align.push("center"):this.rules.other.tableAlignLeft.test(a)?r.align.push("left"):r.align.push(null);for(let a=0;a<n.length;a++)r.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:r.align[a]});for(let a of s)r.rows.push(xn(a,r.header.length).map((o,l)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:r.align[l]})));return r}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let n=t[1].trim();return{type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:n,tokens:this.lexer.inline(n)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let r=Pe(n.slice(0,-1),"\\");if((n.length-r.length)%2==0)return}else{let r=Ls(t[2],"()");if(r===-2)return;if(r>-1){let a=(t[0].indexOf("!")===0?5:4)+t[1].length+r;t[2]=t[2].substring(0,r),t[0]=t[0].substring(0,a).trim(),t[3]=""}}let i=t[2],s="";if(this.options.pedantic){let r=this.rules.other.pedanticHrefTitle.exec(i);r&&(i=r[1],s=r[3])}else s=t[3]?t[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(i=this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?i.slice(1):i.slice(1,-1)),Rn(t,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let i=t[(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," ").toLowerCase()];if(!i){let s=n[0].charAt(0);return{type:"text",raw:s,text:s}}return Rn(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let i=this.rules.inline.emStrongLDelim.exec(e);if(!(!i||!i[1]&&!i[2]&&!i[3]&&!i[4]||i[4]&&n.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[3])||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,r,a,o=s,l=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(i=c.exec(t))!==null;){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r)continue;if(a=[...r].length,i[3]||i[4]){o+=a;continue}else if((i[5]||i[6])&&s%3&&!((s+a)%3)){l+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o+l);let p=[...i[0]][0].length,g=e.slice(0,s+i.index+p+a);if(Math.min(s,a)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let m=g.slice(2,-2);return{type:"strong",raw:g,text:m,tokens:this.lexer.inlineTokens(m)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(n),s=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return i&&s&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:"br",raw:t[0]}}del(e,t,n=""){let i=this.rules.inline.delLDelim.exec(e);if(i&&(!i[1]||!n||this.rules.inline.punctuation.exec(n))){let s=[...i[0]].length-1,r,a,o=s,l=this.rules.inline.delRDelim;for(l.lastIndex=0,t=t.slice(-1*e.length+s);(i=l.exec(t))!==null;){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r||(a=[...r].length,a!==s))continue;if(i[3]||i[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let c=[...i[0]][0].length,p=e.slice(0,s+i.index+c+a),g=p.slice(s,-s);return{type:"del",raw:p,text:g,tokens:this.lexer.inlineTokens(g)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,i;return t[2]==="@"?(n=t[1],i="mailto:"+n):(n=t[1],i=n),{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,i;if(t[2]==="@")n=t[0],i="mailto:"+n;else{let s;do s=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(s!==t[0]);n=t[0],i=t[1]==="www."?"http://"+t[0]:t[0]}return{type:"link",raw:t[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return{type:"text",raw:t[0],text:t[0],escaped:n}}}},ne=class vt{tokens;options;state;inlineQueue;tokenizer;constructor(t){this.tokens=[],this.tokens.links=Object.create(null),this.options=t||ye,this.options.tokenizer=this.options.tokenizer||new Xe,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let n={other:K,block:_e.normal,inline:Te.normal};this.options.pedantic?(n.block=_e.pedantic,n.inline=Te.pedantic):this.options.gfm&&(n.block=_e.gfm,this.options.breaks?n.inline=Te.breaks:n.inline=Te.gfm),this.tokenizer.rules=n}static get rules(){return{block:_e,inline:Te}}static lex(t,n){return new vt(n).lex(t)}static lexInline(t,n){return new vt(n).inlineTokens(t)}lex(t){t=t.replace(K.carriageReturn,`
`),this.blockTokens(t,this.tokens);for(let n=0;n<this.inlineQueue.length;n++){let i=this.inlineQueue[n];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(t,n=[],i=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(t=t.replace(K.tabCharGlobal,"    ").replace(K.spaceLine,""));t;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},t,n))?(t=t.substring(s.raw.length),n.push(s),!0):!1))continue;if(s=this.tokenizer.space(t)){t=t.substring(s.raw.length);let a=n.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:n.push(s);continue}if(s=this.tokenizer.code(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(s=this.tokenizer.fences(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.heading(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.hr(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.blockquote(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.list(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.html(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.def(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},n.push(s));continue}if(s=this.tokenizer.table(t)){t=t.substring(s.raw.length),n.push(s);continue}if(s=this.tokenizer.lheading(t)){t=t.substring(s.raw.length),n.push(s);continue}let r=t;if(this.options.extensions?.startBlock){let a=1/0,o=t.slice(1),l;this.options.extensions.startBlock.forEach(c=>{l=c.call({lexer:this},o),typeof l=="number"&&l>=0&&(a=Math.min(a,l))}),a<1/0&&a>=0&&(r=t.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(r))){let a=n.at(-1);i&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s),i=r.length!==t.length,t=t.substring(s.raw.length);continue}if(s=this.tokenizer.text(t)){t=t.substring(s.raw.length);let a=n.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):n.push(s);continue}if(t){let a="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw Error(a)}}return this.state.top=!0,n}inline(t,n=[]){return this.inlineQueue.push({src:t,tokens:n}),n}inlineTokens(t,n=[]){this.tokenizer.lexer=this;let i=t,s=null;if(this.tokens.links){let l=Object.keys(this.tokens.links);if(l.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!==null;)l.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!==null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let r;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!==null;)r=s[2]?s[2].length:0,i=i.slice(0,s.index+r)+"["+"a".repeat(s[0].length-r-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=this.options.hooks?.emStrongMask?.call({lexer:this},i)??i;let a=!1,o="";for(;t;){a||(o=""),a=!1;let l;if(this.options.extensions?.inline?.some(p=>(l=p.call({lexer:this},t,n))?(t=t.substring(l.raw.length),n.push(l),!0):!1))continue;if(l=this.tokenizer.escape(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.tag(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.link(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.reflink(t,this.tokens.links)){t=t.substring(l.raw.length);let p=n.at(-1);l.type==="text"&&p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(l=this.tokenizer.emStrong(t,i,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.codespan(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.br(t)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.del(t,i,o)){t=t.substring(l.raw.length),n.push(l);continue}if(l=this.tokenizer.autolink(t)){t=t.substring(l.raw.length),n.push(l);continue}if(!this.state.inLink&&(l=this.tokenizer.url(t))){t=t.substring(l.raw.length),n.push(l);continue}let c=t;if(this.options.extensions?.startInline){let p=1/0,g=t.slice(1),m;this.options.extensions.startInline.forEach(b=>{m=b.call({lexer:this},g),typeof m=="number"&&m>=0&&(p=Math.min(p,m))}),p<1/0&&p>=0&&(c=t.substring(0,p+1))}if(l=this.tokenizer.inlineText(c)){t=t.substring(l.raw.length),l.raw.slice(-1)!=="_"&&(o=l.raw.slice(-1)),a=!0;let p=n.at(-1);p?.type==="text"?(p.raw+=l.raw,p.text+=l.text):n.push(l);continue}if(t){let p="Infinite loop on byte: "+t.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw Error(p)}}return n}},Ye=class{options;parser;constructor(e){this.options=e||ye}space(e){return""}code({text:e,lang:t,escaped:n}){let i=(t||"").match(K.notSpaceStart)?.[0],s=e.replace(K.endingNewline,"")+`
`;return i?'<pre><code class="language-'+ae(i)+'">'+(n?s:ae(s,!0))+`</code></pre>
`:"<pre><code>"+(n?s:ae(s,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return""}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,i="";for(let a=0;a<e.items.length;a++){let o=e.items[a];i+=this.listitem(o)}let s=t?"ol":"ul",r=t&&n!==1?' start="'+n+'"':"";return"<"+s+r+`>
`+i+"</"+s+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let s=0;s<e.header.length;s++)n+=this.tablecell(e.header[s]);t+=this.tablerow({text:n});let i="";for(let s=0;s<e.rows.length;s++){let r=e.rows[s];n="";for(let a=0;a<r.length;a++)n+=this.tablecell(r[a]);i+=this.tablerow({text:n})}return i&&=`<tbody>${i}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+i+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${ae(e,!0)}</code>`}br(e){return"<br>"}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let i=this.parser.parseInline(n),s=En(e);if(s===null)return i;e=s;let r='<a href="'+e+'"';return t&&(r+=' title="'+ae(t)+'"'),r+=">"+i+"</a>",r}image({href:e,title:t,text:n,tokens:i}){i&&(n=this.parser.parseInline(i,this.parser.textRenderer));let s=En(e);if(s===null)return ae(n);e=s;let r=`<img src="${e}" alt="${ae(n)}"`;return t&&(r+=` title="${ae(t)}"`),r+=">",r}text(e){return"tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:ae(e.text)}},At=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return""+e}image({text:e}){return""+e}br(){return""}checkbox({raw:e}){return e}},ie=class ft{options;renderer;textRenderer;constructor(t){this.options=t||ye,this.options.renderer=this.options.renderer||new Ye,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new At}static parse(t,n){return new ft(n).parse(t)}static parseInline(t,n){return new ft(n).parseInline(t)}parse(t){this.renderer.parser=this;let n="";for(let i=0;i<t.length;i++){let s=t[i];if(this.options.extensions?.renderers?.[s.type]){let a=s,o=this.options.extensions.renderers[a.type].call({parser:this},a);if(o!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){n+=o||"";continue}}let r=s;switch(r.type){case"space":n+=this.renderer.space(r);break;case"hr":n+=this.renderer.hr(r);break;case"heading":n+=this.renderer.heading(r);break;case"code":n+=this.renderer.code(r);break;case"table":n+=this.renderer.table(r);break;case"blockquote":n+=this.renderer.blockquote(r);break;case"list":n+=this.renderer.list(r);break;case"checkbox":n+=this.renderer.checkbox(r);break;case"html":n+=this.renderer.html(r);break;case"def":n+=this.renderer.def(r);break;case"paragraph":n+=this.renderer.paragraph(r);break;case"text":n+=this.renderer.text(r);break;default:{let a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw Error(a)}}}return n}parseInline(t,n=this.renderer){this.renderer.parser=this;let i="";for(let s=0;s<t.length;s++){let r=t[s];if(this.options.extensions?.renderers?.[r.type]){let o=this.options.extensions.renderers[r.type].call({parser:this},r);if(o!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=o||"";continue}}let a=r;switch(a.type){case"escape":i+=n.text(a);break;case"html":i+=n.html(a);break;case"link":i+=n.link(a);break;case"image":i+=n.image(a);break;case"checkbox":i+=n.checkbox(a);break;case"strong":i+=n.strong(a);break;case"em":i+=n.em(a);break;case"codespan":i+=n.codespan(a);break;case"br":i+=n.br(a);break;case"del":i+=n.del(a);break;case"text":i+=n.text(a);break;default:{let o='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(o),"";throw Error(o)}}}return i}},Ce=class{options;block;constructor(e){this.options=e||ye}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?ne.lex:ne.lexInline}provideParser(e=this.block){return e?ie.parse:ie.parseInline}},ve=new class{defaults=yt();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=ie;Renderer=Ye;TextRenderer=At;Lexer=ne;Tokenizer=Xe;Hooks=Ce;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let i of e)switch(n=n.concat(t.call(this,i)),i.type){case"table":{let s=i;for(let r of s.header)n=n.concat(this.walkTokens(r.tokens,t));for(let r of s.rows)for(let a of r)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let s=i;n=n.concat(this.walkTokens(s.items,t));break}default:{let s=i;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(r=>{let a=s[r].flat(1/0);n=n.concat(this.walkTokens(a,t))}):s.tokens&&(n=n.concat(this.walkTokens(s.tokens,t)))}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let i={...n};if(i.async=this.defaults.async||i.async||!1,n.extensions&&(n.extensions.forEach(s=>{if(!s.name)throw Error("extension name required");if("renderer"in s){let r=t.renderers[s.name];r?t.renderers[s.name]=function(...a){let o=s.renderer.apply(this,a);return o===!1&&(o=r.apply(this,a)),o}:t.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw Error("extension level must be 'block' or 'inline'");let r=t[s.level];r?r.unshift(s.tokenizer):t[s.level]=[s.tokenizer],s.start&&(s.level==="block"?t.startBlock?t.startBlock.push(s.start):t.startBlock=[s.start]:s.level==="inline"&&(t.startInline?t.startInline.push(s.start):t.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(t.childTokens[s.name]=s.childTokens)}),i.extensions=t),n.renderer){let s=this.defaults.renderer||new Ye(this.defaults);for(let r in n.renderer){if(!(r in s))throw Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let a=r,o=n.renderer[a],l=s[a];s[a]=(...c)=>{let p=o.apply(s,c);return p===!1&&(p=l.apply(s,c)),p||""}}i.renderer=s}if(n.tokenizer){let s=this.defaults.tokenizer||new Xe(this.defaults);for(let r in n.tokenizer){if(!(r in s))throw Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let a=r,o=n.tokenizer[a],l=s[a];s[a]=(...c)=>{let p=o.apply(s,c);return p===!1&&(p=l.apply(s,c)),p}}i.tokenizer=s}if(n.hooks){let s=this.defaults.hooks||new Ce;for(let r in n.hooks){if(!(r in s))throw Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let a=r,o=n.hooks[a],l=s[a];Ce.passThroughHooks.has(r)?s[a]=c=>{if(this.defaults.async&&Ce.passThroughHooksRespectAsync.has(r))return(async()=>{let g=await o.call(s,c);return l.call(s,g)})();let p=o.call(s,c);return l.call(s,p)}:s[a]=(...c)=>{if(this.defaults.async)return(async()=>{let g=await o.apply(s,c);return g===!1&&(g=await l.apply(s,c)),g})();let p=o.apply(s,c);return p===!1&&(p=l.apply(s,c)),p}}i.hooks=s}if(n.walkTokens){let s=this.defaults.walkTokens,r=n.walkTokens;i.walkTokens=function(a){let o=[];return o.push(r.call(this,a)),s&&(o=o.concat(s.call(this,a))),o}}this.defaults={...this.defaults,...i}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return ne.lex(e,t??this.defaults)}parser(e,t){return ie.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let i={...n},s={...this.defaults,...i},r=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return r(Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof t>"u"||t===null)return r(Error("marked(): input parameter is undefined or null"));if(typeof t!="string")return r(Error("marked(): input parameter is of type "+Object.prototype.toString.call(t)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(t):t,o=await(s.hooks?await s.hooks.provideLexer(e):e?ne.lex:ne.lexInline)(a,s),l=s.hooks?await s.hooks.processAllTokens(o):o;s.walkTokens&&await Promise.all(this.walkTokens(l,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser(e):e?ie.parse:ie.parseInline)(l,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(r);try{s.hooks&&(t=s.hooks.preprocess(t));let a=(s.hooks?s.hooks.provideLexer(e):e?ne.lex:ne.lexInline)(t,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let o=(s.hooks?s.hooks.provideParser(e):e?ie.parse:ie.parseInline)(a,s);return s.hooks&&(o=s.hooks.postprocess(o)),o}catch(a){return r(a)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let i="<p>An error occurred:</p><pre>"+ae(n.message+"",!0)+"</pre>";return t?Promise.resolve(i):i}if(t)return Promise.reject(n);throw n}}};function N(e,t){return ve.parse(e,t)}N.options=N.setOptions=function(e){return ve.setOptions(e),N.defaults=ve.defaults,yn(N.defaults),N},N.getDefaults=yt,N.defaults=ye,N.use=function(...e){return ve.use(...e),N.defaults=ve.defaults,yn(N.defaults),N},N.walkTokens=function(e,t){return ve.walkTokens(e,t)},N.parseInline=ve.parseInline,N.Parser=ie,N.parser=ie.parse,N.Renderer=Ye,N.TextRenderer=At,N.Lexer=ne,N.lexer=ne.lex,N.Tokenizer=Xe,N.Hooks=Ce,N.parse=N,N.options,N.setOptions,N.use,N.walkTokens,N.parseInline,ie.parse,ne.lex;var Bn=()=>{let e,t=null,n;function i(){if(t&&!t.closed)t.focus();else{if(t=window.open("about:blank","reveal.js - Notes","width=1100,height=700"),t.marked=N,t.document.write(Wi),!t){alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");return}r()}}function s(g){t&&!t.closed?t.focus():(t=g,window.addEventListener("message",c),p())}function r(){let g=n.getConfig().url,m=typeof g=="string"?g:window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search;e=setInterval(function(){t.postMessage(JSON.stringify({namespace:"reveal-notes",type:"connect",state:n.getState(),url:m}),"*")},500),window.addEventListener("message",c)}function a(g,m,b){let h=n[g].apply(n,m);t.postMessage(JSON.stringify({namespace:"reveal-notes",type:"return",result:h,callId:b}),"*")}function o(g){let m=n.getCurrentSlide(),b=m.querySelectorAll("aside.notes"),h=m.querySelector(".current-fragment"),S={namespace:"reveal-notes",type:"state",notes:"",markdown:!1,whitespace:"normal",state:n.getState()};if(m.hasAttribute("data-notes")&&(S.notes=m.getAttribute("data-notes"),S.whitespace="pre-wrap"),h){let T=h.querySelector("aside.notes");T?(S.notes=T.innerHTML,S.markdown=typeof T.getAttribute("data-markdown")=="string",b=null):h.hasAttribute("data-notes")&&(S.notes=h.getAttribute("data-notes"),S.whitespace="pre-wrap",b=null)}b&&b.length&&(b=Array.from(b).filter(T=>T.closest(".fragment")===null),S.notes=b.map(T=>T.innerHTML).join(`
`),S.markdown=b[0]&&typeof b[0].getAttribute("data-markdown")=="string"),t.postMessage(JSON.stringify(S),"*")}function l(g){try{return window.location.origin===g.source.location.origin}catch{return!1}}function c(g){if(l(g))try{let m=JSON.parse(g.data);m&&m.namespace==="reveal-notes"&&m.type==="connected"?(clearInterval(e),p()):m&&m.namespace==="reveal-notes"&&m.type==="call"&&a(m.methodName,m.arguments,m.callId)}catch{}}function p(){n.on("slidechanged",o),n.on("fragmentshown",o),n.on("fragmenthidden",o),n.on("overviewhidden",o),n.on("overviewshown",o),n.on("paused",o),n.on("resumed",o),n.on("previewiframe",o),n.on("previewimage",o),n.on("previewvideo",o),n.on("closeoverlay",o),o()}return{id:"notes",init:function(g){n=g,/receiver/i.test(window.location.search)||(window.location.search.match(/(\?|\&)notes/gi)===null?window.addEventListener("message",m=>{if(!t&&typeof m.data=="string"){let b;try{b=JSON.parse(m.data)}catch{}b&&b.namespace==="reveal-notes"&&b.type==="heartbeat"&&s(m.source)}}):i(),n.addKeyBinding({keyCode:83,key:"S",description:"Speaker notes view"},function(){i()}))},open:i}};var zn=()=>{let e,t,n,i,s,r,a;function o(){t=document.createElement("div"),t.classList.add("searchbox"),t.style.position="absolute",t.style.top="10px",t.style.right="10px",t.style.zIndex=10,t.innerHTML=`<input type="search" class="searchinput" placeholder="Search..." style="vertical-align: top;"/>
		</span>`,n=t.querySelector(".searchinput"),n.style.width="240px",n.style.fontSize="14px",n.style.padding="4px 6px",n.style.color="#000",n.style.background="#fff",n.style.borderRadius="2px",n.style.border="0",n.style.outline="0",n.style.boxShadow="0 2px 18px rgba(0, 0, 0, 0.2)",n.style["-webkit-appearance"]="none",e.getRevealElement().appendChild(t),n.addEventListener("keyup",function(b){b.keyCode===13?(b.preventDefault(),g(),r=!1):r=!0},!1),c()}function l(){t||o(),t.style.display="inline",n.focus(),n.select()}function c(){t||o(),t.style.display="none",a&&a.remove()}function p(){t||o(),t.style.display==="inline"?c():l()}function g(){if(r){var b=n.value;b===""?(a&&a.remove(),i=null):(a=new m("slidecontent"),i=a.apply(b),s=0)}i&&(i.length&&i.length<=s&&(s=0),i.length>s&&(e.slide(i[s].h,i[s].v),s++))}function m(b,h){var S=document.getElementById(b)||document.body,T=h||"EM",$=RegExp("^(?:"+T+"|SCRIPT|FORM)$"),W=["#ff6","#a0ffff","#9f9","#f99","#f6f"],J=[],F=0,E="",M=[];this.setRegex=function(A){A=A.trim(),E=RegExp("("+A+")","i")},this.getRegex=function(){return E.toString().replace(/^\/\\b\(|\)\\b\/i$/g,"").replace(/\|/g," ")},this.hiliteWords=function(A){if(!(A==null||!A)&&E&&!$.test(A.nodeName)){if(A.hasChildNodes())for(var P=0;P<A.childNodes.length;P++)this.hiliteWords(A.childNodes[P]);if(A.nodeType==3){var O,x;if((O=A.nodeValue)&&(x=E.exec(O))){for(var D=A;D!=null&&D.nodeName!="SECTION";)D=D.parentNode;for(var L=e.getIndices(D),v=M.length,R=!1,P=0;P<v;P++)M[P].h===L.h&&M[P].v===L.v&&(R=!0);R||M.push(L),J[x[0].toLowerCase()]||(J[x[0].toLowerCase()]=W[F++%W.length]);var C=document.createElement(T);C.appendChild(document.createTextNode(x[0])),C.style.backgroundColor=J[x[0].toLowerCase()],C.style.fontStyle="inherit",C.style.color="#000";var X=A.splitText(x.index);X.nodeValue=X.nodeValue.substring(x[0].length),A.parentNode.insertBefore(C,X)}}}},this.remove=function(){for(var A=document.getElementsByTagName(T),P;A.length&&(P=A[0]);)P.parentNode.replaceChild(P.firstChild,P)},this.apply=function(A){if(!(A==null||!A))return this.remove(),this.setRegex(A),this.hiliteWords(S),M}}return{id:"search",init:b=>{e=b,e.registerKeyboardShortcut("CTRL + Shift + F","Search"),document.addEventListener("keydown",function(h){h.key=="F"&&(h.ctrlKey||h.metaKey)&&(h.preventDefault(),p())},!1)},open:l,close:c,toggle:p}};window.Reveal=te;te.initialize({width:960,height:720,margin:0,controls:!0,controlsLayout:"bottom-right",controlsTutorial:!1,controlsBackArrows:"faded",progress:!1,slideNumber:"c/t",showSlideNumber:"all",hashOneBasedIndex:!0,hash:!0,respondToHashChanges:!1,jumpToSlide:!0,history:!1,keyboard:!0,keyboardCondition:null,disableLayout:!1,overview:!0,center:!1,touch:!0,loop:!1,rtl:!1,navigationMode:"linear",shuffle:!1,fragments:!0,fragmentInURL:!0,embedded:!1,help:!0,pause:!1,showNotes:!1,autoPlayMedia:null,preloadIframes:null,autoAnimate:!1,mouseWheel:!1,previewLinks:!1,transition:"none",transitionSpeed:"fast",backgroundTransition:"none",scrollLayout:"compact",scrollSnap:!1,pdfMaxPagesPerSlide:1,pdfSeparateFragments:!1,viewDistance:2,plugins:[Bn,zn]});te.addKeyBinding({keyCode:86,key:"V",description:"Toggle Scroll View"},()=>{let e=new URL(window.location.href);e.searchParams.get("view")==="scroll"?e.searchParams.delete("view"):e.searchParams.set("view","scroll"),window.location.replace(e)});export{te as Reveal};
