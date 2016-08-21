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
  }

} //class end




module.exports = DomNodeCollection;
