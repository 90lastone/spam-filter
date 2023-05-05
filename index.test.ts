import { isSpam } from "./index";

describe("isSpam", () => {
  test("test1", () => {
    const content = "spam spam https://moiming.page.link/exam?_imcp-1";
    const spamLinkDomains = ["moiming.page.link"];
    const redirectionDepth = 1;

    expect(isSpam(content, spamLinkDomains, redirectionDepth)).toBe(true);
  })
});