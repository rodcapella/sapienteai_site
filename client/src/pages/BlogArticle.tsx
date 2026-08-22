import { useEffect } from "react";
import { Link } from "wouter";
import { Calendar, User } from "@/lib/icons";
import { getBlogArticleBySlug } from "@/lib/blogData";
import { useSEOHead } from "@/hooks/useSEOHead";
import { useTranslation } from "@/hooks/useTranslation";

type BlogArticleProps = { lang: string; slug: string };

function ArticleBody({ content }: { content: string }) {
  return content.split(/\n\n+/).map((block, index) => {
    const text = block.trim();
    if (!text) return null;
    if (text.startsWith("### ")) return <h3 key={index} className="mt-8 font-heading text-2xl font-black">{text.slice(4)}</h3>;
    if (text.startsWith("## ")) return <h2 key={index} className="mt-10 font-heading text-3xl font-black">{text.slice(3)}</h2>;
    if (text.startsWith("# ")) return null;
    if (text.split("\n").every((line) => /^[-*]\s/.test(line))) {
      return <ul key={index} className="my-6 list-disc space-y-2 pl-6">{text.split("\n").map((line) => <li key={line}>{line.replace(/^[-*]\s/, "")}</li>)}</ul>;
    }
    return <p key={index} className="my-5 leading-8 text-foreground/75">{text.replaceAll("**", "")}</p>;
  });
}

export default function BlogArticle({ lang, slug }: BlogArticleProps) {
  const { lang: activeLang } = useTranslation();
  const article = getBlogArticleBySlug(slug);
  const canonical = `https://www.sapienteai.com/${lang}/blog/${slug}`;

  useSEOHead({
    title: article?.title || (activeLang === "en" ? "Article not found" : "Artigo não encontrado"),
    description: article?.excerpt || "Sapiente.AI",
    image: article ? `https://www.sapienteai.com${article.image}` : undefined,
    url: canonical,
    type: "article",
    noindex: !article,
  }, [article, activeLang, canonical]);

  useEffect(() => {
    if (!article) return;
    const schema = document.createElement("script");
    schema.id = "blog-article-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "BlogPosting", "@id": `${canonical}#article`,
      headline: article.title, description: article.excerpt, datePublished: article.date, dateModified: article.date,
      image: `https://www.sapienteai.com${article.image}`, inLanguage: lang === "pt" ? "pt-PT" : "en",
      author: { "@id": "https://www.sapienteai.com/#organization" }, publisher: { "@id": "https://www.sapienteai.com/#organization" },
      mainEntityOfPage: canonical,
    });
    document.head.appendChild(schema);
    return () => schema.remove();
  }, [article, canonical, lang]);

  if (!article) return <section aria-labelledby="blog-not-found-title" className="mx-auto max-w-4xl px-6 py-32"><h1 id="blog-not-found-title" className="font-heading text-5xl font-black">404</h1><Link href={`/${lang}/blog`} className="mt-8 inline-block font-bold text-primary underline underline-offset-4">Blog</Link></section>;

  return (
    <article className="bg-ice px-6 py-20 md:py-28">
      <article className="mx-auto max-w-4xl rounded-3xl bg-white p-7 shadow-xl md:p-14">
        <p className="text-sm font-black uppercase tracking-widest text-primary">{article.category}</p>
        <h1 className="mt-5 font-heading text-4xl font-black leading-tight md:text-6xl">{article.title}</h1>
        <p className="mt-6 text-xl leading-relaxed text-foreground/65">{article.excerpt}</p>
        <div className="mt-8 flex flex-wrap gap-6 border-b border-foreground/10 pb-8 text-sm text-foreground/55">
          <span className="flex items-center gap-2"><User className="h-4 w-4" />{article.author}</span>
          <time className="flex items-center gap-2" dateTime={article.date}><Calendar className="h-4 w-4" />{new Date(article.date).toLocaleDateString(lang === "en" ? "en-US" : "pt-PT")}</time>
        </div>
        <div className="prose mt-10 max-w-none"><ArticleBody content={article.content} /></div>
        <Link href={`/${lang}/blog`} className="mt-12 inline-block font-black text-primary underline decoration-2 underline-offset-4">← {lang === "en" ? "Back to blog" : "Voltar ao blog"}</Link>
      </article>
    </article>
  );
}
