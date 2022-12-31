(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(13)}])},13:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return C}});var r,n,s=a(5893),i=a(7294),l=a(5029),o=a(1884),c=a(9477),h=a(2051);(r=n||(n={}))[r.FLYING=0]="FLYING",r[r.PERCHED=1]="PERCHED";var m=a(8626),d=a(8243);class u{incremXYZ(e,t,a){this.x+=e,this.y+=t,this.z+=a}incremVXYZ(e,t,a){this.vx+=e,this.vy+=t,this.vz+=a}incremVX(e){this.vx+=e}incremVY(e){this.vy+=e}incremVZ(e){this.vz+=e}setVX(e){this.vx=e}setVY(e){this.vy=e}setVZ(e){this.vz=e}incremX(e){this.x+=e}incremY(e){this.y+=e}incremZ(e){this.z+=e}setXYZ(e,t,a){this.x=e,this.y=t,this.z=a}setVXYZ(e,t,a){this.vx=e,this.vy=t,this.vz=a}willPerch(){return 8===c.MathUtils.randInt(0,50)}move(){this.x+=this.vx,this.y+=this.vy,this.z+=this.vz}setBias(e){this.bias=e}setAction(e){this.action=e}setPerchedAt(e){this.perchedAt=e}getSpeed(){return(this.vx**2+this.vy**2+this.vz**2)**.5}getDistToPerch(){let e=new c.Vector3(this.x,this.y,this.z),t=new c.Vector3(this.perchLoc[0],this.perchLoc[1],this.perchLoc[2]),a=e.distanceTo(t);return a}constructor({x:e,y:t,z:a,vx:r,vy:n,vz:s,bias:i,id:l,action:o,perchDur:c,perchedAt:h,perchLoc:m,flapOffset:d}){this.x=e,this.y=t,this.z=a,this.vx=r,this.vy=n,this.vz=s,this.bias=i,this.id=l,this.action=o,this.perchDur=c,this.perchedAt=h,this.perchLoc=m,this.flapOffset=d}}let x=e=>{let{border:t,height:a,boidConstants:r,boxOpacity:l,numberBirds:x,allPerching:p,setAllPerching:g}=e,{camera:j,gl:S,scene:w}=(0,o.z)(),M=(0,i.useRef)(null),F=(0,i.useRef)(null);w.add(j),M.current&&j.add(M.current),F.current&&j.add(F.current);let P=(0,i.useRef)(null),[E]=(0,i.useState)(Array.from(Array(7)).map(()=>({ax:c.MathUtils.randFloat(-100,100),ay:c.MathUtils.randFloat(-100,-50),xRadius:c.MathUtils.randFloat(50,300),yRadius:c.MathUtils.randFloat(10,80),numParallel:c.MathUtils.randInt(2,3),rotation:1===c.MathUtils.randInt(0,1)?Math.PI/2:0,spacing:c.MathUtils.randInt(12,35),zTranslate:c.MathUtils.randFloat(-200,200)}))),[C]=(0,i.useState)(v(E)),[N]=(0,i.useState)(b(E,C)),[I]=(0,i.useState)(z(E,C)),{nodes:Z}=(0,m.L)("/Wings/bird.gltf"),{nodes:A}=(0,m.L)("/Wings/perch.gltf"),[L]=(0,i.useState)(Z.bird instanceof c.Mesh?Z.bird:null),[R]=(0,i.useState)(Z.bird001 instanceof c.Mesh?Z.bird001:null),[X]=(0,i.useState)(Z.bird002 instanceof c.Mesh?Z.bird002:null),[Y]=(0,i.useState)(A.birdperch instanceof c.Mesh?A.birdperch:null),O=(e,t)=>{let a=c.MathUtils.randInt(0,C.length-1);return e.has(a)&&t!==e.size?O(e,t):(e.add(a),a)},[T,U]=(0,i.useState)(new Set),[D,k]=(0,i.useState)([]),[B,J]=(0,i.useState)([]),[_,G]=(0,i.useState)(0);return(0,i.useEffect)(()=>{let e=x-D.length;e>0?(Array.from(Array(e)).forEach(()=>{let e=O(T,C.length);D.push(new u({x:C[e].x,y:C[e].y,z:C[e].z,vx:c.MathUtils.randFloat(-2,2),vy:c.MathUtils.randFloat(-2,2),vz:c.MathUtils.randFloat(-2,2),bias:0,id:D.length,action:n.PERCHED,perchDur:c.MathUtils.randFloat(10/3,10),perchedAt:_,perchLoc:[C[e].x,C[e].y,C[e].z,C[e].w],flapOffset:c.MathUtils.randFloat(0,10)}))}),U(T)):Array.from(Array(-1*e)).forEach(()=>D.pop()),k(D)},[x]),(0,i.useEffect)(()=>{let e=D.filter(e=>e.action!==n.PERCHED);e.length<5&&g(!1)},[D]),(0,o.A)(e=>{let n=new Map,s=2*Math.max(r.protectedRange,r.visualRange);if(0===D.length)return;let i=D.map((i,l)=>{var o;let m=JSON.stringify([(0,h.Z)(i.x/s)*s,(0,h.Z)(i.y/s)*s,(0,h.Z)(i.z/s)*s]);new Set(Array.from(n.keys())).has(m)?null===(o=n.get(m))||void 0===o||o.push(i):n.set(m,[i]);let d=V([(0,h.Z)(i.x/s)*s,(0,h.Z)(i.y/s)*s,(0,h.Z)(i.z/s)*s],s,i),u=e.clock.getElapsedTime();G(u);let x=new c.Vector3(i.x,i.y,i.z),g=new c.Vector3(i.perchLoc[0],i.perchLoc[1],i.perchLoc[2]),v=x.distanceTo(g);if(v<150&&(u<i.perchedAt+i.perchDur||u>20&&0===i.perchedAt)||p){let b=f(v,i,u);return b}{let z=y(D,n,d,i,t,a,r,e.clock.getElapsedTime());return z}});k(i)}),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("pointLight",{ref:M,position:[0,.2,4],intensity:.1,color:new c.Color(90,60,0)}),(0,s.jsxs)("mesh",{position:[0,a,0],children:[(0,s.jsx)("boxGeometry",{args:[t[0],t[1],t[2]],ref:P}),(0,s.jsx)("meshStandardMaterial",{color:"gray",opacity:l,transparent:!0,side:c.DoubleSide})]}),D.map((e,t)=>e.action!==n.PERCHED?(0,s.jsxs)("mesh",{name:e.id.toString(),position:[e.x,e.y,e.z],geometry:null==L?void 0:L.geometry,onUpdate(t){t.lookAt(new c.Vector3(e.x+e.vx,e.y+e.vy,e.z+e.vz))},children:[(0,s.jsx)("mesh",{position:[0,0,-.5],rotation:new c.Euler(0,0,Math.sin((7*_+Math.PI/2)*2+e.flapOffset)),geometry:null==R?void 0:R.geometry,children:(0,s.jsx)("meshStandardMaterial",{color:"blue"})}),(0,s.jsx)("mesh",{position:[0,0,-.5],rotation:new c.Euler(0,0,-Math.sin((7*_+Math.PI/2)*2+e.flapOffset)),geometry:null==X?void 0:X.geometry,children:(0,s.jsx)("meshStandardMaterial",{color:"blue"})}),(0,s.jsx)("meshStandardMaterial",{color:"blue"})]},"fly"+e.id.toString()):(0,s.jsx)("mesh",{position:new c.Vector3(e.perchLoc[0],e.perchLoc[1]-.7,e.perchLoc[2]),rotation:new c.Euler(0,0!==e.perchLoc[3]?(0,h.Z)(e.perchDur)%2==0?Math.PI/2:-Math.PI/2:(0,h.Z)(e.perchDur)%2==0?0:Math.PI,0),geometry:null==Y?void 0:Y.geometry,children:(0,s.jsx)("meshStandardMaterial",{color:"blue"})},"perch"+e.id.toString())),E.map((e,t)=>Array.from(Array(e.numParallel)).map((t,a)=>(0,s.jsx)(d.x,{points:new c.EllipseCurve(e.ax,e.ay,e.xRadius,e.yRadius,Math.PI+Math.PI/8,0-Math.PI/8,!1,0).getPoints(50).map(t=>new c.Vector3(t.x,t.y,0===a?e.zTranslate:1===a?e.spacing%2==0?e.zTranslate+e.spacing:e.zTranslate+e.spacing/2:e.zTranslate+2*e.spacing)),color:"blue",lineWidth:1,rotation:new c.Euler(0,e.rotation,0)},e.ax+e.ay+a))),E.map((e,t)=>{let a=N.get(t);return a?(0,s.jsxs)("group",{children:[(0,s.jsxs)("mesh",{position:[a[0].x,a[0].y-8,a[0].z],rotation:new c.Euler(0,e.rotation+Math.PI/2,0),children:[(0,s.jsx)("boxGeometry",{args:[1===e.numParallel?10:2===e.numParallel?1.5*e.spacing:3*e.spacing,3,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[1].x,a[1].y-8,a[1].z],rotation:new c.Euler(0,e.rotation+Math.PI/2,0),children:[(0,s.jsx)("boxGeometry",{args:[1===e.numParallel?10:2===e.numParallel?1.5*e.spacing:3*e.spacing,3,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[0].x,a[0].y-150,a[0].z],children:[(0,s.jsx)("boxGeometry",{args:[3,300,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[1].x,a[1].y-150,a[1].z],children:[(0,s.jsx)("boxGeometry",{args:[3,300,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),Array.from(Array(e.numParallel)).map((e,a)=>{let r=I.get(JSON.stringify([t,a]));return r?(0,s.jsxs)("group",{children:[(0,s.jsxs)("mesh",{position:[r[0].x,r[0].y-4,r[0].z],children:[(0,s.jsx)("cylinderGeometry",{args:[.5,1,5]}),(0,s.jsx)("meshStandardMaterial",{color:new c.Color(3355443)})]}),(0,s.jsxs)("mesh",{position:[r[1].x,r[1].y-4,r[1].z],children:[(0,s.jsx)("cylinderGeometry",{args:[.5,1,5]}),(0,s.jsx)("meshStandardMaterial",{color:new c.Color(3355443)})]})]},JSON.stringify([t,a])):(0,s.jsx)(s.Fragment,{})})]},t):(0,s.jsx)(s.Fragment,{})})]})},p=(e,t)=>e<t/5,g=(e,t)=>e>t/5&&e<2*t/5,y=(e,t,a,r,s,i,l,o)=>{let h=new c.Vector3(r.x,r.y,r.z);new c.Vector3(r.vx,r.vy,r.vz);let m=0,d=0,u=0,x=0,y=0,f=0,V=0,v=0,b=0,z=0;for(let j of a)if(new Set(Array.from(t.keys())).has(j)){for(let S of t.get(j)||[])if(S.id!==r.id){let w=new c.Vector3(S.x,S.y,S.z);h.distanceTo(w)<l.visualRange&&(m+=S.x,d+=S.y,u+=S.z,x+=S.vx,y+=S.vy,f+=S.vz,z+=1),h.distanceTo(w)<l.protectedRange&&(V+=h.x-w.x,v+=h.y-w.y,b+=h.z-w.z)}}z>0&&r.incremVXYZ((m/z-r.x)*l.centeringFactor+(x/z-r.vx)*l.matchingFactor,(d/z-r.y)*l.centeringFactor+(y/z-r.vy)*l.matchingFactor,(u/z-r.z)*l.centeringFactor+(f/z-r.vz)*l.matchingFactor),r.incremVXYZ(V*l.avoidFactor,v*l.avoidFactor,b*l.avoidFactor);let M=s[0]/2,F=-1*s[0]/2,P=s[1]/2+i,E=-1*s[1]/2+i,C=s[2]/2,N=-1*s[2]/2;r.x>M&&r.incremVX(-1*l.turnFactor),r.x<F&&r.incremVX(l.turnFactor),r.y>P&&r.incremVY(-1*l.turnFactor),r.y<E&&r.incremVY(l.turnFactor),r.z>C&&r.incremVZ(-1*l.turnFactor),r.z<N&&r.incremVZ(l.turnFactor),p(r.id,e.length)&&(r.vx>0?r.setBias(Math.min(l.maxBias,r.bias+l.biasIncrm)):r.setBias(Math.max(l.biasIncrm,r.bias-l.biasIncrm))),g(r.id,e.length)&&(r.vx<0?r.setBias(Math.min(l.maxBias,r.bias+l.biasIncrm)):r.setBias(Math.max(l.biasIncrm,r.bias-l.biasIncrm))),p(r.id,e.length)&&r.setVX((1-r.bias)*r.vx+r.bias),g(r.id,e.length)&&r.setVX((1-r.bias)*r.vx-r.bias);let I=r.getSpeed();return I<l.minSpeed&&(r.setVX(r.vx/I*l.minSpeed),r.setVY(r.vy/I*l.minSpeed),r.setVZ(r.vz/I*l.minSpeed)),I>l.maxSpeed&&(r.setVX(r.vx/I*l.maxSpeed),r.setVY(r.vy/I*l.maxSpeed),r.setVZ(r.vz/I*l.maxSpeed)),r.perchedAt+r.perchDur+10<o&&r.setPerchedAt(0),r.setAction(n.FLYING),r.move(),r},f=(e,t,a)=>{if(t.action===n.PERCHED)return t;let r=new c.Vector3(t.x,t.y,t.z),s=new c.Vector3(t.perchLoc[0],t.perchLoc[1],t.perchLoc[2]);if(t.getSpeed(),e>2.8){t.incremVX((s.x-r.x)*.01),t.incremVY((s.y-r.y)*.01),t.incremVZ((s.z-r.z)*.01),t.x>t.perchLoc[0]&&(t.incremVX(-.2),t.incremX(-.005)),t.x<t.perchLoc[0]&&(t.incremVX(.2),t.incremX(.005)),t.y>t.perchLoc[1]&&(t.incremVY(-.2),t.incremY(-.005)),t.y<t.perchLoc[1]&&(t.incremVY(.2),t.incremY(.005)),t.z>t.perchLoc[2]&&(t.incremVZ(-.2),t.incremZ(-.005)),t.z<t.perchLoc[2]&&(t.incremVZ(.2),t.incremZ(.005));let i=t.getSpeed();i>2&&(t.setVX(t.vx/i*2),t.setVY(t.vy/i*2),t.setVZ(t.vz/i*2)),t.move()}else t.setXYZ(s.x,s.y,s.z),t.setVXYZ(0,0,0),t.setAction(n.PERCHED),t.setPerchedAt(a);return t},V=(e,t,a)=>{let r,n,s;let i=a.x,l=a.y,o=a.z,c=e[0]+t/2,h=e[1]+t/2,m=e[2]+t/2,d=[];return r=i<c?e[0]-t:e[0]+t,n=l<h?e[1]-t:e[1]+t,s=o<m?e[2]-t:e[2]+t,d.push(JSON.stringify([e[0],n,e[2]])),d.push(JSON.stringify([e[0],n,s])),d.push(JSON.stringify([e[0],e[1],e[2]])),d.push(JSON.stringify([e[0],e[1],s])),d.push(JSON.stringify([r,n,e[2]])),d.push(JSON.stringify([r,n,s])),d.push(JSON.stringify([r,e[1],e[2]])),d.push(JSON.stringify([r,e[1],s])),d},v=e=>{let t=[];for(let a of e)for(let r=0;r<a.numParallel;r++){let n=new c.EllipseCurve(a.ax,a.ay+2,a.xRadius,a.yRadius,Math.PI+Math.PI/8,0-Math.PI/8,!1,0).getPoints(50).map(e=>new c.Vector3(e.x,e.y,0===r?a.zTranslate:1===r?a.spacing%2==0?a.zTranslate+a.spacing:a.zTranslate+a.spacing/2:a.zTranslate+2*a.spacing));for(let s of n){let i=new c.Vector3(s.x,s.y,s.z).applyEuler(new c.Euler(0,a.rotation,0));t.push(new c.Vector4(i.x,i.y,i.z,0===a.rotation?0:1))}}return t},b=(e,t)=>{let a=new Map,r=0,n=0;for(let s=0;s<e.length;s++){n=(r=0===s?0:n+1)+50*e[s].numParallel+(e[s].numParallel-1);let i=t[r],l=t[n];if(0===e[s].rotation){let o=(i.z+l.z)/2,h=new c.Vector3(i.x,i.y,o),m=new c.Vector3(l.x,l.y,o);a.set(s,[h,m])}else{let d=(i.x+l.x)/2,u=new c.Vector3(d,i.y,i.z),x=new c.Vector3(d,l.y,l.z);a.set(s,[u,x])}}return a},z=(e,t)=>{let a=new Map,r=0,n=0;for(let s=0;s<e.length;s++)for(let i=0;i<e[s].numParallel;i++)n=(r=0===s&&0===i?0:n+1)+50,a.set(JSON.stringify([s,i]),[new c.Vector3(t[r].x,t[r].y,t[r].z),new c.Vector3(t[n].x,t[n].y,t[n].z)]);return a};var j=a(7090),S=a(9365);let w=()=>{let[e,t]=(0,i.useState)([300,180,240]),[a,r]=(0,i.useState)(80),[n,o]=(0,i.useState)(0),[c,h]=(0,i.useState)(!1),[m,d]=(0,i.useState)(400),[u,p]=(0,i.useState)({turnfactor:.2,visualRange:40,protectedRange:4,centeringFactor:5e-4,avoidFactor:.05,matchingFactor:.05,maxSpeed:4,minSpeed:2,turnFactor:.2,maxBias:.01,biasIncrm:4e-5});return(0,s.jsxs)("div",{className:"flex flex-row items-center bg-black space-x-4 h-full w-full absolute",children:[(0,s.jsxs)("div",{className:"flex flex-col space-y-4 ml-4 mt-4",children:[(0,s.jsx)(M,{name:"number birds",min:0,max:700,defaultVal:[m],step:1,onValueChange:e=>d(e[0])}),(0,s.jsx)(M,{name:"x boundry",min:30,max:300,defaultVal:[e[0]],step:1,onValueChange:a=>t([a[0],e[1],e[2]])}),(0,s.jsx)(M,{name:"y boundry",min:30,max:300,defaultVal:[e[1]],step:1,onValueChange:a=>t([e[0],a[0],e[2]])}),(0,s.jsx)(M,{name:"z boundry",min:30,max:300,defaultVal:[e[2]],step:1,onValueChange:a=>t([e[0],e[1],a[0]])}),(0,s.jsx)(M,{name:"visual range",min:0,max:60,defaultVal:[u.visualRange],step:1,onValueChange:e=>p({...u,visualRange:e[0]})}),(0,s.jsx)(M,{name:"protected range",min:0,max:20,defaultVal:[u.protectedRange],step:1,onValueChange:e=>p({...u,protectedRange:e[0]})}),(0,s.jsx)(M,{name:"centering factor",min:0,max:.01,defaultVal:[u.centeringFactor],step:1e-4,onValueChange:e=>p({...u,centeringFactor:e[0]})}),(0,s.jsx)(M,{name:"avoid factor",min:0,max:.1,defaultVal:[u.avoidFactor],step:.001,onValueChange:e=>p({...u,avoidFactor:e[0]})}),(0,s.jsx)(M,{name:"matching factor",min:0,max:.1,defaultVal:[u.matchingFactor],step:.001,onValueChange:e=>p({...u,matchingFactor:e[0]})}),(0,s.jsx)(M,{name:"turning factor",min:.1,max:.5,defaultVal:[u.turnFactor],step:.001,onValueChange:e=>p({...u,turnFactor:e[0]})}),(0,s.jsx)(M,{name:"speed range",min:1,max:6,defaultVal:[u.minSpeed,u.maxSpeed],step:.1,onValueChange:e=>p({...u,minSpeed:e[0],maxSpeed:e[1]})}),(0,s.jsx)(M,{name:"bias range",min:0,max:.03,defaultVal:[u.biasIncrm,u.maxBias],step:1e-5,onValueChange:e=>p({...u,biasIncrm:e[0],maxBias:e[1]})}),(0,s.jsx)(M,{name:"box opacity",min:0,max:1,defaultVal:[n],step:.01,onValueChange:e=>o(e[0])}),(0,s.jsx)("button",{className:"p-2 bg-green-500 text-white disabled:bg-green-300",disabled:c,onClick:()=>h(!0),children:"Perch all birds"})]}),(0,s.jsx)("div",{className:"w-4/5 h-[700px] bg-black",children:(0,s.jsxs)(l.Xz,{shadows:!0,camera:{fov:75,position:[400,50,-100]},className:"bg-blue-400",children:[(0,s.jsx)(F,{}),(0,s.jsx)(x,{border:e,height:a,boidConstants:u,boxOpacity:n,numberBirds:m,allPerching:c,setAllPerching:h})]})})]})},M=e=>{let{min:t,max:a,defaultVal:r,step:n,name:i,onValueChange:l}=e;return(0,s.jsxs)("div",{className:"flex flex-col space-y-1",children:[(0,s.jsx)("span",{className:"text-white select-none",children:i}),(0,s.jsxs)(j.fC,{className:"relative select-none touch-none flex items-center w-[200px] h-2",minStepsBetweenThumbs:1,defaultValue:r,min:t,max:a,onValueCommit:l,step:n,"aria-label":"Volume",children:[(0,s.jsx)(j.fQ,{className:"relative bg-white rounded-full h-2 flex-grow",children:(0,s.jsx)(j.e6,{className:"absolute bg-green-500 rounded-full h-full"})}),r.map(e=>(0,s.jsx)(j.bU,{className:"block w-5 h-5 bg-green-500 rounded-full outline-none "},e))]})]})},F=()=>{let{camera:e,gl:t}=(0,o.z)();return(0,i.useEffect)(()=>{let a=new S.z(e,t.domElement);return a.enableDamping,()=>{a.dispose()}},[e,t]),null};var P=a(9008),E=a.n(P);function C(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(E(),{children:[(0,s.jsx)("title",{children:"Create Next App"}),(0,s.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,s.jsx)("link",{rel:"icon",href:"/Wings/favicon.ico"})]}),(0,s.jsx)(w,{})]})}}},function(e){e.O(0,[737,203,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);