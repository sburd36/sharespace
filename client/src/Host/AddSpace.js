import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { withFirebase } from '../Firebase';
import { listing } from '../filter'
import { HomeType, Location, Rules, Amenities } from '../filter'
import { CustomExpand } from '../Select'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { compose } from 'recompose';


const styles = theme => ({
	main: {
			width: 'auto',
			display: 'block', // Fix IE 11 issue.
			marginLeft: theme.spacing.unit * 3,
			marginRight: theme.spacing.unit * 3,
			[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
				//width: 1200,
				//height: 3000,
				marginLeft: 'auto',
				marginRight: 'auto',
			},
		},
		paper: {
			marginTop: theme.spacing.unit * 2,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			//padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
		},
		form: {
			//height: 3000
		},
	formControl: {
		//margin: theme.spacing.unit * 2,
	//flexGrow: 1,
	//flex: "1 1 33%",
	padding: "10px",
	width: "33%",
	},
	select: {
		//height: 50
	},
	selectEmpty: {
		marginTop: theme.spacing.unit,
},
floatingLabelFocusStyle: {
	color: "white"
},
box: {
	display: "flex",
	alignItems: "center",
	flexWrap: "wrap",
	//justifyContent: "space-between"
	
},
formLabel: {
	color: "#da5c48",
	fontSize: "14px"
},
expand: {
	boxShadow: "none",
	border: "0.5px solid #7e9fa8"
},
textField: {
	paddingRight: "10px",
	width: "33%"
}

});
const SPACE = {

};

class Listing extends React.Component {
	constructor(props) {
			super(props)
			this.state ={
				amenities: {},
				rules: {},
				labelColor: 'black',
				name: '',
				location: '',
				type: '',
				address: '',
				zip: '',
				guests: 0,
				photos: [],
				description: '',
				information: '',
				amenities: [],
				rules: [],
				checkin: "",
				checkout: "",
			}
		}

	// For Select
	handleChange = name => event => {
			this.setState({
					[name]: event.target.value
			})
			console.log(this.state)
	}

