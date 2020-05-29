# Simple Grid section skin

The simple grid custom element is a layer of sugaring to enable rapid section skinning. When added to a section page, it will parse the page for different card types and move them into itself. Using a ShadowDOM template, it reshuffles those cards into a simple grid and provides full-width insertion points above and below that grid.

### ShadowDOM structure

```
<slot name="above"></slot>
<slot name="nav"></slot>
<section>
  <slot class="grid"></slot>
</section>
<slot name="below"></slot>
```

### Example

```
<simple-grid theme="dark" nav="Custom Title" zones="simple">
  <custom-splash slot="above">...</custom-splash>
</simple-grid>
```

### Configurable attributes/properties

**`nav`** 

By default, the nav will not be moved. This element is infrequently used and it is likely that any section page using this element will have an identifying splash above the grid. Including `nav` as a boolean attribute, or setting it to true in JavaScript will render the default navigation. Assigning a string to nav in the attribute, or in JavaScript, will render the nav and change the title to the new string.

**`theme`**

By default the appearance of the page, other than the reshuffled grid, remains the same. The only alternate theme currently available is `"dark"`, which will change the page to have an impact-based appearance. Expect more to come. Theme changes can occur independently from rendering, and changes to the attribute or property are observed.

**`zones`**

By default the reshuffled grid contains no ad units or zones. This is a common request on custom layouts. Currently, there is also a `"simple"` option that will include one ad inside the grid for each breakpoint. This property **is not** observed because of how our advertisements work, so it must be set in the HTML. Zones implementation is a work in progress and any changes will be recorded here.

### Events

**`change`**

Custom change events will fire when attribute changes are reflected. The events include a `detail` property that have the following structure:

```
detail: {
  type: "", // nav|theme|zones
  ov: "", // original value
  nv: "" // new value
}
```

**`complete`**

A complete event will fire after all content is moved, just prior to the removal of the `.faded` class.

### Methods and properties

**`addCSS(string)`** 

The element attaches two inline style tags to the page, one for themes and another for generic changes, that can affect the LightDOM or any other element on the page. This function take a string and will append it to the generic style sheet.

**`query(string)`**

With cards being moved around, they could be in different places. This function returns the first match using a standard CSS query selector.

**`queryAll(string)`**

Same as above, but returns a Set with all elements that match the query selector.

**`getZone(string|int)`** 

This utility function makes moving zones much easier. Using a CSS query selector, or the zone id as an int, it will return the first match in the list of zones.

#### Other ways to enhance the deck

The SimpleGrid class can easily be extended, should a new project need that level of alteration. It is also easy to enhance the page further using the events listed above. Check the source code and have fun.
