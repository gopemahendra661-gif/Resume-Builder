import React from 'react';
import { Helmet } from 'react-helmet';
import { ArrowLeft, Calendar, Clock, User, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { AdsterraNative } from '../components/AdsterraBanner';

interface BlogPostProps {
  slug: string;
  onNavigate: (page: 'landing' | 'analyzer' | 'builder' | 'blog', slug?: string) => void;
}

export const BlogPost: React.FC<BlogPostProps> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS[slug];

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Article not found</h2>
        <button 
          onClick={() => onNavigate('landing')}
          className="text-primary-600 hover:underline"
        >
          Return to Home
        </button>
      </div>
    );
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-16">
      <Helmet>
        <title>{post.title} | ResumeAI Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={post.image} />
        <link rel="canonical" href={`https://resumeai.com/blog/${post.slug}`} />
      </Helmet>

      {/* Navigation */}
      <div className="mb-8">
        <button 
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Home
        </button>
      </div>

      {/* Article Header */}
      <header className="mb-10 text-center">
        <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
          Career Advice
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 dark:text-gray-400 text-sm">
          <div className="flex items-center">
            <User size={16} className="mr-2" />
            {post.author}
          </div>
          <div className="flex items-center">
            <Calendar size={16} className="mr-2" />
            {post.date}
          </div>
          <div className="flex items-center">
            <Clock size={16} className="mr-2" />
            {post.readTime}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="rounded-2xl overflow-hidden mb-10 shadow-lg relative">
        <img 
          src={post.image} 
          alt={post.title} 
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute top-4 right-4">
          <button 
            onClick={handleShare}
            className="p-3 bg-white/90 dark:bg-gray-800/90 rounded-full text-gray-700 dark:text-gray-200 shadow-sm hover:bg-white hover:text-primary-600 transition-all"
            title="Share Article"
          >
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <article className="prose prose-lg dark:prose-invert max-w-none mx-auto text-gray-800 dark:text-gray-200">
        {/* Render HTML content securely */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      
      {/* Native Ad within blog */}
      <div className="mt-12 mb-12">
        <AdsterraNative />
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-8 text-center border border-primary-100 dark:border-primary-800">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to put this advice into action?</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg mx-auto">
          Build your ATS-friendly resume in minutes with our free builder. No sign-up required.
        </p>
        <button 
          onClick={() => onNavigate('builder')}
          className="px-8 py-3 bg-primary-600 text-white font-bold rounded-xl shadow-lg hover:bg-primary-700 transition-transform hover:-translate-y-1"
        >
          Build My Resume Now
        </button>
      </div>
    </div>
  );
};
