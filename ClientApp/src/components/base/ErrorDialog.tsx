import useStore, { clearError } from '../../store/useStore';
import { memo } from 'react';
import {
	Button,
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
} from '@material-tailwind/react';

function ErrorDialog() {
	const error = useStore((state) => state.error);
	return (
		<Dialog open={!!error} handler={clearError}>
			<DialogHeader>Error!</DialogHeader>
			<DialogBody>
				<span>{error}</span>
			</DialogBody>
			<DialogFooter>
				<Button variant='gradient' color='red' onClick={clearError}>
					Close
				</Button>
			</DialogFooter>
		</Dialog>
	);
}

export default memo(ErrorDialog);
