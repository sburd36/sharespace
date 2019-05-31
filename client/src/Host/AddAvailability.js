import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, FormControl, Select, OutlinedInput, MenuItem, InputLabel, withStyles} from '@material-ui/core/';
import moment from 'moment';
import { compose } from 'recompose';
import Add from '@material-ui/icons/AddCircleOutline';

import DateRangePicker from 'react-daterange-picker'
import "react-daterange-picker/dist/css/react-calendar.css";

const styles = theme => ({
    property: {
        width: '200px',
        height: '40px'
    },
})
const dateRanges = [
    {
      state: 'enquire',
      range: moment.range(
        moment().add(2, 'weeks').subtract(5, 'days'),
        moment().add(2, 'weeks').add(6, 'days')
      ),
    },
    {
      state: 'unavailable',
      range: moment.range(
        moment().add(3, 'weeks'),
        moment().add(3, 'weeks').add(5, 'days')
      ),
    },
    {
        state: 'unavailable',
        range: moment.range(
          moment().add(5, 'weeks'),
          moment().add(5, 'weeks').add(5, 'days')
        ),
      },
  ];

  const stateDefinitions = {
    available: {
      color: null,
      label: 'Available',
    },
    enquire: {
      color: '#ffd200',
      label: 'Enquire',
    },
    unavailable: {
      selectable: false,
      color: '#78818b',
      label: 'Unavailable',
    },
  };
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
            property: "",
            start: new Date(),
            end: new Date()
        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.click(this.state);
      };

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log(this.state)
    };

    handleSelect = (range, states) => {
        // range is a moment-range object
        this.setState({
          value: range,
          states: states,
        });
        console.log(this.state)
      }
    timeSlot = () => {
        const { classes } = this.props;
        let { start, end } = this.state;
        // start = moment(start.toLocaleString()).format("YYYY-MM-DD")
        // end = moment(start.toLocaleString()).format("YYYY-MM-DD")
        // const { from, to } = this.state;
        // const modifiers = { start: from, end: to };

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
                        {this.props.listings.map((data) => {
                            return(
                                <MenuItem value={data.name}>{data.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <div style={{display: 'flex', padding: '1rem'}}>
                        {/* <TextField
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
                    /> */}
                            <DateRangePicker 
                                onSelect={this.handleSelect}
                                showLegend={true}
                                singleDateRange={true}
                                value={this.state.value}
                                stateDefinitions={stateDefinitions}
                                defaultState="available"
                                selectionType='range'
                                dateStates={dateRanges}
                            />
                </div>
            </>
        )
    }
    render() {
        const { classes } = this.props;

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
  )(Availability);
  
  
  export default AddAvailabiliity;
