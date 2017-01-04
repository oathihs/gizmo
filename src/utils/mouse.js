// Which HTML element is the target of the event
function getMouseTarget (e) {
  let targ
  if (!e) var e = window.event
  if (e.target) targ = e.target
  else if (e.srcElement) targ = e.srcElement
  if (targ.nodeType == 3) // defeat Safari bug
    targ = targ.parentNode
  return targ
}
 
// Mouse position relative to the document
// From http://www.quirksmode.org/js/events_properties.html
function getMousePositionInDocument (e) {
  let posX = 0
  let posY = 0
  if (!e) var e = window.event
  if (e.pageX || e.pageY) {
    posX = e.pageX
    posY = e.pageY
  }
  else if (e.clientX || e.clientY) {
    posX = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    posY = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  return {
    x : posX,
    y : posY
  }
}

// Find out where an element is on the page
// From http://www.quirksmode.org/js/findpos.html
export function getElementPosition (obj) {
  let curleft = 0
  let curtop = 0
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
  }
  return {
    left : curleft,
    top : curtop
  }
}
 
// Mouse position relative to the element
// not working on IE7 and below
export function getMousePositionInElement(e) {
  var mousePosDoc = getMousePositionInDocument(e)
  var target = getMouseTarget(e)
  var targetPos = getElementPosition(target)
  var posX = mousePosDoc.x - targetPos.left
  var posY = mousePosDoc.y - targetPos.top
  return {
    x : posX,
    y : posY
  }
}