// Header 임시 파일

import Link from "next/link";

const Header = () => {
  return (
    <header className="mb-6 w-full items-center bg-[#67C047] px-10 py-6 text-white">
      <div className="flex justify-center gap-6">
        <Link href={"/"}>
          <p>홈(임시 헤더)</p>
        </Link>

        <Link href={"/community"}>
          <p>커뮤니티</p>
        </Link>
      </div>
    </header>
  );
};

export default Header;
