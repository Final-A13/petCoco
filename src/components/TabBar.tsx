"use client";
import { useAuthStore } from "@/zustand/useAuth";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TabBar: React.FC = () => {
  const { user } = useAuthStore((state) => ({
    user: state.user
  }));
  const pathname = usePathname();

  const isPathActive = (path: string): boolean => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const getImageSrc = (path: string, defaultSrc: string, activeSrc: string): string => {
    return isPathActive(path) ? activeSrc : defaultSrc;
  };

  const getTextColor = (path: string): string => {
    return isPathActive(path) ? "#8E6EE8" : "#292826";
  };

  // const getImageSrc = (path: string, defaultSrc: string, activeSrc: string): string => {
  //   return pathname === path ? activeSrc : defaultSrc;
  // };

  // const getTextColor = (path: string): string => {
  //   return pathname === path ? "#8E6EE8" : "#292826";
  // };

  const menuItems = [
    { path: "/", label: "홈", defaultIcon: "/assets/svg/Kenner.svg", activeIcon: "/assets/svg/ActiveKenner.svg" },
    {
      path: "/community2",
      label: "커뮤니티",
      defaultIcon: "/assets/svg/dog.svg",
      activeIcon: "/assets/svg/Activedog.svg"
    },
    {
      path: "/mate",
      label: "산책 메이트",
      defaultIcon: "/assets/svg/paw.svg",
      activeIcon: "/assets/svg/Activepaw.svg"
    },
    {
      path: "/message/list",
      label: "채팅",
      defaultIcon: "/assets/svg/chat(message).svg",
      activeIcon: "/assets/svg/Activechat(message).svg"
    },
    {
      path: `/mypage2/${user?.id}`,
      label: "마이페이지",
      defaultIcon: "/assets/svg/my.svg",
      activeIcon: "/assets/svg/Activemy.svg"
    }
  ];

  // if (pathname === "/message" || pathname === "/message/list") {
  //   return null;
  // }

  const isMessagePath = pathname.startsWith("/message");
  const isMatePath = pathname.startsWith("/mate");
  const isCommunityPath = pathname.startsWith("/community2");

  return (
    <nav className="${isMessagePath ? 'hidden lg:flex' : 'flex'} fixed bottom-0 z-40 w-full max-w-[420px] border border-t-bgGray500 bg-white bg-opacity-80 px-2 pb-[0.7rem] pt-[0.3rem] lg:left-0 lg:top-0 lg:h-full lg:w-[180px] lg:max-w-none lg:flex-col lg:justify-start lg:border-r lg:border-t-0 lg:pt-[5rem]">
      <div className="lg:flex lg:h-full lg:flex-col lg:justify-between">
        <div className="flex justify-between gap-x-[1.2rem] px-[0.8rem] py-[0.2rem] lg:flex-col lg:items-start lg:gap-y-[2rem]">
          {menuItems.map((item) => (
            <Link key={item.path} href={item.path} passHref>
              <div className="flex flex-col items-center justify-center gap-y-[0.2rem] lg:flex-row lg:gap-x-[1rem]">
                <Image
                  src={getImageSrc(item.path, item.defaultIcon, item.activeIcon)}
                  alt={item.label}
                  width={24}
                  height={24}
                  priority
                />
                <p className="text-center text-[0.61863rem] lg:text-base" style={{ color: getTextColor(item.path) }}>
                  {item.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {isMatePath ? (
          <div className="hidden lg:mb-10 lg:block">
            <div className="flex w-full flex-col gap-4 text-center text-[0.61863rem] text-base">
              <Link href="/mate/posts" className="cursor-pointer rounded-md bg-background p-2">
                글쓰기
              </Link>
              <Link href="/mate/filter" className="cursor-pointer rounded-md bg-gray-200 p-2">
                필터
              </Link>
            </div>
          </div>
        ) : null}

        {isCommunityPath ? (
          <div className="hidden lg:mb-10 lg:block">
            <div className="flex w-full flex-col gap-4 text-center text-[0.61863rem] text-base">
              <Link href="/community2/createPost" className="cursor-pointer rounded-md bg-background p-2">
                글쓰기
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default TabBar;
