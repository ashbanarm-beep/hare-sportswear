import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Calendar, ArrowLeft, Share2, 
  MessageCircle, Copy, Check, FileText, ArrowRight, User, Sparkles 
} from 'lucide-react';
import { blogPosts } from '../data/blogData';
import { LinkedInIcon, TwitterIcon } from '../components/common/SocialIcons';

export default function BlogPostPage() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const post = blogPosts.find(p => p.slug === slug) || blogPosts[0];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Back to Blog */}
      <div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#595856] hover:text-[#FF751F] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </Link>
      </div>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs text-[#595856]">
          <span className="px-2.5 py-1 rounded-md bg-[#FF751F]/15 text-[#FF751F] font-bold uppercase">
            {post.category}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
          <span>•</span>
          <span>{post.date}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-[#1A1A1A] leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-[#595856] leading-relaxed font-normal">
          {post.excerpt}
        </p>

        {/* Author Header Row */}
        <div className="flex items-center justify-between pt-4 border-t border-[#E5DFD5]">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-11 h-11 rounded-full object-cover border border-[#E5DFD5]"
            />
            <div>
              <p className="font-bold text-sm text-[#1A1A1A]">{post.author.name}</p>
              <p className="text-xs text-[#8A847A]">{post.author.role}</p>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex items-center gap-2">
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white hover:bg-[#FF751F]/10 hover:text-[#FF751F] text-[#595856] border border-[#E5DFD5] transition-colors"
              title="Share on LinkedIn"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white hover:bg-[#FF751F]/10 hover:text-[#FF751F] text-[#595856] border border-[#E5DFD5] transition-colors"
              title="Share on Twitter"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white hover:bg-emerald-50 hover:text-emerald-600 text-[#595856] border border-[#E5DFD5] transition-colors"
              title="Share on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-white hover:bg-black/5 text-[#595856] hover:text-[#1A1A1A] border border-[#E5DFD5] transition-colors"
              title="Copy Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>

      {/* Featured Image */}
      <div className="aspect-[16/9] rounded-3xl overflow-hidden bg-[#1A1A1A] border border-[#E5DFD5] shadow-sm">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="prose max-w-none text-[#595856] space-y-6 text-sm sm:text-base leading-relaxed">
        {post.content.split('\n\n').map((para, i) => {
          if (para.startsWith('### ')) {
            return (
              <h3 key={i} className="text-xl sm:text-2xl font-display font-bold text-[#1A1A1A] pt-4">
                {para.replace('### ', '')}
              </h3>
            );
          }
          if (para.startsWith('#### ')) {
            return (
              <h4 key={i} className="text-lg font-display font-bold text-[#FF751F] pt-2">
                {para.replace('#### ', '')}
              </h4>
            );
          }
          if (para.startsWith('1. ') || para.startsWith('- ')) {
            const items = para.split('\n');
            return (
              <ul key={i} className="space-y-2 pl-4 list-disc list-inside text-[#595856] text-xs sm:text-sm">
                {items.map((it, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {it.replace(/^[0-9]+\.\s*|-\s*/, '')}
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="leading-relaxed">
              {para}
            </p>
          );
        })}
      </div>

      {/* Inline Lead-Capture CTA Box */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#1A1A1A] text-white border border-black/40 shadow-2xl space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-[#FF751F] uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> Ready to Turn Your Designs Into Physical Samples?
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
          Get a Direct Factory Price Quote & 7-Day Sample Run
        </h3>
        <p className="text-xs sm:text-sm text-cream-200 leading-relaxed max-w-2xl">
          Whether you have a finalized tech pack or just need consultation on low-MOQ production runs from Sialkot, our engineering team is here to assist.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-[#FF751F] to-[#E65E08] hover:from-[#E65E08] hover:to-[#FF751F] shadow-glow-orange transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Submit RFQ & Tech Pack</span>
          </Link>

          <a
            href="https://wa.me/923001234567?text=Hi%20Hare%20Sportswear,%20I%20just%20read%20your%20blog%20post%20and%20want%20to%20inquire%20about%20manufacturing"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-xs text-emerald-300 bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Direct WhatsApp Inquiry</span>
          </a>
        </div>
      </div>

      {/* Author Bio Box */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5DFD5] flex flex-col sm:flex-row items-center sm:items-start gap-5 shadow-sm">
        <img
          src={post.author.avatar}
          alt={post.author.name}
          className="w-16 h-16 rounded-2xl object-cover border border-[#E5DFD5] shrink-0"
        />
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[11px] font-bold text-[#FF751F] uppercase tracking-wider">
            About the Author
          </span>
          <h4 className="font-display font-bold text-base text-[#1A1A1A]">
            {post.author.name}
          </h4>
          <p className="text-xs text-[#FF751F] font-bold">
            {post.author.role} at Hare Sportswear & Goods (Pvt.) Ltd.
          </p>
          <p className="text-xs text-[#595856] leading-relaxed pt-1">
            Specializing in technical textile engineering, lean apparel manufacturing, and ISO quality auditing in Sialkot, Pakistan.
          </p>
        </div>
      </div>

    </div>
  );
}
