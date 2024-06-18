
<script>

var DEBUG=false;

if (typeof Prince != "undefined") {
addBoxInfoMethods();
}

function consoleLog() {
if (DEBUG) {
console.log.apply(null,arguments);
}
}

function debug() {
DEBUG=true;
}

Prince.trackBoxes = true;

var funcsarr = [];
var argsarr = [];

function printObject(o) {
var out = '';
for (var p in o) {
out += p + ': ' + o[p] + '\n';
}
console.log(out);
}

function postlayout() {
consoleLog("postlayout starting, there are:",funcsarr.length,"functions");
if (funcsarr.length > 0) {
var func = funcsarr.shift();
var arg = argsarr.shift();
consoleLog("  postlayout:",func.name);
func(arg);
consoleLog("  returning from ",func.name,"re-registering postlayout");
Prince.registerPostLayoutFunc(postlayout);
}
}

function schedule(callback, args) {
funcsarr.push(callback);
argsarr.push(args);
if (args) {
consoleLog("  scheduling:",callback.name,args);
} else {
consoleLog("  scheduling:",callback.name);
}
Prince.registerPostLayoutFunc(postlayout);
}

function snap(size) {
var snapSize = 1;
var selectors = [];
var methods = [];


for (var i = 0; i < arguments.length; i++) {
if (i == 0) {
snapSize = arguments[0];
} else {
if (i % 2) {  // odd number, i.e. a selector
selectors.push(arguments[i]);
} else { // even number 
if ((arguments[i]=="margin") || (arguments[i]=="margin-top") || (arguments[i]=="margin-bottom") || (arguments[i]=="padding") || (arguments[i]=="padding-top") || (arguments[i]=="padding-bottom") || (arguments[i]=="padding-even") || (arguments[i]=="height") || (arguments[i]=="growHeight") ||(arguments[i]=="shrinkHeight") || (arguments[i]=="push") || (arguments[i]=="pull") || (arguments[i]=="info")) {
methods.push(arguments[i]);
} else {

methods.push("padding");
}
}
}
}

schedule(snap_postlayout,[snapSize,selectors,methods]);
}

function snap_postlayout(snap_args) {

var snapSize = snap_args[0];
var selectors = snap_args[1];
var methods = snap_args[2];


var dbox = document.body.getPrinceBoxes();
var y1 = dbox[0].y;                           // using first page
var y2 = dbox[0].y - dbox[0].h;

for(var i=0; i<selectors.length; i++) { 
adjustSize(snapSize,selectors[i],methods[i], y1, y2);
}
}

