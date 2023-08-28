const KEYS = {
    vehicles: 'vehicles',
    vehicle: 'vehicle',
    vehicleId: 'vehicleId',
    vehicleFileUpload: 'vehicleFileUpload'
}

/**
 * 
 * @param data 
 * @returns files uploaded / inserted flag
 * vehicles records ar stored 'vehicles' localstorage
 */
export function insertVehicle(data: any) {
    let vehicles = getExistingVehicles(),
        fileUploaded = false;

    data['id'] = generateVehicleId();
    if (!Array.isArray(data)) {
        vehicles.unshift(data);
    } else {
        // JSON Uploaded records
        if(localStorage.getItem(KEYS.vehicleFileUpload) === "true") {
            fileUploaded = false;
            alert("Already Uploaded");
        } else {
            fileUploaded = true;
            for (let i = 0; i < data.length; i++) {
                vehicles.push(data[i]);
            }
        }
        if(data.length > 0) {
            localStorage.setItem(KEYS.vehicleFileUpload, "true");
        }
    }
    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
    return fileUploaded;
}

/**
 * 
 * @param data 
 * Updates existing vehicle details
 */
export function updateVehicle(data: any) {
    let vehicles = getExistingVehicles();
    let recordIndex = vehicles.findIndex((x: any) => x.id === data.id);
    vehicles[recordIndex] = { ...data }
    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
}

/**
 * 
 * @param data 
 * To load equipment details to vehicles records
 */
export function updateEquipments(data: []) {
    let vehicles = getExistingVehicles();
    let equipmentName = "";
    for (let i = 0; i < vehicles.length; i++) {
        let equipmentsArr = [];
        if (Array.isArray(vehicles[i].equipments) && vehicles[i].equipments.length !== 0) {
            for (let j = 0; j < vehicles[i].equipments.length; j++) {
                equipmentName = filterEquipment(data, vehicles[i].equipments[j]);
                equipmentsArr.push(equipmentName);
            }
            vehicles[i].equipments = equipmentsArr.join();
        }
    }
    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
}

/**
 * 
 * @param data 
 * @param equipment 
 * @returns the equipments from equipments.json
 */
export function filterEquipment(data: any, equipment: []) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === equipment) {
            return data[i].name;
        }
    }
}

/**
 * 
 * @param id 
 * To delete selected vehicles details
 */
export function deleteVehicle(id: string | number) {
    let vehicles = getExistingVehicles();
    vehicles = vehicles.filter((x: any) => x.id !== id);
    localStorage.setItem(KEYS.vehicles, JSON.stringify(vehicles));
    if(vehicles.length < 1) {
        localStorage.setItem(KEYS.vehicleFileUpload, "false");
    }
}

/**
 * 
 * @returns 
 * Autogenerate vehicle ID's
 */
export function generateVehicleId() {
    if (localStorage.getItem(KEYS.vehicleId) == null) {
        localStorage.setItem(KEYS.vehicleId, '0');
    }
    var id = parseInt(localStorage.getItem(KEYS.vehicleId) || '');
    localStorage.setItem(KEYS.vehicleId, (++id).toString());
    return id;
}

/**
 * 
 * @returns selected vehicle details
 */
export function getExistingVehicles() {
    if (localStorage.getItem(KEYS.vehicles) == null) {
        localStorage.setItem(KEYS.vehicles, JSON.stringify([]))
    }
    let vehicles = JSON.parse(localStorage.getItem(KEYS.vehicles) || '');
    return vehicles;
}

/**
 * 
 * @param jsonRec 
 * @returns the list of vehicles from uploaded and manually added records
 */
export function getAllVehicles(jsonRec: any) {
    let existingVehicles = getExistingVehicles(),
        vehicles = JSON.parse(jsonRec || ''),
        mergedRec;

    if (Array.isArray(existingVehicles)) {
        mergedRec = vehicles.concat(existingVehicles);
    }
    return mergedRec;
}

/**
 * 
 * @param jsonRec 
 * @returns 
 */
export function getAllEquipments(jsonRec: any) {
    let equipments = JSON.parse(jsonRec || '');
    return equipments;
}

/**
 * 
 * @param id 
 * @returns get vehicles by id
 */
export function getVehicleById(id: string | number) {
    let vehicles = JSON.parse(localStorage.getItem(KEYS.vehicles) || ''),
        selectedRecord = vehicles.filter((val: any) => {
            return val.id === id;
        });
    return selectedRecord;
}