import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';

const BlogDetail = () => {
    const { slug } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    // This would typically come from an API based on the slug
    const blogData = {
        title: "Best Lab-Grown Aquamarine Engagement Rings 2026",
        category: "WEDDING",
        date: "January 1, 2026",
        mainImage: "/images/hero-banner.png",
        content: [
            {
                type: "paragraph",
                text: "In 2026, more couples are stepping away from the predictable sparkle and choosing something that feels personal. Something that tells a story. And guess what? When searching for the perfect blue stone that reflects the sky above or the deep blue sea, lab-grown aquamarine is taking center stage."
            },
            {
                type: "paragraph",
                text: "Gone are the days when 'alternative' meant a compromise. Today, it means a conscious choice. We're seeing a massive shift towards stones that carry meaning, and aquamarine—with its serene, icy-blue hue—is the ultimate symbol of peace, trust, and harmony. Perfect for a lifelong promise, right?"
            },
            {
                type: "heading",
                text: "Why Choose Lab-Grown Aquamarine?"
            },
            {
                type: "paragraph",
                text: "Apart from its undeniable beauty, there are several practical reasons why this gem is winning hearts in 2026:"
            },
            {
                type: "list",
                items: [
                    "<strong>Mesmerizing Color:</strong> From delicate pastel blues to deep sea shades, it's a color that never goes out of style.",
                    "<strong>Symbolic Meaning:</strong> It's long been known as a stone of courage and communication, fostering a strong bond between partners.",
                    "<strong>Ethical & Sustainable:</strong> By choosing lab-grown, you're opting for a stone with a smaller environmental footprint, without sacrificing a single drop of brilliance."
                ]
            },
            {
                type: "heading",
                text: "Top Lab-Grown Aquamarine Engagement Ring Styles"
            },
            {
                type: "subheading",
                text: "1. The Timeless Solitaire"
            },
            {
                type: "paragraph",
                text: "Nothing says 'elegant' like a classic solitaire. A single, pear or emerald-cut aquamarine bead set on a slim platinum or white gold band allows the stone's natural clarity to do all the talking. It's clean, it's sophisticated, and it's perfect for the bride who loves understated luxury."
            },
            {
                type: "subheading",
                text: "2. The Radiant Halo"
            },
            {
                type: "paragraph",
                text: "If you want that extra sparkle, a halo setting is your best friend. Surrounding the aquamarine center stone with a ring of small lab-grown diamonds not only adds fire but also makes the blue of the gem pop even more. In 2026, we're seeing a lot of 'hidden halos' where the sparkle is a secret only the wearer knows from the side view."
            },
            {
                type: "subheading",
                text: "3. The Elegant Three-Stone"
            },
            {
                type: "paragraph",
                text: "The three-stone ring represents your past, present, and future together. Pairing a large aquamarine with two flanking lab-grown diamonds creates a balanced, powerful look. It's a statement piece that feels both contemporary and heirloom-worthy."
            },
            {
                type: "subheading",
                text: "4. The Vintage-Inspired"
            },
            {
                type: "paragraph",
                text: "For the romantic at heart, vintage-inspired settings with intricate filigree or milgrain details are a dream. These designs harken back to the Art Deco era but with the clarity and precision of modern lab-grown gems. It’s the best of both worlds."
            },
            {
                type: "heading",
                text: "Conclusion"
            },
            {
                type: "paragraph",
                text: "Choosing an engagement ring is one of the most personal decisions you'll ever make. In 2026, lab-grown aquamarine offers a path that combines breathtaking aesthetics with modern values. Whether you prefer the simplicity of a solitaire or the drama of a halo, this icy-blue treasure is ready to begin your story."
            }
        ],
        relatedPosts: [
            {
                title: "How to Care for Your Aquamarine Jewellery",
                image: "/images/plp_top_promo_1772789597196.png",
                link: "/blog/how-to-care-aquamarine"
            },
            {
                title: "Natural vs Lab-Grown: The Complete Guide",
                image: "/images/mega_aurora_1772788806767.png",
                link: "/blog/natural-vs-lab-grown"
            }
        ]
    };

    return (
        <div className="w-full bg-white font-sans text-[#1e1e1e]">
            {/* Breadcrumbs */}
            <div className="container mx-auto px-4 max-w-4xl py-6">
                <div className="flex items-center gap-2 text-[10px] md:text-[11px] tracking-widest text-gray-400 uppercase">
                    <Link to="/" className="hover:text-black">HOME</Link>
                    <span>/</span>
                    <Link to="/blog" className="hover:text-black">BLOG</Link>
                    <span>/</span>
                    <span className="text-gray-600 truncate">{blogData.title}</span>
                </div>
            </div>

            {/* Header Content */}
            <div className="container mx-auto px-4 max-w-3xl pt-4 pb-12 text-center">
                <span className="text-[10px] md:text-xs tracking-[0.2em] font-medium mb-4 uppercase text-gray-400 block">
                    {blogData.category}
                </span>
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif leading-tight mb-4">
                    {blogData.title}
                </h1>
                <p className="text-gray-400 text-xs md:text-sm tracking-widest uppercase">
                    {blogData.date}
                </p>
            </div>

            {/* Main Image */}
            <div className="container mx-auto px-4 max-w-5xl mb-12">
                <img
                    src={blogData.mainImage}
                    alt={blogData.title}
                    className="w-full h-[300px] md:h-[600px] object-cover rounded-sm shadow-sm"
                />
            </div>

            {/* Post Content */}
            <div className="container mx-auto px-4 max-w-3xl mb-16">
                <div className="prose prose-sm md:prose-lg max-w-none">
                    {blogData.content.map((item, idx) => {
                        if (item.type === "paragraph") {
                            return <p key={idx} className="text-gray-700 leading-relaxed mb-8 text-[15px] md:text-[17px]">{item.text}</p>;
                        }
                        if (item.type === "heading") {
                            return <h2 key={idx} className="font-serif text-2xl md:text-3xl mt-12 mb-6 text-black">{item.text}</h2>;
                        }
                        if (item.type === "subheading") {
                            return <h3 key={idx} className="font-serif text-xl md:text-2xl mt-8 mb-4 text-black">{item.text}</h3>;
                        }
                        if (item.type === "list") {
                            return (
                                <ul key={idx} className="list-disc pl-5 mb-8 space-y-4">
                                    {item.items.map((li, liIdx) => (
                                        <li key={liIdx} className="text-gray-700 leading-relaxed text-[15px] md:text-[17px]" dangerouslySetInnerHTML={{ __html: li }}></li>
                                    ))}
                                </ul>
                            );
                        }
                        return null;
                    })}
                </div>

                {/* Social Share */}
                <div className="border-y border-gray-100 py-8 mt-16 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <span className="text-[11px] tracking-widest font-bold uppercase text-gray-400">SHARE ON:</span>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:text-white hover:bg-[#3b5998] hover:border-[#3b5998] transition-all">
                                <FaFacebookF size={12} />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:text-white hover:bg-[#1da1f2] hover:border-[#1da1f2] transition-all">
                                <FaTwitter size={12} />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:text-white hover:bg-[#bd081c] hover:border-[#bd081c] transition-all">
                                <FaPinterestP size={12} />
                            </a>
                            <a href="#" className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-full text-gray-400 hover:text-white hover:bg-[#0077b5] hover:border-[#0077b5] transition-all">
                                <FaLinkedinIn size={12} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                <div className="mt-20">
                    <h4 className="text-[13px] tracking-[0.3em] font-bold uppercase text-center mb-10 text-black">YOU MAY ALSO LIKE</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {blogData.relatedPosts.map((post, idx) => (
                            <Link key={idx} to={post.link} className="group">
                                <div className="h-[200px] overflow-hidden mb-4 rounded-sm">
                                    <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={post.title} />
                                </div>
                                <h5 className="font-serif text-lg leading-tight group-hover:text-gray-600 transition-colors uppercase tracking-tight">{post.title}</h5>
                                <span className="text-[9px] tracking-widest font-bold uppercase text-gray-400 mt-2 block border-b border-black w-max pb-1">READ MORE</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
