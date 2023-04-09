# Training Project «Cat Energy»

<img align="right" width="110" height="110" alt="HTML Academy" src="https://up.htmlacademy.ru/static/img/intensive/adaptive/logo-for-github-2.png">

* Student: [Aleksander Arkhipov](https://htmlacademy.ru/profile/helvetios).
* Mentor: *None, Selfeducation*.
* Course: [Responsive layouts and automation](https://htmlacademy.ru/intensive/adaptive).
* School: [HTML Academy](https://htmlacademy.ru), @htmlacademy

## :alarm_clock: TL;DR

<div style="display: flex; column-gap: 10px; text-align: center;">
  <div style="flex: 1">
    <h3>Studied and Used Technologies</h3>
    <img width="70" height="70" alt="HTML icon" src="/../../../../github/docs/blob/main/assets/img/tech-icon-html.png">
    <img width="70" height="70" alt="CSS icon" src="/../../../../github/docs/blob/main/assets/img/tech-icon-css.png">
    <img width="70" height="70" alt="JS icon" src="/../../../../github/docs/blob/main/assets/img/tech-icon-js.png">
    <img width="70" height="70" alt="BEM methodology icon" src="/../../../../github/docs/blob/main/assets/img/tech-icon-bem.png">
    <img width="70" height="70" alt="Sass icon" src="/../../../../github/docs/blob/main/assets/img/tech-icon-sass.png">
    <img width="70" height="70" alt="Gulp icon" src="/../../../../github/docs/blob/main/assets/img/tech-icon-gulp.png">
  </div>
  <div style="flex: 1">
    <h3>Main Approaches</h3>
    Mobile First <br>
    <img width="300" height="70" alt="" src="/../../../../github/docs/blob/main/assets/img/scheme-mobile-first.png">
    <br>
    Progressive Enhancement<br>
    <img width="300" height="30" alt="" src="/../../../../github/docs/blob/main/assets/img/scheme-progressive enhancement.png">
  </div>

</div>

## :memo: Educational goals (by course and *mine*)

1. Git and GutHub workflow by using console.

2. Semantically correct markup by using [`BEM methodology`](https://en.bem.info/methodology/).

3. Learn and use [`Sass`](https://sass-lang.com/) or/and [`Less`](https://lesscss.org/) with BEM.

4. [`Node.js`](https://nodejs.org/en) basics and work with [`NPM`](https://www.npmjs.com/) and `package.json`.

    > * Learned how to work with a `package.json` using `Node.js` v18 instead of v14, which was in the course program.
    > * Fixed all medium+ vulnerabilities and modules conflicts.

5. Creating responsive layouts using Sass by [`Mobile First`](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Responsive/Mobile_first) concept.

    > * Made a working [comparison slider](https://github.com/ArkHelvetios/Cat-Energy/blob/main/source/js/comparison.js) that has different functionality depending on the width of the viewport. Mobile - simple slider, tablet+ - draggable comparison slider.
    > * Made a working custom [interactive map](https://github.com/ArkHelvetios/Cat-Energy/blob/main/source/js/map.js) by using [Yandex Maps API](https://yandex.com/dev/maps/).

6. In-depth learn about High-DPI/Retina displays and use adaptive content by `viewport width` and `dppx`. Also work with [`WebP`](https://developers.google.com/speed/webp) and [`AVIF`](https://aomediacodec.github.io/av1-avif/v1.1.0.html) as a modern and lighter image formats.

    > * In addition to `<picture>` sets, the `image-set()` function is used for the `background-image` property to use modern image formats. Unfortunately, only Firefox [supported by now](https://caniuse.com/css-image-set).

7. Complex methods working with `SVG`, optimization and creating SVG sprite (or 'symbol library' is more correct, I think).

    > * This seems redundant, but the SVG export from Figma had a lot of unused shapes and masks, and they are not cleaned by `SVGO`. So I re-exported some SVG images through Adobe Illustrator.
    > * Only logotype image in header is used as the loaded image, the rest is in sprite (for `<use>` in HTML) or [URL-encoded](https://yoksel.github.io/url-encoder/) (for use in CSS).

8. All work above was done using [`Gulp`](https://gulpjs.com/) and its modules from NPM as the automation tool. That is Sass/Less compilers, image compressors and convertors, code minifiers and other utilities. My [`package.json`](https://github.com/ArkHelvetios/Cat-Energy/blob/main/package.json) left in the root dir.

    > * Since I decided using Node.js version 18, I had several troubles with modules that made me pain in... softy place for about two days. But well, that was a good experience. :)

9. Work with `Lighthouse` and [`PageSpeed Insight`](https://pagespeed.web.dev/analysis/https-arkhelvetios-github-io-Cat-Energy/39t6h5zgcs), basic page load optimization - FOFT, FOIT, FOUT, mostly about fonts and content flickering.
