"use client";

import { UsersPetType } from "@/types/auth.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type PetType = UsersPetType;

const MyPetProfile = () => {
  const [filteredProfile, setFilteredProfile] = useState<PetType[]>([]);
  const queryClient = useQueryClient();
  const params = useParams();
  const router = useRouter();

  const id = params?.id || 0;
  const petId = params?.petId || 0;

  const getProfileData = async () => {
    const response = await fetch(`/api/mypage/${id}/mypetprofile`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    const data = response.json();

    return data;
  };
  const {
    data: pet,
    isPending,
    isError
  } = useQuery<UsersPetType[]>({
    queryKey: ["pet"],
    queryFn: getProfileData
  });

  useEffect(() => {
    if (!pet) {
      return;
    }
    const filtered = pet.filter((profile) => {
      return profile.id === petId;
    });
    setFilteredProfile(filtered);
  }, [pet]);

  function toMyPet() {
    router.push(`/mypage/${id}/mypet`);
  }

  const deleteProfile = async (id: string) => {
    const response = await fetch(`/api/mypage/${id}/mypetprofile`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id)
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  };

  const { mutate: deleteMutation } = useMutation<UsersPetType, Error, string>({
    mutationFn: (id) => deleteProfile(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["pet"] })
  });

  const handleDelte = async (id: string) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        deleteMutation(id);
      } catch (error) {
        console.log("삭제에 실패했습니다.", error);
      }
      alert("삭제가 완료되었습니다.");

      toMyPet();
    } else {
      return;
    }
  };
  if (isPending) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  if (isError) {
    return <div className="flex h-screen items-center justify-center">데이터 로딩 실패</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <img
        className="h-[170px] w-[170px] items-center justify-center rounded-full bg-lime-300 object-cover"
        src={filteredProfile[0]?.petImage || "..."}
        alt=""
      />
      <div className="my-auto flex flex-col items-start justify-center rounded-lg px-[15px] lg:px-0">
        <br />
        <span className="text-[24px] font-bold text-[#000000] sm:text-[20px]">이름: {filteredProfile[0]?.petName}</span>
        <br />
        <span className="text-[24px] font-bold text-[#000000] sm:text-[20px]">
          대분류: {filteredProfile[0]?.majorClass}
        </span>
        <br />
        <span className="text-[24px] font-bold text-[#000000] sm:text-[20px]">
          소분류: {filteredProfile[0]?.minorClass}
        </span>
        <br />
        <span className="text-[24px] font-bold text-[#000000] sm:text-[20px]">나이: {filteredProfile[0]?.age}</span>
        <br />
        <span className="text-[24px] font-bold text-[#000000] sm:text-[20px]">
          성별: {filteredProfile[0]?.male_female}
        </span>
        <br />
        <span className="text-[24px] font-bold text-[#000000] sm:text-[20px]">
          중성화 여부: {filteredProfile[0]?.neutralized}
        </span>
        <br />
        <span className="text-[24px] font-bold text-[#000000] sm:text-[20px]">
          무게: {filteredProfile[0]?.weight} kg
        </span>
        <br />
        <div className="max-w-[300px] break-words text-[24px] font-bold text-[#000000] sm:text-[20px]">
          의료기록: {filteredProfile[0]?.medicalRecords}
        </div>
        <br />
        <div className="max-w-[300px] break-words text-[24px] font-bold text-[#000000] sm:text-[20px]">
          자기소개: {filteredProfile[0]?.introduction}
        </div>
      </div>
      <div className="mt-5 flex gap-[15px]">
        <Link
          href={`/mypage/${id}/mypet`}
          className="rounded border border-[#C9C9C9] bg-[#42E68A] px-4 py-2 text-center text-[16px] font-semibold text-black"
        >
          뒤로가기
        </Link>
        <Link
          href={`/mypage/${id}/mypet/fixmypetprofile/${filteredProfile[0]?.id}`}
          className="rounded border border-[#C9C9C9] bg-[#42E68A] px-4 py-2 text-center text-[16px] font-semibold text-black"
        >
          변경하기
        </Link>
        <button
          className="rounded border border-[#C9C9C9] bg-[#42E68A] px-4 py-2 text-center text-[16px] font-semibold text-black"
          onClick={() => handleDelte(filteredProfile[0]?.id)}
        >
          삭제하기
        </button>
      </div>
    </div>
  );
};

export default MyPetProfile;
