import axios from 'axios';

export async function isSpam(
  content: string, spamLinkDomains: string[], redirectionDepth: number
): Promise<boolean> {
  for (let i = 1; i <= redirectionDepth; i++) {
    /*
    리다이렉트 여부
    - 301/302
    - <a href=""></a> 태그 포함. TODO 주소가 여러개 있으면?
    - 링크 주소 포함? TODO 첫번째 예시 컨텐츠 문자열에서 링크 주소 추출은 어떤기준? 그냥 링크?
     */
    // content 에서 리다이렉션 주소들 추출
    const urls = getUrls(content);
    const atagRedirectionUrls = getAtagRedirectionUrls(content);
    const axiosRedirectionUrls = await getAxiosRedirectionUrls([...urls, ...atagRedirectionUrls]);

    const isSpam = isSpamLink([...urls, ...atagRedirectionUrls, ...axiosRedirectionUrls], spamLinkDomains);
    console.log(isSpam);
    if (isSpam) {
      return true;
    }

    // TODO 컨텐츠 다시 대입
  }

  return false;
}

// content 에서 리다이렉션 주소들 추출
function getAtagRedirectionUrls(content: string): string[] {
  const regex = /<a href="(.*)">/g;
  const urls: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

// content 에서 a 태그 없이 링크 추출
function getUrls(content: string): string[] {
    const regex = /https?:\/\/[^\s]+/g;
    const urls = content.match(regex);
    if (urls === null) {
        return [];
    }

    return urls;
}

async function getAxiosRedirectionUrls(urls: string[]): Promise<string[]> {
  const result: string[] = [];

  await Promise.all(urls.map(async (url: string): Promise<void> => {
    try {
      await axios.get(url, { maxRedirects: 0 });
    } catch (error: any) {
      const status = error.response.status;
      if (status === 301 || status === 302) {
        result.push(error.response.headers.location);
      }
    }
  }));

  return result;
}

function isSpamLink(urls: string[], spamLinkDomains: string[]): boolean {
  for (const url of urls) {
    for (const spamLinkDomain of spamLinkDomains) {
      if (url.includes(spamLinkDomain)) {
        return true;
      }
    }
  }

  return false;
}

const content = "spam spam https://moiming.page.link/exam?_imcp-1";
const spamLinkDomains = ["moiming.page.link"];
const redirectionDepth = 1;
isSpam(content, spamLinkDomains, redirectionDepth);