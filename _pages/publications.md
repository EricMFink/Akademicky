---
layout: page
title: Publications
permalink: /publications/
---


{% for publication in site.data.publications %}

{{ publication.author }}, _{{ publication.title }}_{% if publication.book %} ({{ publication.publisher }}, {{ publication.date }}){% else %}, {{ publication.volume }} _{{ publication.journal }}_ {{ publication.page }} ({{ publication.date }}){% endif %}

{% endfor %}

