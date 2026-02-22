'use server'

import { checkUrlsSafety } from "@/lib/safe-browsing";

/**
 * 渡されたURL配列がGoogle Safe Browsing上安全かどうかを判定する
 */
export async function verifyUrlsWithSafeBrowsing(urls: string[]) {
  return await checkUrlsSafety(urls);
}
