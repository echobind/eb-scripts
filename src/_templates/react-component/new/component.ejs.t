---
to: <%= path %>/src/components/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.jsx
---
<% component = h.changeCase.pascal(name) -%>
import React from 'react'

/** Description of component */
export const <%= component %> = () => {
  return (
  <h1>Hello <%= component %> component!</h1>
  )
}
