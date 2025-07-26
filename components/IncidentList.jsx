'use client';

import { useState, useEffect } from 'react';
import warning_icon from "@/public/warning-icon.svg"
import group_icon from "@/public/group-icon.svg"
import correct_icon from "@/public/correct-icon.svg"
import cameras_icon from "@/public/cameras-icon.svg"
import time_icon from "@/public/time-icon.svg"
import main_video from "@/public/main-video.png"
import camera_2 from "@/public/camera-2.jpg"
import camera_3 from "@/public/camera-3.jpg"
import Image from 'next/image';

export default function IncidentList() {
  const [incidents, setIncidents] = useState([]);
  const [resolvedCount, setResolvedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [resolving, setResolving] = useState({});

  useEffect(() => {
    fetchIncidents();
    fetchResolvedCount();
  }, []);

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/incidents?resolved=false');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Ensure data is an array
      if (Array.isArray(data)) {
        setIncidents(data);
      } else {
        console.error('Expected array but got:', typeof data, data);
        // Fallback to mock data if API returns invalid format
        setIncidents(getMockIncidents());
      }
    } catch (error) {
      console.error('Error fetching incidents:', error);
      setError('Failed to load incidents');
      // Fallback to mock data on error
      setIncidents(getMockIncidents());
    } finally {
      setLoading(false);
    }
  };

  const fetchResolvedCount = async () => {
    try {
      const response = await fetch('/api/incidents?resolved=true');
      
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setResolvedCount(data.length);
        }
      }
    } catch (error) {
      console.error('Error fetching resolved count:', error);
      // Fallback to mock count
      setResolvedCount(4);
    }
  };

  // Mock data fallback
  const getMockIncidents = () => [
    {
      id: '1',
      type: 'Unauthorised Access',
      camera: { location: 'Shop Floor Camera A' },
      tsStart: new Date('2025-07-07T14:35:00Z'),
      tsEnd: new Date('2025-07-07T14:37:00Z'),
      resolved: false
    },
    {
      id: '2',
      type: 'Gun Threat',
      camera: { location: 'Vault' },
      tsStart: new Date('2025-07-07T16:15:00Z'),
      tsEnd: new Date('2025-07-07T16:17:00Z'),
      resolved: false
    },
    {
      id: '3',
      type: 'Unauthorised Access',
      camera: { location: 'Entrance' },
      tsStart: new Date('2025-07-07T15:20:00Z'),
      tsEnd: new Date('2025-07-07T15:22:00Z'),
      resolved: false
    }
  ];

  const resolveIncident = async (id) => {
    setResolving(prev => ({ ...prev, [id]: true }));

    try {
      const response = await fetch(`/api/incidents/${id}/resolve`, {
        method: 'PATCH',
      });

      if (response.ok) {
        // Optimistic UI update - remove the incident from the list
        setIncidents(prev => prev.filter(incident => incident.id !== id));
        // Update resolved count
        setResolvedCount(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error resolving incident:', error);
    } finally {
      setResolving(prev => ({ ...prev, [id]: false }));
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'Unauthorised Access':
        return (
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.33331 3.43333V12.7667C3.33331 12.9435 3.40355 13.113 3.52858 13.2381C3.6536 13.3631 3.82317 13.4333 3.99998 13.4333H5.99998V12.1H4.66665V4.1H5.99998V2.76667H3.99998C3.82317 2.76667 3.6536 2.8369 3.52858 2.96193C3.40355 3.08695 3.33331 3.25652 3.33331 3.43333ZM12.828 2.78667L7.49465 1.45333C7.39639 1.42883 7.29384 1.42703 7.19479 1.44807C7.09574 1.46911 7.00278 1.51244 6.92297 1.57477C6.84316 1.6371 6.7786 1.71679 6.73418 1.8078C6.68977 1.89881 6.66667 1.99873 6.66665 2.1V14.1C6.66641 14.2014 6.68934 14.3014 6.73367 14.3926C6.77801 14.4837 6.84257 14.5635 6.92245 14.6259C7.00233 14.6883 7.0954 14.7316 7.19457 14.7525C7.29373 14.7734 7.39637 14.7714 7.49465 14.7467L12.828 13.4133C12.9723 13.3773 13.1004 13.2942 13.1919 13.177C13.2835 13.0598 13.3333 12.9154 13.3333 12.7667V3.43333C13.3333 3.28463 13.2835 3.1402 13.1919 3.02303C13.1004 2.90585 12.9723 2.82265 12.828 2.78667ZM9.99998 8.22533C9.9923 8.39699 9.91871 8.55906 9.79453 8.67782C9.67034 8.79657 9.50514 8.86284 9.33331 8.86284C9.16149 8.86284 8.99628 8.79657 8.8721 8.67782C8.74792 8.55906 8.67432 8.39699 8.66665 8.22533V7.974C8.66673 7.79719 8.73706 7.62765 8.86214 7.50269C8.98723 7.37773 9.15684 7.30758 9.33365 7.30767C9.51046 7.30775 9.67999 7.37808 9.80495 7.50316C9.92992 7.62825 10.0001 7.79786 9.99998 7.97467V8.22533Z" fill="#F97316" />
          </svg>
        );
      case 'Gun Threat':
        return (
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.66668 3.63334H15.3333V6.30001H14.6667V6.96667H10.6667C10.4899 6.96667 10.3203 7.03691 10.1953 7.16194C10.0702 7.28696 10 7.45653 10 7.63334V8.30001C10 8.65363 9.85953 8.99277 9.60948 9.24282C9.35944 9.49287 9.0203 9.63334 8.66668 9.63334H6.41334C6.16001 9.63334 5.92668 9.78001 5.81334 10.0067L4.18001 13.2667C4.06668 13.4933 3.84001 13.6333 3.58668 13.6333H1.33334C1.33334 13.6333 -0.666658 13.6333 2.00001 9.63334C2.00001 9.63334 4.00001 6.96667 1.33334 6.96667V3.63334H2.00001L2.33334 2.96667H4.33334L4.66668 3.63334ZM9.33334 8.30001V7.63334C9.33334 7.45653 9.2631 7.28696 9.13808 7.16194C9.01306 7.03691 8.84349 6.96667 8.66668 6.96667H8.00001C8.00001 6.96667 7.33334 7.63334 8.00001 8.30001C7.64639 8.30001 7.30725 8.15953 7.0572 7.90948C6.80715 7.65944 6.66668 7.3203 6.66668 6.96667C6.48986 6.96667 6.3203 7.03691 6.19527 7.16194C6.07025 7.28696 6.00001 7.45653 6.00001 7.63334V8.30001C6.00001 8.47682 6.07025 8.64639 6.19527 8.77141C6.3203 8.89644 6.48986 8.96667 6.66668 8.96667H8.66668C8.84349 8.96667 9.01306 8.89644 9.13808 8.77141C9.2631 8.64639 9.33334 8.47682 9.33334 8.30001Z" fill="#EF4444" />
          </svg>
        );
      case 'Face Recognised':
        return (
          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg p-4 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-400">Loading incidents...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#1a1a1a] rounded-lg p-4 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="text-red-400 text-center">
            <div className="mb-2">Error loading incidents</div>
            <button
              onClick={fetchIncidents}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a1a1a] rounded-lg p-4 min-h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Image src={warning_icon} alt='warning-icon' width={30} height={24} />
          <span className="text-white font-semibold">{incidents.length} Unresolved Incidents</span>
        </div>
        <div className="flex items-center space-x-2">
          <Image src={group_icon} alt='group-icon' width={70} height={20} />
          <Image src={correct_icon} alt='correct-icon' width={20} height={20} />
          <span className="text-white text-sm border border-gray-600 rounded-full px-4 py-1">{resolvedCount}  resolved incidents</span>
        </div>
      </div>


      {/* Incident List */}
      <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto hide-scrollbar">
        {incidents && incidents.length > 0 ? (
          incidents.map((incident) => (
            <div
              key={incident.id}
              className={`bg-[#2a2a2a] rounded-lg p-3 transition-opacity duration-300 ${resolving[incident.id] ? 'opacity-50' : ''
                }`}
            >
              <div className="flex items-center space-x-3">
                {/* Thumbnail */}
                <div className="w-30 h-16 cursor-pointer bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Image
                    src={incident?.thumbnailUrl || main_video}
                    alt='incident-images'
                    width={120}
                    height={64}
                    className='object-cover rounded-lg'
                  />
                </div>

                {/* Incident Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getIncidentIcon(incident.type)}
                    <span className="text-white font-medium truncate">{incident.type}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Image src={cameras_icon} alt='camera-icon' />
                    <div className="text-gray-400 text-sm mb-1">{incident.camera?.location || 'Unknown Location'}</div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Image src={time_icon} alt='timeicon' />
                    <div className="text-gray-500 text-xs">
                      {formatTime(incident.tsStart)} - {formatTime(incident.tsEnd)} on {formatDate(incident.tsStart)}
                    </div>
                  </div>
                </div>

                {/* Resolve Button */}
                <button
                  onClick={() => resolveIncident(incident.id)}
                  disabled={resolving[incident.id]}
                  className="text-[#FFCC00] cursor-pointer disabled:bg-gray-600 px-3 py-1 rounded text-sm transition-colors"
                >
                  {resolving[incident.id] ? 'Resolving...' : 'Resolve  >'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            No unresolved incidents
          </div>
        )}
      </div>
    </div >
  );
}
