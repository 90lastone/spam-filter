export function isSpam(
  content: string, spamLinkDomains: string[], redirectionDepth: number
): boolean {
  for (let i = 1; i <= redirectionDepth; i++) {
    if (isSpamContent(content, spamLinkDomains)) {
      return true;
    }
    /*
    TODO 리다이렉트 여부
    - 301/302
    - <a href=""></a> 태그 포함
     */
  }

  return false;
}

function isSpamContent(content: string, spamLinkDomains: string[]): boolean {
  return spamLinkDomains.some((spamLinkDomain) => {
    return content.includes(spamLinkDomain);
  });
}