function adjustSize(snapSize, selector, method, y1, y2) {
var elements = document.querySelectorAll(selector);
for(var i=0; i<elements.length; i++) { 
var fboxes = elements[i].getPrinceBoxes();
consoleLog("    adjustSize -- selector: \"",selector, "\" -- snapSize:",snapSize,"-- method:",method, "-- y1:", y1, "-- y2:",y2);
switch (fboxes.length) {
case 0:
consoleLog("      no fboxes",elements[i].tagName);
break;
default:
var paddingTop = parseFloat(fboxes[0].style.paddingTop);
var paddingBottom = parseFloat(fboxes[0].style.paddingBottom);
var borderTop = parseFloat(fboxes[0].style.borderTopWidth);
var borderBottom = parseFloat(fboxes[0].style.borderBottomWidth);
var marginTop = parseFloat(fboxes[0].marginTop);               
var marginBottom = parseFloat(fboxes[0].marginBottom);
var height = fboxes[0].h + marginTop + marginBottom; 
var gap = snapSize - (height % snapSize);
var ha = y1 - fboxes[0].y;
var hb = (fboxes[0].y - fboxes[0].h) - y2;

consoleLog("      element",elements[i].tagName,"has height with padding/border/margin",height,"pure height is",(height-marginTop-marginBottom-paddingTop-paddingBottom-borderTop-borderBottom));
consoleLog("      element",elements[i].tagName,"must be increased in height with",gap,"pt");
consoleLog("      current values: height",height,"paB",paddingBottom,"paT",paddingTop,"boB",borderBottom,"boT",borderTop,"maB",marginBottom,"maT",marginTop);

var has = ha / (ha + hb);
var hbs = hb / (ha + hb);

if ((method=="height") || (method=="growHeight")) {
var newheight = height + gap - (paddingTop + paddingBottom + borderTop + borderBottom + marginTop + marginBottom);
elements[i].style.height = newheight+"pt";
consoleLog("      growing height -- gap",gap,"new styleheight:",newheight,"-- styleheight + padding + border =", (newheight+paddingBottom+paddingTop+borderBottom+borderTop));
} else if (method=="shrinkHeight") {
newheight = height + gap - (paddingTop + paddingBottom + borderTop + borderBottom) - snapSize;
elements[i].style.height = newheight+"pt";
consoleLog("      shrinking height -- gap",gap,"new style height:",newheight,"-- style height + padding + border =", (newheight+paddingBottom+paddingTop+borderBottom+borderTop));
} else if (method=="padding") {
paddingTop += has * gap;
paddingBottom += hbs * gap;
elements[i].style.paddingTop = paddingTop+"pt";
elements[i].style.paddingBottom = paddingBottom+"pt";
} else if (method=="margin") {
marginTop += has * gap;
marginBottom += hbs * gap;
elements[i].style.marginTop = marginTop+"pt";
elements[i].style.marginBottom = marginBottom+"pt";
} else if (method=="margin-top") {
marginTop = gap;
elements[i].style.marginTop = marginTop+"pt";
} else if (method=="margin-bottom") {
marginBottom = gap;
elements[i].style.marginBottom = marginBottom+"pt";
} else if (method=="padding-top") {
paddingTop += gap;
elements[i].style.paddingTop = paddingTop+"pt";
} else if (method=="padding-bottom") {
if (paddingBottom > snapSize) {
paddingBottom += (gap - snapSize);
}
else {
paddingBottom += gap;
}
elements[i].style.paddingBottom = paddingBottom+"pt";
} else if (method=="padding-even") {
paddingTop += gap/2;
paddingBottom += gap/2;
elements[i].style.paddingTop = paddingTop+"pt";
elements[i].style.paddingBottom = paddingBottom+"pt";

} else if (method=="push") {
paddingTop += snapSize - (ha % snapSize);
elements[i].style.paddingTop = paddingTop+"pt";
} else if (method=="pull") {
consoleLog(" ha",ha,"paddingTop",paddingTop, "ha+paddingTop",(ha+paddingTop),"ha%snapSize",(ha%snapSize));
consoleLog(" about to add",(ha%snapSize),"to bottom padding");
paddingBottom += (ha % snapSize);
elements[i].style.paddingBottom = paddingBottom+"pt";
} else if (method=="info") {
consoleLog("INFO ha",ha,"paddingTop",paddingTop, "ha+paddingTop",(ha+paddingTop),"ha%snapSize",(ha%snapSize));
}
break;
}
}
}

function info(selector) {
schedule(info_postlayout,selector)
}

function info_postlayout(selector) {
var elements = document.querySelectorAll(selector);

console.log("Found ",elements.length,"elements from selector",selector);
for(var i=0; i<elements.length; i++) { 
var fboxes = elements[i].getPrinceBoxes();
console.log("    element",(i+1),"has",fboxes.length,"boxes");
for (var j=0; j<fboxes.length; j++) {
printObject(fboxes[j]);
}
}
}
function textfit() {
var selector;
var size = 100;
var even = false;

switch (arguments.length) {
case 1:
selector = arguments[0];
break;
case 2:
selector = arguments[0];
size = parseFloat(arguments[1]);
break;
case 3:
selector = arguments[0];
size = parseFloat(arguments[1]);
if (arguments[2]) {
var even = true;
consoleLog("even!!");
}
break;
default:
consoleLog("textfit: wrong number of arguments")
}

var elems = document.querySelectorAll(selector);
for (var i = 0; i < elems.length; i++) {
addSpan(elems[i]);
}
schedule(textfit_postlayout,[selector, size, even])
}

