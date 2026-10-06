export const Input = ({ icon: Icon, ...props }) => {
  return (
    <div className="relative inline-block w-full mb-4">
      {Icon && (
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <Icon size={20} />
        </span>
      )}
      <input
        className={`w-full text-white py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          Icon ? "pl-10" : "pl-3"
        }`}
        {...props}
      />
    </div>
  );
};
