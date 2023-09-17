import { useEffect, useState } from 'react';
import classes from './TodoList.module.scss';
import { fetchService } from '../../services/fetchService';
import { ITask } from '../../types/types';
import Task from '../ui/Task/Task';
import Icon from '../ui/Icon/Icon';


const TodoList = function() {

	let [tasks, setTasks] = useState<ITask[]>()
	let [isLoading, setIsLoading] = useState(true)
	// console.log(tasks)

	async function fetchData() {
		console.log('fetchData')
		try {
			tasks = await fetchService.getTasks()
			setTasks(tasks)
		}
		catch(err) {
			console.log(err)
		}
		finally {
			setIsLoading(false)
		}
	}
	useEffect(() => {
		fetchData()
	}, []) // eslint-disable-line react-hooks/exhaustive-deps

	function handleTaskChange(task: ITask) {
		console.log(task)
		if (!tasks) return;
		let newTasks = JSON.parse(JSON.stringify(tasks)) as ITask[]
		let editedTaskIndex = tasks.findIndex((item) => item.id === task.id)
		newTasks[editedTaskIndex] = task
		setTasks(newTasks)
		fetchService.setTasks(newTasks)
	}

	function handleTaskDelete(id: number) {
		if (!tasks) return;
		console.log('delete id: ', id)
		let newTasks = tasks.filter((item) => item.id !== id)
		setTasks(newTasks)
		fetchService.setTasks(newTasks)
	}

	const taskList = !tasks ? null : tasks.map((item, index) =>
		<Task
			className={classes.task}
			data={item}
			onChange={handleTaskChange}
			onDelete={handleTaskDelete}
			key={index}
		/>
	)
	// taskList?.forEach(item => {
	// 	console.log(item.props.data.title)
	// })

	return (
		<div className={classes.wrapper}>
			<div className={classes.header}>todos</div>
			<div className={classes.box}>
				<div className={classes.newTask}>
					<Icon className={classes.newTaskIcon} name='icon-arrow-short' />
					<input type="text" placeholder="What's need to be done?" />
				</div>
				<div className={classes.list}>
					{isLoading
						? <p>LOADING</p>
						: taskList
					}
				</div>
				<div className={classes.actionBar}>
					<p>button</p>
					<p>button</p>
					<p>button</p>
				</div>
			</div>
		</div>
	)
}
export default TodoList