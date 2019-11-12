---
to: <%= root %>/<%= path %>/<%= h.changeCase.pascal(name) %>/<%= h.changeCase.pascal(name) %>.tsx
---
<% component = h.changeCase.pascal(name) -%>
import React from 'react'

interface Props {
  // example prop
  /* controls whether the form is disabled */
  isDisabled?: boolean;
}

/** Description of component */
export const <%= component %>: React.FC<Props> = ({ isDisabled }) => {
  return (
  <h1>Hello <%= component %> component!</h1>
  )
}

// Forgot how to do something in TypeScript/React?
// Check out this cheatsheet - it has everything you need
// https://github.com/typescript-cheatsheets/react-typescript-cheatsheet