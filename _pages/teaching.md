---
layout: page
title: Teaching
permalink: /teaching/
---

<div class="gallery">

{% for class in site.data.classes %}

<div class="project">
<div class="thumbnail">
<span><h2>{{ class.title }}</h2></span></a>
<a href="{{ site.url }}/{{ class.url }}"><img class="thumbnail" src="{{ site.baseurl }}/assets/img/teaching/{{ class.img }}" alt="{{ class.title }}" size="100%" />
</div>
</div>

{% endfor %}

</div>
