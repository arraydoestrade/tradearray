export default function BlotterText() {
  return (
    <div 
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
        pointerEvents: 'none'
      }}
      data-testid="blotter-text"
    >
      <h1
        style={{
          fontFamily: 'Antipasto Pro, sans-serif',
          fontSize: 'clamp(120px, 15vw, 200px)',
          fontWeight: 200,
          color: 'rgba(255, 255, 255, 0.3)',
          letterSpacing: '0.15em',
          margin: 0,
          textTransform: 'lowercase'
        }}
      >
        array
      </h1>
    </div>
  );
}
