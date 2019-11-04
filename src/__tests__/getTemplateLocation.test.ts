import {
  DEFAULT_TEMPLATE_PATH,
  getTemplateLocation
} from "../utils/getTemplateLocation";

afterEach(() => {
  jest.resetModules();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe("my thing", () => {
  it("uses default template if dev does not have custom ones", () => {
    jest.dontMock("fs");

    const templateLocation = getTemplateLocation();

    expect(templateLocation).toEqual(DEFAULT_TEMPLATE_PATH);
  });

  it("uses developer custom templates if defined", () => {
    jest.mock("fs");
    jest.spyOn(process, "cwd").mockImplementation(() => "/custom/path/to");

    const { getTemplateLocation } = require("../utils/getTemplateLocation");

    const templateLocation = getTemplateLocation();

    expect(templateLocation).toEqual("/custom/path/to/_templates");
  });
});
