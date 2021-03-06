import React from 'react';
import type { UserType } from '../../../types/types';
import { NavLink } from 'react-router-dom';
import styles from './User.module.scss';
import defaultUserAvatar from '../../../assets/avatar.png';
// import axios from 'axios';
// import { usersAPI } from '../../../api/api';

//* TYPES:
type PropsType = {
	user: UserType;
	avatar: string | null;
	followingInProgress: Array<number>;
	follow: (userId: number) => void;
	unfollow: (userId: number) => void;
};

const User: React.FC<PropsType> = ({ user, avatar, followingInProgress, follow, unfollow }) => {
	return (
		<div className={styles.app_friends_item}>
			<div className={styles.app_friends_avatarBlock}>
				<NavLink to={`/profile/${user.id}`}>
					<img
						src={avatar != null ? avatar : defaultUserAvatar}
						alt='avatar'
						className={styles.app_friends_img}
					/>
				</NavLink>
				<div>
					{user.followed ? (
						<button
							className={styles.app_friends_unfollowButton}
							disabled={followingInProgress.includes(user.id)}
							// disabled={followingInProgress.some(id => id === user.id)}
							onClick={() => {
								unfollow(user.id);
								/* props.toggleFollowingProgress(true, props.id);
								usersAPI.unfollow(props.id).then(response => {
									if (response.data.resultCode === 0) {
										props.unfollow(props.id);
									}
									props.toggleFollowingProgress(false, props.id);
								});

								axios
									.delete(`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`, {
										withCredentials: true,
										headers: { 'API-KEY': '254005db-0ca0-46a6-8acf-d019e2f14645' },
									})
									.then(response => {
										if (response.data.resultCode === 0) {
											props.unfollow(props.id);
										}
										props.toggleFollowingProgress(false, props.id);
									}); */
							}}
						>
							Unfollow
						</button>
					) : (
						<button
							className={styles.app_friends_followButton}
							disabled={followingInProgress.includes(user.id)}
							// disabled={followingInProgress.some(id => id === user.id)}
							onClick={() => {
								follow(user.id);
								/* props.toggleFollowingProgress(true, props.id);
								usersAPI.follow(props.id).then(response => {
									if (response.data.resultCode === 0) {
										props.follow(props.id);
									}
									props.toggleFollowingProgress(false, props.id);
								});

								axios
									.post(
										`https://social-network.samuraijs.com/api/1.0/follow/${props.id}`,
										{},
										{
											withCredentials: true,
											headers: { 'API-KEY': '254005db-0ca0-46a6-8acf-d019e2f14645' },
										},
									)
									.then(response => {
										if (response.data.resultCode === 0) {
											props.follow(props.id);
										}
										props.toggleFollowingProgress(false, props.id);
									}); */
							}}
						>
							Follow
						</button>
					)}
				</div>
			</div>
			<div className={styles.app_friends_infoBlock}>
				<div className={styles.app_friends_statusBlock}>
					<p className={styles.app_friends_name}>{user.name}</p>
					<p className={styles.app_friends_status}>
						{user.status != null ? user.status : 'no status'}
					</p>
				</div>
				<div className={styles.app_friends_locationBlock}>
					{/* <p className={styles.app_friends_country}>{props.countryName},</p>
					<p className={styles.app_friends_city}>{props.cityName}</p> */}
					<p className={styles.app_friends_country}>{'countryName'},</p>
					<p className={styles.app_friends_city}>{'cityName'}</p>
				</div>
			</div>
		</div>
	);
};

export default User;
