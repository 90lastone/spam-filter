import { isSpam } from "./index";

describe("isSpam", () => {
  const content = "spam spam https://moiming.page.link/exam?_imcp-1";

  test("test1", async () => {
    const spamLinkDomains = ["docs.github.com"];
    const redirectionDepth = 1;

    expect(await isSpam(content, spamLinkDomains, redirectionDepth)).toBe(false);
  })

  test("test2", async () => {
    const spamLinkDomains = ["moiming.page.link"];
    const redirectionDepth = 1;

    expect(await isSpam(content, spamLinkDomains, redirectionDepth)).toBe(true);
  })

  // test("test3", () => {
  //   const spamLinkDomains = ["github.com"];
  //   const redirectionDepth = 2;
  //
  //   expect(isSpam(content, spamLinkDomains, redirectionDepth)).toBe(true);
  // })
  //
  // test("test4", () => {
  //   const spamLinkDomains = ["docs.github.com"];
  //   const redirectionDepth = 2;
  //
  //   expect(isSpam(content, spamLinkDomains, redirectionDepth)).toBe(false);
  // })
  //
  // test("test5", () => {
  //   const spamLinkDomains = ["docs.github.com"];
  //   const redirectionDepth = 3;
  //
  //   expect(isSpam(content, spamLinkDomains, redirectionDepth)).toBe(true);
  // })
});