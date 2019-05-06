import React from 'react'
import Select from 'react-select';
import Animated from 'react-select/lib/animated';
import {Personal, Space} from './filter'
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';

// For filter expansion
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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



function PersonalSelect() {
    return (
        Personal.map((data) => {
            return( 
                <div class="pt-3">
                    {data.name}
                    <Select
                        closeMenuOnSelect={false}
                        components={Animated()}
                        isMulti
                        name={data.name}
                        options={makeOptions(data['values'])}
                    />
                </div>
            )
        })
    )
}


class SpaceSelect extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleSelectChange = name => event => {
        this.setState({ [name]: event.target.checked});
    }

    handleExpandChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        })
    }
    render() {
        return (
            Space.map((d) => {
               return(
                <ExpansionPanel expanded={this.state.expanded === d.type} onChange={this.handleExpandChange(d.type)}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>{d.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Grid container>
                        {d.values.map((data) => {
                            return(
                                <Grid item>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={this.state.data}
                                        onChange={this.handleSelectChange(data)}
                                        value="checkedA"
                                    />
                                    }
                                    label={data}
                                />
                                </Grid>         
                            )
                        })}
                        </Grid>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
               ) 
            })
        )
    }
}

function CustomExpand(props) {
    const input = props.input;
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedF: true,
        checkedG: true,
      });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked });
      };
    return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{input.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid container>
                    {input.values.map((data) => {
                        return(
                            <Grid item>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state.data}
                                    onChange={handleChange(data)}
                                    value={data}
                                />
                                }
                                label={data}
                            />
                            </Grid>         
                        )
                    })}
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
    )
}
export {PersonalSelect, SpaceSelect, CustomExpand};

