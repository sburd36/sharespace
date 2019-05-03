import React, { Component } from 'react';
import women from "./img/53-.jpg";
import person from './img/person.svg';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// For filter expansion
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const tags: {
    language: {
            english: false,
            mandarine: false, 
            cantonese: false, 
            spanish: false,
            french: false,
            Japanese: false, 
            arabic: false
        },
    amentities: {
        kitchen: false,
        laundry: false, 
        fridge: false,
        wifi: false,
        computer: false,
        microwave: false,
        selfCheck: false,
        parking: false,
        bikeStorage: false,
        privateBathroom: false, 
        emails: false, 
        voicemail: false
       },
    needs: {
        crib: false,
        highChair: false, 
        pregnent: false,
        pets: false,
        childFriendly: false,
        publicTransport: false, 
        womenOnly: false
    }


        }

console.print(tags)