import { memo } from 'react';
import { Alert } from '@material-tailwind/react';
import { ReactComponent as IconError } from '../icons/error.svg';

interface ErrorProps {
	error?: string;
}

function Error({ error }: ErrorProps) {
	return (
		<Alert variant='gradient' icon={<IconError className='mr-1 h-6 w-6' />} color='red'>
			{error}
		</Alert>
	);
}

export default memo(Error);
