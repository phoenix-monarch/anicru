import React from 'react'
import Link from 'next/link'
const LoginSignup = ({ functions, buttonName, styles, redirectHREF }) => {
  return (

    redirectHREF ? <Link href={redirectHREF} >
      <button onClick={ functions } className={`  bg-primary px-4 py-1 rounded-md ${styles}  `} >
        {buttonName}
      </button>
    </Link> :
      <button onClick={ functions } className={`  bg-primary px-4 py-1 rounded-md ${styles}  `} >
        {buttonName}
      </button>

  )
}

export default LoginSignup