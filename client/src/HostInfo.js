import React, { Component } from 'react';
import bedroom from "./img/bedroom.jpg";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Select from 'react-select'
import Animated from 'react-select/lib/animated'
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';

// For host pop-up
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    img: {
        height: '700px',
    },
    contact: {
        width: '600px'
    },
    button: {
        margin: theme.spacing.unit,
    },
    filter: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 2,
        width: 200,
    },
    input: {
        border: "0.5px solid "   
    }
})

function makeOptions(filter) {
    var options = []
    for (var i = 0; i < filter.length; i++) {
        var option = {
            value: filter[i],
            label: filter[i]
        }
        options[i] = option;
    }
    return options;
}

export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            booking: {}
        }
    }

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleHost = () => {
        this.setState({ open: true});
    };

    handleCloseHost = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const host = this.props.booking;
        const filters = this.props.filters
        return(
            <div>
                <div class="d-flex justify-content-center">
                    <Button onClick={this.handleHost} variant="outlined">
                            {host.space[0].begin} - {host.space[0].end}
                    </Button>   
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseHost}
                    scroll='paper'
                    fullWidth='true'
                    maxWidth='xl'
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogContent>
                        <img className={classes.img} src={bedroom}></img>
                        <h3>Home by {host.information.name}</h3>
                        <div class="d-flex">
                            <p style={{width: "700px"}}>
                                {host.information.description}
                            </p>
                            <DialogContentText>
                                <b>Address</b><br/>
                                {host.space[0].address}                        
                            </DialogContentText>
                        </div>
                        <hr></hr>
                        <h5>HOST INFORMATION</h5>
                        <div class="d-flex">
                            <p style={{width: "700px"}}>
                                aowjefpoi aosdjf wejoa;l ae ojagjas;oaj gaoijg wje aja;kngojgijg ;ag g aewg aowjefpoi aosdjf
                                 wejoa;l ae ojagjas;oaj gaoijg wje aja;kngojgijg ;ag g aewg
                            </p>
                            <div>
                                <b>Languages:</b> English, Chinese<br/>
                                <b>Religion:</b> Christian<br/>
                                <b>Ethnicity: </b> Chinese<br/>
                            </div>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <Button variant="outlined" className={classes.contact}>
                                {host.information.contact.phone}
                            </Button>
                            <Button variant="outlined" className={classes.contact}>
                                {host.information.contact.email}
                            </Button>
                        </div>
                        <hr></hr>
                        <h5>AMENTITIES</h5>
                        {
                            host.space[0].amentities.map((data) => {
                                return( 
                                    <Button className={classes.button} variant="outlined">
                                        {data}
                                    </Button>
                                )
                            })
                        }
                        <hr></hr>
                        <h5>CHECK-IN INFORMATION</h5>
                        <div class="d-flex">
                            <p style={{width: "700px"}}>
                                {host.space[0].checkinInfo.description}
                            </p>
                            <DialogContentText>
                                <b>Time: </b><br/>
                                {host.space[0].checkinInfo.time}                            
                            </DialogContentText>
                        </div>

                        <hr></hr>
                        <h5>HOUSE RULES</h5>
                        {
                            host.space[0].houseRules.map((data) => {
                                return(
                                    <Button className={classes.button} variant="outlined">
                                        {data}
                                    </Button>
                                )
                            })
                        }
                        <hr></hr>
                        <h5>BOOKING INFORMATION</h5>
                        <FormControl class="d-flex align-items-center p-3">
                        <Grid container justify="center">
                        <Grid item >
                            <TextField
                                id="standard-name"
                                label="Guest ID"
                                className={classes.textField}
                                value={this.state.guestID}
                                onChange={this.handleInputChange('guestID')}
                                margin="normal"
                            />
                            <TextField
                                id="standard-select-currency"
                                select
                                label="Number of guests"
                                className={classes.textField}
                                value={this.state.guest}
                                onChange={this.handleInputChange('guest')}
                                SelectProps={{
                                    MenuProps: {
                                    className: classes.menu,
                                    },
                                }}
                                margin="normal"
                                >
                                {[1,2,3,4].map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="date"
                                label="Start Date"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /> 
                            <TextField
                                id="date"
                                label="End Date"
                                type="date"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /> 
                            <Grid container direction="row" justify="around" spacing={8}>
                            { 
                                filters.map((data) => {
                                    return(
                                        <Grid item xs={3} className={classes.textField}>
                                        <h5>{data['name']}</h5>
                                         <Select
                                            closeMenuOnSelect={false}
                                            components={Animated()}
                                            isMulti
                                            options={makeOptions(data['values'])}
                                        />
                                        </Grid>
                                    )
                                })
                            }
                            </Grid>
                            <b>Note</b>
                            <textarea style={{width: "100%"}}></textarea>
                        </Grid>
                        </Grid>

                        </FormControl>
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={this.handleCloseHost} variant="contained" >
                            Cancel
                        </Button>
                        <Button onClick={this.handleCloseHost} variant="contained"  color="primary">
                            Confirm Host
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
})