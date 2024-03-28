import React, { useEffect, useState } from "react";
import { Cards, Chart, CountryPicker } from "./helper";

import { fetchData } from "../../api/covidTracker";
import { Paper, Grid, Typography } from '@material-ui/core';
import useStyles from './styles';


const Home = () => {
    const [state, setState] = useState({
        data: {},
        country: "",
    }

    )


    useEffect(() => {
        const fetchedData = fetchData();
        setState({ data: fetchedData });
    }, []);

    const handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        setState({ data: fetchedData, country: country });
    };

    const classes = useStyles();

    const { data, country } = state;
    return (
        <>


            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {country ? (
                        <>
                            <Paper className={classes.paper} elevation={12} justify>
                                <Cards data={data} country={country} />
                                <Typography variant='h5'>Displaying Covid data for {country}</Typography>
                            </Paper>
                        </>
                    ) : (null)}
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Chart className={classes.chart} data={data} country={country} />
                    </Paper>
                </Grid>
            </Grid >
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper className={classes.paper} elevation={12} justify>
                        <Typography>Choose country to display data</Typography>
                        <CountryPicker handleCountryChange={handleCountryChange} />
                    </Paper>
                </Grid>
            </Grid>



        </>
    );

}

export default Home;

// import React, { useState, useEffect } from "react";
// import { Cards, CountryPicker, Chart } from "./Components";
// import { fetchData } from "./api/";
// import styles from "./App.module.css";
// import Footer from "./Components/Footer/Footer";
// import image from "./images/image.png";

// const App = () => {
//   const [data, setData] = useState({});
//   const [country, setCountry] = useState();

//   const handleCountryChange = async (country) => {
//     const data = await fetchData(country);
//     setCountry(country);
//     setData(data);
//   };

//   useEffect(() => {
//     async function loadData() {
//       const data = await fetchData();
//       setData({ data });
//     }
//     loadData();
//   }, []);

//   console.log(data);

//   return (
//     <div className={styles.container}>
//       <img className={styles.image} src={image} alt="COVID-19" />
//       <br />
//       <text>
//         <b>Global and Country Wise Cases of Corona Virus</b>
//       </text>
//       <br />
//       <text>
//         <i>(For a Particlar select a Country from below)</i>
//       </text>
//       <br />
//       <br />
//       <Cards data={data} country={country} />
//       <CountryPicker handleCountryChange={handleCountryChange} />
//       <Chart data={data} country={country} />
//       <Footer />
//     </div>
//   );
// };

// export default App;