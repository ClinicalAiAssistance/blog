import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Search, Filter, Calendar, User, SortAsc, SortDesc } from 'lucide-react';

const blogPosts = [
  {
    id: '1',
    title: 'AI in Medical Diagnostics: The Future is Now',
    excerpt: 'Explore how artificial intelligence is revolutionizing diagnostic procedures across medical specialties.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'May 15, 2025',
    dateSort: '2025-05-15',
    author: 'Dr. Sarah Johnson',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Diagnostics',
    tags: ['AI', 'Diagnostics', 'Innovation'],
    readTime: '8 min read',
    likes: 142,
    shares: 28
  },
  {
    id: '2',
    title: 'How Machine Learning is Improving Patient Outcomes',
    excerpt: 'Learn about the latest research showing significant improvements in patient care through machine learning algorithms.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'May 10, 2025',
    dateSort: '2025-05-10',
    author: 'Dr. Michael Chen',
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Research',
    tags: ['Machine Learning', 'Patient Care', 'Research'],
    readTime: '6 min read',
    likes: 98,
    shares: 15
  },
  {
    id: '3',
    title: 'Ethical Considerations in Clinical AI Implementation',
    excerpt: 'A deep dive into the ethical frameworks guiding responsible AI deployment in healthcare settings.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'May 5, 2025',
    dateSort: '2025-05-05',
    author: 'Dr. Emily Rodriguez',
    image: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Ethics',
    tags: ['Ethics', 'Implementation', 'Guidelines'],
    readTime: '10 min read',
    likes: 76,
    shares: 22
  },
  {
    id: '4',
    title: 'The Role of AI in Personalized Medicine',
    excerpt: 'How artificial intelligence is enabling truly personalized treatment plans based on individual patient data.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'April 28, 2025',
    dateSort: '2025-04-28',
    author: 'Dr. James Wilson',
    image: 'https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Treatment',
    tags: ['Personalized Medicine', 'Treatment', 'Patient Data'],
    readTime: '7 min read',
    likes: 134,
    shares: 31
  },
  {
    id: '5',
    title: 'Implementing AI in Small Clinical Practices',
    excerpt: 'Practical guidance for smaller healthcare providers looking to leverage AI technologies.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'April 20, 2025',
    dateSort: '2025-04-20',
    author: 'Dr. Lisa Thompson',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Implementation',
    tags: ['Small Practices', 'Implementation', 'Practical Guide'],
    readTime: '5 min read',
    likes: 89,
    shares: 18
  },
  {
    id: '6',
    title: 'The Future of Clinical Decision Support Systems',
    excerpt: 'Exploring the next generation of AI-powered tools for clinical decision making.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'April 15, 2025',
    dateSort: '2025-04-15',
    author: 'Dr. Robert Lee',
    image: 'https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Innovation',
    tags: ['Decision Support', 'Innovation', 'Future Tech'],
    readTime: '9 min read',
    likes: 156,
    shares: 42
  },
  {
    id: '7',
    title: 'AI-Powered Drug Discovery: Accelerating Medical Breakthroughs',
    excerpt: 'How artificial intelligence is transforming pharmaceutical research and drug development processes.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'April 8, 2025',
    dateSort: '2025-04-08',
    author: 'Dr. Sarah Johnson',
    image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Research',
    tags: ['Drug Discovery', 'Pharmaceuticals', 'AI Research'],
    readTime: '12 min read',
    likes: 203,
    shares: 67
  },
  {
    id: '8',
    title: 'Telemedicine and AI: The Perfect Partnership',
    excerpt: 'Examining how AI enhances remote healthcare delivery and patient monitoring capabilities.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    date: 'March 30, 2025',
    dateSort: '2025-03-30',
    author: 'Dr. Michael Chen',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    category: 'Telemedicine',
    tags: ['Telemedicine', 'Remote Care', 'Digital Health'],
    readTime: '6 min read',
    likes: 112,
    shares: 25
  }
];

const categories = [...new Set(blogPosts.map(post => post.category))];
const authors = [...new Set(blogPosts.map(post => post.author))];

const BlogPage = ({ limit }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedAuthor, setSelectedAuthor] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);


  // Filter and sort posts
  const filteredAndSortedPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
      const matchesAuthor = selectedAuthor === '' || post.author === selectedAuthor;
      
      return matchesSearch && matchesCategory && matchesAuthor;
    })
    .sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.dateSort).getTime() - new Date(b.dateSort).getTime();
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'author':
          comparison = a.author.localeCompare(b.author);
          break;
        case 'likes':
          comparison = a.likes - b.likes;
          break;
        case 'readTime':
          comparison = parseInt(a.readTime) - parseInt(b.readTime);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    })
    .slice(0, limit || blogPosts.length);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedAuthor('');
    setSortBy('date');
    setSortOrder('desc');
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Latest from Our Blog</h1>
          <p className="text-lg text-gray-600">
            Insights, research, and updates from the world of clinical AI and healthcare technology.
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6">
            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search articles, tags, or keywords..."
                className="input-field pl-10 pr-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Filter Toggle */}
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                <Filter size={18} className="mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              
              {(selectedCategory || selectedAuthor || sortBy !== 'date' || sortOrder !== 'desc') && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear All Filters
                </button>
              )}
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t"
              >
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="input-field text-sm"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Author Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <select
                    className="input-field text-sm"
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                  >
                    <option value="">All Authors</option>
                    {authors.map((author, index) => (
                      <option key={index} value={author}>{author}</option>
                    ))}
                  </select>
                </div>

                {/* Sort By */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    className="input-field text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Date</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                    <option value="likes">Popularity</option>
                    <option value="readTime">Read Time</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <button
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    className="flex items-center justify-center w-full input-field text-sm hover:bg-gray-50"
                  >
                    {sortOrder === 'desc' ? (
                      <>
                        <SortDesc size={16} className="mr-2" />
                        Descending
                      </>
                    ) : (
                      <>
                        <SortAsc size={16} className="mr-2" />
                        Ascending
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Showing {filteredAndSortedPosts.length} of {blogPosts.length} articles
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {filteredAndSortedPosts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedPosts.map((post, index) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card overflow-hidden group"
              >
                <div className="relative">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-xs font-medium px-2 py-1 bg-primary-600 text-white rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="text-xs font-medium px-2 py-1 bg-black/70 text-white rounded-full">
                      {post.readTime}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      {post.author.split(' ')[1]}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    <Link to={`/blog/${post.id}`} className="hover:text-primary-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                        +{post.tags.length - 2}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                       <span className="flex items-center text-pink-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                        {post.likes}
                      </span>
                       <span className="flex items-center text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6L12 10m6.632 2.684a3 3 0 110-2.684m0 2.684L12 14m0 2.684l3.316 1.658a3 3 0 10-.316-2.684m-3.316 2.684V16m0 0a3 3 0 10-.316-2.684m3.316 2.684a3 3 0 110-2.684" />
                        </svg>
                        {post.shares}
                      </span>
                    </div>
                    <Link 
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                    >
                      Read more
                      <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;