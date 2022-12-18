import { memo, ReactNode, MouseEvent } from 'react';
import classNames from 'classnames';
import { Button, Card, CardHeader, Typography } from '@material-tailwind/react';
import { asType } from '@material-tailwind/react/types/components/typography';
import { colors } from '@material-tailwind/react/types/generic';

interface PanelProps {
	title?: string;
	action?: string;
	className?: string;
	center?: boolean;
	children?: ReactNode;
	color?: colors;
	as?: asType;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
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
		<Card className={classNames('flex-1 shadow-xl', className)}>
			<CardHeader
				color={color}
				variant='gradient'
				className={classNames(
					'flex items-center justify-between p-4 text-3xl font-bold uppercase',
					{ 'justify-center': center }
				)}
			>
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
