anchors.options = {
    placement: 'right',
    visible: 'hover',
  };
anchors.add('h1, h2, h3');
generateTableOfContents(anchors.elements);

// External code for generating a simple dynamic Table of Contents
function generateTableOfContents(els) {
	var anchoredElText,
  		anchoredElHref,
			ul = document.createElement('UL');

  document.getElementById('table-of-contents').appendChild(ul);

	for (var i = 0; i < els.length; i++) {
  	anchoredElText = els[i].textContent;
		anchoredElHref = els[i].querySelector('.anchorjs-link').getAttribute('href');
  	addNavItem(ul, anchoredElHref, anchoredElText, 'toc-li-'.concat(els[i].tagName));
  }
}

function addNavItem(ul, href, text,  listClass) {
  var listItem = document.createElement('LI'),
		  anchorItem = document.createElement('A'),
  	  textNode = document.createTextNode(text);
      listItem.className = listClass;
  
  anchorItem.href = href;
  ul.appendChild(listItem);
  listItem.appendChild(anchorItem);
  anchorItem.appendChild(textNode);
}