---
to: <%= root %>/<%= path %>/<%= h.changeCase.pascal(name) %>/index.ts
---
<% component = h.changeCase.pascal(name) -%>
export * from './<%= component %>';