import Image from "next/image";
import React from "react";
import ProfileImage from "@/icons/profileImage.svg";
import ProfilePic from "@/icons/ProfilePic.svg";
import Verified from "@/icons/Verified.svg";
import { FaTwitter } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import eth from "@/icons/eth.svg";
import ProfileButtonPanel from "./ProfileButtonPanel";
import NFTCard from "./NFTCard";

const Profile = () => {
  return (
    <div>
      <div className="w-full h-[350px] relative">
        <Image src={ProfileImage} alt="" />
        <div className="absolute bottom-0">
          <Image src={ProfilePic} alt="" />
        </div>
        <div className="w-full mt-[50px] px-2.5">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-[30px] font-semibold text-[#04111D]">
                Vaibhav Rajput
              </p>
              {true ? <Image src={Verified} alt="nftCard" /> : <></>}
            </div>
            <div className="flex gap-6 items-center">
              <div className="w-[246px] h-[60px] border border-[#000000] rounded-[10px] text-center text-[20px] font-medium text-black flex flex-col justify-center cursor-pointer">
                Verified your content
              </div>
              <div className="cursor-pointer">
                <FaTwitter className="text-black" />
              </div>
              <div className="cursor-pointer">
                <FiShare className="text-black " />
              </div>
              <div className="cursor-pointer">
                <BsThreeDots className="text-black " />
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Image src={eth} alt="insta" />
            <p className="text-[#505050] font-normal text-xl">0x90b3...Aee3</p>
          </div>
          <ProfileButtonPanel />
          <p className="border border-[#505050] w-full" />
          <div className="grid grid-cols-4 gap-x-9 my-5">
            <NFTCard date="date" isVerified name="name" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
