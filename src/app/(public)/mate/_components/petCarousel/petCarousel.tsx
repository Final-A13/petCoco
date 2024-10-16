"use client";

import React, { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DotButton, useDotButton } from "./components/MyPetCarouselDotButtons";
import PetItem from "../../posts/_components/petItem";
import LoadingComponent from "@/components/loadingComponents/Loading";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../petCarousel/styles/css/petCarousel.module.css";

import { UsersPetType } from "@/types/usersPet.type";
import { MatePostAllType } from "@/types/mate.type";
import { EmblaOptionsType } from "embla-carousel";
import { queryKeys } from "@/lib/queryKeys";
import useEmblaSelect from "@/hooks/useEmblaSelect";

type PropType = {
  post: MatePostAllType;
  slides: number[];
  options?: EmblaOptionsType;
};

const PetCarousel: React.FC<PropType> = (props) => {
  const { slides, options, post } = props;
  const petIds = post.pet_id ?? [];

  const {
    data: petData,
    isPending,
    error
  } = useQuery<UsersPetType[]>({
    queryKey: queryKeys.usersPets(petIds),
    queryFn: async () => {
      const response = await fetch(`/api/mate/pets?ids=${petIds}`);
      const data = await response.json();
      //  console.log(data);
      return data;
    }
  });

  const autoplayOptions = {
    delay: 10000,
    stopOnInteraction: false
  };
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay(autoplayOptions)]);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  useEmblaSelect(emblaApi);

  if (isPending)
    return (
      <div>
        {" "}
        <LoadingComponent />
      </div>
    );

  if (error) return <div>동물 데이터를 불러오지 못했어요</div>;

  return (
    <section className={`${styles.embla}`}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {petData.map((pet) => (
            <div key={pet.id} className={`${styles.embla__slide}`}>
              <PetItem pet={pet} />
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.embla__dots}`}>
        {scrollSnaps.map((_, index) => (
          <DotButton key={index} onClick={() => onDotButtonClick(index)} selected={index === selectedIndex} />
        ))}
      </div>
    </section>
  );
};

export default PetCarousel;
