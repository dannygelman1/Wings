(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(8791)}])},8791:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return C}});var r,n,s=a(5893),i=a(7294),l=a(5029),o=a(1884),c=a(9477),h=a(2051),m=a(8243);let d=e=>{let{wires:t,points:a}=e,[r]=(0,i.useState)(u(t,a)),[n]=(0,i.useState)(x(t,a));return(0,s.jsxs)(s.Fragment,{children:[t.map((e,t)=>Array.from(Array(e.numParallel)).map((t,a)=>(0,s.jsx)(m.x,{points:new c.EllipseCurve(e.ax,e.ay,e.xRadius,e.yRadius,Math.PI+Math.PI/8,0-Math.PI/8,!1,0).getPoints(50).map(t=>new c.Vector3(t.x,t.y,0===a?e.zTranslate:1===a?e.spacing%2==0?e.zTranslate+e.spacing:e.zTranslate+e.spacing/2:e.zTranslate+2*e.spacing)),color:"blue",lineWidth:1,rotation:new c.Euler(0,e.rotation,0)},e.ax+e.ay+a))),t.map((e,t)=>{let a=r.get(t);return a?(0,s.jsxs)("group",{children:[(0,s.jsxs)("mesh",{position:[a[0].x,a[0].y-8,a[0].z],rotation:new c.Euler(0,e.rotation+Math.PI/2,0),children:[(0,s.jsx)("boxGeometry",{args:[1===e.numParallel?10:2===e.numParallel?1.5*e.spacing:3*e.spacing,3,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[1].x,a[1].y-8,a[1].z],rotation:new c.Euler(0,e.rotation+Math.PI/2,0),children:[(0,s.jsx)("boxGeometry",{args:[1===e.numParallel?10:2===e.numParallel?1.5*e.spacing:3*e.spacing,3,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[0].x,a[0].y-150,a[0].z],children:[(0,s.jsx)("boxGeometry",{args:[3,300,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[1].x,a[1].y-150,a[1].z],children:[(0,s.jsx)("boxGeometry",{args:[3,300,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),Array.from(Array(e.numParallel)).map((e,a)=>{let r=n.get(JSON.stringify([t,a]));return r?(0,s.jsxs)("group",{children:[(0,s.jsxs)("mesh",{position:[r[0].x,r[0].y-4,r[0].z],children:[(0,s.jsx)("cylinderGeometry",{args:[.5,1,5]}),(0,s.jsx)("meshStandardMaterial",{color:new c.Color(3355443)})]}),(0,s.jsxs)("mesh",{position:[r[1].x,r[1].y-4,r[1].z],children:[(0,s.jsx)("cylinderGeometry",{args:[.5,1,5]}),(0,s.jsx)("meshStandardMaterial",{color:new c.Color(3355443)})]})]},JSON.stringify([t,a])):(0,s.jsx)(s.Fragment,{})})]},t):(0,s.jsx)(s.Fragment,{})})]})},u=(e,t)=>{let a=new Map,r=0,n=0;for(let s=0;s<e.length;s++){n=(r=0===s?0:n+1)+50*e[s].numParallel+(e[s].numParallel-1);let i=t[r],l=t[n];if(0===e[s].rotation){let o=(i.z+l.z)/2,h=new c.Vector3(i.x,i.y,o),m=new c.Vector3(l.x,l.y,o);a.set(s,[h,m])}else{let d=(i.x+l.x)/2,u=new c.Vector3(d,i.y,i.z),x=new c.Vector3(d,l.y,l.z);a.set(s,[u,x])}}return a},x=(e,t)=>{let a=new Map,r=0,n=0;for(let s=0;s<e.length;s++)for(let i=0;i<e[s].numParallel;i++)n=(r=0===s&&0===i?0:n+1)+50,a.set(JSON.stringify([s,i]),[new c.Vector3(t[r].x,t[r].y,t[r].z),new c.Vector3(t[n].x,t[n].y,t[n].z)]);return a};(r=n||(n={}))[r.FLYING=0]="FLYING",r[r.PERCHED=1]="PERCHED";var p=a(8626);class g{incremXYZ(e,t,a){this.x+=e,this.y+=t,this.z+=a}incremVXYZ(e,t,a){this.vx+=e,this.vy+=t,this.vz+=a}incremVX(e){this.vx+=e}incremVY(e){this.vy+=e}incremVZ(e){this.vz+=e}setVX(e){this.vx=e}setVY(e){this.vy=e}setVZ(e){this.vz=e}incremX(e){this.x+=e}incremY(e){this.y+=e}incremZ(e){this.z+=e}setXYZ(e,t,a){this.x=e,this.y=t,this.z=a}setVXYZ(e,t,a){this.vx=e,this.vy=t,this.vz=a}move(e){this.x+=this.vx*e*.08,this.y+=this.vy*e*.08,this.z+=this.vz*e*.08}setWillPerch(e){this.perchProb||(this.perchProb=e)}unsetWillPerch(){this.perchProb=void 0}willPerch(){return!!this.perchProb&&this.perchProb<8}setBias(e){this.bias=e}setAction(e){this.action=e}setPerchedAt(e){this.perchedAt=e}getSpeed(){return(this.vx**2+this.vy**2+this.vz**2)**.5}getGrid(e){return[(0,h.Z)(this.x/e)*e,(0,h.Z)(this.y/e)*e,(0,h.Z)(this.z/e)*e]}getNeighbors(e){let t,a,r;let n=this.getGrid(e),s=this.x,i=this.y,l=this.z,o=n[0]+e/2,c=n[1]+e/2,h=n[2]+e/2,m=[];return t=s<o?n[0]-e:n[0]+e,a=i<c?n[1]-e:n[1]+e,r=l<h?n[2]-e:n[2]+e,m.push(JSON.stringify([n[0],a,n[2]])),m.push(JSON.stringify([n[0],a,r])),m.push(JSON.stringify([n[0],n[1],n[2]])),m.push(JSON.stringify([n[0],n[1],r])),m.push(JSON.stringify([t,a,n[2]])),m.push(JSON.stringify([t,a,r])),m.push(JSON.stringify([t,n[1],n[2]])),m.push(JSON.stringify([t,n[1],r])),m}constructor({x:e,y:t,z:a,vx:r,vy:n,vz:s,bias:i,id:l,action:o,perchDur:c,perchedAt:h,perchLoc:m,flapOffset:d}){this.x=e,this.y=t,this.z=a,this.vx=r,this.vy=n,this.vz=s,this.bias=i,this.id=l,this.action=o,this.perchDur=c,this.perchedAt=h,this.perchLoc=m,this.flapOffset=d}}let y=e=>{let{border:t,consts:a,boxOpacity:r,numberBirds:l,allPerching:m,setAllPerching:u}=e,{camera:x,gl:y,scene:f}=(0,o.z)(),V=(0,i.useRef)(null);f.add(x),V.current&&x.add(V.current);let S=(0,i.useRef)(null),w=Date.now(),[M,P]=(0,i.useState)(0),[F,E]=(0,i.useState)(Date.now()-w),[N,C]=(0,i.useState)([]),[I]=(0,i.useState)(Array.from(Array(7)).map(()=>({ax:c.MathUtils.randFloat(-100,100),ay:c.MathUtils.randFloat(-100,-50),xRadius:c.MathUtils.randFloat(50,300),yRadius:c.MathUtils.randFloat(10,80),numParallel:c.MathUtils.randInt(2,3),rotation:1===c.MathUtils.randInt(0,1)?Math.PI/2:0,spacing:c.MathUtils.randInt(12,35),zTranslate:c.MathUtils.randFloat(-200,200)}))),[A]=(0,i.useState)(z(I)),[X,Z]=(0,i.useState)(new Set),{nodes:R}=(0,p.L)("/Wings/bird.gltf"),{nodes:Y}=(0,p.L)("/Wings/perch.gltf"),[L]=(0,i.useState)(R.bird instanceof c.Mesh?R.bird:null),[O]=(0,i.useState)(R.bird001 instanceof c.Mesh?R.bird001:null),[D]=(0,i.useState)(R.bird002 instanceof c.Mesh?R.bird002:null),[T]=(0,i.useState)(Y.birdperch instanceof c.Mesh?Y.birdperch:null);return(0,i.useEffect)(()=>{let e=l-N.length;e>0?(Array.from(Array(e)).forEach(()=>{let e=j(X,A.length);N.push(new g({x:A[e].x,y:A[e].y,z:A[e].z,vx:c.MathUtils.randFloat(-2,2),vy:c.MathUtils.randFloat(-2,2),vz:c.MathUtils.randFloat(-2,2),bias:0,id:N.length,action:n.PERCHED,perchDur:c.MathUtils.randFloat(10/3,10),perchedAt:M,perchLoc:[A[e].x,A[e].y,A[e].z,A[e].w],flapOffset:c.MathUtils.randFloat(0,10)}))}),Z(X)):Array.from(Array(-1*e)).forEach(()=>N.pop()),C(N)},[l]),(0,i.useEffect)(()=>{let e=N.filter(e=>e.action!==n.PERCHED);0===e.length&&u(!1)},[N]),(0,o.A)(e=>{if(P(e.clock.getElapsedTime()),E(Date.now()-w),0===N.length)return;let r=new Map,n=2*Math.max(a.protectedRange,a.visualRange),s=N.map(s=>{var i;let l=JSON.stringify(s.getGrid(n));new Set(Array.from(r.keys())).has(l)?null===(i=r.get(l))||void 0===i||i.push(s):r.set(l,[s]);let o=new c.Vector3(s.x,s.y,s.z),h=new c.Vector3(s.perchLoc[0],s.perchLoc[1],s.perchLoc[2]),d=o.distanceTo(h);if(s.setWillPerch(c.MathUtils.randInt(0,100)),d<150&&(M<s.perchedAt+s.perchDur||M>20&&0===s.perchedAt&&s.willPerch())||m){let u=b(d,s,M,F);return u}{let x=v(N,r,n,s,t,80,a,e.clock.getElapsedTime(),F);return x}});C(s)}),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("pointLight",{ref:V,position:[0,.2,4],intensity:.1,color:new c.Color(90,60,0)}),(0,s.jsxs)("mesh",{position:[0,80,0],children:[(0,s.jsx)("boxGeometry",{args:[t[0],t[1],t[2]],ref:S}),(0,s.jsx)("meshStandardMaterial",{color:"gray",opacity:r,transparent:!0,side:c.DoubleSide})]}),N.map((e,t)=>e.action!==n.PERCHED?(0,s.jsxs)("mesh",{name:e.id.toString(),position:[e.x,e.y,e.z],geometry:null==L?void 0:L.geometry,onUpdate(t){t.lookAt(new c.Vector3(e.x+e.vx,e.y+e.vy,e.z+e.vz))},children:[(0,s.jsx)("mesh",{position:[0,0,-.5],rotation:new c.Euler(0,0,Math.sin((7*M+Math.PI/2)*2+e.flapOffset)),geometry:null==O?void 0:O.geometry,children:(0,s.jsx)("meshStandardMaterial",{color:"blue"})}),(0,s.jsx)("mesh",{position:[0,0,-.5],rotation:new c.Euler(0,0,-Math.sin((7*M+Math.PI/2)*2+e.flapOffset)),geometry:null==D?void 0:D.geometry,children:(0,s.jsx)("meshStandardMaterial",{color:"blue"})}),(0,s.jsx)("meshStandardMaterial",{color:"blue"})]},"fly"+e.id.toString()):(0,s.jsx)("mesh",{position:new c.Vector3(e.perchLoc[0],e.perchLoc[1]-.7,e.perchLoc[2]),rotation:new c.Euler(0,0!==e.perchLoc[3]?(0,h.Z)(e.perchDur)%2==0?Math.PI/2:-Math.PI/2:(0,h.Z)(e.perchDur)%2==0?0:Math.PI,0),geometry:null==T?void 0:T.geometry,children:(0,s.jsx)("meshStandardMaterial",{color:"blue"})},"perch"+e.id.toString())),(0,s.jsx)(d,{points:A,wires:I})]})},f=(e,t)=>e<t/5,V=(e,t)=>e>t/5&&e<2*t/5,v=(e,t,a,r,s,i,l,o,h)=>{let m=new c.Vector3(r.x,r.y,r.z),d=0,u=0,x=0,p=0,g=0,y=0,v=0,b=0,z=0,j=0;for(let S of r.getNeighbors(a))if(new Set(Array.from(t.keys())).has(S)){for(let w of t.get(S)||[])if(w.id!==r.id){let M=new c.Vector3(w.x,w.y,w.z);m.distanceTo(M)<l.visualRange&&(d+=w.x,u+=w.y,x+=w.z,p+=w.vx,g+=w.vy,y+=w.vz,j+=1),m.distanceTo(M)<l.protectedRange&&(v+=m.x-M.x,b+=m.y-M.y,z+=m.z-M.z)}}j>0&&r.incremVXYZ((d/j-r.x)*l.centeringFactor+(p/j-r.vx)*l.matchingFactor,(u/j-r.y)*l.centeringFactor+(g/j-r.vy)*l.matchingFactor,(x/j-r.z)*l.centeringFactor+(y/j-r.vz)*l.matchingFactor),r.incremVXYZ(v*l.avoidFactor,b*l.avoidFactor,z*l.avoidFactor);let P=s[0]/2,F=-1*s[0]/2,E=s[1]/2+i,N=-1*s[1]/2+i,C=s[2]/2,I=-1*s[2]/2;r.x>P&&r.incremVX(-1*l.turnFactor),r.x<F&&r.incremVX(l.turnFactor),r.y>E&&r.incremVY(-1*l.turnFactor),r.y<N&&r.incremVY(l.turnFactor),r.z>C&&r.incremVZ(-1*l.turnFactor),r.z<I&&r.incremVZ(l.turnFactor),f(r.id,e.length)&&(r.vx>0?r.setBias(Math.min(l.maxBias,r.bias+l.biasIncrm)):r.setBias(Math.max(l.biasIncrm,r.bias-l.biasIncrm))),V(r.id,e.length)&&(r.vx<0?r.setBias(Math.min(l.maxBias,r.bias+l.biasIncrm)):r.setBias(Math.max(l.biasIncrm,r.bias-l.biasIncrm))),f(r.id,e.length)&&r.setVX((1-r.bias)*r.vx+r.bias),V(r.id,e.length)&&r.setVX((1-r.bias)*r.vx-r.bias);let A=r.getSpeed();return A<l.minSpeed&&(r.setVX(r.vx/A*l.minSpeed),r.setVY(r.vy/A*l.minSpeed),r.setVZ(r.vz/A*l.minSpeed)),A>l.maxSpeed&&(r.setVX(r.vx/A*l.maxSpeed),r.setVY(r.vy/A*l.maxSpeed),r.setVZ(r.vz/A*l.maxSpeed)),r.perchedAt+r.perchDur+10<o&&(r.setPerchedAt(0),r.unsetWillPerch()),r.setAction(n.FLYING),r.move(h),r},b=(e,t,a,r)=>{if(t.action===n.PERCHED)return t;let s=new c.Vector3(t.x,t.y,t.z),i=new c.Vector3(t.perchLoc[0],t.perchLoc[1],t.perchLoc[2]);if(e>1.8){t.incremVX((i.x-s.x)*.01),t.incremVY((i.y-s.y)*.01),t.incremVZ((i.z-s.z)*.01),t.x>t.perchLoc[0]&&(t.incremVX(-.2),t.incremX(-.005)),t.x<t.perchLoc[0]&&(t.incremVX(.2),t.incremX(.005)),t.y>t.perchLoc[1]&&(t.incremVY(-.2),t.incremY(-.005)),t.y<t.perchLoc[1]&&(t.incremVY(.2),t.incremY(.005)),t.z>t.perchLoc[2]&&(t.incremVZ(-.2),t.incremZ(-.005)),t.z<t.perchLoc[2]&&(t.incremVZ(.2),t.incremZ(.005));let l=t.getSpeed();l>2&&(t.setVX(t.vx/l*2),t.setVY(t.vy/l*2),t.setVZ(t.vz/l*2)),e<30&&(t.setVX(.6*t.vx),t.setVY(.6*t.vy),t.setVZ(.6*t.vz)),t.move(r)}else t.setXYZ(i.x,i.y,i.z),t.setVXYZ(0,0,0),t.setAction(n.PERCHED),t.setPerchedAt(a);return t},z=e=>{let t=[];for(let a of e)for(let r=0;r<a.numParallel;r++){let n=new c.EllipseCurve(a.ax,a.ay+2,a.xRadius,a.yRadius,Math.PI+Math.PI/8,0-Math.PI/8,!1,0).getPoints(50).map(e=>new c.Vector3(e.x,e.y,0===r?a.zTranslate:1===r?a.spacing%2==0?a.zTranslate+a.spacing:a.zTranslate+a.spacing/2:a.zTranslate+2*a.spacing));for(let s of n){let i=new c.Vector3(s.x,s.y,s.z).applyEuler(new c.Euler(0,a.rotation,0));t.push(new c.Vector4(i.x,i.y,i.z,0===a.rotation?0:1))}}return t},j=(e,t)=>{let a=c.MathUtils.randInt(0,t-1);return e.has(a)&&t!==e.size?j(e,t):(e.add(a),a)};var S=a(7090),w=a(9365);let M=()=>{let[e,t]=(0,i.useState)([300,180,240]),[a,r]=(0,i.useState)(0),[n,o]=(0,i.useState)(!1),[c,h]=(0,i.useState)(400),[m,d]=(0,i.useState)({turnfactor:.2,visualRange:40,protectedRange:4,centeringFactor:5e-4,avoidFactor:.05,matchingFactor:.05,maxSpeed:4,minSpeed:2,turnFactor:.2,maxBias:.01,biasIncrm:4e-5});return(0,s.jsxs)("div",{className:"flex flex-row items-center bg-black space-x-4 h-full w-full absolute",children:[(0,s.jsxs)("div",{className:"flex flex-col space-y-4 ml-4 mt-4",children:[(0,s.jsx)(P,{name:"number birds",min:0,max:700,defaultVal:[c],step:1,onValueChange:e=>h(e[0])}),(0,s.jsx)(P,{name:"x boundry",min:30,max:300,defaultVal:[e[0]],step:1,onValueChange:a=>t([a[0],e[1],e[2]])}),(0,s.jsx)(P,{name:"y boundry",min:30,max:300,defaultVal:[e[1]],step:1,onValueChange:a=>t([e[0],a[0],e[2]])}),(0,s.jsx)(P,{name:"z boundry",min:30,max:300,defaultVal:[e[2]],step:1,onValueChange:a=>t([e[0],e[1],a[0]])}),(0,s.jsx)(P,{name:"visual range",min:0,max:60,defaultVal:[m.visualRange],step:1,onValueChange:e=>d({...m,visualRange:e[0]})}),(0,s.jsx)(P,{name:"protected range",min:0,max:20,defaultVal:[m.protectedRange],step:1,onValueChange:e=>d({...m,protectedRange:e[0]})}),(0,s.jsx)(P,{name:"centering factor",min:0,max:.01,defaultVal:[m.centeringFactor],step:1e-4,onValueChange:e=>d({...m,centeringFactor:e[0]})}),(0,s.jsx)(P,{name:"avoid factor",min:0,max:.1,defaultVal:[m.avoidFactor],step:.001,onValueChange:e=>d({...m,avoidFactor:e[0]})}),(0,s.jsx)(P,{name:"matching factor",min:0,max:.1,defaultVal:[m.matchingFactor],step:.001,onValueChange:e=>d({...m,matchingFactor:e[0]})}),(0,s.jsx)(P,{name:"turning factor",min:.1,max:.5,defaultVal:[m.turnFactor],step:.001,onValueChange:e=>d({...m,turnFactor:e[0]})}),(0,s.jsx)(P,{name:"speed range",min:1,max:6,defaultVal:[m.minSpeed,m.maxSpeed],step:.1,onValueChange:e=>d({...m,minSpeed:e[0],maxSpeed:e[1]})}),(0,s.jsx)(P,{name:"bias range",min:0,max:.03,defaultVal:[m.biasIncrm,m.maxBias],step:1e-5,onValueChange:e=>d({...m,biasIncrm:e[0],maxBias:e[1]})}),(0,s.jsx)(P,{name:"box opacity",min:0,max:1,defaultVal:[a],step:.01,onValueChange:e=>r(e[0])}),(0,s.jsx)("button",{className:"p-2 bg-green-500 text-white disabled:bg-green-300",disabled:n,onClick:()=>o(!0),children:"Perch all birds"})]}),(0,s.jsx)("div",{className:"w-4/5 h-[700px] bg-black",children:(0,s.jsxs)(l.Xz,{shadows:!0,camera:{fov:75,position:[400,50,-100]},className:"bg-blue-400",children:[(0,s.jsx)(F,{}),(0,s.jsx)(y,{border:e,consts:m,boxOpacity:a,numberBirds:c,allPerching:n,setAllPerching:o})]})})]})},P=e=>{let{min:t,max:a,defaultVal:r,step:n,name:i,onValueChange:l}=e;return(0,s.jsxs)("div",{className:"flex flex-col space-y-1",children:[(0,s.jsx)("span",{className:"text-white select-none",children:i}),(0,s.jsxs)(S.fC,{className:"relative select-none touch-none flex items-center w-[200px] h-2",minStepsBetweenThumbs:1,defaultValue:r,min:t,max:a,onValueCommit:l,step:n,"aria-label":"Volume",children:[(0,s.jsx)(S.fQ,{className:"relative bg-white rounded-full h-2 flex-grow",children:(0,s.jsx)(S.e6,{className:"absolute bg-green-500 rounded-full h-full"})}),r.map(e=>(0,s.jsx)(S.bU,{className:"block w-5 h-5 bg-green-500 rounded-full outline-none "},e))]})]})},F=()=>{let{camera:e,gl:t}=(0,o.z)();return(0,i.useEffect)(()=>{let a=new w.z(e,t.domElement);return a.enableDamping,()=>{a.dispose()}},[e,t]),null};var E=a(9008),N=a.n(E);function C(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(N(),{children:[(0,s.jsx)("title",{children:"Create Next App"}),(0,s.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,s.jsx)("link",{rel:"icon",href:"/Wings/favicon.ico"})]}),(0,s.jsx)(M,{})]})}}},function(e){e.O(0,[737,203,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);