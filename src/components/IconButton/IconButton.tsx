import type { ComponentPropsWithoutRef } from 'react';
import classes from './IconButton.module.scss';
import Icon from '../Icon/Icon';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
	variant: 'ok' | 'edit' | 'cancel'
	children?: null
}

const IconButton = function({className = '', variant, ...props}: ButtonProps) {

	const variants: {[key: string]: JSX.Element} = {
		ok: <Icon className={classes.ok} name='icon-ok' />,
		edit: <Icon className={classes.edit} name='icon-pen' />,
		cancel: <Icon className={classes.cancel} name='icon-cross-bold' />
	}

	return (
		<button className={`${className} ${classes.button}`} {...props}>
			{variants[variant]}
		</button>
	)
}

export default IconButton