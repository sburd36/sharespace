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

export default class Availability extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleHost = () => {
        this.setState({ open: true});
    };

    handleCloseHost = () => {
        this.setState({ open: false});
    };

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
      };
      handleConfirmDate = () => {
        this.setState({
            open: false
        })
    }
    render() {
        const properties = ['home1', 'home2', 'home3']
        return (
            <div class="d-flex justify-content-center">
                    <Button onClick={this.handleHost} variant="contained" color="primary">
                    Add Availability
                    </Button>   
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseHost}
                    scroll='paper'
                    fullWidth='true'
                    maxWidth='xl'
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogContent>
                    <FormControl>
                Property
                <Select
                value={this.state.property}
                // onChange={this.handleChange('property')}
                input={<OutlinedInput/>}
                >
                {properties.map((data) => {
                    return(
                        <MenuItem value={data}>{data}</MenuItem>
                    )
                })}
                </Select>
            </FormControl>
                    <TextField
                id="date"
                label="Start Date"
                type="date"
                onChange={this.handleInputChange('begin')}
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                id="date"
                label="End Date"
                type="date"
                onChange={this.handleInputChange('begin')}
                InputLabelProps={{
                    shrink: true,
                }}
            />
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={this.handleConfirmDate} variant="contained"  color="primary">
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

