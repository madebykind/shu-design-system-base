---
title: Modular Scale
---

Font sizing is based on a modular scale, and utilises the [modularscale-sass](https://github.com/modularscale/modularscale-sass) plugin to split 3 threads, small, default and large. Small uses a [12px / 1.5 ratio](http://www.modularscale.com/?12&px&1.500), Default uses a [16px / [16px / 1.5 ratio](http://www.modularscale.com/?16&px&1.500), and Large uses [21px / 1.5 ratio](http://www.modularscale.com/?21&px&1.500).

`tools/_font-ratio.scss` is where these parameteres are defined and can be tweaked. Docs on the available options can be found [here](https://github.com/modularscale/modularscale-sass).

Within Sass modular scale output is declared using the `ms()` helper function. This function takes a number to define whereabouts you want to be on the scale tier, and an optional `$thread` definition, this is commonly used to change threads across breakpoints, for example:

```
h2 {
  font-size: ms(2);

  @include respond-to(medium) {
    font-size: ms(2, $thread: desktop);
  }
}
```

This would give you a 2 tier up, 16px base, 1.200 ratio font on small screens, and a 16px base, 1.333 ratio font on medium +

## Useful things to know

- Scale can be changed globally by simply changing the values in `tools/_font-ratio.scss`
- Multiple threads can be added or removed


## Modular Scale defaults

The list below is the current default for this project.

<table>
<thead>
<th>Name</th>
<th>Base</th>
<th>Ratio</th>
</thead>
<tbody>
    <tr>
        <td><code>Small</code></td>
        <td><code>12px</code></td>
        <td><code>1.5</code></td>
    <tr>
    <tr>
        <td><code>Default</code></td>
        <td><code>16px</code></td>
        <td><code>1.5</code></td>
    <tr>
    <tr>
        <td><code>Large</code></td>
        <td><code>21px</code></td>
        <td><code>1.5</code></td>
    <tr>
</tr>
</table>
