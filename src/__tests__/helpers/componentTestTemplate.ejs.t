---
to: <%= root %>/<%= path %>/<%= h.changeCase.pascal(name) %>.jsx
---
// Used for testing purposes
<% component = h.changeCase.pascal(name) -%>
import React from 'react'

/** Description of component */
export const <%= component %> = () => {
return (
<h1>Hello <%= component %> component!</h1>
)
}