	// For Input
	onInputChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	
	}

	handleChecked = (name, selected) => (event) => {
		var obj = this.state[`${name}`];
		obj[`${selected}`] = event.target.checked;
		this.setState({[name]: obj})
	}

	onSubmit = event => {
		event.preventDefault();
		console.log(this.state.amenities)
		let keepA = []
		let keepB = []
		for(let key in this.state.amenities) {
			
			if (this.state.amenities[key] == true) {
				keepA.push(key)
			}
		}
		for(let key in this.state.rules) {
			
			console.log(key)
			if (this.state.rules[key] == true) {
				keepB.push(key)
			}
		}
		const {location, type, address, zip, guests, description, information, name, checkin, checkout} = this.state
		this.props.firebase.auth.onAuthStateChanged((user) => {
			if (user) {
				let listObj = {
					'hostID': user.uid, 
					'location': location, 
					'type': type,
					'address': address,
					'zip': zip,
					'guestCount': guests,
					'photos': 'no photos currently',
					'description': description,
					'information': information,
					'amenities': keepA,
					'houseRules': keepB,
					'name': name,
					'checkin': checkin,
					'checkout': checkout

				}
				console.log(user.uid)
				console.log(this.state)
				let key = this.props.firebase.listings().push(listObj)
				listObj['id'] = key.key
				// .then(() => {
				//   this.setState({...SPACE});
				//   // this.props.history.push('/host/dash')
				// })
				// .catch(error => {
				//   this.setState({ error });
				// })
				// this.props.firebase.db.ref('/user/'+user.uid+'/listings').push(key.key)
				console.log(key.key)
				this.props.firebase.userDie(user.uid).push({'listingID': key.key}).then(()=>{
					this.props.firebase.user(user.uid).update({'haveListing': true})

				});
				listObj['availability'] = []
				listObj['currentBookings'] = []
				listObj['pastBookings'] = []
				listObj['pendingBookings'] = []
				this.props.saveListingID(key.key, listObj)
				this.props.click()
			} else {
				console.log("no host signed in")

			}

	})

	console.log(this.state)
	};
	
	render() {
			console.log(this.props)
			const { classes } = this.props;
			console.log(this.state)
			return (
					<main className={classes.main}>
						<CssBaseline />
						<form className={classes.form} onSubmit={this.onSubmit}>
								<h4>Add Listing </h4>
								<div className={classes.box}>
								
								{/* Listing Name */}
								<FormControl variant="outlined" className={classes.formControl}>
									<InputLabel style={{color: this.state.labelColor, flexGrow: 1}} htmlFor="name">Listing Name</InputLabel>
									<Input id="name" name="name" required autoComplete="name" onChange={this.onInputChange}/>
											</FormControl>

								{/* Location */}
								<FormControl className={classes.formControl}>
									<p className={classes.formLabel}>Location</p>
									<Select
										id="location"
										value={this.state.location}
										onChange={this.handleChange('location')}
										input={<OutlinedInput/>}
										style={{height: "40px"}}
										//className={classes.select}
										required
									>
										{Location.values.map((data) => {
											return(
												<MenuItem value={data}>{data}</MenuItem>
											)
										})}
									</Select>
								</FormControl>

								{/* Home Type */}
								<FormControl className={classes.formControl}>
									<p className={classes.formLabel}>Home Type</p>
										<Select
											value={this.state.type}
											onChange={this.handleChange('type')}
											input={<OutlinedInput/>}
											className={classes.select}
											style={{height: "40px"}}
										>
										{HomeType.values.map((data) => {
											return(
												<MenuItem value={data}>{data}</MenuItem>
											)
										})}
															</Select>
												</FormControl>

								{/* Address */}
								<FormControl variant="outlined" className={classes.formControl}>
									<InputLabel htmlFor="address" style={{flexGrow: 1}}>Address</InputLabel>
									<Input id="address" name="address" required onChange={this.onInputChange}/>
											</FormControl>

								{/* Zipcode */}
								<FormControl variant="outlined" className={classes.formControl}>
									<InputLabel htmlFor="zip">Zip Code</InputLabel>
									<Input id="zip" name="zip" required onChange={this.onInputChange}/>
												</FormControl>

								{/* Upload Photos */}
								<input
									accept="image/*"
									className={classes.formControl}
									id="contained-button-file"
									multiple
									type="file"
									onChange={(e) => console.log(e.target.files)}
								/>
								
								{/* Number of Guests */}
								<FormControl className={classes.formControl}>
															<p className={classes.formLabel}># of Guests</p>
															<Select
															value={this.state.guests}
															onChange={this.handleChange('guests')}
															input={<OutlinedInput/>}
										className={classes.select}
										style={{height: "40px"}}
															>
															{[1,2,3,4,5].map((data) => {
																	return(
																			<MenuItem value={data}>{data}</MenuItem>
																	)
															})}
															</Select>
												</FormControl>

								{/* Check in time range */}
								{/* <FormControl variant="outlined" className={classes.formControl}>
									<InputLabel htmlFor="checkin">Check-in Time</InputLabel>
									<Input id="checkin" name="checkin" required onChange={this.onInputChange}/>
												</FormControl> */}
									<TextField
										id="time"
										label="Check-In Time"
										type="time"
										defaultValue="10:00"
										className={classes.textField}
										onChange={this.handleChange('checkin')}
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 300, // 5 min
										}}
									/>

									<TextField
										id="time"
										label="Check-Out Time"
										type="time"
										defaultValue="15:00"
										className={classes.textField}
										onChange={this.handleChange('checkout')}
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{
											step: 300, // 5 min
										}}
									/>		

								</div>

								<div>
										<div style={{display: "flex"}}>
										<div style={{flexGrow: 1}}>
											<p className={classes.formLabel}>Home Description</p>
											<TextField
												id="homeDescription"
												className='pr-3'
												multiline
												fullWidth
												margin="normal"
												onChange={this.onChange}
												variant="outlined"
												onChange={this.handleChange('description')}
												style={{marginTop: 0}}
												
											/>
										</div>

										<div style={{flexGrow: 1}}>
											<p className={classes.formLabel}>Check-in Information</p>
											<TextField
												id="checkinInfo"
												multiline
												fullWidth
												margin="normal"
												variant="outlined"
												onChange={this.handleChange('information')}
												style={{marginTop: 0}}
											/>
										</div>
														</div>
								</div>

								<hr style={{marginBottom: 0}}></hr>

								<div>
									<CustomExpand className={classes.expand} input={Amenities} select={this.handleChecked}></CustomExpand>
								</div>

								<div>
									<CustomExpand input={Rules} select={this.handleChecked}></CustomExpand> 
								</div>
								<div style={{padding: "30px"}}>

								</div>
												{/* <Grid container spacing={36}>
													<Grid item xs={12}>
														
														<CustomExpand input={Rules} select={this.handleChecked}></CustomExpand>         
													</Grid>
												</Grid> */}
								<div style={{position: 'absolute', right: '10px', bottom: '10px', marginTop: '10px'}}>
										<Button type='submit' id='button' onClick={this.onSubmit} >
											Add
									</Button>
								</div>
							
					</form>
				</main>
			)
	}
}

const AddListing = compose(
    withStyles(styles),
    withFirebase,
  )(Listing);
  
  
  export default AddListing;
