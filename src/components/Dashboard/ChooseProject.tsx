import React, { useContext, useEffect, useState } from 'react';
import { Container, Typography, Box, Button, Select } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { getProjects, putProject } from '../../api/UserApi';
import { Project } from '../../models/Project';
import { LoadingPage } from '../static/LoadingPage';
import { AuthContextType, AuthContext } from '../../routes/AuthProvider';
import { CenterStack } from '../static/Positioning';

export const ChooseProject = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedProject, setSelectedProject] = useState<Project | undefined>(
		undefined
	);

	const context = useContext<AuthContextType>(AuthContext);
	const history = useHistory();

	useEffect(() => {
		if (context?.project) {
			history.push('/dashboard/overview');
		} else {
			try {
				(async () => {
					const loadedProjects = await getProjects();
					setProjects(loadedProjects);
					setLoading(false);
				})();
			} catch (err) {
				if (err.response.status === 401) {
					console.log('Session expired');
					context?.logout();
				} else {
					throw err;
				}
			}
		}
	}, [context, history]);

	if (loading) {
		return (
			<Container maxWidth="xl">
				<LoadingPage />
			</Container>
		);
	}

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSelectedProject(
			projects.find(element => element.id === (event.target.value as string))
		);
	};

	const makeOptions = () => {
		const options = projects.map(project => (
			<option key={project.id} value={project.id}>
				{project.name}
			</option>
		));
		return options;
	};

	return (
		<Container maxWidth="xl">
			<Box mt={2} mb={3}>
				<CenterStack>
					<Box>
						<Typography variant="h2"> Choose project </Typography>
					</Box>
					<Box mt={2} mb={3}>
						<Select
							native
							value={selectedProject ? selectedProject.id : ''}
							onChange={handleChange}
							inputProps={{
								name: 'project',
								id: 'select-project'
							}}
							displayEmpty
						>
							<option key="undefined" value="" disabled>
								Choose project
							</option>
							{makeOptions()}
						</Select>
					</Box>
					<Box>
						<Button
							variant="contained"
							size="large"
							color="primary"
							disabled={selectedProject === undefined}
							onClick={async () => {
								try {
									await putProject(selectedProject!);
									context?.setProject(selectedProject!);
									history.push('/dashboard/overview');
								} catch (err) {
									if (err.response.status === 401) {
										console.log('Session expired');
										context?.logout();
									} else {
										throw err;
									}
								}
							}}
						>
							Select
						</Button>
					</Box>
				</CenterStack>
			</Box>
		</Container>
	);
};
