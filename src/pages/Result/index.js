import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';

const muiTheme = createMuiTheme({
  palette: {
    secondary: {
        main: '#7dcca5'
    },
    custom: {
        main: '#7dcca5'
    }
  }
});

const styles = theme => ({
  hide: {
    display:'none',
  },
  root: {
    display: 'flex',
  },
  paperRoot: {
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    backgroundColor: '#f2a811',
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  toolbarAvatar: {
    borderRadius: 0,
    width: 170,
    left: 10,
  },
  toolbarIconButton:{
    right:0,
    position:'absolute'
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    height: '100vh',
    overflow: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'gray'
  },
  card: {
    minWidth: 275,
    width: 350,
    height: 480,
    textAlign: 'center',
    boxShadow: 'none',
    display: 'flex',
    alignItems: 'center'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    lineHeight: 1, 
    textAlign: 'center', 
    fontFamily: 'inherit', 
    fontSize: '3.75rem', 
    color: '#7dcca5', 
    marginTop: 60, 
    fontWeight: '200'
  },
  pos: {
    marginBottom: 12,
  },
  textField: {
    width: '90%'
  },
  button: {
    width: '90%',
    textTransform: 'none',
    height: 65,
    fontSize: 18,
    color: '#ffffff'
  },
  gridCon: {
    marginTop: 40
  },
  box: {
    backgroundColor: '#ecf4f4',
    height: 63,
    width: 52,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    fontSize: 18
  },
  equals: {
    fontSize: 50,
    fontWeight: 100,
    fontFamily: 'inherit'
  },
  result: {
    fontSize: 80,
    fontWeight: 100,
    color: '#7dcca5',
    fontFamily: 'inherit'
  },
  formControl: {
    width: '43%',
    marginLeft: 5,
    marginRight: 5
  },
  bottom: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    width: 350
  }
});

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: '',
      operator: '+',
      operand: '',
      choiceOperator: ['+', '-', '*', '/'],
      error: false
    }
  }

  componentDidMount(){
    console.log(this.props.first);
    console.log(this.props.second);
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^\s*$/) !== null;
  }

  handleChange(e) {
    this.setState({
        operand: e.target.value
      }, () => {
        if(this.isEmptyOrSpaces(this.state.operand)) {
            this.setState({error: true});
        }
        else {
            this.setState({error: false});
        }
    });
  }

  handleSelect(e) {
    this.setState({
        operator: e.target.value
      }, () => {
    });
  }

  calculate() {
    var first;
    var second;
    var result;
    if(this.isEmptyOrSpaces(this.state.operand)){
        this.setState({error: true});
    }
    else {
        this.setState({error: false});
        first = this.props.first * Math.pow(10, this.state.operand);
        second = this.props.second * Math.pow(10, this.state.operand);
        if(this.state.operator == '+') {
          result = first + second;
          this.setState({result: result});
        }
        else if(this.state.operator == '-') {
          result = first - second;
          this.setState({result: result});
        }
        else if(this.state.operator == '*') {
          result = first * second;
          this.setState({result: result});
        }
        else {
          result = first / second;
          this.setState({result: result});
        }
    }
    //this.props.navigation.navigate('Second');
  }

  render() {
    const { classes } = this.props;
    let config = this.state.config;

    return (
      <MuiThemeProvider theme={muiTheme}>
          <div className={classes.root}>
            <main className={classes.content}>
              <div className={classes.tableContainer}>
                <Paper className={classes.paperRoot}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Paper className={classes.card}>
                        <Grid container direction="column" justify="center" alignItems="center" spacing={3} className={classes.gridCon}>
                          <div style={{display: 'inline-flex'}}>
                            <Box className={classes.box}>
                              {this.props.first}
                            </Box>
                            <Box className={classes.box}>
                              {this.props.second}
                            </Box>
                            <Box className={classes.box}>
                              {this.state.operator}
                            </Box>
                          </div>
                          <div>
                            <Typography className={classes.equals} variant="body1" gutterBottom>
                              =
                            </Typography>
                          </div>
                          <div>
                            <Typography className={classes.result} variant="body1" gutterBottom>
                              {this.state.result}
                            </Typography>
                          </div>
                        </Grid>
                      </Paper>
                      <Grid container direction="row" justify="center" alignItems="flex-end" className={classes.bottom}>
                        <Grid item xs={12} sm={12} md={12} lg={12} style={{marginBottom: 8}}>
                          <TextField
                              id="standard-select-currency"
                              select
                              label="Operator"
                              className={classes.formControl}
                              value={this.state.operator}
                              onChange={(e) => this.handleSelect(e)}
                              style={{
                                textAlign: 'left'
                              }}
                              SelectProps={{
                                MenuProps: {
                                  className: classes.menu,
                                },
                              }}
                              margin="normal"
                              variant="outlined"
                          >
                            {this.state.choiceOperator.map(value => (
                              <MenuItem key={value} value={value}>
                                {value}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                              id="outlined-basic"
                              className={classes.formControl}
                              label="Operand"
                              type="number"
                              onChange={(e) => this.handleChange(e)}
                              margin="normal"
                              variant="outlined"
                              error={this.state.error}
                              helperText={this.state.error ? 'Empty field!' : ' '}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} >
                          <Button variant="contained" color="secondary" className={classes.button} onClick={this.calculate.bind(this)}>
                            Add Operation
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Paper>
              </div>
            </main>
          </div>
      </MuiThemeProvider>
    );
  }
}

Result.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    first: state.first,
    second: state.second
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    saveFirst: (first) => dispatch({type: "FIRST", payload: { first: first }}),
    saveSecond: (second) => dispatch({type: "SECOND", payload: { second: second }}),
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Result));