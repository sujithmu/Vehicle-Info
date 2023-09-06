# Vehicle Info App

Vehicle Info app for storing and organising vehicle information for a fleet owner.

## How to Run

In the project directory (`C:\Project_Folder\Vehicle-Info-main\Vehicle-Info-main`), 
please run:

### `npm install`

Installs all required dependencies. 
Below are some of the packages/dependencies intalled for the project

	-> Material UI
	-> Jest

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run test`

Open a terminal and change directory to root project folder. In our application it will be `C:\Project_Folder\Vehicle-Info-main\Vehicle-Info-main`
`jest.config file` should be available in the root folder.
Run 'npm run test'. It will launch the test runner in an interactive watch mode and run the test, and will display if the tests were `success or failed`.

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
Home:
![Home](https://github.com/sujithmu/Vehicle-Info/assets/41791057/ba944dcd-7a54-4b89-9ba5-2f1692a1f216)
    
Add New Vehicle:
![Add New Vehicle](https://github.com/sujithmu/Vehicle-Info/assets/41791057/77378c57-18c1-4a0d-9e38-7315b5079119)

Upload Vehicle:
![Upload Vehicle](https://github.com/sujithmu/Vehicle-Info/assets/41791057/b70c2f83-4872-41cc-bc31-edc84e9fe65e)

Upload Equipements:
![Upload Equipements](https://github.com/sujithmu/Vehicle-Info/assets/41791057/c9129a0f-072b-41de-82e9-585246458da8)

Search:
![Search](https://github.com/sujithmu/Vehicle-Info/assets/41791057/7fd21614-e1bb-4e9b-a9d4-542e1fd62443)

Edit:
![Edit](https://github.com/sujithmu/Vehicle-Info/assets/41791057/69d73bd0-aa55-4273-bada-0fe23c88522c)
    
View:
![View](https://github.com/sujithmu/Vehicle-Info/assets/41791057/38a032db-65e1-4dc9-88af-579f250f48ce)

## Features that could be extended
    -> 'Status', 'Fuel Type' field could be a 'Dropdown' instead of textfield.
    -> Validate uploaded json files before loading to the grid.
    -> Columns 'sort' could be added.
    -> Validation to notify the user that equipements.json will be allowed to upload only when a valid Vehicles.
       json is already uploaded.
	-> Few more tests for the screens.
