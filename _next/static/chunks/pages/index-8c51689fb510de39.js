(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,a,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2094)}])},2094:function(e,a,n){"use strict";n.r(a),n.d(a,{default:function(){return j}});var t=n(5893),r=n(7294),l=n(5029),o=n(1884),s=n(9365),i=n(9477);let c=e=>{let{border:a,boidConstants:n,boxOpacity:l,numberBirds:c}=e,{camera:h,gl:x,scene:p}=(0,o.z)(),g=new s.z(h,x.domElement);g.enableDamping=!0,g.rotateSpeed=.01,g.zoomSpeed=.001;let f=(0,r.useRef)(null),j=(0,r.useRef)(null);p.add(h),f.current&&h.add(f.current),j.current&&h.add(j.current);let b=(0,r.useRef)(null);(0,r.useEffect)(()=>{p.children.forEach(e=>{var a;e instanceof i.Mesh&&e.geometry instanceof i.ConeGeometry&&(null===(a=e.geometry)||void 0===a||a.rotateX(Math.PI/2))})},[]),(0,o.A)(()=>{g.update()});let F=Array.from(Array(c)).map(e=>[i.MathUtils.randFloat(-1*a[0]/2,a[0]/2),i.MathUtils.randFloat(-1*a[1]/2,a[1]/2),i.MathUtils.randFloat(-1*a[2]/2,a[2]/2),i.MathUtils.randFloat(-2,2),i.MathUtils.randFloat(-2,2),i.MathUtils.randFloat(-2,2),m(e,c)||d(e,c)?i.MathUtils.randFloat(4e-5,.01):0]),[V,S]=(0,r.useState)(F);return(0,o.A)(()=>{let e=V.map((e,t)=>{let r=u(V,e,t,a,n);return r});S(e)}),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("pointLight",{ref:f,position:[0,.2,4],intensity:.1,color:new i.Color(90,60,0)}),(0,t.jsx)("directionalLight",{ref:j,position:[0,4,0],intensity:.5,castShadow:!0}),(0,t.jsxs)("mesh",{position:[0,0,0],children:[(0,t.jsx)("boxGeometry",{args:[a[0],a[1],a[2]],ref:b}),(0,t.jsx)("meshStandardMaterial",{color:"gray",opacity:l,transparent:!0,wireframeLinejoin:"round",side:i.DoubleSide})]}),V.map((e,a)=>(0,t.jsxs)("mesh",{position:[e[0],e[1],e[2]],onUpdate(a){a.lookAt(new i.Vector3(e[0]+e[3],e[1]+e[4],e[2]+e[5]))},children:[(0,t.jsx)("coneGeometry",{args:[1,5]}),(0,t.jsx)("meshStandardMaterial",{color:"green"})]},a))]})},m=(e,a)=>e<a/5,d=(e,a)=>e>a/5&&e<2*a/5,u=(e,a,n,t,r)=>{let l=new i.Vector3(a[0],a[1],a[2]),o=0,s=0,c=0,u=0,h=0,x=0,p=0,g=0,f=0,j=0;for(let b=0;b<e.length;b++)if(b!==n){let F=new i.Vector3(e[b][0],e[b][1],e[b][2]);l.distanceTo(F)<r.visualRange&&(o+=e[b][0],s+=e[b][1],c+=e[b][2],u+=e[b][3],h+=e[b][4],x+=e[b][5],j+=1),l.distanceTo(F)<r.protectedRange&&(p+=l.x-F.x,g+=l.y-F.y,f+=l.z-F.z)}j>0&&(a[3]+=(o/j-a[0])*r.centeringFactor+(u/j-a[3])*r.matchingFactor,a[4]+=(s/j-a[1])*r.centeringFactor+(h/j-a[4])*r.matchingFactor,a[5]+=(c/j-a[2])*r.centeringFactor+(x/j-a[5])*r.matchingFactor),a[3]+=p*r.avoidFactor,a[4]+=g*r.avoidFactor,a[5]+=f*r.avoidFactor;let V=t[0]/2,S=-1*t[0]/2,v=t[1]/2,w=-1*t[1]/2,y=t[2]/2,C=-1*t[2]/2;a[0]>V&&(a[3]-=r.turnFactor),a[0]<S&&(a[3]+=r.turnFactor),a[1]>v&&(a[4]-=r.turnFactor),a[1]<w&&(a[4]+=r.turnFactor),a[2]>y&&(a[5]-=r.turnFactor),a[2]<C&&(a[5]+=r.turnFactor),m(n,e.length)&&(a[3]>0?a[6]=Math.min(r.maxBias,a[6]+r.biasIncrm):a[6]=Math.min(r.biasIncrm,a[6]-r.biasIncrm)),d(n,e.length)&&(a[3]<0?a[6]=Math.min(r.maxBias,a[6]+r.biasIncrm):a[6]=Math.min(r.biasIncrm,a[6]-r.biasIncrm)),m(n,e.length)&&(a[3]=(1-a[6])*a[3]+a[6]),d(n,e.length)&&(a[3]=(1-a[6])*a[3]-a[6]);let M=(a[3]**2+a[4]**2+a[5]**2)**.5;return M<r.minSpeed&&(a[3]=a[3]/M*r.minSpeed,a[4]=a[4]/M*r.minSpeed,a[5]=a[5]/M*r.minSpeed),M>r.maxSpeed&&(a[3]=a[3]/M*r.maxSpeed,a[4]=a[4]/M*r.maxSpeed,a[5]=a[5]/M*r.maxSpeed),a[0]+=a[3],a[1]+=a[4],a[2]+=a[5],a};var h=n(7090);n(4184);let x=()=>{let[e,a]=(0,r.useState)([300,180,240]),[n,o]=(0,r.useState)(.4),[s,i]=(0,r.useState)(500),[m,d]=(0,r.useState)({turnfactor:.2,visualRange:30,protectedRange:8,centeringFactor:5e-4,avoidFactor:.05,matchingFactor:.05,maxSpeed:4,minSpeed:2,turnFactor:.2,maxBias:.01,biasIncrm:4e-5});return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("div",{className:"w-full h-full h-grow bg-black absolute",children:(0,t.jsx)(l.Xz,{shadows:!0,camera:{fov:50,position:[300,300,300]},children:(0,t.jsx)(c,{border:e,boidConstants:m,boxOpacity:n,numberBirds:s})})}),(0,t.jsxs)("div",{className:"absolute flex flex-col space-y-4 ml-4 mt-4",children:[(0,t.jsx)(p,{name:"number birds",min:0,max:700,defaultVal:[s],step:.01,onValueChange:e=>i(e[0])}),(0,t.jsx)(p,{name:"x boundry",min:30,max:300,defaultVal:[e[0]],step:1,onValueChange:n=>a([n[0],e[1],e[2]])}),(0,t.jsx)(p,{name:"y boundry",min:30,max:300,defaultVal:[e[1]],step:1,onValueChange:n=>a([e[0],n[0],e[2]])}),(0,t.jsx)(p,{name:"z boundry",min:30,max:300,defaultVal:[e[2]],step:1,onValueChange:n=>a([e[0],e[1],n[0]])}),(0,t.jsx)(p,{name:"visual range",min:0,max:60,defaultVal:[m.visualRange],step:1,onValueChange:e=>d({...m,visualRange:e[0]})}),(0,t.jsx)(p,{name:"protected range",min:0,max:20,defaultVal:[m.protectedRange],step:1,onValueChange:e=>d({...m,protectedRange:e[0]})}),(0,t.jsx)(p,{name:"centering factor",min:0,max:.01,defaultVal:[m.centeringFactor],step:1e-4,onValueChange:e=>d({...m,centeringFactor:e[0]})}),(0,t.jsx)(p,{name:"avoid factor",min:0,max:.1,defaultVal:[m.avoidFactor],step:.001,onValueChange:e=>d({...m,avoidFactor:e[0]})}),(0,t.jsx)(p,{name:"matching factor",min:0,max:.1,defaultVal:[m.matchingFactor],step:.001,onValueChange:e=>d({...m,matchingFactor:e[0]})}),(0,t.jsx)(p,{name:"speed range",min:1,max:6,defaultVal:[m.minSpeed,m.maxSpeed],step:.1,onValueChange:e=>d({...m,minSpeed:e[0],maxSpeed:e[1]})}),(0,t.jsx)(p,{name:"box opacity",min:0,max:1,defaultVal:[n],step:.01,onValueChange:e=>o(e[0])})]})]})},p=e=>{let{min:a,max:n,defaultVal:r,step:l,name:o,onValueChange:s}=e;return(0,t.jsxs)("div",{className:"flex flex-col space-y-1",children:[(0,t.jsx)("span",{className:"text-white select-none",children:o}),(0,t.jsxs)(h.fC,{className:"relative select-none touch-none flex items-center w-[200px] h-2",minStepsBetweenThumbs:1,defaultValue:r,min:a,max:n,onValueChange:s,step:l,"aria-label":"Volume",children:[(0,t.jsx)(h.fQ,{className:"relative bg-white rounded-full h-2 flex-grow",children:(0,t.jsx)(h.e6,{className:"absolute bg-green-500 rounded-full h-full"})}),r.map(e=>(0,t.jsx)(h.bU,{className:"block w-5 h-5 bg-green-500 rounded-full outline-none "},e))]})]})};var g=n(9008),f=n.n(g);function j(){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(f(),{children:[(0,t.jsx)("title",{children:"Create Next App"}),(0,t.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,t.jsx)("link",{rel:"icon",href:"/Wings/favicon.ico"})]}),(0,t.jsx)(x,{})]})}}},function(e){e.O(0,[737,253,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);