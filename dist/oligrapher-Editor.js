(window.webpackJsonpOligrapher=window.webpackJsonpOligrapher||[]).push([[1],{294:function(e,t,a){"use strict";a.r(t),a.d(t,"Editor",(function(){return se}));var l=a(1),n=a.n(l),r=a(119),c=a(4),o=a(11),i=a(6),s=a(545),u=a(2),m=a.n(u),d=a(188),E=a(92),b=a(563),p=a(564),O=a(565),g=a.n(O),h=a(26),j=a.n(h);const y={node:{icon:n.a.createElement(d.c,null),title:"Add Node"},text:{icon:n.a.createElement(b.b,null),title:"Add Text"},style:{icon:n.a.createElement(d.d,null),title:"Style Selected Nodes"},interlocks:{icon:n.a.createElement(p.a,null),title:"Interlocks"},organize:{icon:n.a.createElement(d.a,null),title:"Organize Map"},annotations:{icon:n.a.createElement(g.a,null),title:"Annotations"},settings:{icon:n.a.createElement(b.a,null),title:"Settings"},editors:{icon:n.a.createElement(E.e,null),title:"Editors"},help:{icon:n.a.createElement(E.b,null),title:"Help"}};function f({item:e,disabled:t,inUse:a}){const{title:r,icon:c}=y[e],o=Object(i.c)(),s=Object(l.useCallback)(()=>o({type:"TOGGLE_TOOL",tool:e}),[o,e]),u=Object(l.useCallback)(()=>o({type:"TOGGLE_ANNOTATIONS"}),[o]),m="annotations"===e?u:s,d="editor-menu-item editor-".concat(e,"-item")+(t?" editor-menu-item-disabled":"")+(a?" editor-menu-item-in-use":"");return n.a.createElement("div",{className:d,onClick:t?j.a:m},n.a.createElement("span",{title:r},c))}f.propTypes={item:m.a.oneOf(Object.keys(y)).isRequired,disabled:m.a.bool,inUse:m.a.bool.isRequired},f.defaultProps={disabled:!1};var k=a(175),v=a(51);function C(){const e=Object(i.c)(),t=Object(i.d)(e=>e.graph.past),a=Object(i.d)(e=>e.graph.future),r=Object(l.useCallback)(()=>{e({type:"CLOSE_EDITOR"}),e(k.ActionCreators.undo())},[e]),c=Object(l.useCallback)(()=>{e({type:"CLOSE_EDITOR"}),e(k.ActionCreators.redo())},[e]);return t&&a?n.a.createElement("div",{id:"oligrapher-undo-redo"},n.a.createElement("button",{title:"Undo",disabled:0===t.length,onClick:r},n.a.createElement(v.d,null)),n.a.createElement("button",{title:"Redo",disabled:0===a.length,onClick:c},n.a.createElement(v.c,null))):null}const S=["node","text","style","interlocks","annotations","organize","settings","editors","help"];function T(){const e=Object(i.d)(e=>e.display.tool),t=Object(i.d)(e=>e.attributes.id),a=Object(i.d)(o.i),l=Object(s.a)(e=>e.breakpoints.down("sm"));let r=a?S:S.filter(e=>!["editors","settings"].includes(e));return r=t?r:r.filter(e=>"editors"!==e),n.a.createElement("div",{className:"editor-menu"},r.map(t=>n.a.createElement(f,{key:t,item:t,inUse:t===e,disabled:l&&"annotations"===t})),n.a.createElement(C,null))}a(43);var N=a(25),w=a(17),D=a.n(w),_=a(28),R=a(260);function A({query:e,maxHeight:t}){const a=Object(i.c)(),[r,o]=Object(l.useState)(!0),[s,u]=Object(l.useState)(null),m=Object(l.useCallback)(e=>{a({type:"ADD_NODE",node:e})},[a]);let d;return Object(l.useEffect)(()=>{o(!0);const t=Object(c.g)(Object(_.d)(e));return t.promise.then(e=>{u(e),o(!1)}).catch(e=>{e.isCanceled||(u(!1),o(!1))}),t.cancel},[e]),d=r?n.a.createElement("em",null,"...loading..."):D()(s)?0===s.length?n.a.createElement("em",null,"No results."):n.a.createElement(R.a,{results:s,onClick:m}):n.a.createElement("em",null,"Your search resulted in an error."),n.a.createElement("div",{className:"entity-search",style:{maxHeight:t,overflowY:"scroll"}},d)}A.propTypes={query:m.a.string.isRequired,maxHeight:m.a.number};var x=a(37),L=a(40);function I(e){var t=e.title,a=e.children,r=Object(i.c)(),c=Object(l.useCallback)((function(){return r({type:"CLOSE_TOOL"})}),[r]);return Object(x.a)("escape",c,{filter:function(){return!0}}),n.a.createElement("div",{className:"oligrapher-toolbox"},n.a.createElement("header",null,t,n.a.createElement("button",{onClick:c},n.a.createElement(L.a,null))),n.a.createElement("main",null,a))}function U(){const e=Object(i.c)(),[t,a]=Object(l.useState)(""),[r,o]=Object(l.useState)(),s=t.trim(),u=s.length>2,m=Object(c.b)(a),d=Object(c.i)(e=>{if(!e)return;const{bottom:t,height:a}=e,l=t-window.innerHeight;o(a-l-100)});return n.a.createElement(I,{title:"Add Node"},n.a.createElement("div",{className:"node-tool",ref:d},n.a.createElement("input",{autoFocus:!0,type:"text",placeholder:"Search database",value:t,onChange:m}),u&&n.a.createElement("div",null,"Select below or ",n.a.createElement("a",{onClick:()=>{e({type:"ADD_NODE",node:N.b.new({name:s})})}},"create new node"),n.a.createElement("hr",null),n.a.createElement(A,{query:s,maxHeight:r}))))}function M(){return n.a.createElement(I,{title:"Add Text"},n.a.createElement("div",null,"Click anywhere to create a new caption."))}var z=a(213),F=a.n(z),H=a(91),q=a.n(H),G=a(60),P=a(248),Q=a(247);function K(e,t){const a=q()(e.map(e=>e[t]));return 1===a.length?a[0]:null}function Y(){const e=Object(i.c)(),t=Object(i.d)(e=>e.display.selection.node),a=Object(i.d)(e=>Object.values(F()(e.graph.nodes,t))),r=Object(i.d)(e=>Object.values(e.graph.nodes).map(e=>e.color)),[o,s]=Object(l.useState)("color"),[u,m]=Object(l.useState)(K(a,"image")||""),[d,E]=Object(l.useState)(K(a,"color")||"#cccccc"),[b,p]=Object(l.useState)(K(a,"scale")||1),O=Object(l.useCallback)(Object(c.b)(m),[]),g=Object(l.useCallback)(()=>{const a=F()({image:u,color:d,scale:b},o);e({type:"UPDATE_NODES",nodeIds:t,attributes:a})},[e,t,u,d,b,o]);return n.a.createElement(I,{title:"Style Nodes"},n.a.createElement("div",{className:"oligrapher-style-nodes"},n.a.createElement("main",null,"color"===o&&n.a.createElement(P.a,{color:d,onChange:E,colors:r}),"scale"===o&&n.a.createElement(Q.a,{scale:b,onChange:p}),"image"===o&&n.a.createElement(n.a.Fragment,null,n.a.createElement("label",null,"Image"),n.a.createElement("input",{type:"url",value:u,placeholder:"image url",onChange:O}))),n.a.createElement("hr",null),n.a.createElement("div",{className:"editor-page-buttons"},n.a.createElement("div",null,n.a.createElement("span",{title:"Color",className:"entity-color-icon",onClick:()=>s("color")},n.a.createElement(L.d,null)),n.a.createElement("span",{title:"Size",className:"entity-size-icon",onClick:()=>s("scale")},n.a.createElement(L.f,null)),n.a.createElement("span",{title:"Image",className:"entity-image-icon",onClick:()=>s("image")},n.a.createElement(L.e,null)))),n.a.createElement("hr",null),n.a.createElement("footer",null,n.a.createElement(G.a,{onClick:g,variant:"contained",color:"primary",size:"small",disabled:0===t.length,disableElevation:!0},"Apply"),n.a.createElement("div",{className:"oligrapher-style-nodes-count"},"Nodes selected: ",t.length))))}function V(){const e=Object(i.c)(),t=Object(l.useCallback)(()=>e({type:"INTERLOCKS_REQUESTED"}),[e]),a=Object(i.d)(e=>e.display.selection.node),r=a.filter(c.f),o=2===a.length&&2===r.length;return n.a.createElement(I,{title:"Interlocks"},n.a.createElement("div",{className:"oligrapher-interlocks"},n.a.createElement("p",null,"Select two nodes that were imported from LittleSis to fetch their interlocks."),n.a.createElement("p",null,"If a node was imported from LittleSis, you'll see a ",n.a.createElement(v.a,null)," icon at the bottom of the form when editing it."),n.a.createElement(G.a,{disabled:!o,onClick:t,variant:"contained",color:"primary",disableElevation:!0},"Get interlocks")))}function J(){const e=Object(i.c)(),t=Object(l.useCallback)(()=>e({type:"FORCE_LAYOUT_REQUESTED"}),[e]);return n.a.createElement(I,{title:"Organize Map"},n.a.createElement("div",{className:"organize-map"},n.a.createElement("table",null,n.a.createElement("tbody",null,n.a.createElement("tr",null,n.a.createElement("td",null,n.a.createElement("a",{title:"Force-directed",onClick:t},n.a.createElement(d.a,null))),n.a.createElement("td",null,n.a.createElement("strong",null,"Force-directed:")," use physics simulation to automatically arrange nodes"))))))}const Z={Privacy:{private:"Set map to private",clone:"Allow map cloning",list_sources:"Show source links"},View:{defaultStoryMode:"Default: Story Mode",defaultExploreMode:"Default: Explore Mode",storyModeOnly:"Story Mode Only",exploreModeOnly:"Explore Mode Only"},Editing:{automaticallyAddEdges:"Automatically add edges",scrollToZoom:"Scroll to zoom"}};function B(){const e=Object(i.c)(),t=Object(c.j)(e=>e.attributes.settings),a=Object(l.useCallback)(t=>{const{name:a,checked:l}=t.target;e({type:"UPDATE_SETTING",key:a,value:l})},[e]);return n.a.createElement(I,{title:"Settings"},n.a.createElement("div",{className:"oligrapher-settings"},Object.keys(Z).map(e=>n.a.createElement("div",{key:e},n.a.createElement("label",null,e),Object.keys(Z[e]).map(l=>n.a.createElement("div",{className:"settings-option",key:l},n.a.createElement("div",{className:"settings-option-name"},Z[e][l],": "),n.a.createElement("div",null,n.a.createElement("input",{type:"checkbox",name:l,checked:t[l],onChange:a}))))))))}function W(e){var t=e.editors,a=e.removeEditor;return 0===t.length?n.a.createElement("div",null,n.a.createElement("em",null,"This map has no other editors.")):n.a.createElement("div",{className:"oligrapher-editors-list"},t.map((function(e){return n.a.createElement("div",{key:e.name},n.a.createElement("a",{href:e.url,target:"_blank",rel:"noopener noreferrer"},e.name)," ",n.a.createElement("span",null,e.pending?"(pending)":"")," ",n.a.createElement("a",{className:"oligrapher-remove-editor",onClick:function(){return a(e.name)}},n.a.createElement(v.e,null)))})))}function X(){var e=Object(i.c)(),t=Object(c.j)((function(e){return e.attributes.editors})),a=Object(c.j)((function(e){return e.attributes.id})),r=Object(l.useRef)(),o=Object(l.useCallback)((function(){r.current.value&&(e({type:"ADD_EDITOR_REQUESTED",username:r.current.value}),r.current.value=null)}),[e]),s=Object(l.useCallback)((function(t){return e({type:"REMOVE_EDITOR_REQUESTED",username:t})}),[e]);return n.a.createElement(I,{title:"Editors"},n.a.createElement("div",{className:"oligrapher-editors"},n.a.createElement(W,{editors:t,removeEditor:s}),!a&&n.a.createElement("div",null,n.a.createElement("em",null,"You must save this map before you can add editors.")),n.a.createElement("div",{className:"oligrapher-editors-input"},n.a.createElement("input",{type:"text",placeholder:"Enter username",ref:r})," ",n.a.createElement("button",{onClick:o},"Add")),"After you add an editor they must visit this page to confirm."))}var $=a(542);function ee(){const e=Object(i.c)(),t=Object(l.useCallback)(()=>e({type:"CLOSE_TOOL"}),[e]);return n.a.createElement($.a,{id:"oligrapher-help",elevation:3},n.a.createElement("header",null,"User Guide",n.a.createElement("button",{onClick:t},n.a.createElement(L.a,null))))}function te(){const e=Object(i.c)(),t=Object(c.j)(e=>e.attributes.id);let a,n,r=0;const o=()=>(a=Object(c.g)(Object(_.g)(t)),a.promise.then(t=>{e({type:"SET_LOCK",lock:t}),n=setTimeout(()=>o(),1e4)}).catch(e=>{r++,r>10?console.error("Poll HTTP request failed too many times"):n=setTimeout(()=>o(),1e4)}),()=>{a.cancel(),clearTimeout(n)});return Object(l.useEffect)(o,[t,e]),null}var ae=a(187),le=a(183),ne=a(184),re=a(185);function ce(){const e=Object(i.c)(),t=Object(l.useCallback)(()=>e({type:"SET_EDITOR_MODE",enabled:!1}),[e]),a=Object(l.useCallback)(()=>e({type:"LOCK_TAKEOVER_REQUESTED"})[e]),{locked:r,userHasLock:s,name:u,userHasPermission:m}=Object(c.j)(e=>e.attributes.lock),d=Object(c.j)(o.i);return n.a.createElement(n.a.Fragment,null,n.a.createElement(ae.a,{id:"oligrapher-lock-modal",open:r&&!s,onClose:t,"aria-describedby":"alert-dialog-description"},n.a.createElement(le.a,null,n.a.createElement(ne.a,{id:"alert-dialog-description"},m&&n.a.createElement(n.a.Fragment,null,n.a.createElement("strong",null,u)," is editing this map right now. Get in touch with your team to get editing control.",d&&n.a.createElement(n.a.Fragment,null,n.a.createElement("br",null),n.a.createElement("br",null),"As the owner of this map, ",n.a.createElement("strong",null,"you can resume editing, but ",u," will lose any unsaved changes!")," (It will also cause this page to reload.)")),!m&&n.a.createElement(n.a.Fragment,null,"You don't have permission to edit this map. Get in touch with the map owner to be added as an editor."))),n.a.createElement(re.a,null,n.a.createElement(G.a,{onClick:t,variant:"contained",color:"default"},"Close editor"),d&&n.a.createElement(G.a,{onClick:a,variant:"contained",color:"primary"},"Resume editing"))))}function oe({name:e,start:t}){const a=()=>Math.ceil((t+1e4-Date.now())/1e3),r=()=>{window.location.reload()},[c,o]=Object(l.useState)(a());let i;return Object(l.useEffect)(()=>(i=setInterval(()=>{let e=a();console.log("refresh modal time left:",e),e<0?(clearInterval(i),r()):o(e)},100),()=>clearInterval(i))),n.a.createElement(n.a.Fragment,null,n.a.createElement(ae.a,{open:!0,onClose:r,"aria-describedby":"alert-dialog-description"},n.a.createElement(le.a,null,n.a.createElement(ne.a,{id:"alert-dialog-description"},n.a.createElement("strong",null,e)," has finished editing this map, and your copy may be out-of-date.",n.a.createElement("br",null),n.a.createElement("br",null),"This page will refresh in ",c," seconds.")),n.a.createElement(re.a,null,n.a.createElement(G.a,{onClick:r,variant:"contained",color:"default"},"Refresh"))))}function ie(){const e=Object(i.c)(),{name:t,start:a}=Object(i.d)(e=>e.attributes.lock.refresh),{userHasLock:l}=Object(i.d)(e=>e.attributes.lock);return Object(x.a)("ctrl+r+l",()=>{l&&e({type:"LOCK_RELEASE_REQUESTED"})},null,[l]),n.a.createElement("div",{id:"oligrapher-lock-manager"},n.a.createElement(te,null),n.a.createElement(ce,null),t&&a&&n.a.createElement(oe,{name:t,start:a}))}function se(){const e=Object(c.j)(e=>e.display.tool),t=Object(c.j)(e=>!e.display.modes.editor),a="oligrapher-graph-editor"+("text"===e?" text-tool":""),l=Object(c.j)(o.d);return t?null:n.a.createElement("div",{className:a},l&&n.a.createElement(ie,null),n.a.createElement(T,null),"node"===e&&n.a.createElement(U,null),"text"===e&&n.a.createElement(M,null),"style"===e&&n.a.createElement(Y,null),"interlocks"===e&&n.a.createElement(V,null),"organize"===e&&n.a.createElement(J,null),"settings"===e&&n.a.createElement(B,null),"editors"===e&&n.a.createElement(X,null),"help"===e&&n.a.createElement(ee,null))}oe.propTypes={name:m.a.string.isRequired,start:m.a.number.isRequired};t.default=Object(r.hot)(se)}}]);