function textfit_postlayout(textfit_args) {
var selector = textfit_args[0];
var size = textfit_args[1];
var even = textfit_args[2];

var elems = document.querySelectorAll(selector);
for (var i = 0; i < elems.length; i++) {
var elem = elems[i]; 
var elemboxes = elem.getPrinceBoxes();
var elembox = elemboxes[0];

var minfs = 0;

spans = elem.querySelectorAll("span.textfit");
for (var j = 0; j < spans.length; j++) {
var boxes = spans[j].getPrinceBoxes();
var box = boxes[0];
var fs = parseFloat(box.style.fontSize);
var line = findLine(box);

var linelength = line.parent.w;
linelength = elembox.contentBox("pt").w;
fullw = linelength * (size/100);
fs = fs / (line.w/fullw);
if ((fs < minfs) || (minfs == 0)) { 
minfs = fs;
}
box.element.style.fontSize = fs + "pt"; 
elem.style.fontSize = fs + "pt";
}
if (even) {
for (var j = 0; j < spans.length; j++) {
var boxes = spans[j].getPrinceBoxes();
var box = boxes[0];
box.element.style.fontSize = minfs + "pt"; 
elem.style.fontSize = minfs + "pt";
}
}
}
}

function findLine(box) {
if (box.type == "LINE") {
return box;
} else {
return findLine(box.parent);
}
}

function addSpan(elem) {
var node = elem.firstChild;
while (node) {
if (node.nodeType === Node.ELEMENT_NODE) {
addSpan(node);
node = node.nextSibling;
} else if (node.nodeType === Node.TEXT_NODE) {
var words = node.data.split(/( +)/);
for (var i = 0; i < words.length; ++i) {
var newNode;
if (words[i].trim() === "") {
newNode = document.createTextNode(words[i]);
} else {
newNode = document.createElement("span");
newNode.textContent = words[i] + " "; 
newNode.className = "textfit";
}
node.parentNode.insertBefore(newNode, node);
}
var nextNode = node.nextSibling;
node.parentNode.removeChild(node);
node = nextNode;
} else {
node = node.nextSibling;
}
}
}

function findbody(box) {
if (box.type == 'BODY') {
return box;
}
return findbody(box.parent);
}

function setheight() {
var sh_args = [];
for (var i = 0; i < arguments.length; i++) {
sh_args.push(arguments[i]);
consoleLog(" registering argument",arguments[i]);
}
schedule(setheight_postlayout, sh_args);
}

function setheight_postlayout(sh_args)
{
var selector="";
var size = 90;

switch (sh_args.length) {
case 1:
selector = sh_args[0];
break;
case 2:
selector = sh_args[0];
size = parseFloat(sh_args[1]);
break;
default:
consoleLog("setheight: wrong number of arguments");
return;
}

var dbox = document.body.getPrinceBoxes();
var pagey = dbox[0].y;

var styleattr = "height: "+size+"pt";

var elems = document.querySelectorAll(selector);
consoleLog("Found ",elems.length," elements matching selector:", selector);
for (var i = 0; i < elems.length; i++) {
var boxes = elems[i].getPrinceBoxes();
consoleLog("analyzing element",i+1,"-- the top is at position:",boxes[0].y);
if (boxes.length > 1) {
consoleLog("  fragmented image?");
} else { 
if ((boxes[0].pageNum > 1) && (boxes[0].y == pagey)) {
consoleLog("  ALERT! Element is at top of a non-first page!!");
consoleLog("  Setting style attribute to \""+styleattr+"\"");
elems[i].setAttribute("style", styleattr);            
schedule(setheight_postlayout, sh_args);
}
}
}
}

function toc() {
var toc_args = [];
for (var i = 0; i < arguments.length; i++) {
toc_args.push(arguments[i]);
consoleLog(" registering argument",arguments[i]);
}
schedule(toc_postlayout, toc_args);
}

