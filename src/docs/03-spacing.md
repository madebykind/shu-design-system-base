---
title: Spacing Helpers
---

Spacing defintions are stored in `design/spacing.yml` as [Design Token compliant](https://github.com/salesforce-ux/theo#overview) `YAML` files, and automatically pulled into Sass and JavaScript using [`gulp-theo`](https://github.com/salesforce-ux/gulp-theo).

Within Sass spacing values are consumed using the `spacing()` helper function. This function takes a space delimited list of values, consisting of either the name of a spacing unit (see below) and/or integer values.

## Useful things to know

- All values are automatically converted to rems on output
- If you wish to use an integer value, specify in unitless pixels 


## Spacing units and names

The list below is automatically generated from the breakpoints available to this project.

{% set output %}
  {% for key, breakpoint in spacing %}
      <tr>
          <td><code>{{ key }}</code></td>
          <td><code>{{ breakpoint.value }}px</code></td>
          <td><code>property: spacing({{ key }})</code></td>
      <tr>
  {% endfor %}
{% endset %}
<table>
<thead>
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Reference</th>
  </tr>
</thead>
<tbody>
  {{ output | safe  }}
</tr>
</table>

---

## Spacing / Pad Utility
An array of utility selectors that can be used to attribute spacing based on the spacing design tokens explained above.

### Base
The base class will give padding amount in the specified position (`top`, `left`, `right`, `bottom`) with the specified amount (`half`, `base`, `double`, `triple`, `quad`, `oct`)
```html
.p-top--double
.p-left--quad
.p-bottom
```

### Responsive
Responsive modifiers can be added:
```html
.p-top@medium
.p-left--quad@large
.p-bottom@medium
```

### Reset
Reset modifier will clear padding for said params, for example you may want `double` padding at small, then no padding at `medium`
```html
.pad-top-reset@medium
```
