  const videoResources = [
    { title: "Guided Meditation for Anxiety", type: "Video", url: "https://www.youtube.com/watch?v=Ix73CLI0Mo0" },
    { title: "5-Minute Mindfulness Meditation", type: "Video", url: "https://youtu.be/TWbiDzi-rQc" },
    { title: "Deep Relaxation Music", type: "Video", url: "https://youtu.be/sfSDQRdIvTc" },
  ];
import ResourceCard from "../components/ResourceCard";

const Resources = () => {

  // Dynamically generated from public/resources
  const audioResources = [
    { title: "English Relaxing Breathing with Music", type: "Audio", url: "/resources/Audio/English Relaxing Breathing with Music.mp3" },
    { title: "Loving Kindness Meditation Version 2", type: "Audio", url: "/resources/Audio/Loving Kindness Meditation Version 2.mp3" },
    { title: "Passive Muscle Relaxation Short", type: "Audio", url: "/resources/Audio/Passive Muscle Relaxation Short.mp3" },
  ];

  const bookResources = [
    { title: "kepy101.pdf", type: "Book", url: "/resources/Books/kepy101.pdf" },
    { title: "kepy102.pdf", type: "Book", url: "/resources/Books/kepy102.pdf" },
    { title: "kepy103.pdf", type: "Book", url: "/resources/Books/kepy103.pdf" },
    { title: "kepy104.pdf", type: "Book", url: "/resources/Books/kepy104.pdf" },
    { title: "kepy105.pdf", type: "Book", url: "/resources/Books/kepy105.pdf" },
    { title: "kepy106.pdf", type: "Book", url: "/resources/Books/kepy106.pdf" },
    { title: "kepy107.pdf", type: "Book", url: "/resources/Books/kepy107.pdf" },
    { title: "kepy108.pdf", type: "Book", url: "/resources/Books/kepy108.pdf" },
    { title: "kepy1gl.pdf", type: "Book", url: "/resources/Books/kepy1gl.pdf" },
    { title: "kepy1ps.pdf", type: "Book", url: "/resources/Books/kepy1ps.pdf" },
  ];

  const renderSection = (title, items) => (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-indigo-400">{title}</h3>
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((r, i) => (
          <ResourceCard key={i} title={r.title} type={r.type} url={r.url} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-5xl min-h-[80vh] mx-auto space-y-12 p-4 md:p-8">
      <h2 className="text-3xl md:text-4xl font-bold text-indigo-400 text-center md:text-left">
        Resources
      </h2>

  {audioResources.length > 0 && renderSection("Audio Resources", audioResources)}
  {bookResources.length > 0 && renderSection("Book Resources", bookResources)}
  {videoResources.length > 0 && renderSection("Video Resources", videoResources)}
    </div>
  );
};

export default Resources;
 
 