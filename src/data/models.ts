import { 
  MessageSquare, 
  Image as ImageIcon, 
  Video, 
  Music, 
  Code, 
  Search,
  Bot,
  Sparkles
} from 'lucide-react';

export type Category = {
  id: string;
  name: string;
  icon: any;
  description: string;
};

export type AIModel = {
  id: string;
  name: string;
  description: string;
  url: string;
  categoryId: string;
  tags: string[];
  isPopular?: boolean;
  logoUrl?: string; // Optional, we can use a fallback or initials if not provided
};

export const categories: Category[] = [
  { id: 'chat', name: 'Chat & Reasoning', icon: MessageSquare, description: 'Conversational AI and complex reasoning' },
  { id: 'image', name: 'Image Generation', icon: ImageIcon, description: 'Create and edit images from text' },
  { id: 'video', name: 'Video Generation', icon: Video, description: 'Generate and edit video content' },
  { id: 'audio', name: 'Audio & Podcast', icon: Music, description: 'Voice, music and podcast platforms' },
  { id: 'code', name: 'Coding & Dev', icon: Code, description: 'Programming assistants and tools' },
  { id: 'search', name: 'Search & Research', icon: Search, description: 'AI-powered search engines' },
];

export const aiModels: AIModel[] = [
  // Chat & Reasoning
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    description: 'OpenAI\'s flagship conversational model, featuring GPT-4o.',
    url: 'https://chatgpt.com',
    categoryId: 'chat',
    tags: ['OpenAI', 'GPT-4o', 'Multimodal'],
    isPopular: true,
  },
  {
    id: 'claude',
    name: 'Claude',
    description: 'Anthropic\'s AI assistant, known for large context windows and nuanced reasoning.',
    url: 'https://claude.ai',
    categoryId: 'chat',
    tags: ['Anthropic', 'Claude 3.5 Sonnet', 'Coding'],
    isPopular: true,
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    description: 'Google\'s multimodal AI model integrated with the Google ecosystem.',
    url: 'https://gemini.google.com',
    categoryId: 'chat',
    tags: ['Google', 'Gemini 1.5 Pro', 'Multimodal'],
    isPopular: true,
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    description: 'Powerful open-source and API models with strong coding and reasoning capabilities.',
    url: 'https://chat.deepseek.com',
    categoryId: 'chat',
    tags: ['DeepSeek-V3', 'DeepSeek-R1', 'Open Source'],
    isPopular: true,
  },
  {
    id: 'meta-ai',
    name: 'Meta AI',
    description: 'Meta\'s AI assistant powered by Llama 3.',
    url: 'https://www.meta.ai',
    categoryId: 'chat',
    tags: ['Meta', 'Llama 3', 'Social'],
  },
  {
    id: 'pi',
    name: 'Pi',
    description: 'A supportive and empathetic conversational AI by Inflection.',
    url: 'https://pi.ai',
    categoryId: 'chat',
    tags: ['Inflection', 'Personal Assistant'],
  },

  // Image Generation
  {
    id: 'midjourney',
    name: 'Midjourney',
    description: 'High-quality, artistic AI image generation.',
    url: 'https://www.midjourney.com',
    categoryId: 'image',
    tags: ['Art', 'High Quality', 'Discord'],
    isPopular: true,
  },
  {
    id: 'dalle3',
    name: 'DALL·E 3',
    description: 'OpenAI\'s image generator, integrated into ChatGPT.',
    url: 'https://chatgpt.com',
    categoryId: 'image',
    tags: ['OpenAI', 'Accurate Prompts'],
  },
  {
    id: 'stable-diffusion',
    name: 'Stable Diffusion',
    description: 'Open-source image generation by Stability AI.',
    url: 'https://stability.ai',
    categoryId: 'image',
    tags: ['Open Source', 'Customizable'],
  },
  {
    id: 'ideogram',
    name: 'Ideogram',
    description: 'AI image generator exceptionally good at rendering text.',
    url: 'https://ideogram.ai',
    categoryId: 'image',
    tags: ['Typography', 'Design'],
  },

  // Video Generation
  {
    id: 'sora',
    name: 'Sora',
    description: 'OpenAI\'s highly realistic text-to-video model.',
    url: 'https://openai.com/sora',
    categoryId: 'video',
    tags: ['OpenAI', 'Realistic'],
    isPopular: true,
  },
  {
    id: 'runway',
    name: 'Runway (Gen-3)',
    description: 'Advanced video generation and editing suite.',
    url: 'https://runwayml.com',
    categoryId: 'video',
    tags: ['Gen-3 Alpha', 'Editing'],
    isPopular: true,
  },
  {
    id: 'pika',
    name: 'Pika',
    description: 'Idea-to-video platform with easy-to-use tools.',
    url: 'https://pika.art',
    categoryId: 'video',
    tags: ['Animation', '3D'],
  },
  {
    id: 'kling',
    name: 'Kling AI',
    description: 'Powerful video generation model by Kuaishou.',
    url: 'https://klingai.com',
    categoryId: 'video',
    tags: ['High Fidelity', 'Long Video'],
  },
  {
    id: 'luma',
    name: 'Luma Dream Machine',
    description: 'Fast, high-quality text and image to video generation.',
    url: 'https://lumalabs.ai/dream-machine',
    categoryId: 'video',
    tags: ['Fast', 'Realistic'],
  },

  // Audio & Music
  {
    id: 'suno',
    name: 'Suno',
    description: 'Generate full songs with vocals from text prompts.',
    url: 'https://suno.com',
    categoryId: 'audio',
    tags: ['Music', 'Vocals'],
    isPopular: true,
  },
  {
    id: 'udio',
    name: 'Udio',
    description: 'High-fidelity AI music generation platform.',
    url: 'https://www.udio.com',
    categoryId: 'audio',
    tags: ['Music', 'High Fidelity'],
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    description: 'Industry-leading AI voice generator and text-to-speech.',
    url: 'https://elevenlabs.io',
    categoryId: 'audio',
    tags: ['Voice', 'TTS', 'Cloning'],
    isPopular: true,
  },

  // Coding & Dev
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'The AI-first code editor built on VS Code.',
    url: 'https://cursor.sh',
    categoryId: 'code',
    tags: ['Editor', 'Copilot'],
    isPopular: true,
  },
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'Your AI pair programmer by GitHub.',
    url: 'https://github.com/features/copilot',
    categoryId: 'code',
    tags: ['Extension', 'Pair Programming'],
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    description: 'Generate UI with simple text prompts.',
    url: 'https://v0.dev',
    categoryId: 'code',
    tags: ['UI', 'React', 'Tailwind'],
    isPopular: true,
  },
  {
    id: 'bolt',
    name: 'Bolt.new',
    description: 'Prompt-driven full-stack web development in the browser.',
    url: 'https://bolt.new',
    categoryId: 'code',
    tags: ['Full Stack', 'Web'],
  },

  // Search & Research
  {
    id: 'perplexity',
    name: 'Perplexity',
    description: 'AI search engine that provides cited answers.',
    url: 'https://www.perplexity.ai',
    categoryId: 'search',
    tags: ['Search', 'Research', 'Citations'],
    isPopular: true,
  },
  {
    id: 'you',
    name: 'You.com',
    description: 'A private search engine that summarizes the web for you.',
    url: 'https://you.com',
    categoryId: 'search',
    tags: ['Search', 'Privacy'],
  },
  {
    id: 'consensus',
    name: 'Consensus',
    description: 'AI search engine for scientific research.',
    url: 'https://consensus.app',
    categoryId: 'search',
    tags: ['Science', 'Academic'],
  }
];
