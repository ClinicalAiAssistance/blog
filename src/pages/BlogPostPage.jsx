import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, ChevronRight, Heart, Share2, MessageCircle, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: '1',
    title: 'AI in Medical Diagnostics: The Future is Now',
    excerpt: 'Explore how artificial intelligence is revolutionizing diagnostic procedures across medical specialties.',
    content: `
      <p>Artificial intelligence is rapidly transforming the landscape of medical diagnostics, offering unprecedented opportunities to improve accuracy, efficiency, and patient outcomes. As we stand at the threshold of this technological revolution, it's crucial to understand both the current applications and future potential of AI in diagnostic medicine.</p>
      
      <h2>Current Applications</h2>
      
      <p>Today, AI systems are already being deployed in various diagnostic settings, with particularly promising results in radiology, pathology, and dermatology. Deep learning algorithms can analyze medical images with remarkable precision, often matching or exceeding the performance of experienced human clinicians.</p>
      
      <p>In radiology, AI systems can detect subtle abnormalities in X-rays, CT scans, and MRIs that might be missed by the human eye. Similarly, in pathology, machine learning algorithms can identify cancer cells in tissue samples with high accuracy. Dermatological AI applications can classify skin lesions and flag potential melanomas based on smartphone photos.</p>
      
      <h2>Benefits of AI Diagnostics</h2>
      
      <ul>
        <li><strong>Improved Accuracy:</strong> AI systems can reduce diagnostic errors and improve detection rates for various conditions.</li>
        <li><strong>Enhanced Efficiency:</strong> Automated analysis can reduce the time required for diagnostic procedures, allowing clinicians to see more patients.</li>
        <li><strong>Increased Accessibility:</strong> AI-powered tools can bring sophisticated diagnostic capabilities to underserved areas with limited access to specialists.</li>
        <li><strong>Early Detection:</strong> Machine learning algorithms can identify subtle patterns indicative of disease at earlier stages than conventional methods.</li>
      </ul>
      
      <h2>Challenges and Considerations</h2>
      
      <p>Despite its promise, the integration of AI into clinical diagnostics faces several challenges. Data privacy concerns, regulatory hurdles, and questions about liability when errors occur all need to be addressed. Additionally, there's the risk of algorithm bias if training data doesn't adequately represent diverse patient populations.</p>
      
      <p>Healthcare providers must also navigate the learning curve associated with implementing new technologies and ensure that AI tools integrate seamlessly with existing workflows and systems.</p>
      
      <h2>The Future Landscape</h2>
      
      <p>Looking ahead, we can expect AI diagnostic tools to become increasingly sophisticated and widely adopted. The next generation of AI systems will likely feature:</p>
      
      <ul>
        <li>Multimodal analysis capabilities, integrating data from various sources (imaging, lab tests, genomics, etc.)</li>
        <li>Explainable AI that can communicate its reasoning process to clinicians</li>
        <li>Continuous learning systems that improve with each patient interaction</li>
        <li>Predictive analytics that can forecast disease progression and treatment responses</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>The integration of AI into medical diagnostics represents one of the most promising developments in modern healthcare. While challenges remain, the potential benefits in terms of improved accuracy, efficiency, and patient outcomes are immense. As we continue to refine these technologies and address the associated ethical and practical considerations, AI is poised to become an invaluable partner in clinical diagnosis across medical specialties.</p>
    `,
    date: 'May 15, 2025',
    author: 'Dr. Sarah Johnson',
    authorBio: 'Dr. Sarah Johnson is the Chief of Radiology at Memorial Hospital with over 15 years of experience in medical imaging and AI integration in healthcare.',
    image: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Diagnostics',
    relatedPosts: ['2', '3', '6'],
    likes: 142,
    shares: 28,
    comments: 15,
    readTime: '8 min read'
  },
  {
    id: '2',
    title: 'How Machine Learning is Improving Patient Outcomes',
    excerpt: 'Learn about the latest research showing significant improvements in patient care through machine learning algorithms.',
    content: `
      <p>Machine learning (ML), a subset of artificial intelligence, is no longer a futuristic concept in healthcare—it's a present-day reality that is actively improving patient outcomes. By analyzing vast datasets, ML models can identify patterns that are imperceptible to humans, leading to more accurate diagnoses, personalized treatments, and proactive interventions.</p>

      <h2>Predictive Analytics in Action</h2>
      <p>One of the most powerful applications of ML is in predictive analytics. Algorithms can now forecast the likelihood of disease onset or progression with remarkable accuracy. For example, in cardiology, ML models analyze patient data from electronic health records (EHRs) to predict the risk of heart failure, allowing clinicians to intervene earlier with preventative care.</p>
      <p>Similarly, in oncology, predictive models help identify patients who are most likely to respond to a particular chemotherapy regimen, sparing others from ineffective treatments and their associated side effects.</p>

      <h2>Optimizing Clinical Workflows</h2>
      <p>Beyond direct patient care, machine learning is streamlining hospital operations, which indirectly improves outcomes. ML-powered systems can predict patient admission rates, optimize operating room scheduling, and automate administrative tasks. This frees up valuable time for clinicians, reducing burnout and allowing them to focus more on complex patient needs.</p>
      <ul>
        <li><strong>Reduced Readmissions:</strong> ML models can identify patients at high risk of hospital readmission, enabling care teams to provide targeted post-discharge support.</li>
        <li><strong>Sepsis Detection:</strong> Hospitals are using real-time ML alerts to detect early signs of sepsis, a life-threatening condition, leading to faster treatment and lower mortality rates.</li>
        <li><strong>Resource Allocation:</strong> Predictive staffing models ensure that hospitals have the right number of nurses and doctors on hand to meet patient demand.</li>
      </ul>

      <h2>The Path Forward</h2>
      <p>The successful integration of machine learning into clinical practice hinges on high-quality data, robust model validation, and seamless integration with EHR systems. As these technologies mature, they promise to create a healthcare ecosystem that is not only more efficient but also more effective, delivering a higher standard of care for every patient.</p>
    `,
    date: 'May 10, 2025',
    dateSort: '2025-05-10',
    author: 'Dr. Michael Chen',
    authorBio: 'Dr. Michael Chen is a computational biologist and a senior researcher at the Institute for Health Informatics. His work focuses on applying machine learning models to predict disease progression and patient response to therapies.',
    image: 'https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Research',
    readTime: '7 min read',
    likes: 98,
    shares: 15,
    comments: 11,
    relatedPosts: ['1', '4', '7']
  },
  {
    id: '3',
    title: 'Ethical Considerations in Clinical AI Implementation',
    excerpt: 'A deep dive into the ethical frameworks guiding responsible AI deployment in healthcare settings.',
    content: `
      <p>The rapid adoption of Artificial Intelligence in healthcare brings a wave of ethical questions that must be carefully considered. While AI has the potential to dramatically improve diagnostics and treatment, its implementation requires a strong ethical framework to protect patients and ensure fairness. This article explores the key ethical pillars for responsible AI in the clinic.</p>

      <h2>Patient Consent and Data Privacy</h2>
      <p>Patient data is the lifeblood of medical AI. This raises critical questions about consent. Is the initial consent for data collection sufficient for its use in training AI models? How do we maintain patient anonymity while using their data? Healthcare organizations must be transparent with patients about how their data is used and adhere strictly to privacy regulations like HIPAA and GDPR, ensuring robust data anonymization and security protocols are in place.</p>

      <h2>Accountability and Liability</h2>
      <p>When an AI system contributes to a diagnostic error, who is responsible? Is it the developer who created the algorithm, the hospital that deployed it, or the clinician who acted on its recommendation? Establishing clear lines of accountability is a complex but necessary task. A 'human-in-the-loop' approach, where AI provides support but the final decision rests with a qualified clinician, is a widely accepted model for mitigating this issue.</p>

      <h2>Ensuring Equity and Avoiding Bias</h2>
      <p>As we've discussed in related articles, algorithmic bias is a major ethical concern. If an AI is trained on data from a specific population, it may perform poorly for underrepresented groups, thereby widening health disparities. Ethical AI implementation demands that algorithms are rigorously tested for bias across diverse demographics before and during clinical deployment.</p>
      <ul>
        <li><strong>Transparency:</strong> Clinicians and patients should have a basic understanding of how an AI tool works—it cannot be a complete "black box."</li>
        <li><strong>Human Oversight:</strong> AI should be a tool to augment, not replace, human clinical judgment.</li>
        <li><strong>Fairness Audits:</strong> Regular audits must be conducted to ensure the AI's performance remains equitable over time.</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Building an ethical AI ecosystem in healthcare is a shared responsibility. It requires collaboration between developers, clinicians, ethicists, and regulators to create a future where technology enhances care without compromising the fundamental principles of medical ethics.</p>
    `,
    date: 'May 5, 2025',
    dateSort: '2025-05-05',
    author: 'Dr. Emily Rodriguez',
    authorBio: 'Dr. Emily Rodriguez is a leading bioethicist specializing in the implications of artificial intelligence in healthcare. She focuses on creating frameworks for responsible AI deployment.',
    image: 'https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Ethics',
    readTime: '10 min read',
    likes: 76,
    shares: 22,
    comments: 25,
    relatedPosts: ['9', '5', '8']
  },
  {
    id: '4',
    title: 'The Role of AI in Personalized Medicine',
    excerpt: 'How artificial intelligence is enabling truly personalized treatment plans based on individual patient data.',
    content: `
      <p>The era of one-size-fits-all medicine is coming to an end. Propelled by advances in genomics and artificial intelligence, personalized medicine is tailoring healthcare to the individual. AI's ability to analyze complex, multi-layered data is the key that unlocks this new frontier, creating bespoke treatment plans that were once the realm of science fiction.</p>

      <h2>From Genomics to Treatment</h2>
      <p>AI algorithms excel at sifting through massive genomic datasets to identify specific mutations or biomarkers linked to disease. In oncology, for example, an AI can analyze a tumor's genetic profile and match it to the most effective targeted therapy or immunotherapy. This field, known as pharmacogenomics, helps predict how a patient's genes will affect their response to drugs, minimizing trial-and-error and improving efficacy.</p>
      
      <h2>Integrating Diverse Data Streams</h2>
      <p>True personalization goes beyond genomics. AI models create a holistic patient profile by integrating data from various sources:</p>
      <ul>
        <li><strong>Electronic Health Records (EHRs):</strong> Patient history, lab results, and clinical notes.</li>
        <li><strong>Wearable Devices:</strong> Real-time data on activity levels, heart rate, and sleep patterns.</li>
        <li><strong>Lifestyle Factors:</strong> Information about diet, environment, and social determinants of health.</li>
      </ul>
      <p>By synthesizing this information, AI can help create treatment plans that are not only clinically effective but also realistic and sustainable for the patient's lifestyle.</p>

      <h2>Predictive Modeling for Proactive Care</h2>
      <p>Personalized medicine is also about prevention. AI can analyze an individual's unique risk factors to predict their likelihood of developing conditions like diabetes or hypertension. This allows for proactive, personalized health coaching and interventions long before the disease manifests, shifting the focus from reactive treatment to preventative wellness.</p>
      
      <h2>Challenges on the Horizon</h2>
      <p>Realizing the full potential of personalized medicine requires overcoming challenges related to data interoperability, patient privacy, and the cost of genomic sequencing. However, as AI technology becomes more powerful and accessible, it is set to become the engine of a more precise, predictive, and personalized approach to healthcare.</p>
    `,
    date: 'April 28, 2025',
    dateSort: '2025-04-28',
    author: 'Dr. James Wilson',
    authorBio: 'Dr. James Wilson is a clinical oncologist and a pioneer in the field of personalized medicine. He leads a research group dedicated to using genomic data and AI to develop targeted cancer therapies.',
    image: 'https://images.pexels.com/photos/5726706/pexels-photo-5726706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Treatment',
    readTime: '8 min read',
    likes: 134,
    shares: 31,
    comments: 19,
    relatedPosts: ['2', '7', '6']
  },
  {
    id: '5',
    title: 'Implementing AI in Small Clinical Practices',
    excerpt: 'Practical guidance for smaller healthcare providers looking to leverage AI technologies.',
    content: `
      <p>Artificial intelligence isn't just for large hospitals and research institutions. A growing number of AI-powered tools are now accessible and affordable for small and medium-sized clinical practices. This guide provides a practical roadmap for implementing AI to enhance efficiency and patient care in a smaller setting.</p>

      <h2>Start with Administrative Tasks</h2>
      <p>The easiest and lowest-risk entry point for AI is in automating administrative workflows. These tools can provide a significant return on investment by freeing up staff time and reducing errors.</p>
      <ul>
        <li><strong>Automated Scheduling:</strong> AI-powered systems can manage appointments, send reminders, and fill cancellations automatically.</li>
        <li><strong>Medical Scribing:</strong> Voice-recognition AI can transcribe patient encounters in real-time, reducing the documentation burden on clinicians.</li>
        <li><strong>Billing and Coding:</strong> AI tools can analyze clinical notes to suggest accurate medical codes, speeding up the billing cycle and reducing claim denials.</li>
      </ul>

      <h2>Choosing the Right Clinical Tools</h2>
      <p>When you're ready to adopt clinical AI, focus on tools that integrate with your existing Electronic Health Record (EHR) system. Look for cloud-based (SaaS) solutions that require minimal upfront investment and IT overhead.</p>
      <p>A good starting point is a diagnostic support tool for a common specialty in your practice, such as an AI-powered ECG analysis tool for a cardiology practice or a dermatology app that helps identify suspicious lesions.</p>
      
      <h2>Key Implementation Steps</h2>
      <ol>
        <li><strong>Identify a Need:</strong> Pinpoint a specific problem in your practice that AI could solve, such as long patient wait times or a high rate of missed appointments.</li>
        <li><strong>Do Your Research:</strong> Vet vendors carefully. Look for case studies from practices similar to yours and ensure the tool is compliant with healthcare regulations.</li>
        <li><strong>Train Your Team:</strong> Successful adoption depends on your staff. Provide thorough training and clearly communicate how the new tool will benefit them and your patients.</li>
        <li><strong>Start Small and Measure:</strong> Roll out one AI tool at a time. Define key performance indicators (KPIs) to measure its impact, such as time saved or improved diagnostic accuracy.</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>For small practices, the strategic adoption of AI can level the playing field, enabling them to offer a more efficient and data-driven standard of care. By starting with clear needs and practical solutions, any clinic can begin to harness the power of artificial intelligence.</p>
    `,
    date: 'April 20, 2025',
    dateSort: '2025-04-20',
    author: 'Dr. Lisa Thompson',
    authorBio: 'Dr. Lisa Thompson is a primary care physician and a healthcare technology consultant. She has over 20 years of experience in running a private practice and helps small clinics adopt digital tools to improve efficiency and patient care.',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    category: 'Implementation',
    readTime: '6 min read',
    likes: 89,
    shares: 18,
    comments: 14,
    relatedPosts: ['8', '3', '2']
  }
];

