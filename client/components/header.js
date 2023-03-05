import Link from 'next/link';


export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    currentUser && { label: "Sign out", href: "/auth/signout" }
  ]
  .filter(linkConfig => linkConfig)
  .map((linkConfig) =>{
    return(
    <li key={linkConfig.href} className="nav-item">
      <Link href={linkConfig.href} className="nav-link">
        {linkConfig.label}
      </Link>
    </li>
    )
  })

  return (
    <nav className="navbar navbar-light bg-light">
      <Link href="/" className='navbar-brand'>
           Ticketing Master
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">
          {links}
        </ul>
      </div>
    </nav>
  );
};
