import Navbar from '../components/Navbar';
import IncidentPlayer from '../components/IncidentPlayer';
import IncidentList from '../components/IncidentList';

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#151515] to-[#000000] flex flex-col">
      {/* Navbar */}
      <Navbar />
      
      {/* Main Content - with top padding to account for fixed navbar */}
      <div className="flex-1 flex p-6 space-x-6 pt-24">
        {/* Incident Player (Left) */}
        <div className="flex-1">
          <IncidentPlayer />
        </div>
        
        {/* Incident List (Right) */}
        <div className="w-140">
          <IncidentList />
        </div>
      </div>
    </div>
  );
}
