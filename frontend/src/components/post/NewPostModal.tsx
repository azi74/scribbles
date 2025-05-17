
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Image, File, Film, Headphones } from 'lucide-react';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [mediaType, setMediaType] = useState('image');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState('');
  
  const handleMediaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setMediaFile(file);
      
      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setMediaPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files, just show the filename
        setMediaPreview('');
      }
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, content, category, mediaType, mediaFile });
    // Submit post logic will be implemented later
    onClose();
  };
  
  const resetForm = () => {
    setTitle('');
    setContent('');
    setCategory('');
    setMediaFile(null);
    setMediaPreview('');
  };
  
  const handleClose = () => {
    resetForm();
    onClose();
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-5">
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
              className="mt-1 min-h-[150px]"
              required
            />
          </div>
          
          <div>
            <Label>Add Media</Label>
            <Tabs defaultValue="image" value={mediaType} onValueChange={setMediaType} className="mt-2">
              <TabsList className="grid grid-cols-4">
                <TabsTrigger value="image" className="flex flex-col items-center gap-1 py-2">
                  <Image size={16} />
                  <span className="text-xs">Image</span>
                </TabsTrigger>
                <TabsTrigger value="video" className="flex flex-col items-center gap-1 py-2">
                  <Film size={16} />
                  <span className="text-xs">Video</span>
                </TabsTrigger>
                <TabsTrigger value="audio" className="flex flex-col items-center gap-1 py-2">
                  <Headphones size={16} />
                  <span className="text-xs">Audio</span>
                </TabsTrigger>
                <TabsTrigger value="document" className="flex flex-col items-center gap-1 py-2">
                  <File size={16} />
                  <span className="text-xs">Document</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="image">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  {mediaPreview ? (
                    <div className="mb-2">
                      <img 
                        src={mediaPreview} 
                        alt="Preview" 
                        className="max-h-[200px] object-contain mb-2" 
                      />
                    </div>
                  ) : (
                    <Upload size={40} className="text-gray-400 mb-2" />
                  )}
                  <Label 
                    htmlFor="image-upload" 
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    {mediaPreview ? "Change image" : "Upload image (JPG, PNG, GIF)"}
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleMediaChange}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="video">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <Film size={40} className="text-gray-400 mb-2" />
                  <Label 
                    htmlFor="video-upload" 
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    Upload video (MP4, WebM)
                  </Label>
                  <Input
                    id="video-upload"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={handleMediaChange}
                  />
                  {mediaFile && mediaType === 'video' && (
                    <p className="mt-2 text-sm">{mediaFile.name}</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="audio">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <Headphones size={40} className="text-gray-400 mb-2" />
                  <Label 
                    htmlFor="audio-upload" 
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    Upload audio (MP3, WAV)
                  </Label>
                  <Input
                    id="audio-upload"
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleMediaChange}
                  />
                  {mediaFile && mediaType === 'audio' && (
                    <p className="mt-2 text-sm">{mediaFile.name}</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="document">
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                  <File size={40} className="text-gray-400 mb-2" />
                  <Label 
                    htmlFor="document-upload" 
                    className="cursor-pointer text-sm text-gray-500"
                  >
                    Upload document (PDF, DOC)
                  </Label>
                  <Input
                    id="document-upload"
                    type="file"
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    onChange={handleMediaChange}
                  />
                  {mediaFile && mediaType === 'document' && (
                    <p className="mt-2 text-sm">{mediaFile.name}</p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="flex gap-3 justify-end">
            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
            <Button type="submit">Publish Post</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewPostModal;
