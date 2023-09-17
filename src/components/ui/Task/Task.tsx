import { useState } from 'react';
import classes from './Task.module.scss';
import Icon from '../Icon/Icon';
import { ITask } from '../../../types/types';

type TaskProps = {
	className?: string
	data: ITask
	onChange?: (task: ITask) => void
	onDelete?: (id: number) => void
}

const STATUS_DEFAULT = 'default'
const STATUS_COMPLETED = 'completed'
const STATUS_EDIT = 'edit'

const Task = function({
	className = '',
	data,
	onChange,
	onDelete,
}: TaskProps) {

	// console.log(data.title)

	const defaultStatus = data.completed ? STATUS_COMPLETED : STATUS_DEFAULT

	// let [status, setStatus] = useState(defaultStatus)
	// let [value, setValue] = useState(data.title)
	let status = defaultStatus
	let value = data.title

	const statusClassName = 'status_' + status

	function handleChange() {
		if (onChange) onChange({
			id: data.id,
			title: value,
			completed: status === STATUS_COMPLETED ? true : false
		})
	}
	function handleDelete() {
		if (onDelete) onDelete(data.id)
	}
	function changeStatus() {
		// setStatus(status === STATUS_COMPLETED ? STATUS_DEFAULT : STATUS_COMPLETED)
		handleChange()
	}

	return (
		<div className={`${className} ${classes.wrapper} ${classes[statusClassName]}`}>
			<div className={classes.status} onClick={changeStatus}>
				<Icon className={classes.statusIcon} name='icon-ok' />
			</div>

			<input
				className={classes.content}
				type="text"
				onChange={handleChange}
				value={value}
				autoComplete='off'
			/>

			<div className={classes.actions}>
				<Icon className={classes.actionIcon} name='icon-cross' onClick={handleDelete} />
			</div>
		</div>
	)
}

export default Task