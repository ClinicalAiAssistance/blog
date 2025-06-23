import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Save, Eye, ArrowLeft, X, Plus, UploadCloud
} from 'lucide-react';

const mockBlogPost = {
    id: '1',
    title: 'AI in Medical Diagnostics: The Future is Now',
    slug: 'ai-in-medical-diagnostics-the-future-is-now',
    excerpt: 'Explore how artificial intelligence is revolutionizing diagnostic procedures across medical specialties.',
    content: `Artificial intelligence is rapidly transforming the landscape of medical diagnostics, offering unprecedented opportunities to improve accuracy, efficiency, and patient outcomes.

## Current Applications

Today, AI systems are already being deployed in various diagnostic settings, with particularly promising results in radiology, pathology, and dermatology.

- **Improved Accuracy**: AI systems can reduce diagnostic errors.
- **Enhanced Efficiency**: Automated analysis reduces time requirements.
- **Increased Accessibility**: AI brings sophisticated capabilities to underserved areas.

## Challenges and Considerations

Despite its promise, the integration of AI into clinical diagnostics faces several challenges including data privacy concerns and regulatory hurdles.`,
    status: 'published',
    date: '2025-05-15',
    author: 'Dr. Sarah Johnson',
    category: 'Diagnostics',
    tags: ['AI', 'Diagnostics', 'Innovation'],
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    readTime: '8 min read'
};

const categories = ['Diagnostics', 'Research', 'Ethics', 'Treatment', 'Implementation', 'Innovation', 'Telemedicine'];

const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') 
        .trim()
        .replace(/\s+/g, '-'); 
};


const EditorHeader = ({ isEditing, navigate, showPreview, setShowPreview, handleSave, isSaving }) => (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-4">
            <button
                onClick={() => navigate('/admin/blog/manage')}
                className="p-2 text-gray-600 transition-colors rounded-full hover:bg-gray-200 hover:text-primary-600"
            >
                <ArrowLeft size={20} />
            </button>
            <div>
                <h1 className="text-2xl font-bold md:text-3xl">
                    {isEditing ? 'Edit Post' : 'Create New Post'}
                </h1>
                <p className="text-gray-600">
                    {isEditing ? 'Update your blog post' : 'Write and publish a new blog post'}
                </p>
            </div>
        </div>
        <div className="flex items-center flex-wrap gap-3">
            <button onClick={() => setShowPreview(!showPreview)} className="btn-outline flex items-center space-x-2">
                <Eye size={16} />
                <span>{showPreview ? 'Edit' : 'Preview'}</span>
            </button>
            <button onClick={() => handleSave('draft')} disabled={isSaving} className="btn bg-gray-600 text-white hover:bg-gray-700 flex items-center space-x-2">
                <Save size={16} />
                <span>Save Draft</span>
            </button>
            <button onClick={() => handleSave('published')} disabled={isSaving} className="btn-primary flex items-center space-x-2">
                <UploadCloud size={16} />
                <span>{isSaving ? 'Publishing...' : 'Publish'}</span>
            </button>
        </div>
    </div>
);


const ImageUploader = ({ image, setImage }) => {
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(URL.createObjectURL(file));
        }
    };

    const handlePaste = (e) => {
        const items = e.clipboardData.items;
        for (const item of items) {
            if (item.type.indexOf('image') !== -1) {
                const blob = item.getAsFile();
                setImage(URL.createObjectURL(blob));
                e.preventDefault();
                break;
            }
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
            {image ? (
                <div className="relative">
                    <img src={image} alt="Featured" className="w-full h-48 object-cover rounded-lg" />
                    <button onClick={() => setImage('')} className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                        <X size={16} />
                    </button>
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100" onPaste={handlePaste}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-center text-gray-500">
                                <span className="font-semibold">Click to upload</span>, drag & drop, or paste image
                            </p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                    </label>
                </div>
            )}
        </div>
    );
};


