import { Dialog } from '@components/ui/dialog'
import { DialogProps } from '@radix-ui/react-dialog'

import BackpackModal from './BackpackModal'

interface ModalProps extends DialogProps {
	type: 'backpack'
}

const Modal = ({ type, ...props }: ModalProps) => {
	if (!type) return null

	switch (type) {
		case 'backpack':
			return <BackpackModal {...props} />
		default:
			return <Dialog></Dialog>
	}
}

export default Modal
