export default function EnergyCard({ listing }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 shadow-lg text-white">
      <h3 className="text-lg font-semibold">{listing?.units || 0} kWh</h3>
      <p className="text-gray-400">Price: {listing?.pricePerUnit || 0} wei/kWh</p>
    </div>
  );
}
