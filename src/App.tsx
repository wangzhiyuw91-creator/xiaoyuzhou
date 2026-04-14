import { useState, useMemo, useCallback, MouseEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  ExternalLink, 
  Sparkles, 
  Compass, 
  ArrowUpRight, 
  Share2, 
  Check, 
  ArrowUpDown, 
  TrendingUp,
  Settings2,
  Plus,
  Trash2,
  X,
  Palette,
  LayoutGrid,
  Type
} from 'lucide-react';
import { categories as initialCategories, aiModels as initialModels, AIModel } from './data/models';

type ThemeConfig = {
  accentColor: string;
  backgroundStyle: 'mesh' | 'solid' | 'gradient';
  cardStyle: 'glass' | 'bordered' | 'flat';
};

export default function App() {
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortByPopularity, setSortByPopularity] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Custom Data & Theme
  const [customModels, setCustomModels] = useState<AIModel[]>([]);
  const [theme, setTheme] = useState<ThemeConfig>({
    accentColor: '#3b82f6',
    backgroundStyle: 'mesh',
    cardStyle: 'glass'
  });

  // Load from LocalStorage
  useEffect(() => {
    const savedModels = localStorage.getItem('ai-navigator-models');
    if (savedModels) setCustomModels(JSON.parse(savedModels));
    
    const savedTheme = localStorage.getItem('ai-navigator-theme');
    if (savedTheme) setTheme(JSON.parse(savedTheme));
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('ai-navigator-models', JSON.stringify(customModels));
  }, [customModels]);

  useEffect(() => {
    localStorage.setItem('ai-navigator-theme', JSON.stringify(theme));
    document.documentElement.style.setProperty('--color-accent', theme.accentColor);
  }, [theme]);

  const allModels = useMemo(() => [...initialModels, ...customModels], [customModels]);

  const handleShare = useCallback((e: MouseEvent, id: string, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  const handleDeleteModel = (id: string) => {
    setCustomModels(prev => prev.filter(m => m.id !== id));
  };

  const filteredModels = useMemo(() => {
    let result = allModels.filter((model) => {
      const matchesSearch = 
        model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === 'all' || model.categoryId === activeCategory;

      return matchesSearch && matchesCategory;
    });

    if (sortByPopularity) {
      result = [...result].sort((a, b) => {
        if (a.isPopular && !b.isPopular) return -1;
        if (!a.isPopular && b.isPopular) return 1;
        return 0;
      });
    }

    return result;
  }, [allModels, searchQuery, activeCategory, sortByPopularity]);

  return (
    <div className={`min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 transition-colors duration-500`}>
      {/* Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {theme.backgroundStyle === 'mesh' && (
          <>
            <motion.div 
              animate={{ 
                x: [0, 100, 0], 
                y: [0, 50, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full opacity-20 blur-[120px]" 
              style={{ backgroundColor: theme.accentColor }}
            />
            <motion.div 
              animate={{ 
                x: [0, -80, 0], 
                y: [0, 100, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[120px]" 
            />
          </>
        )}
        {theme.backgroundStyle === 'gradient' && (
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent" />
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Header / Hero - Simplified */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="text-left space-y-2">
            <div className="flex items-center gap-3">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-4xl md:text-5xl font-display font-bold tracking-tight"
              >
                AI Navigator
              </motion.h1>
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 rounded-full hover:bg-white/5 transition-colors text-gray-500 hover:text-white"
              >
                <Settings2 className="w-5 h-5" />
              </button>
            </div>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 font-light"
            >
              The simplest portal to the AI world.
            </motion.p>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex-grow md:max-w-md relative group"
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
            
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="p-3 rounded-xl bg-white text-black hover:bg-gray-200 transition-colors shadow-lg shadow-white/10"
              title="Add Custom Model"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Categories & Sorting */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                activeCategory === 'all' 
                  ? 'bg-white text-black' 
                  : 'bg-[#111] text-gray-400 hover:bg-[#1a1a1a] hover:text-white border border-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              All
            </button>
            
            {initialCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive 
                      ? 'bg-white text-black' 
                      : 'bg-[#111] text-gray-400 hover:bg-[#1a1a1a] hover:text-white border border-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {category.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setSortByPopularity(!sortByPopularity)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 border ${
                sortByPopularity 
                  ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' 
                  : 'bg-[#111] text-gray-400 border-white/5 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              {sortByPopularity ? 'Popular First' : 'Default Sort'}
            </button>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredModels.map((model, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={model.id}
                className={`group rounded-3xl p-6 flex flex-col h-full relative overflow-hidden cursor-default transition-all duration-500 ${
                  theme.cardStyle === 'glass' ? 'glass-card' : 
                  theme.cardStyle === 'bordered' ? 'bg-[#0a0a0a] border border-white/10 hover:border-white/30' : 
                  'bg-[#111] hover:bg-[#161616]'
                }`}
              >
                {/* Main Link Area */}
                <a 
                  href={model.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-0"
                  aria-label={`Visit ${model.name}`}
                />

                {/* Hover Gradient Effect */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" 
                  style={{ background: `radial-gradient(circle at top right, ${theme.accentColor}, transparent 70%)` }}
                />
                
                <div className="flex justify-between items-start mb-4 relative z-10 pointer-events-none">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#222] border border-white/10 flex items-center justify-center text-xl font-display font-bold text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {model.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-display font-semibold text-white group-hover:text-blue-400 transition-colors" style={{ color: 'inherit' }}>
                        {model.name}
                      </h3>
                      {model.isPopular && (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 pointer-events-auto">
                    {customModels.some(m => m.id === model.id) && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteModel(model.id);
                        }}
                        className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center hover:bg-red-500/20 transition-all text-red-400"
                        title="Delete custom model"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={(e) => handleShare(e, model.id, model.url)}
                      className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90 relative group/share"
                      title="Copy link"
                    >
                      {copiedId === model.id ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Share2 className="w-4 h-4 text-gray-400 group-hover/share:text-white transition-colors" />
                      )}
                      
                      <AnimatePresence>
                        {copiedId === model.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.8 }}
                            animate={{ opacity: 1, y: -30, scale: 1 }}
                            exit={{ opacity: 0, y: 0, scale: 0.8 }}
                            className="absolute whitespace-nowrap bg-white text-black text-[10px] font-bold px-2 py-1 rounded shadow-lg pointer-events-none"
                          >
                            COPIED!
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow relative z-10 pointer-events-none">
                  {model.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto relative z-10 pointer-events-none">
                  {model.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredModels.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#111] mb-4">
              <Search className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-display font-medium text-white mb-2">No models found</h3>
            <p className="text-gray-400">Try adjusting your search or category filter.</p>
          </motion.div>
        )}

        <footer className="mt-24 pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>AI Navigator &copy; {new Date().getFullYear()}. Built with React & Tailwind CSS.</p>
        </footer>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {isSettingsOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSettingsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#0a0a0a] border-l border-white/10 z-[101] p-8 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display font-bold flex items-center gap-2">
                  <Palette className="w-6 h-6 text-blue-400" />
                  UI Customizer
                </h2>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Accent Color */}
                <section className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Accent Color
                  </h3>
                  <div className="grid grid-cols-5 gap-3">
                    {['#3b82f6', '#8b5cf6', '#ec4899', '#f97316', '#10b981'].map(color => (
                      <button
                        key={color}
                        onClick={() => setTheme(prev => ({ ...prev, accentColor: color }))}
                        className={`w-full aspect-square rounded-xl border-2 transition-all ${
                          theme.accentColor === color ? 'border-white scale-110' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </section>

                {/* Background Style */}
                <section className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Compass className="w-4 h-4" />
                    Background Style
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(['mesh', 'solid', 'gradient'] as const).map(style => (
                      <button
                        key={style}
                        onClick={() => setTheme(prev => ({ ...prev, backgroundStyle: style }))}
                        className={`px-4 py-3 rounded-xl border text-xs font-medium capitalize transition-all ${
                          theme.backgroundStyle === style 
                            ? 'bg-white text-black border-white' 
                            : 'bg-[#111] text-gray-400 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </section>

                {/* Card Style */}
                <section className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    Card Style
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {(['glass', 'bordered', 'flat'] as const).map(style => (
                      <button
                        key={style}
                        onClick={() => setTheme(prev => ({ ...prev, cardStyle: style }))}
                        className={`px-4 py-3 rounded-xl border text-xs font-medium capitalize transition-all ${
                          theme.cardStyle === style 
                            ? 'bg-white text-black border-white' 
                            : 'bg-[#111] text-gray-400 border-white/5 hover:border-white/20'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </section>

                <div className="pt-8 border-t border-white/10">
                  <button 
                    onClick={() => {
                      setTheme({
                        accentColor: '#3b82f6',
                        backgroundStyle: 'mesh',
                        cardStyle: 'glass'
                      });
                      setCustomModels([]);
                      localStorage.clear();
                    }}
                    className="w-full py-3 rounded-xl border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
                  >
                    Reset to Default
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Model Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-display font-bold">Add Custom AI</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 rounded-full hover:bg-white/5">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const newModel: AIModel = {
                    id: Math.random().toString(36).substr(2, 9),
                    name: formData.get('name') as string,
                    description: formData.get('description') as string,
                    url: formData.get('url') as string,
                    categoryId: formData.get('category') as string,
                    tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
                    isPopular: false
                  };
                  setCustomModels(prev => [...prev, newModel]);
                  setIsAddModalOpen(false);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                  <input name="name" required className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="e.g. My Custom AI" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">URL</label>
                  <input name="url" type="url" required className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="https://..." />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Category</label>
                  <select name="category" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none">
                    {initialCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                  <textarea name="description" required className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none h-24" placeholder="What does it do?" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-500 uppercase">Tags (comma separated)</label>
                  <input name="tags" className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-blue-500 outline-none" placeholder="AI, Tool, Free" />
                </div>
                <button type="submit" className="w-full py-4 bg-white text-black rounded-xl font-bold mt-4 hover:bg-gray-200 transition-colors">
                  Add to Navigator
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

