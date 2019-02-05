kontra={init(t){var e=this.canvas=document.getElementById(t)||t||document.querySelector("canvas");this.context=e.getContext("2d"),this._init()},_noop:new Function,_tick:new Function,_init:new Function},function(){let t,e=/(jpeg|jpg|gif|png)$/,i=/(wav|mp3|ogg|aac)$/,n=/^no$/,s=/^\//,h=/\/$/,a=new Audio,o={wav:"",mp3:a.canPlayType("audio/mpeg;").replace(n,""),ogg:a.canPlayType('audio/ogg; codecs="vorbis"').replace(n,""),aac:a.canPlayType("audio/aac;").replace(n,"")};function r(t,e){return[t.replace(h,""),t?e.replace(s,""):e].filter(t=>t).join("/")}function c(t){return t.split(".").pop()}function d(t){let e=t.replace("."+c(t),"");return 2==e.split("/").length?e.replace(s,""):e}function u(e,i){return new Promise(function(n,s){let h=new Image;i=r(t.imagePath,e),h.onload=function(){let s=t._u(i,window.location.href);t.images[d(e)]=t.images[i]=t.images[s]=this,n(this)},h.onerror=function(){s(i)},h.src=i})}function l(e,i,n){return new Promise(function(s,h){if(e=[].concat(e).reduce(function(t,e){return o[c(e)]?e:t},n)){let n=new Audio;i=r(t.audioPath,e),n.addEventListener("canplay",function(){let n=t._u(i,window.location.href);t.audio[d(e)]=t.audio[i]=t.audio[n]=this,s(this)}),n.onerror=function(){h(i)},n.src=i,n.load()}else h(e)})}function f(e,i){return i=r(t.dataPath,e),fetch(i).then(function(t){if(!t.ok)throw t;return t.clone().json().catch(function(){return t.text()})}).then(function(n){let s=t._u(i,window.location.href);return"object"==typeof n&&t._d.set(n,s),t.data[d(e)]=t.data[i]=t.data[s]=n,n})}t=kontra.assets={images:{},audio:{},data:{},_d:new WeakMap,_u:(t,e)=>new URL(t,e).href,imagePath:"",audioPath:"",dataPath:"",load(){let t,n,s,h,a,o=[];for(h=0;s=arguments[h];h++)a=(n=c(t=[].concat(s)[0])).match(e)?u(s):n.match(i)?l(s):f(s),o.push(a);return Promise.all(o)}}}(),kontra.gameLoop=function(t){let e,i,n,s,h=(t=t||{}).fps||60,a=0,o=1e3/h,r=1/h,c=!1===t.clearCanvas?kontra._noop:function(){kontra.context.clearRect(0,0,kontra.canvas.width,kontra.canvas.height)};function d(){if(i=requestAnimationFrame(d),n=performance.now(),s=n-e,e=n,!(s>1e3)){for(kontra._tick(),a+=s;a>=o;)u.update(r),a-=o;c(),u.render()}}let u={update:t.update,render:t.render,isStopped:!0,start(){e=performance.now(),this.isStopped=!1,requestAnimationFrame(d)},stop(){this.isStopped=!0,cancelAnimationFrame(i)}};return u},function(){let t={},e={},n={13:"enter",27:"esc",32:"space",37:"left",38:"up",39:"right",40:"down"};for(let t=0;t<26;t++)n[65+t]=(10+t).toString(36);for(i=0;i<10;i++)n[48+i]=""+i;addEventListener("keydown",function(i){let s=n[i.which];e[s]=!0,t[s]&&t[s](i)}),addEventListener("keyup",function(t){e[n[t.which]]=!1}),addEventListener("blur",function(t){e={}}),kontra.keys={map:n,bind(e,i){[].concat(e).map(function(e){t[e]=i})},unbind(e,i){[].concat(e).map(function(e){t[e]=i})},pressed:t=>!!e[t]}}(),function(){let t,e=[],i=[],n={},s=[],h={},a={0:"left",1:"middle",2:"right"};function o(e){let i=e.x,n=e.y;e.anchor&&(i-=e.width*e.anchor.x,n-=e.height*e.anchor.y);let s=t.x-Math.max(i,Math.min(t.x,i+e.width)),h=t.y-Math.max(n,Math.min(t.y,n+e.height));return s*s+h*h<t.radius*t.radius}function r(){let n,s,h=i.length?i:e;for(let e=h.length-1;e>=0;e--)if(s=(n=h[e]).collidesWithPointer?n.collidesWithPointer(t):o(n))return n}function c(t){let e=void 0!==t.button?a[t.button]:"left";h[e]=!0,f(t,"onDown")}function d(t){let e=void 0!==t.button?a[t.button]:"left";h[e]=!1,f(t,"onUp")}function u(t){f(t,"onOver")}function l(t){h={}}function f(e,i){if(!kontra.canvas)return;let s,h;-1!==["touchstart","touchmove","touchend"].indexOf(e.type)?(s=(e.touches[0]||e.changedTouches[0]).clientX,h=(e.touches[0]||e.changedTouches[0]).clientY):(s=e.clientX,h=e.clientY);let a,o=kontra.canvas.height/kontra.canvas.offsetHeight,c=kontra.canvas.getBoundingClientRect(),d=(s-c.left)*o,u=(h-c.top)*o;t.x=d,t.y=u,e.target===kontra.canvas&&(e.preventDefault(),(a=r())&&a[i]&&a[i](e)),n[i]&&n[i](e,a)}t=kontra.pointer={x:0,y:0,radius:5,track(t){[].concat(t).map(function(t){t._r||(t._r=t.render,t.render=function(){e.push(this),this._r()},s.push(t))})},untrack(t,e){[].concat(t).map(function(t){t.render=t._r,t._r=e;let i=s.indexOf(t);-1!==i&&s.splice(i,1)})},over:t=>-1!==s.indexOf(t)&&r()===t,onDown(t){n.onDown=t},onUp(t){n.onUp=t},pressed:t=>!!h[t]},kontra._tick=function(){i.length=0,e.map(function(t){i.push(t)}),e.length=0},kontra._init=function(){kontra.canvas.addEventListener("mousedown",c),kontra.canvas.addEventListener("touchstart",c),kontra.canvas.addEventListener("mouseup",d),kontra.canvas.addEventListener("touchend",d),kontra.canvas.addEventListener("blur",l),kontra.canvas.addEventListener("mousemove",u),kontra.canvas.addEventListener("touchmove",u)}}(),kontra.pool=function(t){let e=0;return{_c:(t=t||{}).create,objects:[t.create()],size:1,maxSize:t.maxSize||1024,get(t){if(t=t||{},this.objects.length==e){if(this.size===this.maxSize)return;for(let t=0;t<this.size&&this.objects.length<this.maxSize;t++)this.objects.unshift(this._c());this.size=this.objects.length}let i=this.objects.shift();return i.init(t),this.objects.push(i),e++,i},getAliveObjects(){return this.objects.slice(this.objects.length-e)},clear(){e=this.objects.length=0,this.size=1,this.objects.push(this._c())},update(t){let i,n=this.size-1,s=Math.max(this.objects.length-e,0);for(;n>=s;)(i=this.objects[n]).update(t),i.isAlive()?n--:(this.objects=this.objects.splice(n,1).concat(this.objects),e--,s++)},render(){let t=Math.max(this.objects.length-e,0);for(let e=this.size-1;e>=t;e--)this.objects[e].render()}}},kontra.quadtree=function(t){return{maxDepth:(t=t||{}).maxDepth||3,maxObjects:t.maxObjects||25,_b:!1,_d:t.depth||0,bounds:t.bounds||{x:0,y:0,width:kontra.canvas.width,height:kontra.canvas.height},objects:[],subnodes:[],clear(){this.subnodes.map(function(t){t.clear()}),this._b=!1,this.objects.length=0},get(t){let e,i,n=[];for(;this.subnodes.length&&this._b;){for(e=this._g(t),i=0;i<e.length;i++)n.push.apply(n,this.subnodes[e[i]].get(t));return n}return this.objects},add(){let t,e,i,n;for(e=0;e<arguments.length;e++)if(i=arguments[e],Array.isArray(i))this.add.apply(this,i);else if(this._b)this._a(i);else if(this.objects.push(i),this.objects.length>this.maxObjects&&this._d<this.maxDepth){for(this._s(),t=0;n=this.objects[t];t++)this._a(n);this.objects.length=0}},_a(t,e,i){for(e=this._g(t),i=0;i<e.length;i++)this.subnodes[e[i]].add(t)},_g(t){let e=[],i=this.bounds.x+this.bounds.width/2,n=this.bounds.y+this.bounds.height/2,s=t.y<n&&t.y+t.height>=this.bounds.y,h=t.y+t.height>=n&&t.y<this.bounds.y+this.bounds.height;return t.x<i&&t.x+t.width>=this.bounds.x&&(s&&e.push(0),h&&e.push(2)),t.x+t.width>=i&&t.x<this.bounds.x+this.bounds.width&&(s&&e.push(1),h&&e.push(3)),e},_s(t,e,i){if(this._b=!0,!this.subnodes.length)for(t=this.bounds.width/2|0,e=this.bounds.height/2|0,i=0;i<4;i++)this.subnodes[i]=kontra.quadtree({bounds:{x:this.bounds.x+(i%2==1?t:0),y:this.bounds.y+(i>=2?e:0),width:t,height:e},depth:this._d+1,maxDepth:this.maxDepth,maxObjects:this.maxObjects})}}},function(){class t{constructor(t,e){this._x=t||0,this._y=e||0}add(t,e){this.x+=(t.x||0)*(e||1),this.y+=(t.y||0)*(e||1)}clamp(t,e,i,n){this._c=!0,this._a=t,this._b=e,this._d=i,this._e=n}get x(){return this._x}get y(){return this._y}set x(t){this._x=this._c?Math.min(Math.max(this._a,t),this._d):t}set y(t){this._y=this._c?Math.min(Math.max(this._b,t),this._e):t}}kontra.vector=((e,i)=>new t(e,i)),kontra.vector.prototype=t.prototype;class e{init(t,e,i,n){for(e in t=t||{},this.position=kontra.vector(t.x,t.y),this.velocity=kontra.vector(t.dx,t.dy),this.acceleration=kontra.vector(t.ddx,t.ddy),this.width=this.height=this.rotation=0,this.ttl=1/0,this.anchor={x:0,y:0},this.context=kontra.context,t)this[e]=t[e];if(i=t.image)this.image=i,this.width=i.width,this.height=i.height;else if(i=t.animations){for(e in i)this.animations[e]=i[e].clone(),n=n||i[e];this._ca=n,this.width=n.width,this.height=n.height}return this}get x(){return this.position.x}get y(){return this.position.y}get dx(){return this.velocity.x}get dy(){return this.velocity.y}get ddx(){return this.acceleration.x}get ddy(){return this.acceleration.y}set x(t){this.position.x=t}set y(t){this.position.y=t}set dx(t){this.velocity.x=t}set dy(t){this.velocity.y=t}set ddx(t){this.acceleration.x=t}set ddy(t){this.acceleration.y=t}isAlive(){return this.ttl>0}collidesWith(t){if(this.rotation||t.rotation)return null;let e=this.x-this.width*this.anchor.x,i=this.y-this.height*this.anchor.y,n=t.x,s=t.y;return t.anchor&&(n-=t.width*t.anchor.x,s-=t.height*t.anchor.y),e<n+t.width&&e+this.width>n&&i<s+t.height&&i+this.height>s}update(t){this.advance(t)}render(){this.draw()}playAnimation(t){this._ca=this.animations[t],this._ca.loop||this._ca.reset()}advance(t){this.velocity.add(this.acceleration,t),this.position.add(this.velocity,t),this.ttl--,this._ca&&this._ca.update(t)}draw(){let t=-this.width*this.anchor.x,e=-this.height*this.anchor.y;this.context.save(),this.context.translate(this.x,this.y),this.rotation&&this.context.rotate(this.rotation),this.image?this.context.drawImage(this.image,t,e):this._ca?this._ca.render({x:t,y:e,context:this.context}):(this.context.fillStyle=this.color,this.context.fillRect(t,e,this.width,this.height)),this.context.restore()}}kontra.sprite=(t=>(new e).init(t)),kontra.sprite.prototype=e.prototype}(),function(){class t{constructor(t,e){t=t||{},this.spriteSheet=t.spriteSheet,this.frames=t.frames,this.frameRate=t.frameRate,this.loop=void 0===t.loop||t.loop,e=t.spriteSheet.frame,this.width=e.width,this.height=e.height,this.margin=e.margin||0,this._f=0,this._a=0}clone(){return kontra.animation(this)}reset(){this._f=0,this._a=0}update(t){if(this.loop||this._f!=this.frames.length-1)for(t=t||1/60,this._a+=t;this._a*this.frameRate>=1;)this._f=++this._f%this.frames.length,this._a-=1/this.frameRate}render(t){t=t||{};let e=this.frames[this._f]/this.spriteSheet._f|0,i=this.frames[this._f]%this.spriteSheet._f|0;(t.context||kontra.context).drawImage(this.spriteSheet.image,i*this.width+(2*i+1)*this.margin,e*this.height+(2*e+1)*this.margin,this.width,this.height,t.x,t.y,this.width,this.height)}}kontra.animation=function(e){return new t(e)},kontra.animation.prototype=t.prototype;class e{constructor(t){t=t||{},this.animations={},this.image=t.image,this.frame={width:t.frameWidth,height:t.frameHeight,margin:t.frameMargin},this._f=t.image.width/t.frameWidth|0,this.createAnimations(t.animations)}createAnimations(t){let e,i,n,s;for(s in t)i=(e=t[s]).frames,n=[],[].concat(i).map(function(t){n=n.concat(this._p(t))},this),this.animations[s]=kontra.animation({spriteSheet:this,frames:n,frameRate:e.frameRate,loop:e.loop})}_p(t,e){if(+t===t)return t;let i=[],n=t.split(".."),s=e=+n[0],h=+n[1];if(s<h)for(;e<=h;e++)i.push(e);else for(;e>=h;e--)i.push(e);return i}}kontra.spriteSheet=function(t){return new e(t)},kontra.spriteSheet.prototype=e.prototype}(),kontra.store={set(t,e){void 0===e?localStorage.removeItem(t):localStorage.setItem(t,JSON.stringify(e))},get(t){let e=localStorage.getItem(t);try{e=JSON.parse(e)}catch(t){}return e}},kontra.tileEngine=function(t){let e=t.width*t.tilewidth,i=t.height*t.tileheight,n=document.createElement("canvas"),s=n.getContext("2d");n.width=e,n.height=i;let h={},a={},o=Object.assign({mapwidth:e,mapheight:i,_sx:0,_sy:0,get sx(){return this._sx},get sy(){return this._sy},set sx(t){this._sx=Math.min(Math.max(0,t),e-kontra.canvas.width)},set sy(t){this._sy=Math.min(Math.max(0,t),i-kontra.canvas.height)},render(){d(n)},renderLayer(t){let n=a[t],s=h[t];n||((n=document.createElement("canvas")).width=e,n.height=i,a[t]=n,o._r(s,n.getContext("2d"))),d(n)},layerCollidesWith(t,e){let i=r(e.y),n=c(e.x),s=r(e.y+e.height),a=c(e.x+e.width),o=h[t];for(let t=i;t<=s;t++)for(let e=n;e<=a;e++)if(o.data[e+t*this.width])return!0;return!1},tileAtLayer(t,e){let i=e.row||r(e.y),n=e.col||c(e.x);return h[t]?h[t].data[n+i*o.width]:-1},_r:function(t,e){e.save(),e.globalAlpha=t.opacity,t.data.forEach((t,i)=>{if(!t)return;let n;for(let e=o.tilesets.length-1;e>=0&&(n=o.tilesets[e],!(t/n.firstgid>=1));e--);let s=n.tilewidth||o.tilewidth,h=n.tileheight||o.tileheight,a=n.margin||0,r=n.image,c=t-n.firstgid,d=n.columns||r.width/(s+a)|0,u=i%o.width*s,l=(i/o.width|0)*h,f=c%d*(s+a),g=(c/d|0)*(h+a);e.drawImage(r,f,g,s,h,u,l,s,h)}),e.restore()}},t);function r(t){return(o.sy+t)/o.tileheight|0}function c(t){return(o.sx+t)/o.tilewidth|0}function d(t){(o.context||kontra.context).drawImage(t,o.sx,o.sy,kontra.canvas.width,kontra.canvas.height,0,0,kontra.canvas.width,kontra.canvas.height)}return o.tilesets.forEach(e=>{let i=(kontra.assets?kontra.assets._d.get(t):"")||window.location.href;if(e.source){let t=kontra.assets.data[kontra.assets._u(e.source,i)];Object.keys(t).forEach(i=>{e[i]=t[i]})}if(""+e.image===e.image){let t=kontra.assets.images[kontra.assets._u(e.image,i)];e.image=t}}),o.layers&&o.layers.forEach(t=>{h[t.name]=t,!1!==t.visible&&o._r(t,s)}),o};