// @ts-nocheck
import React, { useState, useEffect } from 'react';
import styles from './ProfileInfo.module.scss';

const ProfileStatusWithHooks = props => {
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.status);

	useEffect(() => {
		setStatus(props.status);
	}, [props.status]);

	const activateEditMode = () => {
		setEditMode(true);
		setTimeout(function () {
			document.querySelector('#mainStatusInput').select();
		}, 300);
	};

	const deactivateEditMode = () => {
		setEditMode(false);
		props.updateUserStatus(status);
	};

	const onStatusChange = e => {
		setStatus(e.currentTarget.value);
	};

	return (
		<>
			{!editMode ? (
				<div className={styles.info_status} onClick={activateEditMode}>
					<b>status:</b> {props.status || 'write something'}
				</div>
			) : (
				<input
					id='mainStatusInput'
					className={styles.info_status}
					autoFocus
					onChange={onStatusChange}
					onBlur={deactivateEditMode}
					defaultValue={status}
				/>
			)}
		</>
	);
};

export default ProfileStatusWithHooks;
