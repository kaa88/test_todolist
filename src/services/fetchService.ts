import { ITask } from '../types/types'
import defaultTasks from './defaultTasks.json'

const storageName = 'tasks'

export const fetchService = { // fake fetcher
	async setTasks(value: ITask[]) {
		await _wait()
		setTasks(value)
	},
	async getTasks() {
		await _wait()
		return getTasks()
	}
}

function _wait(seconds = 1) {
	return new Promise((resolve) => {
		setTimeout(() => resolve(true), seconds * 1000)
	})
}

function setTasks(value: any) {
	localStorage.setItem(storageName, JSON.stringify(value))
}
function getTasks() {
	let item = localStorage.getItem(storageName)
	let result = item ? JSON.parse(item) : item
	return result as ITask[]
}

if (!getTasks()) setTasks(defaultTasks || [])
