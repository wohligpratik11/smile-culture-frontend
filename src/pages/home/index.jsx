"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Link from 'next/link';
import Head from "next/head"
import Cookies from "js-cookie"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/components/ui/accordion"
import Image from 'next/image'
import { Card, CardContent, CardHeader } from "../../components/components/ui/card"
import { Button } from "@/components/components/ui/button"
import FaceVector from "../../../public/assets/images/faceVector.webp"
import BorderBox from "../../../public/assets/images/borderBox.webp"
import FaceSwapImage from "../../../public/assets/images/faceswap.webp"
import FaceGirl from "../../../public/assets/images/facegirl.webp"
import DualFaceIcons from "../../../public/assets/images/dualface.webp"
import ArrowIcon from "../../../public/assets/images/arrow.webp"
import ImageIcon from "../../../public/assets/images/imagegallary.webp"
import FaceSlider from "../../../public/assets/images/faceslider.webp"
import FaceOne from "../../../public/assets/images/face1.webp"
import KimFace from "../../../public/assets/images/kimface.webp"
import ZyanFace from "../../../public/assets/images/zyanface.webp"
import UploadIcon from "../../../public/assets/gif/uploadicon.gif"
import FaceIcon from "../../../public/assets/gif/faceicon.gif"
import PhotoIcon from "../../../public/assets/gif/photoicon.gif"
import SaveShare from "../../../public/assets/gif/sharesave.gif"
import gsap from "gsap"; // Import GSAP

