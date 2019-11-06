import { DEFAULT_TEMPLATE_PATH, getTemplateLocation } from "../utils";

afterEach(() => {
  jest.resetModules();
});

describe("getTemplateLocation", () => {
  it("uses default template if dev does not have custom ones", () => {
    jest.dontMock("fs");

    const templateLocation = getTemplateLocation();

    expect(templateLocation).toEqual(DEFAULT_TEMPLATE_PATH);
  });

  it.skip("uses developer custom templates if defined", () => {
    jest.mock("fs");
    jest.spyOn(process, "cwd").mockImplementation(() => "/custom/path/to");

    const templateLocation = getTemplateLocation();

    expect(templateLocation).toEqual("/custom/path/to/_templates");
  });
});
