# Sticky Scribbles

1. Type some text and choose a font.
2. Maybe scribble on the sticky note a little.
3. Copy-paste the Output SVG into a file of your own choosing.
4. Open it in your pen plotter software and plot it, I guess!

Need to erase? A page refresh will clear all scribbling.

The fonts are vector strokes suitable for plotting. They're called [Hershey fonts](http://emergent.

You can also [find the full source and history on GitHub](https://github.com/martymcguire/sticky-scribbles).u
---
npythonic.net/software/hershey)
and their story is pretty interesting!

## Why

Inspired by the August 2024 [Glitch Jams](https://glitch.com/jams/) prompt of "#justdraw",
I remembered an old project from _2011_.

Back then I worked for MakerBot Industries and, at the urging of my friend Matt Griffin,
had started a descent into ~~madnes-~~ pen plotting. For me, that meant using the
MakerBot Unicorn a tool for the MakerBot Cupcake CNC that replaced the plastic extruder
to turn a 3D printer into a loosey-goosey pen plotter.

As with most DIY 3D printers of the day, the Cupcake CNC was driven by G-Code - short
instructions sent over a serial port to tell it how to move its motors, etc. When I
started playing around, the process for going from some vector artwork to G-Code was
pretty labor intensive and required multiple tools.

The work area for the Cupcake CNC is 10cm square, which is just a little bit bigger than
a pad of 3"x3" name brand sticky notes. So, these easily becamie a target for my ~~madnes~~ making.

In February of that year I particpated in "Thing-a-Day" on Posterous (RIP), and worked on
seve
---
ral projects to try and boost the ease of use of this whole ecosystem.

## A timeline you didn't ask for

### Unicorn G-Code extension for Inkscape

Mashing up some example Python code from the Unicorn release, and the Inkscape driver for
Evil Mad Scientist Laboratories' [EggBot](https://github.com/evil-mad/EggBot), this extension
let you save (simple) drawings as G-Code that you could plot using a Cupcake CNC + Unicorn.

- [2011-02-01 - Announced the Unicorn G-Code extension for Inkscape](https://martymcgui.re/2011/02/01/thing-a-day-2011-%231-unicorn-pen-plotter-extension-for-inkscape/).
  - [GitHub repository](https://github.com/martymcguire/inkscape-unicorn) (archived 2018)
  - [Thingiverse](http://www.thingiverse.com/thing:5986)
- [2011-02-02 - Added a pen registration step and homing support](https://martymcgui.re/2011/02/02/thing-a-day-2011-%232-new-features-for-inkscape-unicorn-pen-registration-and-homing-support/)
- [2011-02-03 - Added support for multiple copies and continuous plotting](https://martymcgui.re/2011/02/03/thing-a-day-2011-%233-copies-and-continuous-plotting-for-inkscape-unicorn/)
- [2011-02-04 - Added support for pausing to change pens]
While I made this Inkscape extension to serve a very niche machine, I ended up continuing to
improve it here and there. I was surprised to see it adopted by some DIY CNC projects from
all over the world!

Unfortunately, I never made much of a habit out of using my own extension, so when the extension
interfaces changed for Inkscape 0.91.x, I ended up marking it read-only.

There are over 100 forks, though, so maybe somebody picked it back up!
(https://martymcgui.re/2011/02/04/thing-a-day-2011-%234-pen-changing/)

### Hershey fonts

Matt introduced me to [Hershey fonts](http://emergent.unpythonic.net/software/hershey), a set
of vector fonts designed for tThese were in a somewhat legible format, so I became a little obsessed with using them for plotter projects.he U.S. governm -ent for use on CNC machines for plotting or engraving.

These were in a somewhat legible format, so I started working with them

- [2011-02-06 Announced conversions of the Hershey fonts 
  - Windell of Evil Mad Scientist Laboratories was [motivated by this to make an Inkscape extenstion for rendering Hershey text](https://www.evilmadscientist.com/2011/hershey-text-an-inkscape-extension-for-engraving-fonts/).
    That extension became _part of Inkscape_ and after time and improvements it's still there!
- [2011-02-08 - Hershey font rendering as SVG with JavaScript with Raphaël.js](https://martymcgui.re/2011/02/08/thing-a-day-2011-%238-hershey-font-rendering-in-javascript-with-rapha%C3%ABl/).
  A little proof of concept that would eventually become _this_ little proof-of-concept.
- [2011-02-16 - Live demo using jQuery and Raphaël.js](https://martymcgui.re/2011/02/16/thing-a-day-2011-%2316-live-demo-of-hershey-fonts-in-javascript/)
- [2011-02-17 - Added line wrapping to the demo](https://martymcgui.re/2011/02/17/thing-a-day-2011-%2317-simple-line-wrapping-for-hershey-js-demo/)
- [2011-02-20 - Replaced Raphaël.js with canvas](https://martymcgui.re/2011/02/20/thing-a-day-2011-%2320-hershey-fonts-in-javascript-on-the-canvas/)
- [2011-02-21 - Auto-scale text to fit a box](https://martymcgui.re/2011/02/21/thing-a-day-2011-%2321-auto-scaling-hershey-fonts-in-javascript/)
- [2011-02-22 - Added the cursed sticky note backdrop](https://martymcgui.re/2011/02/22/thing-a-day-2011-%2322-hershey-fonts-in-js-on-a-sticky-note/)
- [2011-02-23 - Replaced canvas with Keith Wood's jQuery SVG plugin](https://martymcgui.re/2011/02/23/thing-a-day-2011-%2323-svg-output-for-hershey-fonts-in-javascript/)
- [2011-02-24 - Sized everything for plotting on a sticky note via Unicorn](https://martymcgui.re/2011/02/24/thing-a-day-2011-%2324-hershey-fonts-in-js-now-sized-for-unicorn-plotting/)
- [2011-02-25 - Added terrible scribbling](https://martymcgui.re/2011/02/25/thing-a-day-2011-%2325-scribbling-in-svg-hershey-font-typing/).
  Insisting on having lines visually line up with the sticky note background but come out correctly
  aligned in the resulting SVG was really biting me here.
- [2011-02-26 - "Improved" the terrible scribbling](https://martymcgui.re/2011/02/26/thing-a-day-2011-%2326-improved-scribbling-in-javascript/).
  (Note: this did not fix the alignment issues. Why was I trying to do all the math myself?)

I'd love to share gratuitous details about rewriting bits of this little tool. Unfortunately, I
worked on it live on my site that entire time _without any version control_. 😭

(Where was Glitch in 2011?? lol)

### Misc (un)related projects

- [2011-02-05 - Graffiti Markup Language to Unicorn G-Code](https://martymcgui.re/2011/02/05/thing-a-day-2011-%235-graffiti-markup-language-gml-to-unicorn/)
- [2011-02-14 - An SVG template for tweets](https://martymcgui.re/2011/02/14/thing-a-day-2011-%2314-sticky-note-tweet-template-for-unicorn/)

---

## This version

While you can find the entire history [on the `sticky-scribbles` GitHub](https://github.com/martymcguire/sticky-scribbles),
I had a good time figuring out how I left this ~13 year old project and choosing ways to "modernize"
or at least "make it less bad to my eyes".

### Fixed the cursed sticky note projection

The drawing canvas markup can be summarized like this:

- outer `<svg>` with background image of the stick note
  - inner `<g>`roup with a painstakingly trial-and-errored `transform` that made rendered Hershey
    text look "mostly right"
    - `<g>`roup for the actual rendered Hershey text
    - `<g>`roup for the scribbles

When we scribble onto the canvas, the pointer coordinates don't account for that `transform`, so
if we save them as-is, they'll be skewed from where they appear on the sticky note preview.

Previously, I tried to _do a bunch of math on my own_, which worked out really badly.

Since then, I realized that if I have an existing `transform`, I can:

1. [get that transform as a matrix](https://stackoverflow.com/a/64984121) (thx StackOverflow)
2. [invert that matrix](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix)
3. [apply that matrix to the pointer coordinate](https://stackoverflow.com/a/33579846)

When we add the transformed coordinate to our scribble, it now visually lines up with the preview
on the sticky note! Miracle.

### SVG building

The 2011 version of this demo used [Jeff Wood's jQuery SVG plugin](http://keith-wood.name/svg.html)
to rebuild pretty much the entire contents of the `<svg>` any time something changed.

However, the main structure of the SVG described above doesn't change at all! So I moved the
`<g>`roups that contain the `transform` to make things line up with the sticky note, and its
inner `<g>`roups for the rendered Hershey text and pointer scribbles into the markup on the page.

There were still a couple of useful utilities for creating `<g>`roup and `<path>` elements in the
jQuery SVG plugin, so I made my own version in a little [ES module `svg` helper](https://github.com/martymcguire/sticky-scribbles/blob/main/js/svgHelper.js)

### Going vanilla

There were lots of jQuery-isms that I vanilla-ized and in many cases modernized.

- replace instances of `$('#someid')` with a single `document.querySelector` and a variable
- replace `$(someArray).each(...)` with `for (const item of someArray)`
- update the `hershey.js` font parsing and rendering helper as an ES module.
  - Made use of `async` and `Promise`s to get rid of some messy `setTimeout` calls around font loading.
- replace all `var` declarations with `let` and `const`

### "Web Component" for scribbling

One of the biggest changes was extracting the handling of events and (re-)rendering out of a big
spaghetti ball and into self-contained bits. I did these as web components that don't actually
manage any _child_ HTML. Instead, their attributes tell them which elements on the page they should
hook into for events or render onto.

The `<svg-scribbler>` component is interesting because I have it lean more into using the DOM as
new scribbles are added.

Previously: as the user draws a new scribble, they're pushed into an array, and on every change
we basically call a "render" function that throws out the SVG contents and re-creates it.

The new component simply creates a new `<path>` element when the user starts drawing and updates the
`d` attribute as the user draws. When they stop drawing, the `<path>` is already in the page and done.
When the user starts drawing again, we a new `<path>` element is created without disturbing any
existing `<path>`s from previous scribbles.

Take a look at `js/svg-scribbler.js` for details.

### "Web Component" for Hershey text

Similarly, the `<svg-hersheytext>` component takes care of listening for changes as you type
in the `<textarea>` and re-rendering the `<path>`s for the text contents.

One wrinkle here is that we have a `<select>` dropdown to let you select a different Hershey
font. Previously, a jQuery `change` handler on the `<select>` for choosing a Hershey font would load
the newly selected font and then call what amounted to a top-level "render" function to draw
all Hershey text and scribbles again.

The updated version uses a simpler event handler that emits a custom `HersheyFont:updated` event.
`<svg-hersheytext>` elements listen for that custom events on the `window` object, and re-renders.

If you haven't used them, I think [Chris Ferdinandi does a great job explaining the how and why of custom events](https://gomakethings.com/custom-events-with-vanilla-js/).

### MutationObserver for SVG output area

Wrapped up in the previous spaghetti of "render-everything" style calls was a stop to generate
an SVG string and slap it in a `<textarea>`.

Now that the most of the SVG stays around in the page, I've replaced that with a [MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
that kicks off whenever elements are added or changed down in the SVG tree. I love this!

---

## Known Issues

### Naive `pointer*` events handling does unexpected things on multi-touch devices

For example, this two-finger drag makes kind of a zig-zaggy filled-in area instead of two distinct lines:

![app screenshot showing the effect of a two-finger drag. instead of two distinct lines, we have a zigzag that fills the space between the fingers](https://media.martymcgui.re/1a/dc/45/10/8e6955226824fa55edc93d75ec5e05f6696caeffa9a3870a50ff208f.jpg)

I think this is fun and weird, actually.

### `inkscape-unicorn` is deprecated!

Yeah so the tool this was designed to make drawings for isn't really a going thing in 2024.

Um. Sorry? Enjoy your SVG scribbles anyway!fonts-in-svg/)
  - [Thingiverse](http://www.thingiverse.com/thing:6168)
