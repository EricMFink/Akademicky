---
layout: page
title: Publications
permalink: /publications/
---


{% for publication in site.data.publications %}

{{ publication.author }}, {% if publication.pdf %}<a href="{{ site.baseurl }}/assets/pdf/{{ publication.pdf }}.pdf" target="_blank">{{ publication.title }}</a>, {% else %}{{ publication.title }}, {% endif %}{% if publication.journal %}{{ publication.volume }} _{{ publication.journal }}_ {{ publication.page }} ({{ publication.date }}){% endif %}{% if publication.book %}in _{{ publication.book }}_ ({{ publication.editor }}, {{ publication.date }}){% endif %}{% if publication.institution %}({{ publication.institution }}, {{ publication.date }}){% endif %}

{% endfor %}

