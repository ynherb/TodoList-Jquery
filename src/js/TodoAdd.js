export default class TodoAdd {
	constructor (elem, msgErr) {
		this.elem = elem;
		this.msgErr = msgErr;
		this.timer = null;
	}
  
  inputVal () {
  	let obj = {}
  	this.elem.find('input').each(function() {
  	  obj[this.name] = this.value
    });
    this.elem.find('button').eq(0).attr('disabled','disabled')
    return obj
  }

  completed () {
  	this.elem.find('input').each(function() {
  	  this.value = ''
    });
    this.elem.find('button').eq(0).removeAttr('disabled','disabled')
  }

  errText () {
  	const elemErr = this.elem.find('.alert').eq(0)
  	let timer;
  	this.errText =  function () {
  		this.elem.find('button').eq(0).removeAttr('disabled','disabled')
  		if (timer) clearTimeout(timer)
  		else elemErr.slideToggle()
  	  timer = setTimeout(() => {
  	    elemErr.slideToggle()
  	    timer = false;
  	  }, 3000)
  	}
  	this.errText();
  }
}