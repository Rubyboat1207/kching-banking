import { useState } from "react";
import { tryLogin } from "../api/api";
import { useNavigate } from "react-router-dom";

function Home() {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const naviagate = useNavigate()

    function login() {
        tryLogin(username, password).then(wasSuccessful => {
            if(wasSuccessful) {
                window.sessionStorage.setItem('group_name', username);
                window.sessionStorage.setItem('password', password);
                naviagate('/account')
            }
        })
    }


    return (
        <div>
            <div>
                <label htmlFor="username">Group Name</label>
                <div>
                    <input type="email" name="username" placeholder="your group name" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="············"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button onClick={login}>Login</button>
        </div>
    )
}

export default Home;