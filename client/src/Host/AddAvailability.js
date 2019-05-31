import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, FormControl, Select, OutlinedInput, MenuItem, InputLabel, withStyles} from '@material-ui/core/';
import moment from 'moment';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';
import Add from '@material-ui/icons/AddCircleOutline';
// import { DateFormatInput } from 'material-ui-next-pickers'
// import DayPickerInput from 'react-day-picker/DayPickerInput';
// import Helmet from 'react-helmet';

// import DayPicker, { DateUtils } from 'react-day-picker';
// import 'react-day-picker/lib/style.css';

const styles = theme => ({
    property: {
        width: '200px',
        height: '40px'
    },
})

class Availability extends React.Component {
    constructor(props) {
        super(props)        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var date = yyyy + '-' + mm + '-' + dd
        console.log(date);
        this.state = {
            haveListings: false,
            property: "",
            userID: "",
            begin: date,
            end: date,
            properties: props.listingNames,
            propertyObj: props.listingObjs,
            // for new calendar, firebase uses begin and end
            start: new Date(),
            end: new Date()
        }
    }


    componentDidUpdate() {
        if (this.props.listingNames != undefined && this.props.listingObjs != undefined) {
            this.state.properties = this.props.listingNames
            this.state.propertyObj = this.props.listingObjs
        }

        console.log("Inside componentDIdUpdate")
        console.log(this.state)

    }
    onSubmit = event => {
        event.preventDefault();
        this.props.click();
        console.log(this.state)
        if (this.props.profile.listings != undefined) {
  
            if(this.state.end != this.props.date) {
                let id = ""
                for ( let i = 0; i < this.state.propertyObj.length; i++) {
                    let obj = this.state.propertyObj[i] 
                    if (obj.name  == this.state.property) {
                        id = obj.id
                    }
                }
                let key = this.props.firebase.addAvailToListing(id).push({
                    name: this.state.property,
                    begin: this.state.begin,
                    end: this.state.end
                })

                let obj = {
                    id: key,
                    name: this.state.property,
                    begin: this.state.begin,
                    end: this.state.end
                }
                this.props.updateAvailability(id, obj)
            }
        }
      };

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(this.state)
    };
    // handleDayClick = (day) => {
    //     const range = DateUtils.addDayToRange(day, this.state);
    //     this.setState(range);
    //   }
    timeSlot = () => {
        const { classes } = this.props;
        let { start, end } = this.state;
        start = moment(start.toLocaleString()).format("YYYY-MM-DD")
        end = moment(start.toLocaleString()).format("YYYY-MM-DD")
        const { from, to } = this.state;
        const modifiers = { start: from, end: to };
        
        return (
            <>
                <FormControl>
                    <label>Choose Listing</label>
                    <Select
                        id='property'
                        value={this.state.property}
                        className={classes.property}
                        onChange={this.handleInputChange('property')}
                        input={<OutlinedInput/>}
                        required
                    >
                        {/* {this.props.listingNames.map((data) => {
                            return(
                                <MenuItem value={data.name}>{data.name}</MenuItem>
                            )
                        })} */}
                    </Select>
                </FormControl>
                <div style={{display: 'flex', padding: '1rem'}}>
                    {/* <DayPicker />
                    <DayPicker
                        className="Selectable"
                        numberOfMonths="2"
                        disabledDays={[
                            new Date(2019, 4, 12),
                            new Date(2019, 4, 20),
                            {
                              after: new Date(2019, 5, 6),
                              before: new Date(2019, 5, 12),
                            },
                          ]}
                        selectedDays={[from, { from, to }]}
                        modifiers={modifiers}
                        onDayClick={this.handleDayClick}
        />
        <Helmet>
          <style>{`
            .Selectable .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
                background-color: #f0f8ff !important;
                color: #4a90e2;
            }
            .Selectable .DayPicker-Day {
                border-radius: 0 !important;
            }
            .Selectable .DayPicker-Day--start {
                border-top-left-radius: 50% !important;
                border-bottom-left-radius: 50% !important;
            }
            .Selectable .DayPicker-Day--end {
                border-top-right-radius: 50% !important;
                border-bottom-right-radius: 50% !important;
            }
            `}</style>
        </Helmet> */}
                        <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        value={start}
                        className={classes.textField}
                        onChange={this.handleInputChange('start')}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.floatingLabelFocusStyle,
                        }}
                        inputProps={{
                            min: moment().format("YYYY-MM-DD"),
                        }}
                    />
                    <TextField
                        id="date"
                        label="End Date"
                        type="date"
                        value={end}
                        className={classes.textField}
                        onChange={this.handleInputChange('end')}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.floatingLabelFocusStyle,
                        }}
                        inputProps={{
                            min: start
                        }}
                    />
                </div>
            </>
        )
    }
    render() {
        const { classes } = this.props;
        console.log(this.props)
        console.log(this.state)
        const {properties, propertyObj} = this.state


        return (
            <div class="d-flex justify-content-around">

                <Dialog
                    open={this.props.open}
                    onClose={this.props.click}
                    scroll='paper'
                    maxWidth='xl'
                    aria-labelledby="scroll-dialog-title"
                >
                    <form onSubmit={this.onSubmit}>
                        <DialogContent className={classes.content}>
                            <h3>Add Availability</h3>
                                {this.timeSlot()}
                                <hr></hr>
                                {/* <button style={{border: 'none', color: "#da5c48", display: "flex", align: "baseline"}}><Add></Add>Add another time slot</button> */}
                            </DialogContent>
                        <DialogActions >
                            <Button type="submit" variant="contained"  color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

const AddAvailabiliity = compose(
    withStyles(styles),
    withFirebase,
  )(Availability);
  
  
  export default AddAvailabiliity;
