import React from 'react';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';

class CityForm extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }
  change(e) {
    this.props.onChange(e.target.value);
  }

  submit(e) {
    e.preventDefault();
    e.stopPropagation();

    this.props.onSubmit()
  }

  render() {
    const formValue = this.props.formValue;
    return (
      <form onSubmit={this.submit}>
      <Grid container justify="center" alignItems="center" spacing={2}>
        <Grid item>
          <TextField id="outlined-basic" label="City Name or Zip Code" value={formValue} onChange={this.change} variant="outlined" />
        </Grid>
        <Grid item>
          <Button onClick={this.submit} variant="contained">Add City</Button>
        </Grid>
      </Grid>
      </form>
    );
  }
  
}

export default CityForm;