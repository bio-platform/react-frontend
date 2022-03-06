import { FormControl, InputLabel, Select, Typography } from '@material-ui/core';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';

import { getFloatingIps } from '../../api/InstanceApi';
import { FloatingIPData } from '../../models/FloatingIPData';
import { AuthContextType, AuthContext } from '../../routes/AuthProvider';
import { LoadingPage } from '../static/LoadingPage';

export type FloatingIPSelectorProps = {
	selectedFloatingIP?: number | string;
	setDefaultFloatingIP: (keyName: string) => void;
	setSelectedFloatingIP: (
		event: ChangeEvent<{ name?: string | undefined; value: unknown }>
	) => void;
};

export const FloatingIPSelector = ({
	selectedFloatingIP,
	setDefaultFloatingIP,
	setSelectedFloatingIP
}: FloatingIPSelectorProps) => {
	const [floatingIPs, setFloatingIPs] = useState<FloatingIPData[] | undefined>(
		[]
	);
	const [loading, setLoading] = useState(true);

	const context = useContext<AuthContextType>(AuthContext);

	useEffect(() => {
		try {
			(async () => {
				const response = await getFloatingIps();
				if (response.length === 0) {
					setFloatingIPs(undefined);
					setLoading(false);
					return;
				}
				setFloatingIPs(response);
				setDefaultFloatingIP(response[0].name);
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
	}, [context]);

	if (loading) {
		return <LoadingPage size={20} />;
	}

	if (!floatingIPs) {
		// floating ips are not defined it needs to be allocated\
		return (
			<div>
				<Typography>Floating IP will be created automatically.</Typography>
			</div>
		);
	}

	return (
		<div>
			{floatingIPs?.length > 0 && (
				<FormControl fullWidth>
					<InputLabel htmlFor="floating-ip">Floating IP</InputLabel>
					<Select
						fullWidth
						value={selectedFloatingIP ?? floatingIPs?.[0].name}
						onChange={setSelectedFloatingIP}
						inputProps={{
							name: 'floating-ip',
							id: 'floating-ip'
						}}
					>
						{floatingIPs?.map((floatingIP: FloatingIPData) => (
							<option key={floatingIP.name} value={floatingIP.name}>
								{floatingIP.name}
							</option>
						))}
					</Select>
				</FormControl>
			)}
		</div>
	);
};
