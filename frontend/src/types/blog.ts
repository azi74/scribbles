
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  likes?: number;
  dislikes?: number;
  comments?: Array<{
    id: number;
    content: string;
    author: string;
    date: string;
  }>;
}