function toc_postlayout(toc_args)
{
var tocselector = "#toc";
switch (toc_args.length) {
case 1:
selector = toc_args[0];
consoleLog("toc_postlayout: ",selector);
break;
case 2:
selector = toc_args[0];
tocselector = toc_args[1];
break;
default:
consoleLog("toc: wrong number of arguments")
}

var elems = document.querySelectorAll(selector);
var ToCelems = document.querySelectorAll(tocselector);

if (ToCelems.length > 0) {
var ToCelem = ToCelems[0];
} else {
consoleLog("No ToC element found");
return;
}

for (var i = 0; i < elems.length; i++) {
var str = addpseudotext(elems[i], " "," "); 
var text = document.createTextNode(str);
elems[i].setAttribute("id", "ch"+i);
var link = document.createElement("a");
link.setAttribute("href", "#ch"+i);
link.appendChild(text);
var li = document.createElement("li");
li.className += elems[i].localName;
li.appendChild(link);
ToCelem.appendChild(li); 
}
}

function addpseudotext(el,bstr,astr) {
var boxes = el.getPrinceBoxes();
var str = ""

if (el.textContent) {
str = el.textContent;
}

for (var j=0; j<boxes.length; j++) {   // go through list of boxes
box = boxes[j];
switch (box.pseudo) {
case "before":
str = box.children[0].text + bstr + str;
break;
case "after":
str = str + astr + box.children[0].text;
break;
}
}
return(str);
}

function index() {
schedule(index_postlayout);
}

function index_postlayout() {
var ida = new Array();
var enta = new Array();
var str="";

var ix = document.querySelectorAll('.ix, .ixb');
for(var i=0; i<ix.length; i++) {

ix[i].setAttribute("id", "ix"+i);
var ent = ix[i].getAttribute("title");
if (! ent) {
ent = ix[i].textContent;
}


if ((enta.join("")).indexOf(ent) < 0) { 
enta.push(ent);
}
if (! ida[ent]) {
ida[ent] = new Array();
}
ida[ent].push(i);
}
enta.sort(
function(a, b) {
if (a.toLowerCase() < b.toLowerCase()) return -1;
if (a.toLowerCase() > b.toLowerCase()) return 1;
return 0;});


var el;
var prevmain = undefined;
var main = undefined;
var sub = undefined;

for (var i=0; i<enta.length; i++) {

var prevpage = undefined; 
var normal = undefined;
var bold = undefined;

ent = enta[i];
var a = ida[ent]; 

for (var j = a.length-1; j >= 0; j--) {
el = ix[a[j]];
var page = getPage(el);
el.page = page; 
if (page == prevpage) {
if (bold) {
a.splice(j,1);
continue;
}

if (el.className == 'ixb') {
if (normal) {
a.splice(normal,1)
}
bold = j;
continue;
}

if (normal) {    
a.splice(normal,1)
normal = j;
}
} else {
prevpage = page;
if (el.className == 'ixb') { 
bold = j;
} else {
normal = j;
}
}
}

if (ent.search(/;/) > -1) {    // is there a semi-colon in entry?
var found = ent.match(/(.*)\s*;\s*(.*)/)
var main = found[1];
var sub = found[2];

if (main == prevmain) {
str = str + "\n<li class=subentry>" + sub + "&nbsp;";
} else {
prevmain = main;
str = str + "\n<li class=entry>" + main + "\n<li class=subentry>" + sub + "&nbsp;";
}
} else {
str = str + "\n<li class=entry>" + ent + "&nbsp;";
prevmain = ent;
}

var el=undefined;
var pel=undefined;
var series=undefined;

for (var j=0; j < a.length; j++) {  

el = ix[a[j]];   // find element pointed to by ref

if (el.className) {                            // make string from element's classname
var classname=" class="+el.className;
} else {
classname="";
}

if (! pel) {  // pel is undefined, so this is the first entry. 
str = str + "<a href=#ix"+a[j]+classname+">"+el.page+"</a>";
pel=el;
continue;
}

if (pel.className) {                            // make string from previous element's classname
var pclassname=" class="+pel.className;
} else {
pclassname="";
}

if (el.page == pel.page + 1 ) {                 // if we are close
if (el.className == pel.className) {
series = "-";                            // we are in a series which should be combined
pel = el;
continue;
} else {                                    // different classname, we must terminate previous element (pel)
if (series) {
str = str + "&ndash;<a href=#ix"+a[j-1]+pclassname+">"+pel.page+"</a>";
series = undefined;                  // series has been terminated
}
str = str + ", <a href=#ix"+a[j]+classname+">"+el.page+"</a>";
pel=el;
}
} else {                                        // we are not close, so we must terminate previous element (pel)
if (series) {
str = str + "&ndash;<a href=#ix"+a[j-1]+pclassname+">"+pel.page+"</a>";
series = undefined;                      // series has been terminated
}
str = str + ", <a href=#ix"+a[j]+classname+">"+el.page+"</a>";
pel=el;
} 
}

if (series) {
str = str + "&ndash;<a href=#ix"+a[j-1]+classname+">"+el.page+"</a>";
}
}
document.getElementById("index").innerHTML = str;
}


