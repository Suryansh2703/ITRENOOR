import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { articles } from '../data';
import { SEO } from '../components/SEO';
import LazyImage from '../components/LazyImage';

export default function BlogPostPage() {
  const { id } = useParams();
  const article = articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="w-full bg-zinc-950 min-h-screen pt-32 pb-24 px-4 flex flex-col items-center">
        <h2 className="text-2xl font-display text-white mb-4">Article Not Found</h2>
        <Link to="/blog" className="inline-block px-8 py-4 bg-gold-400 text-black font-semibold tracking-widest uppercase text-sm hover:bg-gold-500 transition-colors">
          Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-950 pb-24">
      <SEO 
        title={article.title}
        description={article.excerpt}
        path={`/blog/${article.id}`}
        image={article.image}
        type="article"
        schemaMarkup={`{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": "${article.title}",
          "image": "https://itr-e-noor.vercel.app${article.image}",
          "datePublished": "${article.date}",
          "author": {
            "@type": "Organization",
            "name": "ITR-E-NOOR"
          },
          "publisher": {
            "@type": "Organization",
            "name": "ITR-E-NOOR",
            "logo": {
              "@type": "ImageObject",
              "url": "https://itr-e-noor.vercel.app/src/assets/images/logo_optimized_1782312003937.jpg"
            }
          },
          "description": "${article.excerpt}",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://itr-e-noor.vercel.app/blog/${article.id}"
          }
        }`}
      />
      {/* Hero Image */}
      <div className="relative w-full h-[50vh] md:h-[60vh]">
        <LazyImage 
          src={article.image} 
          alt={`${article.title} - ITR-E-NOOR Fragrance Guide`} 
          fetchPriority="high"
          loading="eager"
          sizes="100vw"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent"></div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
            <Link to="/blog" className="inline-flex items-center text-gold-400 hover:text-gold-300 font-semibold uppercase tracking-widest text-xs mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Journal
            </Link>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="bg-gold-600 border border-gold-400/20 px-3 py-1 uppercase tracking-widest text-xs font-semibold text-black">
                {article.category}
              </span>
              <span className="text-zinc-300 font-mono text-sm">{article.date}</span>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display text-white leading-tight"
            >
              {article.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none text-zinc-300 font-light leading-relaxed"
        >
          <div dangerouslySetInnerHTML={{ __html: article.content.replace(/\n\n/g, '<br/><br/>') }} />
        </motion.div>
        
        <div className="mt-16 pt-8 border-t border-zinc-800">
           <Link to="/blog" className="inline-block px-10 py-4 bg-transparent border border-white text-white font-semibold tracking-widest uppercase text-sm hover:bg-gold-400 hover:text-black hover:border-gold-400 transition-colors duration-300">
             Read More Articles
           </Link>
        </div>
      </div>
    </div>
  );
}
