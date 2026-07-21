import { motion } from 'motion/react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { articles } from '../data';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "ITR-E-NOOR Fragrance Journal",
    "url": "https://www.itrenoor.app/blog",
    "description": "Read our fragrance journal for the latest tips, guides, and insights onto the best authentic arabian oud perfumes, long lasting attar, and more at ITR-E-NOOR.",
    "blogPost": articles.map(article => ({
      "@type": "BlogPosting",
      "headline": article.title,
      "url": `https://www.itrenoor.app/blog/${article.id}`,
      "image": `https://www.itrenoor.app${article.image}`,
      "datePublished": "2024-01-01", 
      "author": {
        "@type": "Organization",
        "name": "ITR-E-NOOR"
      }
    }))
  };

  return (
    <div className="w-full bg-zinc-950 pb-24">
      <SEO 
        title="Fragrance Journal & Insights"
        description="Read our fragrance journal for the latest tips, guides, and insights onto the best authentic arabian oud perfumes, long lasting attar, and more at ITR-E-NOOR."
        path="/blog"
        preloadImage={articles[0].image}
        schemaMarkup={JSON.stringify(blogSchema)}
      />
      {/* Page Header */}
      <div className="py-20 bg-zinc-900 border-b border-zinc-800 text-center px-4 mb-16 relative">
        <Link to="/" className="absolute top-8 left-8 text-zinc-300 hover:text-gold-500 flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display text-white mb-4"
        >
          Journal & News
        </motion.h1>
         <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100px" }}
            className="h-1 bg-gold-600 mx-auto opacity-50 mb-8"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed text-lg"
          >
            Welcome to the ITR-E-NOOR Journal, your ultimate destination for everything related to luxury attar perfumes and authentic arabian oud perfumes. Delve into the rich history of traditional perfumery, learn how to care for your precious oils, and discover expert tips on selecting the perfect long-lasting attar for every occasion and personality.
          </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {articles.map((article, idx) => (
            <motion.article 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group border border-zinc-800 bg-zinc-900/30 overflow-hidden flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <LazyImage 
                  src={article.image} 
                  alt={`${article.title} - Perfume Tips and Guides`} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  loading={idx === 0 ? "eager" : "lazy"}
                  isLCP={idx === 0}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 border border-white/10 uppercase tracking-widest text-xs font-semibold text-gold-400">
                  {article.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-sm text-zinc-300 font-mono mb-3">{article.date}</div>
                <div className="text-2xl font-serif text-white mb-4 group-hover:text-gold-400 transition-colors">
                  {article.title}
                </div>
                <p className="text-zinc-300 font-light mb-8 line-clamp-3 leading-relaxed flex-grow">
                  {article.excerpt}
                </p>
                <Link to={`/blog/${article.id}`} className="flex items-center text-sm font-semibold uppercase tracking-widest text-white group-hover:text-gold-400 transition-colors mt-auto">
                  Read More <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
