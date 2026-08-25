import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Plus, Minus, Layers } from 'lucide-react';

interface InteractiveMapProps {
  centerLat?: number;
  centerLng?: number;
  zoom?: number;
  height?: string;
  pins?: Array<{
    id: string;
    name: string;
    category?: string;
    latitude: number;
    longitude: number;
    isSelected?: boolean;
  }>;
  onPinClick?: (pinId: string) => void;
  onLocationSelect?: (coords: { lat: number; lng: number; addressSuggestion?: string }) => void;
  showRoute?: boolean;
  showControls?: boolean;
  interactive?: boolean;
  destinationAddress?: string;
  distanceText?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  height = '240px',
  pins = [],
  onPinClick,
  onLocationSelect,
  showRoute = false,
  showControls = true,
  interactive = true,
  distanceText
}) => {
  const [zoomLevel, setZoomLevel] = useState(15);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !onLocationSelect) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Approximate relative coordinates
    const lat = -23.55052 + (y / rect.height - 0.5) * 0.01;
    const lng = -46.633308 + (x / rect.width - 0.5) * 0.01;
    
    setSelectedLocation({ lat, lng });
    onLocationSelect({
      lat,
      lng,
      addressSuggestion: `Rua do Bairro, ${Math.floor(Math.random() * 400) + 50}`
    });
  };

  return (
    <div
      className="relative w-full rounded-2xl overflow-hidden shadow-inner border border-slate-200 bg-[#e8ece9] select-none"
      style={{ height }}
      onClick={handleMapClick}
    >
      {/* Stylized vector map background pattern */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#e5eee6" />
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d5e2d7" strokeWidth="1" />
          </pattern>
        </defs>

        {/* Base ground & parks */}
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Parks / Green Areas */}
        <circle cx="20%" cy="30%" r="45" fill="#cbe6ce" opacity="0.8" />
        <rect x="70%" y="60%" width="90" height="60" rx="15" fill="#cbe6ce" opacity="0.8" />
        
        {/* Main Avenues and Streets */}
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#ffffff" strokeWidth="14" />
        <line x1="0" y1="45%" x2="100%" y2="45%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" />

        <line x1="48%" y1="0" x2="48%" y2="100%" stroke="#ffffff" strokeWidth="14" />
        <line x1="48%" y1="0" x2="48%" y2="100%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6,6" />

        {/* Secondary streets */}
        <line x1="15%" y1="0" x2="15%" y2="100%" stroke="#ffffff" strokeWidth="8" />
        <line x1="82%" y1="0" x2="82%" y2="100%" stroke="#ffffff" strokeWidth="8" />
        <line x1="0" y1="20%" x2="100%" y2="20%" stroke="#ffffff" strokeWidth="8" />
        <line x1="0" y1="75%" x2="100%" y2="75%" stroke="#ffffff" strokeWidth="8" />

        {/* Route visualization path if showRoute is true */}
        {showRoute && (
          <path
            d="M 120 180 L 195 180 L 195 110 L 250 110"
            fill="none"
            stroke="#16a34a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="8,4"
            className="animate-pulse"
          />
        )}
      </svg>

      {/* Street labels */}
      <div className="absolute top-2 left-4 text-[10px] font-semibold text-slate-500 tracking-wider uppercase bg-white/70 px-2 py-0.5 rounded backdrop-blur-xs">
        Bairro Jardim Primavera
      </div>

      {/* User Location Beacon */}
      <div className="absolute left-[30%] bottom-[25%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none">
        <div className="relative flex items-center justify-center">
          <span className="animate-ping absolute inline-flex h-7 w-7 rounded-full bg-blue-400 opacity-60"></span>
          <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-md"></div>
        </div>
        <span className="mt-1 text-[10px] font-bold bg-white text-blue-700 px-1.5 py-0.5 rounded-full shadow-xs border border-blue-100">
          Você está aqui
        </span>
      </div>

      {/* Destination Pin if showRoute */}
      {showRoute && (
        <div className="absolute left-[62%] top-[35%] -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center animate-bounce">
          <div className="bg-emerald-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
            <MapPin size={20} className="fill-white" />
          </div>
        </div>
      )}

      {/* Pins from props */}
      {pins.map((pin, i) => {
        const posX = 35 + ((i * 18) % 45);
        const posY = 30 + ((i * 22) % 45);

        return (
          <button
            key={pin.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPinClick && onPinClick(pin.id);
            }}
            style={{ left: `${posX}%`, top: `${posY}%` }}
            className="absolute -translate-x-1/2 -translate-y-full z-15 group cursor-pointer"
          >
            <div className="bg-emerald-700 text-white p-1.5 rounded-full shadow-md hover:scale-125 transition-transform border-2 border-white">
              <MapPin size={16} className="fill-emerald-100" />
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-medium py-0.5 px-2 rounded whitespace-nowrap shadow pointer-events-none">
              {pin.name}
            </div>
          </button>
        );
      })}

      {/* Manual Pin for Sharing New Place */}
      {selectedLocation && !showRoute && (
        <div
          className="absolute -translate-x-1/2 -translate-y-full z-30 flex flex-col items-center animate-bounce pointer-events-none"
          style={{ left: '50%', top: '50%' }}
        >
          <div className="bg-emerald-600 text-white p-2 rounded-full shadow-lg border-2 border-white">
            <MapPin size={22} className="fill-white" />
          </div>
          <span className="text-[10px] font-bold bg-white text-emerald-800 px-2 py-0.5 rounded shadow mt-1">
            Local selecionado
          </span>
        </div>
      )}

      {/* Map Controls */}
      {showControls && (
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel(prev => Math.min(prev + 1, 18));
            }}
            className="w-8 h-8 rounded-lg bg-white shadow-md text-slate-700 hover:text-emerald-700 flex items-center justify-center border border-slate-100 font-bold transition-colors cursor-pointer"
          >
            <Plus size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setZoomLevel(prev => Math.max(prev - 1, 10));
            }}
            className="w-8 h-8 rounded-lg bg-white shadow-md text-slate-700 hover:text-emerald-700 flex items-center justify-center border border-slate-100 font-bold transition-colors cursor-pointer"
          >
            <Minus size={16} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-8 h-8 rounded-lg bg-white shadow-md text-slate-700 hover:text-emerald-700 flex items-center justify-center border border-slate-100 transition-colors cursor-pointer"
          >
            <Compass size={16} />
          </button>
        </div>
      )}

      {/* Distance overlay tag if available */}
      {distanceText && (
        <div className="absolute left-3 bottom-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-md border border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
          <Navigation size={13} className="text-emerald-600" />
          <span>{distanceText}</span>
        </div>
      )}
    </div>
  );
};
