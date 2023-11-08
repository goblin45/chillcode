import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import UserState from "./contexts/UserState";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Problems from "./components/Problems";
import Problem from "./components/Problem";
import './App.css';
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Login from "./components/Login";
import Profile from "./components/Profile";
import POTD from "./components/POTD";
import ComingSoon from "./components/ComingSoon";
import LogOut from "./components/LogOut";

function App() {

	const [mode, setMode] = useState('light')
	const [color, setColor] = useState('')
    const [bgColor, setBgColor] = useState('')

	const [loginBoxStatus, setLoginBoxStatus] = useState('closed')
	const clientId = '1085992870413-ou5npga27rar7i5044h83c1d806h3chf.apps.googleusercontent.com'

	useEffect(() => {
		if (mode === 'light') {
			setColor('#000')
			setBgColor('#fff')
		} else {
			setColor('#fff')
			setBgColor('#000')
		}
	}, [mode])

	return (
		<GoogleOAuthProvider clientId = {clientId}>
			<UserState>
				<div className="App">
					<NavBar mode={mode} setMode={setMode} color={color} bgColor={bgColor} setLoginBoxStatus={setLoginBoxStatus}/>
					<Routes>
						<Route path='/' element={<Home color={color} bgColor={bgColor} loginBoxStatus={loginBoxStatus} setLoginBoxStatus={setLoginBoxStatus}/>}/>
						<Route path='/problems' element={<Problems color={color} bgColor={bgColor}/>}/>
						<Route path='/problem/*' element={<Problem color={color} bgColor={bgColor} setLoginBoxStatus={setLoginBoxStatus}/>}/>
						<Route path='/profile/*' element={<Profile color={color} bgColor={bgColor}/>}/>
						<Route path='/problem-of-the-day' element={<POTD/>}/>
						<Route path='/courses/*' element={<ComingSoon color={color} bgColor={bgColor}/>}/>
						<Route path='/contests/*' element={<ComingSoon color={color} bgColor={bgColor}/>}/>
						<Route path='/logout' element={<LogOut/>}/>
						<Route path='*' element = {<NotFound color={color} bgColor={bgColor}/>}/>
					</Routes>
					{ 
						(loginBoxStatus === 'open') && <Login color={color} bgColor={bgColor} setLoginBoxStatus={setLoginBoxStatus}/>
					}
				</div>
			</UserState>
		</GoogleOAuthProvider>
	);
}

export default App;
