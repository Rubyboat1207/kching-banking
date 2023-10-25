import { useState } from "react";
import { tryLogin } from "../api/api";
import { useNavigate } from "react-router-dom";
import Advertisment from "../components/Advertisement";

function Home() {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const naviagate = useNavigate()

    function login() {
        tryLogin(username, password).then(wasSuccessful => {
            if(wasSuccessful) {
                window.sessionStorage.setItem('group_name', username);
                window.sessionStorage.setItem('password', password);
                naviagate('/kching-bank/account')
            }
        })
    }


    return (
        <div className="containlarge">
            <Advertisment layout="vert"/>
            <div className="containall">
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
                <div style={{marginTop: 15}}></div>
                <button onClick={login}>Login</button>
                <div style={{marginTop: 60}}></div>
                <Advertisment layout="horiz" />
            </div>
            <Advertisment layout="vert"/>
        </div>
    )
}

export default Home;