var e = function(selector) {
    return document.querySelector(selector)
}

var es = function(selector) {
    return document.querySelectorAll()
}

var log = function() {
    console.log.apply(console, arguments)
}

var es = function(selector) {
    return document.querySelectorAll(selector)
}

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

function bindEvent(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

// find 函数可以查找 element 的所有子元素
var find = function(element, selector) {
    return element.querySelector(selector)
}

var ajax = function(path, method, header, data, responseCallback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadstatechange = function() {
        if(r.readyState == 4) {
            responseCallback(r)
        }
    }
    r.send(data)
}

var ajx  = function(path, method, header, data, responseCallback) {
    var r = new XMLHttpRequest()
    r.open(method, path, true)
    r.setRequestHeader('Content-Type', 'application/json')
    r.onreadstatechange = function() {
        if(r.readyState == 4) {
            responseCallback(r)
        }
    }
    r.send(data)
}

// var yPush = function(state, title, path) {
//     history.pushState(state, title, path)
//     document.title = title
// }
//
// window.addEventListener(state, event => {
//     var state = event.state
//     log('popstate', state)
// })
