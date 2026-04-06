var Cs=Object.defineProperty,Is=Object.defineProperties,Ms=Object.getOwnPropertyDescriptors,Ei=Object.getOwnPropertySymbols,Ns=Object.prototype.hasOwnProperty,Bs=Object.prototype.propertyIsEnumerable,dt=(n,e,t)=>e in n?Cs(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t,oe=(n,e)=>{for(var t in e||(e={}))Ns.call(e,t)&&dt(n,t,e[t]);if(Ei)for(var t of Ei(e))Bs.call(e,t)&&dt(n,t,e[t]);return n},Pi=(n,e)=>Is(n,Ms(e)),Ci=(n,e,t)=>dt(n,typeof e!="symbol"?e+"":e,t),zs=(n,e,t)=>new Promise((i,s)=>{var r=o=>{try{l(t.next(o))}catch(c){s(c)}},a=o=>{try{l(t.throw(o))}catch(c){s(c)}},l=o=>o.done?i(o.value):Promise.resolve(o.value).then(r,a);l((t=t.apply(n,e)).next())}),Se=(n,e)=>{for(let t in e)n[t]=e[t];return n},S=(n,e)=>Array.from(n.querySelectorAll(e)),rt=(n,e,t)=>{t?n.classList.add(e):n.classList.remove(e)},ke=n=>{if(typeof n=="string"){if(n==="null")return null;if(n==="true")return!0;if(n==="false")return!1;if(n.match(/^-?[\d\.]+$/))return parseFloat(n)}return n},ue=(n,e)=>{n.style.transform=e},Ve=(n,e)=>{let t=n.matches||n.matchesSelector||n.msMatchesSelector;return!!(t&&t.call(n,e))},j=(n,e)=>{if(n&&typeof n.closest=="function")return n.closest(e);for(;n;){if(Ve(n,e))return n;n=n.parentElement}return null},Ii=n=>{n=n||document.documentElement;let e=n.requestFullscreen||n.webkitRequestFullscreen||n.webkitRequestFullScreen||n.mozRequestFullScreen||n.msRequestFullscreen;e&&e.apply(n)},Hs=(n,e,t,i="")=>{let s=n.querySelectorAll("."+t);for(let a=0;a<s.length;a++){let l=s[a];if(l.parentNode===n)return l}let r=document.createElement(e);return r.className=t,r.innerHTML=i,n.appendChild(r),r},ct=n=>{let e=document.createElement("style");return n&&n.length>0&&e.appendChild(document.createTextNode(n)),document.head.appendChild(e),e},Ri=()=>{let n={};location.search.replace(/[A-Z0-9]+?=([\w\.%-]*)/gi,e=>{let t=e.split("=").shift(),i=e.split("=").pop();return t&&i!==void 0&&(n[t]=i),e});for(let e in n){let t=n[e];n[e]=ke(unescape(t))}return typeof n.dependencies<"u"&&delete n.dependencies,n},Ds=(n,e=0)=>{var t;if(n){let i,s=n.style.height;return n.style.height="0px",n.parentElement&&(n.parentElement.style.height="auto"),i=e-(((t=n.parentElement)==null?void 0:t.offsetHeight)||0),n.style.height=s+"px",n.parentElement&&n.parentElement.style.removeProperty("height"),i}return e},$s={mp4:"video/mp4",m4a:"video/mp4",ogv:"video/ogg",mpeg:"video/mpeg",webm:"video/webm"},qs=(n="")=>{let e=n.split(".").pop();return e?$s[e]:void 0},Os=(n="")=>encodeURI(n).replace(/%5B/g,"[").replace(/%5D/g,"]").replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`),Mi=navigator.userAgent,ge=/(iphone|ipod|ipad|android)/gi.test(Mi)||navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1,Ni=/android/gi.test(Mi),Fs=(function(n){if(n){var e=function(v){return[].slice.call(v)},t=0,i=1,s=2,r=3,a=[],l=null,o="requestAnimationFrame"in n?function(){var v=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{sync:!1};n.cancelAnimationFrame(l);var R=function(){return u(a.filter((function(C){return C.dirty&&C.active})))};if(v.sync)return R();l=n.requestAnimationFrame(R)}:function(){},c=function(v){return function(R){a.forEach((function(C){return C.dirty=v})),o(R)}},u=function(v){v.filter((function(C){return!C.styleComputed})).forEach((function(C){C.styleComputed=h(C)})),v.filter(k).forEach(T);var R=v.filter(f);R.forEach(p),R.forEach((function(C){T(C),m(C)})),R.forEach(F)},m=function(v){return v.dirty=t},p=function(v){v.availableWidth=v.element.parentNode.clientWidth,v.currentWidth=v.element.scrollWidth,v.previousFontSize=v.currentFontSize,v.currentFontSize=Math.min(Math.max(v.minSize,v.availableWidth/v.currentWidth*v.previousFontSize),v.maxSize),v.whiteSpace=v.multiLine&&v.currentFontSize===v.minSize?"normal":"nowrap"},f=function(v){return v.dirty!==s||v.dirty===s&&v.element.parentNode.clientWidth!==v.availableWidth},h=function(v){var R=n.getComputedStyle(v.element,null);return v.currentFontSize=parseFloat(R.getPropertyValue("font-size")),v.display=R.getPropertyValue("display"),v.whiteSpace=R.getPropertyValue("white-space"),!0},k=function(v){var R=!1;return!v.preStyleTestCompleted&&(/inline-/.test(v.display)||(R=!0,v.display="inline-block"),v.whiteSpace!=="nowrap"&&(R=!0,v.whiteSpace="nowrap"),v.preStyleTestCompleted=!0,R)},T=function(v){v.element.style.whiteSpace=v.whiteSpace,v.element.style.display=v.display,v.element.style.fontSize=v.currentFontSize+"px"},F=function(v){v.element.dispatchEvent(new CustomEvent("fit",{detail:{oldValue:v.previousFontSize,newValue:v.currentFontSize,scaleFactor:v.currentFontSize/v.previousFontSize}}))},O=function(v,R){return function(C){v.dirty=R,v.active&&o(C)}},J=function(v){return function(){a=a.filter((function(R){return R.element!==v.element})),v.observeMutations&&v.observer.disconnect(),v.element.style.whiteSpace=v.originalStyle.whiteSpace,v.element.style.display=v.originalStyle.display,v.element.style.fontSize=v.originalStyle.fontSize}},V=function(v){return function(){v.active||(v.active=!0,o())}},x=function(v){return function(){return v.active=!1}},M=function(v){v.observeMutations&&(v.observer=new MutationObserver(O(v,i)),v.observer.observe(v.element,v.observeMutations))},A={minSize:16,maxSize:512,multiLine:!0,observeMutations:"MutationObserver"in n&&{subtree:!0,childList:!0,characterData:!0}},P=null,$=function(){n.clearTimeout(P),P=n.setTimeout(c(s),L.observeWindowDelay)},E=["resize","orientationchange"];return Object.defineProperty(L,"observeWindow",{set:function(v){var R="".concat(v?"add":"remove","EventListener");E.forEach((function(C){n[R](C,$)}))}}),L.observeWindow=!0,L.observeWindowDelay=100,L.fitAll=c(r),L}function D(v,R){var C=Object.assign({},A,R),X=v.map((function(Z){var de=Object.assign({},C,{element:Z,active:!0});return(function(_){_.originalStyle={whiteSpace:_.element.style.whiteSpace,display:_.element.style.display,fontSize:_.element.style.fontSize},M(_),_.newbie=!0,_.dirty=!0,a.push(_)})(de),{element:Z,fit:O(de,r),unfreeze:V(de),freeze:x(de),unsubscribe:J(de)}}));return o(),X}function L(v){var R=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return typeof v=="string"?D(e(document.querySelectorAll(v)),R):D([v],R)[0]}})(typeof window>"u"?null:window),ht=class{constructor(e){Ci(this,"allowedToPlayAudio",null),this.Reveal=e,this.startEmbeddedMedia=this.startEmbeddedMedia.bind(this),this.startEmbeddedIframe=this.startEmbeddedIframe.bind(this),this.preventIframeAutoFocus=this.preventIframeAutoFocus.bind(this),this.ensureMobileMediaPlaying=this.ensureMobileMediaPlaying.bind(this),this.failedAudioPlaybackTargets=new Set,this.failedVideoPlaybackTargets=new Set,this.failedMutedVideoPlaybackTargets=new Set,this.renderMediaPlayButton()}renderMediaPlayButton(){this.mediaPlayButton=document.createElement("button"),this.mediaPlayButton.className="r-overlay-button r-media-play-button",this.mediaPlayButton.addEventListener("click",()=>{this.resetTemporarilyMutedMedia(),new Set([...this.failedAudioPlaybackTargets,...this.failedVideoPlaybackTargets,...this.failedMutedVideoPlaybackTargets]).forEach(e=>{this.startEmbeddedMedia({target:e})}),this.clearMediaPlaybackErrors()})}shouldPreload(e){if(this.Reveal.isScrollView())return!0;let t=this.Reveal.getConfig().preloadIframes;return typeof t!="boolean"&&(t=e.hasAttribute("data-preload")),t}load(e,t={}){let i=this.Reveal.getConfig().display;if(i.includes("!important")){let r=i.replace(/\s*!important\s*$/,"").trim();e.style.setProperty("display",r,"important")}else e.style.display=i;S(e,"img[data-src], video[data-src], audio[data-src], iframe[data-src]").forEach(r=>{let a=r.tagName==="IFRAME";(!a||this.shouldPreload(r))&&(r.setAttribute("src",r.getAttribute("data-src")),r.setAttribute("data-lazy-loaded",""),r.removeAttribute("data-src"),a&&r.addEventListener("load",this.preventIframeAutoFocus))}),S(e,"video, audio").forEach(r=>{let a=0;S(r,"source[data-src]").forEach(l=>{l.setAttribute("src",l.getAttribute("data-src")),l.removeAttribute("data-src"),l.setAttribute("data-lazy-loaded",""),a+=1}),ge&&r.tagName==="VIDEO"&&r.setAttribute("playsinline",""),a>0&&r.load()});let s=e.slideBackgroundElement;if(s){s.style.display="block";let r=e.slideBackgroundContentElement,a=e.getAttribute("data-background-iframe");if(s.hasAttribute("data-loaded")===!1){s.setAttribute("data-loaded","true");let o=e.getAttribute("data-background-image"),c=e.getAttribute("data-background-video"),u=e.hasAttribute("data-background-video-loop"),m=e.hasAttribute("data-background-video-muted");if(o)/^data:/.test(o.trim())?r.style.backgroundImage=`url(${o.trim()})`:r.style.backgroundImage=o.split(",").map(p=>{let f=decodeURI(p.trim());return`url(${Os(f)})`}).join(",");else if(c){let p=document.createElement("video");u&&p.setAttribute("loop",""),(m||this.Reveal.isSpeakerNotes())&&(p.muted=!0),ge&&p.setAttribute("playsinline",""),c.split(",").forEach(f=>{let h=document.createElement("source");h.setAttribute("src",f);let k=qs(f);k&&h.setAttribute("type",k),p.appendChild(h)}),r.appendChild(p)}else if(a&&t.excludeIframes!==!0){let p=document.createElement("iframe");p.setAttribute("allowfullscreen",""),p.setAttribute("mozallowfullscreen",""),p.setAttribute("webkitallowfullscreen",""),p.setAttribute("allow","autoplay"),p.setAttribute("data-src",a),p.style.width="100%",p.style.height="100%",p.style.maxHeight="100%",p.style.maxWidth="100%",r.appendChild(p)}}let l=r.querySelector("iframe[data-src]");l&&this.shouldPreload(s)&&!/autoplay=(1|true|yes)/gi.test(a)&&l.getAttribute("src")!==a&&l.setAttribute("src",a)}this.layout(e)}layout(e){Array.from(e.querySelectorAll(".r-fit-text")).forEach(t=>{Fs(t,{minSize:24,maxSize:this.Reveal.getConfig().height*.8,observeMutations:!1,observeWindow:!1})})}unload(e){e.style.display="none";let t=this.Reveal.getSlideBackground(e);t&&(t.style.display="none",S(t,"iframe[src]").forEach(i=>{i.removeAttribute("src")})),S(e,"video[data-lazy-loaded][src], audio[data-lazy-loaded][src], iframe[data-lazy-loaded][src]").forEach(i=>{i.setAttribute("data-src",i.getAttribute("src")),i.removeAttribute("src")}),S(e,"video[data-lazy-loaded] source[src], audio source[src]").forEach(i=>{i.setAttribute("data-src",i.getAttribute("src")),i.removeAttribute("src")})}formatEmbeddedContent(){let e=(t,i,s)=>{S(this.Reveal.getSlidesElement(),"iframe["+t+'*="'+i+'"]').forEach(r=>{let a=r.getAttribute(t);a&&a.indexOf(s)===-1&&r.setAttribute(t,a+(/\?/.test(a)?"&":"?")+s)})};e("src","youtube.com/embed/","enablejsapi=1"),e("data-src","youtube.com/embed/","enablejsapi=1"),e("src","player.vimeo.com/","api=1"),e("data-src","player.vimeo.com/","api=1")}startEmbeddedContent(e){if(e){let t=this.Reveal.isSpeakerNotes();S(e,'img[src$=".gif"]').forEach(i=>{i.setAttribute("src",i.getAttribute("src"))}),S(e,"video, audio").forEach(i=>{if(j(i,".fragment")&&!j(i,".fragment.visible"))return;let s=this.Reveal.getConfig().autoPlayMedia;if(typeof s!="boolean"&&(s=i.hasAttribute("data-autoplay")||!!j(i,".slide-background")),s&&typeof i.play=="function"){if(t&&!i.muted)return;i.readyState>1?this.startEmbeddedMedia({target:i}):ge?(i.addEventListener("canplay",this.ensureMobileMediaPlaying),this.playMediaElement(i)):(i.removeEventListener("loadeddata",this.startEmbeddedMedia),i.addEventListener("loadeddata",this.startEmbeddedMedia))}}),t||(S(e,"iframe[src]").forEach(i=>{j(i,".fragment")&&!j(i,".fragment.visible")||this.startEmbeddedIframe({target:i})}),S(e,"iframe[data-src]").forEach(i=>{j(i,".fragment")&&!j(i,".fragment.visible")||i.getAttribute("src")!==i.getAttribute("data-src")&&(i.removeEventListener("load",this.startEmbeddedIframe),i.addEventListener("load",this.startEmbeddedIframe),i.setAttribute("src",i.getAttribute("data-src")))}))}}ensureMobileMediaPlaying(e){let t=e.target;typeof t.getVideoPlaybackQuality=="function"&&setTimeout(()=>{let i=t.paused===!1,s=t.getVideoPlaybackQuality().totalVideoFrames;i&&s===0&&(t.load(),t.play())},1e3)}startEmbeddedMedia(e){let t=!!j(e.target,"html"),i=!!j(e.target,".present");t&&i&&(e.target.paused||e.target.ended)&&(e.target.currentTime=0,this.playMediaElement(e.target)),e.target.removeEventListener("loadeddata",this.startEmbeddedMedia)}playMediaElement(e){let t=e.play();t&&typeof t.catch=="function"&&t.then(()=>{e.muted||(this.allowedToPlayAudio=!0)}).catch(i=>{if(i.name==="NotAllowedError")if(this.allowedToPlayAudio=!1,e.tagName==="VIDEO"){this.onVideoPlaybackNotAllowed(e);let s=!!j(e,"html"),r=!!j(e,".present"),a=e.muted;s&&r&&!a&&(e.setAttribute("data-muted-by-reveal","true"),e.muted=!0,e.play().catch(()=>{this.onMutedVideoPlaybackNotAllowed(e)}))}else e.tagName==="AUDIO"&&this.onAudioPlaybackNotAllowed(e)})}startEmbeddedIframe(e){let t=e.target;if(this.preventIframeAutoFocus(e),t&&t.contentWindow){let i=!!j(e.target,"html"),s=!!j(e.target,".present");if(i&&s){let r=this.Reveal.getConfig().autoPlayMedia;typeof r!="boolean"&&(r=t.hasAttribute("data-autoplay")||!!j(t,".slide-background")),/youtube\.com\/embed\//.test(t.getAttribute("src"))&&r?t.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}',"*"):/player\.vimeo\.com\//.test(t.getAttribute("src"))&&r?t.contentWindow.postMessage('{"method":"play"}',"*"):t.contentWindow.postMessage("slide:start","*")}}}stopEmbeddedContent(e,t={}){t=Se({unloadIframes:!0},t),e&&e.parentNode&&(S(e,"video, audio").forEach(i=>{!i.hasAttribute("data-ignore")&&typeof i.pause=="function"&&(i.setAttribute("data-paused-by-reveal",""),i.pause(),ge&&i.removeEventListener("canplay",this.ensureMobileMediaPlaying))}),S(e,"iframe").forEach(i=>{i.contentWindow&&i.contentWindow.postMessage("slide:stop","*"),i.removeEventListener("load",this.preventIframeAutoFocus),i.removeEventListener("load",this.startEmbeddedIframe)}),S(e,'iframe[src*="youtube.com/embed/"]').forEach(i=>{!i.hasAttribute("data-ignore")&&i.contentWindow&&typeof i.contentWindow.postMessage=="function"&&i.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}),S(e,'iframe[src*="player.vimeo.com/"]').forEach(i=>{!i.hasAttribute("data-ignore")&&i.contentWindow&&typeof i.contentWindow.postMessage=="function"&&i.contentWindow.postMessage('{"method":"pause"}',"*")}),t.unloadIframes===!0&&S(e,"iframe[data-src]").forEach(i=>{i.setAttribute("src","about:blank"),i.removeAttribute("src")}))}isAllowedToPlayAudio(){return this.allowedToPlayAudio}showPlayOrUnmuteButton(){let e=this.failedAudioPlaybackTargets.size,t=this.failedVideoPlaybackTargets.size,i=this.failedMutedVideoPlaybackTargets.size,s="Play media";i>0?s="Play video":t>0?s="Unmute video":e>0&&(s="Play audio"),this.mediaPlayButton.textContent=s,this.Reveal.getRevealElement().appendChild(this.mediaPlayButton)}onAudioPlaybackNotAllowed(e){this.failedAudioPlaybackTargets.add(e),this.showPlayOrUnmuteButton(e)}onVideoPlaybackNotAllowed(e){this.failedVideoPlaybackTargets.add(e),this.showPlayOrUnmuteButton()}onMutedVideoPlaybackNotAllowed(e){this.failedMutedVideoPlaybackTargets.add(e),this.showPlayOrUnmuteButton()}resetTemporarilyMutedMedia(){new Set([...this.failedAudioPlaybackTargets,...this.failedVideoPlaybackTargets,...this.failedMutedVideoPlaybackTargets]).forEach(e=>{e.hasAttribute("data-muted-by-reveal")&&(e.muted=!1,e.removeAttribute("data-muted-by-reveal"))})}clearMediaPlaybackErrors(){this.resetTemporarilyMutedMedia(),this.failedAudioPlaybackTargets.clear(),this.failedVideoPlaybackTargets.clear(),this.failedMutedVideoPlaybackTargets.clear(),this.mediaPlayButton.remove()}preventIframeAutoFocus(e){let t=e.target;if(t&&this.Reveal.getConfig().preventIframeAutoFocus){let i=0,s=100,r=1e3,a=()=>{document.activeElement===t?document.activeElement.blur():i<r&&(i+=s,setTimeout(a,s))};setTimeout(a,s)}}afterSlideChanged(){this.clearMediaPlaybackErrors()}},me=".slides section",le=".slides>section",ot=".slides>section.present>section",Vs=".backgrounds>.slide-background",Us=/registerPlugin|registerKeyboardShortcut|addKeyBinding|addEventListener|showPreview/,_s="h.v",js="h/v",ut="c",Bi="c/t",pt=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement("div"),this.element.className="slide-number",this.Reveal.getRevealElement().appendChild(this.element)}configure(e,t){let i="none";e.slideNumber&&!this.Reveal.isPrintView()&&(e.showSlideNumber==="all"||e.showSlideNumber==="speaker"&&this.Reveal.isSpeakerNotes())&&(i="block"),this.element.style.display=i}update(){this.Reveal.getConfig().slideNumber&&this.element&&(this.element.innerHTML=this.getSlideNumber())}getSlideNumber(e=this.Reveal.getCurrentSlide()){let t=this.Reveal.getConfig(),i,s=_s;if(typeof t.slideNumber=="function")i=t.slideNumber(e);else{typeof t.slideNumber=="string"&&(s=t.slideNumber),!/c/.test(s)&&this.Reveal.getHorizontalSlides().length===1&&(s=ut);let a=e&&e.dataset.visibility==="uncounted"?0:1;switch(i=[],s){case ut:i.push(this.Reveal.getSlidePastCount(e)+a);break;case Bi:i.push(this.Reveal.getSlidePastCount(e)+a,"/",this.Reveal.getTotalSlides());break;default:let l=this.Reveal.getIndices(e);i.push(l.h+a);let o=s===js?"/":".";this.Reveal.isVerticalSlide(e)&&i.push(o,l.v+1)}}let r="#"+this.Reveal.location.getHash(e);return this.formatNumber(i[0],i[1],i[2],r)}formatNumber(e,t,i,s="#"+this.Reveal.location.getHash()){return typeof i=="number"&&!isNaN(i)?`<a href="${s}">
					<span class="slide-number-a">${e}</span>
					<span class="slide-number-delimiter">${t}</span>
					<span class="slide-number-b">${i}</span>
					</a>`:`<a href="${s}">
					<span class="slide-number-a">${e}</span>
					</a>`}destroy(){this.element.remove()}},gt=class{constructor(e){this.Reveal=e,this.onInput=this.onInput.bind(this),this.onBlur=this.onBlur.bind(this),this.onKeyDown=this.onKeyDown.bind(this)}render(){this.element=document.createElement("div"),this.element.className="jump-to-slide",this.jumpInput=document.createElement("input"),this.jumpInput.type="text",this.jumpInput.className="jump-to-slide-input",this.jumpInput.placeholder="Jump to slide",this.jumpInput.addEventListener("input",this.onInput),this.jumpInput.addEventListener("keydown",this.onKeyDown),this.jumpInput.addEventListener("blur",this.onBlur),this.element.appendChild(this.jumpInput)}show(){this.indicesOnShow=this.Reveal.getIndices(),this.Reveal.getRevealElement().appendChild(this.element),this.jumpInput.focus()}hide(){this.isVisible()&&(this.element.remove(),this.jumpInput.value="",clearTimeout(this.jumpTimeout),delete this.jumpTimeout)}isVisible(){return!!this.element.parentNode}jump(){clearTimeout(this.jumpTimeout),delete this.jumpTimeout;let e=this.jumpInput.value.trim(""),t;if(/^\d+$/.test(e)){let i=this.Reveal.getConfig().slideNumber;if(i===ut||i===Bi){let s=this.Reveal.getSlides()[parseInt(e,10)-1];s&&(t=this.Reveal.getIndices(s))}}return t||(/^\d+\.\d+$/.test(e)&&(e=e.replace(".","/")),t=this.Reveal.location.getIndicesFromHash(e,{oneBasedIndex:!0})),!t&&/\S+/i.test(e)&&e.length>1&&(t=this.search(e)),t&&e!==""?(this.Reveal.slide(t.h,t.v,t.f),!0):(this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),!1)}jumpAfter(e){clearTimeout(this.jumpTimeout),this.jumpTimeout=setTimeout(()=>this.jump(),e)}search(e){let t=new RegExp("\\b"+e.trim()+"\\b","i"),i=this.Reveal.getSlides().find(s=>t.test(s.innerText));return i?this.Reveal.getIndices(i):null}cancel(){this.Reveal.slide(this.indicesOnShow.h,this.indicesOnShow.v,this.indicesOnShow.f),this.hide()}confirm(){this.jump(),this.hide()}destroy(){this.jumpInput.removeEventListener("input",this.onInput),this.jumpInput.removeEventListener("keydown",this.onKeyDown),this.jumpInput.removeEventListener("blur",this.onBlur),this.element.remove()}onKeyDown(e){e.keyCode===13?this.confirm():e.keyCode===27&&(this.cancel(),e.stopImmediatePropagation())}onInput(e){this.jumpAfter(200)}onBlur(){setTimeout(()=>this.hide(),1)}},mt=n=>{let e=n.match(/^#([0-9a-f]{3})$/i);if(e&&e[1]){let r=e[1];return{r:parseInt(r.charAt(0),16)*17,g:parseInt(r.charAt(1),16)*17,b:parseInt(r.charAt(2),16)*17}}let t=n.match(/^#([0-9a-f]{6})$/i);if(t&&t[1]){let r=t[1];return{r:parseInt(r.slice(0,2),16),g:parseInt(r.slice(2,4),16),b:parseInt(r.slice(4,6),16)}}let i=n.match(/^rgb\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);if(i)return{r:parseInt(i[1],10),g:parseInt(i[2],10),b:parseInt(i[3],10)};let s=n.match(/^rgba\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d]+|[\d]*.[\d]+)\s*\)$/i);return s?{r:parseInt(s[1],10),g:parseInt(s[2],10),b:parseInt(s[3],10),a:parseFloat(s[4])}:null},Ws=n=>(typeof n=="string"&&(n=mt(n)),n?(n.r*299+n.g*587+n.b*114)/1e3:null),vt=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement("div"),this.element.className="backgrounds",this.Reveal.getRevealElement().appendChild(this.element)}create(){this.element.innerHTML="",this.element.classList.add("no-transition"),this.Reveal.getHorizontalSlides().forEach(e=>{let t=this.createBackground(e,this.element);S(e,"section").forEach(i=>{this.createBackground(i,t),t.classList.add("stack")})}),this.Reveal.getConfig().parallaxBackgroundImage?(this.element.style.backgroundImage='url("'+this.Reveal.getConfig().parallaxBackgroundImage+'")',this.element.style.backgroundSize=this.Reveal.getConfig().parallaxBackgroundSize,this.element.style.backgroundRepeat=this.Reveal.getConfig().parallaxBackgroundRepeat,this.element.style.backgroundPosition=this.Reveal.getConfig().parallaxBackgroundPosition,setTimeout(()=>{this.Reveal.getRevealElement().classList.add("has-parallax-background")},1)):(this.element.style.backgroundImage="",this.Reveal.getRevealElement().classList.remove("has-parallax-background"))}createBackground(e,t){let i=document.createElement("div");i.className="slide-background "+e.className.replace(/present|past|future/,"");let s=document.createElement("div");return s.className="slide-background-content",i.appendChild(s),t.appendChild(i),e.slideBackgroundElement=i,e.slideBackgroundContentElement=s,this.sync(e),i}sync(e){let t=e.slideBackgroundElement,i=e.slideBackgroundContentElement,s={background:e.getAttribute("data-background"),backgroundSize:e.getAttribute("data-background-size"),backgroundImage:e.getAttribute("data-background-image"),backgroundVideo:e.getAttribute("data-background-video"),backgroundIframe:e.getAttribute("data-background-iframe"),backgroundColor:e.getAttribute("data-background-color"),backgroundGradient:e.getAttribute("data-background-gradient"),backgroundRepeat:e.getAttribute("data-background-repeat"),backgroundPosition:e.getAttribute("data-background-position"),backgroundTransition:e.getAttribute("data-background-transition"),backgroundOpacity:e.getAttribute("data-background-opacity")},r=e.hasAttribute("data-preload");e.classList.remove("has-dark-background"),e.classList.remove("has-light-background"),t.removeAttribute("data-loaded"),t.removeAttribute("data-background-hash"),t.removeAttribute("data-background-size"),t.removeAttribute("data-background-transition"),t.style.backgroundColor="",i.style.backgroundSize="",i.style.backgroundRepeat="",i.style.backgroundPosition="",i.style.backgroundImage="",i.style.opacity="",i.innerHTML="",s.background&&(/^(http|file|\/\/)/gi.test(s.background)||/\.(svg|png|jpg|jpeg|gif|bmp|webp)([?#\s]|$)/gi.test(s.background)?e.setAttribute("data-background-image",s.background):t.style.background=s.background),(s.background||s.backgroundColor||s.backgroundGradient||s.backgroundImage||s.backgroundVideo||s.backgroundIframe)&&t.setAttribute("data-background-hash",s.background+s.backgroundSize+s.backgroundImage+s.backgroundVideo+s.backgroundIframe+s.backgroundColor+s.backgroundGradient+s.backgroundRepeat+s.backgroundPosition+s.backgroundTransition+s.backgroundOpacity),s.backgroundSize&&t.setAttribute("data-background-size",s.backgroundSize),s.backgroundColor&&(t.style.backgroundColor=s.backgroundColor),s.backgroundGradient&&(t.style.backgroundImage=s.backgroundGradient),s.backgroundTransition&&t.setAttribute("data-background-transition",s.backgroundTransition),r&&t.setAttribute("data-preload",""),s.backgroundSize&&(i.style.backgroundSize=s.backgroundSize),s.backgroundRepeat&&(i.style.backgroundRepeat=s.backgroundRepeat),s.backgroundPosition&&(i.style.backgroundPosition=s.backgroundPosition),s.backgroundOpacity&&(i.style.opacity=s.backgroundOpacity);let a=this.getContrastClass(e);typeof a=="string"&&e.classList.add(a)}getContrastClass(e){let t=e.slideBackgroundElement,i=e.getAttribute("data-background-color");if(!i||!mt(i)){let s=window.getComputedStyle(t);s&&s.backgroundColor&&(i=s.backgroundColor)}if(i){let s=mt(i);if(s&&s.a!==0)return Ws(i)<128?"has-dark-background":"has-light-background"}return null}bubbleSlideContrastClassToElement(e,t){["has-light-background","has-dark-background"].forEach(i=>{e.classList.contains(i)?t.classList.add(i):t.classList.remove(i)},this)}update(e=!1){let t=this.Reveal.getConfig(),i=this.Reveal.getCurrentSlide(),s=this.Reveal.getIndices(),r=null,a=t.rtl?"future":"past",l=t.rtl?"past":"future";if(Array.from(this.element.childNodes).forEach((c,u)=>{c.classList.remove("past","present","future"),u<s.h?c.classList.add(a):u>s.h?c.classList.add(l):(c.classList.add("present"),r=c),(e||u===s.h)&&S(c,".slide-background").forEach((m,p)=>{m.classList.remove("past","present","future");let f=typeof s.v=="number"?s.v:0;p<f?m.classList.add("past"):p>f?m.classList.add("future"):(m.classList.add("present"),u===s.h&&(r=m))})}),this.previousBackground&&!this.previousBackground.closest("body")&&(this.previousBackground=null),r&&this.previousBackground){let c=this.previousBackground.getAttribute("data-background-hash"),u=r.getAttribute("data-background-hash");if(u&&u===c&&r!==this.previousBackground){this.element.classList.add("no-transition");let m=r.querySelector("video"),p=this.previousBackground.querySelector("video");if(m&&p){let f=m.parentNode;p.parentNode.appendChild(m),f.appendChild(p)}}}let o=r!==this.previousBackground;if(o&&this.previousBackground&&this.Reveal.slideContent.stopEmbeddedContent(this.previousBackground,{unloadIframes:!this.Reveal.slideContent.shouldPreload(this.previousBackground)}),o&&r){this.Reveal.slideContent.startEmbeddedContent(r);let c=r.querySelector(".slide-background-content");if(c){let u=c.style.backgroundImage||"";/\.gif/i.test(u)&&(c.style.backgroundImage="",window.getComputedStyle(c).opacity,c.style.backgroundImage=u)}this.previousBackground=r}i&&this.bubbleSlideContrastClassToElement(i,this.Reveal.getRevealElement()),setTimeout(()=>{this.element.classList.remove("no-transition")},10)}updateParallax(){let e=this.Reveal.getIndices();if(this.Reveal.getConfig().parallaxBackgroundImage){let t=this.Reveal.getHorizontalSlides(),i=this.Reveal.getVerticalSlides(),s=this.element.style.backgroundSize.split(" "),r,a;s.length===1?r=a=parseInt(s[0],10):(r=parseInt(s[0],10),a=parseInt(s[1],10));let l=this.element.offsetWidth,o=t.length,c,u;typeof this.Reveal.getConfig().parallaxBackgroundHorizontal=="number"?c=this.Reveal.getConfig().parallaxBackgroundHorizontal:c=o>1?(r-l)/(o-1):0,u=c*e.h*-1;let m=this.element.offsetHeight,p=i.length,f,h;typeof this.Reveal.getConfig().parallaxBackgroundVertical=="number"?f=this.Reveal.getConfig().parallaxBackgroundVertical:f=(a-m)/(p-1),h=p>0?f*e.v:0,this.element.style.backgroundPosition=u+"px "+-h+"px"}}destroy(){this.element.remove()}},Ai=0,ft=class{constructor(e){this.Reveal=e}run(e,t){this.reset();let i=this.Reveal.getSlides(),s=i.indexOf(t),r=i.indexOf(e);if(e&&t&&e.hasAttribute("data-auto-animate")&&t.hasAttribute("data-auto-animate")&&e.getAttribute("data-auto-animate-id")===t.getAttribute("data-auto-animate-id")&&!(s>r?t:e).hasAttribute("data-auto-animate-restart")){this.autoAnimateStyleSheet=this.autoAnimateStyleSheet||ct();let a=this.getAutoAnimateOptions(t);e.dataset.autoAnimate="pending",t.dataset.autoAnimate="pending",a.slideDirection=s>r?"forward":"backward";let l=e.style.display==="none";l&&(e.style.display=this.Reveal.getConfig().display);let o=this.getAutoAnimatableElements(e,t).map(c=>this.autoAnimateElements(c.from,c.to,c.options||{},a,Ai++));if(l&&(e.style.display="none"),t.dataset.autoAnimateUnmatched!=="false"&&this.Reveal.getConfig().autoAnimateUnmatched===!0){let c=a.duration*.8,u=a.duration*.2;this.getUnmatchedAutoAnimateElements(t).forEach(m=>{let p=this.getAutoAnimateOptions(m,a),f="unmatched";(p.duration!==a.duration||p.delay!==a.delay)&&(f="unmatched-"+Ai++,o.push(`[data-auto-animate="running"] [data-auto-animate-target="${f}"] { transition: opacity ${p.duration}s ease ${p.delay}s; }`)),m.dataset.autoAnimateTarget=f},this),o.push(`[data-auto-animate="running"] [data-auto-animate-target="unmatched"] { transition: opacity ${c}s ease ${u}s; }`)}this.autoAnimateStyleSheet.innerHTML=o.join(""),requestAnimationFrame(()=>{this.autoAnimateStyleSheet&&(getComputedStyle(this.autoAnimateStyleSheet).fontWeight,t.dataset.autoAnimate="running")}),this.Reveal.dispatchEvent({type:"autoanimate",data:{fromSlide:e,toSlide:t,sheet:this.autoAnimateStyleSheet}})}}reset(){S(this.Reveal.getRevealElement(),'[data-auto-animate]:not([data-auto-animate=""])').forEach(e=>{e.dataset.autoAnimate=""}),S(this.Reveal.getRevealElement(),"[data-auto-animate-target]").forEach(e=>{delete e.dataset.autoAnimateTarget}),this.autoAnimateStyleSheet&&this.autoAnimateStyleSheet.parentNode&&(this.autoAnimateStyleSheet.parentNode.removeChild(this.autoAnimateStyleSheet),this.autoAnimateStyleSheet=null)}autoAnimateElements(e,t,i,s,r){e.dataset.autoAnimateTarget="",t.dataset.autoAnimateTarget=r;let a=this.getAutoAnimateOptions(t,s);typeof i.delay<"u"&&(a.delay=i.delay),typeof i.duration<"u"&&(a.duration=i.duration),typeof i.easing<"u"&&(a.easing=i.easing);let l=this.getAutoAnimatableProperties("from",e,i),o=this.getAutoAnimatableProperties("to",t,i);if(t.classList.contains("fragment")&&delete o.styles.opacity,i.translate!==!1||i.scale!==!1){let m=this.Reveal.getScale(),p={x:(l.x-o.x)/m,y:(l.y-o.y)/m,scaleX:l.width/o.width,scaleY:l.height/o.height};p.x=Math.round(p.x*1e3)/1e3,p.y=Math.round(p.y*1e3)/1e3,p.scaleX=Math.round(p.scaleX*1e3)/1e3,p.scaleX=Math.round(p.scaleX*1e3)/1e3;let f=i.translate!==!1&&(p.x!==0||p.y!==0),h=i.scale!==!1&&(p.scaleX!==0||p.scaleY!==0);if(f||h){let k=[];f&&k.push(`translate(${p.x}px, ${p.y}px)`),h&&k.push(`scale(${p.scaleX}, ${p.scaleY})`),l.styles.transform=k.join(" "),l.styles["transform-origin"]="top left",o.styles.transform="none"}}for(let m in o.styles){let p=o.styles[m],f=l.styles[m];p===f?delete o.styles[m]:(p.explicitValue===!0&&(o.styles[m]=p.value),f.explicitValue===!0&&(l.styles[m]=f.value))}let c="",u=Object.keys(o.styles);if(u.length>0){l.styles.transition="none",o.styles.transition=`all ${a.duration}s ${a.easing} ${a.delay}s`,o.styles["transition-property"]=u.join(", "),o.styles["will-change"]=u.join(", ");let m=Object.keys(l.styles).map(f=>f+": "+l.styles[f]+" !important;").join(""),p=Object.keys(o.styles).map(f=>f+": "+o.styles[f]+" !important;").join("");c='[data-auto-animate-target="'+r+'"] {'+m+'}[data-auto-animate="running"] [data-auto-animate-target="'+r+'"] {'+p+"}"}return c}getAutoAnimateOptions(e,t){let i={easing:this.Reveal.getConfig().autoAnimateEasing,duration:this.Reveal.getConfig().autoAnimateDuration,delay:0};if(i=Se(i,t),e.parentNode){let s=j(e.parentNode,"[data-auto-animate-target]");s&&(i=this.getAutoAnimateOptions(s,i))}return e.dataset.autoAnimateEasing&&(i.easing=e.dataset.autoAnimateEasing),e.dataset.autoAnimateDuration&&(i.duration=parseFloat(e.dataset.autoAnimateDuration)),e.dataset.autoAnimateDelay&&(i.delay=parseFloat(e.dataset.autoAnimateDelay)),i}getAutoAnimatableProperties(e,t,i){let s=this.Reveal.getConfig(),r={styles:[]};if(i.translate!==!1||i.scale!==!1){let l;if(typeof i.measure=="function")l=i.measure(t);else if(s.center)l=t.getBoundingClientRect();else{let o=this.Reveal.getScale();l={x:t.offsetLeft*o,y:t.offsetTop*o,width:t.offsetWidth*o,height:t.offsetHeight*o}}r.x=l.x,r.y=l.y,r.width=l.width,r.height=l.height}let a=getComputedStyle(t);return(i.styles||s.autoAnimateStyles).forEach(l=>{let o;typeof l=="string"&&(l={property:l}),typeof l.from<"u"&&e==="from"?o={value:l.from,explicitValue:!0}:typeof l.to<"u"&&e==="to"?o={value:l.to,explicitValue:!0}:(l.property==="line-height"&&(o=parseFloat(a["line-height"])/parseFloat(a["font-size"])),isNaN(o)&&(o=a[l.property])),o!==""&&(r.styles[l.property]=o)}),r}getAutoAnimatableElements(e,t){let i=(typeof this.Reveal.getConfig().autoAnimateMatcher=="function"?this.Reveal.getConfig().autoAnimateMatcher:this.getAutoAnimatePairs).call(this,e,t),s=[];return i.filter((r,a)=>{if(s.indexOf(r.to)===-1)return s.push(r.to),!0})}getAutoAnimatePairs(e,t){let i=[],s="h1, h2, h3, h4, h5, h6, p, li";return this.findAutoAnimateMatches(i,e,t,"[data-id]",a=>a.nodeName+":::"+a.getAttribute("data-id")),this.findAutoAnimateMatches(i,e,t,s,a=>a.nodeName+":::"+a.textContent.trim()),this.findAutoAnimateMatches(i,e,t,"img, video, iframe",a=>a.nodeName+":::"+(a.getAttribute("src")||a.getAttribute("data-src"))),this.findAutoAnimateMatches(i,e,t,"pre",a=>a.nodeName+":::"+a.textContent.trim()),i.forEach(a=>{Ve(a.from,s)?a.options={scale:!1}:Ve(a.from,"pre")&&(a.options={scale:!1,styles:["width","height"]},this.findAutoAnimateMatches(i,a.from,a.to,".hljs .hljs-ln-code",l=>l.textContent,{scale:!1,styles:[],measure:this.getLocalBoundingBox.bind(this)}),this.findAutoAnimateMatches(i,a.from,a.to,".hljs .hljs-ln-numbers[data-line-number]",l=>l.getAttribute("data-line-number"),{scale:!1,styles:["width"],measure:this.getLocalBoundingBox.bind(this)}))},this),i}getLocalBoundingBox(e){let t=this.Reveal.getScale();return{x:Math.round(e.offsetLeft*t*100)/100,y:Math.round(e.offsetTop*t*100)/100,width:Math.round(e.offsetWidth*t*100)/100,height:Math.round(e.offsetHeight*t*100)/100}}findAutoAnimateMatches(e,t,i,s,r,a){let l={},o={};[].slice.call(t.querySelectorAll(s)).forEach((c,u)=>{let m=r(c);typeof m=="string"&&m.length&&(l[m]=l[m]||[],l[m].push(c))}),[].slice.call(i.querySelectorAll(s)).forEach((c,u)=>{let m=r(c);o[m]=o[m]||[],o[m].push(c);let p;if(l[m]){let f=o[m].length-1,h=l[m].length-1;l[m][f]?(p=l[m][f],l[m][f]=null):l[m][h]&&(p=l[m][h],l[m][h]=null)}p&&e.push({from:p,to:c,options:a})})}getUnmatchedAutoAnimateElements(e){return[].slice.call(e.children).reduce((t,i)=>{let s=i.querySelector("[data-auto-animate-target]");return!i.hasAttribute("data-auto-animate-target")&&!s&&t.push(i),i.querySelector("[data-auto-animate-target]")&&(t=t.concat(this.getUnmatchedAutoAnimateElements(i))),t},[])}},Ks=500,Xs=4,Ys=6,Js=8,yt=class{constructor(e){this.Reveal=e,this.active=!1,this.activatedCallbacks=[],this.onScroll=this.onScroll.bind(this)}activate(){if(this.active)return;let e=this.Reveal.getState();this.active=!0,this.slideHTMLBeforeActivation=this.Reveal.getSlidesElement().innerHTML;let t=S(this.Reveal.getRevealElement(),le),i=S(this.Reveal.getRevealElement(),Vs);this.viewportElement.classList.add("loading-scroll-mode","reveal-scroll");let s,r=window.getComputedStyle(this.viewportElement);r&&r.background&&(s=r.background);let a=[],l=t[0].parentNode,o,c=(u,m,p,f)=>{let h;if(o&&this.Reveal.shouldAutoAnimateBetween(o,u))h=document.createElement("div"),h.className="scroll-page-content scroll-auto-animate-page",h.style.display="none",o.closest(".scroll-page-content").parentNode.appendChild(h);else{let k=document.createElement("div");if(k.className="scroll-page",a.push(k),f&&i.length>m){let F=i[m],O=window.getComputedStyle(F);O&&O.background?k.style.background=O.background:s&&(k.style.background=s)}else s&&(k.style.background=s);let T=document.createElement("div");T.className="scroll-page-sticky",k.appendChild(T),h=document.createElement("div"),h.className="scroll-page-content",T.appendChild(h)}h.appendChild(u),u.classList.remove("past","future"),u.setAttribute("data-index-h",m),u.setAttribute("data-index-v",p),u.slideBackgroundElement&&(u.slideBackgroundElement.remove("past","future"),h.insertBefore(u.slideBackgroundElement,u)),o=u};t.forEach((u,m)=>{this.Reveal.isVerticalStack(u)?u.querySelectorAll("section").forEach((p,f)=>{c(p,m,f,!0)}):c(u,m,0)},this),this.createProgressBar(),S(this.Reveal.getRevealElement(),".stack").forEach(u=>u.remove()),a.forEach(u=>l.appendChild(u)),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.layout(),this.Reveal.setState(e),this.activatedCallbacks.forEach(u=>u()),this.activatedCallbacks=[],this.restoreScrollPosition(),this.viewportElement.classList.remove("loading-scroll-mode"),this.viewportElement.addEventListener("scroll",this.onScroll,{passive:!0})}deactivate(){if(!this.active)return;let e=this.Reveal.getState();this.active=!1,this.viewportElement.removeEventListener("scroll",this.onScroll),this.viewportElement.classList.remove("reveal-scroll"),this.removeProgressBar(),this.Reveal.getSlidesElement().innerHTML=this.slideHTMLBeforeActivation,this.Reveal.sync(),this.Reveal.setState(e),this.slideHTMLBeforeActivation=null}toggle(e){typeof e=="boolean"?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}createProgressBar(){this.progressBar=document.createElement("div"),this.progressBar.className="scrollbar",this.progressBarInner=document.createElement("div"),this.progressBarInner.className="scrollbar-inner",this.progressBar.appendChild(this.progressBarInner),this.progressBarPlayhead=document.createElement("div"),this.progressBarPlayhead.className="scrollbar-playhead",this.progressBarInner.appendChild(this.progressBarPlayhead),this.viewportElement.insertBefore(this.progressBar,this.viewportElement.firstChild);let e=s=>{let r=(s.clientY-this.progressBarInner.getBoundingClientRect().top)/this.progressBarHeight;r=Math.max(Math.min(r,1),0),this.viewportElement.scrollTop=r*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight)},t=s=>{this.draggingProgressBar=!1,this.showProgressBar(),document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",t)},i=s=>{s.preventDefault(),this.draggingProgressBar=!0,document.addEventListener("mousemove",e),document.addEventListener("mouseup",t),e(s)};this.progressBarInner.addEventListener("mousedown",i)}removeProgressBar(){this.progressBar&&(this.progressBar.remove(),this.progressBar=null)}layout(){this.isActive()&&(this.syncPages(),this.syncScrollPosition())}syncPages(){let e=this.Reveal.getConfig(),t=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),i=this.Reveal.getScale(),s=e.scrollLayout==="compact",r=this.viewportElement.offsetHeight,a=t.height*i,l=s?a:r;this.scrollTriggerHeight=s?a:r,this.viewportElement.style.setProperty("--page-height",l+"px"),this.viewportElement.style.scrollSnapType=typeof e.scrollSnap=="string"?`y ${e.scrollSnap}`:"",this.slideTriggers=[];let o=Array.from(this.Reveal.getRevealElement().querySelectorAll(".scroll-page"));this.pages=o.map(c=>{let u=this.createPage({pageElement:c,slideElement:c.querySelector("section"),stickyElement:c.querySelector(".scroll-page-sticky"),contentElement:c.querySelector(".scroll-page-content"),backgroundElement:c.querySelector(".slide-background"),autoAnimateElements:c.querySelectorAll(".scroll-auto-animate-page"),autoAnimatePages:[]});u.pageElement.style.setProperty("--slide-height",e.center===!0?"auto":t.height+"px"),this.slideTriggers.push({page:u,activate:()=>this.activatePage(u),deactivate:()=>this.deactivatePage(u)}),this.createFragmentTriggersForPage(u),u.autoAnimateElements.length>0&&this.createAutoAnimateTriggersForPage(u);let m=Math.max(u.scrollTriggers.length-1,0);m+=u.autoAnimatePages.reduce((p,f)=>p+Math.max(f.scrollTriggers.length-1,0),u.autoAnimatePages.length),u.pageElement.querySelectorAll(".scroll-snap-point").forEach(p=>p.remove());for(let p=0;p<m+1;p++){let f=document.createElement("div");f.className="scroll-snap-point",f.style.height=this.scrollTriggerHeight+"px",f.style.scrollSnapAlign=s?"center":"start",u.pageElement.appendChild(f),p===0&&(f.style.marginTop=-this.scrollTriggerHeight+"px")}return s&&u.scrollTriggers.length>0?(u.pageHeight=r,u.pageElement.style.setProperty("--page-height",r+"px")):(u.pageHeight=l,u.pageElement.style.removeProperty("--page-height")),u.scrollPadding=this.scrollTriggerHeight*m,u.totalHeight=u.pageHeight+u.scrollPadding,u.pageElement.style.setProperty("--page-scroll-padding",u.scrollPadding+"px"),m>0?(u.stickyElement.style.position="sticky",u.stickyElement.style.top=Math.max((r-u.pageHeight)/2,0)+"px"):(u.stickyElement.style.position="relative",u.pageElement.style.scrollSnapAlign=u.pageHeight<r?"center":"start"),u}),this.setTriggerRanges(),this.viewportElement.setAttribute("data-scrollbar",e.scrollProgress),e.scrollProgress&&this.totalScrollTriggerCount>1?(this.progressBar||this.createProgressBar(),this.syncProgressBar()):this.removeProgressBar()}setTriggerRanges(){this.totalScrollTriggerCount=this.slideTriggers.reduce((t,i)=>t+Math.max(i.page.scrollTriggers.length,1),0);let e=0;this.slideTriggers.forEach((t,i)=>{t.range=[e,e+Math.max(t.page.scrollTriggers.length,1)/this.totalScrollTriggerCount];let s=(t.range[1]-t.range[0])/t.page.scrollTriggers.length;t.page.scrollTriggers.forEach((r,a)=>{r.range=[e+a*s,e+(a+1)*s]}),e=t.range[1]}),this.slideTriggers[this.slideTriggers.length-1].range[1]=1}createFragmentTriggersForPage(e,t){t=t||e.slideElement;let i=this.Reveal.fragments.sort(t.querySelectorAll(".fragment"),!0);return i.length&&(e.fragments=this.Reveal.fragments.sort(t.querySelectorAll(".fragment:not(.disabled)")),e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(-1,e.fragments,t)}}),i.forEach((s,r)=>{e.scrollTriggers.push({activate:()=>{this.Reveal.fragments.update(r,e.fragments,t)}})})),e.scrollTriggers.length}createAutoAnimateTriggersForPage(e){e.autoAnimateElements.length>0&&this.slideTriggers.push(...Array.from(e.autoAnimateElements).map((t,i)=>{let s=this.createPage({slideElement:t.querySelector("section"),contentElement:t,backgroundElement:t.querySelector(".slide-background")});return this.createFragmentTriggersForPage(s,s.slideElement),e.autoAnimatePages.push(s),{page:s,activate:()=>this.activatePage(s),deactivate:()=>this.deactivatePage(s)}}))}createPage(e){return e.scrollTriggers=[],e.indexh=parseInt(e.slideElement.getAttribute("data-index-h"),10),e.indexv=parseInt(e.slideElement.getAttribute("data-index-v"),10),e}syncProgressBar(){this.progressBarInner.querySelectorAll(".scrollbar-slide").forEach(a=>a.remove());let e=this.viewportElement.scrollHeight,t=this.viewportElement.offsetHeight,i=t/e;this.progressBarHeight=this.progressBarInner.offsetHeight,this.playheadHeight=Math.max(i*this.progressBarHeight,Js),this.progressBarScrollableHeight=this.progressBarHeight-this.playheadHeight;let s=t/e*this.progressBarHeight,r=Math.min(s/8,Xs);this.progressBarPlayhead.style.height=this.playheadHeight-r+"px",s>Ys?this.slideTriggers.forEach(a=>{let{page:l}=a;l.progressBarSlide=document.createElement("div"),l.progressBarSlide.className="scrollbar-slide",l.progressBarSlide.style.top=a.range[0]*this.progressBarHeight+"px",l.progressBarSlide.style.height=(a.range[1]-a.range[0])*this.progressBarHeight-r+"px",l.progressBarSlide.classList.toggle("has-triggers",l.scrollTriggers.length>0),this.progressBarInner.appendChild(l.progressBarSlide),l.scrollTriggerElements=l.scrollTriggers.map((o,c)=>{let u=document.createElement("div");return u.className="scrollbar-trigger",u.style.top=(o.range[0]-a.range[0])*this.progressBarHeight+"px",u.style.height=(o.range[1]-o.range[0])*this.progressBarHeight-r+"px",l.progressBarSlide.appendChild(u),c===0&&(u.style.display="none"),u})}):this.pages.forEach(a=>a.progressBarSlide=null)}syncScrollPosition(){let e=this.viewportElement.offsetHeight,t=e/this.viewportElement.scrollHeight,i=this.viewportElement.scrollTop,s=this.viewportElement.scrollHeight-e,r=Math.max(Math.min(i/s,1),0),a=Math.max(Math.min((i+e/2)/this.viewportElement.scrollHeight,1),0),l;this.slideTriggers.forEach(o=>{let{page:c}=o;r>=o.range[0]-t*2&&r<=o.range[1]+t*2&&!c.loaded?(c.loaded=!0,this.Reveal.slideContent.load(c.slideElement)):c.loaded&&(c.loaded=!1,this.Reveal.slideContent.unload(c.slideElement)),r>=o.range[0]&&r<=o.range[1]?(this.activateTrigger(o),l=o.page):o.active&&this.deactivateTrigger(o)}),l&&l.scrollTriggers.forEach(o=>{a>=o.range[0]&&a<=o.range[1]?this.activateTrigger(o):o.active&&this.deactivateTrigger(o)}),this.setProgressBarValue(i/(this.viewportElement.scrollHeight-e))}setProgressBarValue(e){this.progressBar&&(this.progressBarPlayhead.style.transform=`translateY(${e*this.progressBarScrollableHeight}px)`,this.getAllPages().filter(t=>t.progressBarSlide).forEach(t=>{t.progressBarSlide.classList.toggle("active",t.active===!0),t.scrollTriggers.forEach((i,s)=>{t.scrollTriggerElements[s].classList.toggle("active",t.active===!0&&i.active===!0)})}),this.showProgressBar())}showProgressBar(){this.progressBar.classList.add("visible"),clearTimeout(this.hideProgressBarTimeout),this.Reveal.getConfig().scrollProgress==="auto"&&!this.draggingProgressBar&&(this.hideProgressBarTimeout=setTimeout(()=>{this.progressBar&&this.progressBar.classList.remove("visible")},Ks))}prev(){this.viewportElement.scrollTop-=this.scrollTriggerHeight}next(){this.viewportElement.scrollTop+=this.scrollTriggerHeight}scrollToSlide(e){if(!this.active)this.activatedCallbacks.push(()=>this.scrollToSlide(e));else{let t=this.getScrollTriggerBySlide(e);t&&(this.viewportElement.scrollTop=t.range[0]*(this.viewportElement.scrollHeight-this.viewportElement.offsetHeight))}}storeScrollPosition(){clearTimeout(this.storeScrollPositionTimeout),this.storeScrollPositionTimeout=setTimeout(()=>{sessionStorage.setItem("reveal-scroll-top",this.viewportElement.scrollTop),sessionStorage.setItem("reveal-scroll-origin",location.origin+location.pathname),this.storeScrollPositionTimeout=null},50)}restoreScrollPosition(){let e=sessionStorage.getItem("reveal-scroll-top"),t=sessionStorage.getItem("reveal-scroll-origin");e&&t===location.origin+location.pathname&&(this.viewportElement.scrollTop=parseInt(e,10))}activatePage(e){if(!e.active){e.active=!0;let{slideElement:t,backgroundElement:i,contentElement:s,indexh:r,indexv:a}=e;s.style.display="block",t.classList.add("present"),i&&i.classList.add("present"),this.Reveal.setCurrentScrollPage(t,r,a),this.Reveal.backgrounds.bubbleSlideContrastClassToElement(t,this.viewportElement),Array.from(s.parentNode.querySelectorAll(".scroll-page-content")).forEach(l=>{l!==s&&(l.style.display="none")})}}deactivatePage(e){e.active&&(e.active=!1,e.slideElement&&e.slideElement.classList.remove("present"),e.backgroundElement&&e.backgroundElement.classList.remove("present"))}activateTrigger(e){e.active||(e.active=!0,e.activate())}deactivateTrigger(e){e.active&&(e.active=!1,e.deactivate&&e.deactivate())}getSlideByIndices(e,t){let i=this.getAllPages().find(s=>s.indexh===e&&s.indexv===t);return i?i.slideElement:null}getScrollTriggerBySlide(e){return this.slideTriggers.find(t=>t.page.slideElement===e)}getAllPages(){return this.pages.flatMap(e=>[e,...e.autoAnimatePages||[]])}onScroll(){this.syncScrollPosition(),this.storeScrollPosition()}get viewportElement(){return this.Reveal.getViewportElement()}},bt=class{constructor(e){this.Reveal=e}activate(){return zs(this,null,function*(){let e=this.Reveal.getConfig(),t=S(this.Reveal.getRevealElement(),me),i=e.slideNumber&&/all|print/i.test(e.showSlideNumber),s=this.Reveal.getComputedSlideSize(window.innerWidth,window.innerHeight),r=Math.floor(s.width*(1+e.margin)),a=Math.floor(s.height*(1+e.margin)),l=s.width,o=s.height;yield new Promise(requestAnimationFrame),ct("@page{size:"+r+"px "+a+"px; margin: 0px;}"),ct(".reveal section>img, .reveal section>video, .reveal section>iframe{max-width: "+l+"px; max-height:"+o+"px}"),document.documentElement.classList.add("reveal-print","print-pdf"),document.body.style.width=r+"px",document.body.style.height=a+"px";let c=this.Reveal.getViewportElement(),u;if(c){let k=window.getComputedStyle(c);k&&k.background&&(u=k.background)}yield new Promise(requestAnimationFrame),this.Reveal.layoutSlideContents(l,o),yield new Promise(requestAnimationFrame);let m=t.map(k=>k.scrollHeight),p=[],f=t[0].parentNode,h=1;t.forEach(function(k,T){if(k.classList.contains("stack")===!1){let F=(r-l)/2,O=(a-o)/2,J=m[T],V=Math.max(Math.ceil(J/a),1);V=Math.min(V,e.pdfMaxPagesPerSlide),(V===1&&e.center||k.classList.contains("center"))&&(O=Math.max((a-J)/2,0));let x=document.createElement("div");if(p.push(x),x.className="pdf-page",x.style.height=(a+e.pdfPageHeightOffset)*V+"px",u&&(x.style.background=u),x.appendChild(k),k.style.left=F+"px",k.style.top=O+"px",k.style.width=l+"px",this.Reveal.slideContent.layout(k),k.slideBackgroundElement&&x.insertBefore(k.slideBackgroundElement,k),e.showNotes){let M=this.Reveal.getSlideNotes(k);if(M){let A=typeof e.showNotes=="string"?e.showNotes:"inline",P=document.createElement("div");P.classList.add("speaker-notes"),P.classList.add("speaker-notes-pdf"),P.setAttribute("data-layout",A),P.innerHTML=M,A==="separate-page"?p.push(P):(P.style.left="8px",P.style.bottom="8px",P.style.width=r-16+"px",x.appendChild(P))}}if(i){let M=document.createElement("div");M.classList.add("slide-number"),M.classList.add("slide-number-pdf"),M.innerHTML=h++,x.appendChild(M)}if(e.pdfSeparateFragments){let M=this.Reveal.fragments.sort(x.querySelectorAll(".fragment"),!0),A;M.forEach(function(P,$){A&&A.forEach(function(D){D.classList.remove("current-fragment")}),P.forEach(function(D){D.classList.add("visible","current-fragment")},this);let E=x.cloneNode(!0);if(i){let D=E.querySelector(".slide-number-pdf"),L=$+1;D.innerHTML+="."+L}p.push(E),A=P},this),M.forEach(function(P){P.forEach(function($){$.classList.remove("visible","current-fragment")})})}else S(x,".fragment:not(.fade-out)").forEach(function(M){M.classList.add("visible")})}},this),yield new Promise(requestAnimationFrame),p.forEach(k=>f.appendChild(k)),this.Reveal.slideContent.layout(this.Reveal.getSlidesElement()),this.Reveal.dispatchEvent({type:"pdf-ready"}),c.classList.remove("loading-scroll-mode")})}isActive(){return this.Reveal.getConfig().view==="print"}},wt=class{constructor(e){this.Reveal=e}configure(e,t){e.fragments===!1?this.disable():t.fragments===!1&&this.enable()}disable(){S(this.Reveal.getSlidesElement(),".fragment").forEach(e=>{e.classList.add("visible"),e.classList.remove("current-fragment")})}enable(){S(this.Reveal.getSlidesElement(),".fragment").forEach(e=>{e.classList.remove("visible"),e.classList.remove("current-fragment")})}availableRoutes(){let e=this.Reveal.getCurrentSlide();if(e&&this.Reveal.getConfig().fragments){let t=e.querySelectorAll(".fragment:not(.disabled)"),i=e.querySelectorAll(".fragment:not(.disabled):not(.visible)");return{prev:t.length-i.length>0,next:!!i.length}}else return{prev:!1,next:!1}}sort(e,t=!1){e=Array.from(e);let i=[],s=[],r=[];e.forEach(l=>{if(l.hasAttribute("data-fragment-index")){let o=parseInt(l.getAttribute("data-fragment-index"),10);i[o]||(i[o]=[]),i[o].push(l)}else s.push([l])}),i=i.concat(s);let a=0;return i.forEach(l=>{l.forEach(o=>{r.push(o),o.setAttribute("data-fragment-index",a)}),a++}),t===!0?i:r}sortAll(){this.Reveal.getHorizontalSlides().forEach(e=>{let t=S(e,"section");t.forEach((i,s)=>{this.sort(i.querySelectorAll(".fragment"))},this),t.length===0&&this.sort(e.querySelectorAll(".fragment"))})}update(e,t,i=this.Reveal.getCurrentSlide()){let s={shown:[],hidden:[]};if(i&&this.Reveal.getConfig().fragments&&(t=t||this.sort(i.querySelectorAll(".fragment")),t.length)){let r=0;if(typeof e!="number"){let a=this.sort(i.querySelectorAll(".fragment.visible")).pop();a&&(e=parseInt(a.getAttribute("data-fragment-index")||0,10))}Array.from(t).forEach((a,l)=>{if(a.hasAttribute("data-fragment-index")&&(l=parseInt(a.getAttribute("data-fragment-index"),10)),r=Math.max(r,l),l<=e){let o=a.classList.contains("visible");a.classList.add("visible"),a.classList.remove("current-fragment"),l===e&&(this.Reveal.announceStatus(this.Reveal.getStatusText(a)),a.classList.add("current-fragment"),this.Reveal.slideContent.startEmbeddedContent(a)),o||(s.shown.push(a),this.Reveal.dispatchEvent({target:a,type:"visible",bubbles:!1}))}else{let o=a.classList.contains("visible");a.classList.remove("visible"),a.classList.remove("current-fragment"),o&&(this.Reveal.slideContent.stopEmbeddedContent(a),s.hidden.push(a),this.Reveal.dispatchEvent({target:a,type:"hidden",bubbles:!1}))}}),e=typeof e=="number"?e:-1,e=Math.max(Math.min(e,r),-1),i.setAttribute("data-fragment",e)}return s.hidden.length&&this.Reveal.dispatchEvent({type:"fragmenthidden",data:{fragment:s.hidden[0],fragments:s.hidden}}),s.shown.length&&this.Reveal.dispatchEvent({type:"fragmentshown",data:{fragment:s.shown[0],fragments:s.shown}}),s}sync(e=this.Reveal.getCurrentSlide()){return this.sort(e.querySelectorAll(".fragment"))}goto(e,t=0){let i=this.Reveal.getCurrentSlide();if(i&&this.Reveal.getConfig().fragments){let s=this.sort(i.querySelectorAll(".fragment:not(.disabled)"));if(s.length){if(typeof e!="number"){let a=this.sort(i.querySelectorAll(".fragment:not(.disabled).visible")).pop();a?e=parseInt(a.getAttribute("data-fragment-index")||0,10):e=-1}e+=t;let r=this.update(e,s);return this.Reveal.controls.update(),this.Reveal.progress.update(),this.Reveal.getConfig().fragmentInURL&&this.Reveal.location.writeURL(),!!(r.shown.length||r.hidden.length)}}return!1}next(){return this.goto(null,1)}prev(){return this.goto(null,-1)}},kt=class{constructor(e){this.Reveal=e,this.active=!1,this.onSlideClicked=this.onSlideClicked.bind(this)}activate(){if(this.Reveal.getConfig().overview&&!this.Reveal.isScrollView()&&!this.isActive()){this.active=!0,this.Reveal.getRevealElement().classList.add("overview"),this.Reveal.cancelAutoSlide(),this.Reveal.getSlidesElement().appendChild(this.Reveal.getBackgroundsElement()),S(this.Reveal.getRevealElement(),me).forEach(s=>{s.classList.contains("stack")||s.addEventListener("click",this.onSlideClicked,!0)});let e=70,t=this.Reveal.getComputedSlideSize();this.overviewSlideWidth=t.width+e,this.overviewSlideHeight=t.height+e,this.Reveal.getConfig().rtl&&(this.overviewSlideWidth=-this.overviewSlideWidth),this.Reveal.updateSlidesVisibility(),this.layout(),this.update(),this.Reveal.layout();let i=this.Reveal.getIndices();this.Reveal.dispatchEvent({type:"overviewshown",data:{indexh:i.h,indexv:i.v,currentSlide:this.Reveal.getCurrentSlide()}})}}layout(){this.Reveal.getHorizontalSlides().forEach((e,t)=>{e.setAttribute("data-index-h",t),ue(e,"translate3d("+t*this.overviewSlideWidth+"px, 0, 0)"),e.classList.contains("stack")&&S(e,"section").forEach((i,s)=>{i.setAttribute("data-index-h",t),i.setAttribute("data-index-v",s),ue(i,"translate3d(0, "+s*this.overviewSlideHeight+"px, 0)")})}),Array.from(this.Reveal.getBackgroundsElement().childNodes).forEach((e,t)=>{ue(e,"translate3d("+t*this.overviewSlideWidth+"px, 0, 0)"),S(e,".slide-background").forEach((i,s)=>{ue(i,"translate3d(0, "+s*this.overviewSlideHeight+"px, 0)")})})}update(){let e=Math.min(window.innerWidth,window.innerHeight),t=Math.max(e/5,150)/e,i=this.Reveal.getIndices();this.Reveal.transformSlides({overview:["scale("+t+")","translateX("+-i.h*this.overviewSlideWidth+"px)","translateY("+-i.v*this.overviewSlideHeight+"px)"].join(" ")})}deactivate(){if(this.Reveal.getConfig().overview){this.active=!1,this.Reveal.getRevealElement().classList.remove("overview"),this.Reveal.getRevealElement().classList.add("overview-deactivating"),setTimeout(()=>{this.Reveal.getRevealElement().classList.remove("overview-deactivating")},1),this.Reveal.getRevealElement().appendChild(this.Reveal.getBackgroundsElement()),S(this.Reveal.getRevealElement(),me).forEach(t=>{ue(t,""),t.removeEventListener("click",this.onSlideClicked,!0)}),S(this.Reveal.getBackgroundsElement(),".slide-background").forEach(t=>{ue(t,"")}),this.Reveal.transformSlides({overview:""});let e=this.Reveal.getIndices();this.Reveal.slide(e.h,e.v),this.Reveal.layout(),this.Reveal.cueAutoSlide(),this.Reveal.dispatchEvent({type:"overviewhidden",data:{indexh:e.h,indexv:e.v,currentSlide:this.Reveal.getCurrentSlide()}})}}toggle(e){typeof e=="boolean"?e?this.activate():this.deactivate():this.isActive()?this.deactivate():this.activate()}isActive(){return this.active}onSlideClicked(e){if(this.isActive()){e.preventDefault();let t=e.target;for(;t&&!t.nodeName.match(/section/gi);)t=t.parentNode;if(t&&!t.classList.contains("disabled")&&(this.deactivate(),t.nodeName.match(/section/gi))){let i=parseInt(t.getAttribute("data-index-h"),10),s=parseInt(t.getAttribute("data-index-v"),10);this.Reveal.slide(i,s)}}}},St=class{constructor(e){this.Reveal=e,this.shortcuts={},this.bindings={},this.onDocumentKeyDown=this.onDocumentKeyDown.bind(this)}configure(e,t){e.navigationMode==="linear"?(this.shortcuts["&#8594;  ,  &#8595;  ,  SPACE  ,  N  ,  L  ,  J"]="Next slide",this.shortcuts["&#8592;  ,  &#8593;  ,  P  ,  H  ,  K"]="Previous slide"):(this.shortcuts["N  ,  SPACE"]="Next slide",this.shortcuts["P  ,  Shift SPACE"]="Previous slide",this.shortcuts["&#8592;  ,  H"]="Navigate left",this.shortcuts["&#8594;  ,  L"]="Navigate right",this.shortcuts["&#8593;  ,  K"]="Navigate up",this.shortcuts["&#8595;  ,  J"]="Navigate down"),this.shortcuts["Alt + &#8592;/&#8593/&#8594;/&#8595;"]="Navigate without fragments",this.shortcuts["Shift + &#8592;/&#8593/&#8594;/&#8595;"]="Jump to first/last slide",this.shortcuts["B  ,  ."]="Pause",this.shortcuts.F="Fullscreen",this.shortcuts.G="Jump to slide",this.shortcuts["ESC, O"]="Slide overview"}bind(){document.addEventListener("keydown",this.onDocumentKeyDown,!1)}unbind(){document.removeEventListener("keydown",this.onDocumentKeyDown,!1)}addKeyBinding(e,t){typeof e=="object"&&e.keyCode?this.bindings[e.keyCode]={callback:t,key:e.key,description:e.description}:this.bindings[e]={callback:t,key:null,description:null}}removeKeyBinding(e){delete this.bindings[e]}triggerKey(e){this.onDocumentKeyDown({keyCode:e})}registerKeyboardShortcut(e,t){this.shortcuts[e]=t}getShortcuts(){return this.shortcuts}getBindings(){return this.bindings}onDocumentKeyDown(e){let t=this.Reveal.getConfig();if(typeof t.keyboardCondition=="function"&&t.keyboardCondition(e)===!1||t.keyboardCondition==="focused"&&!this.Reveal.isFocused())return!0;let i=e.keyCode,s=!this.Reveal.isAutoSliding();this.Reveal.onUserInput(e);let r=document.activeElement&&document.activeElement.isContentEditable===!0,a=document.activeElement&&document.activeElement.tagName&&/input|textarea/i.test(document.activeElement.tagName),l=document.activeElement&&document.activeElement.className&&/speaker-notes/i.test(document.activeElement.className),o=!([32,37,38,39,40,63,78,80,191].indexOf(e.keyCode)!==-1&&e.shiftKey||e.altKey)&&(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey);if(r||a||l||o)return;let c=[66,86,190,191,112],u;if(typeof t.keyboard=="object")for(u in t.keyboard)t.keyboard[u]==="togglePause"&&c.push(parseInt(u,10));if(this.Reveal.isOverlayOpen()&&!["Escape","f","c","b","."].includes(e.key)||this.Reveal.isPaused()&&c.indexOf(i)===-1)return!1;let m=t.navigationMode==="linear"||!this.Reveal.hasHorizontalSlides()||!this.Reveal.hasVerticalSlides(),p=!1;if(typeof t.keyboard=="object"){for(u in t.keyboard)if(parseInt(u,10)===i){let f=t.keyboard[u];typeof f=="function"?f.apply(null,[e]):typeof f=="string"&&typeof this.Reveal[f]=="function"&&this.Reveal[f].call(),p=!0}}if(p===!1){for(u in this.bindings)if(parseInt(u,10)===i){let f=this.bindings[u].callback;typeof f=="function"?f.apply(null,[e]):typeof f=="string"&&typeof this.Reveal[f]=="function"&&this.Reveal[f].call(),p=!0}}p===!1&&(p=!0,i===80||i===33?this.Reveal.prev({skipFragments:e.altKey}):i===78||i===34?this.Reveal.next({skipFragments:e.altKey}):i===72||i===37?e.shiftKey?this.Reveal.slide(0):!this.Reveal.overview.isActive()&&m?t.rtl?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.left({skipFragments:e.altKey}):i===76||i===39?e.shiftKey?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):!this.Reveal.overview.isActive()&&m?t.rtl?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey}):this.Reveal.right({skipFragments:e.altKey}):i===75||i===38?e.shiftKey?this.Reveal.slide(void 0,0):!this.Reveal.overview.isActive()&&m?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.up({skipFragments:e.altKey}):i===74||i===40?e.shiftKey?this.Reveal.slide(void 0,Number.MAX_VALUE):!this.Reveal.overview.isActive()&&m?this.Reveal.next({skipFragments:e.altKey}):this.Reveal.down({skipFragments:e.altKey}):i===36?this.Reveal.slide(0):i===35?this.Reveal.slide(this.Reveal.getHorizontalSlides().length-1):i===32?(this.Reveal.overview.isActive()&&this.Reveal.overview.deactivate(),e.shiftKey?this.Reveal.prev({skipFragments:e.altKey}):this.Reveal.next({skipFragments:e.altKey})):[58,59,66,86,190].includes(i)||i===191&&!e.shiftKey?this.Reveal.togglePause():i===70?Ii(t.embedded?this.Reveal.getViewportElement():document.documentElement):i===65?t.autoSlideStoppable&&this.Reveal.toggleAutoSlide(s):i===71?t.jumpToSlide&&this.Reveal.toggleJumpToSlide():i===67&&this.Reveal.isOverlayOpen()?this.Reveal.closeOverlay():(i===63||i===191)&&e.shiftKey?this.Reveal.toggleHelp():i===112?this.Reveal.toggleHelp():p=!1),p?e.preventDefault&&e.preventDefault():i===27||i===79?(this.Reveal.closeOverlay()===!1&&this.Reveal.overview.toggle(),e.preventDefault&&e.preventDefault()):i===13&&this.Reveal.overview.isActive()&&(this.Reveal.overview.deactivate(),e.preventDefault&&e.preventDefault()),this.Reveal.cueAutoSlide()}},xt=class{constructor(e){Ci(this,"MAX_REPLACE_STATE_FREQUENCY",300),this.Reveal=e,this.writeURLTimeout=0,this.replaceStateTimestamp=0,this.onWindowHashChange=this.onWindowHashChange.bind(this)}bind(){window.addEventListener("hashchange",this.onWindowHashChange,!1)}unbind(){window.removeEventListener("hashchange",this.onWindowHashChange,!1)}getIndicesFromHash(e=window.location.hash,t={}){let i=e.replace(/^#\/?/,""),s=i.split("/");if(!/^[0-9]*$/.test(s[0])&&i.length){let r,a;/\/[-\d]+$/g.test(i)&&(a=parseInt(i.split("/").pop(),10),a=isNaN(a)?void 0:a,i=i.split("/").shift());try{let l=decodeURIComponent(i);r=(document.getElementById(l)||document.querySelector(`[data-id="${l}"]`)).closest(".slides section")}catch{}if(r)return Pi(oe({},this.Reveal.getIndices(r)),{f:a})}else{let r=this.Reveal.getConfig(),a=r.hashOneBasedIndex||t.oneBasedIndex?1:0,l=parseInt(s[0],10)-a||0,o=parseInt(s[1],10)-a||0,c;return r.fragmentInURL&&(c=parseInt(s[2],10),isNaN(c)&&(c=void 0)),{h:l,v:o,f:c}}return null}readURL(){let e=this.Reveal.getIndices(),t=this.getIndicesFromHash();t?(t.h!==e.h||t.v!==e.v||t.f!==void 0)&&this.Reveal.slide(t.h,t.v,t.f):this.Reveal.slide(e.h||0,e.v||0)}writeURL(e){let t=this.Reveal.getConfig(),i=this.Reveal.getCurrentSlide();if(clearTimeout(this.writeURLTimeout),typeof e=="number")this.writeURLTimeout=setTimeout(this.writeURL,e);else if(i){let s=this.getHash();t.history?window.location.hash=s:t.hash&&(s==="/"?this.debouncedReplaceState(window.location.pathname+window.location.search):this.debouncedReplaceState("#"+s))}}replaceState(e){window.history.replaceState(null,null,e),this.replaceStateTimestamp=Date.now()}debouncedReplaceState(e){clearTimeout(this.replaceStateTimeout),Date.now()-this.replaceStateTimestamp>this.MAX_REPLACE_STATE_FREQUENCY?this.replaceState(e):this.replaceStateTimeout=setTimeout(()=>this.replaceState(e),this.MAX_REPLACE_STATE_FREQUENCY)}getHash(e){let t="/",i=e||this.Reveal.getCurrentSlide(),s=i?i.getAttribute("id"):null;s&&(s=encodeURIComponent(s));let r=this.Reveal.getIndices(e);if(this.Reveal.getConfig().fragmentInURL||(r.f=void 0),typeof s=="string"&&s.length)t="/"+s,r.f>=0&&(t+="/"+r.f);else{let a=this.Reveal.getConfig().hashOneBasedIndex?1:0;(r.h>0||r.v>0||r.f>=0)&&(t+=r.h+a),(r.v>0||r.f>=0)&&(t+="/"+(r.v+a)),r.f>=0&&(t+="/"+r.f)}return t}onWindowHashChange(e){this.readURL()}},Et=class{constructor(e){this.Reveal=e,this.onNavigateLeftClicked=this.onNavigateLeftClicked.bind(this),this.onNavigateRightClicked=this.onNavigateRightClicked.bind(this),this.onNavigateUpClicked=this.onNavigateUpClicked.bind(this),this.onNavigateDownClicked=this.onNavigateDownClicked.bind(this),this.onNavigatePrevClicked=this.onNavigatePrevClicked.bind(this),this.onNavigateNextClicked=this.onNavigateNextClicked.bind(this),this.onEnterFullscreen=this.onEnterFullscreen.bind(this)}render(){let e=this.Reveal.getConfig().rtl,t=this.Reveal.getRevealElement();this.element=document.createElement("aside"),this.element.className="controls",this.element.innerHTML=`<button class="navigate-left" aria-label="${e?"next slide":"previous slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-right" aria-label="${e?"previous slide":"next slide"}"><div class="controls-arrow"></div></button>
			<button class="navigate-up" aria-label="above slide"><div class="controls-arrow"></div></button>
			<button class="navigate-down" aria-label="below slide"><div class="controls-arrow"></div></button>`,this.Reveal.getRevealElement().appendChild(this.element),this.controlsLeft=S(t,".navigate-left"),this.controlsRight=S(t,".navigate-right"),this.controlsUp=S(t,".navigate-up"),this.controlsDown=S(t,".navigate-down"),this.controlsPrev=S(t,".navigate-prev"),this.controlsNext=S(t,".navigate-next"),this.controlsFullscreen=S(t,".enter-fullscreen"),this.controlsRightArrow=this.element.querySelector(".navigate-right"),this.controlsLeftArrow=this.element.querySelector(".navigate-left"),this.controlsDownArrow=this.element.querySelector(".navigate-down")}configure(e,t){let i=e.controls==="speaker"||e.controls==="speaker-only";this.element.style.display=e.controls&&(!i||this.Reveal.isSpeakerNotes())?"block":"none",this.element.setAttribute("data-controls-layout",e.controlsLayout),this.element.setAttribute("data-controls-back-arrows",e.controlsBackArrows)}bind(){let e=["touchstart","click"];Ni&&(e=["touchend"]),e.forEach(t=>{this.controlsLeft.forEach(i=>i.addEventListener(t,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(i=>i.addEventListener(t,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(i=>i.addEventListener(t,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(i=>i.addEventListener(t,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(i=>i.addEventListener(t,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(i=>i.addEventListener(t,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(i=>i.addEventListener(t,this.onEnterFullscreen,!1))})}unbind(){["touchstart","touchend","click"].forEach(e=>{this.controlsLeft.forEach(t=>t.removeEventListener(e,this.onNavigateLeftClicked,!1)),this.controlsRight.forEach(t=>t.removeEventListener(e,this.onNavigateRightClicked,!1)),this.controlsUp.forEach(t=>t.removeEventListener(e,this.onNavigateUpClicked,!1)),this.controlsDown.forEach(t=>t.removeEventListener(e,this.onNavigateDownClicked,!1)),this.controlsPrev.forEach(t=>t.removeEventListener(e,this.onNavigatePrevClicked,!1)),this.controlsNext.forEach(t=>t.removeEventListener(e,this.onNavigateNextClicked,!1)),this.controlsFullscreen.forEach(t=>t.removeEventListener(e,this.onEnterFullscreen,!1))})}update(){let e=this.Reveal.availableRoutes();[...this.controlsLeft,...this.controlsRight,...this.controlsUp,...this.controlsDown,...this.controlsPrev,...this.controlsNext].forEach(i=>{i.classList.remove("enabled","fragmented"),i.setAttribute("disabled","disabled")}),e.left&&this.controlsLeft.forEach(i=>{i.classList.add("enabled"),i.removeAttribute("disabled")}),e.right&&this.controlsRight.forEach(i=>{i.classList.add("enabled"),i.removeAttribute("disabled")}),e.up&&this.controlsUp.forEach(i=>{i.classList.add("enabled"),i.removeAttribute("disabled")}),e.down&&this.controlsDown.forEach(i=>{i.classList.add("enabled"),i.removeAttribute("disabled")}),(e.left||e.up)&&this.controlsPrev.forEach(i=>{i.classList.add("enabled"),i.removeAttribute("disabled")}),(e.right||e.down)&&this.controlsNext.forEach(i=>{i.classList.add("enabled"),i.removeAttribute("disabled")});let t=this.Reveal.getCurrentSlide();if(t){let i=this.Reveal.fragments.availableRoutes();i.prev&&this.controlsPrev.forEach(a=>{a.classList.add("fragmented","enabled"),a.removeAttribute("disabled")}),i.next&&this.controlsNext.forEach(a=>{a.classList.add("fragmented","enabled"),a.removeAttribute("disabled")});let s=this.Reveal.isVerticalSlide(t),r=s&&t.parentElement&&t.parentElement.querySelectorAll(":scope > section").length>1;s&&r?(i.prev&&this.controlsUp.forEach(a=>{a.classList.add("fragmented","enabled"),a.removeAttribute("disabled")}),i.next&&this.controlsDown.forEach(a=>{a.classList.add("fragmented","enabled"),a.removeAttribute("disabled")})):(i.prev&&this.controlsLeft.forEach(a=>{a.classList.add("fragmented","enabled"),a.removeAttribute("disabled")}),i.next&&this.controlsRight.forEach(a=>{a.classList.add("fragmented","enabled"),a.removeAttribute("disabled")}))}if(this.Reveal.getConfig().controlsTutorial){let i=this.Reveal.getIndices();!this.Reveal.hasNavigatedVertically()&&e.down?this.controlsDownArrow.classList.add("highlight"):(this.controlsDownArrow.classList.remove("highlight"),this.Reveal.getConfig().rtl?!this.Reveal.hasNavigatedHorizontally()&&e.left&&i.v===0?this.controlsLeftArrow.classList.add("highlight"):this.controlsLeftArrow.classList.remove("highlight"):!this.Reveal.hasNavigatedHorizontally()&&e.right&&i.v===0?this.controlsRightArrow.classList.add("highlight"):this.controlsRightArrow.classList.remove("highlight"))}}destroy(){this.unbind(),this.element.remove()}onNavigateLeftClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode==="linear"?this.Reveal.prev():this.Reveal.left()}onNavigateRightClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.getConfig().navigationMode==="linear"?this.Reveal.next():this.Reveal.right()}onNavigateUpClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.up()}onNavigateDownClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.down()}onNavigatePrevClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.prev()}onNavigateNextClicked(e){e.preventDefault(),this.Reveal.onUserInput(),this.Reveal.next()}onEnterFullscreen(e){let t=this.Reveal.getConfig(),i=this.Reveal.getViewportElement();Ii(t.embedded?i:i.parentElement)}},Rt=class{constructor(e){this.Reveal=e,this.onProgressClicked=this.onProgressClicked.bind(this)}render(){this.element=document.createElement("div"),this.element.className="progress",this.Reveal.getRevealElement().appendChild(this.element),this.bar=document.createElement("span"),this.element.appendChild(this.bar)}configure(e,t){this.element.style.display=e.progress?"block":"none"}bind(){this.Reveal.getConfig().progress&&this.element&&this.element.addEventListener("click",this.onProgressClicked,!1)}unbind(){this.Reveal.getConfig().progress&&this.element&&this.element.removeEventListener("click",this.onProgressClicked,!1)}update(){if(this.Reveal.getConfig().progress&&this.bar){let e=this.Reveal.getProgress();this.Reveal.getTotalSlides()<2&&(e=0),this.bar.style.transform="scaleX("+e+")"}}getMaxWidth(){return this.Reveal.getRevealElement().offsetWidth}onProgressClicked(e){this.Reveal.onUserInput(e),e.preventDefault();let t=this.Reveal.getSlides(),i=t.length,s=Math.floor(e.clientX/this.getMaxWidth()*i);this.Reveal.getConfig().rtl&&(s=i-s);let r=this.Reveal.getIndices(t[s]);this.Reveal.slide(r.h,r.v)}destroy(){this.element.remove()}},At=class{constructor(e){this.Reveal=e,this.lastMouseWheelStep=0,this.cursorHidden=!1,this.cursorInactiveTimeout=0,this.onDocumentCursorActive=this.onDocumentCursorActive.bind(this),this.onDocumentMouseScroll=this.onDocumentMouseScroll.bind(this)}configure(e,t){e.mouseWheel?document.addEventListener("wheel",this.onDocumentMouseScroll,!1):document.removeEventListener("wheel",this.onDocumentMouseScroll,!1),e.hideInactiveCursor?(document.addEventListener("mousemove",this.onDocumentCursorActive,!1),document.addEventListener("mousedown",this.onDocumentCursorActive,!1)):(this.showCursor(),document.removeEventListener("mousemove",this.onDocumentCursorActive,!1),document.removeEventListener("mousedown",this.onDocumentCursorActive,!1))}showCursor(){this.cursorHidden&&(this.cursorHidden=!1,this.Reveal.getRevealElement().style.cursor="")}hideCursor(){this.cursorHidden===!1&&(this.cursorHidden=!0,this.Reveal.getRevealElement().style.cursor="none")}destroy(){this.showCursor(),document.removeEventListener("wheel",this.onDocumentMouseScroll,!1),document.removeEventListener("mousemove",this.onDocumentCursorActive,!1),document.removeEventListener("mousedown",this.onDocumentCursorActive,!1)}onDocumentCursorActive(e){this.showCursor(),clearTimeout(this.cursorInactiveTimeout),this.cursorInactiveTimeout=setTimeout(this.hideCursor.bind(this),this.Reveal.getConfig().hideCursorTime)}onDocumentMouseScroll(e){if(Date.now()-this.lastMouseWheelStep>1e3){this.lastMouseWheelStep=Date.now();let t=e.detail||-e.wheelDelta;t>0?this.Reveal.next():t<0&&this.Reveal.prev()}}},Li=(n,e)=>{let t=document.createElement("script");t.type="text/javascript",t.async=!1,t.defer=!1,t.src=n,typeof e=="function"&&(t.onload=s=>{s.type==="load"&&(t.onload=t.onerror=null,e())},t.onerror=s=>{t.onload=t.onerror=null,e(new Error("Failed loading script: "+t.src+`
`+s))});let i=document.querySelector("head");i&&i.insertBefore(t,i.lastChild)},Lt=class{constructor(e){this.Reveal=e,this.state="idle",this.registeredPlugins={},this.asyncDependencies=[]}load(e,t){return this.state="loading",e.forEach(this.registerPlugin.bind(this)),new Promise(i=>{let s=[],r=0;if(t.forEach(a=>{(!a.condition||a.condition())&&(a.async?this.asyncDependencies.push(a):s.push(a))}),s.length){r=s.length;let a=l=>{l&&typeof l.callback=="function"&&l.callback(),--r===0&&this.initPlugins().then(i)};s.forEach(l=>{typeof l.id=="string"?(this.registerPlugin(l),a(l)):typeof l.src=="string"?Li(l.src,()=>a(l)):(console.warn("Unrecognized plugin format",l),a())})}else this.initPlugins().then(i)})}initPlugins(){return new Promise(e=>{let t=Object.values(this.registeredPlugins),i=t.length;if(i===0)this.loadAsync().then(e);else{let s,r=()=>{--i===0?this.loadAsync().then(e):s()},a=0;s=()=>{let l=t[a++];if(typeof l.init=="function"){let o=l.init(this.Reveal);o&&typeof o.then=="function"?o.then(r):r()}else r()},s()}})}loadAsync(){return this.state="loaded",this.asyncDependencies.length&&this.asyncDependencies.forEach(e=>{Li(e.src,e.callback)}),Promise.resolve()}registerPlugin(e){arguments.length===2&&typeof arguments[0]=="string"?(e=arguments[1],e.id=arguments[0]):typeof e=="function"&&(e=e());let t=e.id;typeof t!="string"?console.warn("Unrecognized plugin format; can't find plugin.id",e):this.registeredPlugins[t]===void 0?(this.registeredPlugins[t]=e,this.state==="loaded"&&typeof e.init=="function"&&e.init(this.Reveal)):console.warn('reveal.js: "'+t+'" plugin has already been registered')}hasPlugin(e){return!!this.registeredPlugins[e]}getPlugin(e){return this.registeredPlugins[e]}getRegisteredPlugins(){return this.registeredPlugins}destroy(){Object.values(this.registeredPlugins).forEach(e=>{typeof e.destroy=="function"&&e.destroy()}),this.registeredPlugins={},this.asyncDependencies=[]}},Tt=class{constructor(e){this.Reveal=e,this.onSlidesClicked=this.onSlidesClicked.bind(this),this.iframeTriggerSelector=null,this.mediaTriggerSelector="[data-preview-image], [data-preview-video]",this.stateProps=["previewIframe","previewImage","previewVideo","previewFit"],this.state={}}update(){this.Reveal.getConfig().previewLinks?this.iframeTriggerSelector="a[href]:not([data-preview-link=false]), [data-preview-link]:not(a):not([data-preview-link=false])":this.iframeTriggerSelector="[data-preview-link]:not([data-preview-link=false])";let e=this.Reveal.getSlidesElement().querySelectorAll(this.iframeTriggerSelector).length>0,t=this.Reveal.getSlidesElement().querySelectorAll(this.mediaTriggerSelector).length>0;e||t?this.Reveal.getSlidesElement().addEventListener("click",this.onSlidesClicked,!1):this.Reveal.getSlidesElement().removeEventListener("click",this.onSlidesClicked,!1)}createOverlay(e){this.dom=document.createElement("div"),this.dom.classList.add("r-overlay"),this.dom.classList.add(e),this.viewport=document.createElement("div"),this.viewport.classList.add("r-overlay-viewport"),this.dom.appendChild(this.viewport),this.Reveal.getRevealElement().appendChild(this.dom)}previewIframe(e){this.close(),this.state={previewIframe:e},this.createOverlay("r-overlay-preview"),this.dom.dataset.state="loading",this.viewport.innerHTML=`<header class="r-overlay-header">
				<a class="r-overlay-header-button r-overlay-external" href="${e}" target="_blank"><span class="icon"></span></a>
				<button class="r-overlay-header-button r-overlay-close"><span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content">
				<iframe src="${e}"></iframe>
				<small class="r-overlay-content-inner">
					<span class="r-overlay-error x-frame-error">Unable to load iframe. This is likely due to the site's policy (x-frame-options).</span>
				</small>
			</div>`,this.dom.querySelector("iframe").addEventListener("load",t=>{this.dom.dataset.state="loaded"},!1),this.dom.querySelector(".r-overlay-close").addEventListener("click",t=>{this.close(),t.preventDefault()},!1),this.dom.querySelector(".r-overlay-external").addEventListener("click",t=>{this.close()},!1),this.Reveal.dispatchEvent({type:"previewiframe",data:{url:e}})}previewMedia(e,t,i){if(t!=="image"&&t!=="video"){console.warn("Please specify a valid media type to preview (image|video)");return}this.close(),i=i||"scale-down",this.createOverlay("r-overlay-preview"),this.dom.dataset.state="loading",this.dom.dataset.previewFit=i,this.viewport.innerHTML=`<header class="r-overlay-header">
				<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
			</header>
			<div class="r-overlay-spinner"></div>
			<div class="r-overlay-content"></div>`;let s=this.dom.querySelector(".r-overlay-content");if(t==="image"){this.state={previewImage:e,previewFit:i};let r=document.createElement("img",{});r.src=e,s.appendChild(r),r.addEventListener("load",()=>{this.dom.dataset.state="loaded"},!1),r.addEventListener("error",()=>{this.dom.dataset.state="error",s.innerHTML='<span class="r-overlay-error">Unable to load image.</span>'},!1),this.dom.style.cursor="zoom-out",this.dom.addEventListener("click",a=>{this.close()},!1),this.Reveal.dispatchEvent({type:"previewimage",data:{url:e}})}else if(t==="video"){this.state={previewVideo:e,previewFit:i};let r=document.createElement("video");r.autoplay=this.dom.dataset.previewAutoplay!=="false",r.controls=this.dom.dataset.previewControls!=="false",r.loop=this.dom.dataset.previewLoop==="true",r.muted=this.dom.dataset.previewMuted==="true",r.playsInline=!0,r.src=e,s.appendChild(r),r.addEventListener("loadeddata",()=>{this.dom.dataset.state="loaded"},!1),r.addEventListener("error",()=>{this.dom.dataset.state="error",s.innerHTML='<span class="r-overlay-error">Unable to load video.</span>'},!1),this.Reveal.dispatchEvent({type:"previewvideo",data:{url:e}})}else throw new Error("Please specify a valid media type to preview");this.dom.querySelector(".r-overlay-close").addEventListener("click",r=>{this.close(),r.preventDefault()},!1)}previewImage(e,t){this.previewMedia(e,"image",t)}previewVideo(e,t){this.previewMedia(e,"video",t)}toggleHelp(e){typeof e=="boolean"?e?this.showHelp():this.close():this.dom?this.close():this.showHelp()}showHelp(){if(this.Reveal.getConfig().help){this.close(),this.createOverlay("r-overlay-help");let e='<p class="title">Keyboard Shortcuts</p>',t=this.Reveal.keyboard.getShortcuts(),i=this.Reveal.keyboard.getBindings();e+="<table><th>KEY</th><th>ACTION</th>";for(let s in t)e+=`<tr><td>${s}</td><td>${t[s]}</td></tr>`;for(let s in i)i[s].key&&i[s].description&&(e+=`<tr><td>${i[s].key}</td><td>${i[s].description}</td></tr>`);e+="</table>",this.viewport.innerHTML=`
				<header class="r-overlay-header">
					<button class="r-overlay-header-button r-overlay-close">Esc <span class="icon"></span></button>
				</header>
				<div class="r-overlay-content">
					<div class="r-overlay-help-content">${e}</div>
				</div>
			`,this.dom.querySelector(".r-overlay-close").addEventListener("click",s=>{this.close(),s.preventDefault()},!1),this.Reveal.dispatchEvent({type:"showhelp"})}}isOpen(){return!!this.dom}close(){return this.dom?(this.dom.remove(),this.dom=null,this.state={},this.Reveal.dispatchEvent({type:"closeoverlay"}),!0):!1}getState(){return this.state}setState(e){this.stateProps.every(t=>this.state[t]===e[t])||(e.previewIframe?this.previewIframe(e.previewIframe):e.previewImage?this.previewImage(e.previewImage,e.previewFit):e.previewVideo?this.previewVideo(e.previewVideo,e.previewFit):this.close())}onSlidesClicked(e){let t=e.target,i=t.closest(this.iframeTriggerSelector),s=t.closest(this.mediaTriggerSelector);if(i){if(e.metaKey||e.shiftKey||e.altKey)return;let r=i.getAttribute("data-preview-link"),a=typeof r=="string"&&r.startsWith("http")?r:i.getAttribute("href");a&&(this.previewIframe(a),e.preventDefault())}else if(s){if(s.hasAttribute("data-preview-image")){let r=s.dataset.previewImage||s.getAttribute("src");r&&(this.previewImage(r,s.dataset.previewFit),e.preventDefault())}else if(s.hasAttribute("data-preview-video")){let r=s.dataset.previewVideo||s.getAttribute("src");if(!r){let a=s.querySelector("source");a&&(r=a.getAttribute("src"))}r&&(this.previewVideo(r,s.dataset.previewFit),e.preventDefault())}}}destroy(){this.close()}},Fe=40,Pt=class{constructor(e){this.Reveal=e,this.touchStartX=0,this.touchStartY=0,this.touchStartCount=0,this.touchCaptured=!1,this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onTouchStart=this.onTouchStart.bind(this),this.onTouchMove=this.onTouchMove.bind(this),this.onTouchEnd=this.onTouchEnd.bind(this)}bind(){let e=this.Reveal.getRevealElement();"onpointerdown"in window?(e.addEventListener("pointerdown",this.onPointerDown,!1),e.addEventListener("pointermove",this.onPointerMove,!1),e.addEventListener("pointerup",this.onPointerUp,!1)):window.navigator.msPointerEnabled?(e.addEventListener("MSPointerDown",this.onPointerDown,!1),e.addEventListener("MSPointerMove",this.onPointerMove,!1),e.addEventListener("MSPointerUp",this.onPointerUp,!1)):(e.addEventListener("touchstart",this.onTouchStart,!1),e.addEventListener("touchmove",this.onTouchMove,!1),e.addEventListener("touchend",this.onTouchEnd,!1))}unbind(){let e=this.Reveal.getRevealElement();e.removeEventListener("pointerdown",this.onPointerDown,!1),e.removeEventListener("pointermove",this.onPointerMove,!1),e.removeEventListener("pointerup",this.onPointerUp,!1),e.removeEventListener("MSPointerDown",this.onPointerDown,!1),e.removeEventListener("MSPointerMove",this.onPointerMove,!1),e.removeEventListener("MSPointerUp",this.onPointerUp,!1),e.removeEventListener("touchstart",this.onTouchStart,!1),e.removeEventListener("touchmove",this.onTouchMove,!1),e.removeEventListener("touchend",this.onTouchEnd,!1)}isSwipePrevented(e){if(Ve(e,"video[controls], audio[controls]"))return!0;for(;e&&typeof e.hasAttribute=="function";){if(e.hasAttribute("data-prevent-swipe"))return!0;e=e.parentNode}return!1}onTouchStart(e){if(this.touchCaptured=!1,this.isSwipePrevented(e.target))return!0;this.touchStartX=e.touches[0].clientX,this.touchStartY=e.touches[0].clientY,this.touchStartCount=e.touches.length}onTouchMove(e){if(this.isSwipePrevented(e.target))return!0;let t=this.Reveal.getConfig();if(this.touchCaptured)Ni&&e.preventDefault();else{this.Reveal.onUserInput(e);let i=e.touches[0].clientX,s=e.touches[0].clientY;if(e.touches.length===1&&this.touchStartCount!==2){let r=this.Reveal.availableRoutes({includeFragments:!0}),a=i-this.touchStartX,l=s-this.touchStartY;a>Fe&&Math.abs(a)>Math.abs(l)?(this.touchCaptured=!0,t.navigationMode==="linear"?t.rtl?this.Reveal.next():this.Reveal.prev():this.Reveal.left()):a<-Fe&&Math.abs(a)>Math.abs(l)?(this.touchCaptured=!0,t.navigationMode==="linear"?t.rtl?this.Reveal.prev():this.Reveal.next():this.Reveal.right()):l>Fe&&r.up?(this.touchCaptured=!0,t.navigationMode==="linear"?this.Reveal.prev():this.Reveal.up()):l<-Fe&&r.down&&(this.touchCaptured=!0,t.navigationMode==="linear"?this.Reveal.next():this.Reveal.down()),t.embedded?(this.touchCaptured||this.Reveal.isVerticalSlide())&&e.preventDefault():e.preventDefault()}}}onTouchEnd(e){this.touchCaptured&&!this.Reveal.slideContent.isAllowedToPlayAudio()&&this.Reveal.startEmbeddedContent(this.Reveal.getCurrentSlide()),this.touchCaptured=!1}onPointerDown(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType==="touch")&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchStart(e))}onPointerMove(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType==="touch")&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchMove(e))}onPointerUp(e){(e.pointerType===e.MSPOINTER_TYPE_TOUCH||e.pointerType==="touch")&&(e.touches=[{clientX:e.clientX,clientY:e.clientY}],this.onTouchEnd(e))}},lt="focus",Ti="blur",Ct=class{constructor(e){this.Reveal=e,this.onRevealPointerDown=this.onRevealPointerDown.bind(this),this.onDocumentPointerDown=this.onDocumentPointerDown.bind(this)}configure(e,t){e.embedded?this.blur():(this.focus(),this.unbind())}bind(){this.Reveal.getConfig().embedded&&this.Reveal.getRevealElement().addEventListener("pointerdown",this.onRevealPointerDown,!1)}unbind(){this.Reveal.getRevealElement().removeEventListener("pointerdown",this.onRevealPointerDown,!1),document.removeEventListener("pointerdown",this.onDocumentPointerDown,!1)}focus(){this.state!==lt&&(this.Reveal.getRevealElement().classList.add("focused"),document.addEventListener("pointerdown",this.onDocumentPointerDown,!1)),this.state=lt}blur(){this.state!==Ti&&(this.Reveal.getRevealElement().classList.remove("focused"),document.removeEventListener("pointerdown",this.onDocumentPointerDown,!1)),this.state=Ti}isFocused(){return this.state===lt}destroy(){this.Reveal.getRevealElement().classList.remove("focused")}onRevealPointerDown(e){this.focus()}onDocumentPointerDown(e){let t=j(e.target,".reveal");(!t||t!==this.Reveal.getRevealElement())&&this.blur()}},It=class{constructor(e){this.Reveal=e}render(){this.element=document.createElement("div"),this.element.className="speaker-notes",this.element.setAttribute("data-prevent-swipe",""),this.element.setAttribute("tabindex","0"),this.Reveal.getRevealElement().appendChild(this.element)}configure(e,t){e.showNotes&&this.element.setAttribute("data-layout",typeof e.showNotes=="string"?e.showNotes:"inline")}update(){this.Reveal.getConfig().showNotes&&this.element&&this.Reveal.getCurrentSlide()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()&&(this.element.innerHTML=this.getSlideNotes()||'<span class="notes-placeholder">No notes on this slide.</span>')}updateVisibility(){this.Reveal.getConfig().showNotes&&this.hasNotes()&&!this.Reveal.isScrollView()&&!this.Reveal.isPrintView()?this.Reveal.getRevealElement().classList.add("show-notes"):this.Reveal.getRevealElement().classList.remove("show-notes")}hasNotes(){return this.Reveal.getSlidesElement().querySelectorAll("[data-notes], aside.notes").length>0}isSpeakerNotesWindow(){return!!window.location.search.match(/receiver/gi)}getSlideNotes(e=this.Reveal.getCurrentSlide()){if(e.hasAttribute("data-notes"))return e.getAttribute("data-notes");let t=e.querySelectorAll("aside.notes");return t?Array.from(t).map(i=>i.innerHTML).join(`
`):null}destroy(){this.element.remove()}},Mt=class{constructor(e,t){this.diameter=100,this.diameter2=this.diameter/2,this.thickness=6,this.playing=!1,this.progress=0,this.progressOffset=1,this.container=e,this.progressCheck=t,this.canvas=document.createElement("canvas"),this.canvas.className="playback",this.canvas.width=this.diameter,this.canvas.height=this.diameter,this.canvas.style.width=this.diameter2+"px",this.canvas.style.height=this.diameter2+"px",this.context=this.canvas.getContext("2d"),this.container.appendChild(this.canvas),this.render()}setPlaying(e){let t=this.playing;this.playing=e,!t&&this.playing?this.animate():this.render()}animate(){let e=this.progress;this.progress=this.progressCheck(),e>.8&&this.progress<.2&&(this.progressOffset=this.progress),this.render(),this.playing&&requestAnimationFrame(this.animate.bind(this))}render(){let e=this.playing?this.progress:0,t=this.diameter2-this.thickness,i=this.diameter2,s=this.diameter2,r=28;this.progressOffset+=(1-this.progressOffset)*.1;let a=-Math.PI/2+e*(Math.PI*2),l=-Math.PI/2+this.progressOffset*(Math.PI*2);this.context.save(),this.context.clearRect(0,0,this.diameter,this.diameter),this.context.beginPath(),this.context.arc(i,s,t+4,0,Math.PI*2,!1),this.context.fillStyle="rgba( 0, 0, 0, 0.4 )",this.context.fill(),this.context.beginPath(),this.context.arc(i,s,t,0,Math.PI*2,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle="rgba( 255, 255, 255, 0.2 )",this.context.stroke(),this.playing&&(this.context.beginPath(),this.context.arc(i,s,t,l,a,!1),this.context.lineWidth=this.thickness,this.context.strokeStyle="#fff",this.context.stroke()),this.context.translate(i-r/2,s-r/2),this.playing?(this.context.fillStyle="#fff",this.context.fillRect(0,0,r/2-4,r),this.context.fillRect(r/2+4,0,r/2-4,r)):(this.context.beginPath(),this.context.translate(4,0),this.context.moveTo(0,0),this.context.lineTo(r-4,r/2),this.context.lineTo(0,r),this.context.fillStyle="#fff",this.context.fill()),this.context.restore()}on(e,t){this.canvas.addEventListener(e,t,!1)}off(e,t){this.canvas.removeEventListener(e,t,!1)}destroy(){this.playing=!1,this.canvas.parentNode&&this.container.removeChild(this.canvas)}},Zs={width:960,height:700,margin:.04,minScale:.2,maxScale:2,controls:!0,controlsTutorial:!0,controlsLayout:"bottom-right",controlsBackArrows:"faded",progress:!0,slideNumber:!1,showSlideNumber:"all",hashOneBasedIndex:!1,hash:!1,respondToHashChanges:!0,jumpToSlide:!0,history:!1,keyboard:!0,keyboardCondition:null,disableLayout:!1,overview:!0,center:!0,touch:!0,loop:!1,rtl:!1,navigationMode:"default",shuffle:!1,fragments:!0,fragmentInURL:!0,embedded:!1,help:!0,pause:!0,showNotes:!1,showHiddenSlides:!1,autoPlayMedia:null,preloadIframes:null,mouseWheel:!1,previewLinks:!1,viewDistance:3,mobileViewDistance:2,display:"block",hideInactiveCursor:!0,hideCursorTime:5e3,sortFragmentsOnSync:!0,autoAnimate:!0,autoAnimateMatcher:null,autoAnimateEasing:"ease",autoAnimateDuration:1,autoAnimateUnmatched:!0,autoAnimateStyles:["opacity","color","background-color","padding","font-size","line-height","letter-spacing","border-width","border-color","border-radius","outline","outline-offset"],autoSlide:0,autoSlideStoppable:!0,autoSlideMethod:null,defaultTiming:null,postMessage:!0,postMessageEvents:!1,focusBodyOnPageVisibilityChange:!0,transition:"slide",transitionSpeed:"default",backgroundTransition:"fade",parallaxBackgroundImage:"",parallaxBackgroundSize:"",parallaxBackgroundRepeat:"",parallaxBackgroundPosition:"",parallaxBackgroundHorizontal:null,parallaxBackgroundVertical:null,view:null,scrollLayout:"full",scrollSnap:"mandatory",scrollProgress:"auto",scrollActivationWidth:435,pdfMaxPagesPerSlide:Number.POSITIVE_INFINITY,pdfSeparateFragments:!0,pdfPageHeightOffset:-1,dependencies:[],plugins:[]},zi="6.0.0";function Hi(n,e){arguments.length<2&&(e=arguments[0],n=document.querySelector(".reveal"));let t={},i={},s=!1,r=!1,a,l,o,c,u={hasNavigatedHorizontally:!1,hasNavigatedVertically:!1},m=[],p=1,f={layout:"",overview:""},h={},k="idle",T=0,F,O=0,J=-1,V=!1,x=new ht(t),M=new pt(t),A=new gt(t),P=new ft(t),$=new vt(t),E=new yt(t),D=new bt(t),L=new wt(t),v=new kt(t),R=new St(t),C=new xt(t),X=new Et(t),Z=new Rt(t),de=new At(t),_=new Lt(t),U=new Tt(t),pe=new Ct(t),Ye=new Pt(t),Q=new It(t);function as(d){if(!n)throw'Unable to find presentation root (<div class="reveal">).';if(s)throw"Reveal.js has already been initialized.";if(s=!0,h.wrapper=n,h.slides=n.querySelector(".slides"),!h.slides)throw'Unable to find slides container (<div class="slides">).';return i=oe(oe(oe(oe(oe({},Zs),i),e),d),Ri()),/print-pdf/gi.test(window.location.search)&&(i.view="print"),ns(),window.addEventListener("load",be,!1),_.load(i.plugins,i.dependencies).then(rs),new Promise(g=>t.on("ready",g))}function ns(){i.embedded===!0?h.viewport=j(n,".reveal-viewport")||n:(h.viewport=document.body,document.documentElement.classList.add("reveal-full-page")),h.viewport.classList.add("reveal-viewport")}function rs(){s!==!1&&(r=!0,jt(),ls(),us(),cs(),hs(),ks(),Kt(),$.update(!0),os(),C.readURL(),setTimeout(()=>{h.slides.classList.remove("no-transition"),h.wrapper.classList.add("ready"),Y({type:"ready",data:{indexh:a,indexv:l,currentSlide:c}})},1))}function os(){let d=i.view==="print",g=i.view==="scroll"||i.view==="reader";(d||g)&&(d?Ie():Ye.unbind(),h.viewport.classList.add("loading-scroll-mode"),d?document.readyState==="complete"?D.activate():window.addEventListener("load",()=>D.activate()):E.activate())}function jt(){i.showHiddenSlides||S(h.wrapper,'section[data-visibility="hidden"]').forEach(d=>{let g=d.parentNode;g.childElementCount===1&&/section/i.test(g.nodeName)?g.remove():d.remove()})}function ls(){h.slides.classList.add("no-transition"),ge?h.wrapper.classList.add("no-hover"):h.wrapper.classList.remove("no-hover"),$.render(),M.render(),A.render(),X.render(),Z.render(),Q.render(),h.pauseOverlay=Hs(h.wrapper,"div","pause-overlay",i.controls?'<button class="resume-button">Resume presentation</button>':null),h.statusElement=ds(),h.wrapper.setAttribute("role","application")}function ds(){let d=h.wrapper.querySelector(".aria-status");return d||(d=document.createElement("div"),d.style.position="absolute",d.style.height="1px",d.style.width="1px",d.style.overflow="hidden",d.style.clip="rect( 1px, 1px, 1px, 1px )",d.classList.add("aria-status"),d.setAttribute("aria-live","polite"),d.setAttribute("aria-atomic","true"),h.wrapper.appendChild(d)),d}function Je(d){h.statusElement.textContent=d}function Ce(d){let g="";if(d.nodeType===3)g+=d.textContent.trim();else if(d.nodeType===1){let y=d.getAttribute("aria-hidden"),b=window.getComputedStyle(d).display==="none";if(y!=="true"&&!b){if(d.tagName==="IMG"||d.tagName==="VIDEO"){let w=d.getAttribute("alt");w&&(g+=Wt(w))}Array.from(d.childNodes).forEach(w=>{g+=Ce(w)}),["P","DIV","UL","OL","LI","H1","H2","H3","H4","H5","H6","BLOCKQUOTE"].includes(d.tagName)&&g.trim()!==""&&(g=Wt(g))}}return g=g.trim(),g===""?"":g+" "}function Wt(d){let g=d.trim();return g===""?d:/[.!?]$/.test(g)?g:g+"."}function cs(){setInterval(()=>{(!E.isActive()&&h.wrapper.scrollTop!==0||h.wrapper.scrollLeft!==0)&&(h.wrapper.scrollTop=0,h.wrapper.scrollLeft=0)},1e3)}function hs(){document.addEventListener("fullscreenchange",qe),document.addEventListener("webkitfullscreenchange",qe)}function us(){i.postMessage&&window.addEventListener("message",yi,!1)}function Kt(d){let g=oe({},i);if(typeof d=="object"&&Se(i,d),t.isReady()===!1)return;let y=h.wrapper.querySelectorAll(me).length;h.wrapper.classList.remove(g.transition),h.wrapper.classList.add(i.transition),h.wrapper.setAttribute("data-transition-speed",i.transitionSpeed),h.wrapper.setAttribute("data-background-transition",i.backgroundTransition),h.viewport.style.setProperty("--slide-width",typeof i.width=="string"?i.width:i.width+"px"),h.viewport.style.setProperty("--slide-height",typeof i.height=="string"?i.height:i.height+"px"),i.shuffle&&et(),rt(h.wrapper,"embedded",i.embedded),rt(h.wrapper,"rtl",i.rtl),rt(h.wrapper,"center",i.center),i.pause===!1&&Ee(),P.reset(),F&&(F.destroy(),F=null),y>1&&i.autoSlide&&i.autoSlideStoppable&&(F=new Mt(h.wrapper,()=>Math.min(Math.max((Date.now()-J)/T,0),1)),F.on("click",Ts),V=!1),i.navigationMode!=="default"?h.wrapper.setAttribute("data-navigation-mode",i.navigationMode):h.wrapper.removeAttribute("data-navigation-mode"),Q.configure(i,g),pe.configure(i,g),de.configure(i,g),X.configure(i,g),Z.configure(i,g),R.configure(i,g),L.configure(i,g),M.configure(i,g),ri()}function Xt(){window.addEventListener("resize",ki,!1),i.touch&&Ye.bind(),i.keyboard&&R.bind(),i.progress&&Z.bind(),i.respondToHashChanges&&C.bind(),X.bind(),pe.bind(),h.slides.addEventListener("click",wi,!1),h.slides.addEventListener("transitionend",bi,!1),h.pauseOverlay.addEventListener("click",Ee,!1),i.focusBodyOnPageVisibilityChange&&document.addEventListener("visibilitychange",Si,!1)}function Ie(){Ye.unbind(),pe.unbind(),R.unbind(),X.unbind(),Z.unbind(),C.unbind(),window.removeEventListener("resize",ki,!1),h.slides.removeEventListener("click",wi,!1),h.slides.removeEventListener("transitionend",bi,!1),h.pauseOverlay.removeEventListener("click",Ee,!1)}function ps(){s=!1,r!==!1&&(Ie(),Be(),Q.destroy(),pe.destroy(),U.destroy(),_.destroy(),de.destroy(),X.destroy(),Z.destroy(),$.destroy(),M.destroy(),A.destroy(),document.removeEventListener("fullscreenchange",qe),document.removeEventListener("webkitfullscreenchange",qe),document.removeEventListener("visibilitychange",Si,!1),window.removeEventListener("message",yi,!1),window.removeEventListener("load",be,!1),h.pauseOverlay&&h.pauseOverlay.remove(),h.statusElement&&h.statusElement.remove(),document.documentElement.classList.remove("reveal-full-page"),h.wrapper.classList.remove("ready","center","has-horizontal-slides","has-vertical-slides"),h.wrapper.removeAttribute("data-transition-speed"),h.wrapper.removeAttribute("data-background-transition"),h.viewport.classList.remove("reveal-viewport"),h.viewport.style.removeProperty("--slide-width"),h.viewport.style.removeProperty("--slide-height"),h.slides.style.removeProperty("width"),h.slides.style.removeProperty("height"),h.slides.style.removeProperty("zoom"),h.slides.style.removeProperty("left"),h.slides.style.removeProperty("top"),h.slides.style.removeProperty("bottom"),h.slides.style.removeProperty("right"),h.slides.style.removeProperty("transform"),Array.from(h.wrapper.querySelectorAll(me)).forEach(d=>{d.style.removeProperty("display"),d.style.removeProperty("top"),d.removeAttribute("hidden"),d.removeAttribute("aria-hidden")}))}function Yt(d,g,y){n.addEventListener(d,g,y)}function Jt(d,g,y){n.removeEventListener(d,g,y)}function Ze(d){typeof d.layout=="string"&&(f.layout=d.layout),typeof d.overview=="string"&&(f.overview=d.overview),f.layout?ue(h.slides,f.layout+" "+f.overview):ue(h.slides,f.overview)}function Y({target:d=h.wrapper,type:g,data:y,bubbles:b=!0}){let w=document.createEvent("HTMLEvents",1,2);return w.initEvent(g,b,!0),Se(w,y),d.dispatchEvent(w),d===h.wrapper&&Qt(g),w}function Zt(d){Y({type:"slidechanged",data:{indexh:a,indexv:l,previousSlide:o,currentSlide:c,origin:d}})}function Qt(d,g){if(i.postMessageEvents&&window.parent!==window.self){let y={namespace:"reveal",eventName:d,state:vi()};Se(y,g),window.parent.postMessage(JSON.stringify(y),"*")}}function be(){if(h.wrapper&&!D.isActive()){let d=h.viewport.offsetWidth,g=h.viewport.offsetHeight;if(!i.disableLayout){ge&&!i.embedded&&document.documentElement.style.setProperty("--vh",window.innerHeight*.01+"px");let y=E.isActive()?Me(d,g):Me(),b=p;Gt(i.width,i.height),h.slides.style.width=y.width+"px",h.slides.style.height=y.height+"px",p=Math.min(y.presentationWidth/y.width,y.presentationHeight/y.height),p=Math.max(p,i.minScale),p=Math.min(p,i.maxScale),p===1||E.isActive()?(h.slides.style.zoom="",h.slides.style.left="",h.slides.style.top="",h.slides.style.bottom="",h.slides.style.right="",Ze({layout:""})):(h.slides.style.zoom="",h.slides.style.left="50%",h.slides.style.top="50%",h.slides.style.bottom="auto",h.slides.style.right="auto",Ze({layout:"translate(-50%, -50%) scale("+p+")"}));let w=Array.from(h.wrapper.querySelectorAll(me));for(let B=0,H=w.length;B<H;B++){let q=w[B];q.style.display!=="none"&&(i.center||q.classList.contains("center")?q.classList.contains("stack")?q.style.top=0:q.style.top=Math.max((y.height-q.scrollHeight)/2,0)+"px":q.style.top="")}b!==p&&Y({type:"resize",data:{oldScale:b,scale:p,size:y}})}gs(),h.viewport.style.setProperty("--slide-scale",p),h.viewport.style.setProperty("--viewport-width",d+"px"),h.viewport.style.setProperty("--viewport-height",g+"px"),E.layout(),Z.update(),$.updateParallax(),v.isActive()&&v.update()}}function Gt(d,g){S(h.slides,"section > .stretch, section > .r-stretch").forEach(y=>{let b=Ds(y,g);if(/(img|video)/gi.test(y.nodeName)){let w=y.naturalWidth||y.videoWidth,B=y.naturalHeight||y.videoHeight,H=Math.min(d/w,b/B);y.style.width=w*H+"px",y.style.height=B*H+"px"}else y.style.width=d+"px",y.style.height=b+"px"})}function gs(){if(h.wrapper&&!i.disableLayout&&!D.isActive()&&typeof i.scrollActivationWidth=="number"&&i.view!=="scroll"){let d=Me();d.presentationWidth>0&&d.presentationWidth<=i.scrollActivationWidth?E.isActive()||($.create(),E.activate()):E.isActive()&&E.deactivate()}}function Me(d,g){let y=i.width,b=i.height;i.disableLayout&&(y=h.slides.offsetWidth,b=h.slides.offsetHeight);let w={width:y,height:b,presentationWidth:d||h.wrapper.offsetWidth,presentationHeight:g||h.wrapper.offsetHeight};return w.presentationWidth-=w.presentationWidth*i.margin,w.presentationHeight-=w.presentationHeight*i.margin,typeof w.width=="string"&&/%$/.test(w.width)&&(w.width=parseInt(w.width,10)/100*w.presentationWidth),typeof w.height=="string"&&/%$/.test(w.height)&&(w.height=parseInt(w.height,10)/100*w.presentationHeight),w}function ei(d,g){typeof d=="object"&&typeof d.setAttribute=="function"&&d.setAttribute("data-previous-indexv",g||0)}function ti(d){if(typeof d=="object"&&typeof d.setAttribute=="function"&&d.classList.contains("stack")){let g=d.hasAttribute("data-start-indexv")?"data-start-indexv":"data-previous-indexv";return parseInt(d.getAttribute(g)||0,10)}return 0}function xe(d=c){return d&&d.parentNode&&!!d.parentNode.nodeName.match(/section/i)}function ms(d=c){return d.classList.contains(".stack")||d.querySelector("section")!==null}function ii(){return c&&xe(c)?!c.nextElementSibling:!1}function si(){return a===0&&l===0}function Qe(){return c?!(c.nextElementSibling||xe(c)&&c.parentNode.nextElementSibling):!1}function ai(){if(i.pause){let d=h.wrapper.classList.contains("paused");Be(),h.wrapper.classList.add("paused"),d===!1&&Y({type:"paused"})}}function Ee(){let d=h.wrapper.classList.contains("paused");h.wrapper.classList.remove("paused"),we(),d&&Y({type:"resumed"})}function ni(d){typeof d=="boolean"?d?ai():Ee():Re()?Ee():ai()}function Re(){return h.wrapper.classList.contains("paused")}function vs(d){typeof d=="boolean"?d?A.show():A.hide():A.isVisible()?A.hide():A.show()}function fs(d){typeof d=="boolean"?d?He():ze():V?He():ze()}function ys(){return!!(T&&!V)}function se(d,g,y,b){if(Y({type:"beforeslidechange",data:{indexh:d===void 0?a:d,indexv:g===void 0?l:g,origin:b}}).defaultPrevented)return;o=c;let w=h.wrapper.querySelectorAll(le);if(E.isActive()){let W=E.getSlideByIndices(d,g);W&&E.scrollToSlide(W);return}if(w.length===0)return;g===void 0&&!v.isActive()&&(g=ti(w[d])),o&&o.parentNode&&o.parentNode.classList.contains("stack")&&ei(o.parentNode,l);let B=m.concat();m.length=0;let H=a||0,q=l||0;a=Ne(le,d===void 0?a:d),l=Ne(ot,g===void 0?l:g);let re=a!==H||l!==q;re||(o=null);let he=w[a],G=he.querySelectorAll("section");n.classList.toggle("is-vertical-slide",G.length>1),c=G[l]||he;let z=!1;re&&o&&c&&!v.isActive()&&(k="running",z=Ge(o,c,H,q),z&&h.slides.classList.add("disable-slide-transitions")),tt(),be(),v.isActive()&&v.update(),typeof y<"u"&&L.goto(y),o&&o!==c&&(o.classList.remove("present"),o.setAttribute("aria-hidden","true"),si()&&setTimeout(()=>{xs().forEach(W=>{ei(W,0)})},0));e:for(let W=0,Ps=m.length;W<Ps;W++){for(let Oe=0;Oe<B.length;Oe++)if(B[Oe]===m[W]){B.splice(Oe,1);continue e}h.viewport.classList.add(m[W]),Y({type:m[W]})}for(;B.length;)h.viewport.classList.remove(B.pop());re&&(x.afterSlideChanged(),Zt(b)),(re||!o)&&(x.stopEmbeddedContent(o),x.startEmbeddedContent(c)),requestAnimationFrame(()=>{Je(Ce(c))}),Z.update(),X.update(),Q.update(),$.update(),$.updateParallax(),M.update(),L.update(),C.writeURL(),we(),z&&(setTimeout(()=>{h.slides.classList.remove("disable-slide-transitions")},0),i.autoAnimate&&P.run(o,c))}function Ge(d,g,y,b){return d.hasAttribute("data-auto-animate")&&g.hasAttribute("data-auto-animate")&&d.getAttribute("data-auto-animate-id")===g.getAttribute("data-auto-animate-id")&&!(a>y||l>b?g:d).hasAttribute("data-auto-animate-restart")}function bs(d,g,y){let b=a||0;a=g,l=y;let w=c!==d;o=c,c=d,c&&o&&i.autoAnimate&&Ge(o,c,b,l)&&P.run(o,c),w&&(x.afterSlideChanged(),o&&(x.stopEmbeddedContent(o),x.stopEmbeddedContent(o.slideBackgroundElement)),x.startEmbeddedContent(c),x.startEmbeddedContent(c.slideBackgroundElement)),requestAnimationFrame(()=>{Je(Ce(c))}),Zt()}function ri(){Ie(),Xt(),be(),T=i.autoSlide,we(),$.create(),C.writeURL(),i.sortFragmentsOnSync===!0&&L.sortAll(),typeof a<"u"&&(a=Ne(le,a),l=Ne(ot,l)),X.update(),Z.update(),tt(),Q.update(),Q.updateVisibility(),U.update(),$.update(!0),M.update(),x.formatEmbeddedContent(),i.autoPlayMedia===!1?x.stopEmbeddedContent(c,{unloadIframes:!1}):x.startEmbeddedContent(c),v.isActive()&&v.layout(),Y({type:"sync"})}function ws(d=c){$.sync(d),L.sync(d),x.load(d),$.update(),Q.update(),Y({type:"slidesync",data:{slide:d}})}function ks(){ce().forEach(d=>{S(d,"section").forEach((g,y)=>{y>0&&(g.classList.remove("present"),g.classList.remove("past"),g.classList.add("future"),g.setAttribute("aria-hidden","true"))})})}function et(d=ce()){d.forEach((g,y)=>{let b=d[Math.floor(Math.random()*d.length)];b.parentNode===g.parentNode&&g.parentNode.insertBefore(g,b);let w=g.querySelectorAll("section");w.length&&et(w)})}function Ne(d,g){let y=S(h.wrapper,d),b=y.length,w=E.isActive()||D.isActive(),B=!1,H=!1;if(b){i.loop&&(g>=b&&(B=!0),g%=b,g<0&&(g=b+g,H=!0)),g=Math.max(Math.min(g,b-1),0);for(let G=0;G<b;G++){let z=y[G],W=i.rtl&&!xe(z);if(z.classList.remove("past"),z.classList.remove("present"),z.classList.remove("future"),z.setAttribute("hidden",""),z.setAttribute("aria-hidden","true"),z.querySelector("section")&&z.classList.add("stack"),w){z.classList.add("present");continue}G<g?(z.classList.add(W?"future":"past"),i.fragments&&oi(z)):G>g?(z.classList.add(W?"past":"future"),i.fragments&&li(z)):G===g&&i.fragments&&(B?li(z):H&&oi(z))}let q=y[g],re=q.classList.contains("present");q.classList.add("present"),q.removeAttribute("hidden"),q.removeAttribute("aria-hidden"),re||Y({target:q,type:"visible",bubbles:!1});let he=q.getAttribute("data-state");he&&(m=m.concat(he.split(" ")))}else g=0;return g}function oi(d){S(d,".fragment").forEach(g=>{g.classList.add("visible"),g.classList.remove("current-fragment")})}function li(d){S(d,".fragment.visible").forEach(g=>{g.classList.remove("visible","current-fragment")})}function tt(){let d=ce(),g=d.length,y,b;if(g&&typeof a<"u"){let w=v.isActive(),B=w?10:i.viewDistance;ge&&(B=w?6:i.mobileViewDistance),D.isActive()&&(B=Number.MAX_VALUE);for(let H=0;H<g;H++){let q=d[H],re=S(q,"section"),he=re.length;if(y=Math.abs((a||0)-H)||0,i.loop&&(y=Math.abs(((a||0)-H)%(g-B))||0),y<B?x.load(q):x.unload(q),he){let G=w?0:ti(q);for(let z=0;z<he;z++){let W=re[z];b=Math.abs(H===(a||0)?(l||0)-z:z-G),y+b<B?x.load(W):x.unload(W)}}}pi()?h.wrapper.classList.add("has-vertical-slides"):h.wrapper.classList.remove("has-vertical-slides"),ui()?h.wrapper.classList.add("has-horizontal-slides"):h.wrapper.classList.remove("has-horizontal-slides")}}function ne({includeFragments:d=!1}={}){let g=h.wrapper.querySelectorAll(le),y=h.wrapper.querySelectorAll(ot),b={left:a>0,right:a<g.length-1,up:l>0,down:l<y.length-1};if(i.loop&&(g.length>1&&(b.left=!0,b.right=!0),y.length>1&&(b.up=!0,b.down=!0)),g.length>1&&i.navigationMode==="linear"&&(b.right=b.right||b.down,b.left=b.left||b.up),d===!0){let w=L.availableRoutes();b.left=b.left||w.prev,b.up=b.up||w.prev,b.down=b.down||w.next,b.right=b.right||w.next}if(i.rtl){let w=b.left;b.left=b.right,b.right=w}return b}function di(d=c){let g=ce(),y=0;e:for(let b=0;b<g.length;b++){let w=g[b],B=w.querySelectorAll("section");for(let H=0;H<B.length;H++){if(B[H]===d)break e;B[H].dataset.visibility!=="uncounted"&&y++}if(w===d)break;w.classList.contains("stack")===!1&&w.dataset.visibility!=="uncounted"&&y++}return y}function Ss(){let d=gi(),g=di();if(c){let y=c.querySelectorAll(".fragment");if(y.length>0){let b=c.querySelectorAll(".fragment.visible");g+=b.length/y.length*.9}}return Math.min(g/(d-1),1)}function ci(d){let g=a,y=l,b;if(d)if(E.isActive())g=parseInt(d.getAttribute("data-index-h"),10),d.getAttribute("data-index-v")&&(y=parseInt(d.getAttribute("data-index-v"),10));else{let w=xe(d),B=w?d.parentNode:d,H=ce();g=Math.max(H.indexOf(B),0),y=void 0,w&&(y=Math.max(S(d.parentNode,"section").indexOf(d),0))}if(!d&&c&&c.querySelectorAll(".fragment").length>0){let w=c.querySelector(".current-fragment");w&&w.hasAttribute("data-fragment-index")?b=parseInt(w.getAttribute("data-fragment-index"),10):b=c.querySelectorAll(".fragment.visible").length-1}return{h:g,v:y,f:b}}function it(){return S(h.wrapper,me+':not(.stack):not([data-visibility="uncounted"])')}function ce(){return S(h.wrapper,le)}function hi(){return S(h.wrapper,".slides>section>section")}function xs(){return S(h.wrapper,le+".stack")}function ui(){return ce().length>1}function pi(){return hi().length>1}function Es(){return it().map(d=>{let g={};for(let y=0;y<d.attributes.length;y++){let b=d.attributes[y];g[b.name]=b.value}return g})}function gi(){return it().length}function mi(d,g){let y=ce()[d],b=y&&y.querySelectorAll("section");return b&&b.length&&typeof g=="number"?b?b[g]:void 0:y}function Rs(d,g){let y=typeof d=="number"?mi(d,g):d;if(y)return y.slideBackgroundElement}function vi(){let d=ci();return oe({indexh:d.h,indexv:d.v,indexf:d.f,paused:Re(),overview:v.isActive()},U.getState())}function As(d){if(typeof d=="object"){se(ke(d.indexh),ke(d.indexv),ke(d.indexf));let g=ke(d.paused),y=ke(d.overview);typeof g=="boolean"&&g!==Re()&&ni(g),typeof y=="boolean"&&y!==v.isActive()&&v.toggle(y),U.setState(d)}}function we(){if(Be(),c&&i.autoSlide!==!1){let d=c.querySelector(".current-fragment[data-autoslide]"),g=d?d.getAttribute("data-autoslide"):null,y=c.parentNode?c.parentNode.getAttribute("data-autoslide"):null,b=c.getAttribute("data-autoslide");g?T=parseInt(g,10):b?T=parseInt(b,10):y?T=parseInt(y,10):(T=i.autoSlide,c.querySelectorAll(".fragment").length===0&&S(c,"video, audio").forEach(w=>{w.hasAttribute("data-autoplay")&&T&&w.duration*1e3/w.playbackRate>T&&(T=w.duration*1e3/w.playbackRate+1e3)})),T&&!V&&!Re()&&!v.isActive()&&(!Qe()||L.availableRoutes().next||i.loop===!0)&&(O=setTimeout(()=>{typeof i.autoSlideMethod=="function"?i.autoSlideMethod():nt(),we()},T),J=Date.now()),F&&F.setPlaying(O!==-1)}}function Be(){clearTimeout(O),O=-1}function ze(){T&&!V&&(V=!0,Y({type:"autoslidepaused"}),clearTimeout(O),F&&F.setPlaying(!1))}function He(){T&&V&&(V=!1,Y({type:"autoslideresumed"}),we())}function De({skipFragments:d=!1}={}){if(u.hasNavigatedHorizontally=!0,E.isActive())return E.prev();i.rtl?(v.isActive()||d||L.next()===!1)&&ne().left&&se(a+1,i.navigationMode==="grid"?l:void 0):(v.isActive()||d||L.prev()===!1)&&ne().left&&se(a-1,i.navigationMode==="grid"?l:void 0)}function $e({skipFragments:d=!1}={}){if(u.hasNavigatedHorizontally=!0,E.isActive())return E.next();i.rtl?(v.isActive()||d||L.prev()===!1)&&ne().right&&se(a-1,i.navigationMode==="grid"?l:void 0):(v.isActive()||d||L.next()===!1)&&ne().right&&se(a+1,i.navigationMode==="grid"?l:void 0)}function st({skipFragments:d=!1}={}){if(E.isActive())return E.prev();(v.isActive()||d||L.prev()===!1)&&ne().up&&se(a,l-1)}function at({skipFragments:d=!1}={}){if(u.hasNavigatedVertically=!0,E.isActive())return E.next();(v.isActive()||d||L.next()===!1)&&ne().down&&se(a,l+1)}function fi({skipFragments:d=!1}={}){if(E.isActive())return E.prev();if(d||L.prev()===!1)if(ne().up)st({skipFragments:d});else{let g;if(i.rtl?g=S(h.wrapper,le+".future").pop():g=S(h.wrapper,le+".past").pop(),g&&g.classList.contains("stack")){let y=g.querySelectorAll("section").length-1||void 0,b=a-1;se(b,y)}else i.rtl?$e({skipFragments:d}):De({skipFragments:d})}}function nt({skipFragments:d=!1}={}){if(u.hasNavigatedHorizontally=!0,u.hasNavigatedVertically=!0,E.isActive())return E.next();if(d||L.next()===!1){let g=ne();g.down&&g.right&&i.loop&&ii()&&(g.down=!1),g.down?at({skipFragments:d}):i.rtl?De({skipFragments:d}):$e({skipFragments:d})}}function Ls(d){i.autoSlideStoppable&&ze()}function yi(d){let g=d.data;if(typeof g=="string"&&g.charAt(0)==="{"&&g.charAt(g.length-1)==="}"&&(g=JSON.parse(g),g.method&&typeof t[g.method]=="function"))if(Us.test(g.method)===!1){let y=t[g.method].apply(t,g.args);Qt("callback",{method:g.method,result:y})}else console.warn('reveal.js: "'+g.method+'" is is blacklisted from the postMessage API')}function bi(d){k==="running"&&/section/gi.test(d.target.nodeName)&&(k="idle",Y({type:"slidetransitionend",data:{indexh:a,indexv:l,previousSlide:o,currentSlide:c}}))}function wi(d){let g=j(d.target,'a[href^="#"]');if(g){let y=g.getAttribute("href"),b=C.getIndicesFromHash(y);b&&(t.slide(b.h,b.v,b.f),d.preventDefault())}}function ki(d){be()}function Si(d){document.hidden===!1&&document.activeElement!==document.body&&(typeof document.activeElement.blur=="function"&&document.activeElement.blur(),document.body.focus())}function qe(d){(document.fullscreenElement||document.webkitFullscreenElement)===h.wrapper&&(d.stopImmediatePropagation(),setTimeout(()=>{t.layout(),t.focus.focus()},1))}function Ts(d){Qe()&&i.loop===!1?(se(0,0),He()):V?He():ze()}let xi={VERSION:zi,initialize:as,configure:Kt,destroy:ps,sync:ri,syncSlide:ws,syncFragments:L.sync.bind(L),slide:se,left:De,right:$e,up:st,down:at,prev:fi,next:nt,navigateLeft:De,navigateRight:$e,navigateUp:st,navigateDown:at,navigatePrev:fi,navigateNext:nt,navigateFragment:L.goto.bind(L),prevFragment:L.prev.bind(L),nextFragment:L.next.bind(L),on:Yt,off:Jt,addEventListener:Yt,removeEventListener:Jt,layout:be,shuffle:et,availableRoutes:ne,availableFragments:L.availableRoutes.bind(L),toggleHelp:U.toggleHelp.bind(U),toggleOverview:v.toggle.bind(v),toggleScrollView:E.toggle.bind(E),togglePause:ni,toggleAutoSlide:fs,toggleJumpToSlide:vs,isFirstSlide:si,isLastSlide:Qe,isLastVerticalSlide:ii,isVerticalSlide:xe,isVerticalStack:ms,isPaused:Re,isAutoSliding:ys,isSpeakerNotes:Q.isSpeakerNotesWindow.bind(Q),isOverview:v.isActive.bind(v),isFocused:pe.isFocused.bind(pe),isOverlayOpen:U.isOpen.bind(U),isScrollView:E.isActive.bind(E),isPrintView:D.isActive.bind(D),isReady:()=>r,loadSlide:x.load.bind(x),unloadSlide:x.unload.bind(x),startEmbeddedContent:()=>x.startEmbeddedContent(c),stopEmbeddedContent:()=>x.stopEmbeddedContent(c,{unloadIframes:!1}),previewIframe:U.previewIframe.bind(U),previewImage:U.previewImage.bind(U),previewVideo:U.previewVideo.bind(U),showPreview:U.previewIframe.bind(U),hidePreview:U.close.bind(U),addEventListeners:Xt,removeEventListeners:Ie,dispatchEvent:Y,getState:vi,setState:As,getProgress:Ss,getIndices:ci,getSlidesAttributes:Es,getSlidePastCount:di,getTotalSlides:gi,getSlide:mi,getPreviousSlide:()=>o,getCurrentSlide:()=>c,getSlideBackground:Rs,getSlideNotes:Q.getSlideNotes.bind(Q),getSlides:it,getHorizontalSlides:ce,getVerticalSlides:hi,hasHorizontalSlides:ui,hasVerticalSlides:pi,hasNavigatedHorizontally:()=>u.hasNavigatedHorizontally,hasNavigatedVertically:()=>u.hasNavigatedVertically,shouldAutoAnimateBetween:Ge,addKeyBinding:R.addKeyBinding.bind(R),removeKeyBinding:R.removeKeyBinding.bind(R),triggerKey:R.triggerKey.bind(R),registerKeyboardShortcut:R.registerKeyboardShortcut.bind(R),getComputedSlideSize:Me,setCurrentScrollPage:bs,removeHiddenSlides:jt,getScale:()=>p,getConfig:()=>i,getQueryHash:Ri,getSlidePath:C.getHash.bind(C),getRevealElement:()=>n,getSlidesElement:()=>h.slides,getViewportElement:()=>h.viewport,getBackgroundsElement:()=>$.element,registerPlugin:_.registerPlugin.bind(_),hasPlugin:_.hasPlugin.bind(_),getPlugin:_.getPlugin.bind(_),getPlugins:_.getRegisteredPlugins.bind(_)};return Se(t,Pi(oe({},xi),{announceStatus:Je,getStatusText:Ce,focus:pe,scroll:E,progress:Z,controls:X,location:C,overview:v,keyboard:R,fragments:L,backgrounds:$,slideContent:x,slideNumber:M,onUserInput:Ls,closeOverlay:U.close.bind(U),updateSlidesVisibility:tt,layoutSlideContents:Gt,transformSlides:Ze,cueAutoSlide:we,cancelAutoSlide:Be})),xi}var ee=Hi,Di=[];ee.initialize=n=>{let e=document.querySelector(".reveal");if(!(e instanceof HTMLElement))throw new Error('Unable to find presentation root (<div class="reveal">).');return Object.assign(ee,new Hi(e,n)),Di.map(t=>t(ee)),ee.initialize()};["configure","on","off","addEventListener","removeEventListener","registerPlugin"].forEach(n=>{ee[n]=(...e)=>{Di.push(t=>t[n].call(null,...e))}});ee.isReady=()=>!1;ee.VERSION=zi;var Qs=`<!--
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
</html>`;function Ht(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ye=Ht();function _i(n){ye=n}var ve={exec:()=>null};function I(n,e=""){let t=typeof n=="string"?n:n.source,i={replace:(s,r)=>{let a=typeof r=="string"?r:r.source;return a=a.replace(K.caret,"$1"),t=t.replace(s,a),i},getRegex:()=>new RegExp(t,e)};return i}var Gs=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),K={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}#`),htmlBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}>`)},ea=/^(?:[ \t]*(?:\n|$))+/,ta=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,ia=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,Pe=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,sa=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,Dt=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ji=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,Wi=I(ji).replace(/bull/g,Dt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),aa=I(ji).replace(/bull/g,Dt).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),$t=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,na=/^[^\n]+/,qt=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,ra=I(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",qt).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),oa=I(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,Dt).getRegex(),Ke="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",Ot=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,la=I("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",Ot).replace("tag",Ke).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Ki=I($t).replace("hr",Pe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ke).getRegex(),da=I(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",Ki).getRegex(),Ft={blockquote:da,code:ta,def:ra,fences:ia,heading:sa,hr:Pe,html:la,lheading:Wi,list:oa,newline:ea,paragraph:Ki,table:ve,text:na},$i=I("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",Pe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ke).getRegex(),ca={...Ft,lheading:aa,table:$i,paragraph:I($t).replace("hr",Pe).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",$i).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",Ke).getRegex()},ha={...Ft,html:I(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",Ot).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:ve,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:I($t).replace("hr",Pe).replace("heading",` *#{1,6} *[^
]`).replace("lheading",Wi).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ua=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,pa=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Xi=/^( {2,}|\\)\n(?!\s*$)/,ga=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Xe=/[\p{P}\p{S}]/u,Vt=/[\s\p{P}\p{S}]/u,Yi=/[^\s\p{P}\p{S}]/u,ma=I(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Vt).getRegex(),Ji=/(?!~)[\p{P}\p{S}]/u,va=/(?!~)[\s\p{P}\p{S}]/u,fa=/(?:[^\s\p{P}\p{S}]|~)/u,Zi=/(?![*_])[\p{P}\p{S}]/u,ya=/(?![*_])[\s\p{P}\p{S}]/u,ba=/(?:[^\s\p{P}\p{S}]|[*_])/u,wa=I(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Gs?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),Qi=/^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/,ka=I(Qi,"u").replace(/punct/g,Xe).getRegex(),Sa=I(Qi,"u").replace(/punct/g,Ji).getRegex(),Gi="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",xa=I(Gi,"gu").replace(/notPunctSpace/g,Yi).replace(/punctSpace/g,Vt).replace(/punct/g,Xe).getRegex(),Ea=I(Gi,"gu").replace(/notPunctSpace/g,fa).replace(/punctSpace/g,va).replace(/punct/g,Ji).getRegex(),Ra=I("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,Yi).replace(/punctSpace/g,Vt).replace(/punct/g,Xe).getRegex(),Aa=I(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,Zi).getRegex(),La="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Ta=I(La,"gu").replace(/notPunctSpace/g,ba).replace(/punctSpace/g,ya).replace(/punct/g,Zi).getRegex(),Pa=I(/\\(punct)/,"gu").replace(/punct/g,Xe).getRegex(),Ca=I(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),Ia=I(Ot).replace("(?:-->|$)","-->").getRegex(),Ma=I("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",Ia).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),_e=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+[^`]*?`+(?!`)|[^\[\]\\`])*?/,Na=I(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",_e).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),es=I(/^!?\[(label)\]\[(ref)\]/).replace("label",_e).replace("ref",qt).getRegex(),ts=I(/^!?\[(ref)\](?:\[\])?/).replace("ref",qt).getRegex(),Ba=I("reflink|nolink(?!\\()","g").replace("reflink",es).replace("nolink",ts).getRegex(),qi=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,Ut={_backpedal:ve,anyPunctuation:Pa,autolink:Ca,blockSkip:wa,br:Xi,code:pa,del:ve,delLDelim:ve,delRDelim:ve,emStrongLDelim:ka,emStrongRDelimAst:xa,emStrongRDelimUnd:Ra,escape:ua,link:Na,nolink:ts,punctuation:ma,reflink:es,reflinkSearch:Ba,tag:Ma,text:ga,url:ve},za={...Ut,link:I(/^!?\[(label)\]\((.*?)\)/).replace("label",_e).getRegex(),reflink:I(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",_e).getRegex()},Nt={...Ut,emStrongRDelimAst:Ea,emStrongLDelim:Sa,delLDelim:Aa,delRDelim:Ta,url:I(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",qi).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:I(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",qi).getRegex()},Ha={...Nt,br:I(Xi).replace("{2,}","*").getRegex(),text:I(Nt.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},Ue={normal:Ft,gfm:ca,pedantic:ha},Ae={normal:Ut,gfm:Nt,breaks:Ha,pedantic:za},Da={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Oi=n=>Da[n];function ae(n,e){if(e){if(K.escapeTest.test(n))return n.replace(K.escapeReplace,Oi)}else if(K.escapeTestNoEncode.test(n))return n.replace(K.escapeReplaceNoEncode,Oi);return n}function Fi(n){try{n=encodeURI(n).replace(K.percentDecode,"%")}catch{return null}return n}function Vi(n,e){let t=n.replace(K.findPipe,(r,a,l)=>{let o=!1,c=a;for(;--c>=0&&l[c]==="\\";)o=!o;return o?"|":" |"}),i=t.split(K.splitPipe),s=0;if(i[0].trim()||i.shift(),i.length>0&&!i.at(-1)?.trim()&&i.pop(),e)if(i.length>e)i.splice(e);else for(;i.length<e;)i.push("");for(;s<i.length;s++)i[s]=i[s].trim().replace(K.slashPipe,"|");return i}function Le(n,e,t){let i=n.length;if(i===0)return"";let s=0;for(;s<i&&n.charAt(i-s-1)===e;)s++;return n.slice(0,i-s)}function $a(n,e){if(n.indexOf(e[1])===-1)return-1;let t=0;for(let i=0;i<n.length;i++)if(n[i]==="\\")i++;else if(n[i]===e[0])t++;else if(n[i]===e[1]&&(t--,t<0))return i;return t>0?-2:-1}function qa(n,e=0){let t=e,i="";for(let s of n)if(s==="	"){let r=4-t%4;i+=" ".repeat(r),t+=r}else i+=s,t++;return i}function Ui(n,e,t,i,s){let r=e.href,a=e.title||null,l=n[1].replace(s.other.outputLinkReplace,"$1");i.state.inLink=!0;let o={type:n[0].charAt(0)==="!"?"image":"link",raw:t,href:r,title:a,text:l,tokens:i.inlineTokens(l)};return i.state.inLink=!1,o}function Oa(n,e,t){let i=n.match(t.other.indentCodeCompensation);if(i===null)return e;let s=i[1];return e.split(`
`).map(r=>{let a=r.match(t.other.beginningSpace);if(a===null)return r;let[l]=a;return l.length>=s.length?r.slice(s.length):r}).join(`
`)}var je=class{options;rules;lexer;constructor(n){this.options=n||ye}space(n){let e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){let e=this.rules.block.code.exec(n);if(e){let t=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?t:Le(t,`
`)}}}fences(n){let e=this.rules.block.fences.exec(n);if(e){let t=e[0],i=Oa(t,e[3]||"",this.rules);return{type:"code",raw:t,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:i}}}heading(n){let e=this.rules.block.heading.exec(n);if(e){let t=e[2].trim();if(this.rules.other.endingHash.test(t)){let i=Le(t,"#");(this.options.pedantic||!i||this.rules.other.endingSpaceChar.test(i))&&(t=i.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:t,tokens:this.lexer.inline(t)}}}hr(n){let e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:Le(e[0],`
`)}}blockquote(n){let e=this.rules.block.blockquote.exec(n);if(e){let t=Le(e[0],`
`).split(`
`),i="",s="",r=[];for(;t.length>0;){let a=!1,l=[],o;for(o=0;o<t.length;o++)if(this.rules.other.blockquoteStart.test(t[o]))l.push(t[o]),a=!0;else if(!a)l.push(t[o]);else break;t=t.slice(o);let c=l.join(`
`),u=c.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");i=i?`${i}
${c}`:c,s=s?`${s}
${u}`:u;let m=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(u,r,!0),this.lexer.state.top=m,t.length===0)break;let p=r.at(-1);if(p?.type==="code")break;if(p?.type==="blockquote"){let f=p,h=f.raw+`
`+t.join(`
`),k=this.blockquote(h);r[r.length-1]=k,i=i.substring(0,i.length-f.raw.length)+k.raw,s=s.substring(0,s.length-f.text.length)+k.text;break}else if(p?.type==="list"){let f=p,h=f.raw+`
`+t.join(`
`),k=this.list(h);r[r.length-1]=k,i=i.substring(0,i.length-p.raw.length)+k.raw,s=s.substring(0,s.length-f.raw.length)+k.raw,t=h.substring(r.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:i,tokens:r,text:s}}}list(n){let e=this.rules.block.list.exec(n);if(e){let t=e[1].trim(),i=t.length>1,s={type:"list",raw:"",ordered:i,start:i?+t.slice(0,-1):"",loose:!1,items:[]};t=i?`\\d{1,9}\\${t.slice(-1)}`:`\\${t}`,this.options.pedantic&&(t=i?t:"[*+-]");let r=this.rules.other.listItemRegex(t),a=!1;for(;n;){let o=!1,c="",u="";if(!(e=r.exec(n))||this.rules.block.hr.test(n))break;c=e[0],n=n.substring(c.length);let m=qa(e[2].split(`
`,1)[0],e[1].length),p=n.split(`
`,1)[0],f=!m.trim(),h=0;if(this.options.pedantic?(h=2,u=m.trimStart()):f?h=e[1].length+1:(h=m.search(this.rules.other.nonSpaceChar),h=h>4?1:h,u=m.slice(h),h+=e[1].length),f&&this.rules.other.blankLine.test(p)&&(c+=p+`
`,n=n.substring(p.length+1),o=!0),!o){let k=this.rules.other.nextBulletRegex(h),T=this.rules.other.hrRegex(h),F=this.rules.other.fencesBeginRegex(h),O=this.rules.other.headingBeginRegex(h),J=this.rules.other.htmlBeginRegex(h),V=this.rules.other.blockquoteBeginRegex(h);for(;n;){let x=n.split(`
`,1)[0],M;if(p=x,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,"  "),M=p):M=p.replace(this.rules.other.tabCharGlobal,"    "),F.test(p)||O.test(p)||J.test(p)||V.test(p)||k.test(p)||T.test(p))break;if(M.search(this.rules.other.nonSpaceChar)>=h||!p.trim())u+=`
`+M.slice(h);else{if(f||m.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||F.test(m)||O.test(m)||T.test(m))break;u+=`
`+p}f=!p.trim(),c+=x+`
`,n=n.substring(x.length+1),m=M.slice(h)}}s.loose||(a?s.loose=!0:this.rules.other.doubleBlankLine.test(c)&&(a=!0)),s.items.push({type:"list_item",raw:c,task:!!this.options.gfm&&this.rules.other.listIsTask.test(u),loose:!1,text:u,tokens:[]}),s.raw+=c}let l=s.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;s.raw=s.raw.trimEnd();for(let o of s.items){if(this.lexer.state.top=!1,o.tokens=this.lexer.blockTokens(o.text,[]),o.task){if(o.text=o.text.replace(this.rules.other.listReplaceTask,""),o.tokens[0]?.type==="text"||o.tokens[0]?.type==="paragraph"){o.tokens[0].raw=o.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),o.tokens[0].text=o.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let u=this.lexer.inlineQueue.length-1;u>=0;u--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[u].src)){this.lexer.inlineQueue[u].src=this.lexer.inlineQueue[u].src.replace(this.rules.other.listReplaceTask,"");break}}let c=this.rules.other.listTaskCheckbox.exec(o.raw);if(c){let u={type:"checkbox",raw:c[0]+" ",checked:c[0]!=="[ ]"};o.checked=u.checked,s.loose?o.tokens[0]&&["paragraph","text"].includes(o.tokens[0].type)&&"tokens"in o.tokens[0]&&o.tokens[0].tokens?(o.tokens[0].raw=u.raw+o.tokens[0].raw,o.tokens[0].text=u.raw+o.tokens[0].text,o.tokens[0].tokens.unshift(u)):o.tokens.unshift({type:"paragraph",raw:u.raw,text:u.raw,tokens:[u]}):o.tokens.unshift(u)}}if(!s.loose){let c=o.tokens.filter(m=>m.type==="space"),u=c.length>0&&c.some(m=>this.rules.other.anyLine.test(m.raw));s.loose=u}}if(s.loose)for(let o of s.items){o.loose=!0;for(let c of o.tokens)c.type==="text"&&(c.type="paragraph")}return s}}html(n){let e=this.rules.block.html.exec(n);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(n){let e=this.rules.block.def.exec(n);if(e){let t=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),i=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",s=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:t,raw:e[0],href:i,title:s}}}table(n){let e=this.rules.block.table.exec(n);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let t=Vi(e[1]),i=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),s=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],r={type:"table",raw:e[0],header:[],align:[],rows:[]};if(t.length===i.length){for(let a of i)this.rules.other.tableAlignRight.test(a)?r.align.push("right"):this.rules.other.tableAlignCenter.test(a)?r.align.push("center"):this.rules.other.tableAlignLeft.test(a)?r.align.push("left"):r.align.push(null);for(let a=0;a<t.length;a++)r.header.push({text:t[a],tokens:this.lexer.inline(t[a]),header:!0,align:r.align[a]});for(let a of s)r.rows.push(Vi(a,r.header.length).map((l,o)=>({text:l,tokens:this.lexer.inline(l),header:!1,align:r.align[o]})));return r}}lheading(n){let e=this.rules.block.lheading.exec(n);if(e)return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:e[1],tokens:this.lexer.inline(e[1])}}paragraph(n){let e=this.rules.block.paragraph.exec(n);if(e){let t=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:t,tokens:this.lexer.inline(t)}}}text(n){let e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){let e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(n){let e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){let e=this.rules.inline.link.exec(n);if(e){let t=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(t)){if(!this.rules.other.endAngleBracket.test(t))return;let r=Le(t.slice(0,-1),"\\");if((t.length-r.length)%2===0)return}else{let r=$a(e[2],"()");if(r===-2)return;if(r>-1){let a=(e[0].indexOf("!")===0?5:4)+e[1].length+r;e[2]=e[2].substring(0,r),e[0]=e[0].substring(0,a).trim(),e[3]=""}}let i=e[2],s="";if(this.options.pedantic){let r=this.rules.other.pedanticHrefTitle.exec(i);r&&(i=r[1],s=r[3])}else s=e[3]?e[3].slice(1,-1):"";return i=i.trim(),this.rules.other.startAngleBracket.test(i)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(t)?i=i.slice(1):i=i.slice(1,-1)),Ui(e,{href:i&&i.replace(this.rules.inline.anyPunctuation,"$1"),title:s&&s.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(n,e){let t;if((t=this.rules.inline.reflink.exec(n))||(t=this.rules.inline.nolink.exec(n))){let i=(t[2]||t[1]).replace(this.rules.other.multipleSpaceGlobal," "),s=e[i.toLowerCase()];if(!s){let r=t[0].charAt(0);return{type:"text",raw:r,text:r}}return Ui(t,s,t[0],this.lexer,this.rules)}}emStrong(n,e,t=""){let i=this.rules.inline.emStrongLDelim.exec(n);if(!(!i||i[3]&&t.match(this.rules.other.unicodeAlphaNumeric))&&(!(i[1]||i[2])||!t||this.rules.inline.punctuation.exec(t))){let s=[...i[0]].length-1,r,a,l=s,o=0,c=i[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,e=e.slice(-1*n.length+s);(i=c.exec(e))!=null;){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r)continue;if(a=[...r].length,i[3]||i[4]){l+=a;continue}else if((i[5]||i[6])&&s%3&&!((s+a)%3)){o+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l+o);let u=[...i[0]][0].length,m=n.slice(0,s+i.index+u+a);if(Math.min(s,a)%2){let f=m.slice(1,-1);return{type:"em",raw:m,text:f,tokens:this.lexer.inlineTokens(f)}}let p=m.slice(2,-2);return{type:"strong",raw:m,text:p,tokens:this.lexer.inlineTokens(p)}}}}codespan(n){let e=this.rules.inline.code.exec(n);if(e){let t=e[2].replace(this.rules.other.newLineCharGlobal," "),i=this.rules.other.nonSpaceChar.test(t),s=this.rules.other.startingSpaceChar.test(t)&&this.rules.other.endingSpaceChar.test(t);return i&&s&&(t=t.substring(1,t.length-1)),{type:"codespan",raw:e[0],text:t}}}br(n){let e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n,e,t=""){let i=this.rules.inline.delLDelim.exec(n);if(i&&(!i[1]||!t||this.rules.inline.punctuation.exec(t))){let s=[...i[0]].length-1,r,a,l=s,o=this.rules.inline.delRDelim;for(o.lastIndex=0,e=e.slice(-1*n.length+s);(i=o.exec(e))!=null;){if(r=i[1]||i[2]||i[3]||i[4]||i[5]||i[6],!r||(a=[...r].length,a!==s))continue;if(i[3]||i[4]){l+=a;continue}if(l-=a,l>0)continue;a=Math.min(a,a+l);let c=[...i[0]][0].length,u=n.slice(0,s+i.index+c+a),m=u.slice(s,-s);return{type:"del",raw:u,text:m,tokens:this.lexer.inlineTokens(m)}}}}autolink(n){let e=this.rules.inline.autolink.exec(n);if(e){let t,i;return e[2]==="@"?(t=e[1],i="mailto:"+t):(t=e[1],i=t),{type:"link",raw:e[0],text:t,href:i,tokens:[{type:"text",raw:t,text:t}]}}}url(n){let e;if(e=this.rules.inline.url.exec(n)){let t,i;if(e[2]==="@")t=e[0],i="mailto:"+t;else{let s;do s=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(s!==e[0]);t=e[0],e[1]==="www."?i="http://"+e[0]:i=e[0]}return{type:"link",raw:e[0],text:t,href:i,tokens:[{type:"text",raw:t,text:t}]}}}inlineText(n){let e=this.rules.inline.text.exec(n);if(e){let t=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:t}}}},te=class Bt{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ye,this.options.tokenizer=this.options.tokenizer||new je,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:K,block:Ue.normal,inline:Ae.normal};this.options.pedantic?(t.block=Ue.pedantic,t.inline=Ae.pedantic):this.options.gfm&&(t.block=Ue.gfm,this.options.breaks?t.inline=Ae.breaks:t.inline=Ae.gfm),this.tokenizer.rules=t}static get rules(){return{block:Ue,inline:Ae}}static lex(e,t){return new Bt(t).lex(e)}static lexInline(e,t){return new Bt(t).inlineTokens(e)}lex(e){e=e.replace(K.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let i=this.inlineQueue[t];this.inlineTokens(i.src,i.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],i=!1){for(this.options.pedantic&&(e=e.replace(K.tabCharGlobal,"    ").replace(K.spaceLine,""));e;){let s;if(this.options.extensions?.block?.some(a=>(s=a.call({lexer:this},e,t))?(e=e.substring(s.raw.length),t.push(s),!0):!1))continue;if(s=this.tokenizer.space(e)){e=e.substring(s.raw.length);let a=t.at(-1);s.raw.length===1&&a!==void 0?a.raw+=`
`:t.push(s);continue}if(s=this.tokenizer.code(e)){e=e.substring(s.raw.length);let a=t.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.at(-1).src=a.text):t.push(s);continue}if(s=this.tokenizer.fences(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.heading(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.hr(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.blockquote(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.list(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.html(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.def(e)){e=e.substring(s.raw.length);let a=t.at(-1);a?.type==="paragraph"||a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.raw,this.inlineQueue.at(-1).src=a.text):this.tokens.links[s.tag]||(this.tokens.links[s.tag]={href:s.href,title:s.title},t.push(s));continue}if(s=this.tokenizer.table(e)){e=e.substring(s.raw.length),t.push(s);continue}if(s=this.tokenizer.lheading(e)){e=e.substring(s.raw.length),t.push(s);continue}let r=e;if(this.options.extensions?.startBlock){let a=1/0,l=e.slice(1),o;this.options.extensions.startBlock.forEach(c=>{o=c.call({lexer:this},l),typeof o=="number"&&o>=0&&(a=Math.min(a,o))}),a<1/0&&a>=0&&(r=e.substring(0,a+1))}if(this.state.top&&(s=this.tokenizer.paragraph(r))){let a=t.at(-1);i&&a?.type==="paragraph"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(s),i=r.length!==e.length,e=e.substring(s.raw.length);continue}if(s=this.tokenizer.text(e)){e=e.substring(s.raw.length);let a=t.at(-1);a?.type==="text"?(a.raw+=(a.raw.endsWith(`
`)?"":`
`)+s.raw,a.text+=`
`+s.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=a.text):t.push(s);continue}if(e){let a="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(a);break}else throw new Error(a)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){let i=e,s=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(s=this.tokenizer.rules.inline.reflinkSearch.exec(i))!=null;)o.includes(s[0].slice(s[0].lastIndexOf("[")+1,-1))&&(i=i.slice(0,s.index)+"["+"a".repeat(s[0].length-2)+"]"+i.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(s=this.tokenizer.rules.inline.anyPunctuation.exec(i))!=null;)i=i.slice(0,s.index)+"++"+i.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let r;for(;(s=this.tokenizer.rules.inline.blockSkip.exec(i))!=null;)r=s[2]?s[2].length:0,i=i.slice(0,s.index+r)+"["+"a".repeat(s[0].length-r-2)+"]"+i.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);i=this.options.hooks?.emStrongMask?.call({lexer:this},i)??i;let a=!1,l="";for(;e;){a||(l=""),a=!1;let o;if(this.options.extensions?.inline?.some(u=>(o=u.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let u=t.at(-1);o.type==="text"&&u?.type==="text"?(u.raw+=o.raw,u.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,i,l)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e,i,l)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let c=e;if(this.options.extensions?.startInline){let u=1/0,m=e.slice(1),p;this.options.extensions.startInline.forEach(f=>{p=f.call({lexer:this},m),typeof p=="number"&&p>=0&&(u=Math.min(u,p))}),u<1/0&&u>=0&&(c=e.substring(0,u+1))}if(o=this.tokenizer.inlineText(c)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(l=o.raw.slice(-1)),a=!0;let u=t.at(-1);u?.type==="text"?(u.raw+=o.raw,u.text+=o.text):t.push(o);continue}if(e){let u="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(u);break}else throw new Error(u)}}return t}},We=class{options;parser;constructor(n){this.options=n||ye}space(n){return""}code({text:n,lang:e,escaped:t}){let i=(e||"").match(K.notSpaceStart)?.[0],s=n.replace(K.endingNewline,"")+`
`;return i?'<pre><code class="language-'+ae(i)+'">'+(t?s:ae(s,!0))+`</code></pre>
`:"<pre><code>"+(t?s:ae(s,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}def(n){return""}heading({tokens:n,depth:e}){return`<h${e}>${this.parser.parseInline(n)}</h${e}>
`}hr(n){return`<hr>
`}list(n){let e=n.ordered,t=n.start,i="";for(let a=0;a<n.items.length;a++){let l=n.items[a];i+=this.listitem(l)}let s=e?"ol":"ul",r=e&&t!==1?' start="'+t+'"':"";return"<"+s+r+`>
`+i+"</"+s+`>
`}listitem(n){return`<li>${this.parser.parse(n.tokens)}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let e="",t="";for(let s=0;s<n.header.length;s++)t+=this.tablecell(n.header[s]);e+=this.tablerow({text:t});let i="";for(let s=0;s<n.rows.length;s++){let r=n.rows[s];t="";for(let a=0;a<r.length;a++)t+=this.tablecell(r[a]);i+=this.tablerow({text:t})}return i&&(i=`<tbody>${i}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+i+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){let e=this.parser.parseInline(n.tokens),t=n.header?"th":"td";return(n.align?`<${t} align="${n.align}">`:`<${t}>`)+e+`</${t}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${ae(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:e,tokens:t}){let i=this.parser.parseInline(t),s=Fi(n);if(s===null)return i;n=s;let r='<a href="'+n+'"';return e&&(r+=' title="'+ae(e)+'"'),r+=">"+i+"</a>",r}image({href:n,title:e,text:t,tokens:i}){i&&(t=this.parser.parseInline(i,this.parser.textRenderer));let s=Fi(n);if(s===null)return ae(t);n=s;let r=`<img src="${n}" alt="${ae(t)}"`;return e&&(r+=` title="${ae(e)}"`),r+=">",r}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:ae(n.text)}},_t=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}checkbox({raw:n}){return n}},ie=class zt{options;renderer;textRenderer;constructor(e){this.options=e||ye,this.options.renderer=this.options.renderer||new We,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new _t}static parse(e,t){return new zt(t).parse(e)}static parseInline(e,t){return new zt(t).parseInline(e)}parse(e){let t="";for(let i=0;i<e.length;i++){let s=e[i];if(this.options.extensions?.renderers?.[s.type]){let a=s,l=this.options.extensions.renderers[a.type].call({parser:this},a);if(l!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(a.type)){t+=l||"";continue}}let r=s;switch(r.type){case"space":{t+=this.renderer.space(r);break}case"hr":{t+=this.renderer.hr(r);break}case"heading":{t+=this.renderer.heading(r);break}case"code":{t+=this.renderer.code(r);break}case"table":{t+=this.renderer.table(r);break}case"blockquote":{t+=this.renderer.blockquote(r);break}case"list":{t+=this.renderer.list(r);break}case"checkbox":{t+=this.renderer.checkbox(r);break}case"html":{t+=this.renderer.html(r);break}case"def":{t+=this.renderer.def(r);break}case"paragraph":{t+=this.renderer.paragraph(r);break}case"text":{t+=this.renderer.text(r);break}default:{let a='Token with "'+r.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return t}parseInline(e,t=this.renderer){let i="";for(let s=0;s<e.length;s++){let r=e[s];if(this.options.extensions?.renderers?.[r.type]){let l=this.options.extensions.renderers[r.type].call({parser:this},r);if(l!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(r.type)){i+=l||"";continue}}let a=r;switch(a.type){case"escape":{i+=t.text(a);break}case"html":{i+=t.html(a);break}case"link":{i+=t.link(a);break}case"image":{i+=t.image(a);break}case"checkbox":{i+=t.checkbox(a);break}case"strong":{i+=t.strong(a);break}case"em":{i+=t.em(a);break}case"codespan":{i+=t.codespan(a);break}case"br":{i+=t.br(a);break}case"del":{i+=t.del(a);break}case"text":{i+=t.text(a);break}default:{let l='Token with "'+a.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return i}},Te=class{options;block;constructor(n){this.options=n||ye}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}emStrongMask(n){return n}provideLexer(){return this.block?te.lex:te.lexInline}provideParser(){return this.block?ie.parse:ie.parseInline}},Fa=class{defaults=Ht();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=ie;Renderer=We;TextRenderer=_t;Lexer=te;Tokenizer=je;Hooks=Te;constructor(...n){this.use(...n)}walkTokens(n,e){let t=[];for(let i of n)switch(t=t.concat(e.call(this,i)),i.type){case"table":{let s=i;for(let r of s.header)t=t.concat(this.walkTokens(r.tokens,e));for(let r of s.rows)for(let a of r)t=t.concat(this.walkTokens(a.tokens,e));break}case"list":{let s=i;t=t.concat(this.walkTokens(s.items,e));break}default:{let s=i;this.defaults.extensions?.childTokens?.[s.type]?this.defaults.extensions.childTokens[s.type].forEach(r=>{let a=s[r].flat(1/0);t=t.concat(this.walkTokens(a,e))}):s.tokens&&(t=t.concat(this.walkTokens(s.tokens,e)))}}return t}use(...n){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(t=>{let i={...t};if(i.async=this.defaults.async||i.async||!1,t.extensions&&(t.extensions.forEach(s=>{if(!s.name)throw new Error("extension name required");if("renderer"in s){let r=e.renderers[s.name];r?e.renderers[s.name]=function(...a){let l=s.renderer.apply(this,a);return l===!1&&(l=r.apply(this,a)),l}:e.renderers[s.name]=s.renderer}if("tokenizer"in s){if(!s.level||s.level!=="block"&&s.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let r=e[s.level];r?r.unshift(s.tokenizer):e[s.level]=[s.tokenizer],s.start&&(s.level==="block"?e.startBlock?e.startBlock.push(s.start):e.startBlock=[s.start]:s.level==="inline"&&(e.startInline?e.startInline.push(s.start):e.startInline=[s.start]))}"childTokens"in s&&s.childTokens&&(e.childTokens[s.name]=s.childTokens)}),i.extensions=e),t.renderer){let s=this.defaults.renderer||new We(this.defaults);for(let r in t.renderer){if(!(r in s))throw new Error(`renderer '${r}' does not exist`);if(["options","parser"].includes(r))continue;let a=r,l=t.renderer[a],o=s[a];s[a]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=o.apply(s,c)),u||""}}i.renderer=s}if(t.tokenizer){let s=this.defaults.tokenizer||new je(this.defaults);for(let r in t.tokenizer){if(!(r in s))throw new Error(`tokenizer '${r}' does not exist`);if(["options","rules","lexer"].includes(r))continue;let a=r,l=t.tokenizer[a],o=s[a];s[a]=(...c)=>{let u=l.apply(s,c);return u===!1&&(u=o.apply(s,c)),u}}i.tokenizer=s}if(t.hooks){let s=this.defaults.hooks||new Te;for(let r in t.hooks){if(!(r in s))throw new Error(`hook '${r}' does not exist`);if(["options","block"].includes(r))continue;let a=r,l=t.hooks[a],o=s[a];Te.passThroughHooks.has(r)?s[a]=c=>{if(this.defaults.async&&Te.passThroughHooksRespectAsync.has(r))return(async()=>{let m=await l.call(s,c);return o.call(s,m)})();let u=l.call(s,c);return o.call(s,u)}:s[a]=(...c)=>{if(this.defaults.async)return(async()=>{let m=await l.apply(s,c);return m===!1&&(m=await o.apply(s,c)),m})();let u=l.apply(s,c);return u===!1&&(u=o.apply(s,c)),u}}i.hooks=s}if(t.walkTokens){let s=this.defaults.walkTokens,r=t.walkTokens;i.walkTokens=function(a){let l=[];return l.push(r.call(this,a)),s&&(l=l.concat(s.call(this,a))),l}}this.defaults={...this.defaults,...i}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,e){return te.lex(n,e??this.defaults)}parser(n,e){return ie.parse(n,e??this.defaults)}parseMarkdown(n){return(e,t)=>{let i={...t},s={...this.defaults,...i},r=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return r(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return r(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return r(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=n),s.async)return(async()=>{let a=s.hooks?await s.hooks.preprocess(e):e,l=await(s.hooks?await s.hooks.provideLexer():n?te.lex:te.lexInline)(a,s),o=s.hooks?await s.hooks.processAllTokens(l):l;s.walkTokens&&await Promise.all(this.walkTokens(o,s.walkTokens));let c=await(s.hooks?await s.hooks.provideParser():n?ie.parse:ie.parseInline)(o,s);return s.hooks?await s.hooks.postprocess(c):c})().catch(r);try{s.hooks&&(e=s.hooks.preprocess(e));let a=(s.hooks?s.hooks.provideLexer():n?te.lex:te.lexInline)(e,s);s.hooks&&(a=s.hooks.processAllTokens(a)),s.walkTokens&&this.walkTokens(a,s.walkTokens);let l=(s.hooks?s.hooks.provideParser():n?ie.parse:ie.parseInline)(a,s);return s.hooks&&(l=s.hooks.postprocess(l)),l}catch(a){return r(a)}}}onError(n,e){return t=>{if(t.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let i="<p>An error occurred:</p><pre>"+ae(t.message+"",!0)+"</pre>";return e?Promise.resolve(i):i}if(e)return Promise.reject(t);throw t}}},fe=new Fa;function N(n,e){return fe.parse(n,e)}N.options=N.setOptions=function(n){return fe.setOptions(n),N.defaults=fe.defaults,_i(N.defaults),N};N.getDefaults=Ht;N.defaults=ye;N.use=function(...n){return fe.use(...n),N.defaults=fe.defaults,_i(N.defaults),N};N.walkTokens=function(n,e){return fe.walkTokens(n,e)};N.parseInline=fe.parseInline;N.Parser=ie;N.parser=ie.parse;N.Renderer=We;N.TextRenderer=_t;N.Lexer=te;N.lexer=te.lex;N.Tokenizer=je;N.Hooks=Te;N.parse=N;N.options;N.setOptions;N.use;N.walkTokens;N.parseInline;ie.parse;te.lex;var Va=()=>{let n,e=null,t;function i(){if(e&&!e.closed)e.focus();else{if(e=window.open("about:blank","reveal.js - Notes","width=1100,height=700"),e.marked=N,e.document.write(Qs),!e){alert("Speaker view popup failed to open. Please make sure popups are allowed and reopen the speaker view.");return}r()}}function s(m){e&&!e.closed?e.focus():(e=m,window.addEventListener("message",c),u())}function r(){let m=t.getConfig().url,p=typeof m=="string"?m:window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search;n=setInterval(function(){e.postMessage(JSON.stringify({namespace:"reveal-notes",type:"connect",state:t.getState(),url:p}),"*")},500),window.addEventListener("message",c)}function a(m,p,f){let h=t[m].apply(t,p);e.postMessage(JSON.stringify({namespace:"reveal-notes",type:"return",result:h,callId:f}),"*")}function l(m){let p=t.getCurrentSlide(),f=p.querySelectorAll("aside.notes"),h=p.querySelector(".current-fragment"),k={namespace:"reveal-notes",type:"state",notes:"",markdown:!1,whitespace:"normal",state:t.getState()};if(p.hasAttribute("data-notes")&&(k.notes=p.getAttribute("data-notes"),k.whitespace="pre-wrap"),h){let T=h.querySelector("aside.notes");T?(k.notes=T.innerHTML,k.markdown=typeof T.getAttribute("data-markdown")=="string",f=null):h.hasAttribute("data-notes")&&(k.notes=h.getAttribute("data-notes"),k.whitespace="pre-wrap",f=null)}f&&f.length&&(f=Array.from(f).filter(T=>T.closest(".fragment")===null),k.notes=f.map(T=>T.innerHTML).join(`
`),k.markdown=f[0]&&typeof f[0].getAttribute("data-markdown")=="string"),e.postMessage(JSON.stringify(k),"*")}function o(m){try{return window.location.origin===m.source.location.origin}catch{return!1}}function c(m){if(o(m))try{let p=JSON.parse(m.data);p&&p.namespace==="reveal-notes"&&p.type==="connected"?(clearInterval(n),u()):p&&p.namespace==="reveal-notes"&&p.type==="call"&&a(p.methodName,p.arguments,p.callId)}catch{}}function u(){t.on("slidechanged",l),t.on("fragmentshown",l),t.on("fragmenthidden",l),t.on("overviewhidden",l),t.on("overviewshown",l),t.on("paused",l),t.on("resumed",l),t.on("previewiframe",l),t.on("previewimage",l),t.on("previewvideo",l),t.on("closeoverlay",l),l()}return{id:"notes",init:function(m){t=m,/receiver/i.test(window.location.search)||(window.location.search.match(/(\?|\&)notes/gi)!==null?i():window.addEventListener("message",p=>{if(!e&&typeof p.data=="string"){let f;try{f=JSON.parse(p.data)}catch{}f&&f.namespace==="reveal-notes"&&f.type==="heartbeat"&&s(p.source)}}),t.addKeyBinding({keyCode:83,key:"S",description:"Speaker notes view"},function(){i()}))},open:i}},is=Va;var Ua=()=>{let n,e,t,i,s,r,a;function l(){e=document.createElement("div"),e.classList.add("searchbox"),e.style.position="absolute",e.style.top="10px",e.style.right="10px",e.style.zIndex=10,e.innerHTML=`<input type="search" class="searchinput" placeholder="Search..." style="vertical-align: top;"/>
		</span>`,t=e.querySelector(".searchinput"),t.style.width="240px",t.style.fontSize="14px",t.style.padding="4px 6px",t.style.color="#000",t.style.background="#fff",t.style.borderRadius="2px",t.style.border="0",t.style.outline="0",t.style.boxShadow="0 2px 18px rgba(0, 0, 0, 0.2)",t.style["-webkit-appearance"]="none",n.getRevealElement().appendChild(e),t.addEventListener("keyup",function(f){f.keyCode===13?(f.preventDefault(),m(),r=!1):r=!0},!1),c()}function o(){e||l(),e.style.display="inline",t.focus(),t.select()}function c(){e||l(),e.style.display="none",a&&a.remove()}function u(){e||l(),e.style.display!=="inline"?o():c()}function m(){if(r){var f=t.value;f===""?(a&&a.remove(),i=null):(a=new p("slidecontent"),i=a.apply(f),s=0)}i&&(i.length&&i.length<=s&&(s=0),i.length>s&&(n.slide(i[s].h,i[s].v),s++))}function p(f,h){var k=document.getElementById(f)||document.body,T=h||"EM",F=new RegExp("^(?:"+T+"|SCRIPT|FORM)$"),O=["#ff6","#a0ffff","#9f9","#f99","#f6f"],J=[],V=0,x="",M=[];this.setRegex=function(A){A=A.trim(),x=new RegExp("("+A+")","i")},this.getRegex=function(){return x.toString().replace(/^\/\\b\(|\)\\b\/i$/g,"").replace(/\|/g," ")},this.hiliteWords=function(A){if(!(A==null||!A)&&x&&!F.test(A.nodeName)){if(A.hasChildNodes())for(var P=0;P<A.childNodes.length;P++)this.hiliteWords(A.childNodes[P]);if(A.nodeType==3){var $,E;if(($=A.nodeValue)&&(E=x.exec($))){for(var D=A;D!=null&&D.nodeName!="SECTION";)D=D.parentNode;for(var L=n.getIndices(D),v=M.length,R=!1,P=0;P<v;P++)M[P].h===L.h&&M[P].v===L.v&&(R=!0);R||M.push(L),J[E[0].toLowerCase()]||(J[E[0].toLowerCase()]=O[V++%O.length]);var C=document.createElement(T);C.appendChild(document.createTextNode(E[0])),C.style.backgroundColor=J[E[0].toLowerCase()],C.style.fontStyle="inherit",C.style.color="#000";var X=A.splitText(E.index);X.nodeValue=X.nodeValue.substring(E[0].length),A.parentNode.insertBefore(C,X)}}}},this.remove=function(){for(var A=document.getElementsByTagName(T),P;A.length&&(P=A[0]);)P.parentNode.replaceChild(P.firstChild,P)},this.apply=function(A){if(!(A==null||!A))return this.remove(),this.setRegex(A),this.hiliteWords(k),M}}return{id:"search",init:f=>{n=f,n.registerKeyboardShortcut("CTRL + Shift + F","Search"),document.addEventListener("keydown",function(h){h.key=="F"&&(h.ctrlKey||h.metaKey)&&(h.preventDefault(),u())},!1)},open:o,close:c,toggle:u}},ss=Ua;window.Reveal=ee;ee.initialize({width:960,height:720,margin:0,controls:!0,controlsLayout:"bottom-right",controlsTutorial:!1,controlsBackArrows:"faded",progress:!1,slideNumber:"c/t",showSlideNumber:"all",hashOneBasedIndex:!0,hash:!0,respondToHashChanges:!1,jumpToSlide:!0,history:!1,keyboard:!0,keyboardCondition:null,disableLayout:!1,overview:!0,center:!1,touch:!0,loop:!1,rtl:!1,navigationMode:"linear",shuffle:!1,fragments:!0,fragmentInURL:!0,embedded:!1,help:!0,pause:!1,showNotes:!1,autoPlayMedia:null,preloadIframes:null,autoAnimate:!1,mouseWheel:!1,previewLinks:!1,transition:"none",transitionSpeed:"fast",backgroundTransition:"none",scrollLayout:"compact",scrollSnap:!1,pdfMaxPagesPerSlide:1,pdfSeparateFragments:!1,viewDistance:2,plugins:[is,ss]});ee.addKeyBinding({keyCode:86,key:"V",description:"Toggle Scroll View"},()=>{let n=new URL(window.location.href);n.searchParams.get("view")==="scroll"?n.searchParams.delete("view"):n.searchParams.set("view","scroll"),window.location.replace(n)});export{ee as Reveal};
