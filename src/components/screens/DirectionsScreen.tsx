import React from 'react';
import { Navigation, MapPin, ExternalLink, ArrowLeft, Footprints, Car, Bike } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { InteractiveMap } from '../common/InteractiveMap';

export const DirectionsScreen: React.FC = () => {
  const { selectedEstablishment, goBack } = useApp();

  if (!selectedEstablishment) {
    return (
      <div className="p-8 text-center bg-[#F8F9F5]">
        <p className="text-[#2D3436]">Estabelecimento não selecionado.</p>
        <button onClick={goBack} className="mt-4 text-[#2D5A27] font-bold">
          Voltar
        </button>
      </div>
    );
  }

  const est = selectedEstablishment;

  const handleOpenExternalMaps = () => {
    const encodedAddress = encodeURIComponent(`${est.name}, ${est.address}`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9F5] flex flex-col justify-between animate-fadeIn">
      {/* Top Header */}
      <div className="bg-white px-4 py-3.5 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 z-20 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={goBack}
            className="w-10 h-10 rounded-full bg-[#F1F3F0] hover:bg-[#E8EFE6] text-[#2D3436] flex items-center justify-center transition-colors cursor-pointer"
          >
            <ArrowLeft size={19} />
          </button>
          <div>
            <h2 className="text-base font-bold text-[#2D3436]">
              Como chegar
            </h2>
            <p className="text-xs text-[#636E72] font-medium truncate max-w-[220px]">
              {est.name}
            </p>
          </div>
        </div>
      </div>

      {/* Large Map Area */}
      <div className="flex-1 relative">
        <InteractiveMap
          height="100%"
          showRoute={true}
          showControls={true}
          destinationAddress={est.address}
          distanceText={`A ${est.distanceMeters} m de você`}
          pins={[{
            id: est.id,
            name: est.name,
            latitude: est.latitude,
            longitude: est.longitude
          }]}
        />

        {/* Transportation Mode Options */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-center">
          <div className="bg-white/95 backdrop-blur-md p-1 rounded-full shadow-md border border-[#E5E7EB] flex gap-1">
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2D5A27] text-white text-xs font-bold shadow-xs">
              <Footprints size={14} />
              <span>4 min a pé</span>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#636E72] hover:bg-[#F1F3F0] text-xs font-bold">
              <Bike size={14} />
              <span>2 min</span>
            </button>
            <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[#636E72] hover:bg-[#F1F3F0] text-xs font-bold">
              <Car size={14} />
              <span>1 min</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Card */}
      <div className="bg-white p-5 rounded-t-[32px] shadow-xl border-t border-[#E5E7EB] space-y-4 z-20">
        <div>
          <h3 className="text-lg font-bold text-[#2D3436]">
            {est.name}
          </h3>
          <p className="text-xs text-[#636E72] flex items-center gap-1.5 mt-1">
            <MapPin size={14} className="text-[#2D5A27] shrink-0" />
            {est.address}
          </p>

          <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-[#F1F3F0] text-[#2D5A27] rounded-full text-xs font-bold border border-[#2D5A27]/20">
            <Navigation size={12} className="text-[#2D5A27]" />
            <span>A {est.distanceMeters} m de você</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleOpenExternalMaps}
          className="w-full py-3.5 px-4 rounded-2xl bg-[#2D5A27] hover:bg-[#1E3F1A] text-white font-bold text-sm shadow-sm transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
        >
          <ExternalLink size={16} />
          Abrir no Google Maps
        </button>
      </div>
    </div>
  );
};