const Home = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [loginMessage, setLoginMessage] = useState("")
  const [selectedSwap, setSelectedSwap] = useState(Cookies.get("swapType") || "single")
  const [openIndex, setOpenIndex] = useState(null);
  const AnimatedFace = "/assets/videos/ErosAnimatedFace.mp4";
  const AnimatedFacGif = "/assets/gif/Eros.gif";
  const [isFaceSliderVisible, setIsFaceSliderVisible] = useState(true);
  const [currentImage, setCurrentImage] = useState(FaceGirl.src);


  const steps = [
    { src: UploadIcon, text: "Upload your source photo or video to begin the process" },
    { src: PhotoIcon, text: "Select a photo from our stock database to begin" },
    { src: FaceIcon, text: "Choose the face you'd like to swap." },
    { src: SaveShare, text: "Share and post your customized content." },
  ];
  const features = [
    {
      title: "face-swap",
      image: "/placeholder.svg?height=100&width=100",
      description: "Advanced face swapping technology",
      path: "/movie",
    },
    {
      title: "lip-syncing",
      image: "/placeholder.svg?height=100&width=100",
      description: "Precise lip synchronization",
      path: "/movie",
    },
    {
      title: "multilingual",
      image: "/placeholder.svg?height=100&width=100",
      description: "Support for multiple languages",
      path: "/movie",
    },
  ];

  const handleBackClick = () => {
    router.back()
  }

  const handleHomeBackClick = () => {
    router.push("https://erosnow.com/")
  }
  useEffect(() => {
    const swapType = Cookies.get("swapType")
    if (swapType) {
      setSelectedSwap(swapType)
    }
  }, [])
  const handleFeatureClick = (feature) => {
    Cookies.set("title", feature?.title)
    router.push("/movie")  // Navigate to the /movie path
  }
  const handleButtonClick = (buttonType) => {
    // Set the cookie
    Cookies.set("swapType", buttonType)

    // Update the state
    setSelectedSwap(buttonType)
  }
  const handleMouseEnter = (index) => {
    setOpenIndex(index); // Open the accordion item when hovered
  };

  const handleMouseLeave = () => {
    setOpenIndex(null); // Close it when hover leaves
  };

  useEffect(() => {
    const images = [FaceGirl.src, FaceOne.src, KimFace.src, ZyanFace.src];
    let currentIndex = 0;

    const interval = setInterval(() => {
      setIsFaceSliderVisible(false);

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        setCurrentImage(images[currentIndex]);

        setIsFaceSliderVisible(true);
      }, 1000);

    }, 4000); // Repeat every 4 seconds

    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    // GSAP text animations
    gsap.from(".animate-text", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
    });

    gsap.from(".animate-button", {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      delay: 0.5,
    });
    gsap.from(".image-container", {
      opacity: 0,
      x: -100,
      duration: 1.5,
      ease: "power3.out",
    });
    gsap.from(".image-video-container", {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
    });
    const images = document.querySelectorAll('.animated-img');
    gsap.from(images, {
      opacity: 0,
      scale: 0.10,
      duration: 1,
      stagger: 0.3,
      ease: 'power2.out',
    });
  }, []);

  return (
    <>
      <Head>
        <title>Eros Now - Watch over 11,000+ HD Movies, TV Shows & Originals Online | Eros Now</title>
        <meta
          name="description"
          content="Access India's largest movie collection with Eros Now. Watch & download HD Movies, TV Shows, Eros Now Originals & Songs!"
        />
        <meta
          property="og:title"
          content="Eros Now - Watch over 11,000+ HD Movies, TV Shows & Originals Online | Eros Now"
        />
        <meta
          property="og:description"
          content="Access India's largest movie collection with Eros Now. Watch & download HD Movies, TV Shows, Eros Now Originals & Songs!"
        />
        <meta property="og:image" content="https://erosnow.com/public/images/sq-thumb-new-216_216.png" />
        <meta property="og:url" content="https://erosnow.com/" />
        <meta name="twitter:card" content="Summary" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Head>
      <div className="p-4">
        <Card className="bg-card-cardCustomBlue p-4">
          <CardHeader>
            <div className="flex justify-around sm:w-full lg:w-fit xl:w-fit tablet:w-fit rounded-full p-1 bg-[#495583] border border-buttonBorder mb-3">
              <Button
                variant="ghost"
                className={`rounded-full ${selectedSwap === "single" ? "bg-[#3c4071]" : "text-white/70 hover:text-white hover:bg-[#3c4071]/50"} text-white hover:bg-[#3c4071]/90 text-xs w-full sm:!text-base`}
                onClick={() => handleButtonClick("single")}
              >
                Face Swap
              </Button>
              <Button
                variant="ghost"
                className={`rounded-full ${selectedSwap === "dual" ? "bg-[#3c4071]" : "text-white/70 hover:text-white hover:bg-[#3c4071]/50"} text-white hover:bg-[#3c4071]/90 text-xs w-full sm:!text-base`}
                onClick={() => handleButtonClick("dual")}
              >
                Multi Face Swap
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative image-container">
                {/* Corner borders */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4cc9f0]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#4cc9f0]"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#4cc9f0]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#4cc9f0]"></div>

                <img
                  src={currentImage}
                  alt="Face girl"
                  className="w-full '"
                />

                <img
                  src={FaceSlider.src}
                  alt="Face slider"
                  className={`absolute top-[40%] tablet:top-[28%] left-[50.5%] transform -translate-x-1/2 -translate-y-1/2 w-[24%] transition-opacity duration-1000 ${isFaceSliderVisible ? 'opacity-0' : 'opacity-100'} animate-faceSlide `}
                />

              </div>
              <div className="space-y-4 ">
                <span className="font-semibold text-3xl animate-text">
                  Step Into the Spotlight,&nbsp;
                  <span className="text-[#4cc9f0]">Be the Hero</span>
                </span>
                <p className="text-lg font-normal leading-6 animate-text">
                  Elevate your creative expression by reinterpreting iconic movie moments. Infuse your personal style into the dialogue, adjust the setting, or introduce new characters to create unforgettable cinematic experiences. Whether transforming a beloved scene or crafting an entirely original scenario, you have the power to reshape film history and make it uniquely yours. Unleash your vision and become the star you've always imagined.
                </p>

                <Link href="/movie">
                  <Button
                    onClick={() => handleFeatureClick({
                      title: "face-swap",
                      description: "Advanced face swapping technology",
                      path: "/movie"
                    })}
                    className="bg-gradient-custom-gradient hover:bg-[#4cc9f0]/90 w-52 h-12 mt-4 animate-button"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-4xl font-bold leading-10 flex justify-center animate-text mb-10 ">Effortless Face Swaps in 4 Simple Steps</h3>
              <p className="text-lg font-normal leading-6 animate-text">
                Start by uploading your source photo or video, or choose an image from our curated stock database. Then, select the face you wish to swap for a seamless transformation. Once satisfied with the result, effortlessly share and post your high-quality, customized content.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-3 lg:p-4 rounded-lg animate-text">
                    <div className="p-3 rounded-full bg-[#495583] flex items-center justify-center">
                      <Image
                        src={step.src}
                        alt={step.text}
                        width={43}
                        height={43}
                      />
                    </div>
                    <p className="text-1xl text-gray-300 font-medium leading-6">{step.text}</p>
                  </div>
                ))}
              </div>

            </section>
            <section className="space-y-0">
              <h3 className="text-3xl font-bold flex justify-center leading-10 mb-10 animate-text">Revolutionize Your Photos with the World’s Most Advanced Face Swap Tool!</h3>
              <div className="grid md:grid-cols-2 items-center gap-12 pt-0 pb-0">
                <div className="relative image-video-container">
                  {/* Corner borders */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#4cc9f0]"></div>
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#4cc9f0]"></div>
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#4cc9f0]"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#4cc9f0]"></div>

                  <div className="w-full h-full rounded-lg flex items-center justify-center">
                    <img src={AnimatedFacGif} alt="Face vector" className="w-full" />
                  </div>
                </div>
                <div className="">
                  {[
                    {
                      title: "Animated Face Swap",
                      desc: "Breathe life into your images by swapping faces in animations or dynamic visuals, creating a captivating and playful effect",
                    },
                    {
                      title: "Group Face Swap",
                      desc: "Effortlessly swap faces of multiple individuals within a single image, perfect for enhancing group photos and creating memorable moments."
                    },
                    {
                      title: "Video Face Swap",
                      desc: "Transform high-definition videos by seamlessly swapping faces, making your footage more engaging and visually striking..",
                    },
                    {
                      title: "Real-Time Face Swap",
                      desc: "Swap faces instantly during video calls or live streams, offering a unique and interactive experience in real time.",
                    },
                  ].map((feature, index) => (
                    <div key={index} className="space-y-3 mb-4 animate-text">
                      <h4 className="font-medium flex items-center gap-2">
                        <span className="text-[#4cc9f0]">◆</span>
                        {feature.title}
                      </h4>
                      <p className="text-base text-white ">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </section>

            <section className="">
              <h3 className="text-2xl font-semibold mb-5 animate-text ">FAQ</h3>
              <Accordion type="single" collapsible className="space-y-2 animate-text">
                {[
                  {
                    question: "Why Choose Our Face Swap Tool?",
                    answer: "Our Face Swap Tool offers a fast, accurate, and fun way to swap faces with ease. You’ll get realistic results while ensuring your privacy is fully protected—all at no cost to you!"
                  },
                  {
                    question: "Can I use face swap on group photos?",
                    answer: "It works seamlessly with group photos! Easily swap faces between multiple people, and enjoy flawless, natural results every time."
                  },
                  {
                    question: "Can I edit the swapped face afterward?",
                    answer: "Want to make the swap even more realistic? Our tool lets you fine-tune and adjust the swapped face for a more polished and natural look, ensuring the perfect final result."
                  }, {
                    question: "Can I swap faces between different genders and ages?",
                    answer: "No problem! Our tool can handle face swaps across different genders and ages, delivering realistic and natural results, no matter the differences."
                  },
                ].map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-none rounded-lg bg-blueYonder px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <span className="text-left">{typeof item === "string" ? item : item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Home;

