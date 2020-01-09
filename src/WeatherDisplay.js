import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import Typography from '@material-ui/core/Typography';

class WeatherDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);
  }

  delete() {
    this.props.delete(this.props.city);
  }

  render() {
    const dateOptions = {weekday: 'long'};
    return (
      <Card>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item>
              <Typography variant="h4">{this.props.city.name}, {this.props.city.country}</Typography>
            </Grid>
            <Grid item>
              <Fab size="small" onClick={this.delete}>
                <CloseIcon />
              </Fab>
            </Grid>
          </Grid>
          <Grid container direction="row" spacing={2}>
            <Grid key={this.props.list[0].dt} item xs={4} lg={3}>
              <img src={`http://openweathermap.org/img/wn/${this.props.list[0].weather[0].icon}@2x.png`}></img>
              <Typography variant="subtitle1">{(new Intl.DateTimeFormat('en-US', dateOptions).format(this.props.list[0].dt*1000))}</Typography>
              <Typography variant="subtitle2">{(new Date(this.props.list[0].dt*1000)).toLocaleDateString()} </Typography>
              
              <Typography variant="subtitle2">{Math.round(this.props.list[0].main.temp - 273.15)*(9/5) + 32} &#8457;</Typography>
              <Typography variant="subtitle1">{this.props.list[0].weather[0].main}</Typography>
              <Typography variant="subtitle2">{this.props.list[0].weather[0].description}</Typography>
            </Grid>
            <Grid key={this.props.list[8].dt} item xs={4} lg={3}>
              <img src={`http://openweathermap.org/img/wn/${this.props.list[8].weather[0].icon}@2x.png`}></img>
              <Typography variant="subtitle1">{(new Intl.DateTimeFormat('en-US', dateOptions).format(this.props.list[8].dt*1000))}</Typography>
              <Typography variant="subtitle2">{(new Date(this.props.list[8].dt*1000)).toLocaleDateString()}</Typography>
              
              <Typography variant="subtitle2">{Math.round(this.props.list[8].main.temp - 273.15)*(9/5) + 32} &#8457;</Typography>
              <Typography variant="subtitle1">{this.props.list[8].weather[0].main}</Typography>
              <Typography variant="subtitle2">{this.props.list[8].weather[0].description}</Typography>
            </Grid>
            <Grid key={this.props.list[16].dt} item xs={4} lg={3}>
              <img src={`http://openweathermap.org/img/wn/${this.props.list[16].weather[0].icon}@2x.png`}></img>
              <Typography variant="subtitle1">{(new Intl.DateTimeFormat('en-US', dateOptions).format(this.props.list[16].dt*1000))}</Typography>
              <Typography variant="subtitle2">{(new Date(this.props.list[16].dt*1000)).toLocaleDateString()}</Typography> 
              
              <Typography variant="subtitle2">{Math.round(this.props.list[16].main.temp - 273.15)*(9/5) + 32} &#8457;</Typography>
              <Typography variant="subtitle1">{this.props.list[16].weather[0].main}</Typography>
              <Typography variant="subtitle2">{this.props.list[16].weather[0].description}</Typography>
            </Grid>

          </Grid>

        </CardContent>
        <CardActions>

        </CardActions>
      </Card>
    );
  }
}


export default WeatherDisplay;