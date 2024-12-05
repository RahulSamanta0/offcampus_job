import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { useState, useEffect } from "react";
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % category.length);
        }, 3000); // Change slide every 3 seconds

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    return (
        <div>
            <Carousel 
                className="w-full max-w-xl mx-auto my-20"
                selectedIndex={currentIndex} // Update carousel index
                onSelect={(index) => setCurrentIndex(index)} // Sync state with manual selection
            >
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem
                            key={index}
                            className={`md:basis-1/2 lg-basis-1/3 ${currentIndex === index ? "active" : ""}`}
                        >
                            <Button
                                onClick={() => searchJobHandler(cat)}
                                variant="outline"
                                className="rounded-full"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;