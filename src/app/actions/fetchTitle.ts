'use server';
import * as cheerio from 'cheerio';

export async function fetchMetaTitle(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      next: { revalidate: 3600 } // URLのタイトルは1時間キャッシュ
    });

    if (!response.ok) {
      return '';
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // titleタグ、またはog:titleから取得
    let title = $('title').text() || $('meta[property="og:title"]').attr('content') || '';

    return title.trim();
  } catch (error) {
    console.error('Error fetching meta title:', error);
    return '';
  }
}
