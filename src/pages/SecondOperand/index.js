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
    height: 550,
    textAlign: 'center'
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
  }
});

class SecondOperand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: '',
      second: '',
      error: false
    }
  }

  componentDidMount(){
    console.log(this.props.first);
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^\s*$/) !== null;
  }

  handleChange(e) {
    this.setState({
        second: e.target.value
      }, () => {
        if(this.isEmptyOrSpaces(this.state.second)) {
            this.setState({error: true});
        }
        else {
            this.setState({error: false});
        }
    });
  }

  gotoResult() {
    if(this.isEmptyOrSpaces(this.state.second)){
        console.log('error');
        this.setState({error: true});
    }
    else {
        console.log('success');
        this.setState({error: false});
        this.props.saveSecond(this.state.second);
        this.props.navigation.navigate('Result');
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
                <Paper className={classes.root}>
                  <Grid container>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Paper className={classes.card}>
                          <Typography className={classes.title} variant="body1" gutterBottom>
                            Expression Evaluator
                          </Typography>
                          <TextField
                              id="outlined-basic"
                              className={classes.textField}
                              label="Please enter a number"
                              type="number"
                              onChange={(e) => this.handleChange(e)}
                              margin="normal"
                              variant="outlined"
                              error={this.state.error}
                              helperText={this.state.error ? 'Empty field!' : ' '}
                          />
                          <Button variant="contained" color="secondary" className={classes.button} onClick={this.gotoResult.bind(this)}>
                            Add number
                          </Button>
                      </Paper>
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

SecondOperand.propTypes = {
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
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(SecondOperand));