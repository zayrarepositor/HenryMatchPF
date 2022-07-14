import { React, useEffect, useState } from "react";
// import { fetchAllCarTypes } from '../../../redux/carsResults';
// import { fetchAllLocations } from '../../../redux/searchBar';
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from "@mui/material/styles";
import { Grid, Container, Typography } from "@mui/material";
// components
// import Page from '../components/Page';
// import Iconify from './AdminComponents/Iconify';
// sections
import {
  AppCurrentVisits,
  // AppTasks,
  //   AppNewsUpdate,
  //   AppOrderTimeline,
  // AppCurrentVisits,
  // AppWebsiteVisits,
  //   AppTrafficBySite,
  AppWidgetSummary,
  //   AppCurrentSubject,
  //   AppConversionRates,
} from "./index";

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const dispatch = useDispatch();
  const [currentCustomers, setCurrentCustomers] = useState([]);
  const [carsStock, setCarStocks] = useState([]);
  const [Bookings, setBookings] = useState([]);

  const getUsers = async () => {
    // eslint-disable-next-line prefer-const
    let customers = await axios.get(
      "https://henrymatch-pg.herokuapp.com/users",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    setCurrentCustomers(customers);
  };

  //   const getBookings = async () => {
  //     // eslint-disable-next-line prefer-const
  //     let bookings = await axios.get('/bookings', {
  //       headers: {
  //         Authorization: localStorage.getItem('token'),
  //       },
  //     });
  //     setBookings(bookings);
  //   };

  //   const getCarsStock = async () => {
  //     // eslint-disable-next-line prefer-const
  //     let carsStock = await axios.get('/cars', {
  //       headers: {
  //         Authorization: localStorage.getItem('token'),
  //       },
  //     });
  //     setCarStocks(carsStock);
  //   };

  useEffect(() => {
    getUsers();
    // getBookings();
    // getCarsStock();
    // dispatch(fetchAllCarTypes());
    // dispatch(fetchAllLocations());
  }, []);

  const users = useSelector((state) => state.users);
  //   const { locations } = useSelector((state) => state.searchBar);

  const carTypesChartData = users?.map((gender) => {
    let values = 0;
    users?.forEach((gender) => {
      if (users.gender) {
        values++;
      }
    });

    return {
      label: `${gender}`,
      value: values,
    };
  });
  console.log(carTypesChartData);

  const theme = useTheme();

  const todooos = currentCustomers?.data;
  const active = todooos?.map((e) => e.active);
  const baneados = active?.filter((e) => e === false);

  const premium = todooos?.map((e) => e.premium);
  const pros = premium?.filter((e) => e === true);

  return (
    <div title="Dashboard">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <>
            <>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Usuarios registrados"
                  total={currentCustomers?.data?.length}
                  color="info"
                  icon={"clarity:users-solid"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Usuarios Premium"
                  total={pros?.length}
                  icon={"ic:baseline-diamond"}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Usuarios baneados"
                  total={baneados?.length}
                  color="warning"
                  icon={"el:ban-circle"}
                />
              </Grid>
              {/* <Grid item xs={12} sm={6} md={3}>
                <AppWidgetSummary
                  title="Modelos de vehiculos disponibles"
                  total={AllcarTypes?.length}
                  color="error"
                  icon={"clarity:car-solid"}
                />
              </Grid> */}
            </>
            {/* <Grid item xs={12} md={6} lg={8}>
               {/* <AppWebsiteVisits
                title="alquileres mensuales"
                // subheader="(+33%) mas que el semestre anterior"
                chartLabels={[
                  '01/01',
                  '02/01',
                  '03/01',
                  '04/01',
                  '05/01',
                  '06/01',
                  '07/01',
                  '08/01',
                  '09/01',
                  '10/01',
                  '11/01',
                  '12/01',
                  
                ]}
                chartData={[
                  {
                    name: 'Dias de semana',
                    type: 'column',
                    fill: 'solid',
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30,10],
                  }
                ]} /> 
            </Grid> */}
          </>

          <Grid item xs={12} md={6} lg={6}>
            <AppCurrentVisits
              title="Grafico por genero"
              chartData={carTypesChartData}
              chartColors={[
                theme.palette.info.main,
                theme.palette.success.main,
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid> */}
          {/* 
          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tareas importantes"
              list={[
                { id: '1', label: 'Comprar manteca 200gr' },
                { id: '2', label: 'Verificar stock de vehiculos' },
                { id: '3', label: 'Gestionar reclamos' },
                { id: '4', label: 'Gestionar usuarios' },
                { id: '5', label: 'Reparar los bugs existentes y agregar nuevos' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </div>
  );
}
