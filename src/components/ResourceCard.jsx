const ResourceCard = ({ title, type, url }) => {
  const colors = {
    Audio: "bg-purple-600 hover:bg-purple-700",
    Video: "bg-red-600 hover:bg-red-700",
    Article: "bg-teal-500 hover:bg-teal-600",
    Book: "bg-indigo-600 hover:bg-indigo-700",
  };

  return (
    <div className="flex flex-col justify-between p-6 h-48 rounded-2xl bg-gray-900/70 border border-gray-700 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300">
      <div>
        <h3 className="text-lg md:text-xl font-semibold">{title}</h3>
        <p className="text-sm text-gray-400 mt-2">📂 {type}</p>
      </div>
      
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-4 w-full inline-block px-4 py-2 rounded-xl shadow-md text-white font-medium transition-all duration-300 text-center ${colors[type]}`}
        download={type === "Book"}
      >
        {type === "Book" ? "Download" : type === "Video" ? "Watch" : "Play"}
      </a>
    </div>
  );
};

export default ResourceCard;
