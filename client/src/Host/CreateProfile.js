import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { PersonalSelect } from '../Select';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';


const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: "60%",
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing.unit * 10,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
		width: 100
	},
	select: {
		marginLeft: '40px',
		width: 100
	},
	phone: {
		width: 300
	},
	story: {
		height: 100,
	}
});

const INFORMATION = {
	phone: '',
	gender: '',
	languages: [],
	ethnicities: [],
	religion: [],
	story: '',
};

class SignUpFormBase extends Component {
	constructor(props) {
		super(props);
		this.state = { INFORMATION }
	}

	onSubmit = event => {
		event.preventDefault();
		console.log(this.state);
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};
	onSelect = (name) => (selected) => {
		this.setState({
			[name]: selected
		})
	}
	render() {
		const { classes } = this.props;

		return (
			<main className={classes.main}>
				<CssBaseline />
				<Paper className={classes.paper}>
					<div style={{ width: '50%' }}>
						<form className={classes.form} onSubmit={this.onSubmit} >
							<h3>Create Profile</h3>
							<div style={{
								display: 'flex',
								alignItems: 'baseline',
								justifyContent: 'space-between',
							}}>
								<FormControl className={classes.phone} margin="normal" fullWidth>
									<InputLabel htmlFor="name">Phone Number</InputLabel>
									<Input id="phone" name="phone" required autoComplete="phone" onChange={this.onChange} autoFocus />
								</FormControl>
								<FormControl className={classes.select}>
									<InputLabel htmlFor="gender">Gender</InputLabel>
									<Select
										value={this.state.gender}
										onChange={this.onChange}
										inputProps={{
											name: 'gender',
											id: 'gender'
										}}
									>
										<MenuItem value="male">Male</MenuItem>
										<MenuItem value="female">Female</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div style={{
								display: 'flex',
								flexWrap: 'wrap',
								justifyContent: 'space-between',
								paddingTop: '10px'
							}}>

								<div style={{ width: '50%', padding: '3px 5px', dislay: 'flex', }}>
									<PersonalSelect size="6" onSelect={this.onSelect} />
								</div>

							</div>
							<p style={{ margin: 0, paddingTop: '10px' }}>Personal Statement</p>
							<TextField
								id="outlined"
								className={classes.story}
								multiline
								fullWidth
								name="story"
								margin="normal"
								variant="outlined"
								onChange={this.onChange}
							/>
							{/* <Link to="/hostdash"> */}
							<div class="d-flex justify-content-center">
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									Continue
                </Button>
							</div>
							{/* </Link> */}
						</form>
					</div>

				</Paper>
			</main>
		);
	}
}

const SignUpForm = compose(
	withRouter,
	withStyles(styles),
)(SignUpFormBase);


export default SignUpForm;