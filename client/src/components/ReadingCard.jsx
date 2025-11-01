export const ReadingCard = ({ label, value, unit, icon, bgColor = 'bg-blue-50' }) => {
  return (
    <div className={`${bgColor} rounded-lg p-4 md:p-6 flex flex-col items-center justify-center`}>
      <div className="text-gray-600 text-sm md:text-base mb-2">{label}</div>
      <div className="text-3xl md:text-4xl font-bold text-gray-900">
        {typeof value === 'number' ? value.toFixed(1) : value}
      </div>
      <div className="text-gray-500 text-xs md:text-sm">{unit}</div>
    </div>
  );
};
