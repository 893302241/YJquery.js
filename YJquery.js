 //"name: YJquery.js
 //version: 1.0.0
 //description: 精简版的jquery.js
 //author: 袁小布

function myAddEvent(obj,ev,fn){
	if(obj.attachEvent){
		obj.attachEvent('on'+ev,fn)
	}else{
		obj.addEventListener(ev,fn,false)
	}
}
function getByClass(sClass){
	var aEle=document.getElementsByTagName('*');
	var aResult=[];
	for(var i=0,len=aEle.length;i<len;i++){
		if(aEle[i].className==sClass){
			aResult.push(aEle[i])
		}
	}
	return aResult;
}
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr]
	}else{
		return getComputedStyle(obj,false)[attr]
	}
}

function YJquery(Arg){
	//用来保存选择的元素
	this.elements=[];//库里的this始终指向实例化对象
	switch(typeof Arg){
		case 'function':
			myAddEvent(window,'load',Arg)
		break;
		case 'string':
			switch(Arg.charAt(0)){
				case '#': //ID
					this.elements.push(document.getElementById(Arg.substring(1)))
				break;  //class
				case '.':
					this.elements=getByClass(Arg.substring(1))
				break; //tagName
				default:
				this.elements=document.getElementsByTagName(Arg)

			}
		break;
		case 'object':
		this.elements.push(Arg);
	}
}
YJquery.prototype.click=function(fn){
	for(var i=0,len=this.elements.length;i<len;i++){
		myAddEvent(this.elements[i],'click',fn)
	}
}
YJquery.prototype.show=function(){
	for(var i=0,len=this.elements.length;i<len;i++){
		this.elements[i].style.display='block';
	}
}
YJquery.prototype.hide=function(){
	for(var i=0,len=this.elements.length;i<len;i++){
		this.elements[i].style.display='none';
	}
}
YJquery.prototype.hover=function(inFn,outFn){
	for(var i=0,len=this.elements.length;i<len;i++){
		myAddEvent(this.elements[i],'mouseover',inFn);
		myAddEvent(this.elements[i],'mouseout',outFn);
	}
}
YJquery.prototype.css=function(attr,value){
	if(arguments.length==2){
		for(var i=0,len=this.elements.length;i<len;i++){
			console.log(this.elements[i].style,'jquery')
			this.elements[i].style[attr]=value
		}
	}else{
		return getStyle(this.elements[0],attr)
	}
}
function $(Arg){
	return new YJquery(Arg)
}