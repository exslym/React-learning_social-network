import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { withRouter } from './hoc/withRouter';
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import store from './redux/redux-store';
import Preloader from './components/commons/Preloader/Preloader';
import LoginPage from './components/Login/Login';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Navbar';
import './App.scss';
// import ProfileContainer from './components/Profile/ProfileContainer';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
// import UsersContainer from './components/Users/UsersContainer';
// import News from './components/News/News';
// import Settings from './components/Settings/Settings';

// import { getAuthUserData } from './redux/auth-reducer';
// import { withRouter } from './hoc/withRouter';
// import store from './redux/store';
// import store from './redux/redux-store';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

class App extends React.Component {
	catchAllUnhandledErrors = (reason, promiseRejectionEvent) => {
		alert('some error');
		// console.log(promiseRejectionEvent);
	};

	componentDidMount() {
		this.props.initializeApp();
		window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
	}

	componentWillUnmount() {
		window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
	}

	/* 	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}
		return (
			<BrowserRouter>
				<div className='app_wrapper'>
					<HeaderContainer />
					<Navbar />
					<div className='app_wrapper_content'>
						<Routes>
							<Route path='/' element={<ProfileContainer />} />
							<Route path='/profile/' element={<ProfileContainer />} />
							<Route path='/profile/:userId' element={<ProfileContainer />} />
							<Route path='/dialogs/*' element={<DialogsContainer />} />
							<Route path='/users/*' element={<UsersContainer />} />
							<Route path='/news' element={<News />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/login' element={<LoginPage />} />
						</Routes>
					</div>
				</div>
			</BrowserRouter>
		);
	} */

	/* 	render() {
				if (!this.props.initialized) {
			return <Preloader />;
		}
		return (
			<div className='app_wrapper' role={'main'}>
				<HeaderContainer />
				<Navbar />
				<div className='app_wrapper_content'>
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/' element={<ProfileContainer />} />
						<Route path='/profile/' element={<ProfileContainer />} />
						<Route path='/profile/:userId' element={<ProfileContainer />} />
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/users/*' element={<UsersContainer />} />
						<Route path='/news' element={<News />} />
						<Route path='/settings' element={<Settings />} />
					</Routes>
				</div>
			</div>
		);
	} */

	render() {
		if (!this.props.initialized) {
			return <Preloader />;
		}
		return (
			<div className='wrapper' role={'main'}>
				<HeaderContainer />
				<Navbar />
				<div className='wrapper_content'>
					<React.Suspense fallback={<Preloader />}>
						<Routes>
							<Route path='/' element={<Navigate to='/profile' />} />
							<Route path='/profile' element={<ProfileContainer />} />
							<Route path='/profile/:userId' element={<ProfileContainer />} />
							<Route path='/dialogs/*' element={<DialogsContainer />} />
							<Route path='/users/*' element={<UsersContainer pageTitle={'Title'} />} />
							<Route path='/news' element={<News />} />
							<Route path='/settings' element={<Settings />} />
							<Route path='/login' element={<LoginPage />} />
							<Route path='*' element={<div className='notFound'>404 NOT FOUND</div>} />
						</Routes>
					</React.Suspense>
				</div>
			</div>
		);
	}
}

/* const App = () => {
	return (
		<BrowserRouter>
			<div className='app_wrapper'>
				<HeaderContainer />
				<Navbar />
				<div className='app_wrapper_content'>
					<Routes>
						<Route path='/' element={<ProfileContainer />} />
						<Route path='/profile/' element={<ProfileContainer />} />
						<Route path='/profile/:userId' element={<ProfileContainer />} />
						<Route path='/dialogs/*' element={<DialogsContainer />} />
						<Route path='/users/*' element={<UsersContainer />} />
						<Route path='/news' element={<News />} />
						<Route path='/settings' element={<Settings />} />
						<Route path='/login' element={<LoginPage />} />
					</Routes>
				</div>
			</div>
		</BrowserRouter>
	);
}; */

const mapStateToProps = state => ({
	initialized: state.app.initialized,
});

// export default compose(connect(mapStateToProps, { initializeApp }))(App);

let AppContainer = compose(withRouter, connect(mapStateToProps, { initializeApp }))(App);
// let AppContainer = compose(connect(mapStateToProps, { initializeApp }))(App);

const ExslymApp = props => {
	return (
		<HashRouter>
			<Provider store={store}>
				<AppContainer />
			</Provider>
		</HashRouter>
	);
};

export default ExslymApp;
