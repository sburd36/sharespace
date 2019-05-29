import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Add from '@material-ui/icons/AddCircleOutline';
import { DateFormatInput } from 'material-ui-next-pickers'

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
            property: "",
            start: new Date(),
            end: new Date()
        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.click();
        console.log(this.state)
      };


    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
        // console.log(this.state)
    };


    timeSlot = () => {
        const { classes } = this.props;
        const { start, end } = this.state;
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
                <div>
                    <label>Start Date</label>
                    <DateFormatInput 
                        name='date-input' 
                        value={start} 
                        onChange={(date) => this.setState({start: date, end: date})}
                        min={new Date()}
                    />
                </div>
                    <div>
                        <label>End Date</label>
                        <DateFormatInput 
                            name='date-input' 
                            value={end} 
                            onChange={(date) => this.setState({end: date})}
                            min={start}
                        />
                    </div>
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
                                Done
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
