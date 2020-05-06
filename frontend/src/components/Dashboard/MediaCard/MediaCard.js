import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Divider from '@material-ui/core/Divider';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import ShareIcon from '@material-ui/icons/Share';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import styles from './style.module.css'
import {setCount} from '../../../reducers/count/actions';
import stores from '../../../stores';

const useStyles = makeStyles(()=>({
  root: {
    width: '',
    height: '38vh',
    // fontSize: 10,
    // marginLeft:300,
  },
  table: {
   marginTop:100
  },
  formControl: {
    minWidth: 100,
  },
  selectEmpty: {
  },
}));

export default function MediaCard() {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [open_db, setOpen_db] = React.useState(false);
  let shareLink = window.location.href;
  const [fields, setFields] = React.useState([{ value: null }]);
  function handleAdd() {
    const values = [...fields];
    values.push({ value: null });
    setFields(values);
    stores.dispatch(setCount(values.length));
    // demo();
  }

  var temp;
  function handleChange(i, event) {
    const values = [...fields];
    values[i].value = event.target.value; 
    temp = event.target.value;
    var idx = "X-"+(i+1);
    document.getElementById(idx).innerHTML = temp;
    setFields(values);
  }
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen_db = () => {
    setOpen_db(true);
  };
  const handleClose_db = () => {
    setOpen_db(false);
  };

  const handleConnect = () => {
    setOpen_db(false);
  };
  return (
    <div>
        <Card className={styles.cardStyles}>
        <table width="100%">
          <tr>
          <td align="left" valign="top" width="35%" style={{color:'gray'}}>
            Notebook
          </td>
          <td align="right" valign="top">
            <Button style={{fontSize:10}} onClick={()=>handleClickOpen_db()} color="primary">Connect to database</Button>
          </td>
          </tr>
            <Dialog open={open_db} onClose={handleClose_db}>
              <DialogContent>
                <DialogContentText>
                    <Grid container spacing={2} alignItems="flex-end">
                        <Grid item>Database:</Grid>
                        <Grid item>
                          <Select style={{fontSize:'10px'}} displayEmpty className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem disabled style={{fontSize:'10px'}}>select database</MenuItem>
                            <MenuItem style={{fontSize:'10px'}}>dummy database</MenuItem>
                          </Select>
                        </Grid>
                        <Grid item>
                          <Select style={{fontSize:'10px'}} displayEmpty className={classes.selectEmpty} inputProps={{ 'aria-label': 'Without label' }}>
                            <MenuItem disabled style={{fontSize:'10px'}}>select table</MenuItem>
                            <MenuItem style={{fontSize:'10px'}}>dummy table</MenuItem>
                          </Select>
                        </Grid>
                        </Grid>
                        <Grid container spacing={2} alignItems="flex-end">
                        <Grid item>Visualization:</Grid>
                        <Grid item>
                          <FormControl className={classes.formControl}>
                              <Select style={{fontSize:'10px'}}
                                onChange={e => handleChange( e)}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                              >
                                <InputLabel style={{ fontSize:'10px' }}>select visualization</InputLabel>
                                <MenuItem value={"Linear Graph"} style={{fontSize:'10px'}}>Linear Graph</MenuItem>
                                <MenuItem value={"Bar Graph"} style={{fontSize:'10px'}}>Bar Graph</MenuItem>
                                <MenuItem value={"Tabular View"} style={{fontSize:'10px'}}>Tabular View</MenuItem>
                                <MenuItem value={"Histogram"} style={{fontSize:'10px'}}>Histogram</MenuItem>
                                <MenuItem value={"Pie Chart"} style={{fontSize:'10px'}}>Pie Chart</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>
                      </Grid>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleConnect} color="primary">Connect</Button>
                <Button onClick={handleClose_db} color="primary">Close</Button>
              </DialogActions>
            </Dialog>
        </table>
          <Divider/>
        </Card>
        {/* TODO: PUT CONTENT HERE */}
    </div>
  );
}