import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Phone, Menu, MapPin, Clock, Star, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "../../components/components/ui/button";
import SmileLogo from "../../../public/assets/images/smileculturelogo.webp";

const Header = ({ navItems }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const [isInfoExpanded, setIsInfoExpanded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  // Google Maps URL for Smile Culture Dental Clinic
  const googleMapsUrl = "https://www.google.com/maps/dir//Smile+Culture+Dental+Clinic+Malad+%7C+Braces,+Invisalign,+Veneers,+Aligners,+Dental+Implants,+Root+Canal+In+Malad+West+Shop+No+1,+Harshita+Building+Liberty+Garden+Rd+Number+4,+Malad,+Navy+Colony,+Liberty+Garden,+Malad+West+Mumbai,+Maharashtra+400064/@19.1867163,72.8401376,17z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3be7b71d64384c3d:0x82e0128134f626c0";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width
    setWindowWidth(window.innerWidth);

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Animated Announcement Bar */}
      {showAnnouncement && (
        <div className="relative bg-gradient-to-r from-cyan-600 via-teal-500 to-cyan-600 text-white py-2 sm:py-3 px-2 sm:px-4 text-center overflow-hidden">
          <div className="absolute inset-0 bg-white opacity-10">
            <div
              className="absolute inset-0 animate-pulse opacity-30"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%)' }}
            ></div>
          </div>
          <div className="container mx-auto relative z-10 flex flex-wrap items-center justify-center px-4 sm:px-6 iphone-6:px-8">

            <p className="text-xs sm:text-sm md:text-base font-medium pr-6 sm:pr-8">
              <span className="animate-bounce inline-block mr-2">
                <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-300 fill-yellow-300" />
              </span>  Limited Time Offer: Comprehensive Dental Consultation at an Unbeatable Price!
            </p>
            <button
              onClick={() => setShowAnnouncement(false)}
              className="absolute right-2 sm:right-4 text-white/80 hover:text-white hover:scale-110 transition-all"
              aria-label="Close announcement"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" />
            </button>
          </div>
        </div>
      )}
      {windowWidth > 1024 && (
        <div className="bg-gradient-to-r from-cyan-50 to-white py-1 sm:py-1.5 border-b border-cyan-100 relative overflow-hidden">
          {/* Background shimmer animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-white to-cyan-50 animate-pulse opacity-40"></div>

          <div className="container mx-auto xxs:px-4 xs:px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 md:gap-5">
                {/* Primary Contact Number with enhanced animation */}
                <Link
                  href="tel:+918369892101"
                  className="group flex items-center gap-1 sm:gap-1.5 hover:text-cyan-600 transition-all duration-300"
                >
                  <div className="relative bg-cyan-50 p-1 rounded-full group-hover:bg-cyan-100 transition-colors">
                    <div className="absolute inset-0 rounded-full bg-cyan-200 animate-ping opacity-30"></div>
                    <Phone className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-cyan-600 relative z-10" />
                  </div>
                  <span className="text-2xs sm:text-xs font-medium text-black group-hover:scale-105 transition-transform duration-300">+91 83698 92101</span>
                </Link>

                {/* Location with Icon - now clickable and links to Google Maps */}
                <Link
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 sm:gap-1.5 hover:text-cyan-600 transition-all duration-300"
                >
                  <div className="relative bg-cyan-50 p-1 rounded-full group-hover:bg-cyan-100 transition-colors">
                    <MapPin className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-cyan-600 relative z-10" />
                  </div>
                  <span className="text-2xs sm:text-xs text-black group-hover:scale-105 transition-transform duration-300"> Smile Culture Dental Clinic, Malad(W), Mumbai</span>
                </Link>
              </div>

              {/* Opening Hours - responsive layout */}
              <div className="flex items-center justify-center md:justify-end gap-1 sm:gap-1.5">
                <div className="relative bg-cyan-50 p-1 rounded-full">
                  <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-cyan-600 relative z-10" />
                </div>
                <div className="text-2xs sm:text-xs">
                  <span className="text-gray-700 font-medium text-black">9:30-1:30 & 5:30-8:30</span>
                  <span className="text-black mx-1">|</span>
                  <span className="text-black">Sun: Appointment Only</span>
                </div>
              </div>
            </div>
          </div>
        </div>)}
      {/* Responsive Info Bar */}

      <header className={`sticky top-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
        : "bg-white shadow-sm py-4"
        }`}>
        <div className="mx-auto xxs:px-4 xs:px-6">
          <div className="flex items-center justify-between">
            {/* Animated Logo */}
            <Link href="/" className="group flex items-center gap-2 overflow-hidden">
              <div className="relative transform transition-transform group-hover:scale-105 duration-300">
                <div className="absolute -inset-1 bg-gradient-to-r rounded-full opacity-0 group-hover:opacity-70 blur-md group-hover:animate-pulse"></div>
                <Image
                  src={SmileLogo}
                  alt="Smile Culture Logo"
                  width={150}
                  height={50}
                  className="object-contain rounded relative z-10"
                  priority
                />
              </div>
              <div className="overflow-hidden">
                <span className="font-bold text-lg bg-gradient-to-r from-cyan-700 to-teal-600 bg-clip-text text-transparent hidden sm:block transform transition-all duration-500 group-hover:translate-x-1">
                  Smile Culture
                </span>
                <div className="h-0.5 w-0 bg-gradient-to-r from-cyan-500 to-teal-400 group-hover:w-full transition-all duration-500 hidden sm:block"></div>
              </div>
            </Link>
            <div className="bg-gradient-to-r from-cyan-50 to-white border-b border-cyan-100 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-50 via-white to-cyan-50 animate-pulse opacity-40"></div>
            </div>

            {/* Contact and CTA Section */}
            <div className="flex items-center gap-3 md:gap-5">
              {/* Emergency Call Animation */}
              <div className="hidden xs:block relative">
                <Link
                  href="tel:+911234567890"
                  className="group flex items-center gap-1 relative overflow-hidden px-3 py-1.5 rounded-lg border border-red-100"
                >
                  <div className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 rounded-lg transition-all duration-300"></div>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-red-100 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-70 group-hover:animate-ping transition-all duration-300"></div>
                    <Phone className="h-4 w-4 text-red-500 relative z-10" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-bold text-red-500 group-hover:text-red-600 relative z-10 block transform group-hover:translate-x-1 transition-all duration-300">
                      +91 1234567890
                    </span>
                    <div className="h-0.5 w-0 bg-red-300 group-hover:w-full transition-all duration-500"></div>
                  </div>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6 text-cyan-600" />
              </button>

              {/* Book Appointment Button - Only visible on laptop screens and larger */}
              {windowWidth >= 1024 && (
                <>
                  <div className="relative group">
                    <Link href="https://smileculturemumbai.in/contact-us/">
                      <Button className="relative bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-full shadow-md px-4 py-2 transform hover:translate-y-[-2px] transition-all duration-300 w-full">
                        <div
                          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full"
                          onClick={() => setMobileMenuOpen(false)}
                        ></div>
                        <Calendar className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                        <span>Book Appointment</span>
                      </Button>
                    </Link>
                  </div>
                </>
              )}

            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4">
              <div className="flex flex-col space-y-4">
                <Link
                  href="tel:+918369892101"
                  className="group flex items-center gap-1.5 hover:text-cyan-600 transition-all duration-300"
                >
                  <div className="relative bg-cyan-50 p-1 rounded-full group-hover:bg-cyan-100 transition-colors">
                    <div className="absolute inset-0 rounded-full bg-cyan-200 animate-ping opacity-30"></div>
                    <Phone className="h-3 w-3 text-cyan-600 relative z-10" />
                  </div>
                  <span className="text-xs font-medium text-black group-hover:scale-105 transition-transform duration-300">+91 83698 92101</span>
                </Link>

                {/* Location with Icon in mobile menu - now also clickable */}
                <Link
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 hover:text-cyan-600 transition-all duration-300"
                >
                  <div className="relative bg-cyan-50 p-1 rounded-full group-hover:bg-cyan-100 transition-colors">
                    <MapPin className="h-3 w-3 text-cyan-600 relative z-10" />
                  </div>
                  <span className="text-xs text-black group-hover:scale-105 transition-transform duration-300">Smile Culture Dental Clinic, Malad(W), Mumbai</span>
                </Link>

                <div className="flex items-center gap-1.5">
                  <div className="relative bg-cyan-50 p-1 rounded-full">
                    <Clock className="h-3 w-3 text-cyan-600 relative z-10" />
                  </div>
                  <div className="text-xs flex flex-wrap">
                    <span className="text-gray-700 font-medium text-black">Mon-Sat: 9:30-1:30 & 5:30-8:30</span>
                    <span className="text-black mx-1">|</span>
                    <span className="text-black">Sun: Appointment Only</span>
                  </div>
                </div>

                {/* Book Appointment Button in Mobile Menu - Only visible below lg breakpoint */}
                {windowWidth < 1024 && (
                  <div className="relative group">
                    <Link href="https://smileculturemumbai.in/contact-us/">
                      <Button className="relative bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 text-white rounded-full shadow-md px-4 py-2 transform hover:translate-y-[-2px] transition-all duration-300 w-full">
                        <div
                          className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 rounded-full"
                          onClick={() => setMobileMenuOpen(false)}
                        ></div>
                        <Calendar className="h-4 w-4 mr-2 group-hover:animate-bounce" />
                        <span>Book Appointment</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;