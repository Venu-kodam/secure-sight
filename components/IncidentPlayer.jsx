'use client';

import Image from "next/image";
import record_icon from "@/public/camera-record-icon.svg"
import calendar_icon from "@/public/calendar-icon.svg"
import main_video from "@/public/main-video.png"
import camera_2 from "@/public/camera-2.jpg"
import camera_3 from "@/public/camera-3.jpg"
export default function IncidentPlayer() {
  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 min-h-fit">
      {/* Main Video Feed */}
      <div className="relative bg-black rounded-lg overflow-hidden">
        <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          {/* Main video feed with sample image */}
          <Image
            src={main_video}
            alt="CCTV Camera 01"
            className="object-cover"
            fill
          />
        </div>

        {/* Timestamp overlay */}
        <div className="absolute top-4 left-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded text-sm">
          <div className="flex items-center gap-2">
            <Image src={calendar_icon} alt="calendar icon" width={14} />
            <span>11/7/2025 - 03:12:37</span>
          </div>
        </div>

        {/* Camera label */}
        <div className="absolute bottom-4 left-4 bg-black text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2">
          <Image src={record_icon} alt="record icon" width={18} />
          <span>Camera - 01</span>
        </div>

        {/* Camera Strips - Bottom Right Overlay */}
        <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
          <div className="relative rounded-lg overflow-hidden cursor-pointer w-40 h-28">
            <p className="px-4 py-1 bg-black absolute top-0 z-20 left-0 right-0  text-white text-sm">Camera - 02</p>
            <Image
              src={camera_2}
              alt="CCTV Camera 02"
              fill
              className="w-full h-fit"
            />
          </div>

          <div className="relative  rounded-lg overflow-hidden cursor-pointer w-40 h-28">
            <p className="px-4 py-1 bg-black absolute top-0 z-20 left-0 right-0 text-white text-sm">Camera - 03</p>
            <Image
              src={camera_3}
              alt="CCTV Camera 02"
              fill
              className="w-full h-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
