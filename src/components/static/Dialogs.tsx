import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	IconButton,
	InputLabel,
	FormControl,
	Select,
	Typography
} from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import React, { useState } from 'react';

import { addFloatingIP } from '../../api/InstanceApi';
import { FloatingIPData } from '../../models/FloatingIPData';
import { Instructions } from '../../models/Instructions';

type ConfirmationDialogProps = {
	open: boolean;
	handleClose: () => void;
	title: string;
	description: string;
	handleConfirm: () => void;
};

export const ConfirmationDialog = (props: ConfirmationDialogProps) => (
	<Dialog
		open={props.open}
		onClose={props.handleClose}
		aria-labelledby="alert-dialog-title"
		aria-describedby="alert-dialog-description"
	>
		<DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
		<DialogContent>
			<DialogContentText id="alert-dialog-description">
				{props.description}
			</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button
				onClick={() => {
					props.handleClose();
				}}
				color="primary"
			>
				Cancel
			</Button>
			<Button
				onClick={() => {
					props.handleConfirm();
					props.handleClose();
				}}
				color="primary"
			>
				Confirm
			</Button>
		</DialogActions>
	</Dialog>
);

type InfoDialogProps = {
	instruction: Instructions | undefined;
};

export const InfoDialog = ({ instruction }: InfoDialogProps) => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<IconButton
				aria-label="info"
				onClick={() => {
					setOpen(true);
				}}
			>
				<InfoIcon />
			</IconButton>
			<Dialog
				open={open}
				scroll="paper"
				onClose={() => {
					setOpen(false);
				}}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
			>
				<DialogTitle id="scroll-dialog-title">Instructions</DialogTitle>
				<DialogContent dividers>
					<DialogContentText id="scroll-dialog-description" tabIndex={-1}>
						{instruction?.instructions !== null
							? instruction?.instructions
							: 'Instructions in progress'}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpen(false);
						}}
						color="primary"
					>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

type FloatingIpDialogProps = {
	floatingIPs: FloatingIPData[];
	instanceId: string;
	reloadData: () => void;
	setLoading: (state: boolean) => void;
};

export const FloatingIpDialog = ({
	floatingIPs,
	instanceId,
	reloadData,
	setLoading
}: FloatingIpDialogProps) => {
	const [open, setOpen] = useState(false);
	const [selectedIp, setSelectedIp] = useState<string>(
		floatingIPs === [] ? '' : floatingIPs[0]?.name
	);

	return (
		<>
			<Button
				aria-label="alocate ip"
				onClick={() => {
					setOpen(true);
				}}
				color="primary"
			>
				Allocate IP
			</Button>
			<Dialog
				open={open}
				scroll="paper"
				onClose={() => {
					setOpen(false);
				}}
				aria-labelledby="scroll-dialog-title"
				aria-describedby="scroll-dialog-description"
				fullWidth
			>
				<DialogTitle id="scroll-dialog-title">Select floating IP</DialogTitle>
				<DialogContent dividers>
					<DialogContentText id="scroll-dialog-description" tabIndex={-1}>
						<Typography>
							Be aware that this action can steal allocated floating IP from
							other instance. Check your instances and select appropriate IP.
						</Typography>
						<FormControl fullWidth>
							<InputLabel htmlFor="floatingIps">Floating IP</InputLabel>
							<Select
								value={selectedIp}
								onChange={event => {
									setSelectedIp(event.target.value as string);
								}}
								fullWidth
							>
								{floatingIPs !== [] ? (
									floatingIPs.map(value => (
										<option key={value.name} value={value.name}>
											{value.name}
										</option>
									))
								) : (
									<option key="" value="">
										You do not have any floating ip to add
									</option>
								)}
							</Select>
						</FormControl>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={() => {
							setOpen(false);
						}}
						color="primary"
					>
						Close
					</Button>
					<Button
						onClick={async () => {
							setOpen(false);
							setLoading(true);
							try {
								await addFloatingIP(instanceId, selectedIp);
							} catch (err) {
								setLoading(false);
							}
							reloadData();
						}}
						color="primary"
					>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};
