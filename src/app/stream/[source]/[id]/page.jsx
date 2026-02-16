import { fetchApi } from "@/lib/api";
import StreamPlayer from "@/components/StreamPlayer";
import RetryActions from "@/components/RetryActions";

export default async function Streams({ params }) {
  const { source, id } = await params;
  
  // Fetch streams from current source
  const streams = await fetchApi(`/stream/${source}/${id}`);

  // Find match to get all available sources
  let matchSources = [];
  try {
    // Get all sports
    const sports = await fetchApi("/sports");
    
    // Search through sports to find the match with this source/id combination
    for (const sport of sports) {
      const matches = await fetchApi(`/matches/${sport.id}`);
      const match = matches?.find(m => 
        m.sources?.some(s => s.source === source && s.id === id)
      );
      
      if (match) {
        matchSources = match.sources || [];
        break;
      }
    }
  } catch (error) {
    console.error("Error fetching match sources:", error);
  }

  if (!streams || streams.length === 0) {
    return (
      <main className="p-6">
        <div className="max-w-xl mx-auto text-center p-8 cyber-card rounded-lg">
          <div className="text-5xl mb-4 animate-neon-pulse">&#x25C7;</div>
          <h1 className="text-2xl font-black mb-2 neon-text-red font-mono tracking-wider">STREAM NOT FOUND</h1>
          <p className="text-muted mb-6 font-mono text-xs">
            <span>// No streams are available for this match</span>
          </p>
          <RetryActions />
        </div>
      </main>
    );
  }

  return <StreamPlayer streams={streams} source={source} id={id} matchSources={matchSources} />;
}