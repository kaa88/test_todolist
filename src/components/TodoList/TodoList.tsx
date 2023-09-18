import { ChangeEvent, useEffect, useState } from 'react';
import classes from './TodoList.module.scss';
import { fetchService } from '../../services/fetchService';
import { ITask } from '../../types/types';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';


const TodoList = function() {

	let [tasks, setTasks] = useState<ITask[]>()
	let [isLoading, setIsLoading] = useState(true)
	console.log(tasks)

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

	function editTask(task: ITask) {
		if (!tasks) return;
		let editedTaskIndex = tasks.findIndex((item) => item.id === task.id)
		let newTasks = [...tasks]
		newTasks[editedTaskIndex] = task
		setTasks(newTasks)
		fetchService.setTasks(newTasks)
	}

	function deleteTask(id: number) {
		if (!tasks) return;
		let newTasks = tasks.filter((item) => item.id !== id)
		setTasks(newTasks)
		fetchService.setTasks(newTasks)
	}

	function createTask(value: string) {
		if (!value) return;
		let newTask = {
			id: Date.now(),
			title: value,
			completed: false
		}
		let newTasks = tasks ? [...tasks, newTask] : [newTask]
		setTasks(newTasks)
		fetchService.setTasks(newTasks)
	}

	const taskList = !tasks ? null : tasks.map((item, index) =>
		<Task
			className={classes.task}
			data={item}
			onChange={editTask}
			onDelete={deleteTask}
			key={index}
		/>
	)

	function getTaskListContent() {
		if (isLoading) return <p className={classes.message}>loading</p>
		if (!taskList || !taskList.length) return <p className={classes.message}>no tasks to do</p>
		return taskList
	}

	return (
		<div className={classes.container}>
			<div className={classes.header}>todos</div>
			<div className={classes.wrapper}>
				<div className={classes.box}>
					<NewTask callback={createTask} />
					<div className={classes.list}>
						{getTaskListContent()}
					</div>
					<div className={classes.actionBar}>
						<p>button</p>
						<p>button</p>
						<p>button</p>
					</div>
				</div>
			</div>
		</div>
	)
}
export default TodoList