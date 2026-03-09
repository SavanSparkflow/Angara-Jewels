import React from 'react';

const OurStory = () => {
    return (
        <div className="w-full bg-white select-none">
            {/* 1. Top Banner */}
            <div className="w-full h-[300px] md:h-[500px] bg-gray-100 mb-16 overflow-hidden">
                <img 
                   src="https://images.unsplash.com/photo-1599643478514-4a11011c77f0?auto=format&fit=crop&q=80&w=2000" 
                   alt="Jewelry Design Sketch" 
                   className="w-full h-full object-cover object-center opacity-80" 
                />
            </div>

            {/* 2. Intro Text */}
            <div className="max-w-4xl mx-auto px-6 text-center mb-24 space-y-6">
                <h1 className="text-[22px] md:text-[26px] text-gray-800 tracking-wide font-medium font-serif mb-8">Our Story</h1>
                <p className="text-[15px] md:text-[17px] text-gray-600 leading-relaxed font-sans max-w-3xl mx-auto pb-4">
                    We're so glad you're looking here for the perfect piece of jewellery.<br className="hidden md:block"/>
                    Our hope is that every piece you create with us speaks to your soul, in the way only<br className="hidden md:block"/>
                    vibrant coloured gemstones can.
                </p>
            </div>

            {/* 3. Story Section 1: Image Left, Text Right */}
            <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-12 lg:gap-20 mb-32">
                <div className="flex-1 w-full h-[400px] md:h-[600px] bg-gray-100 overflow-hidden shadow-sm">
                    <img 
                        src="https://images.unsplash.com/photo-1583937438497-6a74653dd758?auto=format&fit=crop&q=80&w=1000" 
                        alt="Ankur & Aditi Daga" 
                        className="w-full h-full object-cover object-center grayscale-[20%]" 
                    />
                </div>
                <div className="flex-1 space-y-6 text-[14px] text-gray-600 leading-[1.8] font-sans md:pr-4">
                    <p>
                        It is with this very hope that my wife, Aditi, and I brought Rare Jewels into the world more than 15 years ago. Jewellery is our destiny. Both of us come from generations of jewellers. Coloured gemstones-with all their power and history-are in our blood.
                    </p>
                    <p>
                        For a while, I thought I could escape the lure of jewellery. Following a stint at McKinsey & Company, I pursued my MBA at Harvard. But I was eventually compelled to return to my roots. It all started when Aditi and I were looking for jewellery to commemorate a milestone in our marriage, but nothing we saw really spoke to us or captured our relationship in a unique and memorable way. Everything was stamped out. Commercial. With little personality or individuality.
                    </p>
                    <p>
                        Talking with several of our friends and peers, we realized that we weren't the only ones who felt this way. So together, Aditi and I set out to build Rare Jewels to combine the power of creation with the ancient energy of coloured gemstones.
                    </p>
                    <p>
                        When you come to our website, we want you to be able to design a piece of jewellery that captures everything you want to say; in any stone, in any style, in any metal, in any setting. Whether for yourself or, as in our case, a gift.
                    </p>
                    <p>
                        In this way, we want you to be the hero of your jewellery saga. It all harkens back to centuries ago when only royalty would have their jewellery custom designed. Today, combining technology and craft, we offer those services to you, so that you can have that custom one-of-a-kind piece of jewellery without the long wait and heavy price tag!
                    </p>
                </div>
            </div>

            {/* 4. Full Width Quote Banner */}
            <div className="w-full bg-[#f4f4f4] relative h-[300px] md:h-[400px] mb-32 flex items-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1620655452843-ea844c3ad297?auto=format&fit=crop&q=80&w=2000" 
                        alt="Beautiful Color Rings" 
                        className="w-full h-full object-cover opacity-30 mix-blend-multiply" 
                    />
                </div>
                <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12 flex justify-end">
                    <div className="max-w-2xl text-center md:text-right text-gray-900 py-8 px-6 bg-white/40 backdrop-blur-sm rounded-sm">
                        <p className="text-[18px] md:text-[24px] font-serif leading-snug mb-8 relative px-8">
                            <span className="text-5xl text-gray-400 font-serif absolute top-[-10px] left-0">"</span>
                            The world needs more colour in every way. We're on a mission to find it and share it, so you can celebrate life's precious moments with colour.
                        </p>
                        <p className="font-bold text-[13px] tracking-wide uppercase">- Ankur & Aditi Daga</p>
                    </div>
                </div>
            </div>

            {/* 5. Story Section 2: Text Left, Image Right */}
            <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20 mb-32">
                <div className="flex-1 space-y-6 text-[14px] text-gray-600 leading-[1.8] font-sans md:pl-4">
                    <p>
                        We built Rare Jewels from the stone, up, however our story began in India in 2024. We are vertically-integrated, which means every step in the making of your jewellery is carefully handled by us. We source every single one of our gemstones sustainably. We cut and polish them ourselves with the utmost skill and respect, never forgetting that coloured gemstones and diamonds can take 30 million years to form in the depths of the earth. We then handcraft the designs you choose around them.
                    </p>
                    <p>
                        Handmade also extends to our service. So unlike regular ecommerce businesses where a chatbot and an inbox are considered sufficient, we have a team of dedicated jewellery experts who can help with everything from education to style guru-ship (even explaining how garnets are connected to pomegranates).
                    </p>
                    <p>
                        In fact, our service has earned us many recognitions, including awards from Newsweek, Bizrate Insights and Business Intelligence, all validating us as the "Internet's Best Jeweller."
                    </p>
                    <p>
                        Now we've told you a lot about Rare Jewels, but we saved our name for last.
                    </p>
                    <p>
                        In ancient Sanskrit, Rare Jewels means "the fire within." We love how it captures the power of the colour that burns inside our gemstones, as well as the fire of imagination that inspires you to create jewellery with colours that reflect you.
                    </p>
                    <p>
                        After all, colour brings out the best in people, and our mission is to bring more of it to the world.
                    </p>
                    <p className="font-bold text-gray-800 text-center md:text-left mt-8 tracking-wide">
                        Life's precious moments should be celebrated with colour!
                    </p>
                    <div className="flex items-center gap-16 mt-16 pb-4">
                        <div className="text-center">
                            <h4 className="text-3xl mb-4 text-gray-800" style={{ fontFamily: "'Brittany Signature', cursive" }}>Ankur Daga</h4>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-t border-gray-200 pt-3">Ankur Daga</p>
                        </div>
                        <div className="text-center">
                            <h4 className="text-3xl mb-4 text-gray-800" style={{ fontFamily: "'Brittany Signature', cursive" }}>Aditi Daga</h4>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-900 border-t border-gray-200 pt-3">Aditi Daga</p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 w-full h-[400px] md:h-[650px] bg-[#f9f9f9] flex items-center justify-center overflow-hidden shadow-sm">
                    <img 
                        src="https://images.unsplash.com/photo-1605100804763-247f67b4546e?auto=format&fit=crop&q=80&w=1000" 
                        alt="Stacked Rings" 
                        className="w-full h-full object-cover object-center mix-blend-multiply" 
                    />
                </div>
            </div>

            {/* 6. Vision & Mission Footer */}
            <div className="max-w-6xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12 pt-20 pb-32">
                <div className="flex-1 text-center md:text-right">
                    <h3 className="text-xl font-bold tracking-widest uppercase text-gray-900 mb-6">Vision</h3>
                    <p className="text-[15px] font-light text-gray-600 max-w-sm ml-auto leading-relaxed">
                        To build a world where colour brings out the best in people.
                    </p>
                </div>

                <div className="w-56 h-56 flex-shrink-0 flex items-center justify-center filter drop-shadow-xl hover:scale-105 transition-transform duration-500">
                    {/* The blue octagon collage container */}
                    <div className="w-full h-full bg-[#0a1a47] relative overflow-hidden" style={{ clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)" }}>
                        <img 
                            src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&q=80&w=800" 
                            className="w-full h-full object-cover absolute inset-0 opacity-80 mix-blend-luminosity" 
                            alt="Blue Collage" 
                        />
                         {/* Optional grid overlay to simulate the mosaic puzzle feel */}
                         <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0.5 pointer-events-none">
                             {[...Array(16)].map((_, i) => (
                                 <div key={i} className="bg-white/10 backdrop-blur-[1px]"></div>
                             ))}
                         </div>
                    </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-bold tracking-widest uppercase text-gray-900 mb-6">Mission</h3>
                    <p className="text-[15px] font-light text-gray-600 max-w-sm mr-auto leading-relaxed">
                        To bring life-changing colour to the world's hands, faces and hearts.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default OurStory;