const MainContentEditor = ({ formData, handleInputChange, setFormData }) => (
    <div className="space-y-6">
        {/* Title */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter your post title..." className="input-field text-xl font-semibold" />
            </div>
        </motion.div>

        {/* Excerpt */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} placeholder="Write a brief excerpt for SEO and previews..." rows={3} className="input-field" />
            </div>
        </motion.div>

        {/* Featured Image */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <ImageUploader image={formData.image} setImage={(img) => setFormData(prev => ({...prev, image: img}))} />
        </motion.div>


        {/* Content Editor */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <label className="block text-sm font-medium text-gray-700 mb-2">Content (Markdown Supported)</label>
                <textarea name="content" value={formData.content} onChange={handleInputChange} placeholder="Write your post content using Markdown..." rows={20} className="input-field font-mono text-sm" />
                <p className="text-xs text-gray-500 mt-2">Estimated read time: {formData.readTime}</p>
            </div>
        </motion.div>
    </div>
);

// Component: ContentPreview
const ContentPreview = ({ formData }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg p-6 md:p-8 shadow-sm"
    >
        {formData.image && (
            <img src={formData.image} alt={formData.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-8" />
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{formData.title || 'Untitled Post'}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-gray-600 mb-6">
            <span>{new Date(formData.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="text-gray-300">•</span>
            <span>{formData.author}</span>
            <span className="text-gray-300">•</span>
            <span>{formData.readTime}</span>
        </div>
        {formData.excerpt && (
            <p className="text-lg text-gray-700 mb-8 p-4 bg-gray-50 rounded-md border-l-4 border-primary-500">{formData.excerpt}</p>
        )}
        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary-600 hover:prose-a:text-primary-700">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{formData.content}</ReactMarkdown>
        </div>
    </motion.div>
);


// Component: SEOPreviewCard
const SEOPreviewCard = ({ title, slug, excerpt }) => (
     <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">SEO Preview</h3>
        <div className="border rounded-lg p-4 bg-gray-50">
            <h4 className="text-blue-700 text-lg font-medium line-clamp-1 truncate">
                {title || 'Untitled Post'}
            </h4>
            <p className="text-green-700 text-sm mb-2 truncate">
                clinicalai.com/blog/{slug || 'new-post'}
            </p>
            <p className="text-gray-600 text-sm line-clamp-2">
                {excerpt || 'No excerpt provided...'}
            </p>
        </div>
    </div>
);

// Component: Sidebar
const Sidebar = ({ formData, handleInputChange, newTag, setNewTag, handleAddTag, handleRemoveTag }) => (
    <div className="space-y-6">
        {/* Post Settings */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Post Settings</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                        <select name="status" value={formData.status} onChange={handleInputChange} className="input-field">
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                            <option value="archived">Archived</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                        <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="input-field"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleInputChange} className="input-field">
                            <option value="">Select Category</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>
            </div>
        </motion.div>

        {/* Tags */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Tags</h3>
                <div className="space-y-3">
                    <div className="flex space-x-2">
                        <input type="text" value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())} placeholder="Add a tag..." className="input-field flex-1" />
                        <button onClick={handleAddTag} className="btn-primary p-2.5">
                            <Plus size={16} />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                        <AnimatePresence>
                            {formData.tags.map((tag) => (
                                <motion.span key={tag} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }} className="inline-flex items-center px-3 py-1 bg-primary-100 text-primary-800 text-sm font-medium rounded-full">
                                    {tag}
                                    <button onClick={() => handleRemoveTag(tag)} className="ml-2 text-primary-600 hover:text-primary-800">
                                        <X size={14} />
                                    </button>
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
        
        {/* SEO Preview */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7 }}>
           <SEOPreviewCard title={formData.title} slug={formData.slug} excerpt={formData.excerpt} />
        </motion.div>
    </div>
);



const AdminBlogEditorPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = id !== 'new';

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        status: 'draft',
        date: new Date().toISOString().split('T')[0],
        author: 'Dr. Sarah Johnson',
        category: '',
        tags: [],
        image: '',
        readTime: '0 min read'
    });

    const [newTag, setNewTag] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        if (isEditing && id) {
            // In a real app, fetch post by id from an API
            console.log(`Fetching data for post ${id}...`);
            setFormData({
                title: mockBlogPost.title,
                slug: mockBlogPost.slug,
                excerpt: mockBlogPost.excerpt,
                content: mockBlogPost.content,
                status: mockBlogPost.status,
                date: mockBlogPost.date,
                author: mockBlogPost.author,
                category: mockBlogPost.category,
                tags: mockBlogPost.tags,
                image: mockBlogPost.image,
                readTime: mockBlogPost.readTime,
            });
        }
    }, [isEditing, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Auto-update slug and read time
    useEffect(() => {
        const estimateReadTime = (content) => {
            const wordsPerMinute = 200;
            const wordCount = content.trim().split(/\s+/).length;
            const minutes = Math.ceil(wordCount / wordsPerMinute);
            return `${minutes} min read`;
        };

        setFormData(prev => ({
            ...prev,
            slug: generateSlug(prev.title),
            readTime: estimateReadTime(prev.content)
        }));
    }, [formData.title, formData.content]);

    const handleAddTag = () => {
        const trimmedTag = newTag.trim();
        if (trimmedTag && !formData.tags.includes(trimmedTag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, trimmedTag]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSave = async (status) => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const postData = {
            ...formData,
            status,
            id: isEditing ? id : Date.now().toString()
        };
        console.log('Saving post:', postData);
        setIsSaving(false);
        navigate('/admin/blog/manage');
    };

    return (
        <div className="pt-24 pb-20 bg-gray-50 min-h-screen">
            <div className="container-custom max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <EditorHeader 
                    isEditing={isEditing}
                    navigate={navigate}
                    showPreview={showPreview}
                    setShowPreview={setShowPreview}
                    handleSave={handleSave}
                    isSaving={isSaving}
                />

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <AnimatePresence mode="wait">
                            {showPreview ? (
                                <ContentPreview key="preview" formData={formData} />
                            ) : (
                                <MainContentEditor 
                                    key="editor"
                                    formData={formData} 
                                    handleInputChange={handleInputChange} 
                                    setFormData={setFormData}
                                />
                            )}
                        </AnimatePresence>
                    </div>

                    <Sidebar 
                        formData={formData}
                        handleInputChange={handleInputChange}
                        newTag={newTag}
                        setNewTag={setNewTag}
                        handleAddTag={handleAddTag}
                        handleRemoveTag={handleRemoveTag}
                    />
                </div>
            </div>
        </div>
    );
};

export default AdminBlogEditorPage;