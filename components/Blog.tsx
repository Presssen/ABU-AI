import React, { useState, useEffect } from 'react';
import { Content, BlogPost } from '../types';
import { GlassCard } from './ui/GlassCard';
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from 'lucide-react';
import SEO from './SEO';

interface BlogProps {
  text: Content['blog'];
  onBackToHome: () => void;
}

const Blog: React.FC<BlogProps> = ({ text, onBackToHome }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedPost]);

  // Single Post View
  if (selectedPost) {
    return (
      <section className="pt-32 pb-24 min-h-screen px-4">
        <SEO 
          title={`${selectedPost.title} | ABU Blog`} 
          description={selectedPost.excerpt} 
        />
        <div className="max-w-4xl mx-auto">
          {/* Nav */}
          <button 
            onClick={() => setSelectedPost(null)}
            className="flex items-center space-x-2 text-blue-300 hover:text-white mb-8 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>{text.backButton}</span>
          </button>

          <GlassCard className="overflow-hidden">
            {/* Hero Image */}
            <div className="w-full h-64 md:h-96 relative">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
              
              <div className="absolute bottom-0 left-0 p-8 w-full">
                 <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-white uppercase bg-blue-500/80 rounded-full backdrop-blur-md">
                    {selectedPost.category}
                 </span>
                 <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight shadow-black drop-shadow-lg">
                    {selectedPost.title}
                 </h1>
                 <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300">
                    <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{selectedPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{selectedPost.date}</span>
                    </div>
                     <div className="flex items-center space-x-2">
                        <Clock size={16} />
                        <span>{selectedPost.readTime}</span>
                    </div>
                 </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
               <div className="prose prose-invert prose-lg max-w-none">
                  {selectedPost.content.map((paragraph, index) => (
                      <p key={index} className="mb-6 text-gray-300 leading-relaxed text-lg">
                          {paragraph}
                      </p>
                  ))}
               </div>
            </div>
          </GlassCard>
        </div>
      </section>
    );
  }

  // List View
  return (
    <section className="pt-32 pb-24 min-h-screen px-4">
      <SEO 
        title={text.title} 
        description={text.subtitle} 
      />
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
            <div>
                 <button 
                    onClick={onBackToHome}
                    className="flex items-center space-x-2 text-blue-300 hover:text-white mb-4 transition-colors group md:hidden"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Home</span>
                </button>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                {text.title}
                </h1>
                <p className="text-xl text-blue-200/70 max-w-2xl">
                {text.subtitle}
                </p>
            </div>
            <button 
                onClick={onBackToHome}
                className="hidden md:flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
            >
                <ArrowLeft size={18} />
                <span>Back to Home</span>
            </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {text.posts.map((post) => (
                <div key={post.id} className="h-full">
                    <GlassCard className="h-full flex flex-col group cursor-pointer" hoverEffect>
                        <div className="relative h-48 overflow-hidden rounded-t-xl" onClick={() => setSelectedPost(post)}>
                            <img 
                                src={post.image} 
                                alt={post.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                            />
                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 text-xs font-bold text-white bg-black/50 backdrop-blur-md rounded-full">
                                    {post.category}
                                </span>
                            </div>
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="flex items-center space-x-2 text-xs text-blue-300 mb-3">
                                <Calendar size={12} />
                                <span>{post.date}</span>
                                <span className="text-gray-500">•</span>
                                <Clock size={12} />
                                <span>{post.readTime}</span>
                            </div>
                            
                            <h3 
                                onClick={() => setSelectedPost(post)}
                                className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors"
                            >
                                {post.title}
                            </h3>
                            
                            <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                {post.excerpt}
                            </p>
                            
                            <button 
                                onClick={() => setSelectedPost(post)}
                                className="flex items-center space-x-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform w-fit"
                            >
                                <span>{text.readMore}</span>
                                <ArrowRight size={16} className="text-blue-400" />
                            </button>
                        </div>
                    </GlassCard>
                </div>
            ))}
        </div>

      </div>
    </section>
  );
};

export default Blog;