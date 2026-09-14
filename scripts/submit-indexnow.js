const host = "www.sapienteai.com";
const key = "9c9acd24b0a3472c8d057703152121b1";
const keyLocation = `https://${host}/${key}.txt`;

const urls = [...new Set(process.argv.slice(2))];

if (urls.length === 0) {
  console.error("Provide at least one changed URL to submit to IndexNow.");
  process.exit(1);
}

if (urls.length > 10_000) {
  console.error("IndexNow accepts at most 10,000 URLs per request.");
  process.exit(1);
}

for (const value of urls) {
  let url;
  try {
    url = new URL(value);
  } catch {
    console.error(`Invalid URL: ${value}`);
    process.exit(1);
  }

  if (url.protocol !== "https:" || url.hostname !== host) {
    console.error(`URL must belong to https://${host}: ${value}`);
    process.exit(1);
  }
}

const response = await fetch("https://api.indexnow.org/IndexNow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList: urls }),
});

if (!response.ok) {
  const details = await response.text();
  console.error(`IndexNow submission failed (${response.status}). ${details}`.trim());
  process.exit(1);
}

console.log(`IndexNow accepted ${urls.length} changed URL(s).`);
