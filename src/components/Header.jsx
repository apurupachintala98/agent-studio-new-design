import { useLocation, Link } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isMyAgentsActive = location.pathname === '/dashboard';
  const isReferenceActive = location.pathname === '/reference';

  return (
    <header style={{ background: '#FFF', width: '100%', height: '59px', display: 'flex', alignItems: 'center', borderBottom: '1px solid #E5E7EB' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/header-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          paddingRight: '32px',
          paddingLeft: '32px'
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: '112.958px',
            height: '48px',
            flexShrink: 0,
            marginRight: '24px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Link
            to="/"
            style={{
              width: '112.958px',
              height: '48px',
              marginRight: '24px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img src="/El-logo.svg" alt="Elevance Health" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />

          </Link>
        </div>

        {/* Agent Studio Text */}
        <div
          style={{
            color: '#1A3673',
            fontFamily: 'Elevance Sans, sans-serif',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '32px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginRight: 'auto',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          AGENT STUDIO
        </div>

        {/* Navigation */}
        <nav
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '24px',
            padding: '0',
            margin: '0',
            listStyle: 'none'
          }}
        >
          {/* My Agents */}
         <Link to="/dashboard"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: '#5B6770',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              position: 'relative',
              padding: '0',
              height: '100%',
              justifyContent: 'center'
            }}
          >
            My Agents
            {isMyAgentsActive && (
              <div
                style={{
                  height: '2px',
                  width: 'auto',
                  minWidth: '80px',
                  background: '#0079C2',
                  marginTop: '-4px'
                }}
              />
            )}
          </Link>

          {/* Reference */}
          <a
            href="/reference"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: '#5B6770',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              position: 'relative',
              padding: '0',
              height: '100%',
              justifyContent: 'center'
            }}
          >
            Reference
            {isReferenceActive && (
              <div
                style={{
                  height: '2px',
                  width: 'auto',
                  minWidth: '77px',
                  background: '#0079C2',
                  marginTop: '-4px'
                }}
              />
            )}
          </a>

          {/* Contact Us */}

          <a
            href={`mailto:apurupa.chintala@elevancehealth.com
    ?subject=Agent%20Studio%20Support%20Request
    &body=Hi%20Team,%0D%0A%0D%0A
    I%20need%20assistance%20with%20Agent%20Studio.%0D%0A%0D%0A
    Details:%0D%0A
    -%20Issue:%20%0D%0A
    -%20Page:%20%0D%0A
    -%20Steps%20to%20reproduce:%20%0D%0A%0D%0A
    Thank%20you.%0D%0A`} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              color: '#5B6770',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: '500',
              position: 'relative',
              padding: '0',
              height: '100%',
              justifyContent: 'center'
            }}
          >
            Contact Us
          </a>
        </nav>
      </div>
    </header>
  );
}
