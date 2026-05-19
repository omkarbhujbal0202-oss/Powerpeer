export default function StatusBadge({ status }) {
  return (
    <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full uppercase">
      {status || "UNKNOWN"}
    </span>
  );
}
