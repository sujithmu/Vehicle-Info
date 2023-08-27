import React, { useState,useEffect,useMemo } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Container } from "@material-ui/core";
import * as  vehicleService from '../../services/vehicleService';
import {Button} from '../../component/Control';
import { useNavigate,useSearchParams } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { ROUTES } from '../../router/RouterConfig';
import { VEHICLE_LABELS, COMMON_LABELS, BUTTON_LABELS } from '../../constants/vehicle';

enum ColumnList {
  id = 'id',
  name = 'name',
  driver = 'driver',
  status = 'status',
  fuelType = 'fuelType',
  equipments = 'equipments',
  edit = 'edit',
  delete = 'delete',
  view = 'view'
}

type Column = {
  id: ColumnList;
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

/*
Table Columns were defined
*/
const columns: Column[] = [
  {
    id: ColumnList.id,
    label: VEHICLE_LABELS.vehicleId,
    minWidth: 100
  },
  {
    id: ColumnList.name,
    label: VEHICLE_LABELS.name,
    minWidth: 100
  },
  {
    id: ColumnList.driver,
    label: VEHICLE_LABELS.driver,
    minWidth: 100
  },
  {
    id: ColumnList.status,
    label: VEHICLE_LABELS.status,
    minWidth: 100
  },
  {
    id: ColumnList.fuelType,
    label: VEHICLE_LABELS.fuel,
    minWidth: 100
  },
  {
    id: ColumnList.equipments,
    label: VEHICLE_LABELS.equipments,
    minWidth: 100
  },
  {
    id: ColumnList.edit,
    label: COMMON_LABELS.edit,
    minWidth: 100
  },
  {
    id: ColumnList.delete,
    label: COMMON_LABELS.delete,
    minWidth: 100
  },
  {
    id: ColumnList.view,
    label: COMMON_LABELS.view,
    minWidth: 100
  }
];

// Below are the searchable fileds in the grid list
type Data = {
  id: string;
  name: string;
  driver: string;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  uploadbtn: {
    paddingLeft: 160
  },
  refreshbtn: {
    float: 'right'
  }
});

/* 
VehicleList() method defines the grid row functionalities
User can see and edit the records
Each record in the grid is configurable - EDIT/VIEW/UPDATE/DELETE
*/
export const VehicleList = ()=> {
    const classes = useStyles();

    const [page, setPage] = useState<number>(0);

    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const [records, setRecords] = useState<Data[]>([]);

    const [searchParams] = useSearchParams();

    const [search, setSearch] = useState(searchParams.get('filter') || '');

    const navigate = useNavigate();

    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
        const rows = vehicleService.getExistingVehicles();
        setRecords(rows);
    }, []);

    /*
    navigateToAddVehicle() - redirect to add new vehicles form
    */
    const navigateToAddVehicle = ()=> {
      navigate(ROUTES.AddVehicle); 
    }

    /*
    navigateToEditVehicle() - redirect to edit vehicles form
    */
    const navigateToEditVehicle = (record: { id: number; }) => {
      navigate(ROUTES.UpdateVehicle + `${record.id}`);
    }

    /*
    navigateToViewVehicle() - redirect to view vehicles form
    */
    const navigateToViewVehicle = (record: { id: number; }) => {
      navigate(ROUTES.ViewVehicle+`${record.id}`); 
    }

    /*
    deleteVehicle() - deletes the record from grid
    */
    const deleteVehicle = (record: { id: number; }) => {
      vehicleService.deleteVehicle(record.id);
      const rows = vehicleService.getExistingVehicles();
      setRecords(rows);
    }

    /*
    filteredData() - for filtering the records already added
    */
    const filteredData = useMemo(() => {
      return records.filter(x=>!search || x.name.toLowerCase().includes(search) 
        || x.driver.toLowerCase().includes(search))
    },[records, search])

    const handleOnChange = (e: any) => {
      setFile(e.target.files[0]);
    };

    const [file, setFile] = useState();
    const fileReader = new FileReader();

    /*
    handleOnSubmit() - handles the file upload events
    expecting vehicles.json and equipments.json files to be uploaded to the system
    vehicles.json is expected to contain vehicles details and equipments.json to have
    equipement records, which will update the existing vehicle equipments
    */
    const handleOnSubmit = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
  
      if (file) {
        if(file['name'] === "vehicles.json") {
          fileReader.onload = function (event) {
            const text = event.target ? event.target.result : "";
            const rows = vehicleService.getAllVehicles(text);
            const confirmUpload = vehicleService.insertVehicle(rows);
            if(confirmUpload) {
              setRecords(rows)
            }
          };
        } else if (file['name'] === "equipments.json") {
          fileReader.onload = function (event) {
            const text = event.target ? event.target.result : "";
            const rows = vehicleService.getAllEquipments(text);
            vehicleService.updateEquipments(rows);
            const vehiclesRow = localStorage.getItem("vehicles");
            if(vehiclesRow != null) {
              setRecords(JSON.parse(vehiclesRow));
            }
          };
        }
        fileReader.readAsText(file);
      }
    };

    return (
        <>
            <Container>
            <h1>Vehicle Information</h1>

            <Button
                    text={BUTTON_LABELS.addnewbtn}
                    color="primary"
                    size="small"
                    variant="contained"
                    onClick={navigateToAddVehicle}
            />
            <input 
                  type = {"file"} 
                  id = {"jsonFileInput"}
                  accept = {".json"} 
                  onChange = {handleOnChange} 
                  className={classes.uploadbtn}
                  data-testid="uploadTid"
            />
            <Button
                    text={BUTTON_LABELS.upload}
                    color="primary"
                    size="small"
                    variant="outlined"
                    onClick = {(e: React.MouseEvent<HTMLElement>) => {
                      handleOnSubmit(e);
                    }}
            />
            <div>&nbsp;</div>

            <TextField
                id="search"
                label={COMMON_LABELS.search}
                variant="outlined"
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                fullWidth
            />
             <div>&nbsp;</div>

            <Paper className={classes.root}>
                <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                        ))}
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((record:any) => {
                        return (
                        <TableRow key={record.id}>
                          <TableCell>{record.id}</TableCell>
                          <TableCell>{record.name}</TableCell>
                          <TableCell>{record.driver}</TableCell>
                          <TableCell>{record.status}</TableCell>
                          <TableCell>{record.fuelType}</TableCell>
                          <TableCell>{record.equipments}</TableCell>
                          <TableCell>
                            <Button
                                text={COMMON_LABELS.edit}
                                color="primary"
                                size="small"
                                variant="contained"
                                onClick={()=>{navigateToEditVehicle(record)}}
                              />
                          </TableCell>
                           <TableCell>
                              <Button
                                text={COMMON_LABELS.delete}
                                color="primary"
                                size="small"
                                variant="contained"
                                onClick={()=>{deleteVehicle(record)}}
                              />
                           </TableCell>
                           <TableCell>
                              <Button
                                text={COMMON_LABELS.view}
                                color="primary"
                                size="small"
                                variant="contained"
                                onClick={()=>{navigateToViewVehicle(record)}}
                              />
                           </TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
                </TableContainer>
                <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={records.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage} // use brackets
                onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
          </Container>
        </>
    );
}