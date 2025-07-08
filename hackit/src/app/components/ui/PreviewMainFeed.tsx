"use client";
import React from 'react';
import PreviewPost from './PreviewPost';

// Define data interfaces for easy real data integration
interface PostData {
  id: string;
  authorName: string;
  authorTitle: string;
  timeAgo: string;
  content: string;
  likes: number;
  comments: number;
  profileColor: string;
  isLiked: boolean;
  images?: string[];
}

interface PreviewMainFeedProps {
  posts?: PostData[];
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
}

const PreviewMainFeed: React.FC<PreviewMainFeedProps> = ({ 
  posts = [
    {
      id: "1",
      authorName: 'Aisha Khan',
      authorTitle: 'Founder, A-List Digital',
      timeAgo: '2h ago',
      content: 'Just wrapped up a deep dive into our Q3 analytics.\n\nThe data confirms that shifting our ad spend from broad-stroke campaigns to hyper-targeted micro-influencer collaborations has yielded a 150% increase in engagement. For fellow B2C founders, don\'t underestimate the power of a niche audience. Authenticity is our most valuable currency!',
      likes: 102,
      comments: 23,
      profileColor: '#9D4EDD',
      isLiked: false,
      images: ['/images/placeholder.jpg'],
    },
    {
      id: "2",
      authorName: 'Priya Sharma',
      authorTitle: 'CEO, Innovate & Scale',
      timeAgo: '8h ago',
      content: 'Scaling a startup is a marathon, not a sprint. This week, we focused on refining our operational workflows to eliminate bottlenecks before our next growth phase.\n\nWe implemented a new project management system that integrates directly with our CRM. The goal? To ensure our client-facing teams have real-time data access, reducing response times by an anticipated 30%.\n\nRemember, a strong internal foundation is what makes external growth sustainable. We\'re building a skyscraper, not a house of cards.',
      likes: 256,
      comments: 41,
      profileColor: '#FF4444',
      isLiked: true,
    },
    {
      id: "3",
      authorName: 'Isabella Rossi',
      authorTitle: 'Creative Director, Rossi & Co.',
      timeAgo: '1d ago',
      content: 'Creativity in business isn\'t just about a beautiful logo; it\'s about strategic storytelling.\n\nWe just launched a campaign for a sustainable fashion brand that centers the entire narrative around the lifecycle of a single garment—from the organic farm to the customer\'s closet. This approach doesn\'t just sell a product; it sells a philosophy. It connects with consumers on an emotional level, turning them from customers into brand evangelists.\n\nThink beyond the transaction, and focus on the transformation.',
      likes: 412,
      comments: 89,
      profileColor: '#FFB800',
      isLiked: false,
      images: ['/images/placeholder.jpg', '/images/placeholder.jpg'],
    },
    {
      id: "4",
      authorName: 'Elena Petrova',
      authorTitle: 'Partner, Catalyst Ventures',
      timeAgo: '2d ago',
      content: "I review hundreds of pitches a month, and the ones that stand out always nail three things: a massive addressable market, a clear 'why now,' and an unshakable team. It's not just about a good idea; it's about executing that idea at the right moment in history.\n\nWe often see founders get bogged down in the tech without clearly articulating the problem they're solving for a specific customer segment. Your pitch should tell a story. Who is your hero (the customer)? What is their dragon (the problem)? And how does your product act as the magic sword? Make it compelling, make it data-driven, but most importantly, make us believe in your mission.",
      likes: 830,
      comments: 152,
      profileColor: '#00C49F',
      isLiked: false,
    },
    {
      id: "5",
      authorName: 'Samantha Chen',
      authorTitle: 'Head of Product, Connectify',
      timeAgo: '3d ago',
      content: "Building a product roadmap is an art and a science. The science is the data: user analytics, support tickets, and A/B test results. The art is the intuition: understanding the market, anticipating future needs, and having a strong vision for where the product is headed.\n\nOne of our biggest challenges was balancing feature requests from our largest enterprise clients with the needs of our broader user base. We created a 'Weighted Scoring' model that factors in strategic alignment, development effort, and potential impact. It's not a perfect system, but it brings objectivity to a subjective process and helps us justify our decisions to stakeholders. It forces us to ask, 'Does this move the needle on our core KPIs?' instead of just, 'Who is asking for this?'",
      likes: 315,
      comments: 68,
      profileColor: '#0088FE',
      isLiked: true,
      images: ['/images/placeholder.jpg'],
    }
  ],
  onLike, 
  onComment 
}) => {

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    padding: '2rem',
    fontFamily: 'Britti Sans Trial, Inter, sans-serif',
    minHeight: 'calc(100vh - 200px)',
    maxWidth: '1400px',
    margin: '0 auto',
    width: '100%',
  };

  const postsContainerStyle = {
    maxWidth: '700px',
    width: '100%',
    minWidth: '0',
  };

  return (
    <div style={containerStyle}>
      {/* Posts Container */}
      <div style={postsContainerStyle}>
        {posts.map((post) => (
          <PreviewPost
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorTitle={post.authorTitle}
            timeAgo={post.timeAgo}
            content={post.content}
            likes={post.likes}
            comments={post.comments}
            profileColor={post.profileColor}
            isLiked={post.isLiked}
            onLike={onLike}
            onComment={onComment}
            images={post.images}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviewMainFeed; 