function getPage(el) {

var elboxes = el.getPrinceBoxes(); 
if (elboxes.length > 0) {
return elboxes[0].pageNum;         // page number where ref appears
} else {
consoleLog("GetPage, can't find page");
return udefined;
}
}

function simpleToc() {

var selector;
var tocselector = "#toc";

switch (arguments.length) {
case 1:
selector = arguments[0];
break;
case 2:
selector = arguments[0];
tocselector = arguments[1];
break;
default:
consoleLog("toc: wrong number of arguments")
}

var elems = document.querySelectorAll(selector);
var ToCelems = document.querySelectorAll(tocselector);

if (ToCelems.length > 0) {
var ToCelem = ToCelems[0];
} else {
consoleLog("No ToC element found");
exit;
}

for (var i = 0; i < elems.length; i++) {

var str = elems[i].textContent;
var text = document.createTextNode(str);
elems[i].setAttribute("id", "ch"+i);
var link = document.createElement("a");
link.setAttribute("href", "#ch"+i);
link.appendChild(text);
var li = document.createElement("li");
li.className += elems[i].localName;
li.appendChild(link);
ToCelem.appendChild(li); 
}
}


function boxInfo(selector) {
console.log("boxInfo",selector);
schedule(boxInfo_postlayout,selector);
}

function boxInfo_postlayout(selector) {

var e = document.querySelectorAll(selector);
//   console.log("number of elements",e.length, selector);
var b = e[0].getPrinceBoxes();
return b[0];
}

function pageInfo(querypage) {
schedule(pageInfo_postlayout,querypage);
}

function pageInfo_postlayout(querypage) {
var pages = PDF.pages;

console.log("<html><style>body { width: 600pt; height: 900pt; background: white;  } \n div { position: absolute; border: thin solid black }\n.line, .span, .text { display: none } </style>\n<body>");

console.log("<pre>\n");
printObject(PDF.pages[10]);
console.log("</pre>\n");

if (querypage) {
if (querypage <= pages.length) {
printBoxes("  ",pages[querypage-1]);
}
} else {
for(var i=0; i<pages.length; i++) {
printBoxes("  ",pages[i]);
}
}
}

function printBoxes(str,box) 
{
console.log("");
for (var i in box)
{
}

var y=800-box.y;  // we should be able to find that number through the box api

console.log("<div class="+box.type+" style='width: "+box.w+"pt; height: "+box.h+"pt; left: "+box.x+"pt; top: "+y+"pt'>");
console.log(box.type);
console.log("</div>");

for (var i=0; i<box.children.length; i++) {
printBoxes(str+"  ",box.children[i]);
}
}


function sideNotes() {

if (arguments.length ==3) {
page = arguments[0];
figsel = arguments[1];
notesel = arguments[2];
schedule(sideNotes_postlayout,[page, figsel, notesel]);
}
}

function sideNotes_postlayout(sidenotes_args) {

var querypage = sidenotes_args[0];
var figsel = sidenotes_args[1];
var notesel = sidenotes_args[2];

//   console.log("sideNotes_postlayout");

var pages = PDF.pages;

if (querypage) {
if (querypage <= pages.length) {
fixNotes(pages[querypage-1], figsel, notesel);
}
} else {
for(var i=0; i<pages.length; i++) {
fixNotes(pages[i], figsel, notesel);
}
}
}


