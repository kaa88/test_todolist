import { ChangeEvent, useEffect, useRef, useState, KeyboardEvent } from 'react';
import classes from './Task.module.scss';
import Icon from '../Icon/Icon';
import { ITask } from '../../types/types';
import IconButton from '../IconButton/IconButton';

type TaskProps = {
	className?: string
	data: ITask
	onChange?: (task: ITask) => void
	onDelete?: (id: number) => void
}

const STATE_ACTIVE = 'active'
const STATE_COMPLETED = 'completed'
const STATE_EDIT = 'edit'
const stateClassNamePrefix = 'state_'

const Task = function({
	className = '',
	data,
	onChange,
	onDelete,
}: TaskProps) {

	const isCompleted = data.completed
	let [isEdit, setIsEdit] = useState(false)

	let stateClassName = isCompleted ? STATE_COMPLETED : STATE_ACTIVE
	if (isEdit) stateClassName = STATE_EDIT
	stateClassName = stateClassNamePrefix + stateClassName

	const value = data.title
	let [editableValue, setEditableValue] = useState(value)

	const inputRef = useRef<any>(null)
	let [inputFocused, setInputFocused] = useState(false)
	useEffect(() => {
		if (inputFocused) {
			setInputFocused(false)
			inputRef.current.focus()
		}
	}, [inputFocused])

	function changeValue(e: ChangeEvent<HTMLInputElement>) {
		setEditableValue(e.target.value)
	}
	function changeState() {
		updateTask({isCompleted: isCompleted ? false : true})
	}
	function startEdit() {
		console.log('edit')
		setIsEdit(true)
		setEditableValue(value)
		setInputFocused(true)
	}
	function confirmEdit() {
		setIsEdit(false)
		let valueIsChanged = value === editableValue ? false : true
		if (valueIsChanged) updateTask({isCompleted: false, value: editableValue})
	}
	function updateTask(params: {isCompleted?: boolean, value?: string}) {
		if (onChange) onChange({
			id: data.id,
			title: params.value || value,
			completed: params.isCompleted === undefined ? isCompleted : params.isCompleted
		})
	}
	function deleteTask() {
		if (onDelete) onDelete(data.id)
	}
	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter' || e.key === 'Escape') confirmEdit()
	}

	return (
		<div className={`${className} ${classes.wrapper} ${classes[stateClassName]}`}>
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
					?	<IconButton variant='ok' title='confirm' onClick={confirmEdit} />
					:	<>
							<IconButton variant='edit' title='edit' onClick={startEdit} />
							<IconButton variant='cancel' title='delete' onClick={deleteTask} />
						</>
				}
			</div>
		</div>
	)
}

export default Task