function addLR(lr = 'r', imgUrl = [], qrUrl = []) {
  var browser = {
    ie6: function () {
      return ((window.XMLHttpRequest == undefined) && (ActiveXObject != undefined))
    },
    getWindow: function () {
      var myHeight = 0;
      var myWidth = 0;
      if (typeof (window.innerWidth) == 'number') {
        myHeight = window.innerHeight;
        myWidth = window.innerWidth
      } else if (document.documentElement) {
        myHeight = document.documentElement.clientHeight;
        myWidth = document.documentElement.clientWidth
      } else if (document.body) {
        myHeight = document.body.clientHeight;
        myWidth = document.body.clientWidth
      }
      return {'height': myHeight, 'width': myWidth}
    },
    getScroll: function () {
      var myHeight = 0;
      var myWidth = 0;
      if (typeof (window.pageYOffset) == 'number') {
        myHeight = window.pageYOffset;
        myWidth = window.pageXOffset
      } else if (document.documentElement) {
        myHeight = document.documentElement.scrollTop;
        myWidth = document.documentElement.scrollLeft
      } else if (document.body) {
        myHeight = document.body.scrollTop;
        myWidth = document.body.scrollLeft
      }
      return {'height': myHeight, 'width': myWidth}
    },
    getDocWidth: function (D) {
      if (!D) var D = document;
      return Math.max(Math.max(D.body.scrollWidth, D.documentElement.scrollWidth), Math.max(D.body.offsetWidth, D.documentElement.offsetWidth), Math.max(D.body.clientWidth, D.documentElement.clientWidth))
    },
    getDocHeight: function (D) {
      if (!D) var D = document;
      return Math.max(Math.max(D.body.scrollHeight, D.documentElement.scrollHeight), Math.max(D.body.offsetHeight, D.documentElement.offsetHeight), Math.max(D.body.clientHeight, D.documentElement.clientHeight))
    }
  };
  var dom = {
    ID: function (id) {
      var type = typeof (id);
      if (type == 'object') return id;
      if (type == 'string') return document.getElementById(id);
      return null
    }, insertHtml: function (html) {
      var frag = document.createDocumentFragment();
      var div = document.createElement("div");
      div.innerHTML = html;
      for (var i = 0, ii = div.childNodes.length; i < ii; i++) {
        frag.appendChild(div.childNodes[i])
      }
      document.body.insertBefore(frag, document.body.firstChild)
    }
  };
  var myEvent = {
    add: function (element, type, handler) {
      var ele = dom.ID(element);
      if (!ele) return;
      if (ele.addEventListener) ele.addEventListener(type, handler, false); else if (ele.attachEvent) ele.attachEvent("on" + type, handler); else ele["on" + type] = handler
    }, remove: function (element, type, handler) {
      var ele = dom.ID(element);
      if (!ele) return;
      if (ele.removeEventListener) ele.removeEventListener(type, handler, false); else if (ele.detachEvent) ele.detachEvent("on" + type, handler); else ele["on" + type] = null
    }
  };
  var position = {
    rightCenter: function (id) {
      var id = dom.ID(id);
      var ie6 = browser.ie6();
      var win = browser.getWindow();
      var ele = {'height': id.clientHeight, 'width': id.clientWidth};
      if (ie6) {
        var scrollBar = browser.getScroll();
      } else {
        var scrollBar = {'height': 0, 'width': 0};
        id.style.position = 'fixed'
      }
      ele.top = parseInt((win.height - ele.height) / 2 + scrollBar.height);
      id.style.top = ele.top + 'px';
      id.style.right = '3px'
    }, floatRightCenter: function (id) {
      position.rightCenter(id);
      var fun = function () {
        position.rightCenter(id)
      };
      if (browser.ie6()) {
        myEvent.add(window, 'scroll', fun);
        myEvent.add(window, 'resize', fun)
      } else {
        myEvent.add(window, 'resize', fun)
      }
    }, leftCenter: function (id) {
      var id = dom.ID(id);
      var ie6 = browser.ie6();
      var win = browser.getWindow();
      var ele = {'height': id.clientHeight, 'width': id.clientWidth};
      if (ie6) {
        var scrollBar = browser.getScroll();
      } else {
        var scrollBar = {'height': 0, 'width': 0};
        id.style.position = 'fixed'
      }
      ele.top = parseInt((win.height - ele.height) / 2 + scrollBar.height);
      id.style.top = ele.top + 'px';
      id.style.left = '3px'
    }, floatLeftCenter: function (id) {
      position.leftCenter(id);
      var fun = function () {
        position.leftCenter(id)
      };
      if (browser.ie6()) {
        myEvent.add(window, 'scroll', fun);
        myEvent.add(window, 'resize', fun)
      } else {
        myEvent.add(window, 'resize', fun)
      }
    }
  };

//左侧添加方法
  function adLeft(param, hover) {
    var html;
    var a_html = '';
    for (var i = 0; i < param.length; i++) {
      a_html += `<a id="imgL_${i}" id="${param[i].url}" style="position:relative;display: block;height: 82px;text-align: left;" target="_blank">`+
        `<div style="display:none;position: absolute;bottom: 0;right: -136px"><img style="width: 136px;" src="${hover[i]}">`+
        `</div>`+
        `<img src="${param[i].src}" width="80" height="80">`+
        `</a>`
    }
    html = `<div id="adLeft" style="position:absolute;width:82px;height:${82 * param.length}px;z-index:10001">`+
        `<span id="closeBtnL" style="z-index:30;margin: 5px;position:absolute;top:-30px;left:0;cursor: pointer;color: #aaa" href="javascript:void(0);">`+
        `<i style="margin-right: 4px;font-size:12px;vertical-align:bottom;line-height: 8px;text-align:center;display: inline-block;width: 12px;height: 12px;font-style: normal;border: 1px solid #aaa;-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;">x</i>关闭`+
        `</span>${a_html}</div>`

    dom.insertHtml(html);
    position.floatLeftCenter('adLeft');
    var al = document.getElementById('adLeft');
    var cbl = document.getElementById("closeBtnL");
    cbl.addEventListener('click', function () {
      al.style.display = 'none';
      cbl.addEventListener('click', function () {
      })
    });
    var imgL;
    for (var j = 0; j < param.length; j++) {
      imgL = document.getElementById("imgL_" + j);
      imgL.addEventListener('mouseenter', (event) => {
        event.target.childNodes[0].style.display = 'block'
      });
      imgL.addEventListener('mouseleave', (event) => {
        event.target.childNodes[0].style.display = 'none'
      })
    }
  }

//右侧添加
  function adRight(param, hover) {
    var html;
    var a_html = '';
    for (var i = 0; i < param.length; i++) {
      a_html +=`<a id="imgR_${i}" href="${param[i].url}" style="position:relative;display: block;height: 82px;text-align: right;">`+
        `<div style="display:none;position: absolute;bottom: 0;left: -136px"><img style="width: 136px;" src="${hover[i]}"`+
        ` style="position:relative;display: block;height: 82px;text-align: right;" target="_blank">`+
        `</div><img src="${param[i].src}" width="80" height="80" /></a>`
    }
    html = `<div id="adRight" style="position:absolute;width:82px;height:${82 * param.length}px;z-index:10001">`+
      `<span id="closeBtnR" style="line-height: 16px;z-index:30;margin: 5px;position:absolute;top:-30px;right:0;cursor: pointer;color: #aaa" href="javascript:void(0);">`+
      `<i style="margin-right: 4px;font-size:12px;vertical-align:bottom;line-height: 8px;text-align:center;display: inline-block;width: 12px;height: 12px;font-style: normal;border: 1px solid #aaa;-webkit-border-radius: 50%;-moz-border-radius: 50%;border-radius: 50%;">x</i>关闭</span>`+
      `${a_html}</div>`
    dom.insertHtml(html);
    position.floatRightCenter('adRight');
    var ar = document.getElementById('adRight');
    var cbr = document.getElementById("closeBtnR");
    cbr.addEventListener('click', function () {
      ar.style.display = 'none';
      cbr.addEventListener('click', function () {
      })
    });
    var img
    for (var i = 0; i < param.length; i++) {
      img = document.getElementById("imgR_" + i)
      img.addEventListener('mouseenter', (event) => {
        event.target.childNodes[0].style.display = 'block'
      })
      img.addEventListener('mouseleave', (event) => {
        event.target.childNodes[0].style.display = 'none'
      })
    }
  }

  if (lr === 'l') {
    myEvent.add(window, 'load', adLeft(imgUrl, qrUrl));//添加在左侧
  } else if (lr === 'r') {
    myEvent.add(window, 'load', adRight(imgUrl, qrUrl));//添加在右侧
  }
}

