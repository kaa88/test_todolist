import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react';
import classes from './Task.module.scss';
import Icon from '../Icon/Icon';
import { ITask } from '../../types/types';
import IconButton from '../IconButton/IconButton';
import { transitionIsLocked } from '../../services/transitionLock';

type TaskProps = {
	className?: string
	data: ITask
	onChange?: (task: ITask) => void
	onDelete?: (id: number) => void
}

const STATE_ACTIVE = 'state_active'
const STATE_COMPLETED = 'state_completed'
const STATE_EDIT = 'state_edit'
const lockTimeout = 200

const Task = function({
	className = '',
	data,
	onChange,
	onDelete,
}: TaskProps) {

	const isCompleted = data.completed
	let [isEdit, setIsEdit] = useState(false)

	const value = data.title
	let [editableValue, setEditableValue] = useState(value)

	const inputRef = useRef<any>(null)
	let [inputFocused, setInputFocused] = useState(false)
	useEffect(() => {
		if (inputFocused) {
			setInputFocused(false)
			setTimeout(() => {
				inputRef.current.focus()
			}, 100)
		}
	}, [inputFocused])

	function changeValue(e: ChangeEvent<HTMLInputElement>) {
		setEditableValue(e.target.value)
	}
	function changeState() {
		updateTask({isCompleted: isCompleted ? false : true})
	}
	function startEdit() {
		if (transitionIsLocked(lockTimeout)) return;
		setIsEdit(true)
		setEditableValue(value)
		setInputFocused(true)
	}
	function confirmEdit() {
		if (transitionIsLocked(lockTimeout)) return;
		setIsEdit(false)
		let valueIsChanged = value === editableValue ? false : true
		if (valueIsChanged) updateTask({value: editableValue})
	}
	function cancelEdit() {
		if (transitionIsLocked(lockTimeout)) return;
		setIsEdit(false)
		setEditableValue(value)
	}
	function updateTask(params: {isCompleted?: boolean, value?: string}) {
		if (onChange) onChange({
			id: data.id,
			title: params.value || value,
			completed: params.isCompleted === undefined ? isCompleted : params.isCompleted
		})
	}
	function deleteTask() {
		if (transitionIsLocked(lockTimeout)) return;
		if (onDelete) onDelete(data.id)
	}
	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') confirmEdit()
		if (e.key === 'Escape') cancelEdit()
	}

	return (
		<div className={`${className} ${classes.wrapper} ${isCompleted ? classes[STATE_COMPLETED] : classes[STATE_ACTIVE]} ${isEdit ? classes[STATE_EDIT] : ''}`}>
			<div className={classes.state} onClick={changeState}>
				<Icon className={classes.stateIcon} name='icon-ok' />
			</div>

			<input
				className={classes.content}
				type="text"
				value={isEdit ? editableValue : value}
				onChange={changeValue}
				onFocus={startEdit}
				onBlur={confirmEdit}
				onKeyDown={handleKeyDown}
				autoComplete='off'
				disabled={isEdit ? false : true}
				ref={inputRef}
			/>

			<div className={classes.actions}>
				{isEdit
					?	<>
							<IconButton className={classes.button} variant='ok' title='confirm' onClick={confirmEdit} />
							<IconButton className={classes.button} variant='cancel' title='cancel' onClick={cancelEdit} />
						</>
					:	<>
							<IconButton className={classes.button} variant='edit' title='edit' onClick={startEdit} />
							<IconButton className={classes.button} variant='cancel' title='delete' onClick={deleteTask} />
						</>
				}
			</div>
		</div>
	)
}

export default Task