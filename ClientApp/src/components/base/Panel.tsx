import { Button, Card, CardHeader, Typography } from '@material-tailwind/react';
import React, { memo, ReactNode, MouseEvent } from 'react';
import classnames from 'classnames';
import { asType } from '@material-tailwind/react/types/components/typography';
import { colors } from '@material-tailwind/react/types/generic';

interface PanelProps {
	title?: string;
	action?: string;
	className?: string;
	children?: ReactNode;
	center?: boolean;
	as?: asType;
	color?: colors;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => {};
}

function Panel({
	title,
	action,
	className,
	center,
	children,
	color = 'light-blue',
	as = 'h1',
	onClick,
}: PanelProps) {
	return (
		<Card className={classnames({ 'flex-1 shadow-xl': true, className })}>
			<CardHeader color={color} variant='gradient' className=''>
				<Typography variant='h4' as={as}>
					{title}
				</Typography>
				{action && (
					<Button variant='gradient' color='red' size='sm' onClick={onClick}>
						{action}
					</Button>
				)}
			</CardHeader>
			{children}
		</Card>
	);
}
export default memo(Panel);
