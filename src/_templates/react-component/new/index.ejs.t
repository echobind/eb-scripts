---
to: <%= root %>/ <%= path %> /<%= h.changeCase.pascal(name) %>/index.js
---
<% component = h.changeCase.pascal(name) -%>
export * from './<%= component %>';