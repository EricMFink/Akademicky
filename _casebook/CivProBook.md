---
layout: book

term: Fall Term 2023
title: Civil Procedure
subtitle: An Open-Source Casebook
repo: CivilProcedure

version: "Version 2.0"
published: August 2023

author: Eric M. Fink
affiliation: Elon Law School

epigraph: Jarndyce and Jarndyce drones on. This scarecrow of a suit has, in course of time, become so complicated that no man alive knows what it means. The parties to it understand it least, but it has been observed that no two Chancery lawyers can talk about it for five minutes without coming to a total disagreement as to all the premises. Innumerable children have been born into the cause; innumerable young people have married into it; innumerable old people have died out of it. Scores of persons have deliriously found themselves made parties in Jarndyce and Jarndyce without knowing how or why; whole families have inherited legendary hatreds with the suit. The little plaintiff or defendant who was promised a new rocking-horse when Jarndyce and Jarndyce should be settled has grown up, possessed himself of a real horse, and trotted away into the other world. Fair wards of court have faded into mothers and grandmothers; a long procession of Chancellors has come in and gone out; the legion of bills in the suit have been transformed into mere bills of mortality; there are not three Jarndyces left upon the earth perhaps since old Tom Jarndyce in despair blew his brains out at a coffee-house in Chancery Lane; but Jarndyce and Jarndyce still drags its dreary length before the court,  perennially hopeless.
epigraph-author: Charles Dickens
epigraph-source: Bleak House

casebook: true
output:
  pdf_document:
    latex_engine: xelatex
    template: master.tex
    path: /assets/pdf/syllabus.pdf

---

<!-- PREFACE -->

<div class="chapter">
<h1 class="frontmatter">Preface</h1>

This book presents material for use in a law school course on the perils and pitfalls of legal practice. Topics covered include representing difficult clients, dealing with vexatious adversaries, and negotiating favorable terms for the sale of your soul.

Most of the materials reproduced here are in the public domain; excerpts from copyrighted materials are included for teaching purposes under the fair use doctrine. Materials have been redacted to omit passages not pertinent to the learning objectives. Judicial opinions have also been "cleaned up" for ease of reading.[^Preface1] 

[^Preface1]: _See_ Jack Metzler, [Cleaning Up Quotations](https://lawrepository.ualr.edu/cgi/viewcontent.cgi?article=1405&context=appellatepracticeprocess), 18 J. App. Prac. & Process 143, 154 (2017) (proposing "cleaned up" parenthetical for quotations from judicial opinions, to indicate the author “has removed extraneous, non-substantive material like brackets, quotation marks, ellipses, footnote reference numbers, and internal citations; may have changed capitalization without using brackets to indicate that change; and affirmatively represents that the alterations were made solely to enhance readability and that the quotation otherwise faithfully reproduces the quoted text.”) 

</div>

<!-- CHAPTER 1 -->
<div class="chapter">
<p class="chapter-number">Chapter 1</p>
<h1>Introduction</h1>
{% include_relative chap1.md %}
</div>

<!-- CHAPTER 2 -->
<div class="chapter">
<p class="chapter-number">Chapter 2</p>
<h1>Parties & Claims</h1>
{% include_relative chap2.md %}
</div>

<!-- CHAPTER 3 -->
<div class="chapter">
<p class="chapter-number">Chapter 3</p>
<h1>Personal Jurisdiction</h1>
{% include_relative chap3.md %}
</div>

<!-- CHAPTER 4 -->
<div class="chapter">
<p class="chapter-number">Chapter 4</p>
<h1>Subject Matter Jurisdiction</h1>
{% include_relative chap4.md %}
</div>

<!-- CHAPTER 5 -->
<div class="chapter">
<p class="chapter-number">Chapter 5</p>
<h1>Choice of Law in Federal Court</h1>
{% include_relative chap5.md %}
</div>

<!-- CHAPTER 6 -->
<div class="chapter">
<p class="chapter-number">Chapter 6</p>
<h1>Pleading</h1>
{% include_relative chap6.md %}
</div>

<!-- CHAPTER 7 -->
<div class="chapter">
<p class="chapter-number">Chapter 7</p>
<h1>Claim & Issue Preclusion</h1>
{% include_relative chap7.md %}
</div>

<!-- CHAPTER 8 -->
<div class="chapter">
<p class="chapter-number">Chapter 8</p>
<h1>Summary Judgment</h1>
{% include_relative chap8.md %}
</div>