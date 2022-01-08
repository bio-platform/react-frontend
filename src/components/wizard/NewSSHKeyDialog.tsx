import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	Link,
	DialogActions
} from '@material-ui/core';
import React, { useState } from 'react';

import { PostKey } from '../../models/PostKey';
import { NormalTextField } from '../NormalTextField';

type NewSSHKeyDialogProps = {
	uploadKey: (keyPair: PostKey) => void;
};

export const NewSSHKeyDialog = ({ uploadKey }: NewSSHKeyDialogProps) => {
	const [open, setOpen] = useState(false);
	const [keyName, setKeyName] = useState('');
	const [publicKey, setPublicKey] = useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<div>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Upload new SSH Key
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
			>
				<DialogTitle id="form-dialog-title">Upload new SSH Key</DialogTitle>
				<DialogContent>
					<DialogContentText>
						To create RSA key pair, see{' '}
						<Link href="https://git-scm.com/book/en/v2/Git-on-the-Server-Generating-Your-SSH-Public-Key">
							this
						</Link>{' '}
						guide.
					</DialogContentText>
					<NormalTextField
						autoFocus
						value={keyName}
						required
						margin="dense"
						id="ssh-name"
						label="Key Name"
						type="text"
						fullWidth
						onChange={value => {
							setKeyName(value);
						}}
					/>
					<NormalTextField
						margin="dense"
						required
						id="ssh-key"
						value={publicKey}
						label="Public key"
						type="text"
						fullWidth
						multiline
						rows={6}
						variant="outlined"
						onChange={value => {
							setPublicKey(value);
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Cancel
					</Button>
					<Button
						disabled={publicKey === '' || keyName === ''}
						onClick={() => {
							uploadKey({ public_key: publicKey, name: keyName });
						}}
						color="primary"
					>
						Upload
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};
