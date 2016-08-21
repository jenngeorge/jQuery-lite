/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DomNodeCollection = __webpack_require__(1);


	window.$l = function(arg) {
	  let funcArr = [];
	  document.addEventListener("DOMContentLoaded", event => {
	    funcArr.forEach(func => {
	      console.log('im ready');
	      func();
	    });
	  });

	  if(arg instanceof Function){
	    if(document.readyState === 'complete'){
	      console.log('was already ready');
	      arg();
	    }else{
	      funcArr.push(arg);
	    }
	  }
	  else if (arg instanceof Object ){
	    return new DomNodeCollection(arg);
	  }
	  else if (arg instanceof String){
	    let arr = Array.from(document.querySelectorAll(arg));
	    return new DomNodeCollection(arr);
	  }
	}; // class end

	$l.extend =function(...args){
	  let obj = {};
	  args.forEach (arg=> {
	    obj = Object.assign(obj, arg);
	  });
	  return obj;
	};

	$l.ajax = function(obj){
	  let defaults= {
	    url: "http://appacademy.io",
	    type: "GET",
	    contentType: "JSON",
	    data: "",
	    success(data) {
	      alert(`you got a response!`);
	    },
	    error(){
	      console.error("An error occured.");
	    },
	  };

	  const req = $l.extend(defaults, obj);
	  const xhr = new XMLHttpRequest();
	  xhr.open(req.type, req.url);
	  xhr.onload = function () {
	    console.log(xhr.status);
	    console.log(xhr.responseType);
	    console.log(xhr.response);
	  };
	  xhr.send(req.data);
	};

	let body = document.querySelectorAll('body');
	console.log();


	let allLi = document.querySelectorAll('li');
	// console.log(allLi);

	const objA = {a: 'a', b: 'a', c: 'a'};
	const objB = {b: 'b', c: 'b'};
	const objC = {c: 'c'};

	const newL = $l.extend(objA, objB, objC);
	// console.log(newL);


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DomNodeCollection {
	  constructor(htmlelements){
	    this.htmlelements = Array.from(htmlelements);
	  }

	  html(arg){
	    if(arg){
	      this.htmlelements.forEach(el => {
	        el.innerHTML = arg;
	      });
	    }else{
	      return this.htmlelements[0].innerHTML;
	    }
	  }

	  empty(){
	    this.htmlelements.forEach(el => {
	      el.innerHTML = "";
	    });
	  }

	  append(...args){
	    this.htmlelements.forEach(el => {
	      args.forEach(arg => {
	        if(arg instanceof String){
	            el.innerHTML += arg;
	        }else{
	          el.innerHTML += arg.outerHTML;
	        }
	      });
	    });
	  }

	  attr(...args){
	    if(args.length <= 1){
	      let attrs = [];
	      this.htmlelements.forEach(el => {
	        attrs.push(el.getAttribute(args[0]));
	      });
	      return attrs;
	    } else {
	      this.htmlelements.forEach(el => {
	        el.setAttribute(args[0], args[1]);
	      });
	    }
	  }

	  addClass(newClass){
	    this.htmlelements.forEach(el => {
	      el.setAttribute("class", newClass);
	    });
	  }

	  removeClass(){
	    this.htmlelements.forEach(el => {
	      el.removeAttribute("class");
	    });
	  }

	  children(){
	    let arr = [];
	    this.htmlelements.forEach(el =>{
	      let children = Array.from(el.children);
	      arr = arr.concat(children);
	    });
	    return new DomNodeCollection(arr);
	  }

	  parent(){
	    let arr = [];
	    this.htmlelements.forEach(el =>{
	      arr = arr.concat(el.parentNode);
	    });
	    return new DomNodeCollection(arr);
	  }

	  find(selector){
	    let found = [];
	    this.htmlelements.forEach(el => {
	      let elFound = Array.from(el.querySelectorAll(selector));
	      found = found.concat(elFound);
	    });

	    return new DomNodeCollection(found);
	  }

	  remove(){
	    this.empty();
	    this.htmlelements = [];
	  }

	  on(action, callback){
	    this.htmlelements.forEach(el => {
	      console.log(action);
	      console.log(callback);
	      el.addEventListener(`${action}`, callback);
	    });
	  }

	  off(action, callback){
	    for (var i = 0; i < this.htmlelements.length; i++) {
	        this.htmlelements[i].removeEventListener(`${action}`, callback);
	    }
	    // this.htmlelements.forEach(el => {
	    //   el.removeEventListener(`${action}`, callback);
	    // });
	  }

	} //class end




	module.exports = DomNodeCollection;


/***/ }
/******/ ]);