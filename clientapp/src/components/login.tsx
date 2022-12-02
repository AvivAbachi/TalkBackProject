import { FormEvent, useState } from "react";

function Login() {
const [username, setUsername]=useState("");
const [password, setPassword] = useState("");
const [isLogin, setIsLogin] = useState(true);



const handleSubmit = (event: FormEvent<HTMLFormElement>)=> {
    event.preventDefault();
    
}
    return <div>
        <img src="" alt=""/>
        <h1>{isLogin ? "Sign in": "Register"}</h1>
        <form  onSubmit={handleSubmit}>
            <input value={username} placeholder="Username" onChange={(e)=> setUsername(e.target.value)}  required/> <br/>
            <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Password" required/> <br/>
            <button >Submit</button>
            <button type="button" onClick={()=> setIsLogin(!isLogin)} >avb</button>
        </form>
    </div>
}

export default Login;