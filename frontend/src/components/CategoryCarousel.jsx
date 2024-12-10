import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
  { title: "Machine Learning Engineer", description: "Build intelligent algorithms", icon: "🤖" },
  { title: "Frontend Developer", description: "Design user-friendly interfaces", icon: "🖌️" },
  { title: "Backend Developer", description: "Work on server-side logic", icon: "💻" },
  { title: "Data Science", description: "Analyze data for insights", icon: "📊" },
  { title: "Graphic Designer", description: "Create stunning visuals", icon: "🎨" },
  { title: "FullStack Developer", description: "Handle both front and back end", icon: "🔗" },
  { title: "DevOps Engineer", description: "Bridge development and operations", icon: "⚙️" },
  { title: "UI/UX Designer", description: "Design intuitive user experiences", icon: "🎨" },
  { title: "Cybersecurity Specialist", description: "Protect systems and data from threats", icon: "🔒" },
  { title: "Mobile App Developer", description: "Build mobile applications", icon: "📱" },
  { title: "Game Developer", description: "Develop interactive gaming experiences", icon: "🎮" },
  { title: "Cloud Engineer", description: "Manage cloud-based systems", icon: "☁️" },
  { title: "Network Engineer", description: "Maintain and design network infrastructures", icon: "🌐" },
  { title: "Software Tester", description: "Test and debug software applications", icon: "🧪" },
  { title: "IT Support Specialist", description: "Provide technical assistance and support", icon: "🛠️" },
  { title: "Business Analyst", description: "Analyze business needs and strategies", icon: "📈" },
  { title: "Systems Administrator", description: "Manage and maintain IT systems", icon: "🖥️" },
  { title: "Blockchain Developer", description: "Develop blockchain solutions", icon: "⛓️" },
  { title: "Digital Marketing Specialist", description: "Promote brands online", icon: "📣" },
  { title: "Content Creator", description: "Create engaging content for audiences", icon: "✍️" },
  { title: "SEO Specialist", description: "Optimize websites for search engines", icon: "🔍" },
  { title: "Database Administrator", description: "Manage and maintain database systems", icon: "🗄️" },
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  // Auto-scroll every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % category.length);
    }, 50000); // 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="bg-white py-12">
      <Carousel
        className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg"
        selectedIndex={currentIndex}
        onSelect={(index) => setCurrentIndex(index)}
      >
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className={`transition-all duration-500 ease-in-out px-6 py-5 bg-gray-50 rounded-2xl text-gray-700 text-lg text-center hover:bg-blue-100 ${currentIndex === index ? 'transform scale-110 bg-blue-100 text-white' : ''
                }`}
            >
              <div className="flex items-center justify-center mb-2 text-4xl">{cat.icon}</div>
              <h3 className="text-lg font-semibold mb-1">{cat.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
              <Button
                onClick={() => searchJobHandler(cat.title)}
                variant="outline"
                className="transition duration-300 ease-in-out px-3 py-2 bg-green-500 text-white hover:bg-green-600 border-none rounded-md"
              >
                Explore
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-gray-700 hover:text-blue-500 cursor-pointer" />
        <CarouselNext className="text-gray-700 hover:text-blue-500 cursor-pointer" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
