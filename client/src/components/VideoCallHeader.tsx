export function VideoCallHeader() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-10 px-8 py-4"
      style={{
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)'
      }}
      data-testid="header-video-call"
    >
      <h1 
        className="text-2xl font-light tracking-widest text-white drop-shadow-lg"
        data-testid="text-brand"
      >
        ARRAY
      </h1>
    </header>
  );
}