function fixNotes(pagebox,figsel,notesel) {
console.log("fixnotes analyzing page",pagebox.pageNum);

var fnbox = findFootnoteBox(pagebox);
if (fnbox == null) {
return;
} 

var elems = document.querySelectorAll(figsel);
for (var i=0; i < elems.length; i++) {
var fboxes = elems[i].getPrinceBoxes();
if (fboxes.length > 2) {
console.log("Alert, element has more than one box");
}
var box = fboxes[0];
if (box.pageNum == pagebox.pageNum) {
console.log("  tag",elems[i].tagName,"on page",box.pageNum,"; w",box.w,"h:",box.h,"x:",box.x,"y:",box.y  );
}
}



}

function isTopFloat(b) {
if (b.parent && b.parent.type === "FLOATS") {
return b.parent.y == b.parent.parent.y
} else {
return false;
}
}

// cheat sheet: 1mm = 2.83 points -- 0.3553mm = 1pt  


function printDiv(box,color) {
var y = 751.18110236220481000 - box.y; 
console.log("<div style='width: "+box.w+"pt; height: "+box.h+"pt; left: "+box.x+"pt; top: "+y+"pt; background: "+color+"'></div><!--",box.y,"-->");
}

function findFootnoteBox(box) {
//  console.log ("findfnbox",box.type);
if (box.type == "FOOTNOTES") {
return(box);
}

for (var i=0; i<box.children.length; i++) {
var ret = findFootnoteBox(box.children[i]);
if (ret) {
return(ret);
}
}
return null;
}



function Box(x, y, w, h, u) {
var d = 1;

if (u == "cm") {
d = 72/2.54;
} else if (u == "in") {
d = 72;
} else if (u == "mm") {
d = 72/25.4;
} else if (u == "q") {
d = 72/101.6;
} else if (u == "pc") {
d = 1/12;
} else if (u == "pt") {
d = 1;
} else if (u == "px") {
d = 72/96;
} else {
console.log("Box: unknown units: " + u);
}

this.x = x/d;
this.y = y/d;
this.w = w/d;
this.h = h/d;
}

function addBoxInfoMethods() {
BoxInfo.prototype.marginBox = function (u) {
var x = this.x - this.marginLeft;
var y = this.y + this.marginTop;
var w = this.w + this.marginLeft + this.marginRight;
var h = this.h + this.marginTop + this.marginBottom;
return new Box(x, y, w, h, u);
};

BoxInfo.prototype.borderBox = function (u) {
var x = this.x;
var y = this.y;
var w = this.w;
var h = this.h;
return new Box(x, y, w, h, u);
};

BoxInfo.prototype.paddingBox = function(u) {
var bTop = parseFloat(this.style.borderTopWidth.slice(0, -2));
var bRight = parseFloat(this.style.borderRightWidth.slice(0, -2));
var bBottom = parseFloat(this.style.borderBottomWidth.slice(0, -2));
var bLeft = parseFloat(this.style.borderLeftWidth.slice(0, -2));
var x = this.x + bLeft;
var y = this.y - bTop;
var w = this.w - bLeft - bRight;
var h = this.h - bTop - bBottom;
return new Box(x, y, w, h, u);
};

BoxInfo.prototype.contentBox = function(u) {
var bTop = parseFloat(this.style.borderTopWidth.slice(0, -2));
var bRight = parseFloat(this.style.borderRightWidth.slice(0, -2));
var bBottom = parseFloat(this.style.borderBottomWidth.slice(0, -2));
var bLeft = parseFloat(this.style.borderLeftWidth.slice(0, -2));
var pTop = parseFloat(this.style.paddingTop.slice(0, -2));
var pRight = parseFloat(this.style.paddingRight.slice(0, -2));
var pBottom = parseFloat(this.style.paddingBottom.slice(0, -2));
var pLeft = parseFloat(this.style.paddingLeft.slice(0, -2));
var x = this.x + bLeft + pLeft;
var y = this.y - bTop - pTop;
var w = this.w - bLeft - bRight - pLeft - pRight;
var h = this.h - bTop - bBottom - pTop - pBottom;
return new Box(x, y, w, h, u);
};
}

</script>