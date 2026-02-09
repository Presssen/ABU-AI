import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Content, BlogPost } from '../types';
import { GlassCard } from './ui/GlassCard';
import { ArrowLeft, Clock, Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import SEO from './SEO';

interface BlogProps {
    text: Content['blog'];
}

const POSTS_PER_PAGE = 9;

const Blog: React.FC<BlogProps> = ({ text }) => {
    const { lang, slug } = useParams<{ lang: string; slug?: string }>();
    const navigate = useNavigate();

    // Derived state from slug
    const selectedPost = slug ? text.posts.find(p => p.id === slug) : null;

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    const categories = ['All', ...Array.from(new Set(text.posts.map(post => post.category)))];

    useEffect(() => {
        setSelectedCategory('All');
        setCurrentPage(1);
    }, [text]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [slug, currentPage, selectedCategory]);

    const filteredPosts = selectedCategory === 'All'
        ? text.posts
        : text.posts.filter(post => post.category === selectedCategory);

    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handlePostClick = (post: BlogPost) => {
        navigate(`/${lang}/blog/${post.id}`);
    };

    const handleBackClick = () => {
        navigate(`/${lang}/blog`);
    };

    if (selectedPost) {
        const otherPosts = text.posts.filter(p => p.id !== selectedPost.id);
        const sameCategory = otherPosts.filter(p => p.category === selectedPost.category);

        let recommended: BlogPost[] = [];
        if (sameCategory.length >= 2) {
            recommended = sameCategory.slice(0, 2);
        } else {
            recommended = [...sameCategory, ...otherPosts.filter(p => p.category !== selectedPost.category)].slice(0, 2);
        }

        return (
            <section className="pt-32 pb-24 min-h-screen px-4 animate-in fade-in duration-500">
                <SEO
                    title={`${selectedPost.title} | ABU Blog`}
                    description={selectedPost.excerpt}
                />
                <div className="max-w-4xl mx-auto">
                    <button
                        onClick={handleBackClick}
                        className="flex items-center space-x-2 text-blue-300 hover:text-white mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>{text.backButton}</span>
                    </button>

                    <GlassCard className="overflow-hidden mb-12">
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

                    <div className="border-t border-white/10 pt-12">
                        <h3 className="text-2xl font-bold text-white mb-8">
                            {text.readMore || "Artículos recomendados"}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {recommended.map((post) => (
                                <GlassCard
                                    key={post.id}
                                    className="group cursor-pointer flex flex-col h-full"
                                    hoverEffect
                                    onClick={() => handlePostClick(post)}
                                >
                                    <div className="relative h-48 overflow-hidden rounded-t-xl">
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
                                        <h4
                                            className="text-lg font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2"
                                        >
                                            {post.title}
                                        </h4>
                                        <div className="flex items-center space-x-2 text-xs text-gray-400 mt-auto">
                                            <Calendar size={12} />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="pt-32 pb-24 min-h-screen px-4 animate-in fade-in duration-500">
            <SEO
                title={text.title}
                description={text.subtitle}
            />
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <div>
                        <button
                            onClick={() => navigate(`/${lang}`)}
                            className="flex items-center space-x-2 text-blue-300 hover:text-white mb-4 transition-colors group md:hidden"
                        >
                            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                            <span>Inicio</span>
                        </button>
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 pb-2">
                            {text.title}
                        </h1>
                        <p className="text-xl text-blue-200/70 max-w-2xl">
                            {text.subtitle}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate(`/${lang}`)}
                        className="hidden md:flex items-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all shrink-0 h-fit"
                    >
                        <ArrowLeft size={18} />
                        <span>Volver al Inicio</span>
                    </button>
                </div>

                <div className="flex flex-wrap gap-3 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => {
                                setSelectedCategory(cat);
                                setCurrentPage(1);
                            }}
                            className={`
                        px-5 py-2 rounded-full text-sm font-bold transition-all border
                        ${selectedCategory === cat
                                    ? 'bg-blue-600 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                                    : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                                }
                    `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {currentPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                        {currentPosts.map((post) => (
                            <div key={post.id} className="h-full">
                                <GlassCard
                                    className="h-full flex flex-col group cursor-pointer"
                                    hoverEffect
                                    onClick={() => handlePostClick(post)}
                                >
                                    <div className="relative h-48 overflow-hidden rounded-t-xl">
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
                                            className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors"
                                        >
                                            {post.title}
                                        </h3>

                                        <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                                            {post.excerpt}
                                        </p>

                                        <div
                                            className="flex items-center space-x-2 text-sm font-bold text-white group-hover:translate-x-2 transition-transform w-fit"
                                        >
                                            <span>{text.readMore}</span>
                                            <ArrowRight size={16} className="text-blue-400" />
                                        </div>
                                    </div>
                                </GlassCard>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        <p>No se encontraron artículos en esta categoría.</p>
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-4">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>

                        <span className="text-blue-200 font-medium">
                            Página {currentPage} de {totalPages}
                        </span>

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className="p-3 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/10 transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                )}

            </div>
        </section>
    );
};

export default Blog;