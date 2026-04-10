"use client"
import { useState, useEffect } from "react"

interface Notice {
    name: string
}

interface NoticesCarouselProps {
    notices: Array<Notice>
}

export default function NoticesCarousel({ notices }: NoticesCarouselProps) {
    const [currentIdx, setCurrentIdx] = useState(0);

    const moveSlide = (step: number) => {
        setCurrentIdx((prev) => (prev + step + notices.length) % notices.length)
    }

    const onNextNoticeClick = () => {
        moveSlide(1)
    }

    const onPrevNoticeClick = () => {
        moveSlide(-1)
    }

    return (
        <div className="border border-solid h-[12dvh] overflow-hidden relative">
            <button className="absolute top-1/2 z-10 left-4 -translate-y-1/2" onClick={onNextNoticeClick}>prev</button>
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentIdx * 100}vw)` }}
            >
                {
                    notices.map((notice, idx) => {
                        return (
                            <div key={idx.toString()} className="w-[100dvw] shrink-0">
                                {notice.name}
                            </div>
                        )
                    })
                }
            </div>
            <button className="absolute top-1/2 z-10 right-4 -translate-y-1/2" onClick={onPrevNoticeClick}>next</button>
        </div>
    );
}
