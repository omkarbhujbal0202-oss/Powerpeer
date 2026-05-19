export default function QRBadge({ value }) {
  return (
    <div className="bg-white p-2 rounded inline-block">
      {/* QRCode goes here */}
      <span className="text-black text-xs">QR: {value}</span>
    </div>
  );
}
