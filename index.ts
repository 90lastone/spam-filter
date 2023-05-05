import axios from 'axios';

export function isSpam(
  content: string, spamLinkDomains: string[], redirectionDepth: number
): boolean {
  for (let i = 1; i <= redirectionDepth; i++) {
    if (isSpamContent(content, spamLinkDomains)) {
      return true;
    }
    /*
    리다이렉트 여부
    - 301/302
    - <a href=""></a> 태그 포함
    - 링크 주소 포함?
     */
    // TODO content 에서 리다이렉션 주소들 추출

    // TODO 리다이렉션 주소들이 스팸 링크인지 확인

    // TODO 컨텐츠 다시 대입
  }

  return false;
}

function isSpamContent(content: string, spamLinkDomains: string[]): boolean {
  return spamLinkDomains.some((spamLinkDomain) => {
    return content.includes(spamLinkDomain);
  });
}