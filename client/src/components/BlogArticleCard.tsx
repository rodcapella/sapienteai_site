import { Link } from 'wouter';
import { Clock, User, Tag } from 'lucide-react';
import type { BlogArticle } from '@/lib/blogData';

interface BlogArticleCardProps {
  article: BlogArticle;
}

export default function BlogArticleCard({ article }: BlogArticleCardProps) {
  return (
    <Link href={`/blog/${article.slug}`}>
      <a className="group block h-full">
        <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative overflow-hidden h-48 bg-gray-200">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>

            <p className="text-foreground/70 text-sm mb-4 line-clamp-2 flex-1">
              {article.excerpt}
            </p>

            {/* Meta */}
            <div className="space-y-3 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4 text-xs text-foreground/60">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{article.readTime} min</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="text-xs text-foreground/50">
                {new Date(article.date).toLocaleDateString('pt-PT', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
