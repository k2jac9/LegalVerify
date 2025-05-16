"use client";

import { useState } from 'react';
import { Search, MapPin, Filter, Star, Award, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

// Mock lawyer data for demonstration
const mockLawyers = [
  {
    id: 1,
    name: "Sarah Chen",
    photo: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg",
    specialties: ["Intellectual Property", "Technology Law"],
    location: "San Francisco, CA",
    rating: 4.9,
    reviews: 127,
    languages: ["English", "Mandarin"],
    verified: true,
  },
  {
    id: 2,
    name: "Michael Johnson",
    photo: "https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg",
    specialties: ["Corporate Law", "Mergers & Acquisitions"],
    location: "New York, NY",
    rating: 4.8,
    reviews: 93,
    languages: ["English", "Spanish"],
    verified: true,
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    photo: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
    specialties: ["Immigration Law", "Human Rights"],
    location: "Miami, FL",
    rating: 4.7,
    reviews: 156,
    languages: ["English", "Spanish", "Portuguese"],
    verified: true,
  },
];

export default function FindLawyers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [location, setLocation] = useState('');
  const [language, setLanguage] = useState('');

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Find Lawyers Worldwide</h1>
        <p className="text-muted-foreground mb-8">
          Connect with verified legal professionals across the globe
        </p>

        {/* Search and Filters */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="us">United States</SelectItem>
              <SelectItem value="uk">United Kingdom</SelectItem>
              <SelectItem value="eu">European Union</SelectItem>
              <SelectItem value="asia">Asia Pacific</SelectItem>
            </SelectContent>
          </Select>

          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Spanish</SelectItem>
              <SelectItem value="fr">French</SelectItem>
              <SelectItem value="zh">Chinese</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockLawyers.map((lawyer) => (
            <Card key={lawyer.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="aspect-video relative">
                  <img
                    src={lawyer.photo}
                    alt={lawyer.name}
                    className="w-full h-full object-cover"
                  />
                  {lawyer.verified && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      <Award className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{lawyer.name}</h3>
                  
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="ml-1 font-medium">{lawyer.rating}</span>
                    <span className="text-muted-foreground ml-1">
                      ({lawyer.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                    <span>{lawyer.location}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {lawyer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {lawyer.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          <Globe className="h-3 w-3 mr-1" />
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-4">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}