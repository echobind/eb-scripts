afterEach(() => {
  jest.resetModules();
});

test("uses default template if dev does not have custom ones", () => {
  jest.dontMock("fs");

  const {
    DEFAULT_TEMPLATE_PATH,
    getTemplateLocation
  } = require("./getTemplateLocation");

  const templateLocation = getTemplateLocation();

  expect(templateLocation).toEqual(DEFAULT_TEMPLATE_PATH);
});

test("uses developer custom templates if defined", () => {
  jest.mock("fs");
  jest.spyOn(process, "cwd").mockImplementation(() => "/custom/path/to");

  const { getTemplateLocation } = require("./getTemplateLocation");

  const templateLocation = getTemplateLocation();

  expect(templateLocation).toEqual("/custom/path/to/_templates");
});
