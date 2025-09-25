export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"], // yahan jo pages crawl nahi chahte wo daal do
      },
    ],
    sitemap: "https://freatoolshub.vercel.app/sitemap.xml",
  };
}
