import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';


const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return (
        <div>
            <button className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 " onClick={() => loginWithRedirect()}>Iniciar sesión</button>
        </div>
    )
}

export default LoginButton
