import React from 'react';
import {
	makeStyles,
	Theme,
	createStyles,
	Paper,
	Typography
} from '@material-ui/core';

type Props = {
	title: string;
	children?: React.ReactNode;
	color?: 'primary' | 'secondary';
};

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
			marginTop: theme.spacing(2)
		},
		paperHeader: {
			marginTop: -theme.spacing(5),
			padding: theme.spacing(2),
			backgroundColor: theme.palette.info.main,
			color: theme.palette.primary.contrastText,
			borderRadius: 4
		},
		paperHeaderSecondary: {
			marginTop: -theme.spacing(5),
			padding: theme.spacing(2),
			backgroundColor: theme.palette.secondary.main,
			color: theme.palette.primary.contrastText,
			borderRadius: 4
		}
	})
);

export const HeaderPaper = (props: Props) => {
	const styles = useStyles();

	return (
		<Paper className={styles.paper}>
			<div
				className={
					props.color === 'secondary'
						? styles.paperHeaderSecondary
						: styles.paperHeader
				}
			>
				<Typography variant="h6">{props.title}</Typography>
			</div>
			{props.children}
		</Paper>
	);
};
