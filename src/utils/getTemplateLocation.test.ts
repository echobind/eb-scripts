import {
  DEFAULT_TEMPLATE_PATH,
  getTemplateLocation
} from "./getTemplateLocation";

test("uses default template if dev does not have custom ones", () => {
  const templateLocation = getTemplateLocation();

  expect(templateLocation).toEqual(`HYGEN_TMPLS=${DEFAULT_TEMPLATE_PATH}`);
});

test("uses developer custom templates if defined", () => {
  const templateLocation = getTemplateLocation();

  expect(templateLocation).toEqual(`HYGEN_TMPLS=custom/path/to/_templates`);
});
