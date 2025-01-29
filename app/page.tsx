import { MapView } from "./map-view";

export default function Home() {
  return (
    <div className="absolute size-full flex">
      <div className="relative overflow-hidden">
        <MapView />
      </div>
      {/* <div className="w-90">Tools</div> */}
    </div>
  );
}
