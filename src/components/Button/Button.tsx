import type { ComponentPropsWithoutRef } from 'react';
import classes from './Button.module.scss';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	active?: boolean
}

const Button = function({
	className = '',
	children = 'button',
	active = false,
	...props
}: ButtonProps) {

	return (
		<button
			className={`${className} ${classes.default} ${active ? classes.active : ''}`}
			type='button'
			{...props}
		>
			{children}
		</button>
	)
}

export default Button