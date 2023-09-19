import { MouseEvent, useEffect, useState } from 'react';
import classes from './TodoList.module.scss';
import { fetchService } from '../../services/fetchService';
import { ITask } from '../../types/types';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Button from '../Button/Button';

const FILTER_ALL = 'filter_all'
const FILTER_ACTIVE = 'filter_active'
const FILTER_COMPLETED = 'filter_completed'


const TodoList = function() {

	let [tasks, setTasks] = useState<ITask[]>([])
	let [isLoading, setIsLoading] = useState(true)

	async function fetchData() {
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
		if (filter === FILTER_COMPLETED) setFilter(FILTER_ALL)
	}
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

	let [filter, setFilter] = useState(FILTER_ALL)
	function filterTasks(e: MouseEvent<HTMLButtonElement>) {
		let rule = e.currentTarget.dataset.rule
		if (rule) setFilter(rule)
	}
	const filteredTasks = filter === FILTER_ALL ? tasks : tasks.filter(item => {
		if (filter === FILTER_ACTIVE && !item.completed) return item
		if (filter === FILTER_COMPLETED && item.completed) return item
	})
	const taskList = filteredTasks.map((item, index) =>
		<Task
			className={classes.task}
			data={item}
			onChange={editTask}
			onDelete={deleteTask}
			key={index}
		/>
	)
	function getTaskList() {
		if (isLoading) return <p className={classes.message}>loading</p>
		if (!taskList || !taskList.length) return <p className={classes.message}>empty</p>
		return taskList
	}

	// action bar
	const activeTasks = tasks?.reduce((count, item) => item.completed ? count : count + 1, 0)
	function cleanCompletedTasks() {
		if (!tasks) return;
		let newTasks = tasks.filter((item) => !item.completed)
		setTasks(newTasks)
		fetchService.setTasks(newTasks)
	}
	const filterButtons = [
		{ rule: FILTER_ALL, textContent: 'All' },
		{ rule: FILTER_ACTIVE, textContent: 'Active' },
		{ rule: FILTER_COMPLETED, textContent: 'Completed' },
	]
	// /action bar

	return (
		<div className={classes.container}>
			<div className={classes.header}>todos</div>
			<div className={classes.wrapper}>
				<div className={classes.box}>
					<NewTask callback={createTask} />
					<div className={classes.list}>
						{getTaskList()}
					</div>
					<div className={classes.actionBar}>
						<p className={classes.summary}>
							{`${activeTasks} item${activeTasks === 1 ? '' : 's'} left`}
						</p>
						<div className={classes.filterButtons}>
							{filterButtons.map((item, i) =>
								<Button
									active={filter === item.rule ? true : false}
									data-rule={item.rule}
									onClick={filterTasks}
									key={i}
								>
									{item.textContent}
								</Button>
							)}
						</div>
						<div className={classes.cleanButton}>
							<Button onClick={cleanCompletedTasks}>Clean completed</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
export default TodoList