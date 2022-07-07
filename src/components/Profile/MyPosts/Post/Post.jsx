// @ts-nocheck
import React from 'react';
import avatar from '../../../../assets/avatar_own.jpg';
import likes from '../../../../assets/icon_liked.svg';
import styles from './Post.module.scss';

const Post = props => {
	return (
		<div className={styles.item}>
			<div className={styles.post_wrap}>
				<img className={styles.avatar} src={avatar} alt='avatar' />
				<p>{props.message}</p>
			</div>
			<div className={styles.likes}>
				<img src={likes} alt='likes' />
				<span>{props.count}</span>
			</div>
		</div>
	);
};

export default Post;