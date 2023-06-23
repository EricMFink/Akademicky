---
layout: centered
title: Teaching
permalink: /teaching/
---

<div class="gallery">

{% for class in site.data.classes %}

<div class="project">
<div class="thumbnail">
<a href="{{ site.url }}/{{ class.url }}">
<img class="thumbnail" src="{{ site.baseurl }}/assets/img/teaching/{{ class.img }}" alt="{{ class.title }}" size="100%" />

<span>
<h1>{{ class.title }}</h1>
</span>

</a>
</div>
</div>

{% endfor %}

</div>
