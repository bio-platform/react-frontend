import {
	Container,
	Button,
	Stepper,
	Step,
	StepLabel,
	createStyles,
	makeStyles,
	Theme,
	Grid,
	Box,
	Typography,
	Divider,
	InputLabel,
	FormControl,
	Select
} from '@material-ui/core';
import pWaitFor, { TimeoutError } from 'p-wait-for';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';

import { getTask, postInstance } from '../../api/InstanceApi';
import { ConfigurationData } from '../../models/ConfigurationData';
import { AuthContextType, AuthContext } from '../../routes/AuthProvider';
import { NormalTextField } from '../NormalTextField';
import { LoadingPage } from '../static/LoadingPage';
import { CenterStack } from '../static/Positioning';
import { WrongPath } from '../static/WrongPath';

import { FloatingIPSelector } from './FloatingIPSelector';
import { LocalNetworkIdSelector } from './LocalNetworkIdSelector';
import { SSHKeySelector } from './SSHKeySelector';

const steps = [
	'Instance information',
	'Select options',
	'Choose SSH key',
	'Build'
];

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		buttons: {
			'& > *': {
				margin: theme.spacing(1)
			}
		},
		step: {
			'textAlign': 'center',
			'& > *': {
				margin: theme.spacing(1)
			}
		},
		stepper: {
			backgroundColor: 'transparent'
		}
	})
);

export type NewInstanceWizardProps = {
	configuration: ConfigurationData;
};

