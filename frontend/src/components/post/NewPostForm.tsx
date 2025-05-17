
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload } from 'lucide-react';

const NewPostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState('');
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, category, coverImage });
    // Submit post logic will be implemented later
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a descriptive title"
          className="mt-1"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Design">Design</SelectItem>
            <SelectItem value="Development">Development</SelectItem>
            <SelectItem value="UX Design">UX Design</SelectItem>
            <SelectItem value="Content">Content</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your post content here..."
          className="mt-1 min-h-[200px]"
          required
        />
      </div>
      
      <div>
        <Label htmlFor="cover-image">Cover Image</Label>
        <div className="mt-1 flex items-center">
          <label 
            htmlFor="cover-image" 
            className="cursor-pointer border-2 border-dashed rounded-lg p-6 w-full flex flex-col items-center justify-center"
          >
            {coverImagePreview ? (
              <img 
                src={coverImagePreview} 
                alt="Cover preview" 
                className="max-h-[200px] object-contain mb-4" 
              />
            ) : (
              <Upload size={40} className="text-gray-400 mb-2" />
            )}
            <span className="text-sm text-gray-500">
              {coverImagePreview ? "Change image" : "Upload cover image"}
            </span>
            <input
              id="cover-image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>
      
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline">Save Draft</Button>
        <Button type="submit">Publish Post</Button>
      </div>
    </form>
  );
};

export default NewPostForm;
