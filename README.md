# Vehicle Info App

Vehicle Info app for storing and organising vehicle information for a fleet owner.

## How to Run

In the project directory, please run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Use Case I

### `Application should display vehicles`

### On load application should display list of vehicles already added.
    -> Vehicle ID
    -> Name
    -> Equipments
    -> Driver
    -> Status
    -> Fuel

### Vehicles can be added to the application in 2 ways.
    -> Click Add 'New Vehicle'. Fill up the the form and submit.
    -> Upload 'vehicles.json' and click 'Upload'.
    -> Equipments can be uploaded to respctive vehicles from 'Equipments.json' file.

## Use Case II

### `Vehicles should be easily configured by the owner`
    -> Vehicles list launching screen includes 'Edit','View' and 'Delete' buttons.
    -> Clicking 'Edit' routes the application to an 'record' editing screen. User can update the records apart  
       from Vehicle ID, which is a 'protected' field.
    -> Clicking 'View' button routes to form 'View' module where user can see the already added informations.
    -> Clicking 'Delete' should delete that particular row.

## Assumptions
    -> As the vehicles list is longer there should be a way to filter the vehicles. Currently 'Vehicle Name' 
       and 'Driver Name' are searchable.
    -> Vehicles ID loaded from 'file' is string eg: 'V1'. Manually added vehicle id to be a number which  
       increments automatically.
    -> Vehicles.json once uploaded 'Shouldn't be allowed' to upload again.
    -> Equipments.json is allowed to upload only after 'Vehicles.json' was uploaded to the system.

## Demo Screens
    ![Home] (https://github.com/sujithmu/Vehicle-Info/blob/main/src/assets/screenshots/home_screen.png?raw=true)
    
    ![Add New Vehicle] (https://github.com/sujithmu/Vehicle-Info/blob/main/src/assets/screenshots/addvehicle_screen.png?raw=true)

    ![Upload Vehicle] (https://github.com/sujithmu/Vehicle-Info/blob/main/src/assets/screenshots/vehicles_uploaded_screen.png?raw=true)

    ![Upload Equipements] (https://github.com/sujithmu/Vehicle-Info/blob/main/src/assets/screenshots/equipments_uploaded_screen.png?raw=true)

    ![Search] (https://github.com/sujithmu/Vehicle-Info/blob/main/src/assets/screenshots/vehicle_search.png?raw=true)

    ![Edit] (https://github.com/sujithmu/Vehicle-Info/blob/main/src/assets/screenshots/vehicle_edit.png?raw=true)

    ![View] (https://github.com/sujithmu/Vehicle-Info/blob/main/src/assets/screenshots/vehicle_view.png?raw=true)

## Extended features
    -> 'Status', 'Fuel Type' field could be a 'Dropdown' instead of textfield.
    -> Validate uploaded json files before loading to the grid.
    -> Columns 'sort' could be added.
    -> Validation to notify the user that equipements.json will be allowed to upload only when a valid Vehicles.
       json is already uploaded.
