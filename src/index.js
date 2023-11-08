import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Route, Routes, BrowserRouter } from "react-router-dom";

import UserState from './contexts/UserState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		{/* <UserState> */}
		<BrowserRouter>
			<Routes>
				<Route path="/*" element={<App />} />
			</Routes>
		</BrowserRouter>
		{/* </UserState> */}
	</React.StrictMode>
)
