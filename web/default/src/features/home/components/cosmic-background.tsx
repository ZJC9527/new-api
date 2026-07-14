/*
 * NovAPI — Animated cosmic background with pure CSS orbs and particles.
 */

export function CosmicBackground() {
  return (
    <div
      className='pointer-events-none absolute inset-0 z-0 overflow-hidden'
      aria-hidden
    >
      {/* Floating gradient orbs */}
      <div
        className='novapi-orb'
        style={{
          '--orb-delay': '0s',
          '--orb-duration': '20s',
          '--orb-size': '400px',
          '--orb-x-start': '15%',
          '--orb-y-start': '10%',
        } as React.CSSProperties}
      />
      <div
        className='novapi-orb'
        style={{
          '--orb-delay': '-8s',
          '--orb-duration': '25s',
          '--orb-size': '500px',
          '--orb-x-start': '60%',
          '--orb-y-start': '40%',
        } as React.CSSProperties}
      />
      <div
        className='novapi-orb'
        style={{
          '--orb-delay': '-15s',
          '--orb-duration': '30s',
          '--orb-size': '350px',
          '--orb-x-start': '40%',
          '--orb-y-start': '70%',
        } as React.CSSProperties}
      />

      {/* Static particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className='novapi-particle'
          style={{
            '--p-left': `${Math.random() * 100}%`,
            '--p-top': `${Math.random() * 100}%`,
            '--p-duration': `${3 + Math.random() * 4}s`,
            '--p-delay': `${Math.random() * -5}s`,
            '--p-size': `${1 + Math.random() * 2}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
