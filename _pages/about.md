---
permalink: /
title: "Berfin Berg"
author_profile: false
---

{% include base_path %}

<section class="home-hero">
  <div class="home-hero__text">
    <p class="home-hero__tagline">User Experience Design / Service Design</p>
    <h1 class="home-hero__title">Berfin Berg</h1>
    <p class="home-hero__welcome">
      Hi, I am Berfin. I design digital services and research experiences that make complex systems feel clear, human, and usable.
    </p>
    <div class="home-hero__chips" aria-label="Research focus areas">
      <span class="chip">Design Thinking</span>
      <span class="chip">Usability Testing</span>
      <span class="chip">Human-Computer Interaction</span>
    </div>
    <div class="home-hero__cta">
      <a class="btn btn--large btn--inverse" href="{{ base_path }}/portfolio/">Projects</a>
      <a class="btn btn--large btn--inverse" href="{{ base_path }}/cv/">CV</a>
      <a class="btn btn--large btn--inverse" href="mailto:beb9496@thi.de">Email</a>
    </div>
  </div>
  <div class="home-hero__media">
    <figure class="home-hero__photo">
      <img src="{{ base_path }}/images/profile.png" alt="Portrait of Berfin Berg" loading="eager" />
    </figure>
  </div>
</section>

<section class="quick-links" id="quick-access">
  <h2>Quick access</h2>
  <div class="quick-links__grid">
    <a class="quick-card" href="{{ base_path }}/portfolio/">
      <span class="quick-card__title">Projects</span>
      <span class="quick-card__desc">Selected UX and service design work.</span>
    </a>
    <a class="quick-card" href="{{ base_path }}/cv/">
      <span class="quick-card__title">CV</span>
      <span class="quick-card__desc">Text, PDF, and accessible formats.</span>
    </a>
    <a class="quick-card" href="{{ base_path }}/interactive/">
      <span class="quick-card__title">Interactive project</span>
      <span class="quick-card__desc">UNNIEQUE case overview with video and details.</span>
    </a>
    <a class="quick-card" href="mailto:beb9496@thi.de">
      <span class="quick-card__title">Email</span>
      <span class="quick-card__desc">Start a collaboration or ask a question.</span>
    </a>
  </div>
</section>

<section class="home-work">
  <div class="home-work__header">
    <h2>Show work</h2>
    <p>Latest and featured projects with quick access to details.</p>
  </div>
  <div class="home-work__grid">
    <div class="home-work__column">
      <h3>Latest projects</h3>
      {% assign latest_projects = site.portfolio | sort: "date" | reverse %}
      {% if latest_projects.size > 0 %}
        <ul class="home-work__list">
          {% for project in latest_projects limit:3 %}
            <li class="home-work__item">
              <a href="{{ base_path }}{{ project.url }}">{{ project.title }}</a>
              <p>{{ project.excerpt | strip_html | truncate: 120 }}</p>
            </li>
          {% endfor %}
        </ul>
      {% else %}
        <p class="home-work__empty">Projects coming soon.</p>
      {% endif %}
    </div>
    <div class="home-work__column">
      <h3>Featured projects</h3>
      {% assign featured_projects = site.portfolio | where: "featured", true %}
      {% if featured_projects.size > 0 %}
        <ul class="home-work__list">
          {% for project in featured_projects limit:2 %}
            <li class="home-work__item">
              <a href="{{ base_path }}{{ project.url }}">{{ project.title }}</a>
              <p>{{ project.excerpt | strip_html | truncate: 120 }}</p>
            </li>
          {% endfor %}
        </ul>
      {% else %}
        <p class="home-work__empty">Featured projects coming soon.</p>
      {% endif %}
    </div>
  </div>
</section>
