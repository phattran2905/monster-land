import { Button } from '@components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/ui/dialog'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { DialogProps } from '@radix-ui/react-dialog'

interface Props extends DialogProps {}

const Modal = ({ open, onOpenChange }: Props) => {
	return (
		<Dialog
			open={open}
			onOpenChange={onOpenChange}
		>
			{/* <DialogTrigger asChild>
				<Button variant="outline">Share</Button>
			</DialogTrigger> */}
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Share link</DialogTitle>
					<DialogDescription>
						Anyone who has this link will be able to view this.
					</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label
							className="sr-only"
							htmlFor="link"
						>
							Link
						</Label>
						<Input
							defaultValue="https://ui.shadcn.com/docs/installation"
							id="link"
							readOnly
						/>
					</div>
					<Button
						className="px-3"
						size="sm"
						type="submit"
					>
						<span className="sr-only">Copy</span>
						{/* <Copy className="h-4 w-4" /> */}
					</Button>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button
							type="button"
							variant="secondary"
						>
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
export default Modal
