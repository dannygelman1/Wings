(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return a(13)}])},13:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return P}});var n,r,s=a(5893),i=a(7294),l=a(5029),o=a(1884),c=a(9365),h=a(9477),m=a(2051);(n=r||(r={}))[n.FLYING=0]="FLYING",n[n.FLYINGDOWN=1]="FLYINGDOWN",n[n.PERCHING=2]="PERCHING",n[n.PERCHED=3]="PERCHED";var d=a(8626),u=a(8243);class x{incremXYZ(e,t,a){this.x+=e,this.y+=t,this.z+=a}incremVXYZ(e,t,a){this.vx+=e,this.vy+=t,this.vz+=a}incremVX(e){this.vx+=e}incremVY(e){this.vy+=e}incremVZ(e){this.vz+=e}setVX(e){this.vx=e}setVY(e){this.vy=e}setVZ(e){this.vz=e}setXYZ(e,t,a){this.x=e,this.y=t,this.z=a}setVXYZ(e,t,a){this.vx=e,this.vy=t,this.vz=a}willPerch(){return 8===h.MathUtils.randInt(0,50)}move(){this.x+=this.vx,this.y+=this.vy,this.z+=this.vz}setBias(e){this.bias=e}setAction(e){this.action=e}setPerchedAt(e){this.perchedAt=e}getSpeed(){return(this.vx**2+this.vy**2+this.vz**2)**.5}constructor({x:e,y:t,z:a,vx:n,vy:r,vz:s,bias:i,id:l,action:o,perchDur:c,perchedAt:h,perchLoc:m,flapOffset:d}){this.x=e,this.y=t,this.z=a,this.vx=n,this.vy=r,this.vz=s,this.bias=i,this.id=l,this.action=o,this.perchDur=c,this.perchedAt=h,this.perchLoc=m,this.flapOffset=d}}let p=e=>{let{border:t,height:a,boidConstants:n,boxOpacity:l,numberBirds:p,allPerching:F}=e,{camera:M,gl:S,scene:w}=(0,o.z)(),N=new c.z(M,S.domElement);N.enableDamping=!0,N.rotateSpeed=.01,N.zoomSpeed=.001,N.target.set(0,0,0),M.lookAt(N.target),N.minPolarAngle=0,N.maxPolarAngle=180,N.target.set(0,0,0);let P=(0,i.useRef)(null),E=(0,i.useRef)(null);w.add(M),P.current&&M.add(P.current),E.current&&M.add(E.current);let I=(0,i.useRef)(null),[A]=(0,i.useState)(Array.from(Array(7)).map(()=>({ax:h.MathUtils.randFloat(-100,100),ay:h.MathUtils.randFloat(-100,-50),xRadius:h.MathUtils.randFloat(50,300),yRadius:h.MathUtils.randFloat(10,80),numParallel:h.MathUtils.randInt(2,3),rotation:1===h.MathUtils.randInt(0,1)?Math.PI/2:0,spacing:h.MathUtils.randInt(8,35),zTranslate:h.MathUtils.randFloat(-200,200)}))),[C]=(0,i.useState)(z(A)),[U]=(0,i.useState)(b(A,C)),[R]=(0,i.useState)(j(A,C)),{nodes:Y,materials:L}=(0,d.L)("/Wings/bird7.gltf"),[X]=(0,i.useState)(Y.bird instanceof h.Mesh?Y.bird:null),[Z]=(0,i.useState)(Y.bird001 instanceof h.Mesh?Y.bird001:null),[O]=(0,i.useState)(Y.bird002 instanceof h.Mesh?Y.bird002:null),[G,T]=(0,i.useState)(Array.from(Array(p)).map((e,t)=>{let a=h.MathUtils.randInt(0,C.length-1);return new x({x:C[a].x,y:C[a].y,z:C[a].z,vx:h.MathUtils.randFloat(-2,2),vy:h.MathUtils.randFloat(-2,2),vz:h.MathUtils.randFloat(-2,2),bias:g(t,p)||y(t,p)?h.MathUtils.randFloat(4e-5,.01):0,id:t,action:r.FLYING,perchDur:h.MathUtils.randFloat(10/3,10),perchedAt:0,perchLoc:[C[a].x,C[a].y,C[a].z],flapOffset:h.MathUtils.randFloat(0,10)})})),[D,k]=(0,i.useState)(p),[B,_]=(0,i.useState)([0,0,0]);(0,i.useEffect)(()=>{let e=e=>{let t=((e.clientX-230)/S.domElement.clientWidth-.5)*S.domElement.clientWidth,a=-((e.clientY-30)/S.domElement.clientHeight-.5)*S.domElement.clientHeight;_([t,a,0])};S.domElement.addEventListener("mousemove",e)},[]);let[H,J]=(0,i.useState)(0);(0,i.useEffect)(()=>{let e=p-G.length;if(e>0){let n=h.MathUtils.randInt(0,C.length-1);Array.from(Array(e)).forEach(()=>G.push(new x({x:h.MathUtils.randFloat(-1*t[0]/2,t[0]/2),y:h.MathUtils.randFloat(-1*t[1]/2+a,t[1]/2+a),z:h.MathUtils.randFloat(-1*t[2]/2,t[2]/2),vx:h.MathUtils.randFloat(-2,2),vy:h.MathUtils.randFloat(-2,2),vz:h.MathUtils.randFloat(-2,2),bias:0,id:G.length,action:r.FLYING,perchDur:h.MathUtils.randFloat(10/3,10),perchedAt:0,perchLoc:[C[n].x,C[n].y,C[n].z],flapOffset:h.MathUtils.randFloat(0,10)})))}else Array.from(Array(-1*e)).forEach(()=>G.pop());T(G)},[p]);let W=e=>{T(G.map(t=>t.id===e.id?e:t))};return(0,o.A)(e=>{N.update();let s=new Map,i=2*Math.max(n.protectedRange,n.visualRange),l=G.map((l,o)=>{var c;let d=JSON.stringify([(0,m.Z)(l.x/i)*i,(0,m.Z)(l.y/i)*i,(0,m.Z)(l.z/i)*i]);new Set(Array.from(s.keys())).has(d)?null===(c=s.get(d))||void 0===c||c.push(l):s.set(d,[l]);let u=V([(0,m.Z)(l.x/i)*i,(0,m.Z)(l.y/i)*i,(0,m.Z)(l.z/i)*i],i,l),x=e.clock.getElapsedTime();J(x);let p=new h.Vector3(l.x,l.y,l.z),g=new h.Vector3(l.perchLoc[0],l.perchLoc[1],l.perchLoc[2]),y=p.distanceTo(g);if(x>17&&y<150&&(x<l.perchedAt+l.perchDur||0===l.perchedAt)&&(l.willPerch()||l.action!==r.FLYING)||F){let z=v(y,l,x);return z}{let b=f(G,s,u,l,t,a,n,B,e.clock.getElapsedTime());return b}});T(l)}),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("pointLight",{ref:P,position:[0,.2,4],intensity:.1,color:new h.Color(90,60,0)}),(0,s.jsxs)("mesh",{position:[0,a,0],children:[(0,s.jsx)("boxGeometry",{args:[t[0],t[1],t[2]],ref:I}),(0,s.jsx)("meshStandardMaterial",{color:"gray",opacity:l,transparent:!0,side:h.DoubleSide})]}),G.map((e,t)=>(0,s.jsx)(s.Fragment,{children:(0,s.jsxs)("mesh",{name:e.id.toString(),position:[e.x,e.y,e.z],geometry:null==X?void 0:X.geometry,onUpdate(t){t.lookAt(new h.Vector3(e.x+e.vx,e.y+e.vy,e.z+e.vz));let a=new h.Vector3(e.x,e.y,e.z),n=new h.Vector3(e.perchLoc[0],e.perchLoc[1],e.perchLoc[2]),s=a.distanceTo(n);e.action===r.PERCHED&&s>5&&(e.setVXYZ(h.MathUtils.randFloat(-2,2),h.MathUtils.randFloat(-2,2),h.MathUtils.randFloat(-2,2)),e.setAction(r.FLYING),W(e)),e.action===r.PERCHING&&(e.setAction(r.PERCHED),W(e))},children:[(0,s.jsx)("mesh",{position:[0,0,-.5],rotation:new h.Euler(0,0,Math.sin((7*H+Math.PI/2)*2+e.flapOffset)),geometry:null==Z?void 0:Z.geometry,children:(0,s.jsx)("meshStandardMaterial",{color:"blue"})}),(0,s.jsx)("mesh",{position:[0,0,-.5],rotation:new h.Euler(0,0,-Math.sin((7*H+Math.PI/2)*2+e.flapOffset)),geometry:null==O?void 0:O.geometry,children:(0,s.jsx)("meshStandardMaterial",{color:"blue"})}),(0,s.jsx)("meshStandardMaterial",{color:"blue"})]},t)})),A.map((e,t)=>Array.from(Array(e.numParallel)).map((t,a)=>(0,s.jsx)(u.x,{points:new h.EllipseCurve(e.ax,e.ay,e.xRadius,e.yRadius,Math.PI+Math.PI/8,0-Math.PI/8,!1,0).getPoints(50).map(t=>new h.Vector3(t.x,t.y,0===a?e.zTranslate:1===a?e.spacing%2==0?e.zTranslate+e.spacing:e.zTranslate+e.spacing/2:e.zTranslate+2*e.spacing)),color:"blue",lineWidth:1,rotation:new h.Euler(0,e.rotation,0)},e.ax+e.ay+a))),A.map((e,t)=>{let a=U.get(t);return a?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("mesh",{position:[a[0].x,a[0].y-8,a[0].z],rotation:new h.Euler(0,e.rotation+Math.PI/2,0),children:[(0,s.jsx)("boxGeometry",{args:[1===e.numParallel?10:2===e.numParallel?1.5*e.spacing:3*e.spacing,3,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[1].x,a[1].y-8,a[1].z],rotation:new h.Euler(0,e.rotation+Math.PI/2,0),children:[(0,s.jsx)("boxGeometry",{args:[1===e.numParallel?10:2===e.numParallel?1.5*e.spacing:3*e.spacing,3,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[0].x,a[0].y-150,a[0].z],children:[(0,s.jsx)("boxGeometry",{args:[3,300,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),(0,s.jsxs)("mesh",{position:[a[1].x,a[1].y-150,a[1].z],children:[(0,s.jsx)("boxGeometry",{args:[3,300,3]}),(0,s.jsx)("meshStandardMaterial",{color:"gray"})]}),Array.from(Array(e.numParallel)).map((e,a)=>{let n=R.get(JSON.stringify([t,a]));return n?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)("mesh",{position:[n[0].x,n[0].y-4,n[0].z],children:[(0,s.jsx)("cylinderGeometry",{args:[.5,1,5]}),(0,s.jsx)("meshStandardMaterial",{color:new h.Color(3355443)})]}),(0,s.jsxs)("mesh",{position:[n[1].x,n[1].y-4,n[1].z],children:[(0,s.jsx)("cylinderGeometry",{args:[.5,1,5]}),(0,s.jsx)("meshStandardMaterial",{color:new h.Color(3355443)})]})]}):(0,s.jsx)(s.Fragment,{})})]}):(0,s.jsx)(s.Fragment,{})})]})},g=(e,t)=>e<t/5,y=(e,t)=>e>t/5&&e<2*t/5,f=(e,t,a,n,r,s,i,l,o)=>{if(o<n.perchDur)return n;let c=new h.Vector3(n.x,n.y,n.z);new h.Vector3(n.vx,n.vy,n.vz);let m=0,d=0,u=0,x=0,p=0,f=0,v=0,V=0,z=0,b=0;for(let j of a)if(new Set(Array.from(t.keys())).has(j)){for(let F of t.get(j)||[])if(F.id!==n.id){let M=new h.Vector3(F.x,F.y,F.z);c.distanceTo(M)<i.visualRange&&(m+=F.x,d+=F.y,u+=F.z,x+=F.vx,p+=F.vy,f+=F.vz,b+=1),c.distanceTo(M)<i.protectedRange&&(v+=c.x-M.x,V+=c.y-M.y,z+=c.z-M.z)}}b>0&&n.incremVXYZ((m/b-n.x)*i.centeringFactor+(x/b-n.vx)*i.matchingFactor,(d/b-n.y)*i.centeringFactor+(p/b-n.vy)*i.matchingFactor,(u/b-n.z)*i.centeringFactor+(f/b-n.vz)*i.matchingFactor),n.incremVXYZ(v*i.avoidFactor,V*i.avoidFactor,z*i.avoidFactor);let S=r[0]/2,w=-1*r[0]/2,N=r[1]/2+s,P=-1*r[1]/2+s,E=r[2]/2,I=-1*r[2]/2;n.x>S&&n.incremVX(-1*i.turnFactor),n.x<w&&n.incremVX(i.turnFactor),n.y>N&&n.incremVY(-1*i.turnFactor),n.y<P&&n.incremVY(i.turnFactor),n.z>E&&n.incremVZ(-1*i.turnFactor),n.z<I&&n.incremVZ(i.turnFactor),g(n.id,e.length)&&(n.vx>0?n.setBias(Math.min(i.maxBias,n.bias+i.biasIncrm)):n.setBias(Math.max(i.biasIncrm,n.bias-i.biasIncrm))),y(n.id,e.length)&&(n.vx<0?n.setBias(Math.min(i.maxBias,n.bias+i.biasIncrm)):n.setBias(Math.max(i.biasIncrm,n.bias-i.biasIncrm))),g(n.id,e.length)&&n.setVX((1-n.bias)*n.vx+n.bias),y(n.id,e.length)&&n.setVX((1-n.bias)*n.vx-n.bias);let A=n.getSpeed();return A<i.minSpeed&&(n.setVX(n.vx/A*i.minSpeed),n.setVY(n.vy/A*i.minSpeed),n.setVZ(n.vz/A*i.minSpeed)),A>i.maxSpeed&&(n.setVX(n.vx/A*i.maxSpeed),n.setVY(n.vy/A*i.maxSpeed),n.setVZ(n.vz/A*i.maxSpeed)),n.perchedAt+n.perchDur+10<o&&n.setPerchedAt(0),n.move(),n},v=(e,t,a)=>{if(t.action===r.PERCHED&&a<t.perchedAt+t.perchDur)return t;let n=new h.Vector3(t.x,t.y,t.z),s=new h.Vector3(t.perchLoc[0],t.perchLoc[1],t.perchLoc[2]);if(e>2&&0===t.perchedAt){t.setAction(r.FLYINGDOWN),t.incremVX((s.x-n.x)*.01),t.incremVY((s.y-n.y)*.01),t.incremVZ((s.z-n.z)*.01);let i=t.getSpeed();i>2&&(t.setVX(t.vx/i*2),t.setVY(t.vy/i*2),t.setVZ(t.vz/i*2)),t.move()}else t.setXYZ(s.x,s.y,s.z),t.setVXYZ(0,0,0),t.setAction(r.PERCHING),t.setPerchedAt(a);return t},V=(e,t,a)=>{let n,r,s;let i=a.x,l=a.y,o=a.z,c=e[0]+t/2,h=e[1]+t/2,m=e[2]+t/2,d=[];return n=i<c?e[0]-t:e[0]+t,r=l<h?e[1]-t:e[1]+t,s=o<m?e[2]-t:e[2]+t,d.push(JSON.stringify([e[0],r,e[2]])),d.push(JSON.stringify([e[0],r,s])),d.push(JSON.stringify([e[0],e[1],e[2]])),d.push(JSON.stringify([e[0],e[1],s])),d.push(JSON.stringify([n,r,e[2]])),d.push(JSON.stringify([n,r,s])),d.push(JSON.stringify([n,e[1],e[2]])),d.push(JSON.stringify([n,e[1],s])),d},z=e=>{let t=[];for(let a of e)for(let n=0;n<a.numParallel;n++){let r=new h.EllipseCurve(a.ax,a.ay+2,a.xRadius,a.yRadius,Math.PI+Math.PI/8,0-Math.PI/8,!1,0).getPoints(50).map(e=>new h.Vector3(e.x,e.y,0===n?a.zTranslate:1===n?a.spacing%2==0?a.zTranslate+a.spacing:a.zTranslate+a.spacing/2:a.zTranslate+2*a.spacing));for(let s of r)t.push(new h.Vector3(s.x,s.y,s.z).applyEuler(new h.Euler(0,a.rotation,0)))}return t},b=(e,t)=>{let a=new Map,n=0,r=0;for(let s=0;s<e.length;s++){r=(n=0===s?0:r+1)+50*e[s].numParallel+(e[s].numParallel-1);let i=t[n],l=t[r];if(0===e[s].rotation){let o=(i.z+l.z)/2,c=new h.Vector3(i.x,i.y,o),m=new h.Vector3(l.x,l.y,o);a.set(s,[c,m])}else{let d=(i.x+l.x)/2,u=new h.Vector3(d,i.y,i.z),x=new h.Vector3(d,l.y,l.z);a.set(s,[u,x])}}return a},j=(e,t)=>{let a=new Map,n=0,r=0;for(let s=0;s<e.length;s++)for(let i=0;i<e[s].numParallel;i++)r=(n=0===s&&0===i?0:r+1)+50,a.set(JSON.stringify([s,i]),[t[n],t[r]]);return a};var F=a(7090);let M=()=>{let[e,t]=(0,i.useState)([300,180,240]),[a,n]=(0,i.useState)(80),[r,o]=(0,i.useState)(0),[c,h]=(0,i.useState)(!1),[m,d]=(0,i.useState)(400),[u,x]=(0,i.useState)({turnfactor:.2,visualRange:40,protectedRange:4,centeringFactor:5e-4,avoidFactor:.05,matchingFactor:.05,maxSpeed:4,minSpeed:2,turnFactor:.2,maxBias:.01,biasIncrm:4e-5});return(0,s.jsxs)("div",{className:"flex flex-row items-center bg-black space-x-4 h-full w-full absolute",children:[(0,s.jsxs)("div",{className:"flex flex-col space-y-4 ml-4 mt-4",children:[(0,s.jsx)(S,{name:"number birds",min:0,max:700,defaultVal:[m],step:1,onValueChange:e=>d(e[0])}),(0,s.jsx)(S,{name:"x boundry",min:30,max:300,defaultVal:[e[0]],step:1,onValueChange:a=>t([a[0],e[1],e[2]])}),(0,s.jsx)(S,{name:"y boundry",min:30,max:300,defaultVal:[e[1]],step:1,onValueChange:a=>t([e[0],a[0],e[2]])}),(0,s.jsx)(S,{name:"z boundry",min:30,max:300,defaultVal:[e[2]],step:1,onValueChange:a=>t([e[0],e[1],a[0]])}),(0,s.jsx)(S,{name:"all perching",min:0,max:1,defaultVal:[0],step:1,onValueChange:e=>h(1===e[0])}),(0,s.jsx)(S,{name:"visual range",min:0,max:60,defaultVal:[u.visualRange],step:1,onValueChange:e=>x({...u,visualRange:e[0]})}),(0,s.jsx)(S,{name:"protected range",min:0,max:20,defaultVal:[u.protectedRange],step:1,onValueChange:e=>x({...u,protectedRange:e[0]})}),(0,s.jsx)(S,{name:"centering factor",min:0,max:.01,defaultVal:[u.centeringFactor],step:1e-4,onValueChange:e=>x({...u,centeringFactor:e[0]})}),(0,s.jsx)(S,{name:"avoid factor",min:0,max:.1,defaultVal:[u.avoidFactor],step:.001,onValueChange:e=>x({...u,avoidFactor:e[0]})}),(0,s.jsx)(S,{name:"matching factor",min:0,max:.1,defaultVal:[u.matchingFactor],step:.001,onValueChange:e=>x({...u,matchingFactor:e[0]})}),(0,s.jsx)(S,{name:"turning factor",min:.1,max:.5,defaultVal:[u.turnFactor],step:.001,onValueChange:e=>x({...u,turnFactor:e[0]})}),(0,s.jsx)(S,{name:"speed range",min:1,max:6,defaultVal:[u.minSpeed,u.maxSpeed],step:.1,onValueChange:e=>x({...u,minSpeed:e[0],maxSpeed:e[1]})}),(0,s.jsx)(S,{name:"bias range",min:0,max:.03,defaultVal:[u.biasIncrm,u.maxBias],step:1e-5,onValueChange:e=>x({...u,biasIncrm:e[0],maxBias:e[1]})}),(0,s.jsx)(S,{name:"box opacity",min:0,max:1,defaultVal:[r],step:.01,onValueChange:e=>o(e[0])})]}),(0,s.jsx)("div",{className:"w-4/5 h-[700px] bg-black",children:(0,s.jsx)(l.Xz,{shadows:!0,camera:{fov:75,position:[400,50,-100]},className:"bg-blue-400",children:(0,s.jsx)(p,{border:e,height:a,boidConstants:u,boxOpacity:r,numberBirds:m,allPerching:c})})})]})},S=e=>{let{min:t,max:a,defaultVal:n,step:r,name:i,onValueChange:l}=e;return(0,s.jsxs)("div",{className:"flex flex-col space-y-1",children:[(0,s.jsx)("span",{className:"text-white select-none",children:i}),(0,s.jsxs)(F.fC,{className:"relative select-none touch-none flex items-center w-[200px] h-2",minStepsBetweenThumbs:1,defaultValue:n,min:t,max:a,onValueCommit:l,step:r,"aria-label":"Volume",children:[(0,s.jsx)(F.fQ,{className:"relative bg-white rounded-full h-2 flex-grow",children:(0,s.jsx)(F.e6,{className:"absolute bg-green-500 rounded-full h-full"})}),n.map(e=>(0,s.jsx)(F.bU,{className:"block w-5 h-5 bg-green-500 rounded-full outline-none "},e))]})]})};var w=a(9008),N=a.n(w);function P(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(N(),{children:[(0,s.jsx)("title",{children:"Create Next App"}),(0,s.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,s.jsx)("link",{rel:"icon",href:"/Wings/favicon.ico"})]}),(0,s.jsx)(M,{})]})}}},function(e){e.O(0,[737,203,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);