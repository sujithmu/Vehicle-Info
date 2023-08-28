import React, { useEffect, useState } from "react";
import {IVehicle} from '../../interface'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useParams } from "react-router-dom";
import * as  vehicleService from '../../services/vehicleService';
import { Container } from "@material-ui/core";
import {Button} from '../../component/Control';
import { useNavigate } from "react-router-dom";
import { ROUTES } from '../../router/RouterConfig';
import { VEHICLE_LABELS, BUTTON_LABELS } from '../../constants/vehicle';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export const ViewVehicle = ()=> {

    const classes = useStyles();
    const [data, setData] = useState<IVehicle>({id:0,name:"",driver: "",status: "",fuelType:"",equipments:""});
    const {id} = useParams();
    const navigate = useNavigate();

    const navigateToRVehicleList=()=>{
      navigate(ROUTES.Home);
    }

  useEffect(() => {
    if (id != null && id !== undefined && parseInt(id) !== 0 && !id.includes("v")) {
      const vehicle = vehicleService.getVehicleById(parseInt(id));
      setData(vehicle[0]);
    } else if (id != null && id !== undefined && id.includes("v")) {
      const vehicle = vehicleService.getVehicleById(id);
      setData(vehicle[0]);
    }
  }, [id])

  return (
    <Container>
        <div className={classes.root}>
            <h1>View Vehicle Details</h1>
            <Button
                    text={BUTTON_LABELS.back}
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={navigateToRVehicleList}
            />
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <Paper className={classes.paper}>{VEHICLE_LABELS.vehicleId}: {data.id}</Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>{VEHICLE_LABELS.name}: {data.name}</Paper>
                </Grid>

                <Grid item xs={12}>
                <Paper className={classes.paper}>{VEHICLE_LABELS.driver}: {data.driver}</Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>{VEHICLE_LABELS.fuel}: {data.fuelType}</Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>{VEHICLE_LABELS.status}: {data.status}</Paper>
                </Grid>
                <Grid item xs={12}>
                <Paper className={classes.paper}>{VEHICLE_LABELS.equipments}: {data.equipments}</Paper>
                </Grid>
            </Grid>
        </div>
    </Container>
  );
}