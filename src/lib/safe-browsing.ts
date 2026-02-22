export async function checkUrlsSafety(urls: string[]): Promise<{ isSafe: boolean; threats?: string[] }> {
  const apiKey = process.env.GOOGLE_SAFE_BROWSING_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ GOOGLE_SAFE_BROWSING_API_KEY is not set. Skipping Safe Browsing check. All URLs will be treated as safe.");
    return { isSafe: true };
  }

  // Remove empty strings just in case
  const validUrls = urls.filter(u => u.trim() !== "");
  if (validUrls.length === 0) return { isSafe: true };

  try {
    const response = await fetch(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client: {
          clientId: "shortlinkify",
          clientVersion: "1.0.0",
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: validUrls.map(url => ({ url })),
        },
      }),
    });

    if (!response.ok) {
      console.error("Failed to check Safe Browsing API:", await response.text());
      // In case of API failure, we might want to default to true to not block users,
      // but log the error.
      return { isSafe: true };
    }

    const data = await response.json();

    // If 'matches' exists, it means at least one URL is malicious
    if (data && data.matches && data.matches.length > 0) {
      const maliciousUrls = data.matches.map((match: any) => match.threat.url);
      // Remove duplicates
      const uniqueThreats = Array.from(new Set(maliciousUrls)) as string[];
      return { isSafe: false, threats: uniqueThreats };
    }

    return { isSafe: true };
  } catch (error) {
    console.error("Exception in checkUrlsSafety:", error);
    return { isSafe: true };
  }
}
