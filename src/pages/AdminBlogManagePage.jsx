import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Heart,
  MessageCircle,
} from 'lucide-react';

const mockBlogPosts = [
  {
    id: '1',
    title: 'AI in Medical Diagnostics: The Future is Now',
    excerpt: 'Explore how artificial intelligence is revolutionizing diagnostic procedures across medical specialties.',
    status: 'published',
    date: 'May 15, 2025',
    author: 'Dr. Sarah Johnson',
    category: 'Diagnostics',
    views: 1247,
    likes: 142,
    comments: 15,
    shares: 28,
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    title: 'How Machine Learning is Improving Patient Outcomes',
    excerpt: 'Learn about the latest research showing significant improvements in patient care through machine learning algorithms.',
    status: 'published',
    date: 'May 10, 2025',
    author: 'Dr. Michael Chen',
    category: 'Research',
    views: 892,
    likes: 98,
    comments: 8,
    shares: 15,
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    title: 'Ethical Considerations in Clinical AI Implementation',
    excerpt: 'A deep dive into the ethical frameworks guiding responsible AI deployment in healthcare settings.',
    status: 'draft',
    date: 'May 5, 2025',
    author: 'Dr. Emily Rodriguez',
    category: 'Ethics',
    views: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    image: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '4',
    title: 'The Role of AI in Personalized Medicine',
    excerpt: 'How artificial intelligence is enabling truly personalized treatment plans based on individual patient data.',
    status: 'published',
    date: 'April 28, 2025',
    author: 'Dr. James Wilson',
    category: 'Treatment',
    views: 1456,
    likes: 134,
    comments: 22,
    shares: 31,
    image: 'https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const AdminBlogManagePage = () => {
  const [posts, setPosts] = useState(mockBlogPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState([]);

  // Filter posts 
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectPost = (postId) => {
    setSelectedPosts(prev =>
      prev.includes(postId)
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredPosts.length) {
      setSelectedPosts([]);
    } else {
      setSelectedPosts(filteredPosts.map(post => post.id));
    }
  };

  const handleDeletePost = (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setPosts(prev => prev.filter(post => post.id !== postId));
      setSelectedPosts(prev => prev.filter(id => id !== postId));
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedPosts.length} selected posts?`)) {
      setPosts(prev => prev.filter(post => !selectedPosts.includes(post.id)));
      setSelectedPosts([]);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Published</span>;
      case 'draft':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Draft</span>;
      case 'archived':
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Archived</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Blog Management</h1>
            <p className="text-gray-600">Manage your blog posts, drafts, and content</p>
          </div>
          <Link
            to="/admin/blog/new"
            className="btn-primary flex items-center space-x-2 mt-4 md:mt-0"
          >
            <Plus size={18} />
            <span>Create New Post</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Posts', value: posts.length, color: 'primary' },
            { label: 'Published', value: posts.filter(p => p.status === 'published').length, color: 'green' },
            { label: 'Drafts', value: posts.filter(p => p.status === 'draft').length, color: 'yellow' },
            { label: 'Total Views', value: posts.reduce((sum, p) => sum + p.views, 0).toLocaleString(), color: 'blue' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg p-6 shadow-sm"
            >
              <h3 className="text-sm font-medium text-gray-500 mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search posts by title or author..."
                  className="input-field pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                className="input-field"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              {selectedPosts.length > 0 && (
                <button
                  onClick={handleBulkDelete}
                  className="btn bg-red-600 text-white hover:bg-red-700 flex items-center space-x-2"
                >
                  <Trash2 size={16} />
                  <span>Delete ({selectedPosts.length})</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Posts Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Post
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPosts.includes(post.id)}
                        onChange={() => handleSelectPost(post.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-1">
                            {post.excerpt}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(post.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {post.author}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Eye size={14} className="mr-1" />
                          {post.views}
                        </div>
                        <div className="flex items-center">
                          <Heart size={14} className="mr-1" />
                          {post.likes}
                        </div>
                        <div className="flex items-center">
                          <MessageCircle size={14} className="mr-1" />
                          {post.comments}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {post.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/blog/${post.id}`}
                          className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                          title="View Post"
                        >
                          <Eye size={16} />
                        </Link>
                        <Link
                          to={`/admin/blog/edit/${post.id}`}
                          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          title="Edit Post"
                        >
                          <Edit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Delete Post"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || statusFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Get started by creating your first blog post'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Link to="/admin/blog/new" className="btn-primary">
                  Create Your First Post
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogManagePage;