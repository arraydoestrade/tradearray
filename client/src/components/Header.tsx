export default function Header() {
  return (
    <header className="app-header app-header-home-only" data-testid="app-header">
      <div className="app-header-home-content">
        <img 
          src="/arraylogo.png" 
          alt="array" 
          className="app-logo-home-img"
          data-testid="app-logo"
          style={{
            height: '6rem',
            width: 'auto',
            objectFit: 'contain'
          }}
        />
      </div>
    </header>
  );
}
