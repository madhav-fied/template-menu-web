"use client"
import { useState } from "react"

interface Notice {
    name: string
    image?: string
}

interface NoticesCarouselProps {
    notices: Array<Notice>
}

export default function NoticesCarousel({ notices }: NoticesCarouselProps) {
    const [currentIdx, setCurrentIdx] = useState(0);

    const moveSlide = (step: number) => {
        setCurrentIdx((prev) => (prev + step + notices.length) % notices.length)
    }

    return (
        <div className="px-4 py-4 border-b border-espresso/10">
            <div className="relative overflow-hidden">
                {/* Carousel track */}
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIdx * 100}%)` }}
                >
                    {notices.map((notice, idx) => (
                        <div key={idx} className="w-full shrink-0 px-1">
                            <div
                                className="relative h-28 rounded-2xl overflow-hidden bg-espresso"
                                style={notice.image ? { backgroundImage: `url(${notice.image})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
                            >
                                {/* Gradient overlay — heavier on the left for text legibility */}
                                <div className="absolute inset-0 bg-gradient-to-r from-espresso/80 via-espresso/40 to-transparent" />
                                <div className="relative z-10 h-full flex flex-col justify-start p-4 pt-3">
                                    <p className="px-4 py-2 text-m font-medium text-cream leading-snug max-w-[85%]">
                                        {notice.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Prev / Next buttons */}
                <button
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 text-cream/80 hover:bg-black/50 hover:text-cream transition-all text-xl leading-none"
                    onClick={() => moveSlide(-1)}
                    aria-label="Previous notice"
                >
                    ‹
                </button>
                <button
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 flex items-center justify-center rounded-full bg-black/30 text-cream/80 hover:bg-black/50 hover:text-cream transition-all text-xl leading-none"
                    onClick={() => moveSlide(1)}
                    aria-label="Next notice"
                >
                    ›
                </button>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 pt-2">
                {notices.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-1.5 rounded-full transition-all ${idx === currentIdx ? "bg-gold-light w-3" : "bg-espresso/20 w-1.5"
                            }`}
                        aria-label={`Go to notice ${idx + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