const mockComments = [
  {
    id: '1',
    author: 'Dr. Michael Thompson',
    avatar: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'Excellent article! The insights on AI diagnostic accuracy are particularly compelling. We\'ve been implementing similar systems at our hospital with great success.',
    date: 'May 16, 2025',
    likes: 8
  },
  {
    id: '2',
    author: 'Dr. Lisa Chen',
    avatar: 'https://images.pexels.com/photos/5214961/pexels-photo-5214961.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'The ethical considerations section raises important points. How do we ensure AI systems remain unbiased across different patient populations?',
    date: 'May 16, 2025',
    likes: 12
  },
  {
    id: '3',
    author: 'Dr. James Rodriguez',
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'Great overview of the current state of AI in diagnostics. Looking forward to seeing how explainable AI develops in this space.',
    date: 'May 17, 2025',
    likes: 5
  }
];

const BlogPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(mockComments);
  
  const post = blogPosts.find(post => post.id === id);
  
  // Initialize like count
  useEffect(() => {
    if (post) {
      setLikeCount(post.likes);
    }
  }, [post]);
  
  // If no post is found, show a message
  if (!post) {
    return (
      <div className="pt-32 pb-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
        <p className="mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/blog" className="btn-primary">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Get related posts
  const relatedPosts = post.relatedPosts
    .map(relatedId => blogPosts.find(p => p.id === relatedId))
    .filter(Boolean);

  // Handle like functionality
  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  // Handle share functionality
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        break;
      default: // Added default case to handle unexpected platform values
        console.warn('Attempted to share to an unknown platform:', platform);
        break;
    }
    setShowShareMenu(false);
  };

  // Handle comment submission
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment = {
        id: Date.now().toString(),
        author: 'Anonymous User', // Consider adding a way for users to input their name
        avatar: 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=100',
        content: newComment,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        likes: 0
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="pt-24 pb-20 bg-gray-50">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </button>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <img 
            src={post.image}
            alt={post.title}
            className="w-full h-80 object-cover rounded-xl mb-8"
          />
          
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-sm font-medium px-3 py-1 bg-primary-100 text-primary-700 rounded-full">
              {post.category}
            </span>
            
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 gap-4 mb-6">
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center">
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Engagement Bar */}
          <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm mb-8">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 transition-colors ${
                  isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <Heart size={20} className={isLiked ? 'fill-current' : ''} />
                <span>{likeCount}</span>
              </button>
              
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors"
                >
                  <Share2 size={20} />
                  <span>{post.shares}</span>
                </button>
                
                {showShareMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border p-2 z-10">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                        title="Share on Facebook"
                      >
                        <Facebook size={18} />
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="p-2 text-blue-400 hover:bg-blue-50 rounded"
                        title="Share on Twitter"
                      >
                        <Twitter size={18} />
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="p-2 text-blue-700 hover:bg-blue-50 rounded"
                        title="Share on LinkedIn"
                      >
                        <Linkedin size={18} />
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="p-2 text-gray-600 hover:bg-gray-50 rounded"
                        title="Copy link"
                      >
                        {copySuccess ? <Check size={18} className="text-green-600" /> : <Copy size={18} />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-gray-600">
                <MessageCircle size={20} />
                <span>{comments.length}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-12"
        >
          <div 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </motion.div>

        {/* Author Bio */}
        <div className="bg-gray-100 rounded-xl p-6 mb-12">
          <h3 className="text-xl font-semibold mb-2">About the Author</h3>
          <p className="text-gray-700">{post.authorBio}</p>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-12">
          <h3 className="text-2xl font-bold mb-6">Comments ({comments.length})</h3>
          
          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this article..."
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              rows={4}
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="btn-primary"
                disabled={!newComment.trim()}
              >
                Post Comment
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-4">
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                      <span className="text-sm text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <div className="mt-2 flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600">
                      <Heart size={14} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="text-sm text-gray-500 hover:text-primary-600">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                relatedPost && (
                  <motion.div
                    key={relatedPost.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="card overflow-hidden"
                  >
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold mb-2 line-clamp-2">
                        <Link to={`/blog/${relatedPost.id}`} className="hover:text-primary-600">
                          {relatedPost.title}
                        </Link>
                      </h4>
                      <Link
                        to={`/blog/${relatedPost.id}`}
                        className="inline-flex items-center text-sm text-primary-600 font-medium hover:text-primary-700"
                      >
                        Read more
                        <ChevronRight size={14} className="ml-1" />
                      </Link>
                    </div>
                  </motion.div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;