export const NewInstanceWizard = ({
	configuration
}: NewInstanceWizardProps) => {
	const [activeStep, setActiveStep] = useState(0);
	const [instanceData, setInstanceData] = useState(
		new Map<string, string | number>()
	);
	const [creating, setCreating] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const context = useContext<AuthContextType>(AuthContext);

	useEffect(() => {
		if (configuration) {
			// set default values for options and ssh keys
			configuration.options?.forEach(option => {
				instanceData.set(option.name, option.default);
				setInstanceData(new Map(instanceData));
			});
		}
	}, []);

	const classes = useStyles();

	const capitalize = (s: string) => s && s[0].toUpperCase() + s.slice(1);

	if (configuration === undefined) {
		return (
			<Box mt={2} mb={2}>
				<WrongPath message="Configuration was not selected." />
			</Box>
		);
	}

	if (!configuration.textValues) {
		configuration.textValues = [];
	}
	if (!configuration.numberValues) {
		configuration.numberValues = [];
	}
	if (!configuration.options) {
		configuration.options = [];
	}

	const setSelectedKey = (
		event: ChangeEvent<{ name?: string | undefined; value: unknown }>
	) => {
		instanceData.set('ssh', event.target.value as string);
		setInstanceData(new Map(instanceData));
	};

	const setDefaultKey = (keyName: string) => {
		instanceData.set('ssh', keyName as string);
		setInstanceData(new Map(instanceData));
	};

	const setSelectedNetwork = (
		event: ChangeEvent<{ name?: string | undefined; value: unknown }>
	) => {
		instanceData.set('local_network_id', event.target.value as string);
		setInstanceData(new Map(instanceData));
	};

	const setDefaultNetwork = (network: string) => {
		instanceData.set('local_network_id', network as string);
		setInstanceData(new Map(instanceData));
	};

	const setSelectedFloatingIP = (
		event: ChangeEvent<{ name?: string | undefined; value: unknown }>
	) => {
		instanceData.set('floating_ip', event.target.value as string);
		setInstanceData(new Map(instanceData));
	};

	const setDefaultFloatingIP = (floatingIP: string) => {
		instanceData.set('floating_ip', floatingIP as string);
		setInstanceData(new Map(instanceData));
	};

	const activateNext = () => {
		switch (activeStep) {
			case 0:
				for (let i = 0; i < configuration.textValues!.length; i++) {
					if (!instanceData.has(configuration.textValues![i])) {
						return false;
					}
				}

				for (let i = 0; i < configuration.numberValues!.length; i++) {
					if (!instanceData.has(configuration.numberValues![i])) {
						return false;
					}
				}
				return true;
			case 1:
				for (let i = 0; i < configuration.options!.length; i++) {
					if (!instanceData.has(configuration.options![i].name)) {
						return false;
					}
				}
				return true;
			case 2:
				return (
					instanceData.has('ssh') &&
					instanceData.has('floating_ip') &&
					instanceData.has('local_network_id')
				);

			default:
				return false;
		}
	};

	const renderStep = () => {
		// todo refactor
		switch (activeStep) {
			case 0:
				return (
					<CenterStack>
						<Box
							mt={3}
							mb={3}
							width={1}
							maxWidth={500}
							className={classes.step}
						>
							<div>
								<Box mb={1}>
									{configuration.textValues!.map(textVal => (
										<Box mt={2} key={textVal}>
											<NormalTextField
												fullWidth
												required
												id={textVal}
												label={capitalize(textVal.replace('_', ' '))}
												value={instanceData.get(textVal) ?? ''}
												onChange={text => {
													instanceData.set(textVal, text);
													setInstanceData(new Map(instanceData));
												}}
											/>
										</Box>
									))}
								</Box>
								{configuration.numberValues?.length !== 0 && <Divider />}
								<Box mt={1}>
									{configuration.numberValues!.map(numVal => (
										<Box mt={2} key={numVal}>
											<NormalTextField
												fullWidth
												type="number"
												required
												id={numVal}
												label={capitalize(numVal.replace('_', ' '))}
												value={instanceData.get(numVal) ?? 0}
												onChange={val => {
													instanceData.set(numVal, +val);
													setInstanceData(new Map(instanceData));
												}}
											/>
										</Box>
									))}
								</Box>
							</div>
						</Box>
					</CenterStack>
				);
			case 1:
				return (
					<CenterStack>
						<Box
							mt={3}
							mb={3}
							width={1}
							maxWidth={500}
							className={classes.step}
						>
							{configuration.options!.map(option => (
								<Box mt={2} key={option.name}>
									<FormControl fullWidth>
										<InputLabel htmlFor={option.name}>
											{capitalize(option.name.replace('_', ' '))}
										</InputLabel>
										<Select
											value={instanceData.get(option.name) ?? option.default}
											onChange={event => {
												instanceData.set(
													option.name,
													event.target.value as string
												);
												setInstanceData(new Map(instanceData));
											}}
											fullWidth
											inputProps={{
												name: option.name,
												id: option.name
											}}
										>
											{option.options.map(value => (
												<option key={value} value={value}>
													{value}
												</option>
											))}
										</Select>
									</FormControl>
								</Box>
							))}
						</Box>
					</CenterStack>
				);
			case 2:
				return creating ? (
					<CenterStack>
						<Box
							mt={3}
							mb={3}
							width={1}
							maxWidth={500}
							className={classes.step}
						>
							<LoadingPage size={100} />
							<Typography>
								Selected instance is being built. It can take some time. You can
								wait for the result or go to Dashboard and see status there.
							</Typography>
							<Button href="/dashboard" variant="outlined">
								Go to Dashboard
							</Button>
						</Box>
					</CenterStack>
				) : (
					<CenterStack>
						<Box
							mt={3}
							mb={3}
							width={1}
							maxWidth={500}
							className={classes.step}
						>
							<Box mb={1} width={1}>
								<LocalNetworkIdSelector
									setDefaultNetwork={setDefaultNetwork}
									setSelectedNetwork={setSelectedNetwork}
									selectedNetwork={
										instanceData.get('local_network_id') ?? undefined
									}
								/>
							</Box>
							<Box mb={1} width={1}>
								<FloatingIPSelector
									setDefaultFloatingIP={setDefaultFloatingIP}
									setSelectedFloatingIP={setSelectedFloatingIP}
									selectedFloatingIP={
										instanceData.get('floating_ip') ?? undefined
									}
								/>
							</Box>
							<Box mb={1} width={1}>
								<SSHKeySelector
									setDefaultKey={setDefaultKey}
									setSelectedKey={setSelectedKey}
									selectedKey={instanceData.get('ssh') ?? undefined}
								/>
							</Box>
						</Box>
					</CenterStack>
				);

			case 3:
				return (
					<CenterStack>
						<Box
							mt={3}
							mb={3}
							width={1}
							maxWidth={500}
							className={classes.step}
						>
							{errorMessage === '' ? (
								<>
									<div>
										<Typography variant="h4">Success.</Typography>
									</div>
									<div>
										<Typography>
											Your instance is created. You can go to dashboard to see
											further instructions.
										</Typography>
									</div>
									<div>
										<Button
											href="/dashboard"
											variant="contained"
											color="primary"
										>
											Go to Dashboard
										</Button>
									</div>
								</>
							) : (
								<>
									<div>
										<Typography variant="h4">Error.</Typography>
									</div>
									<div>
										<Typography>{errorMessage}</Typography>
									</div>
									<div>
										<Button
											href="/dashboard"
											variant="contained"
											color="primary"
										>
											Go to Dashboard
										</Button>
									</div>
								</>
							)}
						</Box>
					</CenterStack>
				);
			default:
				return <WrongPath />;
		}
	};

	return (
		<Container maxWidth="xl">
			<Box mb={2} mt={2}>
				<CenterStack>
					<Typography variant="h3">Create new {configuration.name}</Typography>
				</CenterStack>
				{renderStep()}
				<Divider />
				<Grid
					justify="center"
					alignItems="center"
					container
					className={classes.buttons}
				>
					{activeStep !== 0 && activeStep < steps.length - 1 && (
						<Button
							variant="text"
							color="inherit"
							size="large"
							onClick={() => setActiveStep(activeStep - 1)}
						>
							Previous
						</Button>
					)}
					{activeStep < steps.length - 1 && (
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={async () => {
								// create the instance
								if (activeStep === 2) {
									try {
										setCreating(true);
										instanceData.set('user_name', context!.user!.name);
										instanceData.set('user_email', context!.user!.email);
										const taskId = await postInstance(
											configuration.name,
											instanceData
										);
										try {
											await pWaitFor(
												async () => {
													const state = (await getTask(taskId)).state;
													return state !== 'STARTED' && state !== 'PENDING';
												},
												{ interval: 1900 }
											);
											const taskState = (await getTask(taskId)).state;
											if (taskState === 'SUCCESS') {
												setErrorMessage('');
											} else {
												setErrorMessage(
													'Error: Something went bad while creating the instance. Check your limits and try again.'
												);
											}
											setCreating(false);
										} catch (err) {
											// pwaitfor timeouted
											if (err instanceof TimeoutError) {
												setErrorMessage(
													'TimeoutError: Status of the instance is still unknown. Please check dashboad instances table and try again.'
												);
												setCreating(false);
											} else {
												throw err;
											}
										}
									} catch (err) {
										if (err?.response?.status === 401) {
											console.log('Session expired');
											context?.logout();
										} else {
											throw err;
										}
									} finally {
										// setCreating(false);
									}
								}
								setActiveStep(activeStep + 1);
							}}
							disabled={!activateNext() || creating}
						>
							{activeStep === 2 ? 'Build' : 'Next'}
						</Button>
					)}
				</Grid>
			</Box>
			<Stepper className={classes.stepper} activeStep={activeStep}>
				{steps.map(step => (
					<Step key={step}>
						<StepLabel>{step}</StepLabel>
					</Step>
				))}
			</Stepper>
		</Container>
	);
};
