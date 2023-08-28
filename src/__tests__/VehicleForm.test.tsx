import { render, screen } from '@testing-library/react';
import { VehicleForm } from '../pages/Home/VehicleForm';
import { BrowserRouter } from 'react-router-dom';

describe('VehicleForm', () => {
    test('Input fields and a submit button exist', () => {
        render(
            <BrowserRouter>
                <VehicleForm />
            </BrowserRouter>
        );
        const vehicleName = screen.getByTestId("nameTid");
        expect(vehicleName).toBeInTheDocument();

        const vehicleID = screen.getByTestId("vTid");
        expect(vehicleID).toBeInTheDocument();

        const driver = screen.getByTestId("driverTid");
        expect(driver).toBeInTheDocument();

        const status = screen.getByTestId("statusTid");
        expect(status).toBeInTheDocument();

        const fuel = screen.getByTestId("fuelTid");
        expect(fuel).toBeInTheDocument();

        const equipments = screen.getByTestId("equipmentsTid");
        expect(equipments).toBeInTheDocument();
    });
});