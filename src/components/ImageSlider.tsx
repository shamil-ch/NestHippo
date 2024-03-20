"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react"
import { Swiper, 
  SwiperSlide
} from 'swiper/react'
import "swiper/css"
import "swiper/css/pagination"
import type SwiperType from 'swiper'
import { Pagination } from "swiper/modules"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface ImageSliderProps {
    urls: string[]
}

const ImageSlider = ({ urls }: ImageSliderProps) => {

  const [ swiper, setSwiper ] = useState<null | SwiperType>(null)

  const [ activeIndex, setActiveIndex ] = useState(0)

  const [ slideConfig, setSlideConfig ] = useState({
    isBegining: true,
    isEnd: activeIndex === (urls.length ?? 0) -1,
  })

  useEffect(() => {
    swiper?.on("slideChange", ({ activeIndex }) => {
      setActiveIndex(activeIndex)
      setSlideConfig({
        isBegining: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) -1
      })
    })
  }, [swiper, urls])

    const activeStyles = 
      "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square h-8 w-8 z-50 place-items-center rounded-full border-2 bg-white"

      const inactiveStyles = "hidden text-gray-400"

  return (
    <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
        <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">

          {/* Right arrow button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                swiper?.slideNext()
              }} 
              className={cn(
                activeStyles, 
                "right-3 transition", 
                {
                  [inactiveStyles] : slideConfig.isEnd,
                  "hover:bg-primary-300 text-primary-800 opacity-100": 
                    !slideConfig.isEnd,
                }
              )}
            aria-label="next image"
            >
              <ChevronRight className="h-4 w-4 text-zinc-700" />{' '}
            </button>

            {/* Left arrow button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                swiper?.slidePrev()
              }} 
              className={cn(
                activeStyles, 
                "left-3 transition", 
                {
                  [inactiveStyles] : slideConfig.isBegining,
                  "hover:bg-primary-300 text-primary-800 opacity-100": 
                    !slideConfig.isBegining,
                }
              )}
            aria-label="previous image"
            >
              <ChevronRight className="h-4 w-4 text-zinc-700" />{' '}
            </button>
            
        </div>

        <Swiper 
          pagination = {{
            renderBullet: (_, className) => {
              return ` <span class="rounded-full transition ${className}"></span> `
            }
          }}
          onSwiper={(swiper) => setSwiper(swiper)} 
          spaceBetween={50}
          modules={[Pagination]}
          slidesPerView={1}
          className="h-full w-full"
        >
          {urls.map((url, i) => (
            <SwiperSlide 
              key={i} 
              className="-z-10 relative h-full w-full">
              <Image 
                fill
                loading="eager"
                className="-z-10 h-full w-full object-cover object-center"
                src={url}
                alt="Product Image"
              />
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  )
}

export default ImageSlider