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
            begin: date,
            properties: ['home1', 'home2', 'home3']

        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.click();
      };


    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
        // console.log(this.state)
    };


    timeSlot = () => {
        const { classes } = this.props;

        return (
            <>
                <FormControl>
                    Property
                    <Select
                        id='property'
                        value={this.state.property}
                        className={classes.property}
                        onChange={this.handleInputChange('property')}
                        input={<OutlinedInput/>}
                        required
                    >
                        {this.state.properties.map((data) => {
                            return(
                                <MenuItem value={data}>{data}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
                <div style={{display: 'flex', padding: '1rem'}}>
                    <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        value={this.state.begin}
                        min="2019-05-09"
                        onChange={this.handleInputChange('begin')}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <p style={{fontSize: '40px', padding: '10px 1rem 0 1rem'}}>-</p>
                    <TextField
                        id="date"
                        label="End Date"
                        type="date"
                        min={this.state.begin}
                        onChange={this.handleInputChange('end')}
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                            <button style={{border: 'none', color: "#da5c48", display: "flex", align: "baseline"}}><Add></Add>Add another time slot</button>
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
