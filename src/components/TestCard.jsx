const TestCard = ({ title, desc, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-6 rounded-2xl bg-gray-900/70 backdrop-blur-md border border-gray-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <h3 className="text-xl md:text-2xl font-semibold text-indigo-400">{title}</h3>
      <p className="text-gray-300 mt-2">{desc}</p>
      <button className="mt-4 w-full px-4 py-2 bg-indigo-500 hover:bg-indigo-600 rounded-xl shadow-md text-white font-medium transition-all duration-300 cursor-pointer">
        Start Assessment
      </button>
    </div>
  );
};

export default TestCard;
