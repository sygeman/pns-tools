import { MapView } from "./map-view";

export default function Home() {
  return (
    <div className="absolute size-full">
      <div className="relative overflow-hidden">
        <MapView />
      </div>
      <div className="absolute bottom-0 w-full flex justify-center items-center backdrop-blur-xs bg-black/50 h-20">
        <div className="h-10 px-4 backdrop-blur-xs bg-[#333173] rounded-sm flex justify-center items-center">
          ШК
        </div>
      </div>
    </div>
  );
}
