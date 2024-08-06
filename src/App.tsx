import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ProfileOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined
} from '@ant-design/icons'
import { Button, Layout, Menu, theme } from 'antd'
import React, { lazy, Suspense, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Preloader from './components/common/Preloader/Preloader'
import HeaderContainer from './components/Header/HeaderContainer'

const DialogsContainer = lazy(
	() => import('./components/Dialogs/DialogsContainer')
)
const ProfileContainer = lazy(
	() => import('./components/Profile/ProfileContainer')
)

const ChatPage = lazy(() => import('./pages/Chat/ChatPage'))
const Login = lazy(() => import('./components/Login/Login'))
const UsersPage = lazy(() => import('./components/Users/UsersPage'))
const MusicContainer = lazy(() => import('./components/Music/MusicContainer'))
const SettingsContainer = lazy(
	() => import('./components/Settings/SettingsContainer')
)

const { Header, Sider, Content } = Layout

const App: React.FC = () => {
	const [collapsed, setCollapsed] = useState(false)
	const {
		token: { colorBgContainer, borderRadiusLG }
	} = theme.useToken()

	return (
		<Layout style={{ height: '100vh', margin: 'auto' }}>
			<Sider trigger={null} collapsible collapsed={collapsed}>
				<Menu
					style={{ marginTop: '100px' }}
					theme='dark'
					mode='inline'
					defaultSelectedKeys={['1']}
					items={[
						{
							key: '1',
							icon: <ProfileOutlined />,
							label: <Link to={`/profile/27248`}>Profile</Link>
						},
						{
							key: '2',
							icon: <VideoCameraOutlined />,
							label: <Link to='/messages'>Messages</Link>
						},
						{
							key: '3',
							icon: <UserOutlined />,
							label: <Link to='/users'>Users</Link>
						},
						{
							key: '4',
							icon: <UploadOutlined />,
							label: <Link to='/music'>Music</Link>
						},
						{
							key: '5',
							icon: <UploadOutlined />,
							label: <Link to='/settings'>Settings</Link>
						}
					]}
				/>
			</Sider>
			<Layout>
				<Header style={{ padding: 0, background: colorBgContainer }}>
					<Button
						type='text'
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() => setCollapsed(!collapsed)}
						style={{
							fontSize: '16px',
							width: 64,
							height: 64
						}}
					/>
					<HeaderContainer />
				</Header>
				<Content
					style={{
						margin: '24px 16px',
						padding: 24,
						minHeight: 280,
						background: colorBgContainer,
						borderRadius: borderRadiusLG
					}}
				>
					<Suspense fallback={<Preloader />}>
						<Routes>
							<Route path='/profile/:userId' element={<ProfileContainer />} />
							<Route path='/chat' element={<ChatPage />} />
							<Route path='/messages/*' element={<DialogsContainer />} />
							<Route path='/users' element={<UsersPage />} />
							<Route path='/music' element={<MusicContainer />} />
							<Route path='/settings' element={<SettingsContainer />} />
							<Route path='/login' element={<Login />} />
						</Routes>
					</Suspense>
				</Content>
			</Layout>
		</Layout>
	)
}

export default App
