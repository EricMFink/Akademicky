---
layout: page
permalink: /publications/
title: Publications
---

<!-- Recent Publications -->
# Recent Publications
{% for publication in site.data.publications limit:3 %}
<a href="https://luckyjimjd.github.io/assets/pdf/{{ publication.pdf }}" target="_blank">{{ publication.title }}</a>{% if publication.co-author %}, with {{ publication.co-author }}{% endif %}, {{ publication.volume }} {{ publication.container-title }} {{ publication.page }} ({{ publication.date }})
{% endfor %}



