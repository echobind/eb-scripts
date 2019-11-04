import {
  DEFAULT_TEMPLATE_PATH,
  getTemplateLocation
} from "../utils/getTemplateLocation";

describe("getTemplateLocation", () => {
  afterEach(() => {
    jest.resetModules();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("uses default template if dev does not have custom ones", () => {
    jest.dontMock("fs");

    const templateLocation = getTemplateLocation();

    expect(templateLocation).toEqual(DEFAULT_TEMPLATE_PATH);
  });

  it("uses developer custom templates if defined", () => {
    jest.mock("fs");
    jest.mock("process", () => ({
      cwd: () => "/custom/path/to"
    }));

    // We import this function here because of the way Jest mocks process.cwd
    // If we delete this import and use the "global" import at the top of the file
    // Jest doesn't mock process.cwd() correctly
    // See discussion: https://github.com/echobind/eb-scripts/pull/29#discussion_r342288096
    const { getTemplateLocation } = require("../utils/getTemplateLocation");

    const templateLocation = getTemplateLocation();

    expect(templateLocation).toEqual("/custom/path/to/_templates");
  });
});
