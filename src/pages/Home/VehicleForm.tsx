import React, { useEffect } from "react";
import { TextBox,Button } from '../../component/Control';
import { IVehicle } from '../../interface';
import { useForm } from '../../hooks';
import { Grid, makeStyles } from "@material-ui/core";
import * as  vehicleService from '../../services/vehicleService';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ROUTES } from '../../router/RouterConfig';
import { VEHICLE_LABELS, BUTTON_LABELS } from '../../constants/vehicle';

// Defining the initial state for the form
const initialState: IVehicle = {
    id: 0,
    name: "",
    driver: "",
    status: "",
    fuelType: "",
    equipments: ""
};

const useStyles = makeStyles({
    field: {
        marginTop: 30,
        marginBottom: 20,
        display: 'block',
    },
    idField: {
        'pointer-events': 'none'
    }
})

// VehicleForm() - defines the vehicle form actions
export const VehicleForm = ()=> {
    const classes = useStyles();
    const navigate = useNavigate();
    const {id} = useParams();

    /**
     * validate() valdiates the form fields
     * assuming all fields are required fieldss
     */
    const validate = (fieldValues = values) => {
        let temp: any = { ...errors }
        if ('name' in fieldValues) {
            if (fieldValues) {
                if (!fieldValues.name) {
                    temp.name = "This field is required.";
                } else {
                    temp.name = "";
                }
            }
        }
        if ('driver' in fieldValues) {
            if (fieldValues.driver) {
                if (fieldValues.driver === "") {
                    temp.driver = "This field is required.";
                } else {
                    temp.driver = "";
                }
            }
        }
        if ('status' in fieldValues) {
            if (fieldValues.status) {
                if (fieldValues.status === "") {
                    temp.status = "This field is required.";
                } else {
                    temp.status = "";
                }
            }
        }
        if ('fuelType' in fieldValues) {
            if (fieldValues.fuelType) {
                if (fieldValues.fuelType === "") {
                    temp.fuelType = "This field is required.";
                } else {
                    temp.fuelType = "";
                }
            }
        }
        if ('equipments' in fieldValues) {
            if (fieldValues.equipments) {
                if (fieldValues.equipments === "") {
                    temp.equipments = "This field is required.";
                } else {
                    temp.equipments = "";
                }
            }
        }
        setErrors({
            ...temp
        })

        temp.id = temp.id === 0 ? "" : temp.id;

        if (fieldValues === values) {
            if (temp.id === "" && temp.name === "" && temp.driver === "" && temp.status === "" && temp.fuelType === "" && temp.equipments === "") {
                return true;
            }
        }
    }

   // getting the event handlers from our custom hook
    const { onChange, values, errors, setErrors, resetForm, setValues } = useForm(
        initialState,
        true,
        validate,
        initialState
    );

    // for submit button function
    /**
     * 
     * @handleSubmit event will either update the vehicle details or insert 
     */
    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (validate()) {
            if (id != null && id !== undefined && parseInt(id) !== 0) {
                vehicleService.updateVehicle(values);
            }
            else {
                vehicleService.insertVehicle(values);
            }
            navigate(ROUTES.Home);
        }
        else {
            console.log("Form Validation Error")
        }
    }

    const navigateToUserList = () => {
        navigate(ROUTES.Home);
    }

    useEffect(() => {
        if (id != null && id !== undefined && parseInt(id) !== 0 && !id.includes("v")) {
            const vehicle = vehicleService.getVehicleById(parseInt(id));
            setValues({
                ...vehicle[0]
            })
        } else if (id != null && id !== undefined && id.includes("v")) {
            const vehicle = vehicleService.getVehicleById(id);
            setValues({
                ...vehicle[0]
            })
        }
    }, [id, setValues])

    return(
        <>
            <Grid container justifyContent="center" alignItems="center" direction="column" style={{minHeight:"100vh"}}>
                {id != null && id !== undefined && parseInt(id) !== 0 ? <h1>Edit Vehicle</h1> : <h1>Add Vehicle</h1>}
            <form onSubmit={handleSubmit}>
                <TextBox
                    id="id"
                    name="id"
                    type="text"
                    label={VEHICLE_LABELS.vehicleId}
                    value={values.id}
                    onChange={onChange}
                    error={errors.id}
                    data-testid="vTid"
                    aria-labelledby="id"
                    className={classes.idField}
                />
                
                <TextBox
                    id="name"
                    name="name"
                    type="text"
                    label={VEHICLE_LABELS.name}
                    value={values.name}
                    onChange={onChange}
                    error={errors.name}
                    data-testid="nameTid"
                />

                <TextBox
                    id="driver"
                    name="driver"
                    type="text"
                    label={VEHICLE_LABELS.driver}
                    value={values.driver}
                    onChange={onChange}
                    error={errors.driver} 
                    className={classes.field} 
                    data-testid="driverTid"
                    fullWidth             
                />
                 <TextBox
                    id="status"
                    name="status"
                    type="text"
                    label={VEHICLE_LABELS.status}
                    value={values.status}
                    onChange={onChange}
                    error={errors.status}
                    className={classes.field}
                    data-testid="statusTid"     
                    fullWidth             
                />
                <TextBox
                    id="fuelType"
                    name="fuelType"
                    type="text"
                    label={VEHICLE_LABELS.fuel}
                    value={values.fuelType}
                    onChange={onChange}
                    error={errors.fuelType}
                    className={classes.field} 
                    data-testid="fuelTid"     
                    fullWidth             
                />
                <TextBox
                    id="equipments"
                    name="equipments"
                    type="text"
                    label={VEHICLE_LABELS.equipments}
                    value={values.equipments}
                    onChange={onChange}
                    error={errors.equipments}
                    className={classes.field}
                    data-testid="equipmentsTid"
                    fullWidth
                />
                <Button
                    type={BUTTON_LABELS.submit}
                    text="submit"
                    color="primary"
                    size="small"
                    variant="contained"
                />
                <Button
                    text={BUTTON_LABELS.reset}
                    color="default"
                    size="small"
                    variant="contained"
                    onClick={resetForm}
                />
                  <Button
                    text={BUTTON_LABELS.cancel}
                    color="default"
                    size="small"
                    variant="contained"
                    onClick={navigateToUserList}
                  />
             </form>
            </Grid>
        </>
    )
}