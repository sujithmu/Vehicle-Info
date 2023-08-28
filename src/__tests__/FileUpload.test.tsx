import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { VehicleList } from '../pages/Home/VehicleList';
import { BUTTON_LABELS } from '../constants/vehicle';

describe('VehicleList', () => {
    render(
        <BrowserRouter>
            <VehicleList />
        </BrowserRouter>
    );
    test('Can find Vehicle information list page, upload button in Vehicle listing page', async () => {
        
        const fileInput = screen.getByText(BUTTON_LABELS.upload);
        expect(fileInput).toBeInTheDocument();

        const vehicleListHeader = screen.getByText("Vehicle Information")
        expect(vehicleListHeader).toBeInTheDocument();
    });
;});