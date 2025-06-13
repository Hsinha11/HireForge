"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
// import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const reviews = [
    {
        name: "Sana R.",
        role: "Frontend Developer",
        text: "I landed my dream job through this platform in just 2 weeks. The interface is clean and intuitive!",
    },
    {
        name: "Ravi K.",
        role: "Hiring Manager, TechCorp",
        text: "The candidate quality here is unmatched. We filled 3 positions in a week.",
    },
    {
        name: "Neha S.",
        role: "Backend Engineer",
        text: "Super easy to apply and filter jobs. The process was seamless from start to finish!",
    },
];
export default function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <section className="w-full py-12 bg-gray-100">
                <div className="max-w-5xl mx-auto px-4 space-y-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800">
                        What People Are Saying
                    </h2>

                    <div className="w-full  flex flex-col items-center">
                        <Carousel
                            opts={{ loop: true }}
                            className="w-full "
                        >
                            <CarouselContent>
                                {reviews.map((review, index) => (
                                  <CarouselItem
                                        key={index}
                                        className="basis-full "
                                    >
                                        <Card className="w-full">
                                            <CardContent className="flex flex-col items-center justify-center p-6 space-y-2">
                                                <p className="text-gray-600 italic text-center">
                                                    “{review.text}”
                                                </p>
                                                <div className="text-md text-gray-700 font-semibold">
                                                    {review.name}
                                                </div>
                                                <div className="text-md text-gray-500">
                                                    {review.role}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                                <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}
