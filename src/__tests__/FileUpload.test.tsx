import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { VehicleList } from '../pages/Home/VehicleList';
import { BUTTON_LABELS } from '../constants/vehicle';
import user from '@testing-library/user-event';

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

    // test('Allows only json file to upload', async () => {
    //     const jsonValues = '[{ "driver": "SpongeBob SquarePants"}]';
    //     const str = JSON.stringify(jsonValues);
    //     const blob = new Blob([str]);
    //     const file = new File([blob], 'values.json', {
    //         type: 'application/JSON',
    //     });
    //     File.prototype.text = jest.fn().mockResolvedValueOnce(str);
    //     const input = screen.getByTestId('uploadTid');
    //     user.upload(input, file);

    //     // jest.mock('[{ "driver": "SpongeBob SquarePants"}]', () => ({
    //     //     settings: 'someSetting'
    //     // }), { virtual: true })

    //     //await screen.findByTestId(() => expect(queryByTestId('handler')).toBeTruthy());
    // })
;});