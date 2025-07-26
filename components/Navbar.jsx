'use client';
import Image from "next/image";
import logo from "@/public/logo.svg"
import profile from "@/public/profile-icon.svg"
import dashboardIcon from "@/public/dashboard-icon.svg"
import camerasIcon from "@/public/cameras-icon.svg"
import usersIcon from "@/public/users-icon.svg"
import settingsIcon from "@/public/settings-icon.svg"
import errorIcon from "@/public/error-icon.svg"
import Link from "next/link";
const navItems = [
  {
    label:"Dashboard",
    icon: dashboardIcon
  },
  {
    label:"Cameras",
    icon:camerasIcon
  },
  {
    label:"Scenes",
    icon:settingsIcon
  },
  {
    label:"Incidents",
    icon: errorIcon
  },
  {
    label:"Users",
    icon: usersIcon
  },
  
]
export default function Navbar() {
  return (
    // <nav className="bg-[#1a1a1a] border-b border-gray-800 px-6 py-4">
    //   <div className="flex items-center justify-between">
    //     {/* Brand */}
    //     <div className="flex items-center space-x-3">
    //       <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
    //         <span className="text-white font-bold text-lg">M</span>
    //       </div>
    //       <span className="text-white font-bold text-xl">MANDLACX</span>
    //     </div>

    //     {/* Navigation Links */}
    //     <div className="flex items-center space-x-8">
    //       <a href="#" className="flex items-center space-x-2 text-blue-400 hover:text-white transition-colors">
    //         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    //           <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
    //         </svg>
    //         <span>Dashboard</span>
    //       </a>
    //       <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
    //         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    //           <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
    //         </svg>
    //         <span>Cameras</span>
    //       </a>
    //       <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
    //         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    //           <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
    //         </svg>
    //         <span>Scenes</span>
    //       </a>
    //       <a href="#" className="flex items-center space-x-2 text-red-400 hover:text-white transition-colors">
    //         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    //           <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    //         </svg>
    //         <span>Incidents</span>
    //       </a>
    //       <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
    //         <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
    //           <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    //         </svg>
    //         <span>Users</span>
    //       </a>
    //     </div>

    //     {/* User Profile */}
    //     <div className="flex items-center space-x-3">
    //       <div className="text-right">
    //         <div className="text-white font-medium">Mohammed Ajhas</div>
    //         <div className="text-gray-400 text-sm">ajhas@mandlac.com</div>
    //       </div>
    //       <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
    //         <span className="text-white font-medium">MA</span>
    //       </div>
    //       <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
    //         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    //       </svg>
    //     </div>
    //   </div>
    // </nav>

    <div className="fixed top-0 w-full text-white backdrop-blur-md z-50 border-b">
      <div className="px-8 py-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image src={logo} alt="logo" width={21} height={26}/>
          <h1 className="text-lg font-normal">MANDLAC <span className="font-bold">X</span></h1>
        </div>
        <div className="flex items-center gap-8">
          {navItems.map((item)=>(
            <a key={item.label} className="flex items-center cursor-pointer gap-2">
              <Image src={item.icon} alt={item.label} width={24} height={24}/>
              <span className="text-base font-medium">{item.label}</span>
            </a>
          ))}
        </div>
        <div className="flex items-center cursor-pointer gap-4">
          <Image src={profile} alt="profile icon" width={32} height={32}/>
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold">Venu Kodam</span>
            <span className="font-normal text-gray-300">venu@mandlac.com</span>
          </div>
        </div>
      </div>

    </div>
  );
}
