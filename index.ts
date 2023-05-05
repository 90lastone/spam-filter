export function isSpam(
  content: string, spamLinkDomains: string[], redirectionDepth: number
): boolean {
  for (let i = 1; i <= redirectionDepth; i++) {
    if (isSpamContent(content, spamLinkDomains)) {
      return true;
    }
  }

  return false;
}

function isSpamContent(content: string, spamLinkDomains: string[]): boolean {
  return spamLinkDomains.some((spamLinkDomain) => {
    return content.includes(spamLinkDomain);
  });
}