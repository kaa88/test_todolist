import { ChangeEvent, ComponentPropsWithoutRef, KeyboardEvent, useRef, useState } from 'react';
import classes from './NewTask.module.scss';
import IconButton from '../IconButton/IconButton';
import Icon from '../Icon/Icon';

type NewTaskProps = ComponentPropsWithoutRef<'input'> & {
	callback: (task: string) => void
}

const NewTask = function({
	className = '',
	callback: createTask,
	...props
}: NewTaskProps) {

	let [value, setValue] = useState('')
	let [isEdit, setIsEdit] = useState(false)
	const inputRef = useRef<any>(null)

	function startEdit() {
		setIsEdit(true)
	}
	function finishEdit() {
		if (!value) {
			setIsEdit(false)
			setValue('')
		}
	}
	function confirmEdit() {
		let value = inputRef.current.value
		if (value) createTask(value)
		setValue('')
		inputRef.current.focus()
	}
	function cancelEdit() {
		setIsEdit(false)
		setValue('')
		inputRef.current.blur()
	}
	function handleChange(e: ChangeEvent<HTMLInputElement>) {
		setValue(e.target.value)
	}
	function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') confirmEdit()
		if (e.key === 'Escape') cancelEdit()
	}

	return (
		<div className={classes.wrapper}>
			<Icon className={classes.icon} name='icon-arrow-short' />
			<input
				className={classes.input}
				type="text"
				value={value}
				onChange={handleChange}
				onKeyDown={handleKeyDown}
				onFocus={startEdit}
				onBlur={finishEdit}
				ref={inputRef}
				{...props}
			/>
			<div className={`${classes.placeholder} ${!isEdit ? classes.visible: ''}`}><span>new task</span></div>
			<div className={`${classes.buttons} ${isEdit ? classes.visible: ''}`}>
				<IconButton variant='ok' title='add' onClick={confirmEdit} />
				<IconButton variant='cancel' title='cancel' onClick={cancelEdit} />
			</div>
		</div>
	)
}

export default NewTask