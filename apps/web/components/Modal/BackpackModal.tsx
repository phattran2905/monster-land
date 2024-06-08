import { Button } from '@components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@components/ui/dialog'
import { DialogProps } from '@radix-ui/react-dialog'

const Modal = ({ onOpenChange, open }: DialogProps) => {
	return (
		<Dialog
			onOpenChange={onOpenChange}
			open={open}
		>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Confirm</DialogTitle>
				</DialogHeader>

				{/* Content */}
				<div className="flex flex-col justify-between py-10 items-center mx-6 my-6">
					<p className="text-lg mb-2">
						Do you want to incubate{' '}
						{/* <span className="text-Flamingo-Pink font-bold">{eggName}</span>? */}
						<span className="text-Flamingo-Pink font-bold">eggName</span>?
					</p>
				</div>

				<DialogFooter className="flex flex-row justify-end">
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
						>
							Close
						</Button>
					</DialogClose>
					<Button type="button">Confirm</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
export default Modal
