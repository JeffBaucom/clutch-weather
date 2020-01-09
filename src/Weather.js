import React from 'react';
import Grid from '@material-ui/core/Grid';
import CityForm from './CityForm';
import WeatherDisplay from './WeatherDisplay';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      formValue: '',
    }
    this.handleFormValueChange = this.handleFormValueChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  fetchWeatherData(cityId) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=da5a57f44b5bbeeccde274d70ee6f686`)
      .then(res => res.json())
  }
  firstTimeCityFetch(cityQuery) {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=da5a57f44b5bbeeccde274d70ee6f686`)
      .then(res => res.json())
  }
  componentDidMount() {
    let rawStorage = localStorage.getItem('clutchWeatherCities');
    if (rawStorage) {
      let currentStorage = rawStorage.split(' ');
        if (currentStorage.length) {
          currentStorage.forEach((cityCode) => {
            this.fetchWeatherData(cityCode).then((result) => {
              let currentCities = this.state.cities;
              currentCities.push({city: result.city, list: result.list});
              this.setState({cities: currentCities, formValue: ''});
            }, (error) => {
              console.log(error);
            });
          });
        }
      }
    }

  handleFormSubmit() {
    this.firstTimeCityFetch(this.state.formValue).then((result) => {

      let updatedCities = this.state.cities;
      let currentStorage = localStorage.getItem('clutchWeatherCities');
      if (currentStorage) {
        if (currentStorage.indexOf(result.city.id.toString()) === -1) {
            currentStorage = `${currentStorage} ${result.city.id}`;
            updatedCities.push({city: result.city, list: result.list});
        }
      } else {
        updatedCities.push({city: result.city, list: result.list});
        currentStorage = result.city.id.toString();
      }
      localStorage.setItem('clutchWeatherCities', currentStorage);
      this.setState({cities: updatedCities, formValue: ''});
    }, (error) => {
      console.log(error);
    });
  }

  handleFormValueChange(formValue) {
    this.setState({cities: this.state.cities, formValue})
  }

  // Update localStorage
  // Update state obj
  handleDelete(city) {
    let cityStorageArray = localStorage.getItem('clutchWeatherCities').split(' ');
    if (cityStorageArray.length === 1) {
      this.setState({cities: [], formValue: this.state.formValue});
      localStorage.setItem('clutchWeatherCities', '');
    } else {
      // LocalStorage
      const idx = cityStorageArray.indexOf(city.id.toString());
      if (idx > -1) {
        cityStorageArray.splice(idx, 1);
        localStorage.setItem('clutchWeatherCities', cityStorageArray.join(' '));
      }

      // state obj
      const cityIdx = this.state.cities.findIndex((el) => el.city.id = city.id);
      let currentCities = this.state.cities;
      if (cityIdx > -1) {
        currentCities.splice(cityIdx, 1);
        this.setState({cities: currentCities, formValue: this.state.formValue});
      }
    }
  }

  render () {
    return (
      <div>
        <CityForm onSubmit={this.handleFormSubmit} onChange={this.handleFormValueChange} formValue={this.state.formValue}/>
        <Grid container direction="column" spacing={2} justify="center" alignItems="center">
          {this.state.cities.map((data) => {
            return <Grid item key={data.city.id} lg={8} xs={12}>
              <WeatherDisplay city={data.city} list={data.list} delete={this.handleDelete}/>
              </Grid>
          })}
        </Grid>
      </div>
    )
  }
}

export